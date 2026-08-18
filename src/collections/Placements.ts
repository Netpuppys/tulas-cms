import type { CollectionConfig } from 'payload'

// Individual placed-student records powering the /placement page's
// per-course sections (top of page previews + the /placement/<course> inner
// page's Tier 1 / Tier 2 / Popular / Normal breakdown). `course` is a fixed
// select rather than a relation to the Courses collection — the placement
// page groups students by these 9 broad program buckets regardless of which
// specific specialization/branch they were enrolled in, and several of
// these buckets (BBA, B.Com, BAJMC, "BTech Core Branches") don't map 1:1 to
// a single existing Courses record.
export const Placements: CollectionConfig = {
  slug: 'placements',
  labels: { singular: 'Placement', plural: 'Placements' },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'studentName',
    defaultColumns: ['studentName', 'course', 'company', 'package', 'tier', 'status'],
    group: 'Placements',
    description:
      'One record per placed student. Shown in the course sections on /placement and the Tier 1 / Tier 2 / Popular / Normal breakdown on each course\'s "View All Placements" page.',
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
      name: 'course',
      type: 'select',
      required: true,
      options: [
        { label: 'BTech CSE', value: 'btech-cse' },
        { label: 'BTech Core Branches', value: 'btech-core' },
        { label: 'BBA', value: 'bba' },
        { label: 'BCA', value: 'bca' },
        { label: 'B.Com', value: 'bcom' },
        { label: 'MBA', value: 'mba' },
        { label: 'B.Sc Agriculture', value: 'bsc-agriculture' },
        { label: 'BAJMC', value: 'bajmc' },
        { label: 'MCA', value: 'mca' },
      ],
      admin: { description: 'Which of the 9 placement course sections this student appears under.' },
    },
    { name: 'company', type: 'text', required: true, admin: { description: 'Recruiting company, e.g. "TCS".' } },
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
    { name: 'package', type: 'text', required: true, admin: { description: 'e.g. "44 LPA"' } },
    { name: 'designation', type: 'text', admin: { description: 'e.g. "Software Dev Engineer". Optional.' } },
    { name: 'batch', type: 'text', admin: { description: 'e.g. "Class of 2026". Optional.' } },
    {
      name: 'tier',
      type: 'select',
      required: true,
      defaultValue: 'normal',
      options: [
        { label: 'Tier 1', value: 'tier-1' },
        { label: 'Tier 2', value: 'tier-2' },
        { label: 'Popular', value: 'popular' },
        { label: 'Normal', value: 'normal' },
      ],
      admin: {
        description:
          'Tier 1 / Tier 2 / Popular each show up to 5 students on the course\'s inner page; Normal shows every remaining placement with no cap.',
      },
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
