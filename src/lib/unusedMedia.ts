import type { Payload, Where } from 'payload'

export type UnusedMediaItem = {
  id: string
  alt: string
  filename: string
  url: string
  mimeType: string
  filesize: number
  createdAt: string
}

export type MediaKey = { id: string; filename: string }

// --- How "unused" is decided ---------------------------------------------
// An image counts as USED if anything stored in the CMS still points at it,
// in either of the two ways content can point at media here:
//
//   1. by ID  - upload fields, Lexical upload nodes, block/array rows...
//      (Mongo ObjectIds, always 24 hex chars, wherever they're nested)
//   2. by filename - plain text fields that hold an image URL (e.g. the
//      course hero "Background image URL" / "Photo URL" fields, which take a
//      pasted `/api/media/file/foo.jpg` link instead of an upload relation)
//      and any raw HTML that embeds one.
//
// Rather than hand-listing every field that could hold either (which would
// silently go stale the moment someone adds a new upload field or block),
// every non-media collection is read at depth 0 and each document is
// scanned as one JSON string. That is deliberately dumb and deliberately
// future-proof: a new collection or field is covered automatically, and the
// failure mode of a false positive is "an unused image stays put", never
// "a live image gets deleted".
//
// For collections with drafts (courses, events) BOTH the saved document AND
// its latest draft are scanned: the saved one is what's live on the site,
// the latest draft is what an editor is about to publish - deleting an
// image either of them needs would break the site now or at publish time.
//
// NOT covered, by nature: anything outside this CMS's database - e.g. an
// image URL hard-coded in the public website's source code.
//
// --- Full scan vs. "changed since" scan ----------------------------------
// The full scan reads every document, which is slow on a real database. It
// runs once, when the Unused Media page loads. Deleting then happens in
// small batches, and re-running the full scan for each batch would make a
// big delete crawl (and hammer the database). Instead each batch only
// re-checks documents edited SINCE the page's scan (`updatedAt`): anything
// untouched since then can't have started referencing an image, so this is
// exactly as safe as a full re-scan, at a tiny fraction of the cost.
// --------------------------------------------------------------------------

const OBJECT_ID = /\b[0-9a-f]{24}\b/gi

