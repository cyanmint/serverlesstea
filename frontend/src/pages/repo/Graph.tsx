import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RepoHeader from '../../components/RepoHeader'
import { getCommits } from '../../api/client'

export default function RepoGraph() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const [timeline, setTimeline] = useState<Array<{ date: string; count: number }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username || !repo) return
    getCommits(username, repo, 'HEAD')
      .then(r => {
        const map: Record<string, number> = {}
        for (const c of r.commits) {
          const d = new Date(c.author.timestamp * 1000).toISOString().slice(0, 10)
          map[d] = (map[d] ?? 0) + 1
        }
        const sorted = Object.entries(map).map(([date, count]) => ({ date, count })).sort((a, b) => a.date.localeCompare(b.date)).slice(-30)
        setTimeline(sorted)
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [username, repo])

  const max = Math.max(...timeline.map(t => t.count), 1)

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2 style={{ marginBottom: '1rem' }}>Commit Graph (last 30 days with activity)</h2>
        {loading && <div className="page-loading">Loading…</div>}
        {error && <div className="alert alert-error">{error}</div>}
        {!loading && !error && timeline.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No commits yet.</p>}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '80px', marginTop: '1rem' }}>
          {timeline.map(t => (
            <div key={t.date} title={`${t.date}: ${t.count} commit${t.count !== 1 ? 's' : ''}`}
              style={{ flex: 1, height: `${(t.count / max) * 100}%`, minHeight: '4px', background: 'var(--color-accent, #0075ca)', borderRadius: '2px 2px 0 0', cursor: 'default' }} />
          ))}
        </div>
        {timeline.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            <span>{timeline[0].date}</span><span>{timeline[timeline.length - 1].date}</span>
          </div>
        )}
      </div>
    </div>
  )
}
