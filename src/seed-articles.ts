// @ts-nocheck
// One-off seed script: migrates the hardcoded INITIAL_ARTICLES array from
// tulas_rev/src/lib/data/media.js into the new "articles" collection, so
// the /media page has real (if placeholder-Hindi) content to render from
// day one instead of an empty list. Every article's title/category/date/
// author/excerpt/image below was copied directly from that file — nothing
// invented, per the client's note that the Hindi text is fine to keep as
// placeholder for now.
//
// Notes on mapping:
//  - heroType "large"/"small-1"/"small-2" -> heroPosition (same values).
//  - heroType "wide" (article id 4) was never actually read by the old
//    HeroMosaic component (it only looks for large/small-1/small-2), so
//    it's dropped to heroPosition "none" here — it was a dead value.
//  - views/comments are intentionally NOT migrated — client decided to
//    drop fake stats rather than keep manually-typed placeholder numbers.
//  - body: the old site never had real per-article body copy (every
//    article detail page rendered the exact same hardcoded Hindi
//    paragraph). There's nothing genuine to migrate for `body`, so this
//    seeds it from that article's own excerpt instead of fabricating new
//    text — editors should replace this with the real article later.
//
// Idempotent: skips any slug that already exists, so it's safe to re-run.
//
// RUN IT WITH:  npx tsx src/seed-articles.ts

import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Builds the minimal valid Lexical SerializedEditorState the richText
// field expects, from one or more plain-text paragraphs.
function lexicalDoc(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: paragraphs.filter(Boolean).map((text) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          {
            type: 'text',
            format: 0,
            style: '',
            mode: 'normal',
            detail: 0,
            text,
            version: 1,
          },
        ],
      })),
    },
  }
}

