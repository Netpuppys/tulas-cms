// @ts-nocheck
// One-off update script: fills in the 3 previously-empty Program Details tabs
// (Course Outcomes, Program Outcomes, Program Educational Objectives) for the
// "MCA" (generic) course — content pulled from the live, JS-rendered
// tulas.edu.in page via a real browser (these tabs are hidden behind
// client-side "click to expand" accordions and aren't in the page's raw
// HTML/server response, so this couldn't be scraped by a plain fetch).
//
// RUN IT WITH:  npx tsx src/update-tabs-mca.ts

import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

async function run() {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'courses',
    where: { slug: { equals: 'mca' } },
    limit: 1,
  })

  if (existing.docs.length === 0) {
    console.error('No course found with slug "mca" — nothing to update.')
    process.exit(1)
  }

  const doc = existing.docs[0]
  const sections = doc.sections || []

  const pdIndex = sections.findIndex((s) => s.blockType === 'programDetails')
  if (pdIndex === -1) {
    console.error('No programDetails block found on this course — nothing to update.')
    process.exit(1)
  }

  const pd = sections[pdIndex]

  pd.tabs = [
    { id: 'usps', num: '01', label: 'USPs' },
    { id: 'courseOutcomes', num: '02', label: 'Course Outcomes' },
    { id: 'programOutcomes', num: '03', label: 'Program Outcomes' },
    { id: 'peo', num: '04', label: 'Program Educational Objectives' },
  ]

  // Keep the existing USPs content entry, replace/add the other 3.
  const usps = (pd.contents || []).find((c) => c.tabId === 'usps')

  pd.contents = [
    usps || { tabId: 'usps', type: 'bullet', bulletItems: [] },
    {
      tabId: 'courseOutcomes',
      type: 'table',
      tableHeaders: ['Semester', 'Outcome'],
      tableRows: [
        { cells: ['Semester I', 'Apply operating systems, object-oriented programming, and programming fundamentals to solve foundational computing problems.'] },
        { cells: ['Semester II', 'Apply data structures, computer networks, and database management to build and deliver a first mini project, while beginning specialisation electives.'] },
        { cells: ['Semester III', 'Apply web technologies, security, and artificial intelligence concepts within a chosen specialisation, delivering a second mini project.'] },
        { cells: ['Semester IV', 'Apply quality assurance, innovation and entrepreneurship principles, and advanced specialisation skills to deliver an industry-sponsored major project.'] },
      ],
    },
    {
      tabId: 'programOutcomes',
      type: 'table',
      tableHeaders: ['PO', 'Outcome'],
      tableRows: [
        { cells: ['PO1 · Foundation Knowledge', 'Apply knowledge of mathematics, programming logic and coding fundamentals for solution architecture and problem solving.'] },
        { cells: ['PO2 · Problem Analysis', 'Identify, review, formulate and analyse problems primarily focussing on customer requirements using critical thinking frameworks.'] },
        { cells: ['PO3 · Development of Solutions', 'Design, develop and investigate problems with an innovative approach for solutions incorporating ESG/SDG goals.'] },
        { cells: ['PO4 · Modern Tool Usage', 'Select, adapt and apply modern computational tools such as the development of algorithms with an understanding of the limitations including human biases.'] },
        { cells: ['PO5 · Individual and Teamwork', 'Function and communicate effectively as an individual or a team leader in diverse and multidisciplinary groups. Use methodologies such as agile.'] },
        { cells: ['PO6 · Project Management and Finance', 'Use the principles of project management such as scheduling, work breakdown structure and be conversant with the principles of Finance for profitable project management.'] },
        { cells: ['PO7 · Ethics', 'Commit to professional ethics in managing software projects with financial aspects; learn to use new technologies for cyber security and insulate customers from malware.'] },
        { cells: ['PO8 · Life-Long Learning', 'Change management skills and the ability to learn, keep up with contemporary technologies and ways of working.'] },
      ],
    },
    {
      tabId: 'peo',
      type: 'bulletWithLabels',
      labeledItems: [
        { label: 'PEO1 · Ethics and Social Responsibility', text: 'A well-prepared graduate with ethical values, integrity, and a sense of social responsibility shall apply technical skills to serve society and industry with positive benefit.' },
        { label: 'PEO2 · Innovative Problem Solving', text: 'Graduates will have robust problem-solving abilities and the ability to apply innovative thinking techniques toward designing, developing, and implementing software solutions for increasingly complex problems in a rapidly dynamic technological landscape.' },
        { label: 'PEO3 · Global Competence and Lifelong Learning', text: 'Graduates will be equipped with a comprehensive education in computer applications, meeting international standards, and continue a process of learning about new technologies and trends over time.' },
        { label: 'PEO4 · Industry Collaboration and Research Excellence', text: 'Graduates will enjoy partnerships with software industries and research universities, gaining hands-on experience in projects and research on advanced technology areas, improving skills in collaborative and independent research.' },
      ],
    },
  ]

  sections[pdIndex] = pd

  await payload.update({
    collection: 'courses',
    id: doc.id,
    data: { sections },
  })

  console.log(`Updated "mca" course — Program Details now has ${pd.tabs.length} tabs.`)
  process.exit(0)
}

run()
