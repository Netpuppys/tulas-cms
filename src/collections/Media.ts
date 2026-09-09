import type { CollectionConfig } from 'payload'
import { APIError } from 'payload'

// Payload only supports one global upload size ceiling (set on buildConfig,
// not per-collection) — this hook adds the actual rule on top of it: every
// non-PDF upload is capped at 2MB, PDFs are exempt (still bounded by the
// global ceiling set in payload.config.ts). `data.filesize`/`data.mimeType`
// are populated by Payload's own upload handling before beforeValidate
// runs, so they're already reliable here.
const MAX_NON_PDF_BYTES = 2 * 1024 * 1024

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: true,
  hooks: {
    beforeValidate: [
      ({ data }) => {
        const isPdf = data?.mimeType === 'application/pdf'
        if (!isPdf && typeof data?.filesize === 'number' && data.filesize > MAX_NON_PDF_BYTES) {
          const sizeMb = (data.filesize / (1024 * 1024)).toFixed(2)
          throw new APIError(
            `File is too large (${sizeMb}MB). Non-PDF uploads are limited to 2MB — only PDFs are exempt from this limit.`,
            400,
          )
        }
        return data
      },
    ],
  },
}
