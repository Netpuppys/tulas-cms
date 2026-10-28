// @ts-nocheck
// Creates (or resets the password of) the super admin account defined in
// src/collections/Users.ts. The password is passed on the command line so
// it never gets committed to the repo.
//
// RUN IT WITH:  npx tsx src/create-super-admin.ts '<password>'

import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'
import { SUPER_ADMIN_EMAIL } from './collections/Users'

const password = process.argv[2]
if (!password) {
  console.error("Usage: npx tsx src/create-super-admin.ts '<password>'")
  process.exit(1)
}

const payload = await getPayload({ config })

const existing = await payload.find({
  collection: 'users',
  where: { email: { equals: SUPER_ADMIN_EMAIL } },
  limit: 1,
  overrideAccess: true,
})

if (existing.docs.length) {
  await payload.update({
    collection: 'users',
    id: existing.docs[0].id,
    data: { password },
    overrideAccess: true,
  })
  console.log(`Updated password for ${SUPER_ADMIN_EMAIL}`)
} else {
  await payload.create({
    collection: 'users',
    data: { email: SUPER_ADMIN_EMAIL, password },
    overrideAccess: true,
  })
  console.log(`Created ${SUPER_ADMIN_EMAIL}`)
}

process.exit(0)
