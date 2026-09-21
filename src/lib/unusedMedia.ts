import type { Payload } from 'payload'

export type UnusedMediaItem = {
  id: string
  alt: string
  filename: string
  url: string
  mimeType: string
  filesize: number
  createdAt: string
}

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
// --------------------------------------------------------------------------

const OBJECT_ID = /\b[0-9a-f]{24}\b/gi

// Anything that looks like `<name>.<ext>` and is not broken up by a URL,
// quote, bracket or whitespace delimiter. Excluding `/` means full URLs,
// relative URLs and bare filenames all yield just the filename.
const FILE_TOKEN = /[^\s"'\\?#<>()/,;=]+\.[a-z0-9]{2,5}\b/gi

const PAGE_SIZE = 100

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
  onText: (text: string) => void,
) {
  let page = 1
  for (;;) {
    const result = await payload.find({
      collection: collection as never,
      depth: 0,
      draft,
      limit: PAGE_SIZE,
      overrideAccess: true,
      page,
    })
    for (const doc of result.docs) onText(JSON.stringify(doc))
    if (!result.hasNextPage) break
    page += 1
  }
}

async function collectReferences(payload: Payload, keepTexts: boolean): Promise<References> {
  const refs: References = { ids: new Set(), filenames: new Set(), texts: [] }

  const onText = (text: string) => {
    for (const id of text.match(OBJECT_ID) ?? []) refs.ids.add(id.toLowerCase())
    addFilenameTokens(text, refs.filenames)
    if (keepTexts) refs.texts.push(text.toLowerCase())
  }

  for (const collection of payload.config.collections) {
    if (collection.slug === 'media') continue
    await scanDocuments(payload, collection.slug, false, onText)
    if (collection.versions && collection.versions.drafts) {
      await scanDocuments(payload, collection.slug, true, onText)
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

export async function findUnusedMedia(payload: Payload): Promise<UnusedMediaItem[]> {
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

  if (all.length === 0) return []

  const spacedNames = all.filter((m) => /\s/.test(m.filename)).map((m) => m.filename.toLowerCase())
  const refs = await collectReferences(payload, spacedNames.length > 0)

  const usedBySpacedName = new Set<string>()
  for (const name of spacedNames) {
    const encoded = encodeURIComponent(name)
    if (refs.texts.some((text) => text.includes(name) || text.includes(encoded))) {
      usedBySpacedName.add(name)
    }
  }

  return all.filter((media) => {
    const name = media.filename.toLowerCase()
    if (refs.ids.has(media.id.toLowerCase())) return false
    if (name && refs.filenames.has(name)) return false
    if (usedBySpacedName.has(name)) return false
    return true
  })
}
