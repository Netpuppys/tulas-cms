// @ts-nocheck
// One-off seed script: populates a handful of sample records in the new
// "placements" and "placement-hero" collections so the /placement page has
// something real to render while the CMS is being populated for real.
// Images point at tulas_rev's own /dump/placement and /dump/logos static
// files (same ones the old hardcoded placement page used) via plain
// relative paths in the "Photo URL" / "Company Logo URL" fields — no S3 or
// external URL required for this seed data.
//
// Idempotent: skips any placement whose studentName+course combo already
// exists, and any hero card whose studentName already exists. Safe to
// re-run.
//
// RUN IT WITH:  npx tsx src/seed-placements.ts

import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

// logo 8 is the one .jpg in that folder, everything else is .png
const logo = (n: number) => `/dump/logos/${n}.${n === 8 ? 'jpg' : 'png'}`
const photo = (n: number) => `/dump/placement/${n}.png`

const placements = [
  // BTech CSE
  { studentName: 'Siddharth Sharma', course: 'btech-cse', company: 'Amazon', companyLogoUrl: logo(1), imageUrl: photo(1), package: '44 LPA', designation: 'SDE', batch: 'Class of 2026', tier: 'tier-1' },
  { studentName: 'Rohan Gupta', course: 'btech-cse', company: 'Microsoft', companyLogoUrl: logo(2), imageUrl: photo(2), package: '40 LPA', designation: 'SDE', batch: 'Class of 2026', tier: 'tier-1' },
  { studentName: 'Ananya Roy', course: 'btech-cse', company: 'TCS', companyLogoUrl: logo(3), imageUrl: photo(3), package: '7 LPA', designation: 'Software Engineer', batch: 'Class of 2026', tier: 'tier-2' },
  { studentName: 'Aman Verma', course: 'btech-cse', company: 'Infosys', companyLogoUrl: logo(4), imageUrl: photo(4), package: '6.5 LPA', designation: 'Systems Engineer', batch: 'Class of 2026', tier: 'popular' },
  { studentName: 'Kirti Tyagi', course: 'btech-cse', company: 'Wipro', companyLogoUrl: logo(5), imageUrl: photo(5), package: '5 LPA', designation: 'Associate Engineer', batch: 'Class of 2026', tier: 'normal' },

  // BTech Core Branches
  { studentName: 'Vikas Singh', course: 'btech-core', company: 'L&T', companyLogoUrl: logo(6), imageUrl: photo(1), package: '8 LPA', designation: 'Graduate Engineer Trainee', batch: 'Class of 2026', tier: 'tier-1' },
  { studentName: 'Neha Rawat', course: 'btech-core', company: 'Tata Motors', companyLogoUrl: logo(7), imageUrl: photo(2), package: '6 LPA', designation: 'Design Engineer', batch: 'Class of 2026', tier: 'popular' },
  { studentName: 'Rahul Mehta', course: 'btech-core', company: 'BHEL', companyLogoUrl: logo(8), imageUrl: photo(3), package: '4.5 LPA', designation: 'Trainee Engineer', batch: 'Class of 2026', tier: 'normal' },

  // BBA
  { studentName: 'Priya Sharma', course: 'bba', company: 'HDFC Bank', companyLogoUrl: logo(9), imageUrl: photo(4), package: '6 LPA', designation: 'Management Trainee', batch: 'Class of 2026', tier: 'tier-1' },
  { studentName: 'Karan Malhotra', course: 'bba', company: 'ICICI Bank', companyLogoUrl: logo(10), imageUrl: photo(5), package: '5 LPA', designation: 'Relationship Manager', batch: 'Class of 2026', tier: 'popular' },
  { studentName: 'Simran Kaur', course: 'bba', company: 'Byju\'s', companyLogoUrl: logo(1), imageUrl: photo(1), package: '3.5 LPA', designation: 'Business Development Associate', batch: 'Class of 2026', tier: 'normal' },

  // BCA
  { studentName: 'Sandeep Kumar', course: 'bca', company: 'Cognizant', companyLogoUrl: logo(2), imageUrl: photo(2), package: '4.5 LPA', designation: 'Associate', batch: 'Class of 2026', tier: 'tier-1' },
  { studentName: 'Ishita Bansal', course: 'bca', company: 'Capgemini', companyLogoUrl: logo(3), imageUrl: photo(3), package: '4 LPA', designation: 'Analyst', batch: 'Class of 2026', tier: 'popular' },
  { studentName: 'Yash Chauhan', course: 'bca', company: 'Tech Mahindra', companyLogoUrl: logo(4), imageUrl: photo(4), package: '3.5 LPA', designation: 'Associate Software Engineer', batch: 'Class of 2026', tier: 'normal' },

  // B.Com
  { studentName: 'Ravi Prakash', course: 'bcom', company: 'Deloitte', companyLogoUrl: logo(5), imageUrl: photo(5), package: '5.5 LPA', designation: 'Audit Associate', batch: 'Class of 2026', tier: 'tier-1' },
  { studentName: 'Megha Joshi', course: 'bcom', company: 'EY', companyLogoUrl: logo(6), imageUrl: photo(1), package: '5 LPA', designation: 'Tax Associate', batch: 'Class of 2026', tier: 'popular' },
  { studentName: 'Deepak Negi', course: 'bcom', company: 'PwC', companyLogoUrl: logo(7), imageUrl: photo(2), package: '4 LPA', designation: 'Accounts Executive', batch: 'Class of 2026', tier: 'normal' },

  // MBA
  { studentName: 'Anjali Verma', course: 'mba', company: 'Accenture', companyLogoUrl: logo(8), imageUrl: photo(3), package: '9 LPA', designation: 'Business Analyst', batch: 'Class of 2026', tier: 'tier-1' },
  { studentName: 'Suresh Rathi', course: 'mba', company: 'KPMG', companyLogoUrl: logo(9), imageUrl: photo(4), package: '7.5 LPA', designation: 'Consultant', batch: 'Class of 2026', tier: 'popular' },
  { studentName: 'Pooja Yadav', course: 'mba', company: 'Genpact', companyLogoUrl: logo(10), imageUrl: photo(5), package: '5 LPA', designation: 'Process Associate', batch: 'Class of 2026', tier: 'normal' },

  // B.Sc Agriculture
  { studentName: 'Manoj Bisht', course: 'bsc-agriculture', company: 'ITC Agri', companyLogoUrl: logo(1), imageUrl: photo(1), package: '5 LPA', designation: 'Field Officer', batch: 'Class of 2026', tier: 'tier-1' },
  { studentName: 'Kavita Rana', course: 'bsc-agriculture', company: 'Godrej Agrovet', companyLogoUrl: logo(2), imageUrl: photo(2), package: '4 LPA', designation: 'Agronomist', batch: 'Class of 2026', tier: 'popular' },
  { studentName: 'Amit Panwar', course: 'bsc-agriculture', company: 'UPL', companyLogoUrl: logo(3), imageUrl: photo(3), package: '3.5 LPA', designation: 'Territory Executive', batch: 'Class of 2026', tier: 'normal' },

  // BAJMC
  { studentName: 'Riya Kapoor', course: 'bajmc', company: 'NDTV', companyLogoUrl: logo(4), imageUrl: photo(4), package: '4.5 LPA', designation: 'Junior Reporter', batch: 'Class of 2026', tier: 'tier-1' },
  { studentName: 'Aditya Thapa', course: 'bajmc', company: 'ABP News', companyLogoUrl: logo(5), imageUrl: photo(5), package: '4 LPA', designation: 'Content Associate', batch: 'Class of 2026', tier: 'popular' },
  { studentName: 'Nisha Bhatt', course: 'bajmc', company: 'Dainik Jagran', companyLogoUrl: logo(6), imageUrl: photo(1), package: '3 LPA', designation: 'Sub-Editor', batch: 'Class of 2026', tier: 'normal' },

  // MCA
  { studentName: 'Kunal Saxena', course: 'mca', company: 'IBM', companyLogoUrl: logo(7), imageUrl: photo(2), package: '8 LPA', designation: 'Software Developer', batch: 'Class of 2026', tier: 'tier-1' },
  { studentName: 'Shreya Pandey', course: 'mca', company: 'HCL', companyLogoUrl: logo(8), imageUrl: photo(3), package: '6 LPA', designation: 'Software Engineer', batch: 'Class of 2026', tier: 'popular' },
  { studentName: 'Devansh Rawat', course: 'mca', company: 'Mindtree', companyLogoUrl: logo(9), imageUrl: photo(4), package: '4.5 LPA', designation: 'Trainee Developer', batch: 'Class of 2026', tier: 'normal' },
]

