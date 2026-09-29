import type { Access } from 'payload'

// Logged-in admins see everything (drafts included). Public API requests
// only get published docs — without this, an "unpublished" doc (status
// draft) is still returned by the REST/GraphQL API and stays live on the
// website. Docs saved before drafts were enabled have no _status, so they
// are treated as published.
export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true
  return {
    or: [{ _status: { equals: 'published' } }, { _status: { exists: false } }],
  }
}
