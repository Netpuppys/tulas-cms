'use client'

// Custom field for the "Fee Table" block's `htmlContent` field (see
// Blocks.ts). Deliberately does NOT go through Payload's upload system at
// all — no Media collection, no S3, no server round trip until the editor
// hits the normal course-page Save button.
//
// Why: the previous design uploaded the .html file as a Media doc (so it
// could be fetched back and copied into this field via a server hook).
// That path went through Payload's file-type restriction check, its S3
// storage plugin, and a custom upload-concurrency guard — three server-side
// systems that had nothing to do with what this feature actually needs,
// and one of them (the concurrency guard) was the direct cause of the
// browser freeze editors ran into. Reading the file with the browser's own
// FileReader API removes all three: the file's text becomes this field's
// value entirely on the client, and it's saved to MongoDB the exact same
// way any other text field on this page is — as part of the course
// document itself, with nothing separate to upload, store, or fetch back.
import React, { useState } from 'react'
import { useField } from '@payloadcms/ui'

export default function FeeHtmlPickerField() {
  const { value, setValue } = useField<string>()
  const [fileName, setFileName] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    // Reset here so picking the exact same filename again later (e.g. a
    // re-exported fee sheet) still fires a fresh read — browsers don't emit
    // another `change` event otherwise.
    e.target.value = ''
    if (!file) return

    setError('')
    const reader = new FileReader()
    reader.onload = () => {
      const text = typeof reader.result === 'string' ? reader.result : ''
      setValue(text)
      setFileName(file.name)
    }
    reader.onerror = () => {
      setError('Could not read that file. Please try again or pick a different .html file.')
    }
    reader.readAsText(file)
  }

  return (
    <div className="field-type" style={{ marginBottom: '1.5rem' }}>
      <label style={{ display: 'block', marginBottom: 6, fontWeight: 600 }}>
        HTML file
      </label>
      <p style={{ fontSize: 13, color: 'var(--theme-elevation-500)', marginTop: 0, marginBottom: 8 }}>
        Choose an .html file containing the fee table (e.g. exported from Excel as a web page). Its
        contents are copied into the box below immediately — nothing is uploaded or stored as a
        separate file. Re-choose the file any time the fees change, then save the page as normal.
      </p>
      <input type="file" accept=".html,.htm,text/html" onChange={handleFile} />
      {fileName && (
        <p style={{ fontSize: 13, marginTop: 6, marginBottom: 0 }}>
          Loaded <strong>{fileName}</strong> ({(value || '').length.toLocaleString()} characters).
        </p>
      )}
      {error && (
        <p style={{ fontSize: 13, marginTop: 6, marginBottom: 0, color: 'var(--theme-error-500)' }}>
          {error}
        </p>
      )}
      <textarea
        readOnly
        rows={10}
        value={value || ''}
        placeholder="Extracted HTML will appear here after you choose a file above."
        style={{
          width: '100%',
          fontFamily: 'monospace',
          fontSize: 12,
          marginTop: 10,
          resize: 'vertical',
        }}
      />
    </div>
  )
}
