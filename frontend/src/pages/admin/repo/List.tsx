import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getCurrentUser, adminListRepos } from '../../../api/client'

interface Repo { id: string; name: string; description: string | null; is_private: number; owner_username: string; created_at: string }

export default function AdminRepoList() {
  const navigate = useNavigate()
  const [repos, setRepos] = useState<Repo[]>([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!getCurrentUser()?.isAdmin) { navigate('/'); return }
    adminListRepos()
      .then(r => setRepos(r.repos))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [navigate])

  const filtered = q ? repos.filter(r => `${r.owner_username}/${r.name}`.toLowerCase().includes(q.toLowerCase())) : repos

  return (
    <div className="page">
      <h2 style={{ marginBottom: '1rem' }}>All Repositories ({repos.length})</h2>
      {loading && <div className="page-loading">Loading…</div>}
      {error && <div className="alert alert-error">{error}</div>}
      {!loading && !error && (
        <>
          <input type="search" placeholder="Filter by owner/name…" value={q} onChange={e => setQ(e.target.value)}
            style={{ marginBottom: '1rem', padding: '0.4rem 0.75rem', border: '1px solid var(--border-color)', borderRadius: '6px', width: '100%', maxWidth: '360px' }} />
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem' }}>Repository</th>
                <th style={{ padding: '0.5rem' }}>Visibility</th>
                <th style={{ padding: '0.5rem' }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.5rem' }}>
                    <Link to={`/${r.owner_username}/${r.name}`} style={{ color: 'var(--color-accent)', fontWeight: 500 }}>{r.owner_username}/{r.name}</Link>
                    {r.description && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.description}</div>}
                  </td>
                  <td style={{ padding: '0.5rem', fontSize: '0.85rem' }}>{r.is_private ? '🔒 Private' : '🌐 Public'}</td>
                  <td style={{ padding: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{new Date(r.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
