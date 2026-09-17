import type { CollectionConfig, Where } from 'payload'
import { APIError } from 'payload'

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
