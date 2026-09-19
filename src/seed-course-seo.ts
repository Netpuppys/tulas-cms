// @ts-nocheck
// One-off backfill: fills the new Courses `meta` (SEO title / SEO description)
// fields from the old site's SEO-METADATA.txt reference file.
//
// Matching is by slug, then double-checked by name: every entry below carries
// the Course title that was verified against the SEO file, and a record whose
// live title no longer equals it is skipped and reported instead of written
// to. Old-site paths (e.g. /courses/btech/civil-engineering/) map to the CMS's
// hyphenated slugs (btech-civil-engineering), see normalize-course-slugs.ts.
//
// Not included on purpose (needs a human decision):
//   - /courses/bcom/  (file text is about "B.Com (Hons.)"; the CMS course is "B.Com")
//   - the `mtech` course (only /mtech/ exists in the file, not /courses/mtech/, and its
//     text lists 3 specialisations while the CMS page content is CS/AI only)
//   - /courses/bjmc/ and /courses/applied-science/  (no matching Courses record)
//
// Idempotent and non-destructive: a course that already has an SEO title or
// description is left alone unless --force is passed.
//
// RUN IT WITH:  npx tsx src/seed-course-seo.ts --dry-run   (preview only)
//               npx tsx src/seed-course-seo.ts             (write)

import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

const DRY_RUN = process.argv.includes('--dry-run')
const FORCE = process.argv.includes('--force')

