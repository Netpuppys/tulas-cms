import type { CollectionConfig, Endpoint, PayloadRequest, Where } from 'payload'
import { APIError } from 'payload'
import { getTranslation } from '@payloadcms/translations'
import { status as httpStatus } from 'http-status'

// --- Why deleting even ONE image can 500 the public website ---------------
// Payload wraps every delete in a MongoDB transaction/session, opened
// before any of our hooks run and held open for the ENTIRE delete —
// including the slow part: the network round trip to S3 to remove the
// actual file (a few seconds). On a free-tier, resource-throttled Atlas
// cluster, holding a transaction open for a few seconds is enough to slow
// down or fail *other* concurrent requests (like the public site's own
// reads), even for a single delete - this isn't about concurrency/volume.
//
// Payload's Local API supports a `disableTransaction: true` option that
// skips opening that transaction entirely, but the REST endpoints Payload
// registers automatically (used by the admin panel) never pass it - there
// is no query param or header to opt into it from the outside. The only
// way to use it is to call the Local API (`req.payload.delete(...)`)
// ourselves. So the two endpoints below re-implement Payload's own default
// delete routes (same paths, methods, and response shapes, so the admin
// panel's built-in delete UI keeps working exactly as before) but go
// through the Local API with `disableTransaction: true`, so a delete's S3
// round trip no longer holds any database connection hostage.
async function parseWhere(req: PayloadRequest): Promise<Where | undefined> {
  const raw = (req.query as Record<string, unknown> | undefined)?.where
  if (!raw) return undefined
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as Where
    } catch {
      return undefined
    }
  }
  return raw as Where
}

const deleteManyEndpoint: Endpoint = {
  path: '/',
  method: 'delete',
  handler: async (req) => {
    try {
      const where = await parseWhere(req)
      if (!where) {
        return Response.json({ docs: [], errors: [{ message: "Missing 'where' query of documents to delete." }] }, { status: 400 })
      }
      const collection = req.payload.collections.media.config
      const result = await req.payload.delete({
        collection: 'media',
        where,
        req,
        overrideAccess: false,
        disableTransaction: true,
      })
      if (result.errors.length === 0) {
        const message = req.t('general:deletedCountSuccessfully', {
          count: result.docs.length,
          label: getTranslation(collection.labels[result.docs.length === 1 ? 'singular' : 'plural'], req.i18n),
        })
        return Response.json({ ...result, message }, { status: httpStatus.OK })
      }
      const errors = result.errors.map((error) => (error.isPublic ? error : { ...error, message: 'Something went wrong.' }))
      const total = result.docs.length + errors.length
      const message = req.t('error:unableToDeleteCount', {
        count: errors.length,
        label: getTranslation(collection.labels[total === 1 ? 'singular' : 'plural'], req.i18n),
        total,
      })
      return Response.json({ ...result, errors, message }, { status: httpStatus.BAD_REQUEST })
    } catch (err) {
      // Never let this throw - a thrown error here hits Payload's generic
      // error-response path, which is missing the `docs` key that the
      // admin panel's bulk-delete UI reads unconditionally, and that's
      // exactly the crash we're trying to get away from.
      const message = err instanceof APIError && err.isPublic ? err.message : 'Something went wrong while deleting.'
      return Response.json({ docs: [], errors: [{ message }] }, { status: 400 })
    }
  },
}

const deleteByIDEndpoint: Endpoint = {
  path: '/:id',
  method: 'delete',
  handler: async (req) => {
    try {
      const id = req.routeParams?.id as string | undefined
      if (!id) {
        return Response.json({ message: req.t('general:notFound') }, { status: httpStatus.NOT_FOUND })
      }
      const doc = await req.payload.delete({
        collection: 'media',
        id,
        req,
        overrideAccess: false,
        disableTransaction: true,
      })
      if (!doc) {
        return Response.json({ message: req.t('general:notFound') }, { status: httpStatus.NOT_FOUND })
      }
      return Response.json({ doc, message: req.t('general:deletedSuccessfully') }, { status: httpStatus.OK })
    } catch (err) {
      const message = err instanceof APIError && err.isPublic ? err.message : 'Something went wrong while deleting.'
      const status = err instanceof APIError ? err.status : 400
      return Response.json({ message }, { status })
    }
  },
}
// --------------------------------------------------------------------------

