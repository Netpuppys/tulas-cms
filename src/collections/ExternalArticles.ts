import type { CollectionConfig } from 'payload'

// A standalone curated list of press-coverage links — NOT tied to any
// specific document in the Articles collection. Powers the "More from
// DevBhoomi Times" strip at the bottom of every article page on tulas_rev:
// title + photo + a link out to wherever the story actually ran (NDTV, a
// local paper's site, etc). Editors add/remove/reorder entries here
// directly; nothing about it is derived from our own Articles.
export const ExternalArticles: CollectionConfig = {
  slug: 'external-articles',
  labels: { singular: 'External Article', plural: 'External Articles' },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'link', 'updatedAt'],
    group: 'Media / News',
    description:
      'Curated links to external press coverage, shown in the "More from DevBhoomi Times" strip on article pages. Independent of the Articles collection — add real published stories here.',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
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
    {
      name: 'link',
      type: 'text',
      required: true,
      label: 'External URL',
      admin: { description: 'Where this card should send visitors, e.g. https://www.ndtv.com/...' },
    },
    {
      name: 'linkLabel',
      type: 'text',
      label: 'Button Text',
      defaultValue: 'Read',
    },
  ],
}
