import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RepoHeader from '../../components/RepoHeader'
import { getCommits } from '../../api/client'

export default function RepoPulse() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const [stats, setStats] = useState<{ commits: number; authors: number; period: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username || !repo) return
    getCommits(username, repo, 'HEAD')
      .then(r => {
        const week = Date.now() / 1000 - 7 * 24 * 60 * 60
        const recent = r.commits.filter(c => c.author.timestamp > week)
        const authors = new Set(recent.map(c => c.author.name)).size
        setStats({ commits: recent.length, authors, period: 'last 7 days' })
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [username, repo])

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2 style={{ marginBottom: '1rem' }}>Pulse</h2>
        {loading && <div className="page-loading">Loading…</div>}
        {error && <div className="alert alert-error">{error}</div>}
        {stats && (
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px', minWidth: '160px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700 }}>{stats.commits}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>commits ({stats.period})</div>
            </div>
            <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: '8px', minWidth: '160px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700 }}>{stats.authors}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>active contributors</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