const ENTRIES = [
  {
    slug: "ba-llb",
    expectedTitle: "BA LLB",
    expectedProgram: "BA LLB",
    expectedLevel: "undergraduate",
    source: "/courses/ba-llb/",
    seoTitle: "BA LLB in Dehradun | 5 Year Integrated Law | Tulas University",
    seoDescription: "Pursue BA LLB at Tulas University, Dehradun. A BCI recognised 5-year integrated law degree with moot courts, legal aid clinics and chamber internships.",
  },
  {
    slug: "bba",
    expectedTitle: "BBA",
    expectedProgram: "BBA",
    expectedLevel: "undergraduate",
    source: "/courses/bba/",
    seoTitle: "BBA in Dehradun | Bachelor of Business Administration | Tulas",
    seoDescription: "Pursue BBA at Tulas University, Dehradun. Build management, finance, marketing and analytics skills through live projects, internships and campus placements.",
  },
  {
    slug: "bba-business-analytics",
    expectedTitle: "BBA Business Analytics",
    expectedProgram: "BBA",
    expectedLevel: "undergraduate",
    source: "/courses/bba/business-analytics/",
    seoTitle: "BBA in Business Analytics in Dehradun | Tulas University",
    seoDescription: "Pursue BBA in Business Analytics at Tulas University, Dehradun. Learn data-driven decision making, visualisation and business intelligence from year one.",
  },
  {
    slug: "bba-digital-marketing",
    expectedTitle: "BBA in Digital Marketing",
    expectedProgram: "BBA",
    expectedLevel: "undergraduate",
    source: "/courses/bba/digital-marketing/",
    seoTitle: "BBA in Digital Marketing in Dehradun | Tulas University",
    seoDescription: "Pursue BBA in Digital Marketing at Tulas University, Dehradun. Learn SEO, social media, content strategy and paid campaigns through live client projects.",
  },
  {
    slug: "bba-llb",
    expectedTitle: "BBA LL.B.",
    expectedProgram: "BBA LLB",
    expectedLevel: "undergraduate",
    source: "/courses/bba-llb/",
    seoTitle: "BBA LLB in Dehradun | 5 Year Integrated Law Course | Tulas University",
    seoDescription: "Pursue BBA LLB at Tulas University, Dehradun. A 5-year integrated programme combining business management with corporate law, moot courts and internships.",
  },
  {
    slug: "bca",
    expectedTitle: "Bachelor of Computer Applications (BCA)",
    expectedProgram: "BCA",
    expectedLevel: "undergraduate",
    source: "/courses/bca/",
    seoTitle: "BCA in Dehradun | Bachelor of Computer Applications | Tulas University",
    seoDescription: "Pursue BCA at Tulas University, Dehradun. A 3-year programme in programming, web development, databases and cloud computing with AI-integrated learning.",
  },
  {
    slug: "bca-artificial-intelligence-and-machine-learning",
    expectedTitle: "BCA in Artificial Intelligence & Machine Learning",
    expectedProgram: "BCA",
    expectedLevel: "undergraduate",
    source: "/courses/bca/artificial-intelligence-&-machine-learning/",
    seoTitle: "BCA in Artificial Intelligence & Machine Learning | Tulas University",
    seoDescription: "Pursue BCA in AI & Machine Learning at Tulas University, Dehradun. Learn Python, neural networks, deep learning and intelligent systems in hands-on AI labs.",
  },
  {
    slug: "bca-fullstack-development",
    expectedTitle: "BCA in Full Stack Development",
    expectedProgram: "BCA",
    expectedLevel: "undergraduate",
    source: "/courses/bca/fullstack-devlopment/",
    seoTitle: "BCA in Full Stack Development in Dehradun | Tulas University",
    seoDescription: "Pursue BCA in Full Stack Development at Tulas University, Dehradun. Master front-end, back-end, databases and cloud deployment while building a portfolio.",
  },
  {
    slug: "bcom-hons",
    expectedTitle: "B.Com (Hons.)",
    expectedProgram: "B.Com (Hons.)",
    expectedLevel: "undergraduate",
    source: "/courses/bcom-hons/",
    seoTitle: "B.Com (Hons.) in Dehradun | Tulas University",
    seoDescription: "Pursue B.Com (Hons.) at Tulas University, Dehradun. Study accounting, taxation, corporate law and financial management with strong placement support.",
  },
  {
    slug: "bpharma",
    expectedTitle: "B.Pharma",
    expectedProgram: "B.Pharma",
    expectedLevel: "undergraduate",
    source: "/courses/bpharma/",
    seoTitle: "B.Pharm in Dehradun | Bachelor of Pharmacy | Tulas University",
    seoDescription: "Pursue B.Pharm at Tulas University, Dehradun. A PCI approved 4-year degree covering pharmaceutics, pharmacology and drug analysis with industrial training.",
  },
  {
    slug: "bsc-agriculture",
    expectedTitle: "B.Sc. (Hons.) Agriculture",
    expectedProgram: "B.Sc",
    expectedLevel: "undergraduate",
    source: "/courses/bsc-agriculture/",
    seoTitle: "B.Sc Agriculture in Dehradun | 4 Year Degree | Tulas University",
    seoDescription: "Pursue B.Sc (Hons.) Agriculture at Tulas University, Dehradun. Study agronomy, horticulture, soil science and agri-technology with hands-on farm training.",
  },
  {
    slug: "btech",
    expectedTitle: "Bachelor of Technology (B.Tech)",
    expectedProgram: "B.Tech",
    expectedLevel: "undergraduate",
    source: "/courses/btech/",
    seoTitle: "B.Tech Courses in Dehradun | Specialisations & Fees | Tulas University",
    seoDescription: "Explore B.Tech programmes at Tulas University, Dehradun: CSE, AI & ML, Data Science, Cyber Security, Civil, Mechanical, ECE and EEE. Check fees and placements.",
  },
  {
    slug: "btech-civil-engineering",
    expectedTitle: "B.Tech Civil Engineering",
    expectedProgram: "B.Tech",
    expectedLevel: "undergraduate",
    source: "/courses/btech/civil-engineering/",
    seoTitle: "B.Tech Civil Engineering in Dehradun | Tulas University",
    seoDescription: "Study B.Tech Civil Engineering at Tulas University, Dehradun. Learn structural design, construction management and sustainable infrastructure with lab training.",
  },
  {
    slug: "btech-computer-science",
    expectedTitle: "B.Tech Computer Science & Engineering",
    expectedProgram: "B.Tech",
    expectedLevel: "undergraduate",
    source: "/courses/btech/computer-science/",
    seoTitle: "B.Tech CSE in Dehradun | Computer Science Engineering | Tulas University",
    seoDescription: "Study B.Tech Computer Science & Engineering at Tulas University, Dehradun. Master programming, system architecture and emerging tech with placement support.",
  },
  {
    slug: "btech-computer-science-engineering-cyber-security",
    expectedTitle: "B.Tech Cyber Security",
    expectedProgram: "B.Tech",
    expectedLevel: "undergraduate",
    source: "/courses/btech/computer-science-engineering-cyber-security/",
    seoTitle: "B.Tech Cyber Security in Dehradun | Tulas University",
    seoDescription: "Study B.Tech CSE in Cyber Security at Tulas University, Dehradun. Learn ethical hacking, network security, digital forensics and cyber defence in AI-led labs.",
  },
  {
    slug: "btech-computer-science-engineering-data-science",
    expectedTitle: "B.Tech Data Science",
    expectedProgram: "B.Tech",
    expectedLevel: "undergraduate",
    source: "/courses/btech/computer-science-engineering-data-science/",
    seoTitle: "B.Tech Data Science in Dehradun | Tulas University",
    seoDescription: "Study B.Tech CSE in Data Science at Tulas University, Dehradun. Learn analytics, machine learning, visualisation and modelling through real industry projects.",
  },
  {
    slug: "btech-electrical-and-electronics-engineering",
    expectedTitle: "B.Tech Electrical & Electronics Engineering",
    expectedProgram: "B.Tech",
    expectedLevel: "undergraduate",
    source: "/courses/btech/electrical-and-electronics-engg/",
    seoTitle: "B.Tech Electrical & Electronics Engineering | Tulas University, Dehradun",
    seoDescription: "Study B.Tech EEE at Tulas University, Dehradun. Build expertise in power systems, electrical machines, smart grids and industrial automation in modern labs.",
  },
  {
    slug: "btech-electronics-and-communication-engineering",
    expectedTitle: "B.Tech Electronics & Communication Engineering",
    expectedProgram: "B.Tech",
    expectedLevel: "undergraduate",
    source: "/courses/btech/electronics-and-communication-engg/",
    seoTitle: "B.Tech ECE in Dehradun | Electronics & Communication | Tulas University",
    seoDescription: "Study B.Tech ECE at Tulas University, Dehradun. Learn embedded systems, VLSI, IoT and communication networks with fully equipped practical laboratories.",
  },
  {
    slug: "btech-mechanical-engineering",
    expectedTitle: "B.Tech Mechanical Engineering",
    expectedProgram: "B.Tech",
    expectedLevel: "undergraduate",
    source: "/courses/btech/mechanical-engineering/",
    seoTitle: "B.Tech Mechanical Engineering in Dehradun | Tulas University",
    seoDescription: "Study B.Tech Mechanical Engineering at Tulas University, Dehradun. Learn thermodynamics, design, manufacturing and robotics in advanced workshops and labs.",
  },
  {
    slug: "computer-science-engineering-artifical-intelligence-and-machine-learning",
    expectedTitle: "Computer Science & Engineering (AI & ML)",
    expectedProgram: "Computer Science Engineering (AI & ML)",
    expectedLevel: "undergraduate",
    source: "/courses/btech/computer-science-engineering-artifical-intelligence-and-machine-learning/",
    seoTitle: "B.Tech AI & Machine Learning in Dehradun | Tulas University",
    seoDescription: "Study B.Tech CSE in AI & Machine Learning at Tulas University, Dehradun. Learn neural networks, deep learning, NLP and automation in industry-grade AI labs.",
  },
  {
    slug: "diploma-in-civil-engineering",
    expectedTitle: "Diploma in Civil Engineering",
    expectedProgram: "Diploma in Civil Engineering",
    expectedLevel: "diploma",
    source: "/courses/diploma-in-civil-engineering/",
    seoTitle: "Diploma in Civil Engineering in Dehradun | Tulas University",
    seoDescription: "Pursue a 3-year Diploma in Civil Engineering at Tulas University, Dehradun. Learn surveying, construction technology and structural drawing on live sites.",
  },
  {
    slug: "diploma-in-computer-science-engineering",
    expectedTitle: "Diploma in Computer Science Engineering",
    expectedProgram: "Diploma in Computer Science Engineering",
    expectedLevel: "diploma",
    source: "/courses/diploma-in-computer-science/",
    seoTitle: "Diploma in Computer Science Engineering in Dehradun | Tulas University",
    seoDescription: "Pursue a 3-year Diploma in Computer Science Engineering at Tulas University, Dehradun. Learn programming, networking and hardware in hands-on laboratories.",
  },
  {
    slug: "diploma-in-mechanical-engineering",
    expectedTitle: "Diploma in Mechanical Engineering",
    expectedProgram: "Diploma in Mechanical Engineering",
    expectedLevel: "diploma",
    source: "/courses/diploma-in-mechanical-engineering/",
    seoTitle: "Diploma in Mechanical Engineering in Dehradun | Tulas University",
    seoDescription: "Pursue a 3-year Diploma in Mechanical Engineering at Tulas University, Dehradun. Learn machine design, manufacturing processes and CAD in modern workshops.",
  },
  {
    slug: "dpharma",
    expectedTitle: "B.Pharma",
    expectedProgram: "D.Pharma",
    expectedLevel: "diploma",
    source: "/courses/dpharma/",
    seoTitle: "D.Pharm in Dehradun | Diploma in Pharmacy | Tulas University",
    seoDescription: "Pursue D.Pharm at Tulas University, Dehradun. A PCI approved 2-year diploma in pharmacy with hospital training and a direct route to pharmacist registration.",
  },
  {
    slug: "llb",
    expectedTitle: "LLB",
    expectedProgram: "LLB",
    expectedLevel: "undergraduate",
    source: "/courses/llb/",
    seoTitle: "LLB in Dehradun | 3 Year Law Programme | Tulas University",
    seoDescription: "Pursue LLB at Tulas University, Dehradun. A BCI recognised 3-year law degree with moot court training, legal aid clinics and internships with advocates.",
  },
  {
    slug: "mba",
    expectedTitle: "MBA",
    expectedProgram: "MBA",
    expectedLevel: "postgraduate",
    source: "/courses/mba/",
    seoTitle: "MBA in Dehradun | Specialisations, Fees & Placements | Tulas University",
    seoDescription: "Pursue MBA at Tulas University, Dehradun with specialisations in Marketing, Finance, HR, Business Analytics, Digital Marketing and International Business.",
  },
  {
    slug: "mba-agri-business",
    expectedTitle: "MBA in Agri Business",
    expectedProgram: "MBA",
    expectedLevel: "postgraduate",
    source: "/courses/mba/agri-business/",
    seoTitle: "MBA in Agri Business in Dehradun | Tulas University",
    seoDescription: "Pursue MBA in Agri Business at Tulas University, Dehradun. Learn agribusiness management, supply chain, rural marketing and agri-finance with field projects.",
  },
  {
    slug: "mba-business-analytics",
    expectedTitle: "MBA in Business Analytics",
    expectedProgram: "MBA",
    expectedLevel: "postgraduate",
    source: "/courses/mba/business-analytics/",
    seoTitle: "MBA in Business Analytics in Dehradun | Tulas University",
    seoDescription: "Pursue MBA in Business Analytics at Tulas University, Dehradun. Learn data visualisation, predictive modelling and decision science with Power BI and Python.",
  },
  {
    slug: "mba-digital-marketing",
    expectedTitle: "MBA Digital Marketing using AI",
    expectedProgram: "MBA",
    expectedLevel: "postgraduate",
    source: "/courses/mba/digital-marketing/",
    seoTitle: "MBA in Digital Marketing in Dehradun | Tulas University",
    seoDescription: "Pursue MBA in Digital Marketing at Tulas University, Dehradun. Learn SEO, performance marketing, social media strategy and analytics with live campaigns.",
  },
  {
    slug: "mba-finance",
    expectedTitle: "MBA in Finance",
    expectedProgram: "MBA",
    expectedLevel: "postgraduate",
    source: "/courses/mba/finance/",
    seoTitle: "MBA in Finance in Dehradun | Tulas University",
    seoDescription: "Pursue MBA in Finance at Tulas University, Dehradun. Master financial analysis, investment banking, risk management and corporate finance with certifications.",
  },
  {
    slug: "mba-human-resource-management",
    expectedTitle: "MBA in Human Resource Management",
    expectedProgram: "MBA",
    expectedLevel: "postgraduate",
    source: "/courses/mba/human-resource-managment/",
    seoTitle: "MBA in Human Resource Management in Dehradun | Tulas University",
    seoDescription: "Pursue MBA in HR at Tulas University, Dehradun. Learn talent acquisition, organisational behaviour, labour law and HR analytics with corporate internships.",
  },
  {
    slug: "mba-international-business",
    expectedTitle: "MBA in International Business",
    expectedProgram: "MBA",
    expectedLevel: "postgraduate",
    source: "/courses/mba/international-business/",
    seoTitle: "MBA in International Business in Dehradun | Tulas University",
    seoDescription: "Pursue MBA in International Business at Tulas University, Dehradun. Study global trade, export-import management, cross-border finance and global marketing.",
  },
  {
    slug: "mba-marketing",
    expectedTitle: "MBA in Marketing",
    expectedProgram: "MBA",
    expectedLevel: "postgraduate",
    source: "/courses/mba/marketing/",
    seoTitle: "MBA in Marketing in Dehradun | Tulas University",
    seoDescription: "Pursue MBA in Marketing at Tulas University, Dehradun. Learn brand management, consumer behaviour, sales strategy and digital marketing with live projects.",
  },
  {
    slug: "mca",
    expectedTitle: "MCA",
    expectedProgram: "MCA",
    expectedLevel: "postgraduate",
    source: "/courses/mca/",
    seoTitle: "MCA in Dehradun | Master of Computer Applications | Tulas University",
    seoDescription: "Pursue MCA at Tulas University, Dehradun. A 2-year postgraduate degree in advanced software engineering, data science and AI with industry certifications.",
  },
  {
    slug: "mca-artificial-intelligence-and-machine-learning",
    expectedTitle: "MCA in Artificial Intelligence & Machine Learning",
    expectedProgram: "MCA",
    expectedLevel: "postgraduate",
    source: "/courses/mca/artificial-intelligence-&-machine-learning/",
    seoTitle: "MCA in Artificial Intelligence & Machine Learning | Tulas University",
    seoDescription: "Pursue MCA in AI & Machine Learning at Tulas University, Dehradun. Specialise in deep learning, NLP, computer vision and MLOps in industry-grade AI labs.",
  },
  {
    slug: "mca-fullstack-development",
    expectedTitle: "MCA in Full Stack Development",
    expectedProgram: "MCA",
    expectedLevel: "postgraduate",
    source: "/courses/mca/fullstack-development/",
    seoTitle: "MCA in Full Stack Development in Dehradun | Tulas University",
    seoDescription: "Pursue MCA in Full Stack Development at Tulas University, Dehradun. Build enterprise applications across front-end, back-end, cloud and DevOps pipelines.",
  },
  {
    slug: "msc-agronomy",
    expectedTitle: "M.Sc. (Agronomy)",
    expectedProgram: "M.Sc",
    expectedLevel: "postgraduate",
    source: "/courses/msc-agronomy/",
    seoTitle: "M.Sc Agronomy in Dehradun | Tulas University",
    seoDescription: "Pursue M.Sc Agronomy at Tulas University, Dehradun. Advance your expertise in crop science, soil management, precision farming and agricultural research.",
  },
  {
    slug: "mtech-computer-science",
    expectedTitle: "M.Tech Computer Science & Engineering",
    expectedProgram: "M.Tech",
    expectedLevel: "postgraduate",
    source: "/courses/mtech/computer-science/",
    seoTitle: "M.Tech Computer Science in Dehradun | Tulas University",
    seoDescription: "Pursue M.Tech in Computer Science at Tulas University, Dehradun. Specialise in advanced algorithms, AI, cloud computing and research with AICTE curriculum.",
  },
  {
    slug: "mtech-structural-engineering",
    expectedTitle: "M.Tech Structural Engineering",
    expectedProgram: "M.Tech",
    expectedLevel: "postgraduate",
    source: "/courses/mtech/structural-engineering/",
    seoTitle: "M.Tech Structural Engineering in Dehradun | Tulas University",
    seoDescription: "Pursue M.Tech in Structural Engineering at Tulas University, Dehradun. Advance in structural analysis, earthquake engineering and industry-standard design.",
  },
  {
    slug: "mtech-thermal-engineering",
    expectedTitle: "M.Tech Thermal Engineering",
    expectedProgram: "M.Tech",
    expectedLevel: "postgraduate",
    source: "/courses/mtech/thermal-engineering/",
    seoTitle: "M.Tech Thermal Engineering in Dehradun | Tulas University",
    seoDescription: "Pursue M.Tech in Thermal Engineering at Tulas University, Dehradun. Specialise in heat transfer, refrigeration, IC engines and renewable energy systems.",
  },
]

