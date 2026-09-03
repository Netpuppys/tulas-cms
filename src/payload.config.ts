import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Courses } from './collections/Courses'
import { FeeStructures } from './collections/FeeStructures'
import { Articles } from './collections/Articles'
import { Placements } from './collections/Placements'
import { PlacementHero } from './collections/PlacementHero'
import { Trendsetters } from './collections/Trendsetters'
import { AcademicNotifications } from './collections/AcademicNotifications'
import { Events } from './collections/Events'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Only enable S3 storage once real credentials are actually set (via env
// vars — never hardcode these). Without them, uploads fall back to local
// disk, which is fine for local dev but does NOT survive on Vercel (its
// filesystem is ephemeral) — so these vars are required in production.
const s3Enabled = Boolean(
  process.env.S3_BUCKET &&
    process.env.S3_REGION &&
    process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY,
)

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
  collections: [Users, Media, Courses, FeeStructures, Articles, Placements, PlacementHero, Trendsetters, AcademicNotifications, Events],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  // Next.js dev servers auto-increment to the next free port when their
  // usual one is taken, so tulas_rev doesn't always land on 3002 locally —
  // whitelisting a small range of likely local ports avoids CORS breaking
  // every time the two dev servers start in a different order.
  cors: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    process.env.FRONTEND_URL,
  ].filter(Boolean) as string[],
  sharp,
  plugins: [
    ...(s3Enabled
      ? [
          s3Storage({
            collections: {
              media: true,
            },
            bucket: process.env.S3_BUCKET as string,
            config: {
              region: process.env.S3_REGION,
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
              },
            },
          }),
        ]
      : []),
  ],
})
