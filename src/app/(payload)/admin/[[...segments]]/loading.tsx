import { LoadingOverlay } from '@payloadcms/ui'
import React from 'react'

// Shown by Next.js automatically while an admin page is loading its data, on
// every admin route. Uses Payload's own loader (the same animated bars the
// rest of the admin shows) instead of a custom spinner, so it looks native
// and follows light/dark mode on its own.
export default function AdminLoading() {
  return <LoadingOverlay />
}
