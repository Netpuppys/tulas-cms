// @ts-nocheck
// One-off backfill: the header's "Programmes" mega menu used to be a
// hand-maintained array (tulas_rev/src/lib/data/header.js) completely
// disconnected from the Courses collection — creating/deleting a course
// here never touched the nav. Courses now has level/department/navLabel/
// showInNav/navOrder fields so the nav can be built straight from real
// Courses records instead.
//
// This script is the one-time migration: it walks that old hardcoded menu
// (copied below, verbatim, as the source of truth for the *intended* nav
// structure) and, for every {name, href} entry, finds the matching Courses
// doc by slug and sets level/department/navLabel/navOrder/showInNav on it.
//
// Entries that don't match any Courses doc (typo'd slugs, missing course
// pages, or duplicate hrefs already claimed by an earlier entry) are left
// alone and reported at the end — those need a manual decision (fix the
// slug, create the course, or drop the nav entry), not a guess from this
// script.
//
// Idempotent: safe to re-run — matched docs just get their nav fields
// re-applied to the same values.
//
// RUN IT WITH:  npx tsx src/backfill-course-nav.ts

import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

// Copied from tulas_rev/src/lib/data/header.js's PROGRAM_MENU_DATA at the
// time this script was written. If that file has since changed, update
// this copy (or point editors at the CMS from now on instead).
const PROGRAM_MENU_DATA = {
  undergraduate: {
    'School Of Management & Commerce': [
      { name: 'BBA', href: '/courses/bba' },
      { name: 'B.Com', href: '/courses/bcom/' },
      { name: 'BBA Business Analytics', href: '/courses/bba/business-analytics' },
      { name: 'B.Com (Hons.)', href: '/courses/bcom-hons/' },
      { name: 'BBA Digital Marketing', href: '/courses/bba/digital-marketing' },
    ],
    'School Of Engineering': [
      { name: 'B.Tech (All Specialisations)', href: '/courses/btech/' },
      { name: 'B.Tech Civil Engineering (CE)', href: '/courses/btech/civil-engineering/' },
      { name: 'B.Tech Mechanical Engineering (ME)', href: '/courses/btech/mechanical-engineering/' },
      { name: 'B.Tech ECE', href: '/courses/btech/electronics-and-communication-engg' },
      { name: 'B.Tech EEE', href: '/courses/btech/electrical-and-electronics-engg/' },
      { name: 'B.Tech CSE', href: '/courses/btech/computer-science' },
      { name: 'B.Tech CSE AI & ML', href: '/courses/btech/computer-science-engineering-artifical-intelligence-and-machine-learning' },
      { name: 'B.Tech CSE Cyber Security', href: '/courses/btech/computer-science-engineering-cyber-security' },
      { name: 'B.Tech CSE Data Science', href: '/courses/btech/computer-science-engineering-data-science' },
      { name: 'B.Tech CSE Full Stack Development', href: '/courses/btech/computer-science' },
    ],
    'School Of Computer Applications': [
      { name: 'BCA', href: '/courses/bca/' },
      { name: 'BCA Full Stack Software Development', href: '/courses/bca/fullstack-devlopment' },
      { name: 'BCA AI & ML', href: '/courses/bca/artificial-intelligence-&-machine-learning' },
      { name: 'BCA Cyber Security', href: '/courses/bca/' },
    ],
    'School Of Mass Comm. & Journalism': [
      { name: 'BAJMC', href: '/courses/bjmc/' },
      { name: 'BA (Hons.) JMC', href: '/courses/bjmc/' },
    ],
    'School Of Pharmacy': [
      { name: 'B.Pharma', href: '/courses/bpharma/' },
    ],
    'School Of Law': [
      { name: 'LL.B', href: '/courses/llb/' },
      { name: 'B.A. LL.B', href: '/courses/ba-llb/' },
      { name: 'BBA LL.B', href: '/courses/bba-llb/' },
    ],
    'School Of Agriculture': [
      { name: 'B.Sc. (Hons.) Agriculture', href: '/courses/bsc-agriculture/' },
    ],
  },
  postgraduate: {
    'School Of Management & Commerce': [
      { name: 'MBA (All Specialisations)', href: '/courses/mba' },
      { name: 'MBA Marketing', href: '/courses/mba/marketing' },
      { name: 'MBA Human Resource Mgmt.', href: '/courses/mba/human-resource-managment' },
      { name: 'MBA International Business', href: '/courses/mba/international-business' },
      { name: 'MBA Finance', href: '/courses/mba/finance' },
      { name: 'MBA Agri-Business Mgmt.', href: '/courses/mba/agri-business' },
      { name: 'MBA Digital Marketing', href: '/courses/mba/digital-marketing' },
      { name: 'MBA Business Analytics', href: '/courses/mba/business-analytics' },
    ],
    'School Of Engineering': [
      { name: 'M.Tech (All Specialisations)', href: '/mtech' },
      { name: 'M.Tech Computer Science Engineering', href: '/courses/mtech/computer-science' },
      { name: 'M.Tech Thermal Engineering', href: '/courses/mtech/thermal-engineering' },
      { name: 'M.Tech Structural Engineering', href: '/courses/mtech/structural-engineering' },
    ],
    'School Of Computer Applications': [
      { name: 'MCA', href: '/courses/mca' },
      { name: 'MCA Full Stack Software Development', href: '/courses/mca/fullstack-development' },
      { name: 'MCA AI & ML', href: '/courses/mca/artificial-intelligence-&-machine-learning' },
    ],
    'School Of Agriculture': [
      { name: 'M.Sc. Agronomy', href: '/courses/msc-agronomy' },
    ],
  },
  diploma: {
    'School Of Engineering': [
      { name: 'Diploma in Civil Engineering', href: '/courses/diploma-in-civil-engineering' },
      { name: 'Diploma in Mechanical Engineering', href: '/courses/diploma-in-mechanical-engineering' },
      { name: 'Diploma in Computer Science Engineering', href: '/courses/diploma-in-computer-science' },
    ],
    'School Of Pharmacy': [
      { name: 'Diploma in Pharmacy (D.Pharma)', href: '/courses/dpharma' },
    ],
  },
}

