import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'
import { listLabels, createLabel, deleteLabel, getCurrentUser, type Label } from '../../../api/client'

export default function IssueLabels() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const [labels, setLabels] = useState<Label[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newName, setNewName] = useState('')
  const [newColor, setNewColor] = useState('#0075ca')
  const [newDesc, setNewDesc] = useState('')
  const [creating, setCreating] = useState(false)
  const currentUser = getCurrentUser()
  const isOwner = currentUser?.username === username

  useEffect(() => {
    if (!username || !repo) return
    listLabels(username, repo)
      .then(r => setLabels(r.labels))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load labels'))
      .finally(() => setLoading(false))
  }, [username, repo])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!username || !repo || !newName.trim()) return
    setCreating(true)
    try {
      const res = await createLabel(username, repo, { name: newName, color: newColor, description: newDesc || undefined })
      setLabels(prev => [...prev, { id: res.id, repo_id: '', name: newName, color: newColor, description: newDesc || null }])
      setNewName(''); setNewColor('#0075ca'); setNewDesc('')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create label')
    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(id: string) {
    if (!username || !repo) return
    try {
      await deleteLabel(username, repo, id)
      setLabels(prev => prev.filter(l => l.id !== id))
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete label')
    }
  }

  if (loading) return <div className="page-loading">Loading…</div>

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2 style={{ marginBottom: '1rem' }}>Labels</h2>
        {error && <div className="alert alert-error" style={{ marginBottom: '1rem' }}>{error}</div>}

        {isOwner && (
          <form onSubmit={handleCreate} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Name *</label>
              <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Label name" required style={{ padding: '0.4rem', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Color</label>
              <input type="color" value={newColor} onChange={e => setNewColor(e.target.value)} style={{ height: '32px', padding: '0.2rem', border: '1px solid var(--border-color)', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Description</label>
              <input type="text" value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Optional" style={{ padding: '0.4rem', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
            </div>
            <button type="submit" className="btn btn-primary btn-sm" disabled={creating || !newName.trim()}>
              {creating ? 'Creating…' : 'Create Label'}
            </button>
          </form>
        )}

        {labels.length === 0 ? (
          <div className="empty-placeholder">
            <span style={{ fontSize: '2rem' }}>🏷️</span>
            <p>No labels yet.</p>
          </div>
        ) : (
          <div>
            {labels.map(label => (
              <div key={label.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ display: 'inline-block', padding: '0.25rem 0.6rem', borderRadius: '999px', background: label.color, color: '#fff', fontSize: '0.85rem', fontWeight: 500 }}>
                  {label.name}
                </span>
                {label.description && <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{label.description}</span>}
                {isOwner && (
                  <button className="btn btn-sm" style={{ marginLeft: 'auto', color: 'red' }} onClick={() => handleDelete(label.id)}>Delete</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
