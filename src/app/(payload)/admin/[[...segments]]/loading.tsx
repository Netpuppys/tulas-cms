// Shown by Next.js automatically while the admin page below is loading its
// data - covers every admin route (the Media list, a media item, any other
// collection, the dashboard), not just Media, since they all render through
// this same catch-all route. Without this, navigating anywhere in the admin
// panel while the shared free-tier database is briefly slow just looks like
// a frozen/blank screen; this gives the editor a clear "it's working" signal
// instead. Uses Payload's own theme CSS variables so it matches light/dark
// mode automatically and needs no extra styling to stay in sync.
export default function AdminLoading() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        background: 'var(--theme-bg)',
      }}
    >
      <img
        src="/tulas-footer-logo.png"
        alt=""
        style={{
          height: '32px',
          width: 'auto',
          maxWidth: '160px',
          objectFit: 'contain',
          opacity: 0.9,
        }}
      />
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: '3px solid var(--theme-elevation-150)',
          borderTopColor: 'var(--theme-success-500)',
          animation: 'tulas-admin-spin 0.7s linear infinite',
        }}
      />
      <p
        style={{
          margin: 0,
          fontSize: '13px',
          color: 'var(--theme-elevation-500)',
        }}
      >
        Loading…
      </p>
      <style>{`
        @keyframes tulas-admin-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
