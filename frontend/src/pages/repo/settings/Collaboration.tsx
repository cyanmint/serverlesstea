import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'
import { listCollaborators, addCollaborator, removeCollaborator, type Collaborator } from '../../../api/client'

export default function RepoCollaboration() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    if (!username || !repo) return
    listCollaborators(username, repo)
      .then(r => setCollaborators(r.collaborators))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load collaborators'))
      .finally(() => setLoading(false))
  }, [username, repo])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!username || !repo || !newUsername.trim()) return
    setAdding(true)
    try {
      await addCollaborator(username, repo, newUsername)
      setCollaborators(prev => [...prev, { user_id: '', username: newUsername, role: 'read' }])
      setNewUsername('')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to add collaborator')
    } finally {
      setAdding(false)
    }
  }

  async function handleRemove(collab: Collaborator) {
    if (!username || !repo) return
    try {
      await removeCollaborator(username, repo, collab.username)
      setCollaborators(prev => prev.filter(c => c.username !== collab.username))
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to remove collaborator')
    }
  }

  if (loading) return <div className="page-loading">Loading…</div>

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content" style={{ maxWidth: '600px' }}>
        <h2 style={{ marginBottom: '1rem' }}>Collaborators</h2>
        {error && <div className="alert alert-error" style={{ marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <input
            type="text"
            value={newUsername}
            onChange={e => setNewUsername(e.target.value)}
            placeholder="Username"
            style={{ flex: 1, padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
          />
          <button type="submit" className="btn btn-primary btn-sm" disabled={adding || !newUsername.trim()}>
            {adding ? 'Adding…' : 'Add Collaborator'}
          </button>
        </form>
        {collaborators.length === 0 ? (
          <div className="empty-placeholder"><p>No collaborators yet.</p></div>
        ) : (
          <div>
            {collaborators.map(c => (
              <div key={c.username} style={{ display: 'flex', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ flex: 1 }}>{c.username}</span>
                <span style={{ color: 'var(--text-muted)', marginRight: '1rem', fontSize: '0.85rem' }}>{c.role}</span>
                <button className="btn btn-sm" style={{ color: 'red' }} onClick={() => handleRemove(c)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
