// @ts-nocheck
// This is a one-off data-seeding script, not application code — the course
// objects below are plain data and aren't worth hand-typing against Payload's
// generated types (TS widens e.g. `blockType: 'hero'` to `string`, which
// doesn't match Payload's discriminated-union block types). Doesn't affect
// running it: `npx tsx` transpiles with esbuild and skips type-checking
// anyway, so this only silences the editor's red squiggly.
//
// SAVE PATH: src/seed-bulk.ts (in cmstulas, next to payload.config.ts)
//
// Bulk-imports ~34 courses scraped from the live tulas.edu.in site into the
// CMS in one run, using Payload's Local API. Every course is created with
// status: 'draft' — nothing goes live/published automatically. Review each
// one in the admin panel and hit "Publish" when you're happy with it.
//
// Safe to re-run: if a course with the same slug already exists, it's
// skipped (not duplicated or overwritten).
//
// RUN IT WITH:  npx tsx src/seed-bulk.ts
// (npx will fetch "tsx" automatically the first time — that's normal)
//
// NOTE: content was extracted from the live site's actual page text. Some
// courses use an older page template on the live site that hides several
// sections behind "click to expand" accordions — for those, only the
// sections that had real visible text were included (no invented content).
// You'll see fewer filled-in blocks for a handful of courses (mostly older
// B.Tech branch pages, LLB, BCA, M.Sc Agronomy) — that's expected, not a
// bug. Just fill in the rest by hand in the CMS for those ones.

import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

// ---------------------------------------------------------------------
// Batch 1: Btech CSE, Btech (generic), BBA Digital Marketing, BBA Business Analytics
// ---------------------------------------------------------------------
const batch1 = [
  // 1. Btech CSE
  {
    title: "B.Tech Computer Science & Engineering",
    slug: "btech/computer-science",
    program: "B.Tech",
    school: "School of Engineering & Technology",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "B.Tech CSE" },
        badge: "B.Tech CSE · NBA Accredited",
        title: "Build The Future With",
        highlight: "Computer Science",
        description: "Study Computer Science & Engineering at Tulas and gain expertise in software development, artificial intelligence, data science, cyber security and emerging technologies — through an AI-integrated curriculum.",
        chips: [
          { strong: "4-Year", label: "4-Year B.Tech Program" },
          { strong: "AI-Integrated", label: "AI-Integrated Curriculum" },
          { strong: "", label: "Industry Certifications" },
          { strong: "", label: "Project-Based Learning" },
          { strong: "Up to ₹60 LPA", label: "Up to ₹60 LPA Highest Package" }
        ],
        buttons: [
          { variant: "orange_anim", icon: null, label: "Apply Now" },
          { variant: "white_outline_anim", icon: "IoCall", label: "Contact Admissions" }
        ]
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 3, title: "NBA", highlight: "Accredited\nProgram (2024)" },
        header: { label: "Department of CSE", title: "Where Computer Science", highlight: "Meets AI" },
        description1: "The B.Tech in Computer Science & Engineering at Tulas is designed to create future-ready professionals for the IT industry.",
        description2: "The program provides an in-depth understanding of software development, networking, artificial intelligence, cyber security and cloud computing. With a strong emphasis on practical learning, coding skills and problem-solving, students gain hands-on experience in programming, database management, blockchain, machine learning and IoT — all aligned with current industry trends.",
        quote: "Code your future, innovate with technology, and transform the world with Tulas' B.Tech in Computer Science & Engineering.",
        table: { headers: ["Course", "Duration", "Eligibility"], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Specializations", title: "Five Paths, One Strong", highlight: "CSE Foundation", para: "Every specialization is built on a strong Computer Science core and enhanced through AI-integrated learning." },
        cards: [
          { title: "Computer Science & Engineering", desc: "The complete foundation — programming, systems, networks, and software engineering.", pills: ["Software", "Systems", "Networks"] },
          { title: "CSE — Artificial Intelligence & Machine Learning", desc: "Deep learning, neural networks, and applied AI to build intelligent systems.", pills: ["ML", "Deep Learning", "Generative AI"] },
          { title: "CSE — Data Science", desc: "Analytics, big data, and statistical modelling to turn data into decisions.", pills: ["Big Data", "Analytics", "ML Ops"] },
          { title: "CSE — Cyber Security", desc: "Ethical hacking, network security, and digital forensics to defend systems.", pills: ["Ethical Hacking", "Forensics", "Security"] },
          { title: "CSE — Full Stack Development", desc: "Front-end to back-end — build complete, production-ready web applications.", pills: ["Web Tech", "APIs", "Databases"] }
        ],
        extraCard: { title: "Built On Core \nComputer Science", description: "Programming · Data Structures · Algorithms · Databases · Cloud · Web Technologies · Software Engineering" },
        coreTags: []
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "" },
        header: { label: "The Differentiator", title: "An AI-Integrated", highlight: "Curriculum", para: "At Tulas, AI isn't a single elective — it's woven through the entire CSE journey. Students move from strong fundamentals to the most in-demand frontier technologies, graduating fluent in the tools shaping the future of software." },
        tags: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Generative AI", "Agentic AI", "Data Science", "Cloud Computing", "Computer Vision", "Natural Language Processing", "Cyber Security", "MLOps", "Software Development"],
        roadmap: [
          { num: "01", title: "Fundamentals", desc: "Programming, data structures, algorithms and core computing." },
          { num: "02", title: "Applied Tech", desc: "Databases, web technologies, cloud computing and software engineering." },
          { num: "03", title: "Intelligence", desc: "AI, machine learning, deep learning, data science and computer vision." },
          { num: "04", title: "Frontier", desc: "Generative AI, Agentic AI, MLOps and emerging technology specialization." }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Certifications", highlight: "& Projects", para: "Beyond the degree — globally recognized certifications, real projects, and continuous industry exposure that make graduates job-ready." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Association", name: "IIT Kanpur E&ICT Academy Certifications", desc: "Premier certifications backed by IIT Kanpur's Electronics & ICT Academy — adding national credibility to your skill set." },
          { isMain: false, badge: "", name: "AWS", desc: "Cloud certifications" },
          { isMain: false, badge: "", name: "Microsoft", desc: "Azure & developer tracks" },
          { isMain: false, badge: "", name: "Google", desc: "Cloud & AI certifications" },
          { isMain: false, badge: "", name: "NVIDIA", desc: "Deep learning & AI" },
          { isMain: false, badge: "", name: "Oracle", desc: "Database & Java" },
          { isMain: false, badge: "", name: "Python", desc: "Programming certifications" }
        ],
        handsOnItems: ["Live Projects", "Hackathons", "Coding Challenges", "Research Projects", "Product Development", "Innovation Competitions"]
      },
      {
        blockType: 'programDetails',
        badge: "CSE · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [
          { id: "po", num: "01", label: "Program Outcomes" },
          { id: "pso", num: "02", label: "Program Specific Outcome" },
          { id: "peo", num: "03", label: "Program Educational Objective" },
          { id: "co", num: "04", label: "Course Outcomes" }
        ],
        contents: [
          {
            tabId: "po",
            type: "bullet",
            bulletItems: [
              "Engineering Knowledge: Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.",
              "Problem Analysis: Identify, formulate, research literature, and analyze complex Engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.",
              "Design/Development of Solutions: Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for public health and safety, and the cultural, societal, and environmental considerations.",
              "Conduct Investigations of Complex Problems: Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.",
              "Modern Tool Usage: Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.",
              "The Engineer and Society: Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to professional engineering practice.",
              "Environment and Sustainability: Understand the impact of professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for, sustainable development.",
              "Ethics: Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.",
              "Individual and Team Work: Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.",
              "Communication: Communicate effectively on complex engineering activities with the engineering community and with society at large — comprehend and write effective reports, make effective presentations, and give and receive clear instructions.",
              "Project Management and Finance: Demonstrate knowledge and understanding of engineering and management principles and apply these to one's own work, as a member and leader in a team, to manage projects in multidisciplinary environments.",
              "Life-long Learning: Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change."
            ]
          }
        ]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where A CSE Degree", highlight: "Can Take You", para: "From software engineering to AI research, our graduates build careers at the cutting edge of technology." },
        jobs: [
          { title: "Software Engineer", range: "" },
          { title: "Full Stack Developer", range: "" },
          { title: "AI Engineer", range: "" },
          { title: "Machine Learning Engineer", range: "" },
          { title: "Data Scientist", range: "" },
          { title: "Cyber Security Analyst", range: "" },
          { title: "Cloud Engineer", range: "" },
          { title: "DevOps Engineer", range: "" },
          { title: "Product Engineer", range: "" },
          { title: "Technology Consultant", range: "" }
        ],
        stats: [
          { gradient: true, number: "₹60 LPA", label: "Highest Package" },
          { gradient: false, number: "100%", label: "Placement Assistance" },
          { gradient: false, number: "500+", label: "Recruiters" },
          { gradient: false, number: "1000+", label: "Internships" }
        ]
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Study CSE", highlight: "At Tulas", para: "A program engineered for the AI era — combining strong fundamentals, industry alignment, and a culture of innovation." },
        items: [
          { n: "01", title: "AI-Integrated Learning", desc: "Artificial intelligence and machine learning woven across the curriculum to enhance how you learn, create and solve." },
          { n: "02", title: "IIT Kanpur E&ICT Academy & Industry Certifications", desc: "Earn industry-recognized certifications through IIT Kanpur E&ICT Academy and global partners including AWS, Microsoft, Google, NVIDIA and Oracle." },
          { n: "03", title: "Industry-Aligned Curriculum", desc: "A future-focused curriculum continuously updated to match evolving technologies, industry trends and workplace expectations." },
          { n: "04", title: "Project-Based Learning", desc: "Build practical skills through live projects, hackathons, product development and real-world problem solving." },
          { n: "05", title: "Industry Connect & Projects", desc: "Bridge classroom learning with the real world through projects, industrial visits, expert interactions and corporate collaborations." },
          { n: "06", title: "Emerging Technology Exposure", desc: "Explore Generative AI, Agentic AI, Cloud Computing, Computer Vision, Blockchain, IoT and other future technologies." },
          { n: "07", title: "Career & Placement Readiness", desc: "Develop corporate-ready skills through aptitude training, interview preparation, soft skills and placement support powered by TCCI." },
          { n: "08", title: "Expert Faculty & Mentorship", desc: "Learn from experienced faculty and industry experts committed to continuous upskilling, mentorship and practical learning." },
          { n: "09", title: "Research, Innovation & Patents", desc: "Innovate through research publications, funded projects, patents and a culture that encourages discovery and problem-solving." },
          { n: "10", title: "Global Alumni Network", desc: "Join a thriving network of 1000+ alumni working across leading MNCs, startups and government organizations." },
          { n: "11", title: "Modern Labs & Centres of Excellence", desc: "Learn in advanced laboratories and technology centres designed for hands-on experimentation, innovation and industry-ready skills." },
          { n: "12", title: "Student Clubs & Technical Communities", desc: "Grow beyond academics through coding clubs, innovation cells, hackathons, competitions and leadership opportunities." }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF BANK", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk IT", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assistant", "Root Analysis", "Silverspace", "Step2gen", "The Times of India"]
      }
    ]
  },

  // 2. Btech (generic overview)
  {
    title: "Bachelor of Technology (B.Tech)",
    slug: "btech",
    program: "B.Tech",
    school: "School of Engineering & Technology",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "B.Tech" },
        badge: "Bachelor of Technology · 4 Years",
        title: "Engineering",
        highlight: "The Future",
        description: "At Tulas University, engineering education combines technology, innovation, AI integration and real industry exposure to prepare students for the careers of tomorrow.",
        chips: [
          { strong: "Up to ₹60 LPA", label: "Up to ₹60 LPA Highest Package" },
          { strong: "AI-Integrated", label: "AI-Integrated Curriculum" },
          { strong: "100%", label: "100% Internship Support" },
          { strong: "500+", label: "500+ Top Recruiters" }
        ],
        buttons: [
          { variant: "orange_anim", icon: null, label: "Apply Now" },
          { variant: "white_outline_anim", icon: "IoCall", label: "Contact Admissions" }
        ]
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 3, title: "4Y", highlight: "NBA Accredited\nNAAC Certified\nAICTE Approved" },
        header: { label: "Engineering At Tulas", title: "Build Strong Engineering", highlight: "Foundation" },
        description1: "The Bachelor of Technology (B.Tech) is a four-year undergraduate program designed to equip students with a strong foundation in engineering principles, technical expertise, and practical skills.",
        description2: "The curriculum blends theoretical knowledge with hands-on training — preparing students for industry, research, and entrepreneurship. Early semesters build fundamental engineering concepts, followed by specialized subjects and electives tailored to each discipline. Continuously updated to keep pace with technology, the program integrates artificial intelligence, cybersecurity, data science, renewable energy and automation — ensuring graduates stay competitive in a fast-evolving job market.",
        quote: "",
        table: { headers: ["Course", "Duration", "Eligibility"], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Choose Your Path", title: "B.Tech Specializations", highlight: "Offered", para: "Eight future-focused engineering specializations — each with dedicated labs, expert faculty, and industry-aligned curriculum. Explore a discipline to dive deeper." },
        cards: [
          { title: "Computer Science & Engineering", desc: "The core of modern computing — programming, systems, algorithms, and software engineering.", pills: ["Software Dev", "Algorithms", "Systems"] },
          { title: "CSE — Artificial Intelligence & Machine Learning", desc: "Build intelligent systems with deep learning, neural networks, and applied AI.", pills: ["Machine Learning", "Deep Learning", "AI Systems"] },
          { title: "CSE — Data Science", desc: "Turn data into insight with analytics, big data, and statistical modelling.", pills: ["Big Data", "Analytics", "Visualization"] },
          { title: "CSE — Cyber Security", desc: "Defend the digital world — ethical hacking, network security, and cyber forensics.", pills: ["Ethical Hacking", "Network Security", "Forensics"] },
          { title: "Mechanical Engineering", desc: "Design, manufacturing, thermodynamics, and modern automation systems.", pills: ["Design", "Manufacturing", "Automation"] },
          { title: "Civil Engineering", desc: "Build the world — structures, construction technology, and sustainable infrastructure.", pills: ["Structures", "Construction", "Sustainability"] },
          { title: "Electronics & Communication Engineering", desc: "Circuits, embedded systems, VLSI, signal processing, and communications.", pills: ["Embedded", "VLSI", "IoT"] },
          { title: "Electrical & Electronics Engineering", desc: "Power systems, control engineering, renewable energy, and smart grids.", pills: ["Power Systems", "Control", "Renewables"] },
          { title: "CSE - Fullstack Development", desc: "Master end-to-end web development with frontend, backend, databases, cloud deployment, and modern development frameworks.", pills: ["React", "Node.js", "Cloud"] }
        ],
        extraCard: { title: "", description: "" },
        coreTags: []
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "" },
        header: { label: "AI-Integrated & Future-Ready", title: "Learn Engineering For The", highlight: "Future, Not The Past", para: "Artificial Intelligence isn't a single subject at Tulas — it's a cross-disciplinary advantage woven across the entire engineering ecosystem. Whatever your branch, you graduate fluent in the technologies shaping tomorrow." },
        tags: ["Artificial Intelligence", "Machine Learning", "Data Science", "Cyber Security", "Cloud Computing", "Automation", "Robotics", "Industry 4.0", "Internet of Things", "Emerging Tech"],
        roadmap: []
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Internships, Placements", highlight: "& Career Success", para: "Engineering education at Tulas translates directly into real opportunities — with strong packages, multiple offers, and dedicated career support through TCCI." },
        jobs: [],
        stats: [
          { gradient: true, number: "₹60 LPA", label: "Highest Package" },
          { gradient: false, number: "1000+", label: "Internships" },
          { gradient: false, number: "500+", label: "Recruiters" },
          { gradient: false, number: "3500+", label: "Placement Offers" },
          { gradient: false, number: "250+", label: "Corporate Partners" }
        ]
      },
      {
        blockType: 'whyStudy',
        header: { label: "Why Choose Tulas", title: "An Education Built Around", highlight: "Your Career", para: "Every part of the B.Tech experience at Tulas is engineered to make you industry-ready, future-proof, and confident." },
        items: [
          { n: "01", title: "Industry-Oriented Curriculum", desc: "Designed with industry leaders to meet the demands of modern engineering and Industry 4.0 workplaces." },
          { n: "02", title: "Hands-On Training", desc: "Advanced labs, practical workshops, and live projects that turn theory into real technical proficiency." },
          { n: "03", title: "Internship & Project Opportunities", desc: "Real-world exposure through internships and industry collaborations with leading companies." },
          { n: "04", title: "Diverse Career Opportunities", desc: "Expanding career prospects across IT, core engineering, consulting, manufacturing and emerging tech." },
          { n: "05", title: "Higher Earning Potential", desc: "Competitive salaries and rewarding careers, with packages up to ₹60 LPA for top performers." },
          { n: "06", title: "High Demand For Engineers", desc: "National and international job opportunities with strong, sustained market demand for skilled engineers." }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF BANK", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk IT", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assistant", "Root Analysis", "Silverspace", "Step2gen", "The Times of India"]
      }
    ]
  },

  // 3. BBA Digital Marketing
  {
    title: "BBA in Digital Marketing",
    slug: "bba/digital-marketing",
    program: "BBA",
    school: "School of Management",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "BBA Digital Marketing" },
        badge: "BBA · Digital Marketing",
        title: "Build Brands.",
        highlight: "Grow Businesses.",
        description: "Master modern marketing with an AI-integrated BBA in Digital Marketing. Learn branding, social media, performance marketing, content creation, analytics, e-commerce and AI-powered marketing while building real campaigns for real businesses.",
        chips: [
          { strong: "3-Year", label: "3-Year BBA Program" },
          { strong: "AI-Integrated", label: "AI-Integrated Curriculum" },
          { strong: "", label: "Live Brand Projects" },
          { strong: "", label: "Industry Certifications" },
          { strong: "Up to ₹60 LPA", label: "Up to ₹60 LPA Highest Package" }
        ],
        buttons: [
          { variant: "orange_anim", icon: null, label: "Apply Now" },
          { variant: "white_outline_anim", icon: "IoCall", label: "Contact Admissions" }
        ]
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 3, title: "BBA", highlight: "Digital\nMarketing" },
        header: { label: "School of Management", title: "Where Business Meets", highlight: "Digital Innovation" },
        description1: "The BBA in Digital Marketing at Tulas is designed for students who want to build brands, scale businesses and lead marketing in the digital-first economy.",
        description2: "The program combines business fundamentals with practical expertise in branding, social media marketing, search engine optimization, paid advertising, influencer marketing, AI tools, analytics and e-commerce. Students learn by executing live campaigns, solving business challenges and working with industry mentors throughout the program.",
        quote: "Marketing is no longer about selling products. It's about creating experiences people remember.",
        table: { headers: ["Course", "Duration", "Eligibility"], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Specialization Areas", title: "Five Specializations, One Strong", highlight: "Marketing Core", para: "Each specialization is built on strong business and marketing fundamentals, enhanced through AI-integrated, campaign-driven learning." },
        cards: [
          { title: "Brand Strategy", desc: "Understand how successful brands are built, positioned and remembered.", pills: ["Branding", "Consumer Behaviour", "Brand Communication"] },
          { title: "Social Media Marketing", desc: "Create engaging campaigns across today's most influential digital platforms.", pills: ["Instagram", "LinkedIn", "YouTube"] },
          { title: "Performance Marketing", desc: "Learn how businesses generate leads, traffic and revenue using paid campaigns.", pills: ["Google Ads", "Meta Ads", "PPC"] },
          { title: "Content Marketing", desc: "Create compelling content that attracts, educates and converts audiences.", pills: ["Copywriting", "Storytelling", "Video Marketing"] },
          { title: "E-Commerce & Growth Marketing", desc: "Learn how online businesses scale using data, automation and customer insights.", pills: ["Shopify", "Amazon", "Growth Funnels"] }
        ],
        extraCard: { title: "Built on Business\nFundamentals", description: "Management · Marketing · Finance · Entrepreneurship · Communication · AI" },
        coreTags: ["Principles of Management", "Digital Marketing", "Consumer Behaviour", "Branding", "Social Media Marketing", "SEO", "Google Ads", "Meta Advertising", "Content Marketing", "Email Marketing", "Marketing Analytics", "AI for Marketing", "E-Commerce", "Entrepreneurship"]
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "" },
        header: { label: "AI-Integrated Curriculum", title: "AI Isn't Replacing", highlight: "Marketers. It's Empowering Them.", para: "Today's marketers don't just create campaigns — they use AI to research markets, generate content, analyze customer behavior and optimize performance. At Tulas, AI is integrated throughout your learning journey so you graduate ready for the future of marketing." },
        tags: ["ChatGPT", "Gemini", "Claude", "Canva AI", "Google Analytics", "Meta Business Suite", "Google Ads", "HubSpot CRM", "Mailchimp", "Semrush", "Ahrefs", "Shopify"],
        roadmap: [
          { num: "01", title: "Semester 1", desc: "Business Fundamentals · Marketing Basics · Communication Skills · Digital Foundations" },
          { num: "02", title: "Semester 2", desc: "Consumer Behaviour · Branding · Social Media · Content Strategy" },
          { num: "03", title: "Semester 3", desc: "SEO · Performance Marketing · Google Ads · Website Fundamentals" },
          { num: "04", title: "Semester 4", desc: "Marketing Analytics · Influencer Marketing · AI Marketing Tools · Email Marketing" },
          { num: "05", title: "Semester 5", desc: "Growth Marketing · E-Commerce · Live Client Projects · Entrepreneurship" },
          { num: "06", title: "Semester 6", desc: "Industry Internship · Capstone Campaign · Startup Incubation · Portfolio Development" }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Certifications,", highlight: "& Projects", para: "Beyond the degree — globally recognised certifications, real campaigns, and continuous industry exposure that make graduates job-ready from day one." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Association", name: "IIT Kanpur E&ICT Academy Certifications", desc: "Enhance your business and digital marketing expertise through industry-recognised certifications backed by IIT Kanpur's Electronics & ICT Academy." },
          { isMain: false, badge: "", name: "Google Digital Marketing", desc: "Fundamentals & strategy" },
          { isMain: false, badge: "", name: "Google Analytics", desc: "Data & campaign analytics" },
          { isMain: false, badge: "", name: "Meta Certified Digital Marketing Associate", desc: "Facebook & Instagram ads" },
          { isMain: false, badge: "", name: "HubSpot Content Marketing", desc: "Content strategy & SEO" },
          { isMain: false, badge: "", name: "HubSpot Inbound Marketing", desc: "Lead generation & CRM" },
          { isMain: false, badge: "", name: "Semrush SEO", desc: "Search engine optimisation" },
          { isMain: false, badge: "", name: "Shopify Foundations", desc: "E-commerce management" }
        ],
        handsOnItems: ["Live Client Projects", "Brand Audits", "Marketing Simulations", "AI Campaign Development", "Business Case Studies", "Startup Challenges", "Marketing Competitions", "Digital Portfolio Development"]
      },
      {
        blockType: 'programDetails',
        badge: "BBA Digital Marketing · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [
          { id: "usps", num: "01", label: "Program USPs" },
          { id: "peo", num: "02", label: "Programme Educational Objectives" },
          { id: "po", num: "03", label: "Programme Outcomes" },
          { id: "pso", num: "04", label: "Programme Specific Outcomes" },
          { id: "eligibility", num: "05", label: "Eligibility Criteria" }
        ],
        contents: [
          {
            tabId: "usps",
            type: "bullet",
            bulletItems: [
              "You run real campaigns: Build a portfolio of real marketing work through live campaigns, industry projects, internships and your final capstone.",
              "Core + Specialisation Architecture: Build a strong foundation in digital marketing before specialising in Business Analytics & Data Strategy, Finance & FinTech, or Operations & Supply Chain.",
              "Integrated Placement Preparation: Prepare for campus recruitment through dedicated aptitude, analytics and certification training aligned with industry hiring standards.",
              "Meet founders & marketing leaders: Learn directly from founders, CMOs and digital marketing leaders through guest lectures, expert sessions and industry interactions.",
              "100% hands-on, practical-driven: Every semester includes practical deliverables, live campaigns and real-world projects that build job-ready skills.",
              "AI-native learning via LEAP: Learn through LEAP, our AI-native learning platform that personalises your learning journey and tracks your progress in real time.",
              "Startup & marketing hackathons: Participate in marketing hackathons, startup challenges and brand case competitions while learning from experienced industry mentors.",
              "Entrepreneurship from 2nd Year: Develop an entrepreneurial mindset through idea validation, innovation and brand-building from your second year onwards.",
              "Life Skills & Professional Growth: Build workplace confidence through business communication, digital ethics, financial literacy and career readiness aligned with NEP 2020.",
              "Industry certifications across 3 years: Earn globally recognised certifications from Google, Meta, HubSpot, IIT Kanpur E&ICT Academy and other leading technology partners."
            ]
          }
        ]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where A Digital Marketing", highlight: "Degree Can Take You", para: "From brand strategy to performance marketing, our graduates build careers across every corner of the digital economy." },
        jobs: [
          { title: "Digital Marketing Executive", range: "" },
          { title: "Social Media Manager", range: "" },
          { title: "SEO Specialist", range: "" },
          { title: "Performance Marketing Analyst", range: "" },
          { title: "Content Marketing Manager", range: "" },
          { title: "Brand Manager", range: "" },
          { title: "E-Commerce Manager", range: "" },
          { title: "Digital Marketing Consultant", range: "" }
        ],
        stats: [
          { gradient: true, number: "₹60 LPA", label: "Highest Package" },
          { gradient: false, number: "100%", label: "Placement Assistance" },
          { gradient: false, number: "500+", label: "Recruiters" },
          { gradient: false, number: "1000+", label: "Internships" }
        ]
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Study Digital Marketing", highlight: "At Tulas", para: "A program built for the digital-first economy — combining real campaigns, AI-powered learning, and direct industry connections that set you apart from day one." },
        items: [
          { n: "01", title: "You Run Real Campaigns", desc: "Build a portfolio of real marketing work through live campaigns, industry projects, internships and your final capstone." },
          { n: "02", title: "Core + Specialisation Architecture", desc: "Build a strong foundation in digital marketing before specialising in your chosen area of expertise." },
          { n: "03", title: "Integrated Placement Preparation", desc: "Prepare for campus recruitment through dedicated aptitude, analytics and certification training aligned with industry hiring standards." },
          { n: "04", title: "Meet Founders & Marketing Leaders", desc: "Learn directly from founders, CMOs and digital marketing leaders through guest lectures, expert sessions and industry interactions." },
          { n: "05", title: "100% Hands-On, Practical-Driven", desc: "Every semester includes practical deliverables, live campaigns and real-world projects that build job-ready skills." },
          { n: "06", title: "AI-Native Learning via LEAP", desc: "Learn through LEAP, our AI-native learning platform that personalises your learning journey and tracks your progress in real time." },
          { n: "07", title: "Startup & Marketing Hackathons", desc: "Participate in marketing hackathons, startup challenges and brand case competitions while learning from experienced industry mentors." },
          { n: "08", title: "Entrepreneurship from 2nd Year", desc: "Develop an entrepreneurial mindset through idea validation, innovation and brand-building from your second year onwards." },
          { n: "09", title: "Life Skills & Professional Growth", desc: "Build workplace confidence through business communication, digital ethics, financial literacy and career readiness aligned with NEP 2020." },
          { n: "10", title: "Industry Certifications Across 3 Years", desc: "Earn globally recognised certifications from Google, Meta, HubSpot, IIT Kanpur E&ICT Academy and other leading technology partners." }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF BANK", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk IT", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assistant", "Root Analysis", "Silverspace", "Step2gen", "The Times of India"]
      }
    ]
  },

  // 4. BBA Business Analytics
  {
    title: "BBA in Business Analytics",
    slug: "bba/business-analytics",
    program: "BBA",
    school: "School of Management",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "BBA Business Analytics" },
        badge: "BBA · Business Analytics",
        title: "Turn Data into Decisions.",
        highlight: "Build the Future of Business.",
        description: "Master business strategy through data with an AI-integrated BBA in Business Analytics. Learn data visualization, business intelligence, predictive analytics, AI tools, financial analytics, and decision-making while solving real business problems using live datasets.",
        chips: [
          { strong: "3-Year", label: "3-Year BBA Program" },
          { strong: "AI-Integrated", label: "AI-Integrated Curriculum" },
          { strong: "", label: "Live Business Projects" },
          { strong: "", label: "Industry Certifications" },
          { strong: "Up to ₹60 LPA", label: "Up to ₹60 LPA Highest Package" }
        ],
        buttons: [
          { variant: "orange_anim", icon: null, label: "Apply Now" },
          { variant: "white_outline_anim", icon: "IoCall", label: "Contact Admissions" }
        ]
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 3, title: "BBA", highlight: "Business\nAnalytics" },
        header: { label: "School of Management", title: "Where Business Meets", highlight: "Intelligent Decision Making" },
        description1: "The BBA in Business Analytics at Tulas is designed for students who want to solve business challenges using data, technology, and analytical thinking.",
        description2: "The programme combines business management with analytics, statistics, visualization, AI tools, business intelligence, forecasting, and strategic decision-making. Students work with real business datasets, dashboards, and live industry projects to become future-ready business analysts and data-driven leaders.",
        quote: "The best business decisions begin with the right data.",
        table: { headers: ["Course", "Duration", "Eligibility"], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Specialization Areas", title: "Five Specializations, One Strong", highlight: "Analytics Core", para: "Each specialization is built on strong business and analytics fundamentals, enhanced through AI-integrated, project-driven learning." },
        cards: [
          { title: "Business Intelligence", desc: "Transform raw business data into actionable insights using modern analytics platforms.", pills: ["Power BI", "Tableau", "Dashboards"] },
          { title: "Data Analytics", desc: "Analyse business data to identify trends, patterns, and growth opportunities.", pills: ["Excel", "SQL", "Data Visualization"] },
          { title: "Predictive Analytics", desc: "Forecast business performance using statistical models and AI-powered insights.", pills: ["Forecasting", "Regression", "Predictive Models"] },
          { title: "Financial & Marketing Analytics", desc: "Evaluate business performance through financial metrics, customer analytics, and campaign performance.", pills: ["ROI Analysis", "Customer Analytics", "Business Metrics"] },
          { title: "AI for Business", desc: "Use Artificial Intelligence to automate reporting, generate insights, and improve business decisions.", pills: ["Generative AI", "AI Analytics", "Automation"] }
        ],
        extraCard: { title: "Built on Business\nFundamentals", description: "Management · Finance · Analytics · Economics · Entrepreneurship · AI" },
        coreTags: ["Principles of Management", "Business Analytics", "Statistics", "Business Intelligence", "Data Visualization", "Microsoft Excel", "SQL", "Power BI", "Tableau", "Predictive Analytics", "Financial Analytics", "Marketing Analytics", "AI for Business", "Entrepreneurship"]
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "" },
        header: { label: "AI-Integrated Curriculum", title: "AI Doesn't Replace", highlight: "Business Decisions. It Improves Them.", para: "Modern businesses rely on AI and analytics to understand customers, predict trends, and make faster decisions. At Tulas, AI is integrated throughout your learning journey so you graduate ready to solve business challenges using intelligent technologies." },
        tags: ["ChatGPT", "Gemini", "Claude", "Microsoft Copilot", "Power BI", "Tableau", "Microsoft Excel", "SQL", "Google Looker Studio", "Python (Business Analytics)", "AI Analytics Platforms", "Business Intelligence Tools"],
        roadmap: [
          { num: "01", title: "Semester 1", desc: "Business Fundamentals · Statistics · Communication Skills · Digital Foundations" },
          { num: "02", title: "Semester 2", desc: "Business Analytics · Data Visualization · Excel · Business Intelligence" },
          { num: "03", title: "Semester 3", desc: "SQL · Dashboard Development · Financial Analytics · AI for Business" },
          { num: "04", title: "Semester 4", desc: "Predictive Analytics · Tableau · Power BI · Business Consulting Projects" },
          { num: "05", title: "Semester 5", desc: "Marketing Analytics · Operations Analytics · Live Industry Projects · Entrepreneurship" },
          { num: "06", title: "Semester 6", desc: "Industry Internship · Business Analytics Capstone · Portfolio Development" }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Certifications", highlight: "& Projects", para: "Beyond the degree — globally recognised certifications, real analytics projects, and continuous industry exposure that make graduates job-ready from day one." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Association", name: "IIT Kanpur E&ICT Academy Certifications", desc: "Strengthen your analytical and business decision-making skills through globally recognised industry certifications integrated into the curriculum." },
          { isMain: false, badge: "", name: "Google Digital Marketing", desc: "Digital Marketing Mastery" },
          { isMain: false, badge: "", name: "Google Analytics", desc: "Data-Driven Decision Making" },
          { isMain: false, badge: "", name: "Meta Blueprint", desc: "Social Media Expertise" },
          { isMain: false, badge: "", name: "HubSpot Content Marketing", desc: "Content Strategy Excellence" },
          { isMain: false, badge: "", name: "HubSpot Inbound Marketing", desc: "Inbound Growth Strategies" },
          { isMain: false, badge: "", name: "Semrush SEO", desc: "Advanced Search Optimization" },
          { isMain: false, badge: "", name: "Shopify Foundations", desc: "E-Commerce Fundamentals" }
        ],
        handsOnItems: ["Live Business Analytics Projects", "Business Dashboards", "Industry Case Studies", "AI Business Simulations", "Data Visualization Challenges", "Business Consulting Projects", "Analytics Competitions", "Professional Portfolio Development"]
      },
      {
        blockType: 'programDetails',
        badge: "BBA Business Analytics · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [
          { id: "usps", num: "01", label: "Program USPs" },
          { id: "peo", num: "02", label: "Programme Educational Objectives" },
          { id: "po", num: "03", label: "Programme Outcomes" },
          { id: "pso", num: "04", label: "Programme Specific Outcomes" },
          { id: "eligibility", num: "05", label: "Eligibility Criteria" }
        ],
        contents: [
          {
            tabId: "usps",
            type: "bullet",
            bulletItems: [
              "Solve Real Business Problems: Work on live datasets, business dashboards, consulting assignments, internships, and a final analytics capstone.",
              "Core + Specialisation Architecture: Build a strong business foundation in BBA with a specialization in Business Analytics.",
              "Integrated Placement Preparation: Prepare for campus recruitment through aptitude training, analytics projects, industry certifications, and interview readiness.",
              "Learn from Industry Experts: Interact with business leaders, consultants, analysts, and entrepreneurs through guest lectures and expert sessions.",
              "Practical Learning Every Semester: Build dashboards, analyse datasets, solve business case studies, and present insights through hands-on projects.",
              "AI-native Learning via LEAP: Use LEAP, our AI-native learning platform, to personalise your learning journey and continuously track your progress.",
              "Industry Projects & Analytics Challenges: Participate in analytics competitions, business consulting projects, and innovation challenges to strengthen practical skills.",
              "Entrepreneurship & Innovation: Develop analytical thinking to identify business opportunities, optimise operations, and drive strategic growth.",
              "Life Skills & Professional Growth: Develop workplace communication, analytical thinking, business ethics, financial literacy, and career readiness aligned with NEP 2020.",
              "Industry Certifications Across 3 Years: Graduate with certifications from Microsoft, Google, IIT Kanpur E&ICT Academy, DeepLearning.AI, and other leading technology partners."
            ]
          }
        ]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where A Business Analyics", highlight: "Degree Can Take You", para: "From data-driven strategy to business intelligence, our graduates build careers across every corner of the modern data economy." },
        jobs: [
          { title: "Business Analyst", range: "" },
          { title: "Data Analyst", range: "" },
          { title: "Business Intelligence Analyst", range: "" },
          { title: "Financial Analyst", range: "" },
          { title: "Marketing Analyst", range: "" },
          { title: "Operations Analyst", range: "" },
          { title: "Risk Analyst", range: "" },
          { title: "Strategy Analyst", range: "" },
          { title: "CRM Analyst", range: "" },
          { title: "Product Analyst", range: "" }
        ],
        stats: [
          { gradient: true, number: "₹60 LPA", label: "Highest Package" },
          { gradient: false, number: "100%", label: "Placement Assistance" },
          { gradient: false, number: "500+", label: "Recruiters" },
          { gradient: false, number: "1000+", label: "Internships" }
        ]
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Study Business Analytics", highlight: "At Tulas", para: "A programme built for the data-driven economy — combining real analytics projects, AI-powered learning, and direct industry connections that set you apart from day one." },
        items: [
          { n: "01", title: "Solve Real Business Problems", desc: "Work on live datasets, business dashboards, consulting assignments, internships, and a final analytics capstone." },
          { n: "02", title: "Core + Specialisation Architecture", desc: "Build a strong business foundation in BBA with a specialization in Business Analytics." },
          { n: "03", title: "Integrated Placement Preparation", desc: "Prepare for campus recruitment through aptitude training, analytics projects, industry certifications, and interview readiness." },
          { n: "04", title: "Learn from Industry Experts", desc: "Interact with business leaders, consultants, analysts, and entrepreneurs through guest lectures and expert sessions." },
          { n: "05", title: "Practical Learning Every Semester", desc: "Build dashboards, analyse datasets, solve business case studies, and present insights through hands-on projects." },
          { n: "06", title: "AI-native Learning via LEAP", desc: "Use LEAP, our AI-native learning platform, to personalise your learning journey and continuously track your progress." },
          { n: "07", title: "Industry Projects & Analytics Challenges", desc: "Participate in analytics competitions, business consulting projects, and innovation challenges to strengthen practical skills." },
          { n: "08", title: "Entrepreneurship & Innovation", desc: "Develop analytical thinking to identify business opportunities, optimise operations, and drive strategic growth." },
          { n: "09", title: "Life Skills & Professional Growth", desc: "Develop workplace communication, analytical thinking, business ethics, financial literacy, and career readiness aligned with NEP 2020." },
          { n: "10", title: "Industry Certifications Across 3 Years", desc: "Graduate with certifications from Microsoft, Google, IIT Kanpur E&ICT Academy, DeepLearning.AI, and other leading technology partners." }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF BANK", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk IT", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assistant", "Root Analysis", "Silverspace", "Step2gen", "The Times of India"]
      }
    ]
  }
]

