// SAVE THIS FILE TO: src/lib/mapCmsCourseData.js  (in tulas_rev)
// (create the "lib" folder inside src/ if it doesn't exist)
//
// Converts the CMS's `sections` array (array of blocks, each with a
// blockType) into the exact nested object shape that skeleton.jsx's
// ECEPage/Hero/Overview/etc. components expect, e.g. { hero: {...},
// overview: {...}, courses: {...}, ... }
//
// DEFENSIVE BY DESIGN: skeleton.jsx renders all 9 sections unconditionally,
// so every key below always comes back as a real object/array — never
// undefined — even if you haven't added that block in the CMS yet. That
// section will just render blank/empty instead of crashing the page while
// you're still filling content in.

export function mapCmsCourseToPageData(sections = []) {
  const byType = {}
  sections.forEach((s) => {
    byType[s.blockType] = s
  })

  const hero = byType.hero || {}
  const overview = byType.overview || {}
  const coursesGrid = byType.coursesGrid || {}
  const aiSection = byType.aiSection || {}
  const certifications = byType.certifications || {}
  const programDetails = byType.programDetails || {}
  const careers = byType.careers || {}
  const whyStudy = byType.whyStudy || {}
  const recruiters = byType.recruiters || {}

  return {
    hero: {
      breadcrumb: hero.breadcrumb || { currentRoute: '' },
      badge: hero.badge || '',
      title: hero.title || '',
      highlight: hero.highlight || '',
      description: hero.description || '',
      chips: hero.chips || [],
      buttons: hero.buttons || [],
    },

    overview: {
      imageCard: overview.imageCard || {},
      header: overview.header || {},
      description1: overview.description1 || '',
      description2: overview.description2 || '',
      quote: overview.quote || '',
      table: overview.table || { headers: [], rows: [] },
    },

    // NOTE: CMS block is called "coursesGrid" but skeleton.jsx reads data.courses
    courses: {
      header: coursesGrid.header || {},
      cards: coursesGrid.cards || [],
      extraCard: coursesGrid.extraCard || {},
      coreTags: coursesGrid.coreTags || [],
    },

    aiSection: {
      image: aiSection.image || {},
      header: aiSection.header || {},
      tags: aiSection.tags || [],
      roadmap: aiSection.roadmap || [],
    },

    certifications: {
      header: certifications.header || {},
      certificationAssociations: certifications.certificationAssociations || [],
      handsOnItems: certifications.handsOnItems || [],
    },

    programDetails: {
      badge: programDetails.badge || '',
      title: programDetails.title || '',
      highlight: programDetails.highlight || '',
      tabs: programDetails.tabs || [],
      contents: mapProgramDetailsContents(programDetails.contents || []),
    },

    careers: {
      header: careers.header || {},
      jobs: careers.jobs || [],
      stats: careers.stats || [],
    },

    whyStudy: {
      header: whyStudy.header || {},
      items: whyStudy.items || [],
    },

    recruiters: {
      title: recruiters.title || '',
      highlight: recruiters.highlight || '',
      subtitle: recruiters.subtitle || '',
      logos1: recruiters.logos1 || [],
      logos2: recruiters.logos2 || [],
    },
  }
}

// Converts the flat "contents" array (tabId + type + one of
// bulletItems/labeledItems/tableHeaders+tableRows) back into the
// tabId-keyed object skeleton.jsx expects: { usps: {...}, co: {...}, ... }
function mapProgramDetailsContents(contentsArray) {
  const contents = {}

  contentsArray.forEach((c) => {
    if (c.type === 'bullet') {
      contents[c.tabId] = { type: 'bullet', items: c.bulletItems || [] }
    } else if (c.type === 'bulletWithLabels') {
      contents[c.tabId] = {
        type: 'bulletWithLabels',
        items: (c.labeledItems || []).map((li) => ({ label: li.label, text: li.text })),
      }
    } else if (c.type === 'table') {
      contents[c.tabId] = {
        type: 'table',
        headers: c.tableHeaders || [],
        rows: (c.tableRows || []).map((r) => r.cells || []),
      }
    }
  })

  return contents
}