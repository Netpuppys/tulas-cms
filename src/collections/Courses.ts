import type { CollectionConfig } from 'payload'
import { CourseBlocks } from './Blocks'

export const Courses: CollectionConfig = {
  slug: 'courses',
  access: {
  read: () => true,
},
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'program', 'slug', 'status', 'updatedAt'],
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
    {
      name: 'sections',
      type: 'blocks',
      label: 'Page sections',
      minRows: 1,
      blocks: CourseBlocks,
    },
  ],
}