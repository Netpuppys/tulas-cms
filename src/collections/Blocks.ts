import type { Block, Field } from 'payload'

/**
 * Rebuilt to match the REAL prop shapes destructured in
 * components/pages/ECEPage.jsx (the "skeleton" the dev shared).
 * Each block's fields = exactly what `data.<sectionName>` needs to be
 * for that section's sub-component. E.g. the "hero" block's fields
 * become `data.hero` when the page does <Hero data={data.hero} />.
 *
 * IMPORTANT — render pattern changed:
 * ECEPage.jsx does <Hero data={data.hero} />, i.e. ONE `data` prop,
 * not spread props. So the generic dynamic route must render each
 * section as:
 *   <Component key={section.id ?? i} data={section} />
 * NOT <Component {...section} /> like the earlier render-example.tsx
 * assumed. Update that file when you wire this in for real.
 */

// Reusable "label / title / highlight / para" header group used by
// Courses, AISection, Certifications, Careers, WhyStudy sections.
const sectionHeaderFields = (includePara = true): Field[] => [
  { name: 'label', type: 'text' },
  { name: 'title', type: 'text' },
  { name: 'highlight', type: 'text' },
  ...(includePara ? [{ name: 'para', type: 'textarea' } as Field] : []),
]

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      name: 'breadcrumb',
      type: 'group',
      fields: [{ name: 'currentRoute', type: 'text', required: true }],
    },
    { name: 'badge', type: 'text' },
    { name: 'title', type: 'text', required: true },
    { name: 'highlight', type: 'text' },
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'image',
      type: 'text',
      label: 'Background image URL',
      admin: {
        description:
          'Full-bleed hero background photo, rendered under the existing gradient tint. Takes priority over the upload field below. Leave both empty for gradient-only (current default look).',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Background image upload',
      admin: { description: 'Upload a hero background photo — only used if the Background image URL above is empty.' },
    },
    {
      name: 'chips',
      type: 'array',
      label: 'Quick stat chips',
      fields: [
        { name: 'strong', type: 'text', label: 'Bold prefix (optional)' },
        { name: 'label', type: 'text', required: true },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'CTA buttons',
      fields: [
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'orange_anim',
          admin: { description: 'Must match a variant the Button component actually supports.' },
          options: [
            { label: 'Orange (solid)', value: 'orange' },
            { label: 'Orange (bordered)', value: 'orange_b' },
            { label: 'Orange (animated) — main CTA', value: 'orange_anim' },
            { label: 'White outline', value: 'white_outline' },
            { label: 'White outline (bold border)', value: 'white_outline_b2' },
            { label: 'White outline (animated) — secondary CTA', value: 'white_outline_anim' },
            { label: 'Black (animated)', value: 'black_anim' },
          ],
        },
        { name: 'icon', type: 'text', admin: { description: 'e.g. "IoCall" — must match an icon name the component recognizes' } },
        { name: 'label', type: 'text', required: true },
        {
          name: 'url',
          type: 'text',
          label: 'Link URL',
          admin: { description: 'e.g. "/apply-now" or "https://tulas.edu.in/contact". Leave empty for a non-functional button.' },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open in new tab',
        },
      ],
    },
  ],
}

export const OverviewBlock: Block = {
  slug: 'overview',
  labels: { singular: 'Overview', plural: 'Overviews' },
  fields: [
    {
      name: 'imageCard',
      type: 'group',
      fields: [
        { name: 'changeDesign', type: 'number', defaultValue: 3 },
        { name: 'title', type: 'text' },
        { name: 'highlight', type: 'textarea', admin: { description: 'Use line breaks for multi-line highlight text' } },
        {
          name: 'imageUrl',
          type: 'text',
          label: 'Photo URL',
          admin: { description: 'Photo shown in this card. Takes priority over the upload field below. Leave both empty and the card shows without a photo.' },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Optional photo upload — only used if the Photo URL above is empty.' },
        },
      ],
    },
    {
      name: 'header',
      type: 'group',
      fields: sectionHeaderFields(false),
    },
    { name: 'description1', type: 'textarea' },
    { name: 'description2', type: 'textarea' },
    { name: 'quote', type: 'text' },
    {
      name: 'table',
      type: 'group',
      fields: [
        { name: 'headers', type: 'text', hasMany: true },
        {
          name: 'rows',
          type: 'array',
          fields: [
            { name: 'program', type: 'text', required: true },
            { name: 'duration', type: 'text' },
            { name: 'eligibility', type: 'text' },
          ],
        },
      ],
    },
  ],
}

export const CoursesGridBlock: Block = {
  slug: 'coursesGrid',
  labels: { singular: 'Courses / Core Areas Grid', plural: 'Courses / Core Areas Grids' },
  fields: [
    { name: 'header', type: 'group', fields: sectionHeaderFields(true) },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'textarea' },
        { name: 'pills', type: 'text', hasMany: true },
      ],
    },
    {
      name: 'extraCard',
      type: 'group',
      label: 'Trailing highlight card',
      fields: [
        { name: 'title', type: 'textarea', admin: { description: 'Use line breaks for multi-line title' } },
        { name: 'description', type: 'textarea' },
      ],
    },
    { name: 'coreTags', type: 'text', hasMany: true, label: 'Core learning area tags' },
  ],
}

// NOTE: Likely CS/ECE-specific — probably won't apply to every course.
// Confirm with your dev whether this should be renamed to something generic for other programs.
export const AISectionBlock: Block = {
  slug: 'aiSection',
  labels: { singular: 'AI / Emerging Tech Section', plural: 'AI / Emerging Tech Sections' },
  fields: [
    {
      name: 'image',
      type: 'group',
      fields: [
        { name: 'placeholder', type: 'textarea', admin: { description: 'Multi-line placeholder text shown inside the visual block (used only if no photo URL/upload is set below)' } },
        {
          name: 'url',
          type: 'text',
          label: 'Photo URL',
          admin: { description: 'Real photo — if set, replaces the placeholder box with this image. Takes priority over the upload field below.' },
        },
        { name: 'alt', type: 'text', label: 'Photo alt text' },
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Optional real photo upload — only used if the Photo URL above is empty' },
        },
      ],
    },
    { name: 'header', type: 'group', fields: sectionHeaderFields(true) },
    { name: 'tags', type: 'text', hasMany: true },
    {
      name: 'roadmap',
      type: 'array',
      fields: [
        { name: 'num', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'textarea' },
      ],
    },
  ],
}

export const CertificationsBlock: Block = {
  slug: 'certifications',
  labels: { singular: 'Certifications & Hands-On', plural: 'Certifications & Hands-On' },
  fields: [
    { name: 'header', type: 'group', fields: sectionHeaderFields(true) },
    {
      name: 'certificationAssociations',
      type: 'array',
      fields: [
        { name: 'isMain', type: 'checkbox', label: 'Featured / main association' },
        { name: 'badge', type: 'text', admin: { condition: (_, siblingData) => Boolean(siblingData?.isMain) } },
        { name: 'name', type: 'text', required: true },
        { name: 'desc', type: 'textarea' },
      ],
    },
    {
      name: 'handsOnItems',
      type: 'text',
      hasMany: true,
      label: 'Hands-on learning list',
      admin: {
        description: 'Currently rendered as plain strings — flag with your dev if these should support icons/images later.',
      },
    },
  ],
}

// Each tab carries its own content directly — no more matching a separate
// "contents" entry to a tab by a hand-typed ID. Payload gives every array
// row its own internal id automatically, which is what the frontend keys
// off of now, so there's nothing for an editor to type or keep in sync.
export const ProgramDetailsBlock: Block = {
  slug: 'programDetails',
  labels: { singular: 'Program Details (Tabs)', plural: 'Program Details' },
  fields: [
    { name: 'badge', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'highlight', type: 'text' },
    {
      name: 'tabs',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Tab', plural: 'Tabs' },
      fields: [
        { name: 'num', type: 'text', admin: { description: 'e.g. "01" — shown as a small badge next to the tab label.' } },
        { name: 'label', type: 'text', required: true },
        {
          name: 'type',
          type: 'select',
          required: true,
          label: 'Content type',
          options: [
            { label: 'Bullet list', value: 'bullet' },
            { label: 'Bullet list with labels', value: 'bulletWithLabels' },
            { label: 'Table', value: 'table' },
          ],
        },
        {
          name: 'bulletItems',
          type: 'text',
          hasMany: true,
          admin: { condition: (_, siblingData) => siblingData?.type === 'bullet' },
        },
        {
          name: 'labeledItems',
          type: 'array',
          admin: { condition: (_, siblingData) => siblingData?.type === 'bulletWithLabels' },
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'text', type: 'text', required: true },
          ],
        },
        {
          name: 'tableHeaders',
          type: 'text',
          hasMany: true,
          admin: { condition: (_, siblingData) => siblingData?.type === 'table' },
        },
        {
          name: 'tableRows',
          type: 'array',
          admin: { condition: (_, siblingData) => siblingData?.type === 'table' },
          fields: [{ name: 'cells', type: 'text', hasMany: true }],
        },
      ],
    },
  ],
}

export const CareersBlock: Block = {
  slug: 'careers',
  labels: { singular: 'Careers', plural: 'Careers' },
  fields: [
    { name: 'header', type: 'group', fields: sectionHeaderFields(true) },
    {
      name: 'jobs',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'range', type: 'text', admin: { description: 'e.g. salary range' } },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'gradient', type: 'checkbox', label: 'Use accent color card style' },
        { name: 'number', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}

export const WhyStudyBlock: Block = {
  slug: 'whyStudy',
  labels: { singular: 'Why Study', plural: 'Why Study' },
  fields: [
    { name: 'header', type: 'group', fields: sectionHeaderFields(true) },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'n', type: 'text', label: 'Number label (e.g. "01")' },
        { name: 'title', type: 'text', required: true },
        { name: 'desc', type: 'textarea' },
      ],
    },
  ],
}

// NOTE: Current code renders these as plain text name cards, not logo images —
// confirm with your dev whether the final version should switch to media uploads.
export const RecruitersBlock: Block = {
  slug: 'recruiters',
  labels: { singular: 'Recruiters Marquee', plural: 'Recruiters Marquees' },
  fields: [
    { name: 'title', type: 'text' },
    { name: 'highlight', type: 'text' },
    { name: 'subtitle', type: 'text' },
    { name: 'logos1', type: 'text', hasMany: true, label: 'Row 1 names' },
    { name: 'logos2', type: 'text', hasMany: true, label: 'Row 2 names' },
  ],
}

export const CourseBlocks: Block[] = [
  HeroBlock,
  OverviewBlock,
  CoursesGridBlock,
  AISectionBlock,
  CertificationsBlock,
  ProgramDetailsBlock,
  CareersBlock,
  WhyStudyBlock,
  RecruitersBlock,
]