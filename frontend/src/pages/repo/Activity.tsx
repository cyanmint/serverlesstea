import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RepoHeader from '../../components/RepoHeader'
import { getCommits } from '../../api/client'

interface Commit { oid: string; message: string; author: { name: string; timestamp: number } }

export default function RepoActivity() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const [commits, setCommits] = useState<Commit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username || !repo) return
    getCommits(username, repo, 'HEAD')
      .then(r => setCommits(r.commits.slice(0, 30)))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [username, repo])

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2 style={{ marginBottom: '1rem' }}>Recent Activity</h2>
        {loading && <div className="page-loading">Loading…</div>}
        {error && <div className="alert alert-error">{error}</div>}
        {!loading && !error && commits.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No activity yet.</p>}
        {commits.map(c => (
          <div key={c.oid} style={{ display: 'flex', gap: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid var(--border-color)', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '1.1rem' }}>📝</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>{c.message.split('\n')[0]}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {c.author.name} · {new Date(c.author.timestamp * 1000).toLocaleDateString()}
                <code style={{ marginLeft: '0.5rem', fontSize: '0.75rem' }}>{c.oid.slice(0, 7)}</code>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