function slugFromHref(href: string) {
  return href.replace(/^\/courses\//, '').replace(/\/+$/, '').trim()
}

async function run() {
  const payload = await getPayload({ config })

  const claimedSlugs = new Set<string>()
  const unmatched: { level: string; department: string; name: string; href: string; slug: string; reason: string }[] = []
  let updated = 0

  for (const [level, departments] of Object.entries(PROGRAM_MENU_DATA)) {
    let order = 0
    for (const [department, entries] of Object.entries(departments)) {
      for (const entry of entries as { name: string; href: string }[]) {
        order += 1
        const slug = slugFromHref(entry.href)

        if (claimedSlugs.has(`${level}:${slug}`)) {
          unmatched.push({ level, department, name: entry.name, href: entry.href, slug, reason: 'duplicate href within this level — same course already claimed by an earlier nav entry, skipped' })
          continue
        }

        const found = await payload.find({
          collection: 'courses',
          where: { slug: { equals: slug } },
          limit: 1,
        })

        const doc = found.docs[0]
        if (!doc) {
          unmatched.push({ level, department, name: entry.name, href: entry.href, slug, reason: 'no Courses record with this slug' })
          continue
        }

        await payload.update({
          collection: 'courses',
          id: doc.id,
          data: {
            level: level as 'undergraduate' | 'postgraduate' | 'diploma',
            department,
            navLabel: entry.name,
            navOrder: order,
            showInNav: true,
          },
        })
        claimedSlugs.add(`${level}:${slug}`)
        updated++
      }
    }
  }

  // Published courses that were never referenced anywhere in the old nav
  // data at all — these exist as real pages but were never linked from the
  // menu, a separate (milder) instance of the same drift problem.
  const allPublished = await payload.find({
    collection: 'courses',
    where: { status: { equals: 'published' } },
    limit: 500,
  })
  const neverInNav = allPublished.docs.filter((d) => !claimedSlugs.has(`undergraduate:${d.slug}`) && !claimedSlugs.has(`postgraduate:${d.slug}`) && !claimedSlugs.has(`diploma:${d.slug}`))

  console.log(`Updated ${updated} Courses docs with level/department/navLabel/navOrder.`)
  console.log('')
  if (unmatched.length > 0) {
    console.log(`${unmatched.length} old nav entries could not be matched to a Courses record — decide for each whether to fix the slug, create the course page, or drop the nav entry:`)
    for (const u of unmatched) {
      console.log(`  [${u.level} / ${u.department}] "${u.name}" -> /courses/${u.slug} — ${u.reason}`)
    }
    console.log('')
  }
  if (neverInNav.length > 0) {
    console.log(`${neverInNav.length} published Courses were never in the old nav at all (still missing level/department, won't show in the menu until set):`)
    for (const d of neverInNav) {
      console.log(`  "${d.title}" (slug: ${d.slug})`)
    }
  }

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
