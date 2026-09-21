import type { AdminViewServerProps } from 'payload'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import React from 'react'

import UnusedMediaClient from './UnusedMediaClient'

// Custom root views get no admin chrome (sidebar, header) unless they wrap
// themselves in DefaultTemplate - Payload only does that for its own views.
export default function UnusedMediaView({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const { req, locale, permissions, visibleEntities } = initPageResult

  return (
    <DefaultTemplate
      i18n={req.i18n}
      locale={locale}
      params={params}
      payload={req.payload}
      permissions={permissions}
      searchParams={searchParams}
      user={req.user || undefined}
      visibleEntities={visibleEntities}
    >
      <Gutter>
        <UnusedMediaClient />
      </Gutter>
    </DefaultTemplate>
  )
}
