import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'
import { listReleases, getCurrentUser, type Release } from '../../../api/client'

export default function ReleaseList() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const [releases, setReleases] = useState<Release[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const currentUser = getCurrentUser()

  useEffect(() => {
    if (!username || !repo) return
    listReleases(username, repo)
      .then(r => setReleases(r.releases))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load releases'))
      .finally(() => setLoading(false))
  }, [username, repo])

  if (loading) return <div className="page-loading">Loading…</div>

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0 }}>Releases</h2>
          {currentUser?.username === username && (
            <Link to={`/${username}/${repo}/releases/new`} className="btn btn-primary btn-sm">New Release</Link>
          )}
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        {releases.length === 0 ? (
          <div className="empty-placeholder">
            <span style={{ fontSize: '3rem' }}>🏷️</span>
            <h2>No releases yet</h2>
            {currentUser?.username === username && <p><Link to={`/${username}/${repo}/releases/new`}>Create the first release</Link></p>}
          </div>
        ) : (
          <div>
            {releases.map(r => (
              <div key={r.id} style={{ padding: '1.25rem 0', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>{r.name}</span>
                  <code style={{ padding: '0.15rem 0.4rem', background: 'var(--bg-tertiary)', borderRadius: '4px', fontSize: '0.85rem' }}>{r.tag_name}</code>
                  {r.is_draft === 1 && <span style={{ padding: '0.15rem 0.4rem', background: '#e6a817', color: '#fff', borderRadius: '4px', fontSize: '0.75rem' }}>Draft</span>}
                  {r.is_prerelease === 1 && <span style={{ padding: '0.15rem 0.4rem', background: '#8250df', color: '#fff', borderRadius: '4px', fontSize: '0.75rem' }}>Pre-release</span>}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  by {r.creator_username} · {new Date(r.created_at).toLocaleDateString()}
                </div>
                {r.body && <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{r.body}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