const articles = [
  {
    id: 1,
    category: 'DBUU Events',
    title: "देव भूमि उत्तराखंड विश्वविद्यालय में 'पिनाक 2026' सांस्कृतिक महोत्सव का भव्य आगाज़",
    subtitle: '19 मई से, पद्मश्री शंकर महादेवन और देव नेगी देंगे खास रंगारंग सांस्कृतिक प्रस्तुतियां',
    date: '2026-08-07',
    author: 'Admin',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1000',
    heroType: 'large',
    excerpt: "देवभूमि उत्तराखंड विश्वविद्यालय में आयोजित वार्षिक सांस्कृतिक महोत्सव 'पिनाक 2026' में देश के प्रख्यात कलाकारों का समागम होने जा रहा है।",
  },
  {
    id: 2,
    category: 'Awards',
    title: 'Best Emerging University Award by Asian Education Award',
    date: '2026-07-28',
    author: 'Admin',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    heroType: 'small-1',
    excerpt: 'विश्वविद्यालय को मिला एक और ऐतिहासिक सम्मान, एशियन एजुकेशन अवार्ड्स में मिला सर्वश्रेष्ठ उभरता हुआ संस्थान पुरस्कार।',
  },
  {
    id: 3,
    category: 'Academics',
    title: "देव भूमि उत्तराखंड विश्वविद्यालय में 'दीक्षारंभ 2026' का भव्य आयोजन",
    date: '2026-08-02',
    author: 'Admin',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
    heroType: 'small-2',
    excerpt: 'नवप्रवेशित छात्र-छात्राओं का स्वागत एवं ओरिएंटेशन कार्यक्रम दीक्षारंभ बड़े उत्साह एवं उमंग के साथ संपन्न।',
  },
  {
    id: 4,
    category: 'Achievements',
    title: 'Limca Book Of Record में दर्ज हुआ DBUU का नाम',
    date: '2026-06-15',
    author: 'Admin',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1200',
    heroType: 'none', // was "wide" — never rendered by the old hero component
    excerpt: 'सामूहिक सामाजिक पहल एवं रिकॉर्ड-तोड़ अकादमिक भागीदारी के लिए लिमका बुक ऑफ रिकॉर्ड्स द्वारा मान्यता प्राप्त।',
  },
  {
    id: 5,
    category: 'Faculty Dev',
    title: 'शिक्षकों के लिए सार्वभौमिक मानवीय मूल्यों पर तीन दिवसीय फैकल्टी डेवलपमेंट प्रोग्राम',
    date: '2026-01-09',
    author: 'Admin',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600',
    heroType: 'none',
    excerpt: 'तकनीकी शिक्षा परिषद (AICTE) के तत्वावधान में आयोजित कार्यक्रम में नैतिक शिक्षा एवं मानवीय मूल्यों पर विशेष सत्र आयोजित किए गए।',
  },
  {
    id: 6,
    category: 'Research',
    title: 'ISRO के पूर्व चेयरमैन प्रो. के. कस्तूरीरंगन ने DBUU में अंतर्राष्ट्रीय कॉन्फ्रेंस को किया संबोधित',
    date: '2025-11-16',
    author: 'Admin',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600',
    heroType: 'none',
    excerpt: 'अंतर्राष्ट्रीय संगोष्ठी में स्पेस रिसर्च, डेटा साइंस और भविष्य की तकनीकों पर शोध पत्रों का वाचन किया गया।',
  },
  {
    id: 7,
    category: 'Health & Tech',
    title: 'अत्यधिक सक्रिय इम्यून सिस्टम हो सकता है खतरनाक: डॉ. रोहात्गी',
    date: '2025-11-15',
    author: 'Admin',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600',
    heroType: 'none',
    excerpt: 'एमआई कॉन्फ्रेंस में चिकित्सा शोधकर्ताओं ने इम्यूनोलॉजी और ऑटोइम्यून विकारों के आधुनिक निदान पर प्रकाश डाला।',
  },
  {
    id: 8,
    category: 'Microbiology',
    title: 'डीबीयूयू में माइक्रोबायोलॉजी से जुड़े कई रोचक मुद्दों पर मंथन',
    date: '2025-11-14',
    author: 'Admin',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=600',
    heroType: 'none',
    excerpt: 'लाइफ साइंसेज विभाग द्वारा अंतर्राष्ट्रीय सम्मेलन में सूक्ष्मजीवों के औद्योगिक उपयोग पर विशेषज्ञों की परिचर्चा।',
  },
  {
    id: 9,
    category: 'Campus Life',
    title: "देवभूमि उत्तराखंड विश्वविद्यालय में फ्रेशर पार्टी 'आगाज़ 2025' का आयोजन",
    date: '2025-10-12',
    author: 'Admin',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600',
    heroType: 'none',
    excerpt: 'नए छात्रों के स्वागत में रंगारंग प्रस्तुतियां, मिस्टर एवं मिस फ्रेशर का चयन और सांस्कृतिक प्रतियोगिताएं।',
  },
  {
    id: 10,
    category: 'Forensic Science',
    title: "नेशनल फॉरेंसिक साइंस वीक पर आयोजित हुआ 'एविडेंशिया 3.0'",
    date: '2025-09-20',
    author: 'Admin',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600',
    heroType: 'none',
    excerpt: 'फॉरेंसिक लैब तकनीकों, डिजिटल अपराध जांच और क्राइम सीन इन्वेस्टिगेशन पर प्रैक्टिकल वर्कशॉप।',
  },
]

async function run() {
  const payload = await getPayload({ config })

  let created = 0
  let skipped = 0

  for (const a of articles) {
    const slug = `${slugify(a.category)}-${a.id}`

    const existing = await payload.find({
      collection: 'articles',
      where: { slug: { equals: slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`SKIP (already exists): ${slug}`)
      skipped++
      continue
    }

    await payload.create({
      collection: 'articles',
      data: {
        title: a.title,
        slug,
        category: a.category,
        author: a.author,
        publishedDate: new Date(a.date).toISOString(),
        readTime: a.readTime,
        imageUrl: a.image,
        excerpt: a.excerpt,
        body: lexicalDoc([a.subtitle, a.excerpt]),
        heroPosition: a.heroType,
        status: 'published',
      },
    })
    console.log(`CREATED: ${slug}`)
    created++
  }

  console.log(`\nDone. Created ${created}, skipped ${skipped}, out of ${articles.length} total.`)
  process.exit(0)
}

run()