// --- Bulk-delete cap ------------------------------------------------------
// Deleting several files at once means the server deletes every one of
// them from S3 + Mongo inside a single request before it can respond —
// each S3 delete is a network round trip, so a big batch keeps that
// request (and the connection it's using) busy for a while on a small,
// shared free-tier cluster. Capping the batch size keeps any one delete
// request short.
//
// IMPORTANT: we do NOT enforce this by throwing an error from a hook.
// Payload's built-in admin bulk-delete UI has a bug (confirmed by reading
// its shipped source): when a beforeOperation hook throws, the server's
// error response has no top-level `docs` key, but the admin client
// unconditionally reads `json.docs.length` on the response — which throws
// a TypeError on that missing key, so the editor sees a generic "unknown
// error occurred" toast instead of our real message, and the delete UI is
// left broken. So instead, when a batch is over the cap, we quietly
// rewrite the delete query to match zero documents (so the operation
// still completes normally, returning a valid `{ docs: [], errors: [] }`
// shape) and add our own friendly message to `result.errors` in
// afterOperation below — which the admin UI already knows how to display
// as a normal error toast, without crashing.
const MAX_BULK_DELETE = 4
// A value that can never match a real Mongo ObjectId, used to make the
// delete query match nothing once a batch is rejected.
const NO_MATCH_ID = '000000000000000000000000'

// Payload only supports one global upload size ceiling (set on buildConfig,
// not per-collection) — this hook adds the actual rule on top of it: every
// non-PDF upload is capped at 2MB, PDFs are exempt (still bounded by the
// global ceiling set in payload.config.ts). `data.filesize`/`data.mimeType`
// are populated by Payload's own upload handling before beforeValidate
// runs, so they're already reliable here.
const MAX_NON_PDF_BYTES = 2 * 1024 * 1024

// --- Auto-fill alt text instead of blocking the save ---------------------
// `alt` is `required: true` below (it should be — screen readers and SEO
// depend on it), but Payload's admin panel only checks required fields
// client-side on the SINGLE-file upload form. The bulk-upload drawer's
// per-file quick-edit panel does not run that same check before firing the
// request, so leaving `alt` empty there previously meant: request goes out
// → server rejects it as a validation error → editor sees a failure after
// the fact, one per file, for a batch upload.
//
// Rather than trying to patch Payload's bulk-upload drawer's client-side
// validation (admin-UI internals that could change between Payload
// versions), this guarantees correctness at the data layer instead: if an
// editor doesn't type alt text, we derive a reasonable one from the
// filename automatically, before Payload's required-field check ever runs.
// That means the request can never fail for a missing `alt` — no error
// after the request, on any upload path (single or bulk), no matter what
// the admin UI does or doesn't validate client-side. Editors who want more
// descriptive alt text remain free to edit it afterwards.
function humanizeFilename(filename?: string): string {
  if (!filename) return ''
  const base = filename.replace(/\.[^/.]+$/, '')
  return base
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

// --- Bulk-upload concurrency limiter -------------------------------------
// When an editor drags several files into the admin panel's Media list and
// uses the built-in bulk-upload drawer, the BROWSER fires one upload
// request per file, all at once, in parallel. Each of those requests can
// land on a separate Vercel serverless instance, and each instance opens
// its own MongoDB connection — a burst of 15-20 simultaneous uploads can
// spin up 15-20 concurrent instances, which is what pushes the shared M0
// cluster toward its connection ceiling and makes the CMS/site hang or show
// empty content for a few minutes.
//
// This throttles how many uploads are actually PROCESSED (image handling,
// S3 upload, DB write) at the same time, on the server, no matter how many
// requests arrive together — extra uploads simply wait a couple of seconds
// for a free slot instead of every single one hitting the database at once.
// This requires no change in how editors use the admin panel; the bulk
// upload drawer keeps working exactly as before, just safely.
//
// State has to live in MongoDB (not in-process memory) because each
// concurrent request can be a completely separate serverless instance with
// no shared memory. Each acquired slot is its own document with a short
// TTL, so if a request fails before it can release its slot (e.g. the
// 2MB-limit rejection below, which doesn't reach the release step), that
// slot expires and frees itself automatically within a minute — this can
// never permanently lock uploads out, only slow bursts down.
const MAX_CONCURRENT_UPLOADS = 3
const LOCK_TTL_SECONDS = 60
const ACQUIRE_TIMEOUT_MS = 45000
const POLL_INTERVAL_MS = 400
const LOCKS_COLLECTION = '_uploadLocks'

let ttlIndexEnsured = false

async function ensureLockCollection(db: any) {
  if (ttlIndexEnsured) return
  try {
    await db.collection(LOCKS_COLLECTION).createIndex({ createdAt: 1 }, { expireAfterSeconds: LOCK_TTL_SECONDS })
  } catch {
    // Another concurrent instance already created it, or lost a harmless
    // race doing so — either way, the index exists, which is all we need.
  }
  ttlIndexEnsured = true
}

async function acquireUploadSlot(db: any) {
  await ensureLockCollection(db)
  const deadline = Date.now() + ACQUIRE_TIMEOUT_MS
  while (Date.now() < deadline) {
    const activeCount = await db.collection(LOCKS_COLLECTION).countDocuments({})
    if (activeCount < MAX_CONCURRENT_UPLOADS) {
      const { insertedId } = await db.collection(LOCKS_COLLECTION).insertOne({ createdAt: new Date() })
      return insertedId
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS))
  }
  throw new APIError(
    'The server is busy processing other uploads right now. Please wait a few seconds and try again.',
    503,
  )
}