async function run() {
  const payload = await getPayload({ config })

  let updated = 0
  const problems: string[] = []
  const alreadySet: string[] = []

  for (const e of ENTRIES) {
    const found = await payload.find({
      collection: 'courses',
      where: { slug: { equals: e.slug } },
      limit: 1,
    })
    const doc = found.docs[0]

    if (!doc) {
      problems.push(`${e.slug} — no Courses record with this slug`)
      continue
    }
    // Titles alone aren't unique (bpharma and dpharma are both titled
    // "B.Pharma"), so the program and level must match too.
    if (doc.title !== e.expectedTitle || doc.program !== e.expectedProgram || doc.level !== e.expectedLevel) {
      problems.push(`${e.slug} — is now "${doc.title}" / program "${doc.program}" / ${doc.level}, expected "${e.expectedTitle}" / program "${e.expectedProgram}" / ${e.expectedLevel}; skipped`)
      continue
    }
    if (!FORCE && (doc.meta?.title || doc.meta?.description)) {
      alreadySet.push(e.slug)
      continue
    }

    console.log(`${DRY_RUN ? '[dry-run] ' : ''}${e.slug}  <-  ${e.source}\n    title: ${e.seoTitle}\n    desc : ${e.seoDescription}`)
    if (!DRY_RUN) {
      await payload.update({
        collection: 'courses',
        id: doc.id,
        data: { meta: { title: e.seoTitle, description: e.seoDescription } },
      })
    }
    updated++
  }

  console.log('')
  console.log(`${DRY_RUN ? 'Would update' : 'Updated'} ${updated} of ${ENTRIES.length} courses.`)
  if (alreadySet.length) console.log(`Skipped (SEO already set, use --force to overwrite): ${alreadySet.join(', ')}`)
  if (problems.length) {
    console.log('Problems:')
    for (const p of problems) console.log(`  ${p}`)
  }
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
