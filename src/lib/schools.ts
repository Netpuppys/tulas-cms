// Shared list of schools/departments, used by both Courses.ts (the
// `department` field that drives the header nav grouping) and Events.ts
// (the `school` field that scopes an event to a whole school's courses).
// Keeping one source of truth avoids the two lists drifting apart or a
// value typo breaking the match between an event's `school` and a
// course's `department`.
export const SCHOOL_OPTIONS = [
  { label: 'School Of Management & Commerce', value: 'School Of Management & Commerce' },
  { label: 'School Of Engineering', value: 'School Of Engineering' },
  { label: 'School Of Computer Applications', value: 'School Of Computer Applications' },
  { label: 'School Of Mass Comm. & Journalism', value: 'School Of Mass Comm. & Journalism' },
  { label: 'School Of Pharmacy', value: 'School Of Pharmacy' },
  { label: 'School Of Law', value: 'School Of Law' },
  { label: 'School Of Agriculture', value: 'School Of Agriculture' },
] as const
