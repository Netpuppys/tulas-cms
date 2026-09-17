// @ts-nocheck
// Bulk media uploader that avoids the connection-spike problem entirely.
//
// THE PROBLEM: dragging many files into the admin panel's upload UI fires
// one HTTP request per file, in parallel, from the browser. Each of those
// requests can land on a different Vercel serverless function instance, and
// each instance opens its own MongoDB connection pool — so uploading 15-20
// images at once can spin up 15-20 concurrent instances, each holding
// connections, which is what pushes the M0 cluster toward its connection
// ceiling and makes the site (admin panel + live pages) hang or show empty
// content for a few minutes until things clear.
//
// THIS SCRIPT sidesteps that completely: it's one Node process, using
// Payload's Local API (not HTTP), which holds exactly ONE database
// connection for the entire run — whether you're uploading 5 files or 500.
// No matter how many images you give it, it never opens more than one
// connection, so it can't trigger the threshold alert.
//
// HOW TO USE IT:
//   1. Put the images (and/or PDFs) you want to upload into a folder,
//      e.g.  cmstulas/bulk-upload-input/
//   2. Run:  npx tsx src/bulk-upload-media.ts bulk-upload-input
//      (or pass any other folder path as the argument)
//   3. It uploads them one at a time, waiting briefly between each, and
//      prints a running log + a summary at the end.
//
// The existing 2MB-per-file limit (PDFs exempt) from Media.ts still
// applies — any file over that is skipped and reported, not silently
// dropped.
//
// Safe to re-run: it does not check for duplicates by filename, so if you
// run it twice on the same folder you'll get two copies of each file in the
// Media library. Move or delete already-uploaded files out of the input
// folder before re-running if that matters to you.

import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from './payload.config'

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif', '.pdf'])
const DELAY_BETWEEN_UPLOADS_MS = 250

function humanizeFilename(filename) {
  const base = path.parse(filename).name
  return base
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase()) || filename
}

async function uploadWithRetry(payload, filePath, data, retries = 5) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await payload.create({ collection: 'media', filePath, data })
    } catch (err) {
      const message = err?.message || ''
      const isTransient =
        err?.code === 112 ||
        err?.code === 8000 ||
        /catalog changes/i.test(message) ||
        /context deadline exceeded/i.test(message) ||
        /MaxTimeMSExpired/i.test(message) ||
        /connection pool/i.test(message) ||
        /server selection/i.test(message) ||
        err?.cause?.errorLabelSet?.has?.('TransientTransactionError')
      if (isTransient && attempt < retries) {
        const wait = 1000 * attempt
        console.log(`  transient error, retrying in ${wait}ms (attempt ${attempt}/${retries})...`)
        await new Promise((r) => setTimeout(r, wait))
        continue
      }
      throw err
    }
  }
}

async function run() {
  const inputDir = process.argv[2] || 'bulk-upload-input'
  const absDir = path.resolve(inputDir)

  if (!fs.existsSync(absDir)) {
    console.error(`Folder not found: ${absDir}`)
    console.error(`Create it and put your images/PDFs in there, then re-run.`)
    process.exit(1)
  }

  const files = fs
    .readdirSync(absDir)
    .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
    .sort()

  if (files.length === 0) {
    console.log(`No image/PDF files found in ${absDir}.`)
    process.exit(0)
  }

  console.log(`Found ${files.length} file(s) in ${absDir}. Uploading one at a time...\n`)

  const payload = await getPayload({ config })

  let uploaded = 0
  let skipped = 0
  const failures = []

  for (const filename of files) {
    const filePath = path.join(absDir, filename)
    const alt = humanizeFilename(filename)
    try {
      const doc = await uploadWithRetry(payload, filePath, { alt })
      console.log(`✓ ${filename} -> id ${doc.id}`)
      uploaded++
    } catch (err) {
      const message = err?.message || String(err)
      if (/too large/i.test(message)) {
        console.log(`⊘ ${filename} — skipped (${message})`)
        skipped++
      } else {
        console.log(`✗ ${filename} — failed: ${message}`)
        failures.push({ filename, message })
      }
    }
    await new Promise((r) => setTimeout(r, DELAY_BETWEEN_UPLOADS_MS))
  }

  console.log(`\nDone. Uploaded ${uploaded}, skipped ${skipped} (too large), failed ${failures.length}.`)
  if (failures.length) {
    console.log('\nFailed files:')
    for (const f of failures) console.log(`  - ${f.filename}: ${f.message}`)
  }
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
