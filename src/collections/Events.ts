import type { CollectionConfig } from 'payload'

// Powers the homepage "Upcoming Events" preview (soonest 4, upcoming only)
// and the full /events gallery (all upcoming, same ordering). `date` is a
// real date field (not free text) so both views can sort/filter reliably.
// `link` is optional — the frontend only shows a "Register"/"Details"
// button on a card when it's set.
export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Event', plural: 'Events' },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'category', 'status'],
    group: 'Events',
    description:
      'Shown on the homepage "Upcoming Events" section (soonest 4) and the full /events page (all upcoming events).',
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea', admin: { description: 'Short summary shown on the /events card. Optional.' } },
    { name: 'author', type: 'text', label: 'Organizer', admin: { description: 'e.g. "Dept. of Computer Science". Optional.' } },
    { name: 'date', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayOnly' } } },
    { name: 'timeline', type: 'text', admin: { description: 'e.g. "10:00 AM – 6:00 PM". Optional.' } },
    { name: 'location', type: 'text', admin: { description: 'e.g. "Innovation Hub, Block C". Optional.' } },
    { name: 'category', type: 'text', admin: { description: 'e.g. "Technical", "Cultural", "Sports". Optional.' } },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Image URL',
      admin: { description: 'Takes priority over the upload field below.' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image upload',
      admin: { description: 'Only used if the Image URL above is empty.' },
    },
    {
      name: 'link',
      type: 'text',
      label: 'Link URL',
      admin: {
        description:
          'Registration or details link — external URLs show a "Register" button, internal paths show "Details". Leave empty to hide the button entirely.',
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
