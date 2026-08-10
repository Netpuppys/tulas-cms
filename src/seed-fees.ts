// @ts-nocheck
// One-off seed script: migrates the hardcoded FEES_DATA object from
// tulas_rev/src/lib/data/programs-data.js into the new "fee-structures"
// collection, so these numbers become editable in the CMS instead of
// requiring a code change. Every rupee amount below was copied directly
// from that file — nothing invented. (Note: the original data had 6 values
// per All India/Uttarakhand array but tulas_rev's buildDepartments() only
// ever reads the first 5 — noScholarship/91%/81%/71%/60% — so the unused
// 6th value from each array was dropped here; it was never rendered
// anywhere.)
//
// Idempotent: skips any key that already exists, so it's safe to re-run.
//
// RUN IT WITH:  npx tsx src/seed-fees.ts

import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

const tiered = (ai, uk) => ({
  allIndia: { noScholarship: ai[0], s91: ai[1], s81: ai[2], s71: ai[3], s60: ai[4] },
  uttarakhand: { noScholarship: uk[0], s91: uk[1], s81: uk[2], s71: uk[3], s60: uk[4] },
})

const fees = [
  {
    key: 'BBA',
    label: 'BBA (General)',
    note: 'Per annum · Scholarship based on 12th aggregate %',
    tieredRows: [{ prog: 'BBA', ...tiered([151000, 106000, 111000, 116000, 121000], [151000, 101000, 106000, 111000, 116000]) }],
  },
  {
    key: 'BBA-Specialization',
    label: 'BBA (Specialization)',
    note: 'Per annum · Scholarship based on 12th aggregate %',
    tieredRows: [{ prog: 'BBA - Specialization', ...tiered([176000, 131000, 136000, 141000, 146000], [176000, 126000, 131000, 136000, 141000]) }],
  },
  {
    key: 'MBA',
    label: 'MBA (General)',
    note: 'Per annum · Scholarship based on graduation aggregate %',
    tieredRows: [{ prog: 'MBA', ...tiered([358000, 313000, 318000, 323000, 328000], [358000, 271750, 276750, 281750, 286750]) }],
  },
  {
    key: 'MBA-Specialization',
    label: 'MBA (Specialization)',
    note: 'Per annum · Scholarship based on graduation aggregate %',
    tieredRows: [{ prog: 'MBA - Specialization', ...tiered([383000, 338000, 343000, 348000, 353000], [383000, 296750, 301750, 306750, 311750]) }],
  },
  {
    key: 'B.Tech-CSE',
    label: 'B.Tech CSE',
    note: 'Per annum · Scholarship based on 12th aggregate %',
    tieredRows: [{ prog: 'B.Tech CSE', ...tiered([248750, 203750, 208750, 213750, 218750], [248750, 186250, 191250, 196250, 201250]) }],
  },
  {
    key: 'B.Tech-CSE-Spec',
    label: 'B.Tech CSE (Specialization)',
    note: 'Per annum · Scholarship based on 12th aggregate %',
    tieredRows: [{ prog: 'B.Tech CSE - Specialization', ...tiered([273750, 228750, 233750, 238750, 243750], [273750, 211250, 216250, 221250, 226250]) }],
  },
  {
    key: 'B.Tech-Core',
    label: 'B.Tech Core Branches (CE / ECE / EEE / ME)',
    note: 'Per annum · Scholarship based on 12th aggregate %',
    tieredRows: [{ prog: 'B.Tech CE / ECE / EEE / ME', ...tiered([168250, 123250, 128250, 133250, 138250], [168250, 118250, 123250, 128250, 133250]) }],
  },
  {
    key: 'M.Tech',
    label: 'M.Tech',
    note: 'Per annum · Scholarship based on graduation aggregate %',
    tieredRows: [{ prog: 'M.Tech', ...tiered([139500, 94500, 99500, 104500, 109500], [139500, 89500, 94500, 99500, 104500]) }],
  },
  {
    key: 'B.Com',
    label: 'B.Com',
    note: 'Per annum · Scholarship based on 12th aggregate %',
    tieredRows: [{ prog: 'B.Com', ...tiered([110750, 78750, 83750, 88750, 93750], [110750, 70750, 75750, 80750, 85750]) }],
  },
  {
    key: 'BCA',
    label: 'BCA (General)',
    note: 'Per annum · Scholarship based on 12th aggregate %',
    tieredRows: [{ prog: 'BCA', ...tiered([151000, 106000, 111000, 116000, 121000], [151000, 101000, 106000, 111000, 116000]) }],
  },
  {
    key: 'BCA-Specialization',
    label: 'BCA (Specialization)',
    note: 'Per annum · Scholarship based on 12th aggregate %',
    tieredRows: [{ prog: 'BCA - Specialization', ...tiered([176000, 131000, 136000, 141000, 146000], [176000, 126000, 131000, 136000, 141000]) }],
  },
  {
    key: 'MCA',
    label: 'MCA (General)',
    note: 'Per annum · Scholarship based on graduation aggregate %',
    tieredRows: [{ prog: 'MCA', ...tiered([172850, 127850, 132850, 137850, 142850], [172850, 126850, 131850, 136850, 141850]) }],
  },
  {
    key: 'MCA-Specialization',
    label: 'MCA (Specialization)',
    note: 'Per annum · Scholarship based on graduation aggregate %',
    tieredRows: [{ prog: 'MCA - Specialization', ...tiered([197850, 152850, 157850, 162850, 167850], [197850, 151850, 156850, 161850, 166850]) }],
  },
  {
    key: 'Journalism & Mass Communication',
    label: 'Journalism & Mass Communication',
    note: 'Per annum · Scholarship based on 12th aggregate %',
    tieredRows: [{ prog: 'BJMC / BA (Hons.) JMC', ...tiered([110750, 78750, 83750, 88750, 93750], [110750, 70750, 75750, 80750, 85750]) }],
  },
  {
    key: 'B.Pharm',
    label: 'B.Pharm',
    note: 'Per annum · Scholarship based on 12th aggregate %',
    tieredRows: [{ prog: 'B.Pharm', ...tiered([162500, 117500, 122500, 127500, 132500], [162500, 112500, 117500, 122500, 127500]) }],
  },
  {
    key: 'B.Sc. Agriculture',
    label: 'B.Sc. (Hons.) Agriculture',
    note: 'Per annum · Scholarship based on 12th aggregate %',
    tieredRows: [{ prog: 'B.Sc. (Hons.) Agriculture', ...tiered([122250, 77250, 82250, 87250, 92250], [122250, 72250, 77250, 82250, 87250]) }],
  },
  {
    key: 'M.Sc. Agronomy',
    label: 'M.Sc. Agronomy',
    note: 'Per annum · Scholarship based on graduation aggregate %',
    tieredRows: [{ prog: 'M.Sc. Agronomy', ...tiered([129250, 79250, 84250, 89250, 94250], [129250, 74250, 79250, 84250, 89250]) }],
  },
  {
    key: 'Engineering Diploma',
    label: 'Engineering Diploma (all branches)',
    note: 'Per annum · Scholarship based on 12th aggregate %',
    tieredRows: [{ prog: 'All Engineering Diploma', ...tiered([64600, 34600, 39600, 44600, 49600], [64600, 30600, 35600, 40600, 45600]) }],
  },
  {
    key: 'D.Pharm',
    label: 'D.Pharm',
    note: 'Per annum · Scholarship based on 12th aggregate %',
    tieredRows: [{ prog: 'Diploma in Pharmacy (D.Pharm)', ...tiered([87500, 62500, 65000, 67500, 70000], [87500, 60000, 62500, 65000, 67500]) }],
  },
  {
    key: 'Integrated Law',
    label: 'Integrated Law (BA LL.B / BBA LL.B)',
    note: 'Per annum · Fixed fee structure',
    flat: true,
    flatRows: [
      { prog: 'BA LL.B (Hons.)', fee: 116000 },
      { prog: 'BBA LL.B (Hons.)', fee: 122500 },
    ],
  },
  {
    key: 'LL.B',
    label: 'LL.B (3-Year)',
    note: 'Per annum · Fixed fee structure',
    flat: true,
    flatRows: [{ prog: 'LL.B (3-Year)', fee: 93750 }],
  },
]

async function run() {
  const payload = await getPayload({ config })

  let created = 0
  let skipped = 0

  for (const fee of fees) {
    const existing = await payload.find({
      collection: 'fee-structures',
      where: { key: { equals: fee.key } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`SKIP (already exists): ${fee.key}`)
      skipped++
      continue
    }

    await payload.create({
      collection: 'fee-structures',
      data: fee,
    })
    console.log(`CREATED: ${fee.key}`)
    created++
  }

  console.log(`\nDone. Created ${created}, skipped ${skipped}, out of ${fees.length} total.`)
  process.exit(0)
}

run()
