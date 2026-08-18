import type { CollectionConfig } from 'payload'

// Fully separate from the `placements` collection — these are curated,
// hero-only spotlight cards for the sliding banner at the top of /placement.
// Not derived from or linked to any Placements record; editors add/remove
// these independently, in whatever order they should slide (`order`, lowest
// first).
export const PlacementHero: CollectionConfig = {
  slug: 'placement-hero',
  labels: { singular: 'Placement Hero Card', plural: 'Placement Hero Cards' },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'studentName',
    defaultColumns: ['studentName', 'order', 'status'],
    group: 'Placements',
    description:
      'Curated spotlight cards for the sliding hero banner at the top of /placement. Independent of the Placements collection below.',
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: 'studentName', type: 'text', required: true },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Photo URL',
      admin: { description: 'Takes priority over the upload field below.' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo upload',
      admin: { description: 'Only used if the Photo URL above is empty.' },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      admin: { description: 'Short blurb shown on the hero card, e.g. role + a line about the achievement.' },
    },
    { name: 'package', type: 'text', admin: { description: 'e.g. "44 LPA". Optional.' } },
    { name: 'designation', type: 'text', admin: { description: 'e.g. "Software Dev Engineer". Optional.' } },
    { name: 'batch', type: 'text', admin: { description: 'e.g. "Class of 2026". Optional.' } },
    {
      name: 'companyLogoUrl',
      type: 'text',
      label: 'Company Logo URL',
      admin: { description: 'Takes priority over the upload field below.' },
    },
    {
      name: 'companyLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Company Logo upload',
      admin: { description: 'Only used if the Company Logo URL above is empty.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: { description: 'Slide order, lowest first. Cards with the same number fall back to newest first.' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
  ],
}
