import type { CollectionConfig } from 'payload'

// Replaces the old standalone blog stack (tulas-blog-backend / Express +
// Prisma + a custom Vite admin at blog.tulas.edu.in).
//
// Two content fields, for two different eras of post:
//  - `content` (raw HTML textarea) — how the 112 migrated posts store their
//    body. Converting that HTML to Lexical JSON at migration time risked
//    silently mangling tables/anchors/heading ids, so it was kept as-is;
//    the frontend renders it with dangerouslySetInnerHTML same as before.
//    Hidden in the admin UI unless a doc already has content in it, so new
//    posts don't stumble into typing raw HTML.
//  - `body` (Lexical richText) — the normal rich-text editor, used for
//    every post written from now on.
// A post only needs one of the two filled in; enforced below.
export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: { singular: 'Blog Post', plural: 'Blog Posts' },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedDate'],
    group: 'Blog',
    description: 'Write new posts with the rich text editor below. The legacy HTML field only appears on posts migrated from the old blog.',
  },
  versions: {
    drafts: true,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        const hasBody = Boolean(
          data?.body?.root?.children?.some((node: any) => node?.children?.length > 0 || node?.type === 'upload'),
        )
        const hasLegacyContent = Boolean(data?.content && data.content.trim().length > 0)
        if (!hasBody && !hasLegacyContent) {
          throw new Error('Add some content in the rich text editor before publishing.')
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL path — matches the old blog\'s slug so existing links keep working.' },
    },
    {
      name: 'category',
      type: 'text',
      defaultValue: 'Blogs',
      admin: { description: 'Free text — the old blog only ever used a single "Blogs" category.' },
    },
    {
      name: 'bannerImageUrl',
      type: 'text',
      label: 'Banner Image URL',
      admin: { description: 'Takes priority over the upload field below. Migrated posts point at their original S3 URL directly — no re-upload needed.' },
    },
    {
      name: 'bannerImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Banner Image upload',
      admin: { description: 'Only used if the Banner Image URL above is empty.' },
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Content',
      admin: { description: 'Main content for the post — used for everything written from now on.' },
    },
    {
      name: 'content',
      type: 'textarea',
      label: 'Content (Legacy HTML)',
      admin: {
        description: 'Raw HTML from the old blog migration — not a rich text editor. Only relevant for migrated posts; leave empty on new ones.',
        condition: (data) => Boolean(data?.content),
      },
    },
    { name: 'excerpt', type: 'textarea', admin: { description: 'Short summary shown on post cards.' } },
    { name: 'authorName', type: 'text' },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayOnly' }, description: 'Original publish date, preserved from the old blog for sorting/display.' },
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
      admin: { description: 'Optional.' },
    },
    { name: 'metaTitle', type: 'text' },
    { name: 'metaDescription', type: 'textarea' },
    {
      name: 'metaKeywords',
      type: 'text',
      hasMany: true,
      admin: { description: 'Optional.' },
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
