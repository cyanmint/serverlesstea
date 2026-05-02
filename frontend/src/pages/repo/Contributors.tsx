import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RepoHeader from '../../components/RepoHeader'
import { getCommits } from '../../api/client'

interface ContribEntry { author: string; commits: number }

export default function RepoContributors() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const [contributors, setContributors] = useState<ContribEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username || !repo) return
    getCommits(username, repo, 'HEAD')
      .then(r => {
        const map: Record<string, number> = {}
        for (const c of r.commits) {
          const name = c.author.name
          map[name] = (map[name] ?? 0) + 1
        }
        const sorted = Object.entries(map).map(([author, commits]) => ({ author, commits }))
        sorted.sort((a, b) => b.commits - a.commits)
        setContributors(sorted)
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [username, repo])

  const max = contributors[0]?.commits ?? 1

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2 style={{ marginBottom: '1rem' }}>Contributors</h2>
        {loading && <div className="page-loading">Loading…</div>}
        {error && <div className="alert alert-error">{error}</div>}
        {!loading && !error && contributors.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No contributors yet.</p>}
        {contributors.map(c => (
          <div key={c.author} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
            <span style={{ width: '140px', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.author}</span>
            <div style={{ flex: 1, height: '12px', background: 'var(--bg-secondary)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${(c.commits / max) * 100}%`, height: '100%', background: 'var(--color-accent, #0075ca)', borderRadius: '4px' }} />
            </div>
            <span style={{ width: '60px', textAlign: 'right', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{c.commits} commit{c.commits !== 1 ? 's' : ''}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
