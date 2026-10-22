import type { CollectionConfig } from 'payload'
import { SCHOOL_OPTIONS } from '../lib/schools'

// Powers the homepage "Upcoming Events" preview (soonest 4, upcoming only)
// and the full /events gallery (all upcoming, same ordering). `date` is a
// real date field (not free text) so both views can sort/filter reliably.
// `endDate` is optional and only set for multi-day events. `link` is
// optional — the frontend only shows a "Register"/"Details" button on a
// card when it's set.
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
    {
      name: 'date',
      type: 'date',
      label: 'Start Date',
      required: true,
      index: true,
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'End Date',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
        description: 'Only needed if the event spans more than one day. Leave empty for single-day events.',
      },
      validate: (value: Date | null | undefined, { siblingData }: { siblingData: { date?: string } }) => {
        if (value && siblingData?.date && new Date(value) < new Date(siblingData.date)) {
          return 'End date must be on or after the start date.'
        }
        return true
      },
    },
    { name: 'timeline', type: 'text', admin: { description: 'e.g. "10:00 AM – 6:00 PM". Optional.' } },
    { name: 'location', type: 'text', admin: { description: 'e.g. "Innovation Hub, Block C". Optional.' } },
    { name: 'category', type: 'text', admin: { description: 'e.g. "Technical", "Cultural", "Sports". Optional.' } },
    {
      // Powers the /events page's course filter (Common -> Schools ->
      // department -> course). Picking a school alone scopes the event to
      // every course in that school; `course` narrows it down further to
      // specific courses within that school. Both optional: an event with
      // neither still shows under "Common" (all events).
      name: 'school',
      type: 'select',
      label: 'School (optional)',
      options: [...SCHOOL_OPTIONS],
      admin: {
        description:
          'Scopes this event to every course in this school. Leave empty for a general/campus-wide event, or pick specific courses below to narrow it down further.',
      },
    },
    {
      // Filtered (admin-UI only) to the school selected above, if any - the
      // field still stores plain course relationships, so the filter is
      // just a convenience for finding the right courses faster.
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      hasMany: true,
      label: 'Courses (optional)',
      filterOptions: ({ siblingData }) => {
        const school = (siblingData as { school?: string } | undefined)?.school
        return school ? { department: { equals: school } } : true
      },
      admin: {
        description:
          'Select one or more specific courses, e.g. only "BBA Business Analytics" instead of the whole School. Leave empty to apply to every course in the School above (or campus-wide if no School is selected either).',
      },
    },
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
      index: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
  ],
}
