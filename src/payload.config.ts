import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Courses } from './collections/Courses'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
admin: {
  user: Users.slug,
  meta: {
    titleSuffix: '- Tulas CMS',
    icons: [
      { rel: 'icon', type: 'image/png', url: '/tulas-favicon.png' },
    ],
  },
  components: {
    graphics: {
      Logo: '/components/AdminLogo#default',
      Icon: '/components/AdminLogo#default',
    },
  },
  importMap: {
    baseDir: path.resolve(dirname),
  },
},
  collections: [Users, Media, Courses],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  cors: [
    'http://localhost:3002',
    process.env.FRONTEND_URL,
  ].filter(Boolean) as string[],
  sharp,
  plugins: [],
})
