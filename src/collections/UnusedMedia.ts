import type { CollectionConfig } from 'payload'

// Not a real content type - it never stores documents. It exists so that
// "Unused Media" shows up in the admin exactly like Users and Media do: as a
// card on the dashboard and as an entry in the sidebar, right next to Media.
// Its list page is swapped for our own view (a grid of every media file
// nothing references, with select / delete / empty-trash - see
// UnusedMediaClient.tsx), and every write is blocked so nothing can be
// created here by hand or through the API.
export const UnusedMedia: CollectionConfig = {
  slug: 'unused-media',
  labels: { singular: 'Unused Media', plural: 'Unused Media' },
  admin: {
    components: {
      views: {
        list: { Component: '/components/UnusedMediaList#default' },
      },
    },
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  timestamps: false,
  fields: [],
}
