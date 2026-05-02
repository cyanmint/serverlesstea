import { useEffect, useState } from 'react'
import { listSshKeys, addSshKey, deleteSshKey, SshKey } from '../../../api/client'

export default function KeysSsh() {
  const [keys, setKeys] = useState<SshKey[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [keyContent, setKeyContent] = useState('')
  const [addError, setAddError] = useState('')
  const [adding, setAdding] = useState(false)

  function loadKeys() {
    setLoading(true)
    listSshKeys()
      .then((d) => setKeys(d.keys))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load keys'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadKeys() }, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setAddError('')
    setAdding(true)
    try {
      await addSshKey(title, keyContent)
      setTitle('')
      setKeyContent('')
      loadKeys()
    } catch (err) {
      setAddError(err instanceof Error ? err.message : 'Failed to add key')
    } finally {
      setAdding(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this SSH key?')) return
    try {
      await deleteSshKey(id)
      setKeys((prev) => prev.filter((k) => k.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete key')
    }
  }

  return (
    <div className="page-content">
      <h2>SSH Keys</h2>
      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="page-loading">Loading…</div>
      ) : keys.length === 0 ? (
        <p className="empty-placeholder">No SSH keys added yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Title</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Added</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((k) => (
              <tr key={k.id} style={{ borderTop: '1px solid #e0e0e0' }}>
                <td style={{ padding: '0.5rem' }}>{k.title}</td>
                <td style={{ padding: '0.5rem' }}>{new Date(k.created_at).toLocaleDateString()}</td>
                <td style={{ padding: '0.5rem' }}>
                  <button className="btn btn-sm" onClick={() => handleDelete(k.id)} style={{ color: 'red' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>Add SSH Key</h3>
      {addError && <div className="alert alert-error">{addError}</div>}
      <form onSubmit={handleAdd}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. My Laptop" />
        </div>
        <div className="form-group">
          <label>Key</label>
          <textarea value={keyContent} onChange={(e) => setKeyContent(e.target.value)} required rows={4} placeholder="ssh-rsa AAAA..." style={{ width: '100%', fontFamily: 'monospace' }} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={adding}>{adding ? 'Adding…' : 'Add Key'}</button>
      </form>
    </div>
  )
}