const heroCards = [
  { studentName: 'Siddharth Sharma', imageUrl: photo(1), content: 'Bagged the highest package of the season at Amazon as an SDE — B.Tech CSE, Class of 2026.', package: '44 LPA', designation: 'SDE', batch: 'Class of 2026', companyLogoUrl: logo(1), order: 1 },
  { studentName: 'Rohan Gupta', imageUrl: photo(2), content: 'Placed at Microsoft as an SDE, one of the top offers this placement drive.', package: '40 LPA', designation: 'SDE', batch: 'Class of 2026', companyLogoUrl: logo(2), order: 2 },
  { studentName: 'Anjali Verma', imageUrl: photo(3), content: 'Landed a Business Analyst role at Accenture — MBA, Class of 2026.', package: '9 LPA', designation: 'Business Analyst', batch: 'Class of 2026', companyLogoUrl: logo(8), order: 3 },
]

// Atlas shared-tier clusters occasionally throw transient errors on write:
//  - code 112 / "catalog changes": a brand-new `_versions` collection is
//    still being created while writes are already landing.
//  - code 8000 / "space quota" / "context deadline exceeded": Atlas's own
//    control-plane check for whether this write would exceed the cluster's
//    storage quota timed out. Usually a transient Atlas hiccup, but if it
//    keeps happening the cluster may genuinely be near its storage cap
//    (512MB on the free M0 tier) — worth checking the Atlas dashboard if
//    retries don't clear it.
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

