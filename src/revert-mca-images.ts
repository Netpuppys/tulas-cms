// @ts-nocheck
// One-off revert script: clears the hero/overview image URLs that were
// pushed to the "mca" course by an earlier version of update-tabs-mca.ts.
// Those images are being removed in favor of just exposing the Photo URL
// fields as an option in the CMS admin for every course, rather than the
// agent pushing specific photos into specific courses.
//
// RUN IT WITH:  npx tsx src/revert-mca-images.ts

import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

async function run() {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'courses',
    where: { slug: { equals: 'mca' } },
    limit: 1,
  })

  if (existing.docs.length === 0) {
    console.error('No course found with slug "mca" — nothing to revert.')
    process.exit(1)
  }

  const doc = existing.docs[0]
  const sections = doc.sections || []

  const heroIndex = sections.findIndex((s) => s.blockType === 'hero')
  if (heroIndex !== -1) {
    delete sections[heroIndex].image
  }

  const overviewIndex = sections.findIndex((s) => s.blockType === 'overview')
  if (overviewIndex !== -1 && sections[overviewIndex].imageCard) {
    delete sections[overviewIndex].imageCard.imageUrl
  }

  await payload.update({
    collection: 'courses',
    id: doc.id,
    data: { sections },
  })

  console.log('Reverted "mca" — hero/overview image URLs cleared, back to gradient-only hero.')
  process.exit(0)
}

run()
