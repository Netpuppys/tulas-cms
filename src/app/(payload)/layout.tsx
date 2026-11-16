import config from '@payload-config'
import '@payloadcms/next/css'
import './custom.scss'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from './admin/importMap.js'

// The admin is per-user and per-request (cookies, auth, DB). Forcing dynamic
// stops Vercel from prerendering / reusing the layout separately from the
// page, which left the layout with `children: null` in production and
// rendered the whole admin as a blank dark screen.
export const dynamic = 'force-dynamic'

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
