// @ts-nocheck
// One-off migration: course slugs used to be slash-separated paths
// (e.g. "btech/computer-science") — the new convention is hyphens
// (e.g. "btech-computer-science"), matching how flat slugs like "bba" or
// "bcom-hons" already worked. This renames every existing slug that still
// has a "/" in it. Going forward, Courses.ts's beforeValidate hook
// auto-converts any "/" typed into the slug field, so this shouldn't be
// needed again.
//
// Covers ALL statuses (draft + published), not just published, since slugs
// must stay unique across the whole collection regardless of status.
//
// Safe to re-run: any slug that no longer has a "/" is skipped.
//
// If the new hyphenated slug would collide with a DIFFERENT existing doc,
// that rename is skipped and reported instead of crashing — check the
// output for any "SKIPPED (collision)" lines and resolve them by hand
// before re-running.
//
// RUN IT WITH:  npx tsx src/normalize-course-slugs.ts

import 'dotenv/config'
import { getPayload } from 'payload'
import { ObjectId } from 'mongodb'
import config from './payload.config'

// Writes the slug directly via the native MongoDB driver rather than
// payload.update() — Payload validates the ENTIRE document on any update,
// and several existing course docs have unrelated pre-existing data issues
// deep in their page-section blocks (e.g. a required Hero badge that's
// empty), which blocked even this single-field slug change. Going straight
// to Mongo sidesteps that; the slug's own uniqueness is still protected by
// its unique index.
async function setSlugWithRetry(db, id, newSlug, retries = 6) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await db.collection('courses').updateOne({ _id: new ObjectId(id) }, { $set: { slug: newSlug } })
    } catch (err) {
      const message = err?.message || ''
      const isTransient =
        err?.code === 112 ||
        err?.code === 8000 ||
        /catalog changes/i.test(message) ||
        /space quota/i.test(message) ||
        /context deadline exceeded/i.test(message) ||
        /MaxTimeMSExpired/i.test(message) ||
        err?.cause?.errorLabelSet?.has?.('TransientTransactionError')
      if (isTransient && attempt < retries) {
        await new Promise((r) => setTimeout(r, 800 * attempt))
        continue
      }
      throw err
    }
  }
}

async function migrate() {
  const payload = await getPayload({ config })
  const db = payload.db.connection.db

  const all = await payload.find({
    collection: 'courses',
    limit: 500,
    depth: 0,
    select: { slug: true, title: true },
  })

  const docs = all.docs
  const slugTaken = new Set(docs.map((d) => d.slug))

  let renamed = 0
  let skippedNoSlash = 0
  let skippedCollision = 0
  const collisions = []

  for (const doc of docs) {
    if (!doc.slug || !doc.slug.includes('/')) {
      skippedNoSlash++
      continue
    }

    const newSlug = doc.slug.replace(/\//g, '-')

    if (slugTaken.has(newSlug) && newSlug !== doc.slug) {
      const conflictingDoc = docs.find((d) => d.slug === newSlug)
      console.warn(
        `SKIPPED (collision): "${doc.title}" (${doc.slug}) -> "${newSlug}" already used by "${conflictingDoc?.title}" (id ${conflictingDoc?.id}).`,
      )
      collisions.push({ title: doc.title, oldSlug: doc.slug, newSlug, conflictId: conflictingDoc?.id })
      skippedCollision++
      continue
    }

    await setSlugWithRetry(db, doc.id, newSlug)
    slugTaken.add(newSlug)
    console.log(`Renamed "${doc.title}": ${doc.slug} -> ${newSlug}`)
    renamed++
  }

  console.log(
    `\nDone. Renamed ${renamed}, skipped ${skippedNoSlash} (already hyphenated), skipped ${skippedCollision} (collision).`,
  )
  if (collisions.length) {
    console.log('\nResolve these collisions manually, then re-run:')
    for (const c of collisions) {
      console.log(`  - "${c.title}" (${c.oldSlug}) wants "${c.newSlug}", already used by doc id ${c.conflictId}`)
    }
  }
  process.exit(0)
}

migrate().catch((err) => {
  console.error(err)
  process.exit(1)
})