// ---------------------------------------------------------------------
// Batch 2: Btech CSE Cyber Security, Btech CSE Data Science, Btech CSE AI&ML, MBA Digital Marketing
// ---------------------------------------------------------------------
const batch2 = [
  {
    title: "B.Tech Cyber Security",
    slug: "btech/computer-science-engineering-cyber-security",
    program: "B.Tech",
    school: "School of Engineering & Technology",
    sections: [
      {
        blockType: 'overview',
        imageCard: { changeDesign: 3, title: "NBA", highlight: "Accredited\nCSE Department (2024)" },
        header: { label: "Department of Cyber Security", title: "Where Security Meets", highlight: "Real-World Defense" },
        description1: "The B.Tech in Cyber Security at Tulas is designed to create future-ready defenders for the digital economy.",
        description2: "The program provides an in-depth understanding of network security, ethical hacking, cryptography, digital forensics and cloud security. With a strong emphasis on hands-on labs, threat analysis and problem-solving, students gain practical experience in penetration testing, incident response, malware analysis, security operations and secure software development — all aligned with current industry trends.",
        quote: "Secure the future, outthink the attacker, and defend what matters with Tulas' B.Tech in Cyber Security.",
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Specializations", title: "Five Domains, One Strong", highlight: "Security Core", para: "Every domain is built on a strong security foundation and reinforced through hands-on, lab-driven learning." },
        cards: [
          { title: "Network & Systems Security", desc: "The complete foundation — firewalls, IDS/IPS, VPNs and secure network architecture.", pills: ["Firewalls", "IDS / IPS", "VPNs"] },
          { title: "Ethical Hacking & Pentesting", desc: "Penetration testing, exploitation and red-team operations to find weaknesses first.", pills: ["Pentesting", "Red Team", "Exploits"] },
          { title: "Digital Forensics & IR", desc: "Investigate breaches, analyze malware, and lead incident response after attacks.", pills: ["Forensics", "Incident Response", "Malware"] },
          { title: "Cloud & Application Security", desc: "Secure cloud workloads and software pipelines with DevSecOps practices.", pills: ["Cloud Security", "DevSecOps", "AppSec"] },
          { title: "Cryptography, Risk & GRC", desc: "Cryptography, governance, risk and compliance to protect data and meet standards.", pills: ["Cryptography", "GRC", "Compliance"] },
        ],
        extraCard: { title: "Built On Core \nSecurity Principles", description: "Networking · Operating Systems · Cryptography · Linux · Scripting · Threat Analysis · Secure Coding" },
        coreTags: ["Network Security", "Ethical Hacking", "Cryptography", "Digital Forensics", "Malware Analysis", "Cloud Security", "Penetration Testing", "Incident Response", "Security Operations", "Secure Coding"],
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "" },
        header: { label: "The Differentiator", title: "A Hands-On", highlight: "Security Curriculum", para: "At Tulas, cyber security isn't theory on a slide — it's practiced in live labs. Students move from networking and systems fundamentals to advanced offensive and defensive operations, graduating fluent in the tools that protect modern organizations." },
        tags: ["Network Security", "Ethical Hacking", "Penetration Testing", "Digital Forensics", "Malware Analysis", "Cryptography", "Cloud Security", "SIEM & SOC", "Incident Response", "Threat Intelligence", "DevSecOps", "Secure Coding"],
        roadmap: [
          { num: "01", title: "Fundamentals", desc: "Networking, operating systems, Linux and programming foundations." },
          { num: "02", title: "Defensive Security", desc: "Network defense, cryptography, security operations and monitoring." },
          { num: "03", title: "Offensive Security", desc: "Ethical hacking, penetration testing, exploitation and red teaming." },
          { num: "04", title: "Frontier", desc: "Cloud security, DevSecOps, threat intelligence and emerging specializations." },
        ],
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Certifications", highlight: "& Projects", para: "Beyond the degree — globally recognized certifications, real projects, and continuous industry exposure that make graduates job-ready." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Association", name: "IIT Kanpur E&ICT Academy Certifications", desc: "Premier certifications backed by IIT Kanpur's Electronics & ICT Academy — adding national credibility to your skill set." },
          { isMain: false, badge: "", name: "CEH (EC-Council)", desc: "Certified Ethical Hacker" },
          { isMain: false, badge: "", name: "CompTIA Security+", desc: "Security fundamentals" },
          { isMain: false, badge: "", name: "AWS", desc: "Cloud security tracks" },
          { isMain: false, badge: "", name: "Cisco", desc: "CCNA & network security" },
          { isMain: false, badge: "", name: "Microsoft", desc: "Azure security" },
          { isMain: false, badge: "", name: "Python", desc: "Security automation" },
        ],
        handsOnItems: ["Capture The Flag", "Penetration Testing Labs", "Security Hackathons", "Vulnerability Research", "SOC Simulations", "Bug Bounty Programs"],
      },
      {
        blockType: 'programDetails',
        badge: "Cyber Security · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [
          { id: "usps", num: "01", label: "USPs" },
          { id: "co", num: "02", label: "Course Outcomes" },
          { id: "po", num: "03", label: "Program Outcomes" },
          { id: "pso", num: "04", label: "Program Specific Outcomes" },
          { id: "peo", num: "05", label: "Program Educational Objectives" },
        ],
        contents: [
          {
            tabId: "usps",
            type: "bullet",
            bulletItems: [
              "Practice based Curriculum to fit into the industry requirements.",
              "Mentoring & Content Delivery by Experienced & qualified Faculty Members and Industry Experts through Guest Lectures and Expert Talks.",
              "Add-on Certification Programs, Value Added Courses and Short Term Courses are conducted regularly for professional development of the students. (More than 500 certifications).",
              "1000+ Alumni working with reputed MNCs and Government Sectors.",
              "Well qualified faculty with core teaching & industry experience.",
              "Strong inclination towards research by faculty members & students. (100+ journal & conference publications).",
              "Focus on Industry based learning through regular industry interactions, industrial visits, projects and internships.",
              "12 Patents published by faculty members.",
              "Funded Research projects from AICTE, TEQIP-III, Uttarakhand Technical University.",
              "Faculty members indulge in regular upskilling through FDPs, Workshops and Seminars. (175+ FDPs completed).",
            ],
          },
        ],
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where A CSE Degree", highlight: "Can Take You", para: "From software engineering to AI research, our graduates build careers at the cutting edge of technology." },
        jobs: [
          { title: "Software Engineer", range: "" },
          { title: "Full Stack Developer", range: "" },
          { title: "AI Engineer", range: "" },
          { title: "Machine Learning Engineer", range: "" },
          { title: "Data Scientist", range: "" },
          { title: "Cyber Security Analyst", range: "" },
          { title: "Cloud Engineer", range: "" },
          { title: "DevOps Engineer", range: "" },
          { title: "Product Engineer", range: "" },
          { title: "Technology Consultant", range: "" },
        ],
        stats: [
          { gradient: true, number: "₹60 LPA", label: "Highest Package" },
          { gradient: false, number: "100%", label: "Placement Assistance" },
          { gradient: false, number: "500+", label: "Recruiters" },
          { gradient: false, number: "1000+", label: "Internships" },
        ],
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Study Cyber", highlight: "At Tulas", para: "A program engineered for the threat era — combining strong fundamentals, industry alignment, and a culture of hands-on practice." },
        items: [
          { n: "01", title: "AI-Integrated Learning", desc: "" },
          { n: "02", title: "IIT Kanpur E&ICT Academy & Industry Certifications", desc: "" },
          { n: "03", title: "Industry-Aligned Curriculum", desc: "" },
          { n: "04", title: "Project-Based Learning", desc: "" },
          { n: "05", title: "Industry Connect & Projects", desc: "" },
          { n: "06", title: "Emerging Technology Exposure", desc: "" },
          { n: "07", title: "Career & Placement Readiness", desc: "" },
          { n: "08", title: "Expert Faculty & Mentorship", desc: "" },
          { n: "09", title: "Research, Innovation & Patents", desc: "" },
          { n: "10", title: "Global Alumni Network", desc: "" },
          { n: "11", title: "Modern Labs & Centres of Excellence", desc: "" },
          { n: "12", title: "Student Clubs & Technical Communities", desc: "" },
        ],
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF BANK", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk IT", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assistant", "Root Analysis", "Silverspace", "Step2gen", "The Times of India"],
      },
    ],
  },
  {
    title: "B.Tech Data Science",
    slug: "btech/computer-science-engineering-data-science",
    program: "B.Tech",
    school: "School of Engineering & Technology",
    sections: [
      {
        blockType: 'overview',
        imageCard: { changeDesign: 3, title: "AICTE", highlight: "Approved\nProgram" },
        header: { label: "Department of Data Science", title: "Where Data Meets", highlight: "Decisions" },
        description1: "The B.Tech in Data Science at Tulas is designed to create future-ready professionals who turn raw data into intelligent decisions.",
        description2: "The program builds a deep understanding of statistics, programming, machine learning, big data engineering and artificial intelligence. With a strong emphasis on hands-on learning, students gain practical experience across the full data lifecycle — collecting, cleaning, modelling, visualizing and deploying — all aligned with current industry trends in analytics and AI.",
        quote: "Learn to question data, build models that matter, and turn information into impact with the B.Tech in Data Science at Tulas.",
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Focus Areas", title: "Five Pillars, One Strong", highlight: "Data Foundation", para: "Every focus area is built on a strong foundation of mathematics, statistics and programming, enhanced through AI-integrated learning." },
        cards: [
          { title: "Machine Learning & AI", desc: "Supervised, unsupervised and reinforcement learning to build models that predict and classify.", pills: ["Regression", "Neural Nets", "Modelling"] },
          { title: "Big Data Engineering", desc: "Distributed systems and pipelines to store, process and analyse data at massive scale.", pills: ["Hadoop", "Spark", "Pipelines"] },
          { title: "Business Analytics & BI", desc: "Statistical analysis and dashboards that translate data into business strategy.", pills: ["Power BI", "Tableau", "SQL"] },
          { title: "Deep Learning & Vision", desc: "Neural networks for image, video and language — the engine behind modern AI.", pills: ["CNNs", "NLP", "Vision"] },
          { title: "Visualization & Storytelling", desc: "Turn complex findings into clear, compelling visual stories for any audience.", pills: ["Dashboards", "D3.js", "Reporting"] },
        ],
        extraCard: { title: "Built On Core \nData Science", description: "Mathematics · Statistics · Programming · Databases · Machine Learning · Big Data · Visualization" },
        coreTags: ["Python & R", "Statistics & Probability", "Machine Learning", "Data Structures", "Big Data", "Deep Learning", "Data Mining", "Data Visualization", "SQL & NoSQL", "Cloud Data Platforms"],
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "" },
        header: { label: "The Differentiator", title: "An AI-Integrated", highlight: "Curriculum", para: "At Tulas, AI isn't a single elective — it's woven through the entire Data Science journey. Students move from strong statistical and programming fundamentals to the most in-demand frontier technologies, graduating fluent in the tools shaping the future of analytics and intelligence." },
        tags: ["Machine Learning", "Deep Learning", "Generative AI", "Natural Language Processing", "Computer Vision", "Big Data", "MLOps", "Statistical Modelling", "Predictive Analytics", "Data Engineering", "Cloud Analytics", "Business Intelligence"],
        roadmap: [
          { num: "01", title: "Foundations", desc: "Python, statistics, mathematics and data structures." },
          { num: "02", title: "Data Engineering", desc: "Databases, SQL/NoSQL, big data tools and pipelines." },
          { num: "03", title: "Intelligence", desc: "Machine learning, deep learning, NLP and computer vision." },
          { num: "04", title: "Frontier", desc: "Generative AI, MLOps, cloud analytics and capstone specialization." },
        ],
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Certifications", highlight: "& Projects", para: "Beyond the degree — globally recognized certifications, real projects, and continuous industry exposure that make graduates job-ready." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Association", name: "IIT Kanpur E&ICT Academy Certifications", desc: "Premier certifications backed by IIT Kanpur's Electronics & ICT Academy — adding national credibility to your data science skill set." },
          { isMain: false, badge: "", name: "AWS", desc: "Data & ML certifications" },
          { isMain: false, badge: "", name: "Microsoft", desc: "Azure Data & AI tracks" },
          { isMain: false, badge: "", name: "Google", desc: "Data Analytics & AI" },
          { isMain: false, badge: "", name: "NVIDIA", desc: "Deep learning & AI" },
          { isMain: false, badge: "", name: "Tableau / Power BI", desc: "Visualization certifications" },
          { isMain: false, badge: "", name: "Python", desc: "Programming certifications" },
        ],
        handsOnItems: ["Live Data Projects", "Hackathons", "Kaggle Challenges", "Research Projects", "Capstone Projects", "Datathons"],
      },
      {
        blockType: 'programDetails',
        badge: "Data Science · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [
          { id: "usps", num: "01", label: "USPs" },
          { id: "co", num: "02", label: "Course Outcomes" },
          { id: "po", num: "03", label: "Program Outcomes" },
          { id: "pso", num: "04", label: "Program Specific Outcomes" },
          { id: "peo", num: "05", label: "Program Educational Objectives" },
        ],
        contents: [
          {
            tabId: "usps",
            type: "bullet",
            bulletItems: [
              "Practice based curriculum designed to fit current data science and AI industry requirements.",
              "Mentoring & content delivery by experienced & qualified faculty members and industry experts through guest lectures and expert talks.",
              "Add-on certification programs, value added courses and short term courses conducted regularly for professional development. (More than 500 certifications).",
              "1000+ alumni working with reputed MNCs and government sectors.",
              "Dedicated Data Science & AI lab with high-performance GPU compute for deep learning workloads.",
              "Strong inclination towards research by faculty members & students. (100+ journal & conference publications).",
              "Focus on industry based learning through regular industry interactions, industrial visits, projects and internships.",
              "Funded research projects from AICTE and Uttarakhand Technical University.",
              "Faculty members indulge in regular upskilling through FDPs, workshops and seminars. (175+ FDPs completed).",
            ],
          },
        ],
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where A CSE Degree", highlight: "Can Take You", para: "From software engineering to AI research, our graduates build careers at the cutting edge of technology." },
        jobs: [
          { title: "Software Engineer", range: "" },
          { title: "Full Stack Developer", range: "" },
          { title: "AI Engineer", range: "" },
          { title: "Machine Learning Engineer", range: "" },
          { title: "Data Scientist", range: "" },
          { title: "Cyber Security Analyst", range: "" },
          { title: "Cloud Engineer", range: "" },
          { title: "DevOps Engineer", range: "" },
          { title: "Product Engineer", range: "" },
          { title: "Technology Consultant", range: "" },
        ],
        stats: [
          { gradient: true, number: "₹60 LPA", label: "Highest Package" },
          { gradient: false, number: "100%", label: "Placement Assistance" },
          { gradient: false, number: "500+", label: "Recruiters" },
          { gradient: false, number: "1000+", label: "Internships" },
        ],
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Study CSE", highlight: "At Tulas", para: "A program engineered for the AI era — combining strong fundamentals, industry alignment, and a culture of innovation." },
        items: [
          { n: "01", title: "AI-Integrated Learning", desc: "Artificial intelligence and machine learning woven across the curriculum to enhance how you learn, create and solve." },
          { n: "02", title: "IIT Kanpur E&ICT Academy & Industry Certifications", desc: "Earn industry-recognized certifications through IIT Kanpur E&ICT Academy and global partners including AWS, Microsoft, Google, NVIDIA and Oracle." },
          { n: "03", title: "Industry-Aligned Curriculum", desc: "A future-focused curriculum continuously updated to match evolving technologies, industry trends and workplace expectations." },
          { n: "04", title: "Project-Based Learning", desc: "Build practical skills through live projects, hackathons, product development and real-world problem solving." },
          { n: "05", title: "Industry Connect & Projects", desc: "Bridge classroom learning with the real world through projects, industrial visits, expert interactions and corporate collaborations." },
          { n: "06", title: "Emerging Technology Exposure", desc: "Explore Generative AI, Agentic AI, Cloud Computing, Computer Vision, Blockchain, IoT and other future technologies." },
          { n: "07", title: "Career & Placement Readiness", desc: "Develop corporate-ready skills through aptitude training, interview preparation, soft skills and placement support powered by TCCI." },
          { n: "08", title: "Expert Faculty & Mentorship", desc: "Learn from experienced faculty and industry experts committed to continuous upskilling, mentorship and practical learning." },
          { n: "09", title: "Research, Innovation & Patents", desc: "Innovate through research publications, funded projects, patents and a culture that encourages discovery and problem-solving." },
          { n: "10", title: "Global Alumni Network", desc: "Join a thriving network of 1000+ alumni working across leading MNCs, startups and government organizations." },
          { n: "11", title: "Modern Labs & Centres of Excellence", desc: "Learn in advanced laboratories and technology centres designed for hands-on experimentation, innovation and industry-ready skills." },
          { n: "12", title: "Student Clubs & Technical Communities", desc: "Grow beyond academics through coding clubs, innovation cells, hackathons, competitions and leadership opportunities." },
        ],
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF BANK", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk IT", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assistant", "Root Analysis", "Silverspace", "Step2gen", "The Times of India"],
      },
    ],
  },
  {
    title: "B.Tech Computer Science & Engineering (AI & ML)",
    slug: "btech/computer-science-engineering-ai-ml",
    program: "B.Tech",
    school: "School of Engineering & Technology",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "B.Tech CSE (AI & ML)" },
        badge: "COMPUTER SCIENCE & ENGINEERING (AI & ML)",
        title: "Industry-Oriented B.Tech",
        highlight: "CSE with NBA Accreditation",
        description: "Best Computer Science & Engineering (AI & ML) Institute in North India",
        chips: [],
        buttons: [],
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 3, title: "", highlight: "" },
        header: { label: "", title: "", highlight: "" },
        description1: "The B.Tech in Computer Science & Engineering (Artificial Intelligence & Machine Learning) at Tulas University is a comprehensive program that blends fundamental principles of computer science with state-of-the-art methodologies in artificial intelligence (AI) and machine learning (ML). This program is designed to equip students with the skills required to develop intelligent systems, analyze complex data, and innovate across domains such as robotics, automation, healthcare, and finance. Students gain a strong theoretical foundation in algorithms, data structures, software engineering, and computational mathematics, complemented by extensive hands-on experience in deep learning, natural language processing (NLP), reinforcement learning, and computer vision.",
        description2: "The curriculum emphasizes a practical, application-driven approach through dedicated AI/ML laboratories, industry-driven projects, and internships, ensuring that students can seamlessly bridge theoretical concepts with real-world problem-solving. To enhance technical proficiency, students develop expertise in Python, AI-specific frameworks (such as TensorFlow, PyTorch, and Scikit-Learn), and big data technologies, fostering competence in data-driven decision-making and scalable AI solutions.",
        quote: "Shape the future with AI, master intelligent technologies, and lead the next wave of innovation with Tulas B.Tech in CSE (AI & ML).",
        table: {
          headers: ["Course", "Duration", "Eligibility"],
          rows: [
            {
              program: "B.Tech",
              duration: "4 years",
              eligibility: "Passed 10+2 examination with Physics and Mathematics as compulsory subjects along with one of the Chemistry/ Biotechnology/ Biology/ Technical Vocational subject/ Computer Science/ Information Technology/ Informatics Practices/Agriculture/ Engineering Graphics/ Business Studies. Obtained at least 45% marks (40% marks in case of candidates belonging to reserved category) in the above subjects taken together.",
            },
          ],
        },
      },
      {
        blockType: 'recruiters',
        title: "World's Leading Brands",
        highlight: "Hire Our Talented Students",
        subtitle: "TOP RECRUITERS",
        logos1: ["Amazon", "Microsoft", "HCL", "LG", "Wipro", "Vivo", "JBM", "Tata"],
        logos2: ["Samsung", "ITC", "Oracle", "Cummins", "Aon", "Honda", "Hexaware", "AIS"],
      },
    ],
  },
  {
    title: "MBA Digital Marketing using AI",
    slug: "mba/digital-marketing",
    program: "MBA",
    school: "School of Management",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "Digital Marketing using AI" },
        badge: "MBA · Digital Marketing using AI · NEP 2020",
        title: "Lead Brands With",
        highlight: "AI-Powered Marketing",
        description: "Master the management core and applied digital marketing at Tulas Institute, Dehradun — and graduate job-ready with a live brand campaign, a CMO-panel capstone, and three career paths waiting at the finish line.",
        chips: [
          { strong: "₹22 LPA", label: "₹22 LPA Highest Indicative Range" },
          { strong: "AI-Integrated", label: "AI-Integrated 3-Semester AI Curriculum" },
          { strong: "3 Paths", label: "3 Paths Career Tracks at Graduation" },
          { strong: "9 Certs", label: "9 Certs Industry Certifications" },
        ],
        buttons: [
          { variant: "orange_anim", icon: null, label: "Apply Now" },
          { variant: "white_outline_anim", icon: "IoCall", label: "Contact Admissions" },
        ],
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 3, title: "v4.0", highlight: "NEP 2020\nOBE Framework" },
        header: { label: "School of Management", title: "Where Marketing", highlight: "Meets AI" },
        description1: "The MBA in Digital Marketing using AI at Tulas Institute, Dehradun prepares brand and marketing leaders for an AI-driven industry.",
        description2: "Students master the management core — strategy, finance, analytics, operations — alongside applied digital marketing, AI tools for marketers, and brand leadership. A live brand campaign runs across Semester II, an Industry Live Brand Project in Semester III, and a CMO-panel capstone in the final semester.",
        quote: "Job-ready by Semester II — graduates leave placeable across a corporate marketing team, an independent consulting practice, or their own digital agency.",
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Domains You'll Study", title: "Two Majors, Three Minors", highlight: "One Marketing Core", para: "Every domain is built on a strong management foundation and enhanced through AI-integrated learning across all four semesters." },
        cards: [
          { title: "Performance Marketing & Brand Strategy", desc: "Paid media, campaign optimisation, and brand positioning built on a live client brief.", pills: ["Paid Media", "Brand Strategy", "Campaign Ops"] },
          { title: "Advanced Digital Marketing & Agency Leadership", desc: "Agency operations, advanced digital channels, and the leadership skills to run them.", pills: ["Agency Ops", "Advanced Digital", "Leadership"] },
          { title: "Business Analytics & Data Strategy", desc: "Attribution, dashboards, cohort analysis and marketing data governance.", pills: ["Attribution", "Dashboards", "Forecasting"] },
          { title: "Finance & FinTech", desc: "Brand P&L ownership, marketing ROI, and FinTech brand strategy.", pills: ["Brand P&L", "Marketing ROI", "FinTech"] },
          { title: "Operations & Supply Chain", desc: "Marketing-operations alignment, MarTech stack, and operations transformation.", pills: ["MarTech Stack", "Ops Alignment", "Transformation"] },
        ],
        extraCard: { title: "Built On Core \nManagement", description: "Strategy · Finance · Economics · Operations · Consumer Behaviour · Brand Management" },
        coreTags: ["Strategic Management", "Brand Management", "Financial Accounting", "Business Analytics", "Consumer Behaviour", "Digital Marketing", "AI for Marketing", "Marketing Analytics", "Agency Leadership", "Brand P&L", "Campaign Management", "Market Research"],
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "LEAP\nAI-Native Platform" },
        header: { label: "The Differentiator", title: "An AI-Integrated", highlight: "Curriculum", para: "At Tulas Institute, AI isn't a single elective — it runs through AI Tools for Marketers across three semesters, on LEAP, an AI-native platform that personalises your path and tracks progress continuously." },
        tags: ["AI Content Generation", "Campaign Optimisation AI", "Predictive Analytics", "Generative AI", "Marketing Automation", "Customer Segmentation", "Sentiment Analysis", "Attribution Modelling", "Programmatic Advertising", "MarTech Stack"],
        roadmap: [
          { num: "01", title: "Foundations", desc: "Digital Literacy & AI Tools for Marketers – I, plus Google AI Essentials in Semester I." },
          { num: "02", title: "Applied AI", desc: "AI Tools for Marketers – II, Introduction to AI for Business, and the first live brand campaign." },
          { num: "03", title: "Advanced AI", desc: "AI Tools for Marketers – III (Advanced) alongside Digital Transformation & Business Models." },
          { num: "04", title: "Leadership & Simulation", desc: "Brand Leadership Workshop & Industry Simulation heading into the capstone." },
        ],
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Certifications, Projects", highlight: "& Live Campaigns", para: "Globally recognised certifications, real brand campaigns, and continuous industry exposure that make graduates job-ready." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Association", name: "IIT Kanpur E&ICT Academy Certifications", desc: "Independent, competency-based Year 1 and Year 2 certificates covering the full MBA programme — adding national credibility to your skill set." },
          { isMain: false, badge: "", name: "Google", desc: "AI Essentials (Sem I)" },
          { isMain: false, badge: "", name: "Meta", desc: "Blueprint — Digital Marketing Fundamentals (Sem I)" },
          { isMain: false, badge: "", name: "HubSpot Academy", desc: "Digital Marketing, Marketing Hub & Content Marketing (Sem II–IV)" },
          { isMain: false, badge: "", name: "DeepLearning.AI", desc: "AI for Everyone, via Coursera (Sem III)" },
        ],
        handsOnItems: ["Brand Audit Project", "Live Brand Campaign", "Industry Live Brand Project", "Case Competitions", "Agency Simulation Workshop", "CMO-Panel Capstone"],
      },
      {
        blockType: 'programDetails',
        badge: "MBA DM · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [
          { id: "usps", num: "01", label: "USPs" },
          { id: "co", num: "02", label: "Course Outcomes" },
          { id: "po", num: "03", label: "Program Outcomes" },
          { id: "pso", num: "04", label: "Program Specific Outcomes" },
          { id: "peo", num: "05", label: "Program Educational Objectives" },
        ],
        contents: [
          {
            tabId: "usps",
            type: "bullet",
            bulletItems: [
              "Job-ready by Semester II — a real multi-channel live brand campaign run in Year 1.",
              "Three career paths built in — a corporate marketing team, an independent consulting practice, or a founder's track into your own digital agency, each with dedicated Semester IV modules.",
              "AI Tools for Marketers runs across three semesters, building working fluency with AI-driven content, campaign and analytics tools.",
              "Business Analytics for Marketers and Financial Accounting for Marketers so every recommendation is backed by data and defensible on a brand P&L.",
              "A dedicated NEP 2020 Life Skills & Professional Wellness course addressing burnout in high-pressure marketing roles, ASCI advertising standards, and civic responsibility for business leaders.",
              "AI-native learning through LEAP, a platform that personalises your path and tracks progress continuously.",
              "A certification stack — Google, Meta, HubSpot, DeepLearning.AI and IIT Kanpur E&ICT Academy — prepared for within regular coursework, not bolted on afterward.",
              "An Industry Live Brand Project in Semester III and a CMO-panel capstone in the final semester.",
              "Dedicated placement support across the final year of the programme.",
            ],
          },
        ],
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where This MBA", highlight: "Can Take You", para: "Three paths, not one — corporate brand teams, freelance consulting, or your own agency." },
        jobs: [
          { title: "Digital Marketing Manager", range: "₹8–18 LPA" },
          { title: "Brand Manager", range: "₹8–20 LPA" },
          { title: "Performance Marketing Lead", range: "₹9–20 LPA" },
          { title: "SEO & Content Strategist", range: "₹7–15 LPA" },
          { title: "Marketing Analytics Manager", range: "₹9–22 LPA" },
          { title: "Freelance Consultant", range: "Independent Practice" },
          { title: "Digital Agency Founder", range: "Build & Run Your Own" },
        ],
        stats: [
          { gradient: true, number: "₹22 LPA", label: "Highest Indicative Range" },
          { gradient: false, number: "3", label: "Career Paths at Graduation" },
          { gradient: false, number: "9", label: "Certifications Across 2 Years" },
          { gradient: false, number: "2028", label: "First Graduating Batch" },
        ],
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Study This MBA", highlight: "At Tulas Institute", para: "A programme engineered for the AI era — combining a strong management core, industry alignment, and a culture of live campaigns." },
        items: [
          { n: "01", title: "AI-Integrated Learning", desc: "AI Tools for Marketers runs across three semesters on LEAP, an AI-native platform that personalises your path." },
          { n: "02", title: "IIT Kanpur E&ICT Academy", desc: "Association bringing premier, competency-based certifications and academic credibility to your degree." },
          { n: "03", title: "Industry-Aligned Certifications", desc: "Google, Meta, HubSpot, and DeepLearning.AI certifications aligned to what's being taught each semester." },
          { n: "04", title: "Live Brand Campaigns", desc: "A real multi-channel campaign in Semester II and an Industry Live Brand Project in Semester III." },
          { n: "05", title: "CMO-Panel Capstone", desc: "Present your final-semester brand strategy work to a panel of practising CMOs." },
          { n: "06", title: "Three Career Paths", desc: "Corporate marketing team, freelance consulting practice, or your own digital agency — built into Semester IV." },
          { n: "07", title: "Placement Readiness", desc: "Dedicated placement support across the final year of the programme." },
          { n: "08", title: "Life Skills & Professional Wellness", desc: "A dedicated NEP 2020 course covering burnout, ASCI standards, and professional workplace navigation." },
          { n: "09", title: "Brand P&L Ownership", desc: "Financial Accounting and Business Analytics for Marketers so you can defend a brand's numbers, not just its story." },
        ],
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF BANK", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk IT", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assistant", "Root Analysis", "Silverspace", "Step2gen", "The Times of India"],
      },
    ],
  },
]