async function seed() {
  const payload = await getPayload({ config })

  let createdPlacements = 0
  let skippedPlacements = 0
  const failedPlacements = []
  for (const p of placements) {
    const existing = await payload.find({
      collection: 'placements',
      where: {
        and: [
          { studentName: { equals: p.studentName } },
          { course: { equals: p.course } },
        ],
      },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      skippedPlacements++
      continue
    }
    try {
      await createWithRetry(payload, {
        collection: 'placements',
        data: { ...p, status: 'published' },
      })
      createdPlacements++
    } catch (err) {
      console.error(`Failed to create placement "${p.studentName}" (${p.course}):`, err?.message || err)
      failedPlacements.push(p.studentName)
    }
  }

  let createdHero = 0
  let skippedHero = 0
  const failedHero = []
  for (const h of heroCards) {
    const existing = await payload.find({
      collection: 'placement-hero',
      where: { studentName: { equals: h.studentName } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      skippedHero++
      continue
    }
    try {
      await createWithRetry(payload, {
        collection: 'placement-hero',
        data: { ...h, status: 'published' },
      })
      createdHero++
    } catch (err) {
      console.error(`Failed to create hero card "${h.studentName}":`, err?.message || err)
      failedHero.push(h.studentName)
    }
  }

  console.log(
    `Placements: created ${createdPlacements}, skipped ${skippedPlacements} (already existed)${failedPlacements.length ? `, failed ${failedPlacements.length} (${failedPlacements.join(', ')}) — just re-run the script, it'll pick up where it left off` : ''}.`,
  )
  console.log(
    `Placement Hero: created ${createdHero}, skipped ${skippedHero} (already existed)${failedHero.length ? `, failed ${failedHero.length} (${failedHero.join(', ')}) — just re-run the script` : ''}.`,
  )
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
