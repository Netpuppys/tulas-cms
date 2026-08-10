import type { CollectionConfig } from 'payload'

// Fee tables for the /tulas-programs catalog page on tulas_rev. Each doc
// here corresponds to one `feesKey` in tulas_rev's src/lib/data/programs-data.js
// (e.g. "BBA", "MBA-Specialization", "B.Tech-CSE") — that file's SCHOOLS
// array still lives in code (it's site navigation/structure, not content),
// but the actual rupee amounts are edited here instead of hardcoded.
//
// Two shapes, matching how programs-data.js already renders fees:
//  - Tiered (most programs): a row per program name, with separate amounts
//    for "All India" and "Uttarakhand" categories across 5 scholarship
//    brackets (no scholarship, 91%+, 81-90%, 71-80%, 60-70%).
//  - Flat (Integrated Law / LL.B): a row per program name with one fixed
//    fee, no scholarship tiers.
export const FeeStructures: CollectionConfig = {
  slug: 'fee-structures',
  labels: { singular: 'Fee Structure', plural: 'Fee Structures' },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'key', 'flat', 'updatedAt'],
    group: 'Course Pages',
    description:
      'Fee tables shown on the /tulas-programs catalog page. The "Key" field must exactly match a feesKey in programs-data.js for it to connect to the right program.',
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Must exactly match a feesKey in tulas_rev/src/lib/data/programs-data.js, e.g. "BBA" or "MBA-Specialization".',
      },
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: { description: 'Friendly name shown in this admin list, e.g. "BBA (General)".' },
    },
    {
      name: 'note',
      type: 'text',
      admin: { description: 'e.g. "Per annum · Scholarship based on 12th aggregate %"' },
    },
    {
      name: 'flat',
      type: 'checkbox',
      label: 'Flat fee (no scholarship tiers)',
      admin: { description: 'Turn on for programs like Integrated Law / LL.B that have one fixed fee instead of scholarship brackets.' },
    },
    {
      name: 'flatRows',
      type: 'array',
      label: 'Flat fee rows',
      admin: { condition: (_, siblingData) => Boolean(siblingData?.flat) },
      fields: [
        { name: 'prog', type: 'text', required: true, label: 'Program name' },
        { name: 'fee', type: 'number', required: true, label: 'Fee (₹ per annum)' },
      ],
    },
    {
      name: 'tieredRows',
      type: 'array',
      label: 'Scholarship-tiered fee rows',
      admin: { condition: (_, siblingData) => !siblingData?.flat },
      fields: [
        { name: 'prog', type: 'text', required: true, label: 'Program name' },
        {
          name: 'allIndia',
          type: 'group',
          label: 'All India category (₹ per annum)',
          fields: [
            { name: 'noScholarship', type: 'number', required: true, label: 'No scholarship' },
            { name: 's91', type: 'number', required: true, label: '91%+ scholarship' },
            { name: 's81', type: 'number', required: true, label: '81-90% scholarship' },
            { name: 's71', type: 'number', required: true, label: '71-80% scholarship' },
            { name: 's60', type: 'number', required: true, label: '60-70% scholarship' },
          ],
        },
        {
          name: 'uttarakhand',
          type: 'group',
          label: 'Uttarakhand category (₹ per annum)',
          fields: [
            { name: 'noScholarship', type: 'number', required: true, label: 'No scholarship' },
            { name: 's91', type: 'number', required: true, label: '91%+ scholarship' },
            { name: 's81', type: 'number', required: true, label: '81-90% scholarship' },
            { name: 's71', type: 'number', required: true, label: '71-80% scholarship' },
            { name: 's60', type: 'number', required: true, label: '60-70% scholarship' },
          ],
        },
      ],
    },
  ],
}
