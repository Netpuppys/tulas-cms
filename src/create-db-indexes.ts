// @ts-nocheck
// One-off DB optimization: creates compound MongoDB indexes matching the
// EXACT query shapes tulas_rev's frontend actually sends on every page load
// (checked against mapCms*Data.js / PlacementListClient.jsx / etc — see the
// index list below for which page each one serves).
//
// Why this matters beyond "faster pages": every query that has to scan
// documents instead of using an index holds its MongoDB connection open
// longer. On the M0 free tier (shared resources, small connection ceiling),
// slow queries under a traffic burst (ad campaigns, bulk uploads) are what
// turns "a bit slow" into "hit the connection limit". Indexing the fields
// every list/detail page filters and sorts by shrinks how long each request
// holds a connection, which directly reduces that risk — it doesn't remove
// the free tier's hard ceiling, but it means far fewer connections are
// needed to serve the same traffic.
//
// Single-field indexes (`index: true`) were already added directly on the
// relevant schema fields in each collection file — those cover queries that
// filter on just one field. The compound indexes here cover queries that
// filter AND sort on multiple fields together, which a single-field index
// can't fully serve on its own.
//
// createIndex() is idempotent — safe to re-run any time (e.g. after adding
// a new collection or changing a query pattern), existing matching indexes
// are just left alone.
//
// RUN IT WITH:  npx tsx src/create-db-indexes.ts

import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

async function createIndexes() {
  const payload = await getPayload({ config })
  const db = payload.db.connection.db

  const jobs: Array<{ collection: string; spec: Record<string, 1 | -1>; usedBy: string }> = [
    // Header "Programmes" mega menu — where[status]&where[showInNav], sort=navOrder,title
    { collection: 'courses', spec: { status: 1, showInNav: 1, navOrder: 1 }, usedBy: 'header nav menu' },

    // /placement/<course> detail page — where[status]&where[course]
    { collection: 'placements', spec: { status: 1, course: 1 }, usedBy: '/placement/<course> detail page' },
    // /placement list page — where[status], sort=-updatedAt
    { collection: 'placements', spec: { status: 1, updatedAt: -1 }, usedBy: '/placement list page' },

    // /placement hero slider — where[status], sort=order
    { collection: 'placement-hero', spec: { status: 1, order: 1 }, usedBy: '/placement hero slider' },

    // /blog list + related posts — where[status], sort=-publishedDate
    { collection: 'blog-posts', spec: { status: 1, publishedDate: -1 }, usedBy: '/blog list + related posts' },

    // /media (Articles) list — where[status], sort=-publishedDate
    { collection: 'articles', spec: { status: 1, publishedDate: -1 }, usedBy: '/media list' },

    // Homepage Academic Notifications card — where[status], sort=-date
    { collection: 'academic-notifications', spec: { status: 1, date: -1 }, usedBy: 'homepage notifications card' },

    // Homepage + /events — where[status], sort=date
    { collection: 'events', spec: { status: 1, date: 1 }, usedBy: 'homepage + /events' },
  ]

  for (const job of jobs) {
    const name = await db.collection(job.collection).createIndex(job.spec, { background: true })
    console.log(`✓ ${job.collection}.${name} — ${JSON.stringify(job.spec)} (${job.usedBy})`)
  }

  console.log(`\nDone. ${jobs.length} compound indexes ensured.`)
  process.exit(0)
}

createIndexes().catch((err) => {
  console.error(err)
  process.exit(1)
})
