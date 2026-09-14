// @ts-nocheck
// One-off migration: pulls every post from the old blog backend's live
// REST API (blog.tulas.edu.in, an Express + Prisma app on a separate
// database) and recreates it in the new "blog-posts" Payload collection.
//
// Content is copied as-is (raw HTML — see BlogPosts.ts for why it isn't
// converted to Lexical), and banner images are copied as their original
// S3 URLs via bannerImageUrl — no re-upload needed since those URLs are
// already public and permanent, regardless of which bucket they live in.
//
// Old `status: null` behaves as published in the old backend (it only
// treats the literal string "draft" as unpublished — see
// tulas-blog-backend/src/app/modules/post/post.services.ts), so anything
// that isn't exactly "draft" here maps to "published".
//
// Idempotent: skips any post whose slug already exists. Safe to re-run —
// e.g. if it fails partway through on a transient Atlas error, or if new
// posts get added to the old blog before it's decommissioned.
//
// RUN IT WITH:  npx tsx src/migrate-blog-posts.ts

import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

const OLD_BLOG_API = 'https://blog.tulas.edu.in/api/v1/post?limit=500&status=all&sortBy=created_at&sortOrder=asc'

// "2024-12-11T07:07:25.878Z" -> "2024-12-11" (Payload date field wants a
// plain date, not a full timestamp with a specific time-of-day baked in).
function toDateOnly(iso: string) {
  return iso ? iso.slice(0, 10) : undefined
}

async function fetchOldPosts() {
  const res = await fetch(OLD_BLOG_API)
  if (!res.ok) {
    throw new Error(`Old blog API returned ${res.status}`)
  }
  const json = await res.json()
  return json?.data || []
}

async function createWithRetry(payload, args, retries = 6) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await payload.create(args)
    } catch (err) {
      const message = err?.message || ''
      const isTransient =
        err?.code === 112 ||
        err?.code === 8000 ||
        /catalog changes/i.test(message) ||
        /space quota/i.test(message) ||
        /context deadline exceeded/i.test(message) ||
        /MaxTimeMSExpired/i.test(message) ||
        err?.cause?.errorLabelSet?.has?.('TransientTransactionError')
      if (isTransient && attempt < retries) {
        await new Promise((r) => setTimeout(r, 800 * attempt))
        continue
      }
      throw err
    }
  }
}

async function migrate() {
  const payload = await getPayload({ config })
  const oldPosts = await fetchOldPosts()
  console.log(`Fetched ${oldPosts.length} posts from the old blog API.`)

  let created = 0
  let skipped = 0
  const failed: string[] = []

  for (const p of oldPosts) {
    const existing = await payload.find({
      collection: 'blog-posts',
      where: { slug: { equals: p.slug } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      skipped++
      continue
    }

    const data = {
      title: p.title || '',
      slug: p.slug,
      category: p.category?.name || 'Blogs',
      bannerImageUrl: p.banner_img || '',
      content: p.content || '',
      excerpt: p.short_description || '',
      authorName: p.author_name || '',
      publishedDate: toDateOnly(p.created_at) || new Date().toISOString().slice(0, 10),
      tags: Array.isArray(p.tags) ? p.tags : [],
      metaTitle: p.meta_title || '',
      metaDescription: p.meta_description || '',
      metaKeywords: Array.isArray(p.meta_keywords) ? p.meta_keywords : [],
      status: p.status === 'draft' ? 'draft' : 'published',
    }

    try {
      await createWithRetry(payload, { collection: 'blog-posts', data })
      created++
    } catch (err) {
      console.error(`Failed to create post "${p.slug}":`, err?.message || err)
      failed.push(p.slug)
    }
  }

  console.log(
    `Blog posts: created ${created}, skipped ${skipped} (already existed)${failed.length ? `, failed ${failed.length} (${failed.join(', ')}) — just re-run the script, it'll pick up where it left off` : ''}.`,
  )
  process.exit(0)
}

migrate().catch((err) => {
  console.error(err)
  process.exit(1)
})