// ---------------------------------------------------------------------
// Batch 3: MCA AI&ML, MBA (generic), BCA AI&ML, BCA Fullstack, MBA Business Analytics
// ---------------------------------------------------------------------
const batch3 = [
  {
    title: "MCA in Artificial Intelligence & Machine Learning",
    slug: "mca/artificial-intelligence-and-machine-learning",
    program: "MCA",
    school: "School of Computer Applications",
    sections: [
      {
        blockType: 'overview',
        imageCard: { changeDesign: 1, title: "MCA", highlight: "AI & Machine Learning" },
        header: { label: "School of Computer Applications", title: "Where Technology Meets", highlight: "Intelligent Innovation" },
        description1: "The MCA in Artificial Intelligence & Machine Learning at Tulas is built for students who want to engineer the intelligence behind tomorrow's technology.",
        description2: "The programme combines advanced computer science with deep AI specialisation — covering machine learning, deep learning, generative AI, natural language processing, computer vision, MLOps, and cloud AI architecture. Students build real AI systems through live projects, research publications, and industry internships, graduating as AI engineers ready to lead in any technology environment.",
        quote: "The future belongs to those who can build intelligence into machines.",
        table: { headers: [], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Specialization Areas", title: "Five AI Specializations, One Powerful", highlight: "Technology Core", para: "Each specialization is built on strong computer science and AI fundamentals, enhanced through research-driven, project-based learning across every semester." },
        cards: [
          { title: "Core · Machine Learning", desc: "Design and train intelligent models that learn from data to predict, classify, and optimise decisions at scale.", pills: ["Supervised Learning", "Scikit-Learn", "Model Evaluation"] },
          { title: "High Demand · Deep Learning", desc: "Build neural networks and transformer architectures that power image recognition, NLP, and autonomous systems.", pills: ["TensorFlow", "PyTorch", "Neural Networks"] },
          { title: "Future Ready · Generative AI & LLMs", desc: "Develop AI applications using large language models, prompt engineering, RAG pipelines, and AI agents.", pills: ["LangChain", "Hugging Face", "RAG & Agents"] },
          { title: "Industry Ready · Computer Vision", desc: "Create intelligent systems that detect, classify, and understand visual information from images and video streams.", pills: ["OpenCV", "CNNs", "Object Detection"] },
          { title: "Essential Skill · MLOps & Cloud AI", desc: "Deploy, monitor, and scale machine learning models in production using cloud platforms and modern DevOps practices.", pills: ["AWS SageMaker", "Docker", "CI/CD for ML"] }
        ],
        extraCard: { title: "Built on Computer Science Foundations", description: "Algorithms · Data Structures · Software Engineering · AI · Research · Cloud" },
        coreTags: ["Python for AI", "Machine Learning", "Deep Learning", "Neural Networks", "Natural Language Processing", "Computer Vision", "Generative AI", "Large Language Models", "LangChain", "Hugging Face", "TensorFlow", "PyTorch", "MLOps", "Cloud AI", "Vector Databases", "AI Research"]
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "AI-Integrated MCA Curriculum" },
        header: { label: "AI-Integrated Curriculum", title: "AI Isn't a Subject.", highlight: "It's Your Entire Curriculum.", para: "Every semester immerses students in modern AI technologies — from foundational machine learning to large language models, intelligent automation and production-ready AI deployment. Students graduate with practical expertise in developing scalable AI solutions for enterprises, startups and research organizations." },
        tags: ["Machine Learning", "Deep Learning", "Generative AI", "Large Language Models", "LangChain", "Hugging Face", "TensorFlow", "PyTorch", "Computer Vision", "MLOps", "Cloud AI", "Vector Databases"],
        roadmap: [
          { num: "01", title: "Semester 1", desc: "Advanced Programming · Mathematics for AI · Python · Data Engineering" },
          { num: "02", title: "Semester 2", desc: "Machine Learning · Deep Learning · Computer Vision · NLP" },
          { num: "03", title: "Semester 3", desc: "Generative AI · AI Agents · MLOps · Cloud AI · Research Project" },
          { num: "04", title: "Semester 4", desc: "Industry Internship · Capstone · AI Product Development" }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Certifications", highlight: "& Projects", para: "Beyond the degree — globally recognized certifications, real projects, and continuous industry exposure that make graduates job-ready." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Association", name: "IIT Kanpur E&ICT Academy Certifications", desc: "Premier certifications backed by IIT Kanpur's Electronics & ICT Academy — adding national credibility to your skill set." },
          { isMain: false, badge: "", name: "CEH (EC-Council)", desc: "Certified Ethical Hacker" },
          { isMain: false, badge: "", name: "CompTIA Security+", desc: "Security fundamentals" },
          { isMain: false, badge: "", name: "AWS", desc: "Cloud security tracks" },
          { isMain: false, badge: "", name: "Cisco", desc: "CCNA & network security" },
          { isMain: false, badge: "", name: "Microsoft", desc: "Azure security" },
          { isMain: false, badge: "", name: "Python", desc: "Security automation" }
        ],
        handsOnItems: ["Capture The Flag", "Penetration Testing Labs", "Security Hackathons", "Vulnerability Research", "SOC Simulations", "Bug Bounty Programs"]
      },
      {
        blockType: 'programDetails',
        badge: "MCA Artificial Intelligence & Machine Learning · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [{ id: "usps", num: "01", label: "Program USPs" }],
        contents: [{
          tabId: "usps",
          type: 'bullet',
          bulletItems: [
            "Build Real AI Systems: Work on live AI projects, research publications, AI hackathons, Kaggle competitions, and a final AI product capstone.",
            "AI-First Curriculum Architecture: Every semester is built around AI — from foundational ML to Generative AI, LLMs, MLOps, and cloud-native AI deployment.",
            "Integrated Placement Preparation: Prepare for campus recruitment through AI aptitude training, coding challenges, industry AI projects, and interview readiness.",
            "Learn from AI Industry Experts: Interact with AI researchers, ML engineers, and technology leaders through expert sessions, guest lectures, and mentorship.",
            "Research & Innovation Focus: Conduct AI research, publish papers, and build innovative AI products through structured research projects and industry collaborations.",
            "AI-Native Learning via LEAP: Use LEAP, our AI-native learning platform, to personalize your learning journey and continuously track your progress.",
            "AI Hackathons & Competitions: Participate in national AI hackathons, Kaggle competitions, and innovation challenges to build a strong competitive portfolio.",
            "Entrepreneurship & AI Ventures: Develop an entrepreneurial mindset to identify AI opportunities, build intelligent products, and launch technology ventures.",
            "Life Skills & Professional Growth: Develop workplace communication, ethical AI practices, business awareness, and career readiness aligned with NEP 2020.",
            "Industry Certifications Across 2 Years: Graduate with certifications from AWS, Google Cloud, Microsoft Azure, NVIDIA, Hugging Face, and other leading AI technology partners."
          ]
        }]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where MCA in AI & ML", highlight: "Can Take You", para: "From AI research labs to enterprise product teams — graduates build intelligent systems that shape how the world works." },
        jobs: [
          { title: "AI Engineer", range: "" },
          { title: "Machine Learning Engineer", range: "" },
          { title: "Data Scientist", range: "" },
          { title: "Generative AI Engineer", range: "" },
          { title: "LLM Engineer", range: "" },
          { title: "AI Solutions Architect", range: "" },
          { title: "NLP Engineer", range: "" },
          { title: "Computer Vision Engineer", range: "" },
          { title: "Research Scientist", range: "" },
          { title: "MLOps Engineer", range: "" },
          { title: "AI Product Engineer", range: "" },
          { title: "AI Consultant", range: "" }
        ],
        stats: [
          { gradient: false, number: "₹60 LPA", label: "Highest Package" },
          { gradient: false, number: "100%", label: "Placement Assistance" },
          { gradient: false, number: "500+", label: "Recruiters" },
          { gradient: false, number: "1000+", label: "Internships" }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF BANK", "Glowlogics", "Grant thornton", "Hikeedu", "Intel", "Movidu", "Prodesk it", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assitant", "Root Analysis", "Silverspace", "Step2gen", "The times of india"]
      }
    ]
  },
  {
    title: "MBA",
    slug: "mba",
    program: "MBA",
    school: "School of Management",
    sections: [
      {
        blockType: 'overview',
        imageCard: { changeDesign: 1, title: "2Y", highlight: "NEP 2020 OBE Framework" },
        header: { label: "School of Management", title: "Where Business", highlight: "Meets AI" },
        description1: "The MBA at Tulas Institute is designed to create future-ready managers and business leaders across every core function.",
        description2: "The program builds a strong management foundation — strategy, finance, economics, operations, organisational behaviour — and layers on AI tools, live business projects, and a specialization of your choice. With a strong emphasis on applied learning and industry exposure, students graduate ready to lead in their chosen function from day one.",
        quote: "Build the business core, choose your specialization, and lead with data and AI — Tulas' MBA is designed for where business is headed, not where it's been.",
        table: { headers: [], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Specializations", title: "Six Paths, One Strong", highlight: "Management Core", para: "Every specialization is built on the same management foundation and enhanced through AI-integrated learning." },
        cards: [
          { title: "Core · Marketing Management", desc: "Brand strategy, consumer behaviour, and integrated marketing communications.", pills: ["Brand Strategy", "Consumer Behaviour", "IMC"] },
          { title: "AI-Native · Digital Marketing using AI", desc: "AI-powered campaigns, martech tools, and performance marketing at scale.", pills: ["AI Tools", "Performance Marketing", "MarTech"] },
          { title: "People First · Human Resource Management", desc: "Talent strategy, organisational behaviour, and HR analytics for the modern workplace.", pills: ["Talent Strategy", "Org. Behaviour", "HR Analytics"] },
          { title: "Global · International Business", desc: "Global trade, cross-border strategy, and international finance for globally-minded managers.", pills: ["Global Trade", "Cross-Border Strategy", "Trade Finance"] },
          { title: "High Demand · Finance", desc: "Corporate finance, investment banking foundations, and financial risk management.", pills: ["Corporate Finance", "Investment Banking", "Risk Management"] },
          { title: "Data-Driven · Business Analytics", desc: "Predictive modelling, BI dashboards, and data-driven decision making across functions.", pills: ["Predictive Modelling", "BI Dashboards", "Data Strategy"] },
          { title: "Agriculture · Agri Business Mgmt.", desc: "Agricultural economics, policy, and agribusiness strategy built on a live farm-to-market brief.", pills: ["Data Statergy", "Agricultural Economics", "Finance & FinTech"] }
        ],
        extraCard: { title: "Built On Core Management", description: "Strategy · Finance · Economics · Operations · Organisational Behaviour · Marketing Management" },
        coreTags: []
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "" },
        header: { label: "The Differentiator", title: "An AI-Integrated", highlight: "Curriculum", para: "At Tulas Institute, AI runs through every specialization — on LEAP, an AI-native platform that personalises your path and tracks progress continuously, whichever function you choose to lead." },
        tags: ["AI for Business Strategy", "Predictive Analytics", "Generative AI", "Marketing Automation", "HR Analytics AI", "Financial Modelling AI", "Process Automation", "Data Visualization", "Decision Intelligence"],
        roadmap: [
          { num: "01", title: "Foundations", desc: "Digital literacy and AI tools for business, alongside the core management subjects." },
          { num: "02", title: "Applied AI", desc: "AI tools applied within your specialization, plus the first live business project." },
          { num: "03", title: "Advanced AI", desc: "Advanced specialization electives and an Industry Live Project." },
          { num: "04", title: "Leadership & Capstone", desc: "Leadership workshop, industry simulation, and a CXO-panel capstone." }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Certifications", highlight: "& Projects", para: "Beyond the degree — globally recognized certifications, real projects, and continuous industry exposure that make graduates job-ready." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Association", name: "IIT Kanpur E&ICT Academy Certifications", desc: "Premier, competency-based certifications backed by IIT Kanpur's Electronics & ICT Academy — adding national credibility to your MBA." },
          { isMain: false, badge: "", name: "Google", desc: "AI & digital certifications" },
          { isMain: false, badge: "", name: "Meta", desc: "Marketing & analytics blueprints" },
          { isMain: false, badge: "", name: "Microsoft", desc: "Power BI & Azure fundamentals" },
          { isMain: false, badge: "", name: "HubSpot / SAP", desc: "Marketing, CRM & ERP tracks" }
        ],
        handsOnItems: ["Live Business Projects", "Industry Live Project", "Case Competitions", "Business Simulations", "Research Projects", "CXO-Panel Capstone"]
      },
      {
        blockType: 'programDetails',
        badge: "MBA · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [{ id: "usps", num: "01", label: "USPs" }],
        contents: [{
          tabId: "usps",
          type: 'bullet',
          bulletItems: [
            "Six industry-facing specializations — Marketing, Digital Marketing using AI, HRM, International Business, Finance, and Business Analytics — on one shared management core.",
            "AI tools integrated across the curriculum via LEAP, an AI-native learning platform that personalises your path.",
            "Live business projects and an Industry Live Project embedded across both years of the programme.",
            "A certification stack — Google, Meta, Microsoft, HubSpot, SAP, and IIT Kanpur E&ICT Academy — prepared for within regular coursework.",
            "A dedicated NEP 2020 Life Skills & Professional Wellness course covering burnout, ethics, and professional workplace navigation.",
            "A CXO-panel capstone in the final semester, reviewed by senior industry practitioners.",
            "Dedicated placement support across the final year of the programme.",
            "Highest package of ₹60 LPA achieved by MBA graduates.",
            "Strong faculty and industry mentorship across every specialization track."
          ]
        }]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where This MBA", highlight: "Can Take You", para: "Six specializations, one strong foundation — our graduates build careers across every core business function." },
        jobs: [
          { title: "Marketing Manager", range: "₹8–18 LPA" },
          { title: "Digital Marketing Manager", range: "₹8–20 LPA" },
          { title: "HR Manager / HRBP", range: "₹7–16 LPA" },
          { title: "International Business Manager", range: "₹9–20 LPA" },
          { title: "Financial Analyst / Manager", range: "₹8–22 LPA" },
          { title: "Business Analyst", range: "" },
          { title: "Investment Banking Associate", range: "₹10–35 LPA" },
          { title: "Management Consultant", range: "Up to ₹60 LPA" }
        ],
        stats: [
          { gradient: false, number: "₹60 LPA", label: "Highest Package" },
          { gradient: false, number: "6", label: "Specializations" },
          { gradient: false, number: "100%", label: "Placement Assistance" },
          { gradient: false, number: "500+", label: "Recruiters" }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF BANK", "Glowlogics", "Grant thornton", "Hikeedu", "Intel", "Movidu", "Prodesk it", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assitant", "Root Analysis", "Silverspace", "Step2gen", "The times of india"]
      }
    ]
  },
  {
    title: "BCA in Artificial Intelligence & Machine Learning",
    slug: "bca/artificial-intelligence-and-machine-learning",
    program: "BCA",
    school: "School of Computing",
    sections: [
      {
        blockType: 'overview',
        imageCard: { changeDesign: 1, title: "3Y", highlight: "NEP 2020 OBE Framework" },
        header: { label: "School of Computing", title: "Where Code", highlight: "Meets AI" },
        description1: "The BCA in AI & ML at Tulas Institute teaches you to build real software — not just study it.",
        description2: "You start by writing code and building web pages, then build full-stack apps, then add AI features, and finish with a complete AI-powered product. By graduation you have at least two live, deployed applications any employer or client can open and test, plus placement preparation and freelancing skills.",
        quote: "You graduate with real apps — a deployed personal website in Year 1, a full-stack web app in Year 2, an AI-powered industry project in Year 3, and a final internship or capstone.",
        table: { headers: [], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Domains of Study", title: "Core Stack, Then", highlight: "One Minor Track", para: "Master the full developer stack, then choose one Minor track running across Years 2 and 3, ending in an industry-panel capstone." },
        cards: [
          { title: "Minor Track I · Full Stack Web Development", desc: "Authentication, payments, production features, and advanced React app design.", pills: ["Authentication", "Payments", "Production React"] },
          { title: "Minor Track II · AI Tools & Applications", desc: "AI APIs, chatbots, semantic search, RAG pipelines, and AI features at scale.", pills: ["AI APIs", "Chatbots", "RAG Pipelines"] },
          { title: "Minor Track III · Data Analytics", desc: "Pandas, visualisation, dashboards, and prediction — turning data into decisions.", pills: ["Pandas", "Visualisation", "Prediction"] }
        ],
        extraCard: { title: "Built On The Full Developer Stack", description: "Python · JavaScript · React · Databases & SQL · Cloud Computing · AI Tools" },
        coreTags: []
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "" },
        header: { label: "The Differentiator", title: "Build Every Year,", highlight: "Ship Every Year", para: "Your degree runs on LEAP, an AI-native platform that personalises your path and tracks progress continuously. Nine certifications from NVIDIA, Google, GitHub, freeCodeCamp, DeepLearning.AI, and IIT Kanpur E&ICT Academy are prepared for within regular coursework — not bolted on afterward." },
        tags: ["AI APIs & Chatbots", "Smart Search", "Content Generation", "Recommendations", "Machine Learning", "RAG Pipelines", "Semantic Search", "Responsible AI"],
        roadmap: [
          { num: "01", title: "Learn to Code", desc: "Python, web basics, data structures, SQL — and your first live deployed website." },
          { num: "02", title: "Full-Stack & Cloud", desc: "OOP, cloud computing, freelancing fundamentals, and a full-stack mini project." },
          { num: "03", title: "ML & AI Applications", desc: "Machine learning fundamentals, React, AI tools for developers, and an industry project." },
          { num: "04", title: "AI Product & Capstone", desc: "Build a complete AI-powered application and graduate via internship or capstone." }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Certifications", highlight: "& Projects", para: "9 industry certifications aligned across three years — a maximum of two per semester, with content fully taught before assessment." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Association · 3 Certificates", name: "IIT Kanpur E&ICT Academy Certifications", desc: "Independent, competency-based Year 1, Year 2, and Year 3 certificates covering the full BCA programme." },
          { isMain: false, badge: "", name: "NVIDIA", desc: "AI Fundamentals (DLIFND) — Sem I" },
          { isMain: false, badge: "", name: "Google", desc: "AI Essentials (Sem I) & Cloud Digital Leader (Sem III)" },
          { isMain: false, badge: "", name: "GitHub", desc: "GitHub Foundations Certification — Sem II" },
          { isMain: false, badge: "", name: "freeCodeCamp", desc: "JavaScript Algorithms & Data Structures — Sem IV" },
          { isMain: false, badge: "", name: "DeepLearning.AI", desc: "Deep Learning Specialisation — Sem V" },
          { isMain: false, badge: "", name: "Tulas Institute", desc: "Programme Completion Certificate — Sem VI" }
        ],
        handsOnItems: ["First Live Deployment (Sem II)", "Mini Project — Full Stack App (Sem III)", "Project I — Deployed Web App (Sem IV)", "Industry Project (Sem V)", "AI Product Development (Sem VI)", "Industry-Panel Capstone"]
      },
      {
        blockType: 'programDetails',
        badge: "BCA AI & ML · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [{ id: "usps", num: "01", label: "USPs" }],
        contents: [{
          tabId: "usps",
          type: 'bullet',
          bulletItems: [
            "You graduate with real apps — a deployed personal website in Year 1, a full-stack web app in Year 2, an AI-powered industry project in Year 3, and a final internship or capstone.",
            "Core + specialisation architecture — master the full stack, then choose one Minor track: Full Stack Web Development, AI Tools & Applications, or Data Analytics.",
            "Freelancing and placement readiness built in — Freelancing Fundamentals, Quantitative Aptitude preparation for TCS/Infosys/Wipro tests, and Career Readiness.",
            "A dedicated NEP 2020 Life Skills & Digital Citizenship course covering financial literacy, developer wellness, data privacy by design, and building a GitHub/LinkedIn profile.",
            "AI-native learning via LEAP, with 9 certifications from NVIDIA, Google, GitHub, freeCodeCamp, DeepLearning.AI, and IIT Kanpur E&ICT Academy.",
            "A Minor track capstone presented to an industry panel.",
            "Dedicated placement support across the final year of the programme."
          ]
        }]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where This BCA", highlight: "Can Take You", para: "A portfolio of live deployed applications, freelancing skills, and placement preparation — this is what supports placement." },
        jobs: [
          { title: "Web Developer", range: "₹3–7 LPA" },
          { title: "Full Stack Developer", range: "₹4–8 LPA" },
          { title: "AI Application Developer", range: "₹4–8 LPA" },
          { title: "Frontend Developer", range: "₹3–7 LPA" },
          { title: "Junior Data Analyst", range: "₹3–6 LPA" },
          { title: "Freelance Developer", range: "Varies" },
          { title: "Developer / Startup Founder", range: "Varies" }
        ],
        stats: [
          { gradient: false, number: "2+", label: "Live Deployed Apps at Graduation" },
          { gradient: false, number: "9", label: "Industry Certifications" },
          { gradient: false, number: "3", label: "Minor Specialisation Tracks" },
          { gradient: false, number: "2029", label: "First Graduating Batch" }
        ]
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Study This BCA", highlight: "At Tulas Institute", para: "Engineered to make you a working developer by graduation — not just a computer science student." },
        items: [
          { n: "01", title: "Ship Every Year", desc: "A deployed application every year, culminating in an AI-powered capstone product." },
          { n: "02", title: "IIT Kanpur E&ICT Academy", desc: "Three years of independent, competency-based certification covering the full programme." },
          { n: "03", title: "9 Industry Certifications", desc: "NVIDIA, Google, GitHub, freeCodeCamp, and DeepLearning.AI — aligned to your coursework." },
          { n: "04", title: "Full Developer Stack", desc: "Python, JavaScript, React, databases, cloud, and AI tools — not a single narrow track." },
          { n: "05", title: "Three Minor Tracks", desc: "Full Stack Web Development, AI Tools & Applications, or Data Analytics." },
          { n: "06", title: "Freelancing Built In", desc: "Freelancing Fundamentals teaches you to find clients and price your own work." },
          { n: "07", title: "Placement-Test Ready", desc: "Dedicated Quantitative Aptitude preparation for TCS, Infosys, and Wipro campus tests." },
          { n: "08", title: "Life Skills & Digital Citizenship", desc: "Financial literacy, developer wellness, and data privacy by design in Year 1." },
          { n: "09", title: "Industry-Panel Capstone", desc: "Present your Minor track's capstone project to a panel of industry practitioners." }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF BANK", "Glowlogics", "Grant thornton", "Hikeedu", "Intel", "Movidu", "Prodesk it", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assitant", "Root Analysis", "Silverspace", "Step2gen", "The times of india"]
      }
    ]
  },
  {
    title: "BCA in Full Stack Development",
    slug: "bca/fullstack-development",
    program: "BCA",
    school: "School of Computer Applications",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "Home / Programs / BCA / Full Stack Development" },
        badge: "BCA · Full Stack Development · NEP 2020",
        title: "Build The Web,",
        highlight: "Front To Back",
        description: "A strong foundation in computing, hands-on full stack development, and multiple specialization pathways — Tulas Institute's BCA in Full Stack Development is built for an industry-integrated, research-ready, future-ready graduate profile.",
        chips: [
          { strong: "4-Year", label: "Programme" },
          { strong: "8", label: "Semesters" },
          { strong: "8 Certs", label: "Industry Certifications" },
          { strong: "4 Tracks", label: "MERN · Django · Spring Boot · Laravel" }
        ],
        buttons: [
          { variant: "orange", icon: null, label: "Apply Now →" },
          { variant: "white_outline", icon: null, label: "Contact Admissions" }
        ]
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 1, title: "4Y", highlight: "NEP 2020 OBE Framework" },
        header: { label: "School of Computer Applications", title: "Where Code", highlight: "Meets Craft" },
        description1: "The BCA Full Stack Development programme trains you to build real web products — not just study them.",
        description2: "You start with core CS fundamentals, then master frontend with React.js, then build complete backends with Node.js, Django, Spring Boot, and Laravel — all while deploying on cloud with Docker and CI/CD. By graduation, you have four stacks under your belt and a capstone project live in production.",
        quote: "You graduate fluent in four full stack tracks — MERN, Django+React, Spring Boot+React, and Laravel+React — with a live deployed capstone project any employer can test.",
        table: { headers: [], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Domains of Study", title: "Six Pillars of", highlight: "Full Stack Mastery", para: "From pixel-perfect frontends to hardened enterprise backends — every layer of the modern web stack, taught end-to-end." },
        cards: [
          { title: "Frontend · Frontend Development", desc: "Build responsive, accessible UIs with React.js, modern CSS, and component-driven design patterns.", pills: ["React.js", "Responsive UI", "Component Design"] },
          { title: "Backend · Backend Development", desc: "Design and build server-side systems with Node.js, Django, Spring Boot, and Laravel.", pills: ["Node.js & Express", "Django", "Spring Boot", "Laravel"] },
          { title: "Full Stack Tracks · End-to-End Project Tracks", desc: "Build and deploy complete applications across four major stacks from frontend to database.", pills: ["MERN", "Django+React", "Spring Boot+React", "Laravel+React"] },
          { title: "Cloud & DevOps · Cloud, DevOps & Deployment", desc: "Deploy production apps using Docker, CI/CD pipelines, and AWS or Google Cloud infrastructure.", pills: ["Cloud Deployment", "DevOps", "Version Control"] },
          { title: "AI-Integrated · AI-Powered Web Development", desc: "Integrate machine learning APIs and intelligent features into full stack web applications.", pills: ["AI Integration", "Intelligent Features"] },
          { title: "Security & Enterprise · Web Security & Enterprise Dev", desc: "Implement authentication, encryption, and enterprise-grade architecture for large-scale systems.", pills: ["Web App Security", "Enterprise Development"] }
        ],
        extraCard: { title: "Built On Core Computing", description: "C · C++ · Python · Java · Data Structures · DBMS · Operating Systems · Computer Networks" },
        coreTags: ["Problem Solving Using C", "OOP with C++ & Java", "Data Structures", "Database Management Systems", "Software Engineering", "Operating Systems", "Computer Networks", "Design & Analysis of Algorithms", "Theory of Computation", "Compiler Design", "Network Security", "Web Technology"]
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "" },
        header: { label: "The Differentiator", title: "Build Every Layer,", highlight: "Ship Every Year", para: "The BCA Full Stack programme runs on a project-first philosophy — every year culminates in a live deployed application. From your first React page in Year 2 to a full cloud-deployed capstone in Year 4, you graduate with a portfolio of real, working products across four major tech stacks." },
        tags: ["React.js", "Node.js & Express.js", "Django", "Spring Boot", "Laravel", "REST APIs & Microservices", "MongoDB/NoSQL", "Cloud Deployment", "DevOps"],
        roadmap: [
          { num: "01", title: "Core Foundation", desc: "C, C++, Python, Java, Data Structures, DBMS, and OS — the bedrock of every great full stack developer." },
          { num: "02", title: "Frontend Mastery", desc: "React.js, HTML/CSS, JavaScript, responsive design, and your first live deployed web application." },
          { num: "03", title: "Backend & APIs", desc: "Node.js/Express, Django, Spring Boot, Laravel, REST APIs, microservices, and cloud deployment." },
          { num: "04", title: "Capstone & Career", desc: "Internship, capstone project across your chosen stack, live deployment, and placement readiness." }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Certifications", highlight: "& Projects", para: "8 industry certifications aligned across four years — with content fully taught before assessment, and six live projects built from scratch." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Association · 3 Certificates", name: "IIT Kanpur E&ICT Academy Certifications", desc: "Independent, competency-based Year 1, Year 2, and Year 3 certificates covering advanced algorithms, system design, and AI-integrated web development." },
          { isMain: false, badge: "", name: "MongoDB", desc: "MongoDB Developer Certification — Sem IV" },
          { isMain: false, badge: "", name: "GitHub", desc: "GitHub Foundations Certification — Sem III" },
          { isMain: false, badge: "", name: "Meta", desc: "React Developer Certification — Sem III" },
          { isMain: false, badge: "", name: "AWS / Google Cloud", desc: "Cloud Practitioner / Cloud Digital Leader — Sem V" },
          { isMain: false, badge: "", name: "Docker / Postman", desc: "Container & API Testing Certification — Sem VI" },
          { isMain: false, badge: "", name: "Tulas Institute", desc: "Programme Completion Certificate — Sem VIII" }
        ],
        handsOnItems: ["Web Mini Project I — HTML/CSS/JS (Sem II)", "Web Mini Project II — React App (Sem III)", "Full Stack Project I — MERN / Django (Sem IV)", "Full Stack Project II — Spring Boot / Laravel (Sem V)", "Full Stack Project III — AI-Powered App (Sem VI)", "Internship / Capstone — Live Deployed Product (Sem VII–VIII)"]
      },
      {
        blockType: 'programDetails',
        badge: "BCA Full Stack Development · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [{ id: "usps", num: "01", label: "USPs" }],
        contents: [{
          tabId: "usps",
          type: 'bullet',
          bulletItems: [
            "4-year, 8-semester programme with 120+ credits under NEP 2020 OBE — with ABC credit exit points at every year.",
            "Four full stack tracks: MERN, Django+React, Spring Boot+React, and Laravel+React — you master all four.",
            "Six live project deliverables across four years — from your first React app in Year 2 to a cloud-deployed capstone in Year 4.",
            "IIT Kanpur E&ICT Academy collaboration for advanced curriculum, certifications, and research access.",
            "8 industry certifications including IIT Kanpur (×3), MongoDB, GitHub, Meta, AWS/Google Cloud, and Docker/Postman.",
            "Cloud deployment and DevOps pipeline labs from Semester V — Docker, CI/CD, AWS/GCP, and container orchestration.",
            "AI integration built into the curriculum — intelligent feature labs in Semester VI across all backend frameworks.",
            "Dual pathway in Semester VII–VIII: long-term industry internship OR in-house capstone reviewed by an industry panel.",
            "Research & Entrepreneurship Ecosystem: Tulas i-Hub access, startup incubation, patent support, and mentorship.",
            "Strong computing core: C, C++, Python, Java, Data Structures, DBMS, Operating Systems, Computer Networks.",
            "Dedicated placement support with quantitative aptitude training and MCA/M.Tech/PhD pathway guidance."
          ]
        }]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where This BCA", highlight: "Can Take You", para: "Full stack developers are among the most in-demand roles across product, enterprise, and startup ecosystems — commanding roles from frontend to cloud." },
        jobs: [
          { title: "Full Stack Developer", range: "₹4–10 LPA" },
          { title: "Frontend Developer", range: "₹3–8 LPA" },
          { title: "Backend Developer", range: "₹4–9 LPA" },
          { title: "DevOps Engineer", range: "₹5–12 LPA" },
          { title: "Cloud Engineer", range: "₹5–12 LPA" },
          { title: "API Developer", range: "₹4–9 LPA" },
          { title: "Software Engineer", range: "₹4–10 LPA" },
          { title: "Tech Entrepreneur / Founder", range: "Varies" }
        ],
        stats: [
          { gradient: false, number: "8", label: "Semesters of Structured Learning" },
          { gradient: false, number: "8", label: "Industry Certifications" },
          { gradient: false, number: "4", label: "Full Stack Tracks to Master" },
          { gradient: false, number: "MCA+", label: "Higher Education Pathway Ready" }
        ]
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Study This BCA", highlight: "At Tulas Institute", para: "Engineered to make you a working full stack developer by graduation — not just a computer science student." },
        items: [
          { n: "01", title: "IIT Kanpur E&ICT Academy", desc: "Three-year academic collaboration delivering competency-based certifications and advanced curriculum in system design and AI-integrated web development." },
          { n: "02", title: "4 Full Stack Tracks", desc: "MERN, Django+React, Spring Boot+React, and Laravel+React — you do not choose one track; you learn all four." },
          { n: "03", title: "6 Live Projects", desc: "A live deployed web application every year — from your first React page to a cloud-hosted, AI-powered capstone product." },
          { n: "04", title: "8 Industry Certifications", desc: "MongoDB, GitHub, Meta, AWS/Google Cloud, Docker/Postman, and three IIT Kanpur certificates — all integrated into coursework." },
          { n: "05", title: "Cloud & DevOps from Year 3", desc: "Docker, CI/CD pipelines, AWS/GCP deployment, and Kubernetes introduced in Semesters V–VI with hands-on lab projects." },
          { n: "06", title: "AI-Integrated Curriculum", desc: "Every backend course in Semesters V–VI includes AI feature labs — chatbots, recommendation engines, and intelligent APIs." },
          { n: "07", title: "Industry-Panel Capstone", desc: "Present your Year 4 capstone to a panel of industry practitioners from companies like Amazon, Microsoft, and Oracle." },
          { n: "08", title: "Startup Incubation at Tulas i-Hub", desc: "Access innovation labs, seed funding networks, patent support, and mentored entrepreneurship through Tulas Institute's incubation ecosystem." },
          { n: "09", title: "MCA & PhD Pathway Ready", desc: "Dedicated GATE preparation, research methodology, and mentored higher education guidance for graduates aiming for MCA, M.Tech, or PhD." }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF BANK", "Glowlogics", "Grant thornton", "Hikeedu", "Intel", "Movidu", "Prodesk it", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assitant", "Root Analysis", "Silverspace", "Step2gen", "The times of india"]
      }
    ]
  },
  {
    title: "MBA in Business Analytics",
    slug: "mba/business-analytics",
    program: "MBA",
    school: "School of Management",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "Home / Programs / MBA / Business Analytics" },
        badge: "MBA · Business Analytics · NEP 2020",
        title: "Lead Decisions With",
        highlight: "Data-Driven Strategy",
        description: "Master the management core and applied business analytics at Tulas Institute, Dehradun — and graduate job-ready with predictive modelling skills, a live analytics project, and a data strategy capstone.",
        chips: [
          { strong: "2-Year", label: "MBA Programme" },
          { strong: "92 Credits", label: "4 Semesters" },
          { strong: "3 Sem", label: "AI Tools for Business Analysts" },
          { strong: "2028", label: "First Graduating Batch" }
        ],
        buttons: [
          { variant: "orange", icon: null, label: "Apply Now →" },
          { variant: "white_outline", icon: null, label: "Contact Admissions" }
        ]
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 1, title: "2Y", highlight: "NEP 2020 OBE Framework" },
        header: { label: "School of Management", title: "Where Strategy", highlight: "Meets Data" },
        description1: "The MBA in Business Analytics at Tulas Institute prepares data-driven managers to turn business data into strategic decisions.",
        description2: "Students master the management core — strategy, marketing, finance, operations — alongside applied business analytics, predictive modelling, and data-driven decision making. A live analytics project runs across Semester II, an Industry Live Analytics Project in Semester III, and a data strategy capstone in the final semester.",
        quote: "Job-ready by Semester II — graduates leave placeable across analytics teams, business intelligence consulting, or a data strategy leadership track.",
        table: { headers: [], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Domains You'll Study", title: "Two Majors, Three Minors", highlight: "One Analytics Core", para: "Every domain is built on a strong management foundation and enhanced through AI-integrated learning across all four semesters." },
        cards: [
          { title: "Major I · Sem III · Predictive Analytics & Business Intelligence", desc: "Statistical modelling, BI dashboards, and predictive analytics built on a live business dataset.", pills: ["Predictive Modelling", "BI Dashboards", "Statistical Analysis"] },
          { title: "Major II · Sem IV · Advanced Data Strategy & AI-Driven Decision Making", desc: "Data governance, advanced analytics strategy, and the leadership skills to run an analytics function.", pills: ["Data Strategy", "AI-Driven Decisions", "Leadership"] },
          { title: "Minor Track I · Business Analytics & Data Strategy", desc: "Attribution, dashboards, cohort analysis and cross-functional data governance.", pills: ["Attribution", "Dashboards", "Forecasting"] },
          { title: "Minor Track II · Finance & FinTech", desc: "P&L ownership, ROI analysis, and FinTech strategy applicable across functions.", pills: ["P&L Ownership", "ROI Analysis", "FinTech"] },
          { title: "Minor Track III · Operations & Supply Chain", desc: "Cross-functional operations alignment, tech stack fluency, and operations transformation.", pills: ["Ops Alignment", "Tech Stack", "Transformation"] }
        ],
        extraCard: { title: "Built On Core Management", description: "Strategy · Finance · Economics · Operations · Consumer Behaviour · Brand Management" },
        coreTags: ["Strategic Management", "Business Statistics", "Financial Accounting", "Predictive Modelling", "Data Visualization", "Machine Learning for Business", "AI for Analytics", "Big Data Fundamentals", "Business Intelligence", "Marketing Analytics", "Financial Analytics", "Data-Driven Decision Making"]
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "" },
        header: { label: "The Differentiator", title: "An AI-Integrated", highlight: "Curriculum", para: "At Tulas Institute, AI isn't a single elective — it runs through AI Tools for Business Analysts across three semesters, on LEAP, an AI-native platform that personalises your path and tracks progress continuously." },
        tags: ["Predictive Analytics", "Machine Learning Models", "Generative AI for Reporting", "Data Visualization AI", "Natural Language Querying", "Automated Forecasting", "Big Data Processing", "Business Intelligence AI", "Decision Intelligence", "Cloud Analytics Platforms"],
        roadmap: [
          { num: "01", title: "Foundations", desc: "Digital Literacy & AI Tools for Business Analysts – I, plus foundational business statistics coursework." },
          { num: "02", title: "Applied AI", desc: "AI Tools for Business Analysts – II, Introduction to AI for Business, and the first live analytics project." },
          { num: "03", title: "Advanced AI", desc: "AI Tools for Business Analysts – III (Advanced) alongside Digital Transformation & Business Models." },
          { num: "04", title: "Leadership & Simulation", desc: "Data Strategy Leadership Workshop & Industry Simulation heading into the capstone." }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Certifications, Projects", highlight: "& Live Practice", para: "Globally recognised certifications and continuous industry exposure that make graduates job-ready." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Association", name: "IIT Kanpur E&ICT Academy Certifications", desc: "Independent, competency-based Year 1 and Year 2 certificates covering the full MBA programme — adding national credibility to your skill set." },
          { isMain: false, badge: "", name: "Google", desc: "Data Analytics Professional Certificate (Sem I)" },
          { isMain: false, badge: "", name: "Microsoft", desc: "Power BI Data Analyst Associate (Sem II)" },
          { isMain: false, badge: "", name: "Tableau", desc: "Desktop Specialist Certification (Sem III)" },
          { isMain: false, badge: "", name: "IBM", desc: "Data Science Foundations (Sem III–IV)" }
        ],
        handsOnItems: ["Business Statistics Project", "Live Analytics Project", "Industry Live Analytics Project", "Case Competitions", "BI Dashboard Simulation", "Data Strategy Capstone"]
      },
      {
        blockType: 'programDetails',
        badge: "MBA Business Analytics · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [{ id: "usps", num: "01", label: "USPs" }],
        contents: [{
          tabId: "usps",
          type: 'bullet',
          bulletItems: [
            "Job-ready by Semester II — a real business statistics and analytics project run in Year 1.",
            "Multiple career pathways built in — analytics teams, business intelligence consulting, or a data strategy leadership track.",
            "AI Tools for Business Analysts runs across three semesters, building working fluency with AI-driven modelling and visualisation tools.",
            "Business Analytics and advanced Financial Accounting so every recommendation is backed by data and defensible to leadership.",
            "A dedicated NEP 2020 Life Skills & Professional Wellness course addressing burnout in high-pressure analytics roles and civic responsibility for business leaders.",
            "AI-native learning through LEAP, a platform that personalises your path and tracks progress continuously.",
            "A certification stack — Google Data Analytics, Microsoft Power BI, Tableau, IBM Data Science and IIT Kanpur E&ICT Academy — prepared for within regular coursework.",
            "An Industry Live Analytics Project in Semester III and a data strategy capstone in the final semester.",
            "Dedicated placement support across the final year of the programme."
          ]
        }]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where This MBA", highlight: "Can Take You", para: "Multiple pathways, not one — analytics teams, business intelligence consulting, or a data strategy leadership track." },
        jobs: [
          { title: "Business Analyst", range: "₹9–18 LPA" },
          { title: "Data Analyst", range: "₹8–16 LPA" },
          { title: "Analytics Manager", range: "₹9–25 LPA" },
          { title: "BI Consultant", range: "₹9–20 LPA" },
          { title: "Data Strategy Associate", range: "₹9–22 LPA" },
          { title: "Analytics Consultant", range: "₹10–24 LPA" }
        ],
        stats: [
          { gradient: false, number: "₹25 LPA", label: "Highest Indicative Range" },
          { gradient: false, number: "3", label: "Career Pathways" },
          { gradient: false, number: "9", label: "Certifications Across 2 Years" },
          { gradient: false, number: "2028", label: "First Graduating Batch" }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF BANK", "Glowlogics", "Grant thornton", "Hikeedu", "Intel", "Movidu", "Prodesk it", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assitant", "Root Analysis", "Silverspace", "Step2gen", "The times of india"]
      }
    ]
  }
]

