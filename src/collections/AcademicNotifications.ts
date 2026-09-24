import type { CollectionConfig } from 'payload'

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
    { name: 'date', type: 'date', required: true, index: true, admin: { date: { pickerAppearance: 'dayOnly' } } },
    {
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
      index: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
  ],
}
