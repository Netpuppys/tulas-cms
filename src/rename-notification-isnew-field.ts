// @ts-nocheck
// One-off migration: the "academic-notifications" collection's schema field
// was renamed from `isNew` to `showNewBadge` (see AcademicNotifications.ts —
// `isNew` collides with Mongoose's own internal document property of the
// same name, which was throwing a "reserved schema pathname" warning).
//
// Payload/Mongoose only reads/writes fields that exist in the CURRENT
// schema, so once the code is deployed with the new field name, the old
// `isNew` value on existing documents becomes invisible through the normal
// Payload API — it's still physically there in MongoDB, just orphaned.
// This script uses the native MongoDB driver (via payload.db.connection,
// bypassing the schema) to rename that raw key directly, so existing
// "NEW" badges carry over instead of silently resetting to unchecked.
//
// Safe to re-run: docs that no longer have the old `isNew` key (because
// they've already been migrated) are simply skipped by the $exists filter.
//
// RUN IT WITH:  npx tsx src/rename-notification-isnew-field.ts

import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

async function migrate() {
  const payload = await getPayload({ config })
  const db = payload.db.connection.db

  const result = await db.collection('academic-notifications').updateMany(
    { isNew: { $exists: true } },
    { $rename: { isNew: 'showNewBadge' } },
  )

  console.log(
    `Renamed isNew -> showNewBadge on ${result.modifiedCount} academic-notifications doc(s) (matched ${result.matchedCount}).`,
  )
  process.exit(0)
}

migrate().catch((err) => {
  console.error(err)
  process.exit(1)
})
