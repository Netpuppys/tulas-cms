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
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
    // NOTE: bulkOperationsSingleTransaction used to be on here to stop
    // Payload from deleting many files at once via Promise.all. It's off
    // now: the Media collection's own custom delete endpoints (see
    // src/collections/Media.ts) use disableTransaction so deletes never
    // hold a DB transaction open across the slow S3 file-delete call in
    // the first place - which was the actual root cause, not concurrency.
    // Leaving this setting on would have made it WORSE for a multi-file
    // delete: it forces a separate transaction per document, so with
    // disableTransaction skipping the outer one, each file would still
    // open (and hold open across its own S3 call) its own transaction,
    // just one after another instead of all together.
    connectOptions: {
      maxPoolSize: 10,
      minPoolSize: 1,
      maxIdleTimeMS: 30000,
      serverSelectionTimeoutMS: 10000,
      waitQueueTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 20000,
    },
  }),
  
  cors: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    process.env.FRONTEND_URL,
  ].filter(Boolean) as string[],
  sharp,

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
