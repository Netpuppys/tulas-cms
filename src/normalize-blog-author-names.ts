// @ts-nocheck
// One-off cleanup: the migrated blog posts carry three different spellings
// of the same author across them — "Tula's University", "Tula's Institute",
// and "Tulas Institute" — left over from years of inconsistent typing on
// the old blog. Normalizes all of them to a single "Tulas University".
//
// Uses Payload's bulk update (a `where` filter with no `id`) rather than
// looping doc-by-doc, so this is one request per variant instead of ~100.
// Safe to re-run — once a doc's authorName is already "Tulas University",
// none of the `where` filters below match it anymore.
//
// RUN IT WITH:  npx tsx src/normalize-blog-author-names.ts

import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

const OLD_VALUES = ["Tula's University", "Tula's Institute", 'Tulas Institute']
const NEW_VALUE = 'Tulas University'

async function run() {
  const payload = await getPayload({ config })

  let totalUpdated = 0
  for (const oldValue of OLD_VALUES) {
    const result = await payload.update({
      collection: 'blog-posts',
      where: { authorName: { equals: oldValue } },
      data: { authorName: NEW_VALUE },
    })
    const count = result?.docs?.length ?? 0
    const errorCount = result?.errors?.length ?? 0
    console.log(
      `"${oldValue}" -> "${NEW_VALUE}": updated ${count} doc(s)${errorCount ? `, ${errorCount} error(s)` : ''}.`,
    )
    if (errorCount) {
      console.error(result.errors)
    }
    totalUpdated += count
  }

  console.log(`Done. Total updated: ${totalUpdated}.`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
