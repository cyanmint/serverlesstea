import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RepoHeader from '../../components/RepoHeader'
import { getCommits } from '../../api/client'

export default function RepoCodeFrequency() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const [weekly, setWeekly] = useState<Array<{ week: string; commits: number }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username || !repo) return
    getCommits(username, repo, 'HEAD')
      .then(r => {
        const map: Record<string, number> = {}
        for (const c of r.commits) {
          const d = new Date(c.author.timestamp * 1000)
          const mon = new Date(d)
          mon.setDate(d.getDate() - ((d.getDay() + 6) % 7))
          const key = mon.toISOString().slice(0, 10)
          map[key] = (map[key] ?? 0) + 1
        }
        const sorted = Object.entries(map).map(([week, commits]) => ({ week, commits })).sort((a, b) => a.week.localeCompare(b.week)).slice(-12)
        setWeekly(sorted)
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [username, repo])

  const max = Math.max(...weekly.map(w => w.commits), 1)

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2 style={{ marginBottom: '1rem' }}>Code Frequency (commits per week)</h2>
        {loading && <div className="page-loading">Loading…</div>}
        {error && <div className="alert alert-error">{error}</div>}
        {!loading && !error && weekly.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No data yet.</p>}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '100px', marginTop: '1rem' }}>
          {weekly.map(w => (
            <div key={w.week} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div title={`${w.week}: ${w.commits}`}
                style={{ width: '100%', height: `${(w.commits / max) * 80}px`, minHeight: '4px', background: 'var(--color-accent, #0075ca)', borderRadius: '2px 2px 0 0' }} />
              <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: '100%' }}>{w.week.slice(5)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
