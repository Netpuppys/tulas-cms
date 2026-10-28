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
    beforeOperation: [
      ({ args, operation }) => {
        // Password resets by email are only allowed for the super admin;
        // everyone else has to ask them to change it.
        if (
          operation === 'forgotPassword' &&
          args.data?.email?.toLowerCase() !== SUPER_ADMIN_EMAIL
        ) {
          throw new Forbidden()
        }
        return args
      },
    ],
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
    // Not stored - Payload's admin UI reads this field's access to decide
    // whether to show the "Change Password" button on a user. Create stays
    // open so new users can still be given a password.
    {
      name: 'password',
      type: 'text',
      virtual: true,
      hidden: true,
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
    },
  ],
}
