import type { CollectionConfig } from 'payload'

// Powers the "Academic Notifications" card on the homepage. `link` and
// `pdf` are both optional and independent of each other — a notification
// can point to an external page, a PDF handled through the CMS upload, or
// (for now, until content is ready) neither, in which case the frontend
// just doesn't render a "click here" button rather than linking nowhere.
export const AcademicNotifications: CollectionConfig = {
  slug: 'academic-notifications',
  labels: { singular: 'Academic Notification', plural: 'Academic Notifications' },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'isNew', 'status'],
    group: 'Notifications',
    description: 'Shown in the "Academic Notifications" card on the homepage, newest first.',
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, admin: { description: 'e.g. "Result Declaration Odd Semester/Winter Session August 2026-27"' } },
    { name: 'date', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayOnly' } } },
    {
      name: 'isNew',
      type: 'checkbox',
      defaultValue: false,
      label: '"NEW" badge',
      admin: { description: 'Shows a small "NEW" label above the title on the card.' },
    },
    {
      name: 'link',
      type: 'text',
      label: 'Link URL',
      admin: { description: 'Where "click here" should go — a page URL or a direct PDF URL. Takes priority over the PDF upload below. Leave empty (along with the PDF) to hide the button entirely.' },
    },
    {
      name: 'pdf',
      type: 'upload',
      relationTo: 'media',
      label: 'PDF upload',
      admin: { description: 'Only used if the Link URL above is empty.' },
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
