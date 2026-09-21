import { Gutter } from '@payloadcms/ui'
import React from 'react'

import UnusedMediaClient from './UnusedMediaClient'

// Used as the list view of the `unused-media` collection. Payload already
// wraps collection views in the admin chrome (sidebar, header), so unlike a
// free-standing custom route this needs no template of its own.
export default function UnusedMediaList() {
  return (
    <Gutter>
      <UnusedMediaClient />
    </Gutter>
  )
}
