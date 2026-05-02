import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getCurrentUser, adminGetUser, adminUpdateUser } from '../../../api/client'

interface UserDetail { id: string; username: string; email: string; display_name: string | null; bio: string | null; is_admin: number; created_at: string }

export default function AdminUserViewDetails() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [user, setUser] = useState<UserDetail | null>(null)
  const [repos, setRepos] = useState<Array<{ id: string; name: string; is_private: number }>>([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!getCurrentUser()?.isAdmin) { navigate('/'); return }
    if (!id) return
    adminGetUser(id)
      .then(r => { setUser(r.user); setIsAdmin(!!r.user.is_admin); setRepos(r.repos) })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [navigate, id])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!id) return
    setSaving(true); setMsg(''); setError('')
    try {
      await adminUpdateUser(id, { is_admin: isAdmin })
      setMsg('User updated.')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally { setSaving(false) }
  }

  if (loading) return <div className="page-loading">Loading…</div>
  if (!user) return <div className="page"><div className="alert alert-error">{error || 'User not found'}</div></div>

  return (
    <div className="page">
      <h2 style={{ marginBottom: '1rem' }}>{user.username}</h2>
      {msg && <div className="alert alert-success">{msg}</div>}
      {error && <div className="alert alert-error">{error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem 2rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</div>
        <div><strong>Display Name:</strong> {user.display_name ?? '—'}</div>
        <div><strong>Bio:</strong> {user.bio ?? '—'}</div>
      </div>
      <form onSubmit={handleSave} style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer' }}>
          <input type="checkbox" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
          Site Admin
        </label>
        <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
      </form>
      <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Repositories ({repos.length})</h3>
      {repos.map(r => (
        <div key={r.id} style={{ padding: '0.3rem 0', borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
          <Link to={`/${user.username}/${r.name}`} style={{ color: 'var(--color-accent)' }}>{user.username}/{r.name}</Link>
          <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.is_private ? '🔒' : '🌐'}</span>
        </div>
      ))}
    </div>
  )
}
