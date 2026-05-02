import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'
import { getCommits } from '../../../api/client'

export default function WikiRevision() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const [commits, setCommits] = useState<Array<{ oid: string; message: string; author: { name: string; timestamp: number } }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!username || !repo) return
    getCommits(username, repo, 'main')
      .then(r => setCommits(r.commits.slice(0, 20)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [username, repo])

  if (loading) return <div className="page-loading">Loading…</div>

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0 }}>Wiki Revision History</h2>
          <Link to={`/${username}/${repo}/wiki`} className="btn btn-sm">← Back to Wiki</Link>
        </div>
        {commits.length === 0 ? (
          <div className="empty-placeholder"><p>No revision history available.</p></div>
        ) : (
          <div>
            {commits.map(c => (
              <div key={c.oid} style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '1rem' }}>
                <code style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{c.oid.slice(0, 7)}</code>
                <span>{c.message.split('\n')[0]}</span>
                <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{c.author.name} · {new Date(c.author.timestamp * 1000).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
