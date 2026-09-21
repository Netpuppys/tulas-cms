'use client'

import { Link, useConfig } from '@payloadcms/ui'
import { usePathname } from 'next/navigation'
import React from 'react'

// Mirrors the markup of Payload's own sidebar links so it picks up the same
// styling and active-state indicator.
export default function UnusedMediaNavLink() {
  const { config } = useConfig()
  const pathname = usePathname()
  const href = `${config.routes.admin}/unused-media`
  const isActive = pathname === href

  return (
    <Link className="nav__link" href={href} id="nav-unused-media">
      {isActive && <div className="nav__link-indicator" />}
      <span className="nav__link-label">Unused Media</span>
    </Link>
  )
}