// Anything that looks like `<name>.<ext>` and is not broken up by a URL,
// quote, bracket or whitespace delimiter. Excluding `/` means full URLs,
// relative URLs and bare filenames all yield just the filename.
const FILE_TOKEN = /[^\s"'\\?#<>()/,;=]+\.[a-z0-9]{2,5}\b/gi

const PAGE_SIZE = 100

// Collections that are not real content and never hold references.
const SKIPPED_COLLECTIONS = new Set(['media', 'unused-media'])

type References = {
  ids: Set<string>
  filenames: Set<string>
  // Lower-cased text of every scanned document, kept only when some media
  // filename contains whitespace (which FILE_TOKEN can't tokenise).
  texts: string[]
}

function addFilenameTokens(text: string, into: Set<string>) {
  for (const token of text.match(FILE_TOKEN) ?? []) {
    into.add(token.toLowerCase())
    try {
      into.add(decodeURIComponent(token).toLowerCase())
    } catch {
      // malformed %-escape - the raw token above is still recorded
    }
  }
}

async function scanDocuments(
  payload: Payload,
  collection: string,
  draft: boolean,
  since: Date | undefined,
  onText: (text: string) => void,
) {
  const where: Where | undefined = since ? { updatedAt: { greater_than_equal: since.toISOString() } } : undefined
  let page = 1
  for (;;) {
    const result = await payload.find({
      collection: collection as never,
      depth: 0,
      draft,
      limit: PAGE_SIZE,
      overrideAccess: true,
      page,
      where,
    })
    for (const doc of result.docs) onText(JSON.stringify(doc))
    if (!result.hasNextPage) break
    page += 1
  }
}

// `since` limits the scan to documents edited at/after that time. Globals
// are always read in full - there are only ever a handful, and they aren't
// filterable by date.
async function collectReferences(payload: Payload, keepTexts: boolean, since?: Date): Promise<References> {
  const refs: References = { ids: new Set(), filenames: new Set(), texts: [] }

  const onText = (text: string) => {
    for (const id of text.match(OBJECT_ID) ?? []) refs.ids.add(id.toLowerCase())
    addFilenameTokens(text, refs.filenames)
    if (keepTexts) refs.texts.push(text.toLowerCase())
  }

  for (const collection of payload.config.collections) {
    if (SKIPPED_COLLECTIONS.has(collection.slug)) continue
    // No `updatedAt` on this collection to filter by -> read all of it.
    const collectionSince = collection.timestamps === false ? undefined : since
    await scanDocuments(payload, collection.slug, false, collectionSince, onText)
    if (collection.versions && collection.versions.drafts) {
      await scanDocuments(payload, collection.slug, true, collectionSince, onText)
    }
  }

  for (const global of payload.config.globals) {
    const slug = global.slug as never
    onText(JSON.stringify(await payload.findGlobal({ slug, depth: 0, overrideAccess: true })))
    if (global.versions && global.versions.drafts) {
      onText(JSON.stringify(await payload.findGlobal({ slug, depth: 0, draft: true, overrideAccess: true })))
    }
  }

  return refs
}

// Which of `media` are referenced by anything in `refs`.
function referencedAmong(media: MediaKey[], refs: References): Set<string> {
  const used = new Set<string>()
  for (const m of media) {
    const name = m.filename.toLowerCase()
    if (refs.ids.has(m.id.toLowerCase()) || (name && refs.filenames.has(name))) {
      used.add(m.id)
    } else if (/\s/.test(name)) {
      const encoded = encodeURIComponent(name)
      if (refs.texts.some((text) => text.includes(name) || text.includes(encoded))) used.add(m.id)
    }
  }
  return used
}

const hasSpacedName = (media: MediaKey[]) => media.some((m) => /\s/.test(m.filename))

async function listAllMedia(payload: Payload): Promise<UnusedMediaItem[]> {
  const all: UnusedMediaItem[] = []
  let page = 1
  for (;;) {
    const result = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 200,
      overrideAccess: true,
      page,
      sort: '-createdAt',
      select: { alt: true, filename: true, url: true, mimeType: true, filesize: true, createdAt: true },
    })
    for (const doc of result.docs) {
      all.push({
        id: String(doc.id),
        alt: doc.alt ?? '',
        filename: doc.filename ?? '',
        url: doc.url ?? '',
        mimeType: doc.mimeType ?? '',
        filesize: doc.filesize ?? 0,
        createdAt: doc.createdAt,
      })
    }
    if (!result.hasNextPage) break
    page += 1
  }
  return all
}

// The slow, complete check. `scannedAt` is taken BEFORE reading anything, so
// a document edited while the scan is running is still caught by a later
// `findReferencedSince(..., scannedAt)`.
export async function findUnusedMedia(payload: Payload): Promise<{ items: UnusedMediaItem[]; scannedAt: string }> {
  const scannedAt = new Date().toISOString()
  const all = await listAllMedia(payload)
  if (all.length === 0) return { items: [], scannedAt }

  const refs = await collectReferences(payload, hasSpacedName(all))
  const used = referencedAmong(all, refs)
  return { items: all.filter((m) => !used.has(m.id)), scannedAt }
}

// The fast re-check used before each delete batch: of `media`, which are
// referenced by any document edited at/after `since`.
export async function findReferencedSince(payload: Payload, media: MediaKey[], since: Date): Promise<Set<string>> {
  if (media.length === 0) return new Set()
  const refs = await collectReferences(payload, hasSpacedName(media), since)
  return referencedAmong(media, refs)
}

// Looks up the filenames for a set of media ids. Ids that no longer exist
// are simply absent from the result.
export async function getMediaKeys(payload: Payload, ids: string[]): Promise<MediaKey[]> {
  if (ids.length === 0) return []
  const result = await payload.find({
    collection: 'media',
    depth: 0,
    limit: ids.length,
    overrideAccess: true,
    pagination: false,
    select: { filename: true },
    where: { id: { in: ids } },
  })
  return result.docs.map((doc) => ({ id: String(doc.id), filename: doc.filename ?? '' }))
}
