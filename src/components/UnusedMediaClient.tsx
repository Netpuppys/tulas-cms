'use client'

import { Button, ConfirmationModal, toast, useConfig, useModal } from '@payloadcms/ui'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import type { UnusedMediaItem } from '../lib/unusedMedia'

const MODAL_SLUG = 'unused-media-confirm'

type DeleteResponse = {
  deleted: number
  skipped: string[]
  failed: Array<{ id: string; message: string }>
  remaining: string[]
  message?: string
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const styles = {
  header: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 8 },
  actions: { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 },
  hint: { color: 'var(--theme-elevation-600)', margin: '0 0 24px', maxWidth: 720 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, paddingBottom: 48 },
  thumb: { width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block', background: 'var(--theme-elevation-100)' },
  fileBox: { width: '100%', aspectRatio: '4 / 3', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--theme-elevation-100)', color: 'var(--theme-elevation-600)', fontSize: 13, fontWeight: 600 },
  meta: { padding: '8px 10px', fontSize: 12, lineHeight: 1.4 },
  name: { fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  sub: { color: 'var(--theme-elevation-600)' },
  checkbox: { position: 'absolute', top: 8, left: 8, width: 18, height: 18, cursor: 'pointer' },
  empty: { padding: '48px 0', textAlign: 'center', color: 'var(--theme-elevation-600)' },
} satisfies Record<string, React.CSSProperties>

export default function UnusedMediaClient() {
  const { config } = useConfig()
  const { openModal } = useModal()
  const apiRoute = `${config.serverURL ?? ''}${config.routes.api}`

  const [items, setItems] = useState<UnusedMediaItem[] | null>(null)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [loadError, setLoadError] = useState<string | null>(null)
  // What the open confirmation dialog is about to delete, and how far along it is.
  const [pending, setPending] = useState<{ ids: string[]; label: string } | null>(null)
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null)

  const load = useCallback(async () => {
    setItems(null)
    setLoadError(null)
    try {
      const res = await fetch(`${apiRoute}/unused-media`, { credentials: 'include' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || 'Request failed')
      setItems(json.docs as UnusedMediaItem[])
      setSelected(new Set())
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Could not load unused media.')
      setItems([])
    }
  }, [apiRoute])

  useEffect(() => {
    void load()
  }, [load])

  const allIds = useMemo(() => (items ?? []).map((m) => m.id), [items])
  const allSelected = allIds.length > 0 && selected.size === allIds.length

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const ask = (ids: string[], label: string) => {
    setPending({ ids, label })
    setProgress(null)
    openModal(MODAL_SLUG)
  }

  // The server only deletes as many as fit in one request and returns the
  // rest as `remaining`, so keep sending until nothing is left.
  const runDelete = async () => {
    if (!pending) return
    const total = pending.ids.length
    let queue = pending.ids
    let deleted = 0
    let skipped = 0
    const failures: string[] = []
    setProgress({ done: 0, total })

    while (queue.length > 0) {
      let json: DeleteResponse
      try {
        const res = await fetch(`${apiRoute}/unused-media/delete`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: queue }),
        })
        json = await res.json()
        if (!res.ok) throw new Error(json.message || 'Request failed')
      } catch (err) {
        failures.push(err instanceof Error ? err.message : 'Request failed')
        break
      }
      deleted += json.deleted
      skipped += json.skipped.length
      failures.push(...json.failed.map((f) => f.message))
      setProgress({ done: total - json.remaining.length, total })
      // Guard against a stuck loop if the server made no progress at all.
      if (json.remaining.length >= queue.length) break
      queue = json.remaining
    }

    if (deleted > 0) toast.success(`Deleted ${deleted} unused ${deleted === 1 ? 'file' : 'files'}.`)
    if (skipped > 0) toast.info(`${skipped} ${skipped === 1 ? 'file was' : 'files were'} attached somewhere in the meantime and kept.`)
    if (failures.length > 0) toast.error(`${failures.length} could not be deleted: ${failures[0]}`)

    setPending(null)
    setProgress(null)
    await load()
  }

  const count = items?.length ?? 0

  return (
    <div>
      <div style={styles.header}>
        <h1 style={{ margin: 0 }}>Unused Media{items ? ` (${count})` : ''}</h1>
        <div style={styles.actions}>
          <Button
            buttonStyle="secondary"
            size="medium"
            disabled={count === 0}
            onClick={() => setSelected(allSelected ? new Set() : new Set(allIds))}
          >
            {allSelected ? 'Clear selection' : 'Select all'}
          </Button>
          <Button
            buttonStyle="secondary"
            size="medium"
            disabled={selected.size === 0}
            onClick={() => ask([...selected], `${selected.size} selected ${selected.size === 1 ? 'file' : 'files'}`)}
          >
            Delete selected{selected.size > 0 ? ` (${selected.size})` : ''}
          </Button>
          <Button
            buttonStyle="error"
            size="medium"
            disabled={count === 0}
            onClick={() => ask(allIds, `all ${count} unused ${count === 1 ? 'file' : 'files'}`)}
          >
            Empty trash
          </Button>
        </div>
      </div>

      <p style={styles.hint}>
        Files that aren&apos;t attached to any course, article, event, placement, blog post or other content. Check
        this list before emptying the trash: an image you uploaded a moment ago and haven&apos;t attached yet also
        shows up here.
      </p>

      {loadError && <p style={{ color: 'var(--theme-error-500)' }}>{loadError}</p>}

      {items === null && <p style={styles.empty}>Checking which media is in use…</p>}

      {items !== null && count === 0 && !loadError && <p style={styles.empty}>No unused media. Everything is in use.</p>}

      {count > 0 && (
        <div style={styles.grid}>
          {items!.map((media) => {
            const isImage = media.mimeType.startsWith('image/')
            const isSelected = selected.has(media.id)
            return (
              <label
                key={media.id}
                style={{
                  position: 'relative',
                  display: 'block',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  borderRadius: 4,
                  background: 'var(--theme-elevation-50)',
                  border: `2px solid ${isSelected ? 'var(--theme-success-500)' : 'var(--theme-elevation-150)'}`,
                }}
              >
                <input type="checkbox" style={styles.checkbox} checked={isSelected} onChange={() => toggle(media.id)} />
                {isImage ? (
                  <img src={media.url} alt={media.alt} loading="lazy" style={styles.thumb} />
                ) : (
                  <div style={styles.fileBox}>{(media.filename.split('.').pop() || 'FILE').toUpperCase()}</div>
                )}
                <div style={styles.meta}>
                  <div style={styles.name} title={media.filename}>
                    {media.filename}
                  </div>
                  <div style={styles.sub}>
                    {formatSize(media.filesize)} · {new Date(media.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </label>
            )
          })}
        </div>
      )}

      <ConfirmationModal
        modalSlug={MODAL_SLUG}
        heading="Permanently delete media?"
        body={
          <>
            This will permanently delete {pending?.label ?? 'these files'}, including the copies stored in S3. This
            cannot be undone.
          </>
        }
        confirmLabel="Delete permanently"
        confirmingLabel={progress ? `Deleting ${progress.done} / ${progress.total}…` : 'Deleting…'}
        onConfirm={runDelete}
        onCancel={() => setPending(null)}
      />
    </div>
  )
}
