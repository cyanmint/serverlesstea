import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'
import { listTags, type Branch } from '../../../api/client'

export default function TagList() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const [tags, setTags] = useState<Branch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username || !repo) return
    listTags(username, repo)
      .then(r => setTags(r.tags))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load tags'))
      .finally(() => setLoading(false))
  }, [username, repo])

  if (loading) return <div className="page-loading">Loading…</div>

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2 style={{ marginBottom: '1rem' }}>Tags</h2>
        {error && <div className="alert alert-error">{error}</div>}
        {tags.length === 0 ? (
          <div className="empty-placeholder"><p>No tags yet.</p></div>
        ) : (
          <div>
            {tags.map(t => (
              <div key={t.name} style={{ display: 'flex', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid var(--border-color)', gap: '1rem' }}>
                <span style={{ flex: 1, fontWeight: 500 }}>🏷️ {t.name}</span>
                {t.commit_sha && <code style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.commit_sha.slice(0, 7)}</code>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
