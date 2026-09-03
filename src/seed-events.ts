// @ts-nocheck
// One-off seed script: populates the new "events" collection with the 14
// events that used to be hardcoded in tulas_rev's src/lib/data/events.js,
// so /events and the homepage "Upcoming Events" section have real content
// to render immediately. Images point at the same Unsplash URLs the old
// hardcoded data used, via the "Image URL" field — no upload needed.
//
// `link` is deliberately left empty for all of these: the old data had
// every event's link set to the placeholder "#", which isn't a real
// destination. Leaving it empty exercises the "no button shown" state
// cleanly — same call made for Academic Notifications. Fill in real
// registration/details links per event from the CMS admin whenever ready.
//
// Idempotent: skips any event whose title already exists. Safe to re-run.
//
// RUN IT WITH:  npx tsx src/seed-events.ts

import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

const MONTHS = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' }

// "05-Sep-2026" -> "2026-09-05"
function toIsoDate(d: string) {
  const [day, mon, year] = d.split('-')
  return `${year}-${MONTHS[mon]}-${day.padStart(2, '0')}`
}

const events = [
  { title: 'Annual Tech Fest – Innovate 2026', description: 'A campus-wide celebration of technology with hackathons, robotics demos, and guest talks from industry innovators.', author: 'Dept. of Computer Science', date: toIsoDate('05-Sep-2026'), timeline: '10:00 AM – 6:00 PM', location: 'Innovation Hub, Block C', category: 'Technical', imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80' },
  { title: 'Rangotsav – Cultural Night', description: 'An evening of music, dance, and drama as students showcase the diverse cultures that make up our campus.', author: 'Cultural Committee', date: toIsoDate('12-Sep-2026'), timeline: '6:00 PM – 10:00 PM', location: 'Open Air Amphitheatre', category: 'Cultural', imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80' },
  { title: 'Fashion Extravaganza', description: 'Student designers and models walk the ramp in a showcase of creativity, style, and campus talent.', author: 'Fashion & Design Club', date: toIsoDate('20-Sep-2026'), timeline: '5:00 PM – 8:00 PM', location: 'Main Auditorium', category: 'Cultural', imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80' },
  { title: "Freshers' Welcome Night", description: 'A warm welcome for the newest batch of students, packed with games, performances, and icebreakers.', author: 'Student Council', date: toIsoDate('28-Sep-2026'), timeline: '5:30 PM – 9:00 PM', location: 'Central Lawn', category: 'Campus Life', imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80' },
  { title: 'Sunburn Music Fest', description: 'Top DJs and live acts take over the campus grounds for a high-energy night of music and dance.', author: 'Cultural Committee', date: toIsoDate('03-Oct-2026'), timeline: '7:00 PM – 11:00 PM', location: 'Campus Grounds', category: 'Cultural', imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80' },
  { title: 'TEDx Tulas – Ideas Worth Sharing', description: 'Independently organized talks from thinkers, founders, and alumni sharing ideas that spark curiosity.', author: 'TEDx Tulas Organizing Team', date: toIsoDate('10-Oct-2026'), timeline: '11:00 AM – 3:00 PM', location: 'Seminar Hall, Block A', category: 'Talks', imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=800&q=80' },
  { title: 'Inter-College Sports Meet', description: 'Athletes from colleges across the region compete in track, field, and team sports for the championship title.', author: 'Sports Department', date: toIsoDate('18-Oct-2026'), timeline: '8:00 AM – 5:00 PM', location: 'University Sports Complex', category: 'Sports', imageUrl: 'https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=800&q=80' },
  { title: 'Design Thinking Workshop', description: 'A hands-on session teaching students how to solve real-world problems using human-centered design.', author: 'Design Cell', date: toIsoDate('25-Oct-2026'), timeline: '10:00 AM – 1:00 PM', category: 'Workshop', imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80' },
  { title: 'Campus Placement Drive', description: 'Leading recruiters visit campus to interview and hire final-year students across multiple disciplines.', author: 'Training & Placement Cell', date: toIsoDate('02-Nov-2026'), timeline: '9:00 AM – 4:00 PM', location: 'Placement Auditorium', category: 'Placement', imageUrl: 'https://images.unsplash.com/photo-1560439514-4e9645039924?auto=format&fit=crop&w=800&q=80' },
  { title: 'Open Mic Night', description: 'Students take the stage to share poetry, stand-up, and music in a relaxed, open-floor evening.', author: 'Literary & Arts Club', date: toIsoDate('08-Nov-2026'), timeline: '7:00 PM – 9:30 PM', category: 'Cultural', imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80' },
  { title: "Founder's Day Celebration", description: "A tribute to the institute's founding vision, featuring alumni stories and a look back at our journey.", author: 'Office of the Dean', date: toIsoDate('15-Nov-2026'), timeline: '4:00 PM – 8:00 PM', location: 'Main Auditorium', category: 'Campus Life', imageUrl: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=800&q=80' },
  { title: 'Alumni Meet & Reunion', description: 'Graduates return to campus to reconnect, network, and share how far their journeys have taken them.', author: 'Alumni Relations Cell', date: toIsoDate('22-Nov-2026'), timeline: '5:00 PM – 9:00 PM', location: 'Convention Centre', category: 'Alumni', imageUrl: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=80' },
  { title: 'Live Band Night', description: 'Campus bands and guest performers bring live music to the amphitheater for a night under the stars.', author: 'Music Society', date: toIsoDate('29-Nov-2026'), timeline: '7:30 PM – 10:30 PM', location: 'Open Air Amphitheatre', category: 'Cultural', imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80' },
  { title: 'Annual Fest Finale', description: "The grand closing ceremony of the year's festivities, complete with awards, performances, and fireworks.", author: 'Student Council', date: toIsoDate('05-Dec-2026'), timeline: '6:00 PM – 10:00 PM', location: 'Main Grounds', category: 'Cultural', imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80' },
]

// Atlas shared-tier clusters occasionally throw transient errors on write —
// same helper used across the other seed/migration scripts in this repo.
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

  let created = 0
  let skipped = 0
  const failed = []
  for (const e of events) {
    const existing = await payload.find({
      collection: 'events',
      where: { title: { equals: e.title } },
      limit: 1,
    })
    if (existing.docs.length > 0) {
      skipped++
      continue
    }
    try {
      await createWithRetry(payload, {
        collection: 'events',
        data: { ...e, status: 'published' },
      })
      created++
    } catch (err) {
      console.error(`Failed to create event "${e.title}":`, err?.message || err)
      failed.push(e.title)
    }
  }

  console.log(
    `Events: created ${created}, skipped ${skipped} (already existed)${failed.length ? `, failed ${failed.length} (${failed.join(', ')}) — just re-run the script, it'll pick up where it left off` : ''}.`,
  )
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
