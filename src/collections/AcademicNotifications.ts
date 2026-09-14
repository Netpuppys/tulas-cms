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
    defaultColumns: ['title', 'date', 'showNewBadge', 'status'],
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
      // NOT named `isNew` — that's a reserved Mongoose document property
      // (tracks whether a doc has been saved yet), and a schema field with
      // the same name collides with it under the hood. Renamed to avoid
      // the conflict; see rename-notification-isnew-field.ts for the
      // migration that moved existing data over from the old field name.
      name: 'showNewBadge',
      type: 'checkbox',
      defaultValue: false,
      label: '"NEW" badge',
      admin: { description: 'Shows a small "NEW" label above the title on the card.' },
    },
    {
      name: 'link',
      type: 'text',
      label: 'Link URL',
      admin: { description: 'Attachment URL for the notification link. e.g - pdf or link' },
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