// ---------------------------------------------------------------------
// Batch 4: MBA Marketing, MBA HRM, MBA Finance, MBA International Business, MBA Agri Business
// ---------------------------------------------------------------------
const batch4 = [
  {
    title: "MBA in Marketing",
    slug: "mba/marketing",
    program: "MBA",
    school: "School of Management",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "Home / Programs / MBA / Marketing" },
        badge: "MBA · Marketing · NEP 2020",
        title: "Lead Brands With",
        highlight: "Strategic Marketing",
        description: "Master the management core and applied marketing strategy at Tulas Institute, Dehradun — and graduate job-ready with real consumer research, a live brand campaign, and a leadership capstone.",
        chips: [
          { strong: "2-Year", label: "MBA Programme" },
          { strong: "92 Credits", label: "4 Semesters" },
          { strong: "3 Sem", label: "AI Tools for Marketers" },
          { strong: "Multiple", label: "Career Pathways" },
          { strong: "2028", label: "First Graduating Batch" }
        ],
        buttons: [
          { variant: "orange", icon: null, label: "Apply Now →" },
          { variant: "white_outline", icon: null, label: "Contact Admissions" }
        ]
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 0, title: "2Y", highlight: "NEP 2020 OBE Framework" },
        header: { label: "School of Management", title: "Where Strategy", highlight: "Meets Consumers" },
        description1: "The MBA in Marketing at Tulas Institute, Dehradun prepares brand and marketing leaders to think strategically about consumers, channels, and growth.",
        description2: "Students master the management core — strategy, finance, analytics, operations — alongside applied marketing strategy, consumer insights, and brand leadership. A live market research project runs across Semester II, an Industry Live Brand Project in Semester III, and a leadership capstone in the final semester.",
        quote: "Job-ready by Semester II — graduates leave placeable across brand teams, retail and sales leadership, or marketing consulting practice.",
        table: { headers: [], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Domains You'll Study", title: "Two Majors, Three Minors", highlight: "One Marketing Core", para: "Every domain is built on a strong management foundation and enhanced through AI-integrated learning across all four semesters." },
        cards: [
          { title: "Marketing Strategy & Consumer Insights", desc: "Consumer behaviour, market research, and strategic positioning built on a live client brief.", pills: ["Consumer Insights", "Market Research", "Positioning"] },
          { title: "Brand Leadership & Retail Management", desc: "Brand equity management, retail strategy, and the leadership skills to run a marketing function.", pills: ["Brand Equity", "Retail Strategy", "Leadership"] },
          { title: "Business Analytics & Data Strategy", desc: "Attribution, dashboards, cohort analysis and cross-functional data governance.", pills: ["Attribution", "Dashboards", "Forecasting"] },
          { title: "Finance & FinTech", desc: "P&L ownership, ROI analysis, and FinTech strategy applicable across functions.", pills: ["P&L Ownership", "ROI Analysis", "FinTech"] },
          { title: "Operations & Supply Chain", desc: "Cross-functional operations alignment, tech stack fluency, and operations transformation.", pills: ["Ops Alignment", "Tech Stack", "Transformation"] }
        ],
        extraCard: { title: "Built On Core Management", description: "Strategy · Finance · Economics · Operations · Consumer Behaviour · Brand Management" },
        coreTags: ["Strategic Management", "Brand Management", "Financial Accounting", "Business Analytics", "Consumer Behaviour", "Marketing Research", "AI for Marketing", "Retail Management", "Sales Management", "Brand P&L", "Campaign Management", "Market Research"]
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "LEAP · AI-Native Platform" },
        header: { label: "The Differentiator", title: "An AI-Integrated", highlight: "Curriculum", para: "At Tulas Institute, AI isn't a single elective — it runs through AI Tools for Marketers across three semesters, on LEAP, an AI-native platform that personalises your path and tracks progress continuously." },
        tags: ["AI Content Generation", "Consumer Insight Mining", "Predictive Analytics", "Generative AI", "Marketing Automation", "Customer Segmentation", "Sentiment Analysis", "Market Research AI", "Trend Forecasting", "Brand Monitoring"],
        roadmap: [
          { num: "01", title: "Foundations", desc: "Digital Literacy & AI Tools for Marketers – I, plus foundational consumer behaviour coursework." },
          { num: "02", title: "Applied AI", desc: "AI Tools for Marketers – II, Introduction to AI for Business, and the first live market research project." },
          { num: "03", title: "Advanced AI", desc: "AI Tools for Marketers – III (Advanced) alongside Digital Transformation & Business Models." },
          { num: "04", title: "Leadership & Simulation", desc: "Brand Leadership Workshop & Industry Simulation heading into the capstone." }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Certifications, Projects", highlight: "& Live Practice", para: "Globally recognised certifications and continuous industry exposure that make graduates job-ready." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Association", name: "IIT Kanpur E&ICT Academy Certifications", desc: "Independent, competency-based Year 1 and Year 2 certificates covering the full MBA programme — adding national credibility to your skill set." },
          { isMain: false, badge: "Google", name: "Analytics & AI Essentials", desc: "Sem I" },
          { isMain: false, badge: "Meta", name: "Blueprint — Marketing Fundamentals", desc: "Sem I" },
          { isMain: false, badge: "HubSpot Academy", name: "Marketing & Content Marketing", desc: "Sem II–IV" },
          { isMain: false, badge: "Nielsen / Kantar", name: "Market Research Foundations", desc: "Sem III" }
        ],
        handsOnItems: ["Consumer Research Project", "Live Brand Campaign", "Industry Live Brand Project", "Case Competitions", "Retail Simulation Workshop", "Leadership Capstone"]
      },
      {
        blockType: 'programDetails',
        badge: "MBA Marketing · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [{ id: "usps", num: "01", label: "USPs" }],
        contents: [
          { tabId: "usps", type: "bullet", bulletItems: [
            "Job-ready by Semester II — a real consumer research and brand campaign run in Year 1.",
            "Multiple career pathways built in — brand teams, retail and sales leadership, or marketing consulting practice.",
            "AI Tools for Marketers runs across three semesters, building working fluency with AI-driven insight and campaign tools.",
            "Business Analytics for Marketers and Financial Accounting for Marketers so every recommendation is backed by data and defensible on a brand P&L.",
            "A dedicated NEP 2020 Life Skills & Professional Wellness course addressing burnout in high-pressure marketing roles and civic responsibility for business leaders.",
            "AI-native learning through LEAP, a platform that personalises your path and tracks progress continuously.",
            "A certification stack — Google, Meta, HubSpot and IIT Kanpur E&ICT Academy — prepared for within regular coursework.",
            "An Industry Live Brand Project in Semester III and a leadership capstone in the final semester.",
            "Dedicated placement support across the final year of the programme."
          ]}
        ]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where This MBA", highlight: "Can Take You", para: "Multiple pathways, not one — brand teams, retail and sales leadership, or marketing consulting practice." },
        jobs: [
          { title: "Marketing Manager", range: "₹8–18 LPA" },
          { title: "Brand Manager", range: "₹8–20 LPA" },
          { title: "Product Manager", range: "₹8–16 LPA" },
          { title: "Market Research Analyst", range: "₹6–12 LPA" },
          { title: "Sales Manager", range: "₹7–15 LPA" },
          { title: "Retail Manager", range: "₹6–14 LPA" }
        ],
        stats: [
          { gradient: true, number: "₹20 LPA", label: "Highest Indicative Range" },
          { gradient: false, number: "3", label: "Career Pathways" },
          { gradient: false, number: "9", label: "Certifications Across 2 Years" },
          { gradient: false, number: "2028", label: "First Graduating Batch" }
        ]
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Study This MBA", highlight: "At Tulas Institute", para: "A programme engineered for the AI era — combining a strong management core, industry alignment, and applied marketing practice." },
        items: [
          { n: "01", title: "AI-Integrated Learning", desc: "AI Tools for Marketers runs across three semesters on LEAP, an AI-native platform that personalises your path and tracks progress continuously." },
          { n: "02", title: "IIT Kanpur E&ICT Academy", desc: "Association bringing premier, competency-based certifications and academic credibility to your MBA degree." },
          { n: "03", title: "Industry-Aligned Certifications", desc: "Google, Meta, and HubSpot certifications aligned to what's being taught each semester." },
          { n: "04", title: "Live Brand & Research Projects", desc: "A real consumer research project in Semester II and an Industry Live Brand Project in Semester III — not case studies, real campaigns." },
          { n: "05", title: "Leadership Capstone", desc: "Present your final-semester marketing strategy work to a panel of practising brand leaders from industry." },
          { n: "06", title: "Multiple Career Pathways", desc: "Brand teams, retail and sales leadership, or marketing consulting practice — built into the curriculum from Day 1." },
          { n: "07", title: "Placement Readiness", desc: "Dedicated placement support across the final year of the programme, with aptitude and case interview preparation." },
          { n: "08", title: "Life Skills & Professional Wellness", desc: "A dedicated NEP 2020 course covering burnout management, ethics, and professional workplace navigation for marketing roles." },
          { n: "09", title: "Brand P&L Ownership", desc: "Financial Accounting and Business Analytics for Marketers so you can defend a brand's numbers, not just its story." }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF Bank", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk IT", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assistant", "Root Analysis", "Silverspace", "Step2gen", "The Times of India"]
      }
    ]
  },
  {
    title: "MBA in Human Resource Management",
    slug: "mba/human-resource-management",
    program: "MBA",
    school: "School of Management",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "Home / Programs / MBA / Human Resource Management" },
        badge: "MBA · Human Resource Management · NEP 2020",
        title: "Lead People With",
        highlight: "Strategic HR",
        description: "Master the management core and applied HR strategy at Tulas Institute, Dehradun — and graduate job-ready with real organisational diagnostics, a live talent audit, and a leadership capstone.",
        chips: [
          { strong: "2-Year", label: "MBA Programme" },
          { strong: "92 Credits", label: "4 Semesters" },
          { strong: "AI Tools", label: "for HR Professionals" },
          { strong: "Multiple", label: "Career Pathways" },
          { strong: "2028", label: "First Graduating Batch" }
        ],
        buttons: [
          { variant: "orange", icon: null, label: "Apply Now →" },
          { variant: "white_outline", icon: null, label: "Contact Admissions" }
        ]
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 0, title: "2Y", highlight: "NEP 2020 OBE Framework" },
        header: { label: "School of Management", title: "Where Strategy", highlight: "Meets People" },
        description1: "The MBA in Human Resource Management at Tulas Institute, Dehradun prepares strategic HR leaders to manage talent, drive culture, and align people strategy with business objectives.",
        description2: "Students master the management core — strategy, finance, analytics, operations — alongside applied HR strategy, talent management, and people analytics. A live organisational diagnosis runs across Semester I, a Live Talent Audit in Semester II, an Industry Live HR Project in Semester III, and a Talent Strategy Capstone in the final semester.",
        quote: "Job-ready by Semester II — graduates leave placeable across HR business partner roles, talent acquisition leadership, or an independent HR consulting practice.",
        table: { headers: [], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Domains You'll Study", title: "Two Majors, Three Minors", highlight: "One People Core", para: "Every domain is built on a strong management foundation and enhanced through AI-integrated learning across all four semesters." },
        cards: [
          { title: "Talent Management & Organisational Behaviour", desc: "Talent acquisition, organisational design, and behavioural frameworks for building high-performance teams.", pills: ["Talent Acquisition", "Org. Behaviour", "Org. Design"] },
          { title: "HR Analytics & Strategic HR Leadership", desc: "Data-driven HR decision-making, compensation strategy, and leadership skills to run the people function.", pills: ["HR Analytics", "Compensation Strategy", "Leadership"] },
          { title: "Business Analytics & Data Strategy", desc: "Attribution, dashboards, cohort analysis and cross-functional data governance for HR decision-making.", pills: ["Attribution", "Dashboards", "Forecasting"] },
          { title: "Finance & FinTech", desc: "P&L ownership, ROI analysis, and FinTech strategy to partner effectively with business and finance teams.", pills: ["P&L Ownership", "ROI Analysis", "FinTech"] },
          { title: "Operations & Supply Chain", desc: "Cross-functional operations alignment, tech stack fluency, and operations transformation from an HR lens.", pills: ["Ops Alignment", "Tech Stack", "Transformation"] }
        ],
        extraCard: { title: "Built On Core Management", description: "Strategy · Finance · Economics · Operations · Consumer Behaviour · Brand Management" },
        coreTags: ["Strategic Management", "Organisational Behaviour", "Financial Accounting", "HR Analytics", "Talent Acquisition", "Compensation & Benefits", "AI for HR", "Labour Law", "Learning & Development", "Industrial Relations", "Performance Management", "Business Economics"]
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "LEAP · AI-Native Platform" },
        header: { label: "The Differentiator", title: "An AI-Integrated", highlight: "Curriculum", para: "At Tulas Institute, AI isn't a single elective — it runs through AI Tools for HR Professionals across three semesters, on LEAP, an AI-native platform that personalises your path and tracks progress continuously." },
        tags: ["AI-Assisted Recruitment", "People Analytics", "Predictive Attrition Modelling", "Generative AI for HR Content", "Sentiment Analysis for Engagement", "Chatbots for Employee Support", "Automated Screening Tools", "Workforce Planning AI", "Performance Analytics", "HRIS Platforms"],
        roadmap: [
          { num: "01", title: "Foundations", desc: "Digital Literacy & AI Tools for HR Professionals – I, plus foundational organisational behaviour and labour law coursework." },
          { num: "02", title: "Applied AI", desc: "AI Tools for HR – II, Introduction to AI for Business, and the first live Talent Audit Project." },
          { num: "03", title: "Advanced AI", desc: "AI Tools for HR – III (Advanced) alongside HR Analytics & Strategic HR Leadership specialisation." },
          { num: "04", title: "Leadership & Simulation", desc: "Talent Strategy Workshop & Industry HR Simulation heading into the capstone." }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Certifications, Projects", highlight: "& Live Practice", para: "Globally recognised certifications and continuous industry exposure that make graduates job-ready HR professionals." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Association", name: "IIT Kanpur E&ICT Academy Certifications", desc: "Independent, competency-based Year 1 and Year 2 certificates covering the full MBA programme — adding national credibility to your HR skill set." },
          { isMain: false, badge: "SHRM", name: "HR Management Essentials", desc: "Sem I" },
          { isMain: false, badge: "LinkedIn Learning", name: "People Analytics Certification", desc: "Sem II" },
          { isMain: false, badge: "Coursera", name: "HR Management & Analytics Specialisation", desc: "Sem III" },
          { isMain: false, badge: "HRCI", name: "Associate Professional in HR — aPHR", desc: "Sem III–IV" }
        ],
        handsOnItems: ["Organisational Diagnosis Project", "Live Talent Audit Project", "Industry Live HR Project", "Case Competitions", "Talent Simulation Workshop", "HR Leadership Capstone"]
      },
      {
        blockType: 'programDetails',
        badge: "MBA HRM · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [{ id: "usps", num: "01", label: "USPs" }],
        contents: [
          { tabId: "usps", type: "bullet", bulletItems: [
            "Job-ready by Semester II — a real organisational diagnosis and talent audit project run in Year 1.",
            "Multiple career pathways built in — HR business partner roles, talent acquisition leadership, or an independent HR consulting practice.",
            "AI Tools for HR Professionals runs across three semesters, building working fluency with AI-driven recruitment and people-analytics tools.",
            "HR Analytics and advanced Financial Accounting so every people decision is backed by data and defensible to leadership.",
            "A dedicated NEP 2020 Life Skills & Professional Wellness course addressing burnout in high-pressure HR roles and civic responsibility for business leaders.",
            "AI-native learning through LEAP, a platform that personalises your path and tracks progress continuously.",
            "A certification stack — SHRM, LinkedIn Learning People Analytics, HRCI and IIT Kanpur E&ICT Academy — prepared for within regular coursework.",
            "An Industry Live HR Project in Semester III and an HR leadership capstone in the final semester.",
            "Dedicated placement support across the final year of the programme."
          ]}
        ]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where This MBA", highlight: "Can Take You", para: "Multiple pathways, not one — HR business partner roles, talent acquisition leadership, or an independent HR consulting practice." },
        jobs: [
          { title: "HR Manager / HRBP", range: "₹7–16 LPA" },
          { title: "Talent Acquisition Manager", range: "₹8–18 LPA" },
          { title: "L&D Manager", range: "₹7–15 LPA" },
          { title: "Compensation & Benefits Analyst", range: "₹7–14 LPA" },
          { title: "HR Analytics Specialist", range: "₹8–17 LPA" },
          { title: "Industrial Relations Manager", range: "₹8–16 LPA" }
        ],
        stats: [
          { gradient: true, number: "₹18 LPA", label: "Highest Indicative Range" },
          { gradient: false, number: "3", label: "Career Pathways" },
          { gradient: false, number: "9", label: "Certifications Across 2 Years" },
          { gradient: false, number: "2028", label: "First Graduating Batch" }
        ]
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Study This MBA", highlight: "At Tulas Institute", para: "A programme engineered for the AI era — combining a strong management core, industry alignment, and applied practice." },
        items: [
          { n: "01", title: "AI-Integrated Learning", desc: "AI Tools for HR Professionals runs across three semesters on LEAP, an AI-native platform that personalises your path." },
          { n: "02", title: "IIT Kanpur E&ICT Academy", desc: "Association bringing premier, competency-based certifications and academic credibility to your degree." },
          { n: "03", title: "Industry-Aligned Certifications", desc: "SHRM, LinkedIn Learning People Analytics, and HRCI certifications aligned to what's being taught each semester." },
          { n: "04", title: "Live Talent Projects", desc: "A real organisational diagnosis project in Semester II and an Industry Live HR Project in Semester III." },
          { n: "05", title: "HR Leadership Capstone", desc: "Present your final-semester talent strategy work to a panel of practising HR leaders." },
          { n: "06", title: "Multiple Career Pathways", desc: "HR business partner roles, talent acquisition leadership, or an independent HR consulting practice." },
          { n: "07", title: "Placement Readiness", desc: "Dedicated placement support across the final year of the programme." },
          { n: "08", title: "Life Skills & Professional Wellness", desc: "A dedicated NEP 2020 course covering burnout, ethics, and professional workplace navigation." },
          { n: "09", title: "People Analytics Fluency", desc: "Workforce data, engagement metrics, and attrition modelling taught as a connected HR analytics core." }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF Bank", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk IT", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assistant", "Root Analysis", "Silverspace", "Step2gen", "The Times of India"]
      }
    ]
  },
  {
    title: "MBA in Finance",
    slug: "mba/finance",
    program: "MBA",
    school: "School of Management",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "Home / Programs / MBA / Finance" },
        badge: "MBA · Finance · NEP 2020",
        title: "Lead Capital With",
        highlight: "Financial Strategy",
        description: "Master the management core and applied corporate finance at Tulas Institute, Dehradun — and graduate job-ready with financial modelling skills, a live valuation project, and a capital-markets capstone.",
        chips: [
          { strong: "2-Year", label: "MBA Programme" },
          { strong: "92 Credits", label: "4 Semesters" },
          { strong: "AI Tools", label: "for Finance Professionals" },
          { strong: "Multiple", label: "Career Pathways" },
          { strong: "2028", label: "First Graduating Batch" }
        ],
        buttons: [
          { variant: "orange", icon: null, label: "Apply Now →" },
          { variant: "white_outline", icon: null, label: "Contact Admissions" }
        ]
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 0, title: "2Y", highlight: "NEP 2020 OBE Framework" },
        header: { label: "School of Management", title: "Where Strategy", highlight: "Meets Capital" },
        description1: "The MBA in Finance at Tulas Institute, Dehradun prepares financial leaders to make capital allocation and risk decisions with rigour.",
        description2: "Students master the management core — strategy, marketing, analytics, operations — alongside applied corporate finance, financial modelling, and capital markets. A live valuation project runs across Semester II, an Industry Live Finance Project in Semester III, and a capital-markets capstone in the final semester.",
        quote: "Job-ready by Semester II — graduates leave placeable across corporate finance teams, banking and financial services, or an independent advisory practice.",
        table: { headers: [], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Domains You'll Study", title: "Two Majors, Three Minors", highlight: "One Finance Core", para: "Every domain is built on a strong management foundation and enhanced through AI-integrated learning across all four semesters." },
        cards: [
          { title: "Corporate Finance & Investment Strategy", desc: "Capital budgeting, valuation, and investment strategy built on a live company brief.", pills: ["Capital Budgeting", "Valuation", "Investment Strategy"] },
          { title: "Financial Risk & Capital Markets Leadership", desc: "Risk management, capital markets operations, and the leadership skills to run a finance function.", pills: ["Risk Management", "Capital Markets", "Leadership"] },
          { title: "Business Analytics & Data Strategy", desc: "Attribution, dashboards, cohort analysis and cross-functional data governance.", pills: ["Attribution", "Dashboards", "Forecasting"] },
          { title: "Finance & FinTech", desc: "P&L ownership, ROI analysis, and FinTech strategy applicable across functions.", pills: ["P&L Ownership", "ROI Analysis", "FinTech"] },
          { title: "Operations & Supply Chain", desc: "Cross-functional operations alignment, tech stack fluency, and operations transformation.", pills: ["Ops Alignment", "Tech Stack", "Transformation"] }
        ],
        extraCard: { title: "Built On Core Management", description: "Strategy · Finance · Economics · Operations · Consumer Behaviour · Brand Management" },
        coreTags: ["Strategic Management", "Financial Accounting", "Corporate Finance", "Business Analytics", "Financial Modelling", "Investment Analysis", "AI for Finance", "Risk Management", "Capital Markets", "Banking & Insurance", "Financial Reporting", "Business Economics"]
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "LEAP · AI-Native Platform" },
        header: { label: "The Differentiator", title: "An AI-Integrated", highlight: "Curriculum", para: "At Tulas Institute, AI isn't a single elective — it runs through AI Tools for Finance Professionals across three semesters, on LEAP, an AI-native platform that personalises your path and tracks progress continuously." },
        tags: ["AI-Assisted Financial Modelling", "Predictive Analytics", "Algorithmic Screening", "Generative AI for Reporting", "Risk Scoring Models", "Fraud Detection AI", "Robo-Advisory Concepts", "Sentiment Analysis for Markets", "Automated Valuation", "FinTech Tools"],
        roadmap: [
          { num: "01", title: "Foundations", desc: "Digital Literacy & AI Tools for Finance – I, plus foundational financial accounting coursework." },
          { num: "02", title: "Applied AI", desc: "AI Tools for Finance – II, Introduction to AI for Business, and the first live valuation project." },
          { num: "03", title: "Advanced AI", desc: "AI Tools for Finance – III (Advanced) alongside Digital Transformation & Business Models." },
          { num: "04", title: "Leadership & Simulation", desc: "Capital Markets Leadership Workshop & Industry Simulation heading into the capstone." }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Certifications, Projects", highlight: "& Live Practice", para: "Globally recognised certifications and continuous industry exposure that make graduates job-ready finance professionals." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Association", name: "IIT Kanpur E&ICT Academy Certifications", desc: "Independent, competency-based Year 1 and Year 2 certificates covering the full MBA programme — adding national credibility to your financial skill set." },
          { isMain: false, badge: "NSE Academy", name: "Financial Markets Certification", desc: "Sem I" },
          { isMain: false, badge: "Bloomberg Market Concepts", name: "Capital Markets Foundations", desc: "Sem II" },
          { isMain: false, badge: "Coursera / Yale", name: "Financial Markets Specialisation", desc: "Sem III" },
          { isMain: false, badge: "CFA Institute", name: "Investment Foundations", desc: "Sem III–IV" }
        ],
        handsOnItems: ["Financial Modelling Project", "Live Valuation Project", "Industry Live Finance Project", "Case Competitions", "Trading & Markets Simulation", "Capital Markets Capstone"]
      },
      {
        blockType: 'programDetails',
        badge: "MBA Finance · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [{ id: "usps", num: "01", label: "USPs" }],
        contents: [
          { tabId: "usps", type: "bullet", bulletItems: [
            "Job-ready by Semester II — a real financial modelling and valuation project run in Year 1.",
            "Multiple career pathways built in — corporate finance teams, banking and financial services, or an independent advisory practice.",
            "AI Tools for Finance Professionals runs across three semesters, building working fluency with AI-driven modelling and risk tools.",
            "Business Analytics for Finance and advanced Financial Accounting so every recommendation is backed by data and defensible to a CFO.",
            "A dedicated NEP 2020 Life Skills & Professional Wellness course addressing burnout in high-pressure finance roles and civic responsibility for business leaders.",
            "AI-native learning through LEAP, a platform that personalises your path and tracks progress continuously.",
            "A certification stack — NSE Academy, Bloomberg Market Concepts, CFA Institute Investment Foundations and IIT Kanpur E&ICT Academy — prepared for within regular coursework.",
            "An Industry Live Finance Project in Semester III and a capital-markets capstone in the final semester.",
            "Dedicated placement support across the final year of the programme."
          ]}
        ]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where This MBA", highlight: "Can Take You", para: "Multiple pathways, not one — corporate finance teams, banking and financial services, or an independent advisory practice." },
        jobs: [
          { title: "Financial Analyst", range: "₹8–22 LPA" },
          { title: "Investment Banking Associate", range: "₹10–35 LPA" },
          { title: "Risk Manager", range: "₹9–20 LPA" },
          { title: "Portfolio Manager", range: "₹10–25 LPA" },
          { title: "Corporate Finance Manager", range: "₹9–20 LPA" },
          { title: "FinTech Analyst", range: "₹8–18 LPA" }
        ],
        stats: [
          { gradient: true, number: "₹35 LPA", label: "Highest Indicative Range" },
          { gradient: false, number: "3", label: "Career Pathways" },
          { gradient: false, number: "9", label: "Certifications Across 2 Years" },
          { gradient: false, number: "2028", label: "First Graduating Batch" }
        ]
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Study This MBA", highlight: "At Tulas Institute", para: "A programme engineered for the AI era — combining a strong management core, industry alignment, and applied practice." },
        items: [
          { n: "01", title: "AI-Integrated Learning", desc: "AI Tools for Finance Professionals runs across three semesters on LEAP, an AI-native platform that personalises your path." },
          { n: "02", title: "IIT Kanpur E&ICT Academy", desc: "Association bringing premier, competency-based certifications and academic credibility to your degree." },
          { n: "03", title: "Industry-Aligned Certifications", desc: "NSE Academy, Bloomberg Market Concepts, and CFA Institute Investment Foundations aligned to what's being taught each semester." },
          { n: "04", title: "Live Valuation & Modelling Projects", desc: "A real financial modelling project in Semester II and an Industry Live Finance Project in Semester III." },
          { n: "05", title: "Capital Markets Capstone", desc: "Present your final-semester financial strategy work to a panel of practising finance leaders." },
          { n: "06", title: "Multiple Career Pathways", desc: "Corporate finance teams, banking and financial services, or an independent advisory practice." },
          { n: "07", title: "Placement Readiness", desc: "Dedicated placement support across the final year of the programme." },
          { n: "08", title: "Life Skills & Professional Wellness", desc: "A dedicated NEP 2020 course covering burnout, ethics, and professional workplace navigation." },
          { n: "09", title: "P&L Ownership", desc: "Financial Accounting and Business Analytics for Finance so you can defend the numbers, not just the narrative." }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF Bank", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk IT", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assistant", "Root Analysis", "Silverspace", "Step2gen", "The Times of India"]
      }
    ]
  },
  {
    title: "MBA in International Business",
    slug: "mba/international-business",
    program: "MBA",
    school: "School of Management",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "Home / Programs / MBA / International Business" },
        badge: "MBA · International Business · NEP 2020",
        title: "Lead Markets Across",
        highlight: "Borders",
        description: "Master the management core and applied global trade strategy at Tulas Institute, Dehradun — and graduate job-ready with cross-border strategy skills, a live trade project, and a global leadership capstone.",
        chips: [
          { strong: "2-Year", label: "MBA Programme" },
          { strong: "92 Credits", label: "4 Semesters" },
          { strong: "AI Tools", label: "for Global Business" },
          { strong: "Multiple", label: "Career Pathways" }
        ],
        buttons: [
          { variant: "orange", icon: null, label: "Apply Now" },
          { variant: "white_outline", icon: null, label: "Contact Admissions" }
        ]
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 0, title: "2Y", highlight: "NEP 2020 · OBE Framework" },
        header: { label: "School of Management", title: "Where Strategy", highlight: "Meets The World" },
        description1: "The MBA in International Business at Tulas Institute, Dehradun prepares globally-minded managers to navigate cross-border trade and strategy.",
        description2: "Students master the management core — strategy, marketing, finance, operations — alongside applied global trade, cross-border strategy, and international finance. A live market-entry project runs across Semester II, an Industry Live Global Trade Project in Semester III, and a global leadership capstone in the final semester.",
        quote: "Job-ready by Semester II — graduates leave placeable across export-import operations, global trade consulting, or an international market-entry leadership track.",
        table: { headers: [], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Domains You'll Study", title: "Two Majors, Three Minors", highlight: "One Global Business Core", para: "Every domain is built on a strong management foundation and enhanced through AI-integrated learning across all four semesters." },
        cards: [
          { title: "Global Trade & Cross-Border Strategy", desc: "Export-import operations, market-entry strategy, and trade policy built on a live market-entry brief.", pills: ["Export-Import", "Market-Entry Strategy", "Trade Policy"] },
          { title: "International Finance & Global Supply Chain Leadership", desc: "Trade finance, currency risk, and global supply chain leadership skills.", pills: ["Trade Finance", "Currency Risk", "Supply Chain Leadership"] },
          { title: "Business Analytics & Data Strategy", desc: "Attribution, dashboards, cohort analysis and cross-functional data governance.", pills: ["Attribution", "Dashboards", "Forecasting"] },
          { title: "Finance & FinTech", desc: "P&L ownership, ROI analysis, and FinTech strategy applicable across functions.", pills: ["P&L Ownership", "ROI Analysis", "FinTech"] },
          { title: "Operations & Supply Chain", desc: "Cross-functional operations alignment, tech stack fluency, and operations transformation.", pills: ["Ops Alignment", "Tech Stack", "Transformation"] }
        ],
        extraCard: { title: "Built On Core Management", description: "Strategy · Finance · Economics · Operations · Consumer Behaviour · Brand Management" },
        coreTags: ["Strategic Management", "International Trade", "Financial Accounting", "Cross-Cultural Management", "Global Supply Chain", "Trade Finance", "AI for Global Business", "Trade Law & Compliance", "International Marketing", "Business Economics", "Logistics Management", "Foreign Exchange"]
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "LEAP" },
        header: { label: "The Differentiator", title: "An AI-Integrated", highlight: "Curriculum", para: "At Tulas Institute, AI isn't a single elective — it runs through AI Tools for Global Business across three semesters, on LEAP, an AI-native platform that personalises your path and tracks progress continuously." },
        tags: ["AI-Assisted Market Research", "Trade Data Analytics", "Predictive Demand Forecasting", "Generative AI for Trade Documentation", "Currency Risk Modelling", "Supply Chain Optimisation AI", "Compliance Automation", "Cross-Border Logistics AI", "Sentiment Analysis for Global Markets", "Global Trade Platforms"],
        roadmap: [
          { num: "01", title: "Foundations", desc: "Digital Literacy & AI Tools for Global Business – I, plus foundational cross-border strategy and international trade coursework." },
          { num: "02", title: "Applied AI", desc: "AI Tools for Global Business – II, Introduction to AI for Business, and the first live global market research project." },
          { num: "03", title: "Advanced AI", desc: "AI Tools for Global Business – III (Advanced) alongside Digital Transformation & International Business Models." },
          { num: "04", title: "Leadership & Simulation", desc: "Global Leadership Workshop & Cross-Border Simulation heading into the capstone." }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Certifications, Projects", highlight: "& Live Practice", para: "Globally recognised certifications and continuous industry exposure that make graduates job-ready for cross-border business leadership." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Association", name: "IIT Kanpur E&ICT Academy Certifications", desc: "Independent, competency-based Year 1 and Year 2 certificates covering the full MBA programme — adding national credibility to your international business skill set." },
          { isMain: false, badge: "World Trade Institute", name: "International Trade Fundamentals", desc: "Sem I" },
          { isMain: false, badge: "Coursera / IE Business School", name: "Global Strategy & Cross-Border Business", desc: "Sem II" },
          { isMain: false, badge: "DGFT / Export-Import Bodies", name: "Export-Import Documentation & Compliance", desc: "Sem III" },
          { isMain: false, badge: "Trade Compliance", name: "Trade Compliance & Customs Management", desc: "Sem III–IV" }
        ],
        handsOnItems: ["Global Market Research Project", "Live Market-Entry Project", "Industry Live Global Trade Project", "Case Competitions", "Cross-Border Simulation Workshop", "Global Leadership Capstone"]
      },
      {
        blockType: 'programDetails',
        badge: "MBA International Business · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [{ id: "usps", num: "01", label: "USPs" }],
        contents: [
          { tabId: "usps", type: "bullet", bulletItems: [
            "Job-ready by Semester II — a real global market research and market-entry project run in Year 1.",
            "Multiple career pathways built in — export-import operations, global trade consulting, or market-entry leadership.",
            "AI Tools for Global Business runs across three semesters, building working fluency with AI-driven trade insight and compliance tools.",
            "International Finance and Financial Accounting for International Business so every recommendation is backed by currency risk analysis and a defensible global P&L.",
            "A dedicated NEP 2020 Life Skills & Professional Wellness course addressing burnout in high-pressure global roles and civic responsibility for business leaders.",
            "AI-native learning through LEAP, a platform that personalises your path and tracks progress continuously.",
            "A certification stack — World Trade Institute, export-import bodies, trade compliance, and IIT Kanpur E&ICT Academy — prepared for within regular coursework.",
            "An Industry Live Global Trade Project in Semester III and a global leadership capstone in the final semester.",
            "Dedicated placement support across the final year of the programme."
          ]}
        ]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where Graduates", highlight: "Are Headed", para: "From export-import operations to global consulting, MBA International Business graduates step into cross-border leadership roles across the world's fastest-growing industries." },
        jobs: [
          { title: "International Business Manager", range: "₹9–20 LPA" },
          { title: "Export-Import Manager", range: "₹8–18 LPA" },
          { title: "Global Trade Analyst", range: "₹7–15 LPA" },
          { title: "Supply Chain Manager", range: "₹8–18 LPA" },
          { title: "Trade Compliance Officer", range: "₹7–16 LPA" },
          { title: "Global Market-Entry Consultant", range: "₹9–20 LPA" }
        ],
        stats: [
          { gradient: true, number: "₹20 LPA", label: "Indicative Top Salary" },
          { gradient: false, number: "3", label: "Career Pathways Built In" },
          { gradient: false, number: "9", label: "Industry Certifications" },
          { gradient: false, number: "2028", label: "First Graduating Batch" }
        ]
      },
      {
        blockType: 'whyStudy',
        header: { label: "Why Tulas Institute", title: "9 Reasons To Choose", highlight: "This Programme", para: "An MBA built for the next generation of international business leaders — with real projects, AI fluency, and a clear pathway to global career readiness." },
        items: [
          { n: "01", title: "AI-Integrated Learning", desc: "AI Tools for Global Business runs across three semesters on LEAP, our AI-native learning platform that personalises your path and tracks progress continuously." },
          { n: "02", title: "IIT Kanpur E&ICT Academy", desc: "Competency-based Year 1 and Year 2 certificates from a premier national institution — adding independent credibility to your international business degree." },
          { n: "03", title: "Industry-Aligned Certifications", desc: "World Trade Institute, export-import documentation, trade compliance, and global strategy certifications prepared for within regular coursework." },
          { n: "04", title: "Live Global Trade Projects", desc: "A real global market research project in Semester II plus an Industry Live Global Trade Project in Semester III — not simulations, but real deliverables." },
          { n: "05", title: "Global Leadership Capstone", desc: "Present a cross-border market-entry strategy to a panel of global trade leaders in the final semester." },
          { n: "06", title: "Multiple Career Pathways", desc: "Graduate placeable in export-import operations, global trade consulting, or market-entry leadership — three distinct career tracks built into the curriculum." },
          { n: "07", title: "Placement Readiness", desc: "Dedicated placement support across the final year — resume reviews, mock interviews, industry connects, and recruiter engagement." },
          { n: "08", title: "Life Skills & Professional Wellness", desc: "A dedicated NEP 2020 course covering burnout in high-pressure global roles, cross-cultural communication, and civic responsibility for business leaders." },
          { n: "09", title: "Cross-Border Fluency", desc: "Trade policy, currency risk, and global supply chain taught as connected pillars of international business — not siloed electives." }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF Bank", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk IT", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assistant", "Root Analysis", "Silverspace", "Step2gen", "The Times of India"]
      }
    ]
  },
  {
    title: "MBA in Agri Business",
    slug: "mba/agri-business",
    program: "MBA",
    school: "School of Management",
    sections: [
      // hero block OMITTED: the two banner images on this page use alt text leftover from an unrelated
      // Computer Science Engineering promo — not real Agri Business hero content, so not used.
      {
        blockType: 'overview',
        imageCard: { changeDesign: 0, title: "2Y", highlight: "NEP 2020 · OBE Framework" },
        header: { label: "School of Management", title: "Where Strategy", highlight: "Meets Agriculture" },
        description1: "The MBA in Agri-Business Management at Tulas Institute, Dehradun prepares managers to lead agricultural value chains and rural markets.",
        description2: "Students master the management core — strategy, marketing, finance, operations — alongside applied agricultural economics, agri supply chain management, and rural marketing. A live agri-market project runs across Semester II, an Industry Live Agri-Business Project in Semester III, and a rural leadership capstone in the final semester.",
        quote: "Job-ready by Semester II — graduates leave placeable across agribusiness corporates, agri supply chain operations, or rural development leadership roles.",
        table: { headers: [], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Domains You'll Study", title: "Two Majors, Three Minors", highlight: "One Agri-Business Core", para: "Every domain is built on a strong management foundation and enhanced through AI-integrated learning across all four semesters." },
        cards: [
          { title: "Agricultural Economics & Agribusiness Strategy", desc: "Agricultural economics, policy, and agribusiness strategy built on a live farm-to-market brief.", pills: ["Agri Economics", "Agri Policy", "Agribusiness Strategy"] },
          { title: "Agri Supply Chain & Rural Market Leadership", desc: "Agri supply chain management, rural marketing, and the leadership skills to run an agribusiness function.", pills: ["Agri Supply Chain", "Rural Marketing", "Leadership"] },
          { title: "Business Analytics & Data Strategy", desc: "Attribution, dashboards, cohort analysis and cross-functional data governance.", pills: ["Attribution", "Dashboards", "Forecasting"] },
          { title: "Finance & FinTech", desc: "P&L ownership, ROI analysis, and FinTech strategy applicable across functions.", pills: ["P&L Ownership", "ROI Analysis", "FinTech"] },
          { title: "Operations & Supply Chain", desc: "Cross-functional operations alignment, tech stack fluency, and operations transformation.", pills: ["Ops Alignment", "Tech Stack", "Transformation"] }
        ],
        extraCard: { title: "Built On Core Management", description: "Strategy · Finance · Economics · Operations · Consumer Behaviour · Brand Management" },
        coreTags: ["Strategic Management", "Agricultural Economics", "Financial Accounting", "Agri Supply Chain", "Rural Marketing", "Food Processing & Value Chains", "AI for Agriculture", "Farm Business Management", "Agri Finance", "Sustainable Agriculture", "Business Economics", "Precision Agriculture"]
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "LEAP" },
        header: { label: "The Differentiator", title: "An AI-Integrated", highlight: "Curriculum", para: "At Tulas Institute, AI isn't a single elective — it runs through AI Tools for Agri-Business across three semesters, on LEAP, an AI-native platform that personalises your path and tracks progress continuously." },
        tags: ["AI-Assisted Crop & Yield Forecasting", "Agri Market Analytics", "Predictive Demand Modelling", "Generative AI for Agri Reporting", "Precision Agriculture Tools", "Supply Chain Optimisation AI", "Weather & Risk Analytics", "Farm Data Platforms", "Sentiment Analysis for Commodity Markets", "Agri-Tech Platforms"],
        roadmap: [
          { num: "01", title: "Foundations", desc: "Digital Literacy & AI Tools for Agri-Business – I, plus foundational agricultural economics coursework." },
          { num: "02", title: "Applied AI", desc: "AI Tools for Agri-Business – II, Introduction to AI for Business, and the first live agri-market project." },
          { num: "03", title: "Advanced AI", desc: "AI Tools for Agri-Business – III (Advanced) alongside Digital Transformation & Business Models." },
          { num: "04", title: "Leadership & Simulation", desc: "Rural Leadership Workshop & Industry Simulation heading into the capstone." }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Certifications, Projects", highlight: "& Live Practice", para: "Globally recognised certifications and continuous industry exposure that make graduates job-ready." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Association", name: "IIT Kanpur E&ICT Academy Certifications", desc: "Independent, competency-based Year 1 and Year 2 certificates covering the full MBA programme — adding national credibility to your skill set." },
          { isMain: false, badge: "NABARD-Style Agri Finance", name: "Agri Finance Foundations", desc: "Sem I" },
          { isMain: false, badge: "ICAR-Aligned Coursework", name: "Agricultural Economics Essentials", desc: "Sem II" },
          { isMain: false, badge: "Coursera", name: "Agribusiness & Food Value Chain Specialisation", desc: "Sem III" },
          { isMain: false, badge: "Precision Agri-Tech Bodies", name: "Precision Agriculture Foundations", desc: "Sem III–IV" }
        ],
        handsOnItems: ["Farm-to-Market Research Project", "Live Agri-Market Project", "Industry Live Agri-Business Project", "Case Competitions", "Rural Market Simulation Workshop", "Rural Leadership Capstone"]
      },
      {
        blockType: 'programDetails',
        badge: "MBA Agri-Business · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [{ id: "usps", num: "01", label: "USPs" }],
        contents: [
          { tabId: "usps", type: "bullet", bulletItems: [
            "Job-ready by Semester II — a real farm-to-market research and agri-market project run in Year 1.",
            "Multiple career pathways built in — agribusiness corporates, agri supply chain operations, or rural development leadership roles.",
            "AI Tools for Agri-Business runs across three semesters, building working fluency with AI-driven yield forecasting and market analytics tools.",
            "Agri Finance and advanced Financial Accounting so every agribusiness decision is backed by data and defensible to leadership.",
            "A dedicated NEP 2020 Life Skills & Professional Wellness course addressing burnout in high-pressure agribusiness roles and civic responsibility for business leaders.",
            "AI-native learning through LEAP, a platform that personalises your path and tracks progress continuously.",
            "A certification stack — agri finance foundations, agricultural economics essentials, agribusiness value-chain coursework and IIT Kanpur E&ICT Academy — prepared for within regular coursework.",
            "An Industry Live Agri-Business Project in Semester III and a rural leadership capstone in the final semester.",
            "Dedicated placement support across the final year of the programme."
          ]}
        ]
      },
      {
        blockType: 'careers',
        header: { title: "Where This MBA", highlight: "Can Take You", para: "Multiple pathways, not one — agribusiness corporates, agri supply chain operations, or rural development leadership roles." },
        jobs: [
          { title: "Agribusiness Manager", range: "₹7–15 LPA" },
          { title: "Agri Supply Chain Manager", range: "₹7–16 LPA" },
          { title: "Agri Marketing Manager", range: "₹6–14 LPA" },
          { title: "Rural Development Manager", range: "₹6–13 LPA" },
          { title: "Agri Finance Analyst", range: "₹7–14 LPA" },
          { title: "Farm Operations Manager", range: "₹6–12 LPA" }
        ],
        stats: [
          { gradient: true, number: "₹16 LPA", label: "Highest Indicative Range" },
          { gradient: false, number: "3", label: "Career Pathways" },
          { gradient: false, number: "9", label: "Certifications Across 2 Years" },
          { gradient: false, number: "2028", label: "First Graduating Batch" }
        ]
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Study This MBA", highlight: "At Tulas Institute", para: "A programme engineered for the AI era — combining a strong management core, industry alignment, and applied agri-business practice." },
        items: [
          { n: "01", title: "AI-Integrated Learning", desc: "AI Tools for Agri-Business runs across three semesters on LEAP, an AI-native platform that personalises your path and tracks progress continuously." },
          { n: "02", title: "IIT Kanpur E&ICT Academy", desc: "Association bringing premier, competency-based certifications and academic credibility to your MBA degree." },
          { n: "03", title: "Industry-Aligned Certifications", desc: "Agri finance, agricultural economics, and agribusiness value-chain certifications aligned to what's being taught each semester." },
          { n: "04", title: "Live Agri-Market Projects", desc: "A real farm-to-market research project in Semester II and an Industry Live Agri-Business Project in Semester III — not case studies, real agri-markets." },
          { n: "05", title: "Rural Leadership Capstone", desc: "Present your final-semester agribusiness strategy work to a panel of practising agribusiness leaders from industry." },
          { n: "06", title: "Multiple Career Pathways", desc: "Agribusiness corporates, agri supply chain operations, or rural development leadership roles — built into the curriculum from Day 1." },
          { n: "07", title: "Placement Readiness", desc: "Dedicated placement support across the final year of the programme, with aptitude and case interview preparation." },
          { n: "08", title: "Life Skills & Professional Wellness", desc: "A dedicated NEP 2020 course covering burnout management, ethics, and professional workplace navigation for agribusiness roles." },
          { n: "09", title: "Farm-to-Market Fluency", desc: "Agricultural economics, agri finance, and rural marketing taught as one connected agribusiness core — giving graduates a full farm-to-consumer view." }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF Bank", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk IT", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assistant", "Root Analysis", "Silverspace", "Step2gen", "The Times of India"]
      }
    ]
  }
]

