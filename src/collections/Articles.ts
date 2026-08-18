import type { CollectionConfig } from 'payload'

// Powers the /media "DevBhoomi Times" news page on tulas_rev. Three articles
// at a time can be promoted into the hero mosaic (one Large + two Small)
// via `heroPosition`; everything else with heroPosition "none" shows in the
// regular article feed below it. A beforeValidate hook stops two articles
// from claiming the same hero slot at once, since the frontend only expects
// one of each.
export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: { singular: 'Article', plural: 'Articles' },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'heroPosition', 'status', 'publishedDate'],
    group: 'Media / News',
    description:
      'News articles for the /media page. At most one article should be set to each Hero Position (Large / Small 1 / Small 2) at a time — the rest should be "None" and will show in the regular feed.',
  },
  versions: {
    drafts: true,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL path, e.g. "pinaak-2026-cultural-fest" — used as /media/<slug>' },
    },
    {
      name: 'category',
      type: 'text',
      admin: { description: 'e.g. "DBUU Events", "Awards", "Academics"' },
    },
    { name: 'author', type: 'text', defaultValue: 'Admin' },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'readTime',
      type: 'text',
      admin: { description: 'Manual, not auto-calculated — e.g. "4 min read". Leave empty to hide.' },
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Photo URL',
      admin: { description: 'Takes priority over the upload field below. Leave both empty and the card shows without a photo.' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo upload',
      admin: { description: 'Only used if the Photo URL above is empty.' },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: { description: 'Short summary shown on article cards and at the top of the article.' },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      admin: { description: 'Full article content.' },
    },
    {
      name: 'newspaperGallery',
      type: 'array',
      label: 'Newspaper Gallery',
      admin: {
        description:
          'Photos of newspaper clippings / press coverage for this story — shown as a slider on the article page. Leave empty to hide the gallery entirely.',
      },
      fields: [
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
        { name: 'caption', type: 'text' },
      ],
    },
    {
      name: 'externalCoverage',
      type: 'array',
      label: 'Also Published On',
      admin: {
        description:
          'Other sites that republished or covered this same story (e.g. NDTV, Times of India) — shown as "More from DevBhoomi Times" cards on this article\'s page. Scoped to this article only, not shared site-wide.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "NDTV" or the external headline used there.' },
        },
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
          admin: { description: 'Only used if the Photo URL above is empty. Falls back to this article\'s own photo if both are empty.' },
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          label: 'External URL',
        },
        {
          name: 'linkLabel',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'Read',
        },
      ],
    },
    {
      name: 'heroPosition',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'None (regular article)', value: 'none' },
        { label: 'Hero — Large', value: 'large' },
        { label: 'Hero — Small 1', value: 'small-1' },
        { label: 'Hero — Small 2', value: 'small-2' },
      ],
      admin: { description: 'Only one published article at a time can hold each hero position — enforced automatically.' },
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
  hooks: {
    beforeValidate: [
      async ({ data, req, originalDoc }) => {
        if (data?.heroPosition && data.heroPosition !== 'none') {
          const conflict = await req.payload.find({
            collection: 'articles',
            where: {
              and: [
                { heroPosition: { equals: data.heroPosition } },
                { id: { not_equals: originalDoc?.id ?? data.id } },
              ],
            },
            limit: 1,
          })
          if (conflict.docs.length > 0) {
            throw new Error(
              `Hero position "${data.heroPosition}" is already used by "${conflict.docs[0].title}". Set that one to "None" first, or pick a different position.`,
            )
          }
        }
        return data
      },
    ],
  },
}
