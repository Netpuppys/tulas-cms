// One-off: fills the new `home-intro` Global with the exact copy that used
// to be hardcoded in tulas_rev's home.jsx (the "Best University in
// Dehradun" SEO block). The Global stores this as two richText fields —
// `intro` (always visible) and `more` (shown after "Read More") — so this
// script builds plain Lexical JSON nodes for each paragraph/heading/list
// instead of writing separate array-of-paragraphs / array-of-sections /
// array-of-FAQs records like the first version of this Global did.
//
// Safe to run more than once — it always overwrites the Global with this
// same content, it just won't do anything different the second time.
//
// RUN IT WITH:  npx tsx src/seed-home-intro.ts

import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

// --- tiny Lexical node builders --------------------------------------------
function text(t: string, bold = false) {
  return { type: 'text', text: t, format: bold ? 1 : 0, style: '', mode: 'normal', detail: 0, version: 1 }
}
function paragraph(t: string) {
  return { type: 'paragraph', children: [text(t)], direction: 'ltr', format: '', indent: 0, version: 1 }
}
function heading(tag: 'h2' | 'h3', t: string) {
  return { type: 'heading', tag, children: [text(t)], direction: 'ltr', format: '', indent: 0, version: 1 }
}
function bulletList(items: Array<string | { label?: string; text: string }>) {
  return {
    type: 'list',
    listType: 'bullet',
    tag: 'ul',
    start: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
    children: items.map((item) => {
      const isObj = typeof item === 'object'
      const label = isObj ? item.label : undefined
      const body = isObj ? item.text : item
      const children = label ? [text(`${label}: `, true), text(body)] : [text(body)]
      return {
        type: 'listitem',
        value: 1,
        children,
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      }
    }),
  }
}
function doc(children: Record<string, unknown>[]) {
  return {
    root: {
      type: 'root',
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}
// ----------------------------------------------------------------------------

const introParagraph =
  "Tulas University, Dehradun, established in 2006 under the aegis of Rishabh Educational Trust, has been notified as a Private University under the Uttarakhand Private Universities (Amendment) Act, 2026 vide Gazette Notification No. 236/XXXVI (3)/2026/33(1)/2026 dated 09.07.2026, under Section 2, Serial No. 12."

const intro = doc([paragraph(introParagraph)])

const more = doc([
  paragraph(
    "Recognised by the University Grants Commission (UGC) under Section 2(f) of the UGC Act, 1956, and approved by AICTE, Bar Council of India (BCI), and Pharmacy Council of India (PCI), the University holds an A+ Grade accreditation from NAAC and NBA accreditation for eligible programmes. UBTER approves diploma programmes. Before its notification as a Private University, the institution was affiliated with VMSB Uttarakhand Technical University (UTU) and Sri Dev Suman Uttarakhand University (SDSUV).",
  ),
  paragraph(
    "For students and parents evaluating the best university in Dehradun, Tulas offers a rare mix of legacy, regulatory credibility, and a growing industry network.",
  ),

  heading('h2', 'Why Tulas Stands Among the Best Private Universities in Dehradun'),
  paragraph(
    'Choosing the right university involves looking beyond brochures at approvals, faculty, infrastructure, and outcomes. Tulas addresses each of these:',
  ),
  bulletList([
    {
      label: 'Regulatory recognition',
      text: 'UGC 2(f), AICTE, BCI, PCI approvals. Diploma programmes approved by UBTER. Notified vide Gazette No. 236/XXXVI (3)/2026/33(1)/2026 dated 09.07.2026.',
    },
    { label: 'Accreditation', text: 'A+ Grade from NAAC and NBA accreditation for eligible programmes' },
    {
      label: 'Academic diversity',
      text: '50+ programmes across 7 Schools - Engineering, Management & Commerce, Computer Applications, Pharmacy, Law, Agriculture, Mass Communication and Journalism',
    },
    {
      label: 'Infrastructure depth',
      text: 'Modern classrooms, advanced labs, computing facilities, library, sports infrastructure, industry-collaboration centres, research & innovation facilities across a 22-acre campus',
    },
    {
      label: 'Industry connect',
      text: '750+ global hiring partners, 10,000+ alumni network, Tulas Career Catalyst Initiative (TCCI)',
    },
    { label: 'Legacy', text: '20 years of consistent academic operation in Dehradun' },
  ]),

  heading('h2', 'Academic Programmes Across 7 Schools'),
  paragraph('Tulas University offers 50+ programmes spread across seven schools:'),
  bulletList([
    'School of Engineering',
    'School of Management & Commerce',
    'School of Computer Applications',
    'School of Pharmacy',
    'School of Law',
    'School of Agriculture',
    'School of Mass Communication and Journalism',
  ]),

  heading('h2', 'A Trusted Dehradun Engineering University'),
  paragraph(
    'Engineering remains one of the most sought-after streams. As a well-established B.Tech college in Dehradun, the School of Engineering offers specialisations across Core engineering disciplines, emerging and technology-driven fields, Computing and applied sciences.',
  ),

  heading('h2', 'Campus Infrastructure Built for Holistic Learning'),
  paragraph(
    'Modern classrooms, Advanced laboratories, Computing facilities, Library resources, Sports infrastructure, Industry-collaboration centres, Dedicated research & innovation facilities.',
  ),

  heading('h2', 'Industry Exposure and Career Readiness'),
  paragraph(
    'Structured internships, Corporate interactions, Research and innovation projects, Collaboration with 750+ global hiring partners, 10,000+ alumni network.',
  ),

  heading('h2', "Tulas Within Uttarakhand's Higher Education Landscape"),
  bulletList([
    'A two-decade academic legacy',
    'Multi-body regulatory approval (UGC, AICTE, BCI, PCI)',
    'A+ NAAC and NBA accreditation',
    'A diversified academic portfolio across seven schools',
  ]),

  heading('h2', 'FAQs'),
  ...[
    {
      q: 'How do I know if a university in Dehradun is UGC recognised?',
      a: 'A UGC-recognised university must be approved under Section 2(f) of the UGC Act, 1956. Tulas University holds this approval, along with AICTE, BCI, and PCI recognition, and is notified vide Gazette No. 236/XXXVI (3)/2026 dated 09.07.2026.',
    },
    {
      q: 'Which is the best university in Dehradun for higher education?',
      a: 'The best university combines UGC recognition, strong accreditation (NAAC/NBA), industry exposure, and placement support. Tulas University fits this profile with a 20-year legacy, NAAC A+ accreditation, 50+ programmes across 7 schools, and 750+ global hiring partners.',
    },
    {
      q: 'What accreditation should a good private university in Dehradun have?',
      a: 'A good private university should hold NAAC accreditation (A or A+ grade), NBA accreditation for its technical programmes, and UGC approval under Section 2(f). Tulas University holds NAAC A+ and NBA accreditation.',
    },
    {
      q: 'Which engineering university in Dehradun offers AI and emerging-tech specialisations?',
      a: "At Tulas University's School of Engineering, students can choose CSE, AI & Machine Learning, Data Science, Cyber Security, or Full Stack Development — all AI-integrated — as well as Civil, Mechanical, and Electrical & Electronics Engineering.",
    },
    {
      q: 'What is the eligibility and duration for a B.Tech programme in Dehradun?',
      a: 'Most B.Tech programmes require 10+2 with Physics, Chemistry, and Mathematics, and run for 4 years across 8 semesters.',
    },
    {
      q: 'How do I find a university for engineering in Dehradun with good placement support?',
      a: 'Look for a dedicated Training & Placement Cell and a wide recruiter base. Tulas University runs this through its Tulas Career Catalyst Initiative (TCCI), backed by 750+ global hiring partners.',
    },
    {
      q: 'What courses can I study at a private university in Dehradun besides engineering?',
      a: 'Management, commerce, law, pharmacy, computer applications, agriculture, and mass communication. Tulas runs 7 schools covering all these fields.',
    },
    {
      q: 'Which are the top private universities in Uttarakhand?',
      a: "Top private universities are judged by NAAC standing, UGC recognition, and placement record. Tulas University is among them, holding NAAC A+ Grade and a position among India's top private colleges.",
    },
    {
      q: 'What should I look for in campus infrastructure before joining a university?',
      a: "Functional labs, a well-stocked library, hostel and sports facilities, and dedicated space for research. Tulas's 22-acre campus includes AI, Robotics, and Data Analytics labs, along with a Maker Space.",
    },
    {
      q: 'Do universities in Dehradun offer AI-integrated learning across all courses, or only in computer science?',
      a: 'At Tulas University, AI is built into the curriculum across all 7 schools.',
    },
    {
      q: "Why does a university's affiliation matter when choosing where to study?",
      a: 'Affiliation affects whether a degree is accepted for further studies and competitive exams. Tulas was formerly affiliated with UTU and Sri Dev Suman University. After being notified as a Private University in 2026, its degrees are now awarded directly by Tulas University itself under UGC Section 2(f) and Gazette Notification No. 236/XXXVI (3)/2026.',
    },
    {
      q: 'What kind of industry exposure can engineering students expect during their degree?',
      a: 'Strong programmes combine internships, real industry projects, and professional certifications. At Tulas, students have worked on projects such as AI chatbots and crop-disease detection systems, and can earn certifications from AWS, Microsoft, Google, and IBM.',
    },
    {
      q: 'How long should a private university have been running before I trust its placement claims?',
      a: 'Typically a decade or more. Tulas has a 20-year academic history in Dehradun, with 10,000+ alumni.',
    },
    {
      q: 'Is it better to choose a university with one specialised programme or one offering many fields?',
      a: 'A specialised institute suits a fixed goal, while a multi-school university gives room to explore. Tulas offers engineering, management, law, pharmacy, agriculture, and mass communication under one roof.',
    },
    {
      q: 'What should I verify before taking admission at any private university?',
      a: "Verify the university's UGC Section 2(f) status, State Govt. Gazette Notification No. for Private University status, relevant regulatory approval for your course (AICTE, BCI, PCI), and its NAAC/NBA accreditation.",
    },
  ].flatMap(({ q, a }, i) => [heading('h3', `${i + 1}. ${q}`), paragraph(a)]),
])

const credentials = ['UGC 2(f)', 'AICTE', 'BCI', 'PCI', 'NAAC A+', 'NBA']

async function main() {
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'home-intro',
    data: {
      title: 'Best University in Dehradun: ',
      highlight: 'Tulas University',
      intro,
      more,
      credentials,
    },
  })

  console.log('home-intro global seeded.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
