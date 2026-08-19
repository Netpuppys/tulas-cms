import type { CollectionConfig } from 'payload'

// The "Our Trendsetters" section on /placement — students who received
// offers from *multiple* companies, shown as a stack of logo+package rows
// per student (the design shows about 3). Separate from `placements`,
// which is one record per single placement, since a trendsetter's offers
// belong together on one card rather than being independent records.
export const Trendsetters: CollectionConfig = {
  slug: 'trendsetters',
  labels: { singular: 'Trendsetter', plural: 'Trendsetters' },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'studentName',
    defaultColumns: ['studentName', 'program', 'status'],
    group: 'Placements',
    description:
      'Students with multiple offers, shown in the "Our Trendsetters" section on /placement. Add one "Company Offers" entry per offer they received — the design expects about 3 per student.',
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
      name: 'program',
      type: 'text',
      admin: { description: 'e.g. "B.Tech CSE" — shown as a badge on the photo.' },
    },
    {
      name: 'tagline',
      type: 'text',
      admin: { description: 'Short line shown under the student\'s name on the photo. Optional.' },
    },
    {
      name: 'offers',
      type: 'array',
      label: 'Company Offers',
      minRows: 1,
      admin: {
        description: 'One entry per company that made this student an offer. Shown as stacked logo + package rows — the design expects about 3.',
      },
      fields: [
        { name: 'companyName', type: 'text' },
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
        { name: 'package', type: 'text', admin: { description: 'e.g. "12 LPA"' } },
      ],
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