async function releaseUploadSlot(db: any, lockId: unknown) {
  if (!lockId) return
  await db
    .collection(LOCKS_COLLECTION)
    .deleteOne({ _id: lockId })
    .catch(() => {}) // best-effort — the TTL index cleans up if this ever fails
}
// --------------------------------------------------------------------------

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
  // These shadow Payload's own default delete routes (same path + method),
  // so the admin panel's existing delete buttons keep working unchanged -
  // see the big comment above for why this is necessary.
  endpoints: [deleteManyEndpoint, deleteByIDEndpoint],
  hooks: {
    beforeOperation: [
      async ({ operation, args, req }) => {
        if (operation === 'create') {
          const db = req.payload.db.connection.db
          req.context.uploadLockId = await acquireUploadSlot(db)
          return
        }
        if (operation === 'delete') {
          try {
            const where = (args as { where?: Where } | undefined)?.where
            if (where) {
              const { totalDocs } = await req.payload.count({ collection: 'media', req, where })
              if (totalDocs > MAX_BULK_DELETE) {
                req.context.bulkDeleteRejectedCount = totalDocs
                // Match nothing instead of throwing - see the note above
                // MAX_BULK_DELETE for why throwing here is unsafe. Cast to
                // `any`: this return shape is only valid for the 'delete'
                // operation, which we've already confirmed above, but the
                // hook's type covers every operation's args at once.
                return { ...args, where: { id: { equals: NO_MATCH_ID } } } as any
              }
            }
          } catch {
            // If the guard itself fails (e.g. a transient DB hiccup while
            // counting), fail OPEN rather than block the delete - a broken
            // guard should never be able to trigger the admin UI's crash
            // bug on its own.
          }
        }
      },
    ],
    beforeValidate: [
      ({ data }) => {
        if (data && !String(data.alt || '').trim()) {
          data.alt = humanizeFilename(data.filename) || 'Untitled image'
        }
        return data
      },
      ({ data }) => {
        const isPdf = data?.mimeType === 'application/pdf'
        if (!isPdf && typeof data?.filesize === 'number' && data.filesize > MAX_NON_PDF_BYTES) {
          const sizeMb = (data.filesize / (1024 * 1024)).toFixed(2)
          throw new APIError(
            `File is too large (${sizeMb}MB). Non-PDF uploads are limited to 2MB — only PDFs are exempt from this limit.`,
            400,
          )
        }
        return data
      },
    ],
    afterOperation: [
      async ({ operation, req, result }) => {
        if (operation === 'create') {
          await releaseUploadSlot(req.payload.db.connection.db, req.context?.uploadLockId)
        }
        if (operation === 'delete' && req.context?.bulkDeleteRejectedCount) {
          const totalDocs = req.context.bulkDeleteRejectedCount as number
          const r = result as { docs?: unknown[]; errors?: Array<{ message: string; isPublic?: boolean }> }
          r.errors = [
            ...(r.errors || []),
            {
              isPublic: true,
              message: `You selected ${totalDocs} files — please delete ${MAX_BULK_DELETE} or fewer at a time. Nothing was deleted this time; deleting a large batch at once briefly slows down the live site.`,
            },
          ]
        }
        return result
      },
    ],
  },
}
