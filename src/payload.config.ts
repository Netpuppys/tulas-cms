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
import { BlogPosts } from './collections/BlogPosts'

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
  collections: [Users, Media, Courses, FeeStructures, Articles, Placements, PlacementHero, Trendsetters, AcademicNotifications, Events, BlogPosts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // No connectOptions here previously meant the MongoDB driver's default
  // pool size (up to 100 sockets per client). On Vercel, every concurrent
  // serverless invocation can spin up its own client — with no cap, that
  // multiplies fast against the M0 cluster's small connection ceiling,
  // which is what triggered the Atlas "connections exceeded threshold"
  // alert. Capping maxPoolSize keeps each instance's footprint small, and
  // maxIdleTimeMS releases idle sockets quickly instead of holding them
  // open between requests.
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
    connectOptions: {
      maxPoolSize: 10,
      minPoolSize: 1,
      maxIdleTimeMS: 30000,
      serverSelectionTimeoutMS: 10000,
      // Fail fast instead of hanging. Without these, a request that can't
      // immediately get a free connection (e.g. during a bulk-upload burst,
      // when all 10 pooled connections in this instance are busy) just sits
      // and waits — which on a serverless function means the whole request
      // stalls until it times out anyway, holding everything open longer
      // and making the underlying pressure worse. Failing quickly with a
      // clear error is more honest and recovers faster.
      waitQueueTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 20000,
    },
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
  // Payload only exposes ONE upload-size ceiling app-wide (busboy limit
  // applied before any collection code runs) — this has to be big enough
  // for the largest PDF we still want to accept. The actual "2MB except
  // PDFs" rule is enforced per-file in Media.ts's beforeValidate hook,
  // which can tell mimeTypes apart; this is just the outer hard cap.
  upload: {
    limits: {
      fileSize: 20 * 1024 * 1024, // 20MB
    },
  },
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
