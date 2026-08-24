// @ts-nocheck
// Targeted one-off cleanup after running backfill-course-nav.ts, for the
// handful of things that script correctly refused to guess at:
//
//  1. "Btech ECE" (slug "btech-ece") was created by hand on 2026-07-25,
//     nine days before the systematic btech/* course batch on 2026-08-03.
//     It never got the `btech/...` slug convention, and has
//     school: "School of computers" / program: "Btech ECE" — both wrong,
//     clearly copy-paste leftovers. It DOES already have a full real page
//     built out (hero, overview, course grid, roadmap, certifications,
//     program details) — nothing fabricated here, just renamed/relabeled
//     to match its siblings and slotted into nav.
//
//  2. "B.Tech Electrical & Electronics Engineering"
//     (slug "btech/electrical-and-electronics-engineering") and
//     "B.Tech Computer Science & Engineering (AI & ML)"
//     (slug "btech/computer-science-engineering-ai-ml") already exist as
//     real, correctly-slugged pages from the same Aug 3 batch — the old
//     nav data just referenced slightly different (typo'd/abbreviated)
//     slugs for them, so backfill-course-nav.ts correctly reported them as
//     unmatched instead of guessing. They just need Nav Level/Department.
//
//  3. "BBA Business Analytics" (slug "bba/business-analytics") currently
//     has department "School Of Engineering" and navOrder 1 — this was a
//     manual test edit made in the admin panel while trying out the new
//     nav fields, not something either script did. Reset back to its
//     correct department (School Of Management & Commerce) and original
//     position.
//
// Idempotent: safe to re-run.
//
// RUN IT WITH:  npx tsx src/fix-btech-nav-gaps.ts

import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

async function updateBySlug(payload, slug: string, data: Record<string, unknown>, label: string) {
  const found = await payload.find({ collection: 'courses', where: { slug: { equals: slug } }, limit: 1 })
  const doc = found.docs[0]
  if (!doc) {
    console.error(`  ✗ ${label}: no Courses doc with slug "${slug}" — skipped`)
    return
  }
  await payload.update({ collection: 'courses', id: doc.id, data })
  console.log(`  ✓ ${label}: updated (id ${doc.id})`)
}

async function run() {
  const payload = await getPayload({ config })

  console.log('Fixing "Btech ECE" — renaming slug + correcting school/program to match its btech/* siblings...')
  await updateBySlug(payload, 'btech-ece', {
    slug: 'btech/electronics-and-communication-engineering',
    school: 'School of Engineering & Technology',
    program: 'B.Tech',
    title: 'B.Tech Electronics & Communication Engineering',
    level: 'undergraduate',
    department: 'School Of Engineering',
    navLabel: 'B.Tech ECE',
    navOrder: 9,
    showInNav: true,
  }, 'B.Tech ECE')

  console.log('Slotting already-correct pages into the nav...')
  await updateBySlug(payload, 'btech/electrical-and-electronics-engineering', {
    level: 'undergraduate',
    department: 'School Of Engineering',
    navLabel: 'B.Tech EEE',
    navOrder: 10,
    showInNav: true,
  }, 'B.Tech EEE')

  await updateBySlug(payload, 'btech/computer-science-engineering-ai-ml', {
    level: 'undergraduate',
    department: 'School Of Engineering',
    navLabel: 'B.Tech CSE AI & ML',
    navOrder: 12,
    showInNav: true,
  }, 'B.Tech CSE AI & ML')

  console.log('Reverting the "BBA Business Analytics" test edit back to its correct department...')
  await updateBySlug(payload, 'bba/business-analytics', {
    department: 'School Of Management & Commerce',
    navOrder: 3,
  }, 'BBA Business Analytics')

  console.log('\nDone.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
