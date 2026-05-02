import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDashboardMilestones, Milestone } from '../../../api/client'

type DashMilestone = Milestone & { repo_name: string; repo_owner: string }

export default function DashboardMilestones() {
  const [milestones, setMilestones] = useState<DashMilestone[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getDashboardMilestones()
      .then((d) => setMilestones(d.milestones))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page-content">
      <h1>Milestones</h1>
      {error && <div className="alert alert-error">{error}</div>}
      {loading ? (
        <div className="page-loading">Loading…</div>
      ) : milestones.length === 0 ? (
        <p className="empty-placeholder">No milestones found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {milestones.map((m) => {
            const total = (m.open_issues ?? 0) + (m.closed_issues ?? 0)
            const pct = total > 0 ? Math.round(((m.closed_issues ?? 0) / total) * 100) : 0
            return (
              <li key={m.id} style={{ padding: '1rem 0', borderBottom: '1px solid #e0e0e0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <Link to={`/${m.repo_owner}/${m.repo_name}/milestones/${m.id}`}>
                      <strong>{m.title}</strong>
                    </Link>
                    <span style={{ marginLeft: '0.75rem', fontSize: '0.8rem', color: '#888' }}>
                      <Link to={`/${m.repo_owner}/${m.repo_name}`}>{m.repo_owner}/{m.repo_name}</Link>
                    </span>
                  </div>
                  <span style={{ fontSize: '0.8rem', color: m.state === 'open' ? 'green' : '#888' }}>{m.state}</span>
                </div>
                {m.due_date && (
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.2rem' }}>
                    Due: {new Date(m.due_date).toLocaleDateString()}
                  </div>
                )}
                <div style={{ marginTop: '0.4rem' }}>
                  <div style={{ background: '#e0e0e0', borderRadius: '4px', height: '6px', width: '100%' }}>
                    <div style={{ background: '#4caf50', width: `${pct}%`, height: '6px', borderRadius: '4px' }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#666' }}>
                    {pct}% complete · {m.open_issues ?? 0} open · {m.closed_issues ?? 0} closed
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
