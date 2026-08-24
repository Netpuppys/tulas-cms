// @ts-nocheck
// One-off migration for the Courses collection's `sections` blocks: the
// "programDetails" block used to store tab metadata (`tabs`, each with a
// hand-typed `id`) separately from tab content (`contents`, each entry
// matched back to a tab via a hand-typed `tabId`). That's now merged —
// each tab in the schema carries its own content directly, keyed by
// Payload's own auto-generated row id instead of anything an editor has to
// type or keep in sync.
//
// This script walks every Courses doc's `sections`, finds any
// "programDetails" blocks still in the OLD shape (a top-level `contents`
// array present), and rewrites each tab to include its matching content
// inline (dropping the old `id`/`tabId` fields, which Payload's own
// per-row id replaces). Blocks already in the new shape (no `contents`
// array) are left untouched, so this is safe to re-run.
//
// RUN IT WITH:  npx tsx src/migrate-program-details-tabs.ts

import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

async function updateWithRetry(payload, args, retries = 6) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await payload.update(args)
    } catch (err) {
      const message = err?.message || ''
      const isTransient =
        err?.code === 112 ||
        err?.code === 8000 ||
        /catalog changes/i.test(message) ||
        /space quota/i.test(message) ||
        /context deadline exceeded/i.test(message) ||
        /MaxTimeMSExpired/i.test(message)
      if (isTransient && attempt < retries) {
        await new Promise((r) => setTimeout(r, 800 * attempt))
        continue
      }
      throw err
    }
  }
}

// Rewrites one programDetails block's tabs to carry their content inline.
// Returns { block, changed } — `block` is the (possibly unchanged) block.
function migrateProgramDetailsBlock(block) {
  if (block?.blockType !== 'programDetails') return { block, changed: false }
  if (!Array.isArray(block.contents)) return { block, changed: false } // already migrated

  const contentsByTabId = new Map()
  for (const c of block.contents) {
    if (c?.tabId) contentsByTabId.set(c.tabId, c)
  }

  const newTabs = (block.tabs || []).map((tab) => {
    const content = contentsByTabId.get(tab.id)
    const merged = {
      num: tab.num || '',
      label: tab.label || '',
      type: content?.type || 'bullet',
    }
    if (merged.type === 'bullet') {
      merged.bulletItems = content?.bulletItems || []
    } else if (merged.type === 'bulletWithLabels') {
      merged.labeledItems = (content?.labeledItems || []).map((li) => ({
        label: li?.label || '',
        text: li?.text || '',
      }))
    } else if (merged.type === 'table') {
      merged.tableHeaders = content?.tableHeaders || []
      merged.tableRows = (content?.tableRows || []).map((r) => ({ cells: r?.cells || [] }))
    }
    return merged
  })

  const { contents, ...rest } = block
  return { block: { ...rest, tabs: newTabs }, changed: true }
}

async function run() {
  const payload = await getPayload({ config })

  const all = await payload.find({ collection: 'courses', limit: 500, depth: 0 })

  let migratedDocs = 0
  let skippedDocs = 0
  const failed = []

  for (const doc of all.docs) {
    const sections = Array.isArray(doc.sections) ? doc.sections : []
    let anyChanged = false

    const newSections = sections.map((block) => {
      const { block: newBlock, changed } = migrateProgramDetailsBlock(block)
      if (changed) anyChanged = true
      return newBlock
    })

    if (!anyChanged) {
      skippedDocs++
      continue
    }

    try {
      await updateWithRetry(payload, {
        collection: 'courses',
        id: doc.id,
        data: { sections: newSections },
      })
      console.log(`  ✓ migrated "${doc.title}" (${doc.slug})`)
      migratedDocs++
    } catch (err) {
      console.error(`  ✗ failed "${doc.title}" (${doc.slug}):`, err?.message || err)
      failed.push(doc.slug)
    }
  }

  console.log('')
  console.log(
    `Migrated ${migratedDocs} course(s), skipped ${skippedDocs} (no old-shape programDetails block)${failed.length ? `, failed ${failed.length} (${failed.join(', ')}) — just re-run the script` : ''}.`,
  )
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
