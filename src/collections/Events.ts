import type { CollectionConfig, SelectFieldSingleValidation } from 'payload'
import { select } from 'payload/shared'
import { SCHOOL_OPTIONS } from '../lib/schools'

const isSchoolEvent = (doc?: { school?: unknown; course?: unknown }) =>
  Boolean(doc?.school) || (Array.isArray(doc?.course) && doc.course.length > 0)

const validateSchool: SelectFieldSingleValidation = (value, options) => {
  const { eventScope } = options.siblingData as { eventScope?: string }
  if (!value && eventScope === 'school') return 'Pick a school, or set Event Type to Common Event.'
  return select(value, options)
}

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
      // The radio editors actually use to scope an event. Virtual, because
      // `school`/`course` already say everything: no school and no courses
      // means Common, so events saved before this field existed need no
      // migration and tulas_rev keeps reading the same two fields.
      name: 'eventScope',
      type: 'radio',
      label: 'Event Type',
      virtual: true,
      defaultValue: 'common',
      options: [
        { label: 'Common Event', value: 'common' },
        { label: 'School', value: 'school' },
      ],
      admin: {
        // Virtual fields are read-only in the admin unless told otherwise.
        readOnly: false,
        layout: 'horizontal',
        // Not stored, so there's nothing for a list filter to query.
        disableListFilter: true,
        description:
          'Common Event is campus-wide. School scopes it to a school, or to specific courses in that school.',
      },
      hooks: {
        afterRead: [({ siblingData }) => (isSchoolEvent(siblingData) ? 'school' : 'common')],
        beforeValidate: [
          // Reads siblingData rather than the hook's `value`, which is filled
          // in with the default when the field wasn't sent - a partial update
          // that only sets `school` must not wipe it.
          ({ siblingData }) => {
            if (siblingData?.eventScope === 'common') {
              siblingData.school = null
              siblingData.course = []
            }
          },
        ],
      },
    },
    {
      // Powers the /events page's course filter (Common -> Schools ->
      // department -> course). Picking a school alone scopes the event to
      // every course in that school; `course` narrows it down further to
      // specific courses within that school.
      name: 'school',
      type: 'select',
      label: 'School',
      options: [...SCHOOL_OPTIONS],
      validate: validateSchool,
      admin: {
        condition: (_, siblingData) => siblingData?.eventScope === 'school',
        description: 'Scopes this event to every course in this school, or pick specific courses below to narrow it down further.',
      },
    },
    {
      // Filtered to the school selected above - the field still stores plain
      // course relationships, so the filter is just a convenience for finding
      // the right courses faster (and rejects courses from another school).
      name: 'course',
      type: 'relationship',
      relationTo: 'courses',
      hasMany: true,
      label: 'Courses',
      filterOptions: ({ siblingData }) => {
        const school = (siblingData as { school?: string } | undefined)?.school
        return school ? { department: { equals: school } } : true
      },
      admin: {
        condition: (_, siblingData) => siblingData?.eventScope === 'school' && Boolean(siblingData?.school),
        description:
          'Select one or more specific courses, e.g. only "BBA Business Analytics" instead of the whole School. Leave empty to apply to every course in the School above.',
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
