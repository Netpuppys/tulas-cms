import type { GlobalConfig } from 'payload'

// The "Best University in Dehradun" SEO content block on the homepage - the
// always-visible intro card plus everything that appears after "Read More".
// This used to be hardcoded in tulas_rev's home.jsx; moved here as a Global
// (not a Collection) because there's only ever exactly one of these — it's
// a single section of one page, not a repeatable list of documents.
//
// `intro` / `more` are plain richText editors (not the earlier array-of-
// paragraphs / array-of-sections / array-of-FAQs design) - the SEO editor
// who owns this content wants to just write and format freely (headings,
// bold, bullet lists) the way a normal document editor works, not navigate
// nested repeatable field groups for every paragraph and bullet.
export const HomeIntro: GlobalConfig = {
  slug: 'home-intro',
  label: 'Homepage: About Tulas (SEO)',
  access: {
    read: () => true,
  },
  admin: {
    description:
      'The "Best University in Dehradun" SEO block on the homepage — "Intro" always shows, "More" only appears once a visitor clicks "Read More".',
  },
  fields: [
    { name: 'title', type: 'text', defaultValue: 'Best University in Dehradun: ', required: true },
    { name: 'highlight', type: 'text', defaultValue: 'Tulas University', required: true },
    {
      name: 'intro',
      type: 'richText',
      label: 'Intro (always visible)',
      required: true,
      admin: { description: "The paragraph(s) shown before \"Read More\" is clicked. Use '/' for headings, lists, etc." },
    },
    {
      name: 'more',
      type: 'richText',
      label: 'More (shown after Read More)',
      admin: { description: 'Everything else — extra paragraphs, sections, FAQs, whatever - write it freely, it all appears once "Read More" is clicked.' },
    },
    {
      name: 'credentials',
      type: 'text',
      hasMany: true,
      label: 'Credential badges',
      admin: { description: 'e.g. "UGC 2(f)", "AICTE", "NAAC A+" — shown as pills along the bottom of the card.' },
    },
  ],
}