// ---------------------------------------------------------------------
// Batch 5: Btech Civil Engineering, Btech Mechanical, Btech EEE, LLB, BA LLB
// ---------------------------------------------------------------------
const batch5 = [
  {
    title: "B.Tech Civil Engineering",
    slug: "btech/civil-engineering",
    program: "B.Tech",
    school: "School of Engineering & Technology",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "Civil Engineering (CE)" },
        title: "Civil Engineering (CE)",
        description: "Best Civil Engineering University in North India",
        chips: [],
        buttons: []
      },
      {
        blockType: 'overview',
        description1: "The Department of Civil Engineering at Tulas University is dedicated to shaping future engineers who can design, build, and sustain the infrastructure of tomorrow. Established in 2011, the department offers a comprehensive B.Tech in Civil Engineering program, providing students with in-depth knowledge of construction, structural analysis, geotechnical engineering, environmental engineering, and transportation systems.\n\nCivil engineers play a vital role in improving modern society by designing roads, bridges, tunnels, skyscrapers, and sustainable water systems. The curriculum at Tulas University integrates theoretical knowledge with hands-on practical learning through advanced laboratories, industrial visits, live projects, and expert mentorship.\n\nWith a strong emphasis on sustainability and innovation, students are trained to adopt eco-friendly construction techniques and smart city solutions. The department fosters an interdisciplinary learning approach, enabling students to develop problem-solving skills and technical expertise required for a successful career in civil engineering.\n\nGraduates from the B.Tech Civil Engineering program at Tulas University have opportunities in government sectors, private construction firms, urban planning agencies, and international infrastructure projects. The program also lays a strong foundation for those aiming to pursue higher studies or research in civil engineering disciplines.",
        description2: "Departmental Vision: To be a leading centre for developing exceptional civil engineers who can create sustainable and resilient infrastructure through innovative design, research, and ethical practices.\n\nDepartmental Mission:\n- To equip aspiring civil engineers with a robust understanding of fundamental principles and cutting-edge technologies, empowering them to create, construct, and uphold sustainable infrastructure.\n- To cultivate an environment of innovation and rigorous research, where civil engineers tackle real-world infrastructure challenges while championing environmental sustainability.\n- To empower students with effective communication, collaboration, and leadership skills, enabling them to excel in a diverse and globalized engineering profession.\n- To promote ethical conduct and social responsibility, inspiring graduates to contribute to the betterment of society through their work.\n- To provide students with an environment conducive to lifelong learning and success in industry, research, higher education, and entrepreneurship, especially in socio-culturally diverse societies worldwide.",
        quote: "Build the foundations of tomorrow with Tulas University B.Tech in Civil Engineering. Empowering future engineers with the skills to design, innovate, and create a sustainable world.",
        table: {
          headers: ["S.NO", "COURSE", "DURATION", "ELIGIBILITY"],
          rows: [
            { program: "B.Tech", duration: "4 years", eligibility: "Passed 10+2 examination with Physics and Mathematics as compulsory subjects along with one of the Chemistry/ Biotechnology/ Biology/ Technical Vocational subject/ Computer Science/ Information Technology/ Informatics Practices/Agriculture/ Engineering Graphics/ Business Studies. Obtained at least 45% marks (40% marks in case of candidates belonging to reserved category) in the above subjects taken together. OR Passed Diploma (in Engineering and Technology) examination with at least 45% marks (40% marks in case of candidates belonging to reserved category) subject to vacancies in the First Year, in case the vacancies at lateral entry are exhausted." },
            { program: "B.Tech (Lateral Entry/Second Year)", duration: "3 years", eligibility: "a. Passed Diploma examination with at least 45% marks (40% marks in case of candidates belonging to reserved category) in ANY branch of Engineering and Technology. b. Passed B.Sc. Degree from a recognized University as defined by UGC, with at least 45% marks (40% marks in case of candidates belonging to reserved category) and passed 10+2 examination with Mathematics as a subject. c. Provided that the students belonging to B.Sc. Stream, shall clear the subjects Engineering Graphics/ Engineering Drawing and Engineering Mechanics of the First Year Engineering Programme along with the Second year subjects. d. Provided that the students belonging to B.Sc. Stream shall be considered only after filling the supernumerary seats in this category with students belonging to the Diploma stream. e. Passed D.Voc. Stream in the same or allied sector. f. In the above cases, a suitable bridge Courses, if required such as in Mathematics may be conducted." }
          ]
        }
      },
      {
        blockType: 'recruiters',
        title: "TOP RECRUITERS",
        subtitle: "World's Leading Brands Hire Our Talented Students",
        logos1: ["Amazon", "Microsoft", "HCL", "LG", "Wipro", "Vivo", "JBM", "Tata"],
        logos2: ["Samsung", "ITC", "Oracle", "Cummins", "AON", "Honda", "Hexaware", "AIS"]
      }
    ]
  },
  {
    title: "B.Tech Mechanical Engineering",
    slug: "btech/mechanical-engineering",
    program: "B.Tech",
    school: "School of Engineering & Technology",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "Department of Mechanical Engineering (ME)" },
        title: "Department of Mechanical Engineering (ME)",
        description: "Best Mechanical Engineering Institute in North India",
        chips: [],
        buttons: []
      },
      {
        blockType: 'overview',
        description1: "The Department of Mechanical Engineering at Tulas University, established in 2006, is one of the oldest and most prestigious departments, dedicated to academic excellence and research-driven innovation. Offering Diploma, Undergraduate (B.Tech), and Postgraduate (M.Tech) programs, the department focuses on developing technical expertise, analytical thinking, and problem-solving abilities to prepare students for global engineering challenges.\n\nThe curriculum is designed to provide a strong foundation in mechanical design, manufacturing, thermodynamics, robotics, and energy engineering. The department offers specializations in Robotics and Energy Engineering, equipping students with cutting-edge knowledge in automation, sustainable energy, and advanced engineering systems. With state-of-the-art laboratories, industry collaborations, and hands-on training, students gain practical experience in real-world applications.\n\nMechanical Engineering at Tulas University opens diverse career opportunities in design, development, quality control, manufacturing, installation, and operations. The program ensures that graduates are industry-ready, with skills that align with the demands of modern engineering industries, including automotive, aerospace, renewable energy, and robotics.",
        description2: "Departmental Vision: To become centre of excellence for producing graduates of manufacturing, production & design competence to face the challenges of global market, creating innovation & effective interface with various organizations.\n\nDepartmental Mission:\n- To provide strong fundamentals and technical skills in Mechanical Engineering through effective teaching-learning methodologies.\n- To nurture students to excel professionally and personally to serve the society.\n- To maintain a collegial, supportive, and diverse environment that encourages students, faculty, and staff to achieve the best innovation & research.\n- To promote inter-disciplinary research.\n- To develop soft skills to excel in higher studies and placements.",
        quote: "Innovate, design, and build the future with Mechanical Engineering at Tulas University.",
        table: {
          headers: ["S.NO", "COURSE", "DURATION", "ELIGIBILITY"],
          rows: [
            { program: "B.Tech", duration: "4 years", eligibility: "Passed 10+2 examination with Physics and Mathematics as compulsory subjects along with one of the Chemistry/ Biotechnology/ Biology/ Technical Vocational subject/ Computer Science/ Information Technology/ Informatics Practices/Agriculture/ Engineering Graphics/ Business Studies. Obtained at least 45% marks (40% marks in case of candidates belonging to reserved category) in the above subjects taken together. OR Passed Diploma (in Engineering and Technology) examination with at least 45% marks (40% marks in case of candidates belonging to reserved category) subject to vacancies in the First Year, in case the vacancies at lateral entry are exhausted." },
            { program: "B.Tech (Lateral Entry/Second Year)", duration: "3 years", eligibility: "a. Passed Diploma examination with at least 45% marks (40% marks in case of candidates belonging to reserved category) in ANY branch of Engineering and Technology. b. Passed B.Sc. Degree from a recognized University as defined by UGC, with at least 45% marks (40% marks in case of candidates belonging to reserved category) and passed 10+2 examination with Mathematics as a subject. c. Provided that the students belonging to B.Sc. Stream, shall clear the subjects Engineering Graphics/ Engineering Drawing and Engineering Mechanics of the First Year Engineering Programme along with the Second year subjects. d. Provided that the students belonging to B.Sc. Stream shall be considered only after filling the supernumerary seats in this category with students belonging to the Diploma stream. e. Passed D.Voc. Stream in the same or allied sector. f. In the above cases, a suitable bridge Courses, if required such as in Mathematics may be conducted." }
          ]
        }
      },
      {
        blockType: 'recruiters',
        title: "TOP RECRUITERS",
        subtitle: "World's Leading Brands Hire Our Talented Students",
        logos1: ["Amazon", "Microsoft", "HCL", "LG", "Wipro", "Vivo", "JBM", "Tata"],
        logos2: ["Samsung", "ITC", "Oracle", "Cummins", "AON", "Honda", "Hexaware", "AIS"]
      }
    ]
  },
  {
    title: "B.Tech Electrical & Electronics Engineering",
    slug: "btech/electrical-and-electronics-engineering",
    program: "B.Tech",
    school: "School of Engineering & Technology",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "Department of Electrical & Electronics Engineering (EEE)" },
        title: "Department of Electrical & Electronics Engineering (EEE)",
        description: "Best Electrical & Electronics Engineering Institute in North India",
        chips: [],
        buttons: []
      },
      {
        blockType: 'overview',
        description1: "The Department of Electrical & Electronics Engineering (EEE) at Tulas University, established in 2006, is committed to academic excellence, research, and innovation. With a vision to become a leading center of excellence, the department focuses on cutting-edge technologies and industry-driven learning to create highly skilled and employable engineers in the fields of Power Systems, Power Electronics, Automation, VLSI, Control Systems, Electric Vehicles, Efficient Machines, Renewable Energy, Smart Grids, and IoT networks.\n\nThe EEE program emphasizes sustainability and energy efficiency, equipping students with the knowledge and skills to contribute to a clean and green energy future. With state-of-the-art laboratories, research facilities, and industry collaborations, students gain hands-on experience in modern electrical systems, automation technologies, and emerging energy solutions. The department is dedicated to developing responsible engineers who can address global energy challenges, drive innovation, and contribute to national and international development.\n\nThrough practical exposure, industry training, and research-driven education, graduates from the Department of Electrical & Electronics Engineering at Tulas University are well-prepared for careers in power generation, renewable energy, industrial automation, smart grids, and electric mobility.",
        description2: "Departmental Vision: To be recognized as a center of excellence in producing competent power, network, testing, production, quality control engineers capable of fostering innovation for societal advancement.\n\nDepartmental Mission:\n- To provide quality education to students in electrical engineering, as well as interdisciplinary areas, using a set curriculum and modern methodologies.\n- To promote the entrepreneurial mind-set among students and faculty by supporting initiatives to incubate innovative ideas, develop prototypes, and establish start-ups in the field of electrical to meet industry demands.\n- To provide educators and students with sufficient resources to foster interdisciplinary and collaborative aspect to drive research & innovation and address global challenges.\n- To impart the solutions in the field of sustainable system development in green energy for social needs.\n- To foster experiential learning opportunities, internships, and projects, ensuring students gain real-world insights and skills.",
        quote: "Power the future with innovation, sustainability, and technology at Tulas University B.Tech in Electrical & Electronics Engineering.",
        table: {
          headers: ["S.NO", "COURSE", "DURATION", "ELIGIBILITY"],
          rows: [
            { program: "B.Tech", duration: "4 years", eligibility: "Passed 10+2 examination with Physics and Mathematics as compulsory subjects along with one of the Chemistry/ Biotechnology/ Biology/ Technical Vocational subject/ Computer Science/ Information Technology/ Informatics Practices/Agriculture/ Engineering Graphics/ Business Studies. Obtained at least 45% marks (40% marks in case of candidates belonging to reserved category) in the above subjects taken together. OR Passed Diploma (in Engineering and Technology) examination with at least 45% marks (40% marks in case of candidates belonging to reserved category) subject to vacancies in the First Year, in case the vacancies at lateral entry are exhausted." },
            { program: "B.Tech (Lateral Entry/Second Year)", duration: "3 years", eligibility: "a. Passed Diploma examination with at least 45% marks (40% marks in case of candidates belonging to reserved category) in ANY branch of Engineering and Technology. b. Passed B.Sc. Degree from a recognized University as defined by UGC, with at least 45% marks (40% marks in case of candidates belonging to reserved category) and passed 10+2 examination with Mathematics as a subject. c. Provided that the students belonging to B.Sc. Stream, shall clear the subjects Engineering Graphics/ Engineering Drawing and Engineering Mechanics of the First Year Engineering Programme along with the Second year subjects. d. Provided that the students belonging to B.Sc. Stream shall be considered only after filling the supernumerary seats in this category with students belonging to the Diploma stream. e. Passed D.Voc. Stream in the same or allied sector. f. In the above cases, a suitable bridge Courses, if required such as in Mathematics may be conducted." }
          ]
        }
      },
      {
        blockType: 'recruiters',
        title: "TOP RECRUITERS",
        subtitle: "World's Leading Brands Hire Our Talented Students",
        logos1: ["Amazon", "Microsoft", "HCL", "LG", "Wipro", "Vivo", "JBM", "Tata"],
        logos2: ["Samsung", "ITC", "Oracle", "Cummins", "AON", "Honda", "Hexaware", "AIS"]
      }
    ]
  },
  {
    title: "LLB",
    slug: "llb",
    program: "LLB",
    school: "School of Law",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "School of Law (LLB)" },
        title: "School of Law (LLB)",
        description: "Excellence in Legal Education and Practice",
        chips: [],
        buttons: []
      },
      {
        blockType: 'overview',
        description1: "The School of Law at Tulas Institute offers integrated law programs designed to build a strong foundation in legal principles while developing analytical rigour, professional ethics, and a nuanced understanding of constitutional, corporate, and regulatory frameworks. The programs are structured to move beyond theoretical instruction, combining academic depth with practice-oriented learning to prepare students for the evolving demands of the legal profession.\n\nThe curriculum is aligned with contemporary legal and industry requirements, integrating core areas such as constitutional law, criminal law, contract law, corporate law, and emerging domains alongside interdisciplinary inputs from social sciences and business studies. Through a focus on case law analysis, statutory interpretation, legal drafting, and research methodologies, students develop the ability to critically evaluate complex legal issues and apply structured legal reasoning.\n\nThe pedagogy emphasises experiential learning through moot court exercises, simulated trials, legal research projects, and clinical legal education. Students gain practical exposure through internships with law firms, corporate legal departments, courts, and regulatory bodies, enabling them to understand litigation processes, compliance frameworks, dispute resolution mechanisms, and corporate governance practices.\n\nComplemented by legal aid initiatives, workshops, and industry interactions, the program fosters professional competence, advocacy skills, and ethical responsibility. This comprehensive approach ensures that graduates are equipped not only with legal knowledge, but with the strategic, analytical, and professional capabilities required to succeed across litigation, corporate law, policy, and allied legal domains.",
        description2: "Departmental Vision: To be a centre of excellence in legal education that nurtures competent professionals with strong ethical values, a sense of justice, and the ability to contribute meaningfully to society and the legal profession.\n\nDepartmental Mission:\n- To provide high-quality legal education aligned with industry and societal needs\n- To promote experiential learning through practical exposure and research\n- To develop ethical, responsible, and professionally competent individuals\n- To foster critical thinking, advocacy, and leadership skills\n- To prepare students for diverse career opportunities in the legal domain",
        quote: "",
        table: {
          headers: ["S.NO", "COURSE", "DURATION", "ELIGIBILITY"],
          rows: [
            { program: "BA LL.B (Hons.)", duration: "5 years", eligibility: "10+2 or equivalent from a recognised board with minimum 50% marks (45% for reserved categories), as per BCI norms" },
            { program: "BBA LL.B (Hons.)", duration: "5 years", eligibility: "10+2 or equivalent from a recognised board with minimum 50% marks (45% for reserved categories), as per BCI norms" },
            { program: "LL.B", duration: "3 years", eligibility: "Graduation in any discipline with minimum 50% marks (45% for reserved categories), as per BCI norms" }
          ]
        }
      },
      {
        blockType: 'recruiters',
        title: "TOP RECRUITERS",
        subtitle: "World's Leading Brands Hire Our Talented Students",
        logos1: ["Amazon", "Microsoft", "HCL", "LG", "Wipro", "Vivo", "JBM", "Tata"],
        logos2: ["Samsung", "ITC", "Oracle", "Cummins", "AON", "Honda", "Hexaware", "AIS"]
      }
    ]
  },
  {
    title: "BA LLB",
    slug: "ba-llb",
    program: "BA LLB",
    school: "School of Law",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "BA LL.B." },
        badge: "BA LL.B. · 5 Years · BCI Approved",
        title: "Where Law Meets",
        highlight: "Society & Governance",
        description: "An integrated programme that combines humanities with legal education — the BA LL.B. at Tulas School of Law develops strong analytical, advocacy, and public policy skills for careers spanning litigation, judiciary, civil services, and academia.",
        chips: [
          { strong: "5 Years", label: "Programme" },
          { strong: "", label: "BCI Approved Programme" },
          { strong: "", label: "Moot Court Training" },
          { strong: "", label: "Internship Opportunities" },
          { strong: "", label: "Practice-Ready Curriculum" }
        ],
        buttons: [
          { variant: "orange", icon: null, label: "Apply Now" },
          { variant: "white_outline", icon: null, label: "Contact Admissions" }
        ]
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 1, title: "BCI Approved", highlight: "Programme" },
        header: { label: "Tulas School of Law", title: "Where Society", highlight: "Meets Law" },
        description1: "The BA LL.B. at Tulas School of Law combines humanities with legal education to develop strong analytical, advocacy, and public policy skills.",
        description2: "Law is inseparable from society — understanding governance, human rights, political structures, and social justice is as essential as knowing legal statutes. The BA LL.B. programme at Tulas School of Law integrates political science, public policy, and humanities with rigorous legal training to develop graduates who are ready to serve in courts, civil services, academia, and public institutions. Through moot courts, legal aid clinics, policy research, and internships, students graduate as confident, practice-ready advocates.",
        quote: "A legal education should prepare you for the courtroom — not just the classroom.",
        table: { headers: [], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Core Learning Areas", title: "Six Domains, One", highlight: "Integrated Foundation", para: "Every area is built on strong legal fundamentals and reinforced through moot courts, policy research, and internships." },
        cards: [
          { title: "Constitutional & Public Law", desc: "Constitutional law, administrative law, and public governance frameworks.", pills: ["Constitutional Law", "Public Law"] },
          { title: "Political Science & Governance", desc: "Political systems, governance structures, and public administration.", pills: ["Political Systems", "Governance"] },
          { title: "Human Rights & International Law", desc: "Human rights law, international treaties, and global legal frameworks.", pills: ["Human Rights", "International Law"] },
          { title: "Criminal & Civil Law", desc: "Criminal procedure, civil law, and law of torts applied in practice.", pills: ["Criminal Law", "Civil Law"] },
          { title: "Environmental & Labour Law", desc: "Environmental regulations, labour rights, and social justice legislation.", pills: ["Environmental Law", "Labour Law"] },
          { title: "ADR & Legal Research", desc: "Mediation, arbitration, and research methodology for legal practice.", pills: ["Legal Research", "ADR"] }
        ],
        extraCard: { title: "Built On Core Legal Education", description: "Constitutional Law · Political Science · Public Policy · Administrative Law · Human Rights · Legal Research" },
        coreTags: ["Critical Thinking", "Legal Reasoning", "Public Policy Analysis", "Legal Drafting", "Legal Research", "Governance Analysis", "Public Speaking", "Case Analysis", "Constitutional Interpretation", "Professional Ethics", "Analytical Thinking", "Decision Making"]
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "" },
        header: { label: "The Differentiator", title: "Experiential", highlight: "Legal Learning", para: "Learning law is about applying knowledge in real situations. At Tulas, students move from foundational legal principles to courtroom-ready advocacy — through moot court competitions, mock trials, legal aid clinics, policy research projects, and real client counselling exercises." },
        tags: ["Moot Court Competitions", "Mock Trials", "Court Visits", "Legal Aid Clinics", "Policy Research Projects", "Mediation Exercises", "Arbitration Simulations", "Drafting Workshops", "Case Law Analysis", "Legal Writing"],
        roadmap: [
          { num: "01", title: "Foundations", desc: "Foundational courses in political science, constitutional law, and legal research basics." },
          { num: "02", title: "Application", desc: "Public law, human rights, governance, and policy research applied through drafting and analysis exercises." },
          { num: "03", title: "Practice", desc: "Moot court competitions, legal aid clinics, and internships with law firms, courts, and policy bodies." },
          { num: "04", title: "Readiness", desc: "Advanced constitutional law, international law, ADR training, and a final internship building professional readiness." }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Skill", highlight: "Development", para: "Beyond the degree — practical legal skill-building and continuous real-world exposure that make graduates practice-ready for courts, civil services, and public institutions." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Recognition", name: "Bar Council of India (BCI) Approved", desc: "A BCI-approved curriculum ensures the degree meets the professional standards required to practise law in India." },
          { isMain: false, badge: "", name: "Legal Research Tools", desc: "Training on Manupatra / SCC Online-style legal databases" },
          { isMain: false, badge: "", name: "ADR & Mediation", desc: "Mediation, negotiation & arbitration skill-building" },
          { isMain: false, badge: "", name: "Moot Court Certification", desc: "Certified participation in moot court competitions" },
          { isMain: false, badge: "", name: "Legal Drafting Workshops", desc: "Petitions, legal opinions & documentation practice" }
        ],
        handsOnItems: ["Moot Court Competitions", "Mock Trials & Court Visits", "Legal Aid Clinics", "Policy Research Projects", "Mediation & Arbitration Exercises", "Internship Programmes"]
      },
      {
        blockType: 'programDetails',
        badge: "BA LL.B. · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [{ id: 'usps', num: '01', label: 'USPs' }],
        contents: [
          { tabId: 'usps', type: 'bullet', bulletItems: [
            "BCI Approved Programme.",
            "Integrated Humanities & Law Curriculum.",
            "Moot Court Training.",
            "Legal Research & Policy Studies.",
            "Courtroom Simulations.",
            "Internship Opportunities.",
            "Sessions by Legal Experts.",
            "Career Pathways in Law & Civil Services."
          ] }
        ]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where This Degree", highlight: "Can Take You", para: "From advocacy to civil services — a BA LL.B. opens careers across courts, government, policy, academia, and human rights organisations." },
        jobs: [
          { title: "Advocate", range: "₹3–8 LPA" },
          { title: "Policy Analyst", range: "₹4–9 LPA" },
          { title: "Civil Services Aspirant", range: "Govt. Grade" },
          { title: "Human Rights Advocate", range: "₹3–8 LPA" },
          { title: "NGO Legal Officer", range: "₹3–7 LPA" },
          { title: "Academician / Researcher", range: "₹4–8 LPA" }
        ],
        stats: [
          { gradient: false, number: "100%", label: "Placement Assistance" },
          { gradient: false, number: "750+", label: "Recruiters" },
          { gradient: false, number: "BCI", label: "Approved Programme" },
          { gradient: false, number: "20+", label: "Core Legal Domains Covered" }
        ]
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Study BA LL.B.", highlight: "At Tulas", para: "A legal education engineered for the courtroom and the public service — practice-oriented, ethics-driven, and career-focused for India's courts, civil services, and public institutions." },
        items: [
          { n: "01", title: "BCI Approved Programme", desc: "A Bar Council of India approved integrated curriculum meeting national professional standards for legal education and practice." },
          { n: "02", title: "Integrated Humanities & Law", desc: "A unique combination of humanities, political science, and legal education preparing graduates for multidisciplinary public and legal roles." },
          { n: "03", title: "Constitutional & Public Law Focus", desc: "Specialised training in constitutional law, administrative law, public governance, and human rights for modern public service careers." },
          { n: "04", title: "Moot Court Training", desc: "Regular moot court competitions and legal aid clinics build real advocacy, argumentation, and courtroom presentation skills." },
          { n: "05", title: "Internship Opportunities", desc: "Hands-on legal exposure through internships with law firms, courts, civil services bodies, NGOs, and legal aid organisations." },
          { n: "06", title: "Sessions By Legal Experts", desc: "Guest sessions from practising advocates, judges, civil servants, and policy experts across key legal and governance sectors." },
          { n: "07", title: "Legal Research & Policy Studies", desc: "Dedicated training in legal research methodology, policy writing, and constitutional analysis for academic and advocacy careers." },
          { n: "08", title: "Civil Services Preparation", desc: "A curriculum grounded in public law, governance, and political science — providing a strong academic foundation for UPSC and state civil services." },
          { n: "09", title: "Practice-Oriented Curriculum", desc: "A career-focused curriculum designed for courtroom, public service, and policy roles — building practical competence from the first year." }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF Bank", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk IT", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assistant", "Root Analysis", "Silverspace", "Step2gen", "The Times of India"]
      }
    ]
  }
]

// ---------------------------------------------------------------------
// Batch 6: BBA LLB, MCA Fullstack Development, MCA (generic), BSc Agriculture, MSc Agronomy
// ---------------------------------------------------------------------
const batch6 = [
  {
    title: "BBA LL.B.",
    slug: "bba-llb",
    program: "BBA LLB",
    school: "School of Law",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "Home / Programs / School of Law / BBA LL.B." },
        badge: "BBA LL.B. · 5 Years · BCI Approved",
        title: "Where Business Meets",
        highlight: "Corporate Law",
        description: "A multidisciplinary programme combining business administration with legal education — the BBA LL.B. at Tulas School of Law prepares students for corporate law, compliance, taxation, and commercial legal practice.",
        chips: [
          { strong: "5 Years", label: "Programme" },
          { strong: "BCI", label: "Approved Programme" },
          { strong: "Moot Court", label: "Training" },
          { strong: "Internship", label: "Opportunities" },
          { strong: "Practice-Ready", label: "Curriculum" }
        ],
        buttons: [
          { variant: "orange", icon: null, label: "Apply Now" },
          { variant: "white_outline", icon: null, label: "Contact Admissions" }
        ]
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 1, title: "BCI", highlight: "Approved Programme" },
        header: { label: "Tulas School of Law", title: "Where Business", highlight: "Meets Legal Practice" },
        description1: "The BBA LL.B. at Tulas School of Law combines business management with legal education to address modern corporate legal challenges.",
        description2: "Law is more than understanding statutes and legal principles — it is about interpreting complex situations, solving real-world legal challenges, and advocating for justice with integrity. At Tulas School of Law, students gain a comprehensive understanding of the legal system while developing analytical thinking, legal reasoning, and professional ethics. Through moot courts, legal research, drafting exercises, internships, and industry interactions, students graduate as confident, practice-ready professionals.",
        quote: "A legal education should prepare you for the courtroom — not just the classroom.",
        table: { headers: [], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Core Learning Areas", title: "Six Domains, One", highlight: "Business-Law Foundation", para: "Every area is built on strong legal fundamentals and reinforced through moot courts, drafting exercises, and internships." },
        cards: [
          { title: "Corporate & Company Law", desc: "Corporate governance, company law, and regulatory compliance.", pills: ["Corporate Law", "Company Law"] },
          { title: "Business & Commercial Law", desc: "Commercial regulations and business law fundamentals.", pills: ["Business Law", "Commercial Regulations"] },
          { title: "Taxation & Compliance", desc: "Taxation, mergers, acquisitions, and corporate governance.", pills: ["Taxation", "Compliance"] },
          { title: "IPR & Cyber Law", desc: "Intellectual property rights and cyber law for business.", pills: ["IPR", "Cyber Law"] },
          { title: "Contract Law & Drafting", desc: "Commercial contract drafting and legal due diligence.", pills: ["Contract Law", "Legal Drafting"] },
          { title: "ADR & Negotiation", desc: "Negotiation and alternative dispute resolution for business.", pills: ["Negotiation", "ADR"] }
        ],
        extraCard: { title: "Built On Core Legal Education", description: "Business Management · Corporate Law · Company Law · Taxation · Contract Drafting · Compliance" },
        coreTags: []
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "Moot Courts & Legal Clinics" },
        header: { label: "The Differentiator", title: "Experiential", highlight: "Legal Learning", para: "Learning law is about applying knowledge in real situations. At Tulas, students move from foundational legal principles to courtroom-ready advocacy — through moot court competitions, mock trials, legal aid clinics, and real client counselling exercises." },
        tags: ["Moot Court Competitions", "Mock Trials", "Corporate Legal Clinics", "Contract Drafting Workshops", "Negotiation Simulations", "Arbitration Simulations", "Due Diligence Exercises", "Case Law Analysis", "Legal Writing", "Business Law Projects"],
        roadmap: [
          { num: "01", title: "Foundations", desc: "Foundational courses in business management, constitutional law, and legal research basics." },
          { num: "02", title: "Application", desc: "Company law, contract law, and commercial regulations applied through drafting and compliance exercises." },
          { num: "03", title: "Practice", desc: "Moot court competitions, corporate legal clinics, and internships with law firms and corporate legal departments." },
          { num: "04", title: "Readiness", desc: "Advanced corporate law, taxation, ADR training, and a final internship building professional readiness." }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Skill", highlight: "Development", para: "Beyond the degree — practical legal skill-building and continuous industry exposure that make graduates practice-ready." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Recognition", name: "Bar Council of India (BCI) Approved", desc: "A BCI-approved curriculum ensures the degree meets the professional standards required to practise law in India." },
          { isMain: false, badge: "", name: "Legal Research Tools", desc: "Training on Manupatra / SCC Online-style legal databases" },
          { isMain: false, badge: "", name: "ADR & Mediation", desc: "Mediation, negotiation & arbitration skill-building" },
          { isMain: false, badge: "", name: "Moot Court Certification", desc: "Certified participation in moot court competitions" },
          { isMain: false, badge: "", name: "Legal Drafting Workshops", desc: "Contracts, petitions & legal documentation practice" }
        ],
        handsOnItems: ["Moot Court Competitions", "Mock Trials", "Court Visits & Legal Aid Clinics", "Client Counselling & Mediation Exercises", "Drafting Workshops & Case Law Analysis", "Internship Programmes"]
      },
      {
        blockType: 'programDetails',
        badge: "BBA LL.B. · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [{ id: "usps", num: "01", label: "USPs" }],
        contents: [
          { tabId: "usps", type: 'bullet', bulletItems: [
            "BCI Approved Programme.",
            "Business + Law Integrated Curriculum.",
            "Corporate Law & Compliance Focus.",
            "Moot Court Training.",
            "Legal Research & Drafting.",
            "Internship Opportunities.",
            "Industry Expert Sessions.",
            "Career Pathways in Corporate Law & Business Advisory."
          ] }
        ]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where This Degree", highlight: "Can Take You", para: "From compliance to corporate law — a BBA LL.B. opens careers across business, law firms, and consultancy." },
        jobs: [
          { title: "Corporate Lawyer", range: "₹5–12 LPA" },
          { title: "Compliance Officer", range: "₹4–10 LPA" },
          { title: "Legal Advisor", range: "₹4–10 LPA" },
          { title: "Legal Consultant", range: "₹4–10 LPA" },
          { title: "Arbitration Specialist", range: "₹5–10 LPA" },
          { title: "Legal Researcher", range: "₹3–7 LPA" }
        ],
        stats: [
          { gradient: true, number: "100%", label: "Placement Assistance" },
          { gradient: false, number: "750+", label: "Recruiters" },
          { gradient: false, number: "BCI", label: "Approved Programme" },
          { gradient: false, number: "20+", label: "Core Legal Domains Covered" }
        ]
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Study BBA LL.B.", highlight: "At Tulas", para: "A legal education engineered for the courtroom and the boardroom — practice-oriented, ethics-driven, and career-focused for India's corporate legal sector." },
        items: [
          { n: "01", title: "BCI Approved Programme", desc: "A Bar Council of India approved integrated curriculum meeting national professional standards for legal education and practice." },
          { n: "02", title: "Business + Law Integration", desc: "A unique combination of business management and legal education preparing graduates for multidisciplinary corporate roles." },
          { n: "03", title: "Corporate Law Focus", desc: "Specialised training in corporate law, compliance, taxation, and commercial legal practice for the modern business environment." },
          { n: "04", title: "Moot Court Training", desc: "Regular moot court competitions and corporate legal clinics build real advocacy, negotiation, and drafting skills." },
          { n: "05", title: "Internship Opportunities", desc: "Hands-on corporate legal exposure through internships with law firms, corporate legal departments, and regulatory bodies." },
          { n: "06", title: "Sessions By Industry Experts", desc: "Guest sessions from practising corporate lawyers, compliance officers, and business advisors across key sectors." },
          { n: "07", title: "Legal Research & Drafting", desc: "Dedicated training in contract drafting, legal research methodology, and compliance documentation for professional practice." },
          { n: "08", title: "Industry Exposure", desc: "Continuous interaction with corporate legal departments and business organisations throughout the 5-year integrated programme." },
          { n: "09", title: "Practice-Oriented Curriculum", desc: "A career-focused curriculum designed for corporate legal roles — building practical competence from the first year." }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF BANK", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk it", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assitant", "Root Analysis", "Silverspace", "Step2gen", "The times of india"]
      }
    ]
  },
  {
    title: "MCA in Full Stack Development",
    slug: "mca/fullstack-development",
    program: "MCA",
    school: "School of Computer Applications",
    sections: [
      {
        blockType: 'overview',
        imageCard: { changeDesign: 1, title: "PG", highlight: "Advanced Computing Curriculum" },
        header: { label: "School of Computer Applications", title: "Where Code", highlight: "Meets Architecture" },
        description1: "The MCA in Full Stack Development builds an advanced computing foundation, with a strong focus on software development, system design, data management, and emerging technologies.",
        description2: "Students move from core computing fundamentals — operating systems, data structures, database management, and networks — into applied full stack specialisation across five elective tracks covering frontend, backend, cloud, and AI-integrated development. Industry-integrated learning through live projects, hackathons, and industry-sponsored capstone projects builds graduates who are ready to architect and ship enterprise-grade software.",
        quote: "A future-ready graduate profile that combines advanced technical expertise, industry exposure, research aptitude, innovation capabilities, and lifelong learning skills to address evolving global technology challenges.",
        table: { headers: [], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Domains You'll Study", title: "Six Domains Across", highlight: "The Full Stack", para: "Every domain builds on a strong computing core, with five program-elective slots offering real specialisation choice each semester." },
        cards: [
          { title: "Full Stack Architecture", desc: "Advanced full stack architecture and enterprise-grade system design.", pills: ["System Design", "Enterprise Apps"] },
          { title: "Cloud-Native Development", desc: "Cloud computing platforms, deployment, and cloud-native application design.", pills: ["Cloud Computing", "Deployment"] },
          { title: "Backend Engineering", desc: "Node.js & Express, PHP/Laravel, and advanced database systems.", pills: ["Node.js", "Laravel", "Advanced DB"] },
          { title: "DevOps & Containerization", desc: "Version control, automation, and DevOps practices for full stack teams.", pills: ["Git/GitHub", "Automation"] },
          { title: "Cyber Security for Web Apps", desc: "Web application security and ethical hacking for developers.", pills: ["Web Security", "Ethical Hacking"] },
          { title: "AI-Integrated Full Stack Development", desc: "Integrating AI capabilities directly into full stack applications.", pills: ["AI Integration", "Intelligent Apps"] }
        ],
        extraCard: { title: "Built On Core Computing", description: "Operating Systems & Shell Programming · OOP with Java · Python Programming · Database Management · Computer Networks · Software Engineering" },
        coreTags: []
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "Full Stack → Cloud-Native → Enterprise" },
        header: { label: "The Differentiator", title: "Industry-Integrated", highlight: "Learning", para: "The programme is built around live projects, case studies, hackathons, workshops, and industry mentorship — with multiple industry certifications embedded within the curriculum, and an industry-sponsored capstone project in the final semester." },
        tags: ["Cloud-Native Development", "Microservices Architecture", "Containerization", "DevOps Automation", "API Development", "AI Integration", "Full Stack Frameworks", "Enterprise Application Development"],
        roadmap: [
          { num: "01", title: "Foundations", desc: "OS & Shell Programming, OOP with Java, and Python Programming." },
          { num: "02", title: "Applied Computing", desc: "Data Structures, Computer Networks, DBMS, and a first Mini Project." },
          { num: "03", title: "Full Stack Specialisation", desc: "Web Technologies, AI, advanced electives, and a second Mini Project." },
          { num: "04", title: "Capstone & Innovation", desc: "Software Quality Assurance, Innovation & Entrepreneurship, and a Major Project." }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Certifications, Projects", highlight: "& Industry Exposure", para: "Globally recognised certifications, live project work, and continuous industry exposure that make every MCA Full Stack graduate job-ready from day one." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Association", name: "IIT Kanpur E&ICT Academy Certifications", desc: "Premier certifications backed by IIT Kanpur's Electronics & ICT Academy — adding national credibility and industry recognition to your MCA degree." },
          { isMain: false, badge: "", name: "AWS / Azure / GCP", desc: "Cloud platform certifications" },
          { isMain: false, badge: "", name: "MongoDB", desc: "NoSQL database certification" },
          { isMain: false, badge: "", name: "GitHub", desc: "Version control & CI/CD" },
          { isMain: false, badge: "", name: "Docker & Kubernetes", desc: "Containerization & DevOps" },
          { isMain: false, badge: "", name: "Node.js / Express", desc: "Backend development track" },
          { isMain: false, badge: "", name: "Python", desc: "Programming & scripting cert" }
        ],
        handsOnItems: ["Mini Project 1 (Semester II)", "Mini Project 2 (Semester III)", "Hackathons & Case Studies", "Industry Mentorship & Expert Talks", "Research Projects & Publications", "Industry-Sponsored Major Project (Semester IV)"]
      },
      {
        blockType: 'programDetails',
        badge: "MCA Full Stack Development · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [{ id: "usps", num: "01", label: "USPs" }],
        contents: [
          { tabId: "usps", type: 'bullet', bulletItems: [
            "Industry-integrated curriculum with live projects, hackathons, and industry mentorship embedded across all four semesters.",
            "Five program-elective tracks — Full Stack Architecture, Cloud-Native, Backend Engineering, DevOps, Cyber Security, and AI-Integrated Development.",
            "IIT Kanpur E&ICT Academy certifications included within the curriculum at no additional cost or enrolment.",
            "Industry-sponsored capstone major project in Semester IV, co-designed and evaluated with an industry partner.",
            "Cloud-native development and DevOps training with hands-on Docker, Kubernetes, and CI/CD pipeline experience.",
            "AI integration elective for building intelligent full stack applications using modern machine learning techniques.",
            "Research Methodology and Seminar component in Semester III for academic depth and research aptitude.",
            "Innovation & Entrepreneurship and IPR subjects in Semester IV to build startup-ready graduates.",
            "Mini Project 1 in Semester II and Mini Project 2 in Semester III — continuous practical output throughout the programme.",
            "Bridge course for non-CS background students ensuring a strong common foundation before core computing subjects begin.",
            "Placement support backed by a 750+ recruiter network and dedicated career services from day one."
          ] }
        ]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where This MCA", highlight: "Can Take You", para: "From full stack development to cloud architecture and AI integration — an MCA in Full Stack opens roles across every technology sector." },
        jobs: [
          { title: "Full Stack Developer", range: "₹4–12 LPA" },
          { title: "Backend Engineer", range: "₹5–14 LPA" },
          { title: "Cloud Solutions Architect", range: "₹8–20 LPA" },
          { title: "DevOps Engineer", range: "₹6–15 LPA" },
          { title: "AI-Integrated App Developer", range: "₹6–16 LPA" },
          { title: "Software Architect", range: "₹10–22 LPA" },
          { title: "Database Administrator", range: "₹4–10 LPA" },
          { title: "Technology Entrepreneur", range: "Market-Driven" },
          { title: "Web Security Specialist", range: "₹5–14 LPA" }
        ],
        stats: [
          { gradient: true, number: "100%", label: "Placement Assistance" },
          { gradient: false, number: "750+", label: "Industry Recruiters" },
          { gradient: false, number: "₹22L", label: "Highest Package" },
          { gradient: false, number: "3+", label: "Portfolio Projects" }
        ]
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Study MCA Full Stack", highlight: "At Tulas Institute", para: "A programme engineered for the modern technology profession — combining strong computing fundamentals, industry alignment, and hands-on practice." },
        items: [
          { n: "01", title: "Advanced Computing Curriculum", desc: "A structured 4-semester PG programme that builds deep computing expertise across OS, data structures, networks, and AI alongside full stack specialisation." },
          { n: "02", title: "IIT Kanpur E&ICT Academy", desc: "Association bringing premier, nationally recognised certifications and academic credibility directly into your MCA degree — at no extra cost." },
          { n: "03", title: "Industry-Integrated Learning", desc: "Live projects, hackathons, expert talks, and industry mentorship embedded across every semester — not offered as optional extras." },
          { n: "04", title: "Five Elective Tracks", desc: "Real specialisation choice across Full Stack Architecture, Cloud-Native, Backend Engineering, DevOps, Cyber Security, and AI-Integrated tracks." },
          { n: "05", title: "Industry-Sponsored Capstone", desc: "The final semester major project is co-designed and evaluated with an industry partner — real brief, real standards, real portfolio impact." },
          { n: "06", title: "Research & Innovation Focus", desc: "Research Methodology, Seminar, and Innovation & Entrepreneurship subjects cultivate academic depth and entrepreneurial thinking." },
          { n: "07", title: "Cloud-Native & AI Integration", desc: "Dedicated elective tracks for cloud-native development and AI-integrated full stack — skills defining the next decade of software engineering." },
          { n: "08", title: "Expert Faculty & Mentors", desc: "A faculty team combining academic rigour with industry experience, supported by visiting professionals and active industry mentors." },
          { n: "09", title: "Placement Readiness Framework", desc: "750+ industry recruiter network, structured placement training, mock interviews, and career services available from day one." }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF BANK", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk it", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assitant", "Root Analysis", "Silverspace", "Step2gen", "The times of india"]
      }
    ]
  },
  {
    title: "MCA",
    slug: "mca",
    program: "MCA",
    school: "School of Computer Applications",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "Home / Programs / MCA" },
        badge: "MCA · PG Programme · NAAC A+",
        title: "Master The Future Of",
        highlight: "Computing",
        description: "An advanced computing curriculum built for software engineering, AI, and enterprise technology careers. Choose your path — general MCA, or a focused specialisation in Full Stack Development or AI & ML.",
        chips: [
          { strong: "2-Year", label: "PG Programme" },
          { strong: "Multiple", label: "Specialisation Pathways" },
          { strong: "Industry", label: "Certifications" },
          { strong: "Industry-Sponsored", label: "Capstone" },
          { strong: "Research & Innovation", label: "Ecosystem" }
        ],
        buttons: [
          { variant: "orange", icon: null, label: "Apply Now" },
          { variant: "white_outline", icon: null, label: "Explore Pathways" }
        ]
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 1, title: "PG", highlight: "Advanced Computing Curriculum" },
        header: { label: "School of Computing", title: "Where Computing", highlight: "Meets Career" },
        description1: "The MCA at Tulas Institute delivers an advanced computing curriculum with a strong focus on software development, system design, data management, and emerging technologies.",
        description2: "Students build a strong computing core — operating systems, data structures, databases, networks, and software engineering — then choose from specialisation opportunities in Artificial Intelligence, Machine Learning, Full Stack Development, Cloud Computing, Data Science, Cyber Security, and DevOps. Industry-integrated learning, embedded certifications, and an industry-sponsored capstone project make graduates ready for advanced computing careers from day one.",
        quote: "A future-ready graduate profile combining advanced technical expertise, industry exposure, research aptitude, innovation capabilities, and lifelong learning skills.",
        table: { headers: [], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Choose Your Path", title: "Three Ways To", highlight: "Study Computing", para: "Start with the core MCA, or go deep into a focused specialisation from Semester II onward." },
        cards: [
          { title: "MCA (General)", desc: "A comprehensive postgraduate computing degree covering software development, artificial intelligence, data science, cloud computing, and cyber security foundations.", pills: ["Current Page", "General"] },
          { title: "MCA Full Stack Development", desc: "Specialise in end-to-end software architecture, cloud-native development, DevOps, and enterprise application engineering.", pills: ["Specialisation"] },
          { title: "MCA AI & ML", desc: "Specialise in artificial intelligence, machine learning, and data-driven intelligent systems for next-generation software products.", pills: ["Specialisation"] }
        ],
        extraCard: { title: "", description: "" },
        coreTags: []
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "Advanced Computing" },
        header: { label: "The Differentiator", title: "Industry-Integrated", highlight: "Learning", para: "The programme is built around live projects, case studies, hackathons, workshops, expert talks, and industry mentorship — with multiple industry certifications embedded within the curriculum, and an industry-sponsored capstone project in the final semester." },
        tags: ["Artificial Intelligence", "Machine Learning", "Full Stack Development", "Cloud Computing", "Data Science", "Cyber Security", "DevOps"],
        roadmap: [
          { num: "01", title: "Foundations", desc: "Core computing, programming fundamentals, OOP, and mathematical foundations." },
          { num: "02", title: "Applied Computing", desc: "Data structures, networks, databases, and a first mini project." },
          { num: "03", title: "Specialisation", desc: "Chosen elective track, AI, web technologies, and a second mini project." },
          { num: "04", title: "Capstone & Innovation", desc: "Quality assurance, entrepreneurship, and an industry-sponsored major project." }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Certifications", highlight: "& Projects", para: "Globally recognised certifications, hands-on labs, and continuous industry exposure that make graduates job-ready from day one." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Association", name: "IIT Kanpur E&ICT Academy Certifications", desc: "Premier certifications backed by IIT Kanpur's Electronics & ICT Academy — adding national credibility to your MCA degree." },
          { isMain: false, badge: "", name: "AWS", desc: "Cloud certifications" },
          { isMain: false, badge: "", name: "Microsoft", desc: "Azure & developer tracks" },
          { isMain: false, badge: "", name: "Google", desc: "Cloud & AI certifications" },
          { isMain: false, badge: "", name: "NVIDIA", desc: "Deep learning & AI" },
          { isMain: false, badge: "", name: "Oracle", desc: "Database & Java" },
          { isMain: false, badge: "", name: "Python", desc: "Programming certifications" }
        ],
        handsOnItems: ["Live Projects", "Hackathons", "Coding Challenges", "Research Projects", "Product Development", "Innovation Competitions"]
      },
      {
        blockType: 'programDetails',
        badge: "MCA · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [{ id: "usps", num: "01", label: "USPs" }],
        contents: [
          { tabId: "usps", type: 'bullet', bulletItems: [
            "Advanced computing curriculum with a strong focus on software development, system design, data management, and emerging technologies.",
            "Specialisation opportunities in high-demand domains including Artificial Intelligence, Machine Learning, Full Stack Development, Cloud Computing, Data Science, Cyber Security, and DevOps.",
            "Industry-integrated learning through live projects, case studies, hackathons, workshops, expert talks, and industry mentorship across all semesters.",
            "Multiple industry certifications embedded within the curriculum — including IIT Kanpur E&ICT Academy, AWS, Microsoft, Google, NVIDIA, Oracle, and Python certifications.",
            "Hands-on experiential learning through advanced laboratories, project-based courses, internships, and industry-sponsored capstone projects.",
            "Research and innovation ecosystem with opportunities for research projects, publications, patents, product development, and innovation challenges.",
            "Entrepreneurship and startup support through incubation, design thinking, innovation labs, and technology-driven venture development.",
            "Comprehensive professional skill development covering communication, leadership, teamwork, project management, critical thinking, and problem-solving.",
            "Strong industry readiness through training in modern software engineering practices, agile methodologies, cloud platforms, DevOps tools, and enterprise application development.",
            "Excellent career and higher education pathways into software engineering, AI/ML, data analytics, cloud computing, cyber security, product development, research, and doctoral studies.",
            "Future-ready graduate profile combining advanced technical expertise, industry exposure, research aptitude, innovation capabilities, and lifelong learning skills."
          ] }
        ]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where This MCA", highlight: "Can Take You", para: "An advanced computing degree opening careers across every major technology function — from software engineering and AI to cloud, security, and research." },
        jobs: [
          { title: "Software Engineer", range: "" },
          { title: "Full Stack Developer", range: "" },
          { title: "AI / ML Engineer", range: "" },
          { title: "Data Analyst", range: "" },
          { title: "Cloud Engineer", range: "" },
          { title: "Cyber Security Analyst", range: "" },
          { title: "DevOps Engineer", range: "" },
          { title: "Research Associate", range: "" }
        ],
        stats: [
          { gradient: true, number: "100%", label: "Placement Assistance" },
          { gradient: false, number: "750+", label: "Recruiters" },
          { gradient: false, number: "3", label: "Specialisation Pathways" },
          { gradient: false, number: "PG", label: "Postgraduate Degree" }
        ]
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Study MCA", highlight: "At Tulas Institute", para: "A programme engineered for advanced computing careers — combining strong fundamentals, industry alignment, and a culture of innovation." },
        items: [
          { n: "01", title: "AI-Integrated Learning", desc: "Artificial intelligence and machine learning woven across the entire MCA curriculum — from foundations through to advanced specialisation." },
          { n: "02", title: "IIT Kanpur E&ICT Academy", desc: "Association bringing premier, nationally recognised certifications and academic credibility directly into your MCA degree." },
          { n: "03", title: "Industry-Aligned Curriculum", desc: "Continuously updated to match real industry trends, modern tools, and practices — covering AI, cloud, cyber security, and DevOps." },
          { n: "04", title: "Industry Certifications", desc: "AWS, Microsoft, Google, NVIDIA, Oracle, and Python certifications built into regular coursework — at no extra cost or enrolment." },
          { n: "05", title: "Internship Opportunities", desc: "Multiple internship opportunities across the programme and a direct internship-to-placement pathway supported by the TCCI team." },
          { n: "06", title: "Innovation & Research Culture", desc: "A centre of excellence in teaching, research, and innovative computing practices — encouraging students to push technology boundaries." },
          { n: "07", title: "Project-Based Learning", desc: "Learn by building — live projects, hackathons, product development, and an industry-sponsored capstone project across all four semesters." },
          { n: "08", title: "Emerging Technology Exposure", desc: "AI, cloud computing, cyber security, data science, DevOps, and full stack development integrated across three specialisation pathways." },
          { n: "09", title: "Placement Readiness Framework", desc: "Career development and corporate readiness powered by TCCI — resume building, mock interviews, and dedicated recruiter engagement from day one." }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF BANK", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk it", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assitant", "Root Analysis", "Silverspace", "Step2gen", "The times of india"]
      }
    ]
  },
  {
    title: "B.Sc. (Hons.) Agriculture",
    slug: "bsc-agriculture",
    program: "B.Sc",
    school: "School of Agricultural Sciences",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "Home / Programs / B.Sc. / Agriculture (Hons.)" },
        badge: "B.Sc. (Hons.) Agriculture · NAAC A+",
        title: "Best B.Sc. (Hons.) Agriculture",
        highlight: "Institute In North India",
        description: "A four-year undergraduate degree covering the theoretical and practical training that today's agriculture sector needs — from crop production and soil science to agribusiness, opening opportunities across technical, commercial, and research roles in a sector that never slows down.",
        chips: [
          { strong: "4-Year", label: "UG Programme" },
          { strong: "ICAR-Aligned", label: "Curriculum" },
          { strong: "Field & Lab-Based", label: "Learning" },
          { strong: "Multiple", label: "Internships" },
          { strong: "100%", label: "Placement Support" }
        ],
        buttons: [
          { variant: "orange", icon: null, label: "Apply Now" },
          { variant: "white_outline", icon: null, label: "Contact Admissions" }
        ]
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 1, title: "4Y", highlight: "ICAR-Aligned Curriculum" },
        header: { label: "School of Agriculture", title: "Where Science", highlight: "Meets The Soil" },
        description1: "B.Sc. (Hons.) Agriculture is a four-year degree covering the theory and practice of modern agricultural techniques — from food production to rural economy and development.",
        description2: "The programme is a broad-based one with real staying power: agriculture is never a sector facing layoffs, because feeding the planet is never optional. Students build knowledge across agronomy, soil science, horticulture, plant breeding and genetics, entomology, plant pathology, animal science, extension education, plant biochemistry, agricultural economics, and the fundamentals of biotechnology. The course follows ICAR (Indian Council of Agricultural Research) recommendations, teaching students to improve crop production sustainably while building a broad understanding of agriculture and allied fields.",
        quote: "Cultivating knowledge, growing innovation — B.Sc.(Hons.) Agriculture empowers future leaders to feed the world sustainably and shape the future of farming.",
        table: {
          headers: ["Course", "Duration", "Eligibility"],
          rows: [
            { program: "B.Sc. (Hons.) Agriculture", duration: "4 Years", eligibility: "Passed 10+2 with Physics, Chemistry, Mathematics/Biology/Agriculture, with at least 45% marks (40% for reserved category)." }
          ]
        }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Domains You'll Study", title: "Six Domains, One", highlight: "Agricultural Foundation", para: "Every domain combines classroom learning with lab work and field practice." },
        cards: [
          { title: "Agronomy & Soil Science", desc: "Crop production, soil testing, and sustainable land management.", pills: ["Soil Testing", "Crop Production"] },
          { title: "Horticulture & Plant Breeding", desc: "Genetics, plant breeding, and horticultural crop management.", pills: ["Genetics", "Horticulture"] },
          { title: "Plant Pathology & Entomology", desc: "Plant disease diagnosis and pest management for healthier crops.", pills: ["Plant Pathology", "Entomology"] },
          { title: "Animal Science & Husbandry", desc: "Livestock management and the fundamentals of animal husbandry.", pills: ["Animal Husbandry", "Livestock Management"] },
          { title: "Agricultural Economics & Extension", desc: "Rural economy, agribusiness, and agricultural extension education.", pills: ["Agri-Economics", "Extension Education"] },
          { title: "Food Technology & Biotechnology", desc: "Fundamentals of biotechnology and food production technology.", pills: ["Biotechnology", "Food Technology"] }
        ],
        extraCard: { title: "Built On Core Agricultural Sciences", description: "Agronomy · Soil Science · Horticulture · Plant Breeding & Genetics · Entomology · Plant Pathology" },
        coreTags: ["Animal Science", "Extension Education", "Plant Biochemistry", "Agricultural Economics", "Fundamentals of Biotechnology", "Rural Development", "Environmental Health", "Crop Production", "Basic Sciences", "Humanities"]
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "Field & Lab Based Learning" },
        header: { label: "The Differentiator", title: "Practical Solutions,", highlight: "Not Just Theory", para: "The programme is designed to instil subject-specific knowledge while establishing a link between theory and practical solutions — using scientific and experimental evidence to make real agricultural issues appealing, and practical application and research to hone problem-solving skills." },
        tags: ["Sustainable Agriculture", "Precision Farming", "Organic Farming", "Crop Diversification", "Agri-Tech Tools", "Soil Testing", "Seed Technology", "Farm Management"],
        roadmap: [
          { num: "01", title: "Year 1", desc: "Foundational sciences, agronomy basics, and introduction to agricultural systems." },
          { num: "02", title: "Year 2", desc: "Soil science, plant breeding, and horticulture applied through lab and field work." },
          { num: "03", title: "Year 3", desc: "Plant pathology, entomology, and animal science through practical training." },
          { num: "04", title: "Year 4", desc: "Agricultural economics, extension education, and a capstone/major project." }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Certifications", highlight: "& Projects", para: "Hands-on lab work, field practice, and continuous industry exposure that make graduates job-ready." },
        certificationAssociations: [
          { isMain: true, badge: "Curriculum Foundation", name: "ICAR-Aligned Curriculum", desc: "A curriculum built on Indian Council of Agricultural Research recommendations, giving the degree national academic credibility." },
          { isMain: false, badge: "", name: "Soil & Seed Testing", desc: "Practical lab certification" },
          { isMain: false, badge: "", name: "Organic Farming", desc: "Sustainable practice certification" },
          { isMain: false, badge: "", name: "Precision Agriculture", desc: "Agri-tech tools training" },
          { isMain: false, badge: "", name: "Agribusiness Management", desc: "Farm & enterprise management" }
        ],
        handsOnItems: ["Soil & Seed Testing Lab", "Crop Production Projects", "Farm & Field Practice", "Industrial & Farm Visits", "Rural Extension Activities", "Major/Capstone Project"]
      },
      {
        blockType: 'programDetails',
        badge: "B.Sc. (Hons.) Agriculture · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [{ id: "usps", num: "01", label: "USPs" }],
        contents: [
          { tabId: "usps", type: 'bullet', bulletItems: [
            "ICAR-aligned curriculum covering the full breadth of agricultural sciences.",
            "An agricultural farm and dedicated laboratories for hands-on, real-environment learning.",
            "Practical and theoretical training across agronomy, soil science, horticulture, and animal science.",
            "Strong focus on student-centred, problem-based learning with an industry-relevant curriculum.",
            "Industrial training with agribusiness, research, and agri-tech organisations.",
            "Industry visits, seminars, workshops, and expert lectures from practising agricultural professionals.",
            "Active student clubs and bodies supporting a vibrant learning environment.",
            "Dedicated placement support across the final year of the programme.",
            "Pathways into government, private, and international agriculture and agribusiness opportunities."
          ] }
        ]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where This B.Sc.", highlight: "Can Take You", para: "From government agriculture departments to agribusiness and research — this degree opens routes across the sector." },
        jobs: [
          { title: "Agricultural Officer", range: "" },
          { title: "Agronomist", range: "" },
          { title: "Soil Scientist", range: "" },
          { title: "Plant Breeder", range: "" },
          { title: "Agricultural Research Scientist", range: "" },
          { title: "Farm Manager", range: "" },
          { title: "Horticulturist", range: "" },
          { title: "Seed Technologist", range: "" }
        ],
        stats: [
          { gradient: true, number: "100%", label: "Placement Assistance" },
          { gradient: false, number: "750+", label: "Recruiters" },
          { gradient: false, number: "ICAR", label: "Aligned Curriculum" },
          { gradient: false, number: "6", label: "Core Agricultural Domains" }
        ]
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Study Agriculture", highlight: "At Tulas Institute", para: "Practical, field-tested learning that prepares graduates for a sector that will never stop needing skilled hands." },
        items: [
          { n: "01", title: "ICAR-Aligned Curriculum", desc: "Built on Indian Council of Agricultural Research recommendations for national academic credibility and recognition." },
          { n: "02", title: "On-Campus Agricultural Farm", desc: "Real hands-on understanding of the farming environment, with students actively managing the on-campus farm." },
          { n: "03", title: "Broad-Based Curriculum", desc: "Agronomy, soil science, horticulture, plant breeding, animal science, and more — all under one degree." },
          { n: "04", title: "Recession-Proof Sector", desc: "Agriculture is a field that never faces the layoffs other industries do — feeding the planet is never optional." },
          { n: "05", title: "Industrial Training", desc: "Placements with agribusiness, research, and agri-tech organisations for real-world exposure and career readiness." },
          { n: "06", title: "Sustainability Focus", desc: "Training in organic farming, precision agriculture, and sustainable crop production for a greener future." },
          { n: "07", title: "Placement Readiness", desc: "Dedicated placement support across the final year of the programme, connecting graduates with top recruiters." },
          { n: "08", title: "Active Student Clubs", desc: "A vibrant, multi-cultural teaching environment with student-run bodies and rich co-curricular activities." },
          { n: "09", title: "Higher Studies Ready", desc: "A strong foundation for M.Sc. Agriculture and specialised postgraduate study in allied agricultural sciences." }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF BANK", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk it", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assitant", "Root Analysis", "Silverspace", "Step2gen", "The times of india"]
      }
    ]
  },
  {
    title: "M.Sc. (Agronomy)",
    slug: "msc-agronomy",
    program: "M.Sc",
    school: "School of Agricultural Sciences",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "Master of Science in Agronomy" },
        title: "Master of Science in Agronomy",
        description: "Excellence in Agronomy and Sustainable Agriculture",
        chips: [],
        buttons: []
      },
      {
        blockType: 'overview',
        description1: "The School of Agriculture at Tulas University, Dehradun offers a specialised M.Sc. (Agronomy) program designed to build advanced expertise in crop production, soil science, and sustainable farming practices. The program focuses on developing scientific understanding, analytical thinking, and practical skills required to address modern agricultural challenges and ensure food security. Structured to go beyond classroom learning, the program integrates academic depth with field-based applications. Students are trained to understand crop systems, optimise resource use, and adopt innovative techniques that enhance productivity while maintaining ecological balance. The curriculum is aligned with contemporary agricultural practices and emerging global needs, covering key areas such as crop physiology, soil fertility management, agronomic practices, weed management, water resource management, and climate-resilient agriculture. Interdisciplinary inputs from environmental science, biotechnology, and agricultural economics enable students to approach farming systems holistically.",
        description2: "With a strong emphasis on research, data analysis, and field experimentation, students gain hands-on experience through laboratory work, field trials, and research projects. The pedagogy encourages critical thinking and problem-solving, preparing students to develop sustainable solutions for real-world agricultural challenges. Practical exposure is further enhanced through internships, field visits, and interactions with agricultural organisations, research institutes, and agri-business firms. This ensures students understand modern farming technologies, agri-innovation, and industry practices. Complemented by extension activities, workshops, and rural engagement initiatives, the program fosters leadership, innovation, and a deep sense of responsibility towards sustainable agriculture. Graduates are equipped with the knowledge, research capability, and professional skills required to excel in agriculture, research, agribusiness, and allied sectors.",
        quote: "",
        table: {
          headers: ["Course", "Duration", "Eligibility"],
          rows: [
            { program: "M.Sc. (Agronomy)", duration: "2 years", eligibility: "Passed B.Sc. Agriculture / B.Sc. Horticulture / B.Sc. Forestry from a recognised university" }
          ]
        }
      },
      {
        blockType: 'recruiters',
        title: "World's Leading Brands",
        highlight: "Hire Our Talented Students",
        subtitle: "TOP RECRUITERS",
        logos1: ["Amazon", "Microsoft", "HCL", "LG", "Wipro", "Vivo", "JBM", "Tata"],
        logos2: ["Samsung", "ITC", "Oracle", "Cumins", "Aon", "Honda", "Hexaware", "AIS"]
      }
    ]
  }
]

