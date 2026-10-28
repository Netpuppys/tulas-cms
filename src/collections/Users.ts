import type { Access, CollectionConfig } from 'payload'
import { Forbidden } from 'payload'

// The main authorized account. Only this user can change passwords
// (their own or anyone else's) and delete users.
export const SUPER_ADMIN_EMAIL = 'silky@netpuppys.com'

const isSuperAdmin = (user: { email?: string } | null | undefined) =>
  user?.email?.toLowerCase() === SUPER_ADMIN_EMAIL

const superAdminOnly: Access = ({ req }) => isSuperAdmin(req.user)

// Super admin can edit anyone; everyone else can only edit their own account.
const superAdminOrSelf: Access = ({ req }) => {
  if (!req.user) return false
  if (isSuperAdmin(req.user)) return true
  return { id: { equals: req.user.id } }
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    update: superAdminOrSelf,
    delete: superAdminOnly,
  },
  hooks: {
    beforeChange: [
      ({ data, operation, originalDoc, req }) => {
        // No req.user means a server-side script (local API); access
        // control already rejects anonymous API requests.
        if (operation !== 'update' || !req.user || isSuperAdmin(req.user)) return data

        if (data.password) {
          throw new Forbidden(req.t)
        }
        // Stop anyone from renaming the super admin account away (or
        // another account into it) to take over its privileges.
        if (data.email && data.email.toLowerCase() !== originalDoc?.email?.toLowerCase()) {
          if (isSuperAdmin(originalDoc) || data.email.toLowerCase() === SUPER_ADMIN_EMAIL) {
            throw new Forbidden(req.t)
          }
        }
        return data
      },
    ],
    beforeDelete: [
      async ({ id, req }) => {
        // The super admin account itself can never be deleted.
        const doc = await req.payload.findByID({ collection: 'users', id, depth: 0, req })
        if (isSuperAdmin(doc)) throw new Forbidden(req.t)
      },
    ],
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
