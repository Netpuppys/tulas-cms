import type { CollectionConfig } from 'payload'
import { CourseBlocks } from './Blocks'

export const Courses: CollectionConfig = {
  slug: 'courses',
  access: {
  read: () => true,
},
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'level', 'department', 'slug', 'status', 'updatedAt'],
    group: 'Course Pages',
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Course title (e.g. "BBA Business Analytics")' },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { description: 'URL path, e.g. bba/business-analytics' } },
    { name: 'program', type: 'text', admin: { description: 'e.g. "BBA", "BTech", "MBA"' } },
    { name: 'school', type: 'text', admin: { description: 'e.g. "School of Management"' } },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
    },
    // --- Nav grouping fields ---
    // The header's "Programmes" mega menu is built directly from published
    // Courses records (level -> department -> courses) instead of the old
    // hand-maintained src/lib/data/header.js array, so creating/publishing
    // or unpublishing/deleting a course here now actually changes the nav.
    // `level` and `department` are required so nothing silently vanishes
    // from the menu — a course without both simply won't be groupable, and
    // Payload will prompt for them the next time this doc is saved.
    {
      name: 'level',
      type: 'select',
      required: true,
      label: 'Nav Level',
      options: [
        { label: 'Undergraduate', value: 'undergraduate' },
        { label: 'Postgraduate', value: 'postgraduate' },
        { label: 'Diploma', value: 'diploma' },
      ],
      admin: {
        description: 'Which tab (Undergraduate / Postgraduate / Diploma) this course appears under in the header menu.',
      },
    },
    {
      name: 'department',
      type: 'select',
      required: true,
      label: 'Nav Department',
      options: [
        { label: 'School Of Management & Commerce', value: 'School Of Management & Commerce' },
        { label: 'School Of Engineering', value: 'School Of Engineering' },
        { label: 'School Of Computer Applications', value: 'School Of Computer Applications' },
        { label: 'School Of Mass Comm. & Journalism', value: 'School Of Mass Comm. & Journalism' },
        { label: 'School Of Pharmacy', value: 'School Of Pharmacy' },
        { label: 'School Of Law', value: 'School Of Law' },
        { label: 'School Of Agriculture', value: 'School Of Agriculture' },
      ],
      admin: {
        description: 'Which department column this course is grouped under in the header menu. This is a display/UX grouping only — it does not need to match the "school" field above exactly.',
      },
    },
    {
      name: 'navLabel',
      type: 'text',
      label: 'Nav Label',
      admin: {
        description: 'Short label shown in the header menu, e.g. "B.Tech CSE". Falls back to the Course title above if left empty.',
      },
    },
    {
      name: 'showInNav',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show in header menu',
      admin: {
        description: 'Turn off to publish this course page without listing it in the header "Programmes" menu (e.g. a duplicate or legacy entry).',
      },
    },
    {
      name: 'navOrder',
      type: 'number',
      defaultValue: 0,
      label: 'Nav Order',
      admin: {
        description: 'Controls ordering within its department in the header menu — lower numbers first. Courses with the same number fall back to alphabetical.',
      },
    },
    {
      name: 'sections',
      type: 'blocks',
      label: 'Page sections',
      minRows: 1,
      blocks: CourseBlocks,
    },
  ],
}