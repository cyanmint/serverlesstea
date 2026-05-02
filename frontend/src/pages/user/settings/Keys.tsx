import { useEffect, useState } from 'react'
import { listSshKeys, addSshKey, deleteSshKey, type SshKey } from '../../../api/client'

export default function Keys() {
  const [keys, setKeys] = useState<SshKey[]>([])
  const [title, setTitle] = useState('')
  const [keyText, setKeyText] = useState('')
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

  function loadKeys() {
    setLoading(true)
    listSshKeys()
      .then(r => setKeys(r.keys))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadKeys() }, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !keyText.trim()) return
    setAdding(true); setMsg(''); setError('')
    try {
      await addSshKey(title.trim(), keyText.trim())
      setMsg('SSH key added.'); setTitle(''); setKeyText(''); loadKeys()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to add key')
    } finally { setAdding(false) }
  }

  async function handleDelete(id: string, keyTitle: string) {
    if (!confirm(`Delete key "${keyTitle}"?`)) return
    try {
      await deleteSshKey(id)
      setMsg('Key deleted.'); loadKeys()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete key')
    }
  }

  return (
    <div className="page">
      <h2 style={{ marginBottom: '1rem' }}>SSH Keys</h2>
      {msg && <div className="alert alert-success">{msg}</div>}
      {error && <div className="alert alert-error">{error}</div>}
      {loading && <div className="page-loading">Loading…</div>}
      {!loading && keys.length === 0 && <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>No SSH keys added yet.</p>}
      {keys.map(k => (
        <div key={k.id} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>{k.title}</div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-muted)', wordBreak: 'break-all', marginTop: '0.25rem' }}>{k.key_type} {k.fingerprint}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>Added {new Date(k.created_at).toLocaleDateString()}</div>
          </div>
          <button onClick={() => handleDelete(k.id, k.title)} className="btn btn-danger" style={{ fontSize: '0.8rem' }}>Delete</button>
        </div>
      ))}
      <section style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Add SSH Key</h3>
        <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '520px' }}>
          <div className="form-group">
            <label>Title <span style={{ color: 'red' }}>*</span></label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required placeholder="My laptop" />
          </div>
          <div className="form-group">
            <label>Key <span style={{ color: 'red' }}>*</span></label>
            <textarea rows={5} value={keyText} onChange={e => setKeyText(e.target.value)} required placeholder="ssh-ed25519 AAAA..." style={{ fontFamily: 'monospace', fontSize: '0.85rem', resize: 'vertical' }} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={adding}>{adding ? 'Adding…' : 'Add Key'}</button>
        </form>
      </section>
    </div>
  )
}
