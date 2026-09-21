import type { Endpoint } from 'payload'
import { status as httpStatus } from 'http-status'

import { findReferencedSince, findUnusedMedia, getMediaKeys } from '../lib/unusedMedia'

// Each delete is a network round trip to S3, and a serverless request can't
// run forever, so one call only works through as many ids as fit in this
// budget and hands the rest back as `remaining` for the admin page to send
// again. At least one file is always attempted, so a slow request can never
// end up doing nothing.
const TIME_BUDGET_MS = 7000

// Hard ceiling on one request, whatever the page sends. The admin page sends
// small sequential batches (see UnusedMediaClient) - this only stops a
// hand-made request from queueing hundreds of S3 deletes in a single call.
const MAX_IDS_PER_REQUEST = 25

// `scannedAt` comes from the page, which may have been opened on another
// machine/instance - allow for a little clock drift so a document saved right
// around the scan is still re-checked.
const CLOCK_SKEW_MS = 2 * 60 * 1000

const unauthorized = () =>
  Response.json({ message: 'You must be logged in.' }, { status: httpStatus.UNAUTHORIZED })

export const listUnusedMediaEndpoint: Endpoint = {
  path: '/media-cleanup/unused',
  method: 'get',
  handler: async (req) => {
    if (!req.user) return unauthorized()
    try {
      const { items, scannedAt } = await findUnusedMedia(req.payload)
      return Response.json({ docs: items, totalDocs: items.length, scannedAt })
    } catch (err) {
      req.payload.logger.error({ err, msg: 'Failed to list unused media' })
      return Response.json({ message: 'Could not check which media is unused.' }, { status: 500 })
    }
  },
}

export const deleteUnusedMediaEndpoint: Endpoint = {
  path: '/media-cleanup/delete',
  method: 'post',
  handler: async (req) => {
    if (!req.user) return unauthorized()
    const startedAt = Date.now()

    try {
      const body = (await req.json?.()) as { ids?: unknown; scannedAt?: unknown } | undefined
      const requested = [...new Set(Array.isArray(body?.ids) ? body.ids.map(String) : [])]
      if (requested.length === 0) {
        return Response.json({ message: "Missing 'ids' to delete." }, { status: httpStatus.BAD_REQUEST })
      }

      const batch = requested.slice(0, MAX_IDS_PER_REQUEST)
      const overflow = requested.slice(MAX_IDS_PER_REQUEST)

      // Never trust the ids from the page: an editor may have attached one
      // of these images somewhere since the page was loaded. Only what is
      // still unreferenced is deleted; anything else is reported back as
      // `skipped` and left alone.
      const keys = await getMediaKeys(req.payload, batch)
      const existing = new Set(keys.map((k) => k.id))

      const parsed = typeof body?.scannedAt === 'string' ? new Date(body.scannedAt) : null
      const since =
        parsed && !Number.isNaN(parsed.getTime()) && parsed.getTime() <= Date.now() + CLOCK_SKEW_MS
          ? new Date(parsed.getTime() - CLOCK_SKEW_MS)
          : null

      let referenced: Set<string>
      if (since) {
        // Fast path: only documents edited since the page's scan can have
        // changed the answer.
        referenced = await findReferencedSince(req.payload, keys, since)
      } else {
        // No usable scan time from the caller: fall back to the full scan.
        const { items } = await findUnusedMedia(req.payload)
        const unused = new Set(items.map((m) => m.id))
        referenced = new Set(keys.filter((k) => !unused.has(k.id)).map((k) => k.id))
      }

      const skipped: string[] = []
      const failed: Array<{ id: string; message: string }> = []
      const remaining: string[] = []
      let deleted = 0
      let attempted = 0

      for (let i = 0; i < batch.length; i++) {
        const id = batch[i]
        if (!existing.has(id)) continue // already gone - nothing to do
        if (referenced.has(id)) {
          skipped.push(id)
          continue
        }
        if (attempted > 0 && Date.now() - startedAt > TIME_BUDGET_MS) {
          remaining.push(...batch.slice(i))
          break
        }
        attempted += 1
        try {
          // Same reasoning as the Media collection's own delete endpoints:
          // disableTransaction so the S3 call never holds a DB transaction
          // open. Deleting by id also (correctly) bypasses the bulk-delete
          // cap, which only guards `where`-style deletes.
          await req.payload.delete({
            collection: 'media',
            id,
            req,
            overrideAccess: false,
            disableTransaction: true,
          })
          deleted += 1
        } catch (err) {
          req.payload.logger.error({ err, msg: `Failed to delete unused media ${id}` })
          failed.push({ id, message: err instanceof Error ? err.message : 'Delete failed.' })
        }
      }

      return Response.json({ deleted, skipped, failed, remaining: [...remaining, ...overflow] })
    } catch (err) {
      req.payload.logger.error({ err, msg: 'Failed to delete unused media' })
      return Response.json({ message: 'Something went wrong while deleting.' }, { status: 500 })
    }
  },
}
