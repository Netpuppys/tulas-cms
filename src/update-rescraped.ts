// @ts-nocheck
// One-off update script: refreshes courses whose live tulas.edu.in page has
// materially more/newer content than what's currently in the CMS (either the
// original scrape missed hidden accordion tabs, or the live site itself has
// been redesigned since the original bulk import). Content was pulled from
// the live, JS-rendered pages via a real browser — same no-fabrication rule
// as before: only real, visible text, nothing invented.
//
// Matches each course by slug and REPLACES its `sections` array wholesale
// (not a partial patch), since in most of these cases most/all blocks
// changed, not just one tab.
//
// RUN IT WITH:  npx tsx src/update-rescraped.ts

import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

const updates = [
  {
    slug: 'btech/civil-engineering',
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: 'B.Tech Civil Engineering' },
        badge: 'BTECH · CIVIL ENGINEERING · NAAC A+',
        title: 'Build The',
        highlight: 'Infrastructure Of Tomorrow',
        description: "Design, build, and sustain the infrastructure of tomorrow — the Department of Civil Engineering at Tulas University combines structural analysis, geotechnical and environmental engineering, and transportation systems with hands-on labs, live projects, and industrial visits.",
        chips: [
          { strong: '4Y', label: 'Programme' },
          { strong: '', label: 'AICTE Approved' },
          { strong: '', label: 'NBA Accredited' },
        ],
        buttons: [
          { variant: 'orange', icon: null, label: 'Apply Now' },
          { variant: 'white_outline', icon: null, label: 'Contact Admissions' },
        ],
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 1, title: '4Y', highlight: 'AICTE Approved · NBA Accredited' },
        header: { label: 'Department Of Civil Engineering', title: 'Where Design', highlight: 'Meets Infrastructure' },
        description1: 'The Department of Civil Engineering at Tulas University is dedicated to shaping future engineers who can design, build, and sustain the infrastructure of tomorrow.',
        description2: 'Established in 2011, the department offers a comprehensive B.Tech in Civil Engineering, giving students in-depth knowledge of construction, structural analysis, geotechnical engineering, environmental engineering, and transportation systems. The curriculum integrates theoretical knowledge with hands-on practical learning through advanced laboratories, industrial visits, live projects, and expert mentorship, with a strong emphasis on sustainability, eco-friendly construction, and smart city solutions.',
        quote: 'Build the foundations of tomorrow with a B.Tech in Civil Engineering — empowering future engineers with the skills to design, innovate, and create a sustainable world.',
        table: {
          headers: ['Course', 'Duration', 'Eligibility'],
          rows: [
            { program: 'B.Tech', duration: '4 Years', eligibility: 'Passed 10+2 with Physics and Mathematics compulsory, plus one of Chemistry / Biology / Computer Science / Engineering Graphics / Business Studies, with at least 45% marks (40% for reserved category). Diploma holders in Engineering also eligible.' },
          ],
        },
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Core Areas You'll Study", title: 'Six Core Areas,', highlight: 'One Engineering Foundation', para: 'Every core area is built on strong engineering fundamentals and reinforced through labs, live projects, and industrial visits.' },
        cards: [
          { title: 'Structural Engineering', desc: 'Structural analysis, design, and detailing of buildings and infrastructure.', pills: ['Structural Analysis', 'RCC & Steel Design'] },
          { title: 'Geotechnical Engineering', desc: 'Soil mechanics, foundation engineering, and ground improvement techniques.', pills: ['Soil Mechanics', 'Foundation Design'] },
          { title: 'Environmental Engineering', desc: 'Water systems, waste management, and eco-friendly construction practices.', pills: ['Water Systems', 'Sustainable Construction'] },
          { title: 'Transportation Engineering', desc: 'Highway design, traffic engineering, and transportation planning.', pills: ['Highway Design', 'Traffic Engineering'] },
          { title: 'Construction Management', desc: 'Project planning, scheduling, and construction technology.', pills: ['Project Planning', 'Construction Technology'] },
          { title: 'Sustainable & Smart City Design', desc: 'Eco-friendly construction techniques and smart city infrastructure solutions.', pills: ['Smart City Systems', 'Green Building'] },
        ],
        extraCard: { title: 'Built On Core Engineering', description: 'Engineering Mathematics · Mechanics of Solids · Surveying · Building Materials · Fluid Mechanics · Engineering Drawing' },
        coreTags: ['Structural Analysis', 'Geotechnical Engineering', 'Environmental Engineering', 'Transportation Engineering', 'Construction Management', 'Surveying', 'Building Materials', 'Fluid Mechanics', 'Sustainable Design', 'Smart City Solutions', 'Project Management', 'Engineering Drawing', 'BIM & Digital Tools', 'Emerging Technologies'],
      },
      {
        blockType: 'aiSection',
        image: { placeholder: 'BIM · AI-Aided Structural Analysis' },
        header: { label: 'The Differentiator', title: 'Technology-Integrated', highlight: 'Civil Engineering', para: 'The programme integrates Building Information Modelling (BIM), AI-aided structural analysis, and smart city sensor technologies into the curriculum — preparing students for a construction industry that is increasingly digital and data-driven.' },
        tags: ['Building Information Modelling (BIM)', 'AI-Aided Structural Analysis', 'Smart City Sensors', 'Sustainable Material Analytics', 'Digital Surveying Tools', 'Construction Project Software', 'Environmental Impact Modelling', 'Smart Infrastructure Design'],
        roadmap: [
          { num: '01', title: 'Year 1', desc: 'Engineering mathematics, mechanics, and foundational civil engineering concepts.' },
          { num: '02', title: 'Year 2', desc: 'Structural analysis, surveying, and building materials applied to design tasks.' },
          { num: '03', title: 'Year 3', desc: 'Geotechnical, transportation, and environmental engineering through live projects and industrial visits.' },
          { num: '04', title: 'Year 4', desc: 'Sustainable, smart infrastructure design and a capstone/major project demonstrating professional readiness.' },
        ],
      },
      {
        blockType: 'certifications',
        header: { label: 'Practical Learning', title: 'Certifications, Projects', highlight: '& Industry Exposure', para: 'Globally recognised certifications, hands-on labs, and continuous industry exposure that make graduates job-ready.' },
        certificationAssociations: [
          { isMain: true, badge: 'Flagship Association', name: 'IIT Kanpur E&ICT Academy Certifications', desc: "Premier certifications backed by IIT Kanpur's Electronics & ICT Academy — adding national credibility to your skill set." },
          { isMain: false, badge: '', name: 'AWS', desc: 'Cloud certifications' },
          { isMain: false, badge: '', name: 'Microsoft', desc: 'Azure & developer tracks' },
          { isMain: false, badge: '', name: 'Google', desc: 'Cloud & AI certifications' },
          { isMain: false, badge: '', name: 'NVIDIA', desc: 'Deep learning & AI' },
          { isMain: false, badge: '', name: 'Oracle', desc: 'Database & Java' },
          { isMain: false, badge: '', name: 'Python', desc: 'Programming certifications' },
        ],
        handsOnItems: ['Live Projects', 'Hackathons', 'Coding Challenges', 'Research Projects', 'Product Development', 'Innovation Competitions'],
      },
      {
        blockType: 'programDetails',
        badge: 'B.Tech Civil Engineering · Academic Framework',
        title: 'Program',
        highlight: 'Details',
        tabs: [
          { id: 'usps', num: '01', label: 'USPs' },
          { id: 'courseOutcomes', num: '02', label: 'Course Outcomes' },
          { id: 'programOutcomes', num: '03', label: 'Program Outcomes' },
          { id: 'pso', num: '04', label: 'Program Specific Outcomes' },
          { id: 'peo', num: '05', label: 'Program Educational Objectives' },
        ],
        contents: [
          {
            tabId: 'usps',
            type: 'bullet',
            bulletItems: [
              'Comprehensive B.Tech curriculum covering structural, geotechnical, environmental, and transportation engineering.',
              'Hands-on practical learning through advanced laboratories, industrial visits, and live projects.',
              'Strong emphasis on sustainability, eco-friendly construction, and smart city solutions.',
              'Interdisciplinary learning approach developing problem-solving skills and technical expertise.',
              'Expert mentorship connecting classroom learning to real infrastructure challenges.',
              'Graduate pathways into government sectors, private construction firms, urban planning agencies, and international infrastructure projects.',
              'A certification stack — AutoCAD/Revit, STAAD.Pro, and Primavera — building industry-ready software skills.',
              'Association with IIT Kanpur E&ICT Academy adding national credibility to the degree.',
              'Strong foundation for higher studies or research in civil engineering disciplines.',
            ],
          },
          {
            tabId: 'courseOutcomes',
            type: 'table',
            tableHeaders: ['Year', 'Outcome'],
            tableRows: [
              { cells: ['Year 1', 'Apply engineering mathematics, mechanics, and foundational civil engineering concepts to basic design problems.'] },
              { cells: ['Year 2', 'Apply structural analysis, surveying, and building materials knowledge to structural design tasks.'] },
              { cells: ['Year 3', 'Apply geotechnical, transportation, and environmental engineering principles to real infrastructure problems, supported by live projects and industrial visits.'] },
              { cells: ['Year 4', 'Design and evaluate sustainable, smart infrastructure solutions and complete a capstone/major project demonstrating professional readiness.'] },
            ],
          },
          {
            tabId: 'programOutcomes',
            type: 'table',
            tableHeaders: ['PO', 'Outcome'],
            tableRows: [
              { cells: ['PO1 · Engineering Knowledge', 'Apply knowledge of mathematics, science, and engineering fundamentals to the solution of complex engineering problems.'] },
              { cells: ['PO2 · Problem Analysis', 'Identify, formulate, and analyse complex engineering problems using first principles of mathematics, natural sciences, and engineering sciences.'] },
              { cells: ['PO3 · Design/Development', 'Design solutions for complex engineering problems and design system components or processes that meet specified needs with appropriate consideration for public health, safety, and the environment.'] },
              { cells: ['PO4 · Investigations', 'Use research-based knowledge and research methods, including design of experiments, analysis and interpretation of data, to provide valid conclusions.'] },
              { cells: ['PO5 · Modern Tool Usage', 'Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools, including prediction and modelling, to complex engineering activities.'] },
              { cells: ['PO6 · Engineer & Society', 'Apply reasoning informed by contextual knowledge to assess societal, health, safety, legal, and cultural issues relevant to professional engineering practice.'] },
              { cells: ['PO7 · Environment & Sustainability', 'Understand the impact of professional engineering solutions in societal and environmental contexts, and demonstrate knowledge of sustainable development.'] },
              { cells: ['PO8 · Ethics', 'Apply ethical principles and commit to professional ethics, responsibilities, and norms of engineering practice.'] },
              { cells: ['PO9 · Individual & Team Work', 'Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.'] },
              { cells: ['PO10 · Communication', 'Communicate effectively on complex engineering activities, including preparing reports, documentation, and giving clear presentations.'] },
              { cells: ['PO11 · Project Management & Finance', 'Demonstrate knowledge and understanding of engineering and management principles, and apply these to manage projects in multidisciplinary environments.'] },
              { cells: ['PO12 · Life-Long Learning', 'Recognise the need for, and have the preparation and ability to engage in independent and lifelong learning in the broadest context of technological change.'] },
            ],
          },
          {
            tabId: 'pso',
            type: 'bulletWithLabels',
            labeledItems: [
              { label: 'PSO1', text: 'Analyse, design, and evaluate structural, geotechnical, and transportation systems using standard codes of practice and modern software tools.' },
              { label: 'PSO2', text: 'Apply sustainable and smart-city engineering principles to construction and infrastructure projects with environmental responsibility.' },
              { label: 'PSO3', text: 'Plan, manage, and execute construction projects — from surveying and site investigation through to project delivery.' },
            ],
          },
          {
            tabId: 'peo',
            type: 'bulletWithLabels',
            labeledItems: [
              { label: 'PEO1', text: 'Produce graduates employable in government infrastructure bodies, private construction firms, and urban planning agencies.' },
              { label: 'PEO2', text: 'Enable sustainable, innovative infrastructure design using modern digital and analytical tools.' },
              { label: 'PEO3', text: 'Develop professional ethics, teamwork, and communication skills for multidisciplinary construction environments.' },
              { label: 'PEO4', text: 'Prepare graduates for higher studies, research, and lifelong learning in evolving civil engineering practice.' },
            ],
          },
        ],
      },
      {
        blockType: 'careers',
        header: { label: 'Career Outcomes', title: 'Where This B.Tech', highlight: 'Can Take You', para: 'From site engineering to urban planning — a civil engineering degree opens both government and private-sector infrastructure careers.' },
        jobs: [
          { title: 'Site Engineer', range: '₹3–6 LPA' },
          { title: 'Structural Engineer', range: '₹4–8 LPA' },
          { title: 'Construction Project Manager', range: '₹5–10 LPA' },
          { title: 'Urban & Town Planner', range: '₹4–9 LPA' },
          { title: 'Geotechnical Engineer', range: '₹4–8 LPA' },
          { title: 'Government Sector Engineer (PWD/Municipal)', range: '₹4–9 LPA' },
        ],
        stats: [
          { gradient: true, number: '100%', label: 'Placement Assistance' },
          { gradient: false, number: '750+', label: 'Recruiters' },
          { gradient: false, number: '100%', label: 'Paid Internships' },
          { gradient: false, number: '2011', label: 'Department Established' },
        ],
      },
      {
        blockType: 'whyStudy',
        header: { label: 'The Tulas Advantage', title: 'Why Study Civil Engineering', highlight: 'At Tulas University', para: 'A programme engineered for the modern engineering profession — combining strong fundamentals, industry alignment, and hands-on practice.' },
        items: [
          { n: '01', title: 'AI-Integrated Learning', desc: 'Artificial intelligence and machine learning concepts woven into the Civil Engineering curriculum, preparing graduates for a digital construction industry.' },
          { n: '02', title: 'IIT Kanpur E&ICT Academy', desc: 'Association bringing premier, nationally recognised certifications and academic credibility to your B.Tech degree.' },
          { n: '03', title: 'Industry-Aligned Curriculum', desc: 'Continuously updated to match real industry trends, tools, and practices — so what you learn is what employers need.' },
          { n: '04', title: 'Industry Certifications', desc: 'AWS, Microsoft, Google, NVIDIA, Oracle, and Python certifications built into regular coursework — no extra cost or effort.' },
          { n: '05', title: 'Internship Opportunities', desc: 'Multiple internship opportunities across the programme and a direct internship-to-placement pathway supported by TCCI.' },
          { n: '06', title: 'Innovation & Research Culture', desc: 'A centre of excellence in teaching, research, and innovative civil engineering practices — encouraging students to push boundaries.' },
          { n: '07', title: 'Project-Based Learning', desc: 'Learn by building — live projects, hackathons, and product development across all four years of the programme.' },
          { n: '08', title: 'Emerging Technology Exposure', desc: 'BIM, AI-aided structural analysis, smart city sensors, and sustainable construction technologies integrated throughout the curriculum.' },
          { n: '09', title: 'Placement Readiness Framework', desc: 'Career development and corporate readiness powered by TCCI — resume building, mock interviews, and dedicated recruiter engagement.' },
        ],
      },
      {
        blockType: 'recruiters',
        title: 'The Leading',
        highlight: 'Recruiters',
        subtitle: 'Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.',
        logos1: ['Academor', 'Amazon Web Services', 'Artech', 'BMW', 'Cywarden', 'ESAF Bank', 'Glowlogics', 'Grant Thornton', 'Hikeedu', 'Intel', 'Movidu', 'Prodesk IT', 'Relinns Technologies', 'Siemens', 'Stellaraa Edu Tech', 'Talbros', 'Verizon'],
        logos2: ['Acxiom Consulting', 'Arrise', 'ASC International', 'CK (Calvin Klein)', 'Easemytrip', 'Fitelo', 'Google', 'Hero', 'HSBC', 'Learning Routes', 'MWIDM', 'Reality Assistant', 'Root Analysis', 'Silverspace', 'Step2gen', 'The Times of India'],
      },
    ],
  },
]

async function run() {
  const payload = await getPayload({ config })

  let updated = 0
  let notFound = 0

  for (const u of updates) {
    const existing = await payload.find({
      collection: 'courses',
      where: { slug: { equals: u.slug } },
      limit: 1,
    })

    if (existing.docs.length === 0) {
      console.log(`NOT FOUND (skipped): ${u.slug}`)
      notFound++
      continue
    }

    await payload.update({
      collection: 'courses',
      id: existing.docs[0].id,
      data: { sections: u.sections },
    })
    console.log(`UPDATED: ${u.slug}`)
    updated++
  }

  console.log(`\nDone. Updated ${updated}, not found ${notFound}, out of ${updates.length} total.`)
  process.exit(0)
}

run()
