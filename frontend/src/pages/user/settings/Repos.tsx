import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listRepos } from '../../../api/client'

interface Repo { id: string; name: string; description: string | null; is_private: number; owner_username: string; created_at: string }

export default function SettingsRepos() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    listRepos()
      .then(r => setRepos(r.repos))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page">
      <h2 style={{ marginBottom: '1rem' }}>Your Repositories</h2>
      {loading && <div className="page-loading">Loading…</div>}
      {error && <div className="alert alert-error">{error}</div>}
      {!loading && !error && repos.length === 0 && (
        <div className="empty-placeholder">
          <p>You have no repositories yet.</p>
          <Link to="/repo/create" className="btn btn-primary">New Repository</Link>
        </div>
      )}
      {repos.map(r => (
        <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.65rem 0', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ flex: 1 }}>
            <Link to={`/${r.owner_username}/${r.name}`} style={{ fontWeight: 600, color: 'var(--color-accent)' }}>{r.owner_username}/{r.name}</Link>
            {r.description && <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{r.description}</div>}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-secondary)', padding: '0.15rem 0.5rem', borderRadius: '4px' }}>
            {r.is_private ? '🔒 Private' : '🌐 Public'}
          </span>
          <Link to={`/${r.owner_username}/${r.name}/settings`} style={{ fontSize: '0.8rem', color: 'var(--color-accent)' }}>Settings</Link>
        </div>
      ))}
    </div>
  )
}
