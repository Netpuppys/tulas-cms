import type { Endpoint } from 'payload'
import { status as httpStatus } from 'http-status'

import { findUnusedMedia } from '../lib/unusedMedia'

// Each delete is a network round trip to S3, and a serverless request can't
// run forever, so one call only works through as many ids as fit in this
// budget and hands the rest back as `remaining` for the admin page to send
// again. Scanning every collection for references counts toward the budget.
const TIME_BUDGET_MS = 7000

const unauthorized = () =>
  Response.json({ message: 'You must be logged in.' }, { status: httpStatus.UNAUTHORIZED })

export const listUnusedMediaEndpoint: Endpoint = {
  path: '/unused-media',
  method: 'get',
  handler: async (req) => {
    if (!req.user) return unauthorized()
    try {
      const docs = await findUnusedMedia(req.payload)
      return Response.json({ docs, totalDocs: docs.length })
    } catch (err) {
      req.payload.logger.error({ err, msg: 'Failed to list unused media' })
      return Response.json({ message: 'Could not check which media is unused.' }, { status: 500 })
    }
  },
}

export const deleteUnusedMediaEndpoint: Endpoint = {
  path: '/unused-media/delete',
  method: 'post',
  handler: async (req) => {
    if (!req.user) return unauthorized()
    const startedAt = Date.now()

    try {
      const body = (await req.json?.()) as { ids?: unknown } | undefined
      const requested = Array.isArray(body?.ids) ? body.ids.map(String) : []
      if (requested.length === 0) {
        return Response.json({ message: "Missing 'ids' to delete." }, { status: httpStatus.BAD_REQUEST })
      }

      // Never trust the ids from the page: it may be minutes old, and an
      // editor may have attached one of these images somewhere since. Only
      // what is unused RIGHT NOW is deleted; anything else is reported back
      // as `skipped` and left alone.
      const unusedNow = new Set((await findUnusedMedia(req.payload)).map((m) => m.id))

      const skipped: string[] = []
      const failed: Array<{ id: string; message: string }> = []
      const remaining: string[] = []
      let deleted = 0

      for (let i = 0; i < requested.length; i++) {
        const id = requested[i]
        if (!unusedNow.has(id)) {
          skipped.push(id)
          continue
        }
        if (Date.now() - startedAt > TIME_BUDGET_MS) {
          remaining.push(...requested.slice(i))
          break
        }
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

      return Response.json({ deleted, skipped, failed, remaining })
    } catch (err) {
      req.payload.logger.error({ err, msg: 'Failed to delete unused media' })
      return Response.json({ message: 'Something went wrong while deleting.' }, { status: 500 })
    }
  },
}
