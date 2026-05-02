import { useEffect, useState } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'
import { listMilestones, type Milestone } from '../../../api/client'

export default function IssueMilestones() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const [searchParams] = useSearchParams()
  const state = searchParams.get('state') ?? 'open'
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username || !repo) return
    listMilestones(username, repo, state)
      .then(r => setMilestones(r.milestones))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load milestones'))
      .finally(() => setLoading(false))
  }, [username, repo, state])

  if (loading) return <div className="page-loading">Loading…</div>

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to={`/${username}/${repo}/milestones?state=open`} className={`btn btn-sm ${state === 'open' ? 'btn-primary' : ''}`}>Open</Link>
            <Link to={`/${username}/${repo}/milestones?state=closed`} className={`btn btn-sm ${state === 'closed' ? 'btn-primary' : ''}`}>Closed</Link>
          </div>
          <Link to={`/${username}/${repo}/milestones/new`} className="btn btn-primary btn-sm">New Milestone</Link>
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        {milestones.length === 0 ? (
          <div className="empty-placeholder">
            <span style={{ fontSize: '3rem' }}>🎯</span>
            <h2>No {state} milestones</h2>
            <p><Link to={`/${username}/${repo}/milestones/new`}>Create a milestone</Link> to track progress.</p>
          </div>
        ) : (
          <div>
            {milestones.map(m => {
              const total = (m.open_issues ?? 0) + (m.closed_issues ?? 0)
              const pct = total > 0 ? Math.round(((m.closed_issues ?? 0) / total) * 100) : 0
              return (
                <div key={m.id} style={{ padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Link to={`/${username}/${repo}/milestone/${m.id}`} style={{ fontWeight: 600 }}>{m.title}</Link>
                    {m.due_date && <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Due {new Date(m.due_date).toLocaleDateString()}</span>}
                  </div>
                  {m.description && <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0' }}>{m.description}</p>}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <div style={{ flex: 1, height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: '#2ea44f', borderRadius: '4px' }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{pct}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