// ---------------------------------------------------------------------
// Batch 7: BCA (generic), M.Tech CSE, M.Tech Thermal Engineering, M.Tech Structural Engineering, B.Com (Hons)
// ---------------------------------------------------------------------
const batch7 = [
  {
    title: "Bachelor of Computer Applications (BCA)",
    slug: "bca",
    program: "BCA",
    school: "School of Computer Applications",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "Bachelor of Computer Applications (BCA)" },
        title: "Bachelor of Computer Applications (BCA)",
        description: "Best Bachelor of Computer Applications Institute in North India",
        chips: [],
        buttons: []
      },
      {
        blockType: 'overview',
        description1: "The Bachelor of Computer Applications (BCA) is a three-year program blending computer science fundamentals with practical training in software development, web design, and networking. It covers programming, database management, and AI, preparing students for roles like software developer or cybersecurity specialist. BCA lays a strong foundation for careers in IT or tech entrepreneurship. As the IT industry expands, this creates more career options for computer applications graduates. It is one of the most sought-after courses for students hoping to break into the IT industry. A wide range of computer/mobile software development and application development, is a part of curriculum in the program. Learning new skills and taking advantage of opportunities will certainly be an excellent benefit for students of this program. Students who complete the programme will have a strong academic foundation in computer skills and applications, laying the groundwork for further advancement in the field. The institute aims to provide students with both theoretical and practical training in computation, computer languages, programming, and computer architecture. Computer software and its applications are now essential to almost every industry/organization. Computer science advances are impacting every industry/organization and as a result, there is an ever-increasing demand for computer application graduates. Faculty members in the department of computer application, of our institute, strive to create the best professionals possible by providing a conducive environment for study and research in various fields of computer science.",
        quote: "Code your future, innovate with technology, and transform the world with Tulas University Bachelor of Computer Applications Program.",
        table: {
          headers: ["S.NO", "COURSE", "DURATION", "ELIGIBILITY"],
          rows: [
            { program: "BCA", duration: "3 years", eligibility: "Passed XII or equivalent course in any discipline from any recognized Board / Council / University with minimum 45% marks for general (open) category and 40% marks for students of SC and ST category." }
          ]
        }
      },
      {
        blockType: 'recruiters',
        title: "World's Leading Brands",
        highlight: "Hire Our Talented Students",
        subtitle: "Top Recruiters",
        logos1: ["Amazon", "Microsoft", "HCL", "LG", "Wipro", "Vivo", "JBM", "Tata"],
        logos2: ["Samsung", "ITC", "Oracle", "Cummins", "AON", "Honda", "Hexaware", "AIS"]
      }
    ]
  },
  {
    title: "M.Tech Computer Science & Engineering",
    slug: "mtech/computer-science",
    program: "M.Tech",
    school: "School of Engineering & Technology",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "Home / Programs / M.Tech / Computer Science & Engineering" },
        badge: "M.Tech · Computer Science & Engineering · AI-Integrated",
        title: "Advance Your Expertise In",
        highlight: "Intelligent Computing",
        description: "An industry-relevant postgraduate programme focused on Artificial Intelligence, Data Science, Cyber Security, Cloud Computing, and High-Performance Computing",
        chips: [
          { strong: "2-Year", label: "M.Tech Programme" },
          { strong: "", label: "AI-Integrated Advanced Curriculum" },
          { strong: "", label: "Research & Innovation Focus" },
          { strong: "", label: "Industry-Oriented Projects & Thesis" },
          { strong: "", label: "Expert Faculty & Industry Mentorship" }
        ],
        buttons: [
          { variant: "orange", icon: null, label: "Apply Now →" },
          { variant: "white_outline", icon: null, label: "Contact Admissions" }
        ]
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 0, title: "CSE", highlight: "2Y" },
        header: { label: "", title: "Where Advanced Computing", highlight: "Meets Research & Innovation" },
        description1: "The M.Tech in Computer Science & Engineering at Tulas is designed to develop highly skilled professionals, researchers, and technology leaders capable of addressing complex computing challenges and driving innovation in the digital era.",
        description2: "The programme offers advanced knowledge in Artificial Intelligence, Machine Learning, Data Science, Cyber Security, Cloud Computing, High-Performance Computing, Software Engineering, and Distributed Systems. With a strong emphasis on research, innovation, advanced problem-solving, and real-world applications, students gain hands-on experience through industry-oriented projects, research publications, dissertation work, and emerging technologies aligned with global technological advancements.",
        quote: "Advance your expertise, lead innovation, and shape the future of intelligent computing with Tulas M.Tech in Computer Science & Engineering.",
        table: { headers: [], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Advanced Learning Domains", title: "Six Domains, One", highlight: "AI-Integrated Curriculum", para: "At Tulas, Artificial Intelligence is not a standalone subject — it is woven throughout the entire M.Tech CSE curriculum." },
        cards: [
          { title: "Artificial Intelligence & Machine Learning", desc: "Deep learning, generative AI, and agentic AI systems.", pills: ["Deep Learning", "Generative AI"] },
          { title: "Data Science & Analytics", desc: "Advanced data analytics and data-driven decision systems.", pills: ["Data Analytics", "Big Data"] },
          { title: "Cloud Computing & MLOps", desc: "Scalable cloud architecture and machine learning operations.", pills: ["Cloud Computing", "MLOps"] },
          { title: "Computer Vision & NLP", desc: "Visual intelligence and natural language processing systems.", pills: ["Computer Vision", "NLP"] },
          { title: "Cyber Security", desc: "Security research and secure systems engineering.", pills: ["Cyber Security", "Secure Systems"] },
          { title: "Distributed & High-Performance Computing", desc: "Distributed systems and high-performance computing architectures.", pills: ["Distributed Systems", "HPC"] }
        ],
        extraCard: { title: "Built On Advanced Computing", description: "Advanced Algorithms · Distributed Systems · Research Methodology · Mathematical Foundations · Modern Software Engineering" },
        coreTags: ["Artificial Intelligence", "Machine Learning", "Deep Learning", "Generative AI", "Agentic AI", "Data Science & Analytics", "Cloud Computing", "Computer Vision", "Natural Language Processing", "Cyber Security", "MLOps", "Distributed & High-Performance Computing"]
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "AI-Integrated Curriculum" },
        header: { label: "The Differentiator", title: "An AI-Integrated", highlight: "Advanced Curriculum", para: "The curriculum combines advanced computing, research, and innovation, enabling students to solve real-world challenges using next-generation technologies — from advanced theoretical foundations to cutting-edge AI applications, graduates are equipped to lead technological transformation across academia, research, and industry." },
        tags: ["Generative AI", "Agentic AI", "MLOps", "AI-Driven Automation", "Edge Intelligence", "Cybersecurity Research", "Frontier Technologies"],
        roadmap: [
          { num: "01", title: "Advanced Foundations", desc: "Advanced algorithms, distributed systems, research methodology, and modern software engineering." },
          { num: "02", title: "Intelligent Computing", desc: "Cloud computing, big data analytics, advanced databases, and scalable enterprise systems." },
          { num: "03", title: "AI & Research", desc: "Artificial Intelligence, Machine Learning, Deep Learning, NLP, and intelligent decision-making systems." },
          { num: "04", title: "Emerging Technologies", desc: "Generative AI, Agentic AI, MLOps, edge intelligence, and dissertation-based frontier specialisation." }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Research, Certifications & Innovation", title: "Certifications, Projects", highlight: "& Innovation", para: "Go beyond the classroom with advanced research, industry-recognised certifications, real-world problem-solving, and innovation-driven learning." },
        certificationAssociations: [
          { isMain: true, badge: "Flagship Association", name: "IIT Kanpur E&ICT Academy Certifications", desc: "Premier certification programmes offered through the Electronics & ICT Academy, IIT Kanpur — strengthening your expertise in advanced computing and emerging technologies." },
          { isMain: false, badge: "", name: "AWS", desc: "Cloud Computing & Solutions Architecture" },
          { isMain: false, badge: "", name: "Microsoft", desc: "Azure, AI & Developer Technologies" },
          { isMain: false, badge: "", name: "Google", desc: "Cloud Computing & Artificial Intelligence" },
          { isMain: false, badge: "", name: "NVIDIA", desc: "Deep Learning & Accelerated Computing" },
          { isMain: false, badge: "", name: "Oracle", desc: "Advanced Database & Java Technologies" },
          { isMain: false, badge: "", name: "Python Institute", desc: "Advanced Python Programming" }
        ],
        handsOnItems: ["Research & Dissertation", "Industry-Sponsored Projects", "Hackathons & Innovation Challenges", "Research Publications", "Product Development & Prototyping", "Technology Incubation & Entrepreneurship"]
      },
      {
        blockType: 'programDetails',
        badge: "M.Tech CSE · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [
          { id: "usps", num: "01", label: "USPs" },
          { id: "courseOutcomes", num: "02", label: "Course Outcomes" },
          { id: "programOutcomes", num: "03", label: "Program Outcomes" },
          { id: "programSpecificOutcomes", num: "04", label: "Program Specific Outcomes" },
          { id: "programEducationalObjectives", num: "05", label: "Program Educational Objectives" }
        ],
        contents: [
          { tabId: "usps", type: "bullet", bulletItems: [
            "AI-Integrated Advanced Learning — AI, ML, and emerging intelligent technologies embedded throughout the curriculum.",
            "IIT Kanpur E&ICT Academy & Industry Certifications through AWS, Microsoft, Google, NVIDIA, and Oracle.",
            "Industry-Oriented Advanced Curriculum, continuously updated to reflect emerging technologies and industry requirements.",
            "Research & Dissertation-Based Learning through advanced laboratories and industry-sponsored problem-solving.",
            "Industry Collaboration & Consultancy Projects — internships, expert talks, industrial visits, and technology partnerships.",
            "Emerging Technology Specialisations in Generative AI, Agentic AI, Cloud Computing, Cyber Security, and MLOps.",
            "Career Development & Research Opportunities through placement support and doctoral pathways.",
            "Expert Faculty & Research Mentorship from experienced academicians and industry professionals.",
            "Research Publications, Innovation & Patents through high-impact journals and funded research projects.",
            "Strong Alumni & Professional Network across multinational companies, research organisations, and startups.",
            "Advanced Computing Laboratories & Research Centres with high-performance computing and AI platforms.",
            "Innovation Ecosystem & Technical Communities through hackathons, research groups, and startup incubation."
          ] }
        ]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where This M.Tech", highlight: "Can Take You", para: "Advanced technical, research, and leadership roles across industry, research organisations, startups, and academia." },
        jobs: [
          { title: "AI Engineer", range: "" },
          { title: "Machine Learning Engineer", range: "" },
          { title: "Data Scientist", range: "" },
          { title: "Software Architect", range: "" },
          { title: "Cloud Solutions Architect", range: "" },
          { title: "Cyber Security Specialist", range: "" },
          { title: "MLOps Engineer", range: "" },
          { title: "Research Scientist", range: "" }
        ],
        stats: [
          { gradient: false, number: "₹60 LPA", label: "Highest Package" },
          { gradient: false, number: "100%", label: "Placement Assistance" },
          { gradient: false, number: "500+", label: "Recruiters On Record" },
          { gradient: false, number: "1000+", label: "Internship Opportunities" }
        ]
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Pursue M.Tech CSE", highlight: "At Tulas Institute", para: "A postgraduate programme designed for the era of intelligent computing — combining advanced technical knowledge, research, industry collaboration, and innovation." },
        items: [
          { n: "01", title: "AI-Integrated Advanced Learning", desc: "AI, ML, and emerging intelligent technologies embedded throughout the entire M.Tech CSE curriculum." },
          { n: "02", title: "IIT Kanpur E&ICT Academy", desc: "Industry-recognised certifications through IIT Kanpur E&ICT and global tech leaders including AWS, Microsoft, Google, NVIDIA, and Oracle." },
          { n: "03", title: "Industry-Oriented Curriculum", desc: "Continuously updated to reflect emerging technologies, evolving industry needs, and global computing advancements." },
          { n: "04", title: "Research & Dissertation-Based Learning", desc: "Advanced laboratories, research projects, and industry-sponsored problem-solving from semester one." },
          { n: "05", title: "Industry Collaboration", desc: "Consultancy assignments, internships, expert talks, industrial visits, and technology partnerships with leading organisations." },
          { n: "06", title: "Emerging Tech Specialisations", desc: "Generative AI, Agentic AI, Cloud Computing, Cyber Security, MLOps, and Edge AI — the technologies shaping the future." },
          { n: "07", title: "Career & Research Development", desc: "Dedicated placement support, technical training, and clear doctoral study pathways for ambitious graduates." },
          { n: "08", title: "Expert Faculty Mentorship", desc: "Continuous mentorship in advanced technologies, innovation, and research from experienced academicians and industry professionals." },
          { n: "09", title: "Publications, Innovation & Patents", desc: "High-impact journal publications, conference presentations, and intellectual property creation supported by the institute." },
          { n: "10", title: "Strong Alumni Network", desc: "Distinguished alumni across MNCs, research organisations, government bodies, and technology startups worldwide." },
          { n: "11", title: "Advanced Computing Labs", desc: "High-performance computing systems, AI platforms, cybersecurity labs, and cloud infrastructure for hands-on research." },
          { n: "12", title: "Innovation Ecosystem", desc: "Research groups, hackathons, startup incubation, and technical symposiums fostering entrepreneurship and discovery." }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF Bank", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk IT", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assistant", "Root Analysis", "Silverspace", "Step2gen", "The Times of India"]
      }
    ]
  },
  {
    title: "M.Tech Thermal Engineering",
    slug: "mtech/thermal-engineering",
    program: "M.Tech",
    school: "School of Engineering & Technology",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "Home / Programs / M.Tech / Thermal Engineering" },
        badge: "M.Tech · Thermal Engineering · Energy Innovation",
        title: "Where Energy Innovation Meets",
        highlight: "Engineering Excellence",
        description: "An industry-relevant postgraduate programme focused on Advanced Thermodynamics, Heat Transfer, Computational Fluid Dynamics (CFD), Renewable Energy Systems, Thermal Power Engineering, Combustion Engineering, HVAC & Refrigeration, Energy Management",
        chips: [
          { strong: "2-Year", label: "M.Tech Programme" },
          { strong: "", label: "Industry-Integrated Advanced Curriculum" },
          { strong: "", label: "Research & Innovation Focus" },
          { strong: "", label: "Industry-Oriented Projects & Thesis" },
          { strong: "", label: "Expert Faculty & Industry Mentorship" }
        ],
        buttons: [
          { variant: "orange", icon: null, label: "Apply Now →" },
          { variant: "white_outline", icon: null, label: "Contact Admissions" }
        ]
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 0, title: "TE", highlight: "2Y" },
        header: { label: "", title: "Where Energy Innovation", highlight: "Meets Engineering Excellence" },
        description1: "The M.Tech in Thermal Engineering at Tulas empowers aspiring engineers and researchers with advanced knowledge and practical expertise to solve today's most critical energy and thermal engineering challenges.",
        description2: "Students specialise in Advanced Heat Transfer, Computational Fluid Dynamics (CFD), Renewable & Clean Energy Technologies, Thermal Power Systems, Combustion Engineering, HVAC & Refrigeration, Energy Conservation, and Thermal System Optimization. Through industry collaborations, state-of-the-art laboratories, high-performance simulation tools, interdisciplinary research, and dissertation work, graduates are equipped to contribute to academia, research organisations, and leading industries worldwide.",
        quote: "Innovate energy, engineer sustainability, and lead the future of thermal technology with Tulas M.Tech in Thermal Engineering.",
        table: { headers: [], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Advanced Learning Domains", title: "Six Domains, One", highlight: "Thermal Engineering Curriculum", para: "An interdisciplinary approach integrating computational modelling, renewable energy, smart thermal systems, and sustainable engineering practices." },
        cards: [
          { title: "Heat Transfer & Thermal Sciences", desc: "Advanced heat transfer and thermodynamics foundations.", pills: ["Heat Transfer", "Thermal Sciences"] },
          { title: "Computational Fluid Dynamics (CFD)", desc: "Simulation and computational modelling of fluid and thermal systems.", pills: ["CFD", "Simulation"] },
          { title: "Renewable Energy Systems", desc: "Solar thermal, energy storage, and clean energy technologies.", pills: ["Renewable Energy", "Energy Storage"] },
          { title: "Thermal Power Engineering", desc: "Thermal power plants, gas turbines, and IC engines.", pills: ["Thermal Power", "Gas Turbines"] },
          { title: "Combustion & Emission Control", desc: "Combustion engineering and low-carbon technologies.", pills: ["Combustion", "Emission Control"] },
          { title: "HVAC & Refrigeration Systems", desc: "Smart HVAC, refrigeration, and green building technologies.", pills: ["HVAC", "Refrigeration"] }
        ],
        extraCard: { title: "Built On Advanced Engineering", description: "Advanced Thermodynamics · Heat Transfer · Fluid Flow · Numerical Methods · Engineering Mathematics · Research Methodology" },
        coreTags: ["Heat Transfer & Thermal Sciences", "Computational Fluid Dynamics", "Thermodynamics & Exergy Analysis", "Renewable Energy Systems", "Energy Management & Sustainability", "Combustion & Emission Control", "Thermal Power Engineering", "HVAC & Refrigeration", "Thermal System Simulation (ANSYS, MATLAB)", "Energy Storage Technologies"]
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "Engineering The Future Of Sustainable Energy" },
        header: { label: "The Differentiator", title: "An Industry-Integrated", highlight: "Advanced Curriculum", para: "Designed to prepare future engineers for the rapidly evolving energy landscape through an interdisciplinary approach that integrates computational modelling, artificial intelligence, renewable energy, smart thermal systems, and sustainable engineering practices." },
        tags: ["Hydrogen & Fuel Cells", "Thermal Energy Storage", "Digital Twins", "AI-Driven Energy Optimization", "Smart Energy Systems", "Industry 5.0 Applications"],
        roadmap: [
          { num: "01", title: "Advanced Engineering Foundations", desc: "Advanced thermodynamics, heat transfer, fluid flow, numerical methods, and research methodology." },
          { num: "02", title: "Thermal Systems & Energy Engineering", desc: "Thermal power plants, HVAC, refrigeration, combustion, gas turbines, and energy auditing." },
          { num: "03", title: "Advanced Simulation & Research", desc: "CFD, thermal modelling, ANSYS & MATLAB simulations, and dissertation-based specialisation." },
          { num: "04", title: "Future Energy Technologies", desc: "Renewable energy, hydrogen and fuel cell technologies, digital twins, and AI-driven optimisation." }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Research, Certifications & Innovation", title: "Certifications, Projects", highlight: "& Innovation", para: "Complement your postgraduate education with globally recognised professional certifications in advanced simulation, digital engineering, and sustainable energy technologies." },
        certificationAssociations: [
          { isMain: true, badge: "Simulation Leader", name: "ANSYS — CFD, Heat Transfer & Multiphysics Simulation", desc: "Industry-leading simulation certification for computational fluid dynamics and multiphysics thermal analysis." },
          { isMain: false, badge: "", name: "SolidWorks Simulation", desc: "Thermal & Mechanical Analysis" },
          { isMain: false, badge: "", name: "NPTEL / SWAYAM", desc: "Advanced Thermal Engineering & Renewable Energy" },
          { isMain: false, badge: "", name: "ASHRAE Learning Programs", desc: "HVAC, Building Energy Systems & Sustainable Cooling" }
        ],
        handsOnItems: ["Frontier Research & Thesis", "Industry-Integrated Research Projects", "Computational Engineering & Digital Simulation", "Research Publications & Global Conferences", "Technology Development & Advanced Prototyping", "Sponsored Research & Consultancy Projects"]
      },
      {
        blockType: 'programDetails',
        badge: "M.Tech Thermal Engineering · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [
          { id: "usps", num: "01", label: "USPs" },
          { id: "courseOutcomes", num: "02", label: "Course Outcomes" },
          { id: "programOutcomes", num: "03", label: "Program Outcomes" },
          { id: "programSpecificOutcomes", num: "04", label: "Program Specific Outcomes" },
          { id: "programEducationalObjectives", num: "05", label: "Program Educational Objectives" }
        ],
        contents: [
          { tabId: "usps", type: "bullet", bulletItems: [
            "Future-Ready Curriculum covering Advanced Thermodynamics, Heat Transfer, CFD, Renewable Energy, Combustion, HVAC, and Hydrogen Technologies.",
            "Digital Engineering & Advanced Simulation using ANSYS, Siemens STAR-CCM+, MATLAB & Simulink, Python, and Digital Twin technologies.",
            "Research Excellence & Dissertation through interdisciplinary projects and funded research initiatives.",
            "Industry Collaboration through sponsored research, consultancy projects, internships, and plant visits.",
            "Sustainable Energy & Emerging Technologies including Hydrogen, Fuel Cells, Thermal Energy Storage, and Smart HVAC.",
            "Professional Certifications & Global Learning in CFD, Engineering Simulation, and Energy Management.",
            "Innovation, Patents & Technology Development through prototype development and startup incubation.",
            "World-Class Faculty & Research Mentorship from accomplished academicians and industry professionals.",
            "Advanced Laboratories & Research Infrastructure including CFD, combustion, and HVAC laboratories.",
            "Global Research & Academic Opportunities through SCI/Scopus-indexed publications and doctoral pathways.",
            "Career Advancement & Leadership Development through placement support and professional training.",
            "Innovation Ecosystem & Global Professional Network via ASHRAE, ISHRAE, SAE, ASME, and ISTE communities."
          ] }
        ]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Transforming Thermal Engineers", highlight: "Into Global Energy Leaders", para: "Advanced technical expertise, research excellence, and leadership capabilities for careers in clean energy, advanced manufacturing, and sustainable technologies." },
        jobs: [
          { title: "Advanced Thermal Systems Engineer", range: "" },
          { title: "CFD & Multiphysics Simulation Engineer", range: "" },
          { title: "Energy Efficiency & Sustainability Engineer", range: "" },
          { title: "Renewable Energy Systems Engineer", range: "" },
          { title: "Smart HVAC & Building Energy Engineer", range: "" },
          { title: "EV Thermal Management Engineer", range: "" },
          { title: "Aerospace Thermal Engineer", range: "" },
          { title: "Research Scientist (Thermal & Energy Systems)", range: "" }
        ],
        stats: [
          { gradient: false, number: "100%", label: "Placement Assistance" },
          { gradient: false, number: "1000+", label: "Internship Opportunities" },
          { gradient: false, number: "2 Years", label: "M.Tech Programme" },
          { gradient: false, number: "6", label: "Core Thermal Domains" }
        ]
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Pursue M.Tech Thermal", highlight: "Engineering At Tulas", para: "Preparing the next generation of energy innovators, research scientists, computational engineers, and sustainability leaders." },
        items: [
          { n: "01", title: "Future-Ready Curriculum", desc: "Advanced Thermodynamics, CFD, Renewable Energy, Combustion, HVAC, and Hydrogen Technologies built into every semester." },
          { n: "02", title: "Digital Engineering & Simulation", desc: "ANSYS, Siemens STAR-CCM+, MATLAB & Simulink, Python, and Digital Twin technologies for real-world thermal problem-solving." },
          { n: "03", title: "Research Excellence", desc: "Dissertation-based learning and interdisciplinary funded research initiatives delivering impactful engineering outcomes." },
          { n: "04", title: "Industry Collaboration", desc: "Sponsored research, consultancy projects, industrial internships, and plant visits with leading energy and manufacturing organisations." },
          { n: "05", title: "Sustainable Energy Focus", desc: "Hydrogen Energy, Fuel Cells, Solar Thermal Systems, and Carbon Capture technologies preparing graduates for the clean energy transition." },
          { n: "06", title: "Professional Certifications", desc: "Internationally recognised certifications in CFD, Simulation, and Energy Management — ANSYS, SolidWorks, NPTEL, ASHRAE, and more." },
          { n: "07", title: "Innovation & Patents", desc: "Prototype development, patent filing, and startup incubation support to turn research into real-world engineering products." },
          { n: "08", title: "World-Class Faculty", desc: "Accomplished academicians and industry professionals mentoring research, publications, and technical innovation throughout the programme." },
          { n: "09", title: "Advanced Laboratories", desc: "CFD, combustion, HVAC, and thermal testing laboratories equipped with high-performance simulation and experimental infrastructure." },
          { n: "10", title: "Global Research Opportunities", desc: "SCI/Scopus-indexed publications, international conference presentations, and clear doctoral pathways for ambitious researchers." },
          { n: "11", title: "Career Advancement", desc: "Dedicated placement support and leadership training across energy, manufacturing, and sustainable technology sectors." },
          { n: "12", title: "Global Professional Network", desc: "Active membership and connections through ASHRAE, ISHRAE, SAE, ASME, and ISTE communities and global industry partners." }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF Bank", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk IT", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assistant", "Root Analysis", "Silverspace", "Step2gen", "The Times of India"]
      }
    ]
  },
  {
    title: "M.Tech Structural Engineering",
    slug: "mtech/structural-engineering",
    program: "M.Tech",
    school: "School of Engineering & Technology",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "Home / Programs / M.Tech / Structural Engineering" },
        badge: "M.Tech · Structural Engineering · Resilient Infrastructure",
        title: "Shaping Resilient Structures For A",
        highlight: "Sustainable Tomorrow",
        description: "An industry-relevant postgraduate programme producing specialists who are not just designers, but innovators and resilience experts — blending advanced analysis, sustainability, and disaster-risk reduction with global employability.",
        chips: [
          { strong: "2-Year", label: "M.Tech Programme" },
          { strong: "", label: "Digital Twin & AI-Driven Optimisation" },
          { strong: "", label: "Structural Health Monitoring" },
          { strong: "", label: "Research & Dissertation Focus" },
          { strong: "", label: "Expert Faculty & Industry Mentorship" }
        ],
        buttons: [
          { variant: "orange", icon: null, label: "Apply Now →" },
          { variant: "white_outline", icon: null, label: "Contact Admissions" }
        ]
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 0, title: "SE", highlight: "2Y" },
        header: { label: "", title: "Where Analysis", highlight: "Meets Resilience" },
        description1: "M.Tech in Structural Engineering produces specialists who are not just designers, but innovators and resilience experts — blending advanced analysis, sustainability, and disaster-risk reduction with global employability.",
        description2: "Students build expertise across Advanced Structural Analysis, Structural Design, Earthquake and Wind Engineering, Construction Materials and Technology, and Computational Tools and Simulation — with emerging exposure to digital twins and AI/ML applications in structural engineering. Tulas Institute offers a perfect blend of advanced academics, practical learning, certifications, industry exposure, and research opportunities, making the programme a launchpad for both professional and academic excellence.",
        quote: "Shaping resilient structures for a sustainable tomorrow.",
        table: { headers: [], rows: [] }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Core Areas of Study", title: "Six Domains, One", highlight: "Structural Engineering Curriculum", para: "Every domain combines advanced theory with computational tools and simulation software." },
        cards: [
          { title: "Advanced Structural Analysis", desc: "Advanced theories of structural mechanics and analysis techniques.", pills: ["Structural Mechanics", "Analysis"] },
          { title: "Structural Design", desc: "Design of high-rise buildings, bridges, and industrial facilities.", pills: ["Structural Design", "Design Codes"] },
          { title: "Earthquake & Wind Engineering", desc: "Earthquake-resistant design and wind engineering for resilient infrastructure.", pills: ["Earthquake Engineering", "Wind Engineering"] },
          { title: "Construction Materials & Technology", desc: "Smart materials and modern construction technology.", pills: ["Materials", "Construction Tech"] },
          { title: "Computational Tools & Simulation", desc: "Software-driven structural modelling and simulation.", pills: ["Computational Tools", "Simulation"] },
          { title: "Digital Twins & AI/ML Applications", desc: "Digital twin modelling and AI-driven optimisation in structural engineering.", pills: ["Digital Twins", "AI/ML"] }
        ],
        extraCard: { title: "Built On Structural Resilience", description: "Structural Mechanics · Design Codes (IS, Eurocode, ACI) · Finite Element Modelling · Disaster Risk Reduction · Sustainable Infrastructure" },
        coreTags: ["Advanced Structural Analysis", "Structural Design", "Earthquake Engineering", "Wind Engineering", "Construction Materials", "Finite Element Modelling", "Digital Twin Modelling", "Structural Health Monitoring", "Sustainable Construction", "Disaster Risk Reduction"]
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "Digital Twins & AI-Driven Resilience" },
        header: { label: "The Differentiator", title: "Building", highlight: "Resilience Experts", para: "M.Tech in Structural Engineering produces specialists who are not just designers, but innovators and resilience experts — blending advanced analysis, sustainability, and disaster-risk reduction with global employability through digital twin modelling, AI-driven optimisation, and structural health monitoring." },
        tags: ["Digital Twin Modelling", "AI-Driven Optimisation", "Structural Health Monitoring", "Disaster Resilience", "Smart Materials", "Sustainable Construction"],
        roadmap: [
          { num: "01", title: "Year 1 — Foundation", desc: "Advanced core learning in structural mechanics, analysis, and design fundamentals." },
          { num: "02", title: "Year 1 — Applied Analysis", desc: "Earthquake and wind engineering, construction materials, and computational tools." },
          { num: "03", title: "Year 2 — Specialisation", desc: "Digital twins, AI/ML applications, and structural health monitoring." },
          { num: "04", title: "Year 2 — Research & Practice", desc: "Dissertation-based research, professional practice, and industry consultancy projects." }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Software Training", highlight: "& Certifications", para: "Exposure to cutting-edge software tools for real-world structural engineering applications." },
        certificationAssociations: [
          { isMain: true, badge: "Software Training", name: "STAAD Pro, ETABS, SAP2000, ANSYS & BIM Tools", desc: "Hands-on software training for structural simulation and modelling, applied to real-world engineering problems." },
          { isMain: false, badge: "", name: "AutoDesk / Bentley", desc: "Professional software certifications" },
          { isMain: false, badge: "", name: "LEED / IGBC", desc: "Green Building Certification Workshops" },
          { isMain: false, badge: "", name: "Design Codes", desc: "IS, Eurocode & ACI standards training" }
        ],
        handsOnItems: ["STAAD Pro / ETABS / SAP2000 Labs", "ANSYS & BIM Modelling", "Research & Dissertation", "Industry Consultancy Projects", "Publications in Reputed Journals", "Internships"]
      },
      {
        blockType: 'programDetails',
        badge: "M.Tech Structural Engineering · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [
          { id: "usps", num: "01", label: "USPs" },
          { id: "courseOutcomes", num: "02", label: "Course Outcomes" },
          { id: "programOutcomes", num: "03", label: "Program Outcomes" },
          { id: "programSpecificOutcomes", num: "04", label: "Program Specific Outcomes" },
          { id: "programEducationalObjectives", num: "05", label: "Program Educational Objectives" }
        ],
        contents: [
          { tabId: "usps", type: "bullet", bulletItems: [
            "Specialised training in advanced structural analysis, earthquake engineering, wind engineering, and finite element modelling.",
            "Exposure to cutting-edge software tools (ETABS, STAAD Pro, ANSYS, SAP2000) for real-world applications.",
            "Strong emphasis on independent research, dissertation work, and publications in reputed journals.",
            "More opportunities to innovate in areas like smart materials, sustainable construction, and resilient infrastructure.",
            "Curriculum aligned with national and international design codes (IS, Eurocode, ACI).",
            "Industry collaborations, internships, and consultancy projects that bridge academia and practice.",
            "Specialised modules on earthquake-resistant design and disaster risk reduction, aligned with national initiatives (NIDM, NDMA) for disaster management and resilience.",
            "Training that prepares graduates for global opportunities in design firms, construction companies, and research institutions.",
            "Development of leadership, project management, and communication skills for professional excellence."
          ] }
        ]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where This M.Tech", highlight: "Can Take You", para: "From structural design to disaster resilience consultancy — this degree opens routes across design firms, construction, and research." },
        jobs: [
          { title: "Structural Engineer", range: "" },
          { title: "Project / Construction Manager", range: "" },
          { title: "Research Engineer / Academician", range: "" },
          { title: "Disaster Resilience Consultant", range: "" },
          { title: "Product Development / Simulation Engineer", range: "" },
          { title: "Government Sector Engineer", range: "" },
          { title: "Entrepreneur / Consultant", range: "" }
        ],
        stats: [
          { gradient: false, number: "₹29 LPA", label: "Highest Indicative (Metros)" },
          { gradient: false, number: "100%", label: "Placement Assistance" },
          { gradient: false, number: "2 Years", label: "M.Tech Programme" },
          { gradient: false, number: "6", label: "Core Structural Domains" }
        ]
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Pursue M.Tech Structural", highlight: "Engineering At Tulas", para: "A perfect blend of advanced academics, practical learning, certifications, industry exposure, and research opportunities." },
        items: [
          { n: "01", title: "Advanced Analysis Training", desc: "Specialised training in structural analysis, earthquake, and wind engineering." },
          { n: "02", title: "Industry-Standard Software", desc: "ETABS, STAAD Pro, ANSYS, SAP2000, and BIM tools for real-world applications." },
          { n: "03", title: "Research & Publications", desc: "Independent research, dissertation work, and publication in reputed journals." },
          { n: "04", title: "Global Design Codes", desc: "Curriculum aligned with IS, Eurocode, and ACI international standards." },
          { n: "05", title: "Industry Collaboration", desc: "Internships and consultancy projects bridging academia and practice." },
          { n: "06", title: "Disaster Resilience Focus", desc: "Modules aligned with NIDM and NDMA national resilience initiatives." },
          { n: "07", title: "Digital Twin & AI Applications", desc: "Structural health monitoring and AI-driven optimisation exposure." },
          { n: "08", title: "Green Building Certification", desc: "LEED and IGBC certification workshops built into the programme." },
          { n: "09", title: "Global Career Readiness", desc: "Training for opportunities in design firms, construction companies, and research institutions worldwide." }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF Bank", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk IT", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assistant", "Root Analysis", "Silverspace", "Step2gen", "The Times of India"]
      }
    ]
  },
  {
    title: "B.Com (Hons.)",
    slug: "bcom-hons",
    program: "B.Com (Hons)",
    school: "School of Commerce",
    sections: [
      {
        blockType: 'hero',
        breadcrumb: { currentRoute: "Home / Programs / B.Com (Hons.)" },
        badge: "B.Com (Hons.) · NAAC A+",
        title: "Build Your Future In",
        highlight: "Commerce & Finance",
        description: "A comprehensive, three-year undergraduate degree affiliated with Sri Dev Suman Uttarakhand University, preparing students for managerial roles across accounting, banking, finance, and insurance — and a strong launchpad for professional qualifications like CA and CS.",
        chips: [
          { strong: "3-Year", label: "UG Programme" },
          { strong: "", label: "UGC Recognised" },
          { strong: "", label: "Industry Certifications" },
          { strong: "", label: "CA/CS Foundation-Ready" },
          { strong: "", label: "100% Placement Support" }
        ],
        buttons: [
          { variant: "orange", icon: null, label: "Apply Now →" },
          { variant: "white_outline", icon: null, label: "Contact Admissions" }
        ]
      },
      {
        blockType: 'overview',
        imageCard: { changeDesign: 0, title: "BCOM", highlight: "3Y" },
        header: { label: "", title: "Where Commerce", highlight: "Meets Career" },
        description1: "The Bachelor of Commerce (Hons.) programme at Tulas offers a comprehensive, well-rounded curriculum designed to prepare students for managerial roles across multiple sectors.",
        description2: "A specialised, three-year undergraduate degree, B.Com (Hons.) equips students with comprehensive knowledge and skills in accounting, commerce, banking, finance, and insurance — preparing them for a wide range of career paths in both the private and public sectors, and particularly advantageous for those aiming for professional certifications like Chartered Accountancy (CA) and Company Secretaryship (CS). The programme provides essential knowledge, practical skills, and diverse career opportunities, making it an ideal choice for those interested in business, finance, and commerce, and a strong starting point for further professional qualifications in accounting, finance, and corporate law.",
        quote: "Comprehend and apply principles from every field of trade — building core competence in commerce, ethical business practice, and global business awareness.",
        table: {
          headers: ["Course", "Duration", "Eligibility"],
          rows: [
            { program: "B.Com (Hons.)", duration: "3 Years", eligibility: "Passed XII or equivalent in any discipline from a recognised Board/Council/University, with at least 45% marks (40% for SC/ST category)." }
          ]
        }
      },
      {
        blockType: 'coursesGrid',
        header: { label: "Choose Your Path", title: "Two Ways To", highlight: "Study Commerce", para: "Both pathways build a strong commerce foundation — choose the depth of specialisation that fits your goals." },
        cards: [
          { title: "B.Com (Hons.)", desc: "A specialised, in-depth three-year degree with a research component and greater focus on accounting, finance, and analytical rigour — the stronger foundation for CA, CS, and postgraduate study.", pills: ["Research Component", "CA/CS Foundation", "Advanced Accounting"] },
          { title: "B.Com", desc: "A broad-based three-year commerce degree covering accounting, business law, taxation, and finance — ideal for students seeking wide-ranging commerce fundamentals and flexibility across career paths.", pills: ["Broad-Based", "Core Commerce", "Flexible Careers"] }
        ],
        extraCard: { title: "", description: "" },
        coreTags: ["Financial Accounting", "Corporate Law", "Business Statistics", "Banking & Insurance", "Income Tax", "Cost Accounting", "Business Economics", "Auditing", "Financial Management", "Entrepreneurship"]
      },
      {
        blockType: 'aiSection',
        image: { placeholder: "Professional Skill-Building" },
        header: { label: "The Differentiator", title: "Building Core", highlight: "Commerce Competence", para: "The programme is built around clear objectives: comprehending and applying principles from every field of trade, discussing and implementing commerce concepts and procedures, and using professional literature to sharpen research, communication, and presentation skills — promoting ethical, sustainable business practice and global business awareness alongside entrepreneurial and managerial competencies." },
        tags: ["Financial Analysis", "Taxation", "Corporate Governance", "Business Research", "Global Business Awareness", "Entrepreneurship", "Ethical Business Practice"],
        roadmap: [
          { num: "01", title: "Year 1", desc: "Foundations in accounting, business law, and economics." },
          { num: "02", title: "Year 2", desc: "Cost accounting, taxation, and business statistics applied to real cases." },
          { num: "03", title: "Year 3", desc: "Financial management, auditing, corporate law, and a research/capstone project." },
          { num: "04", title: "Beyond", desc: "CA/CS foundation readiness, higher studies, or direct industry entry." }
        ]
      },
      {
        blockType: 'certifications',
        header: { label: "Practical Learning", title: "Certifications", highlight: "& Projects", para: "Practical, tool-based skill-building that makes graduates job-ready and CA/CS-exam-ready." },
        certificationAssociations: [
          { isMain: true, badge: "Professional Pathway", name: "CA / CS Foundation-Ready Curriculum", desc: "A curriculum designed to give students a strong head start toward Chartered Accountancy and Company Secretaryship qualifications." },
          { isMain: false, badge: "", name: "Tally & GST", desc: "Accounting software certification" },
          { isMain: false, badge: "", name: "Advanced Excel", desc: "Financial modelling skills" },
          { isMain: false, badge: "", name: "NISM", desc: "Stock market & securities certification" },
          { isMain: false, badge: "", name: "Digital Banking", desc: "Fintech & banking operations" }
        ],
        handsOnItems: ["Accounting Software Labs", "Business Case Studies", "Industry Visits", "Research Project", "Guest Lectures & Expert Sessions", "Internship Programme"]
      },
      {
        blockType: 'programDetails',
        badge: "B.Com (Hons.) · Academic Framework",
        title: "Program",
        highlight: "Details",
        tabs: [
          { id: "usps", num: "01", label: "USPs" },
          { id: "courseOutcomes", num: "02", label: "Course Outcomes" },
          { id: "programOutcomes", num: "03", label: "Program Outcomes" },
          { id: "programSpecificOutcomes", num: "04", label: "Program Specific Outcomes" },
          { id: "programEducationalObjectives", num: "05", label: "Program Educational Objectives" }
        ],
        contents: [
          { tabId: "usps", type: "bullet", bulletItems: [
            "UGC-recognised, three-year degree affiliated with Sri Dev Suman Uttarakhand University.",
            "Comprehensive curriculum spanning accounting, banking, finance, and insurance.",
            "Strong foundation for professional qualifications such as CA and CS.",
            "Practical skill-building through accounting software, case studies, and industry visits.",
            "Focus on ethical and sustainable business practice alongside technical competence.",
            "Emphasis on global business awareness and entrepreneurial competency.",
            "Research and presentation skills built through professional literature and projects.",
            "Dedicated placement support across the final year of the programme.",
            "Choice between B.Com and B.Com (Hons.) to match career goals."
          ] }
        ]
      },
      {
        blockType: 'careers',
        header: { label: "Career Outcomes", title: "Where This B.Com", highlight: "Can Take You", para: "From accounting and banking to CA/CS practice — this degree opens routes across finance and corporate roles." },
        jobs: [
          { title: "Accountant", range: "" },
          { title: "Financial Analyst", range: "" },
          { title: "Bank PO / Officer", range: "" },
          { title: "Tax Consultant", range: "" },
          { title: "Auditor", range: "" },
          { title: "Insurance Advisor", range: "" },
          { title: "Investment Analyst", range: "" },
          { title: "CA / CS Aspirant", range: "" }
        ],
        stats: [
          { gradient: false, number: "100%", label: "Placement Assistance" },
          { gradient: false, number: "750+", label: "Recruiters" },
          { gradient: false, number: "2", label: "Pathways — B.Com & B.Com (Hons.)" },
          { gradient: false, number: "3 Years", label: "UG Programme" }
        ]
      },
      {
        blockType: 'whyStudy',
        header: { label: "The Tulas Advantage", title: "Why Study B.Com", highlight: "At Tulas Institute", para: "A commerce degree engineered for real career outcomes — professional exams, corporate roles, or entrepreneurship." },
        items: [
          { n: "01", title: "UGC-Recognised Degree", desc: "Affiliated with Sri Dev Suman Uttarakhand University, a state government university." },
          { n: "02", title: "CA/CS Foundation-Ready", desc: "A curriculum designed to give a head start toward professional accounting qualifications." },
          { n: "03", title: "Industry Certifications", desc: "Tally, GST, Advanced Excel, and NISM certifications aligned to coursework." },
          { n: "04", title: "Two Pathways", desc: "Choose between B.Com and B.Com (Hons.) to match your career goals." },
          { n: "05", title: "Practical Skill-Building", desc: "Accounting software labs, case studies, and industry visits throughout the programme." },
          { n: "06", title: "Ethical Business Focus", desc: "A curriculum promoting ethical and sustainable business practices." },
          { n: "07", title: "Placement Readiness", desc: "Dedicated placement support across the final year of the programme." },
          { n: "08", title: "Global Business Awareness", desc: "Preparing graduates for an interconnected global commercial environment." },
          { n: "09", title: "Higher Studies Ready", desc: "A strong foundation for M.Com, MBA, and professional accounting qualifications." }
        ]
      },
      {
        blockType: 'recruiters',
        title: "The Leading",
        highlight: "Recruiters",
        subtitle: "Trusted by leading organizations across technology, consulting, manufacturing and emerging tech.",
        logos1: ["Academor", "Amazon Web Services", "Artech", "BMW", "Cywarden", "ESAF Bank", "Glowlogics", "Grant Thornton", "Hikeedu", "Intel", "Movidu", "Prodesk IT", "Relinns Technologies", "Siemens", "Stellaraa Edu Tech", "Talbros", "Verizon"],
        logos2: ["Acxiom Consulting", "Arrise", "ASC International", "CK (Calvin Klein)", "Easemytrip", "Fitelo", "Google", "Hero", "HSBC", "Learning Routes", "MWIDM", "Reality Assistant", "Root Analysis", "Silverspace", "Step2gen", "The Times of India"]
      }
    ]
  }
]

// =======================================================================
// Bulk-create runner
// =======================================================================
const allCourses = [...batch1, ...batch2, ...batch3, ...batch4, ...batch5, ...batch6, ...batch7]

async function run() {
  const payload = await getPayload({ config })

  let created = 0
  let skipped = 0

  for (const course of allCourses) {
    const existing = await payload.find({
      collection: 'courses',
      where: { slug: { equals: course.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`SKIP (already exists): ${course.slug}`)
      skipped++
      continue
    }

    try {
      await payload.create({
        collection: 'courses',
        data: {
          ...course,
          status: 'draft',
        },
      })
      console.log(`CREATED (draft): ${course.slug}`)
      created++
    } catch (err) {
      console.error(`FAILED: ${course.slug} —`, err instanceof Error ? err.message : err)
    }
  }

  console.log(`\nDone. Created ${created}, skipped ${skipped} (already existed), out of ${allCourses.length} total.`)
  process.exit(0)
}

run()
