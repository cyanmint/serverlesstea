import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDashboardIssues, Issue } from '../../../api/client'

type DashIssue = Issue & { repo_name: string; repo_owner: string }

export default function DashboardIssues() {
  const [issues, setIssues] = useState<DashIssue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<'your_repositories' | 'assigned' | 'created_by'>('your_repositories')

  useEffect(() => {
    setLoading(true)
    getDashboardIssues(filter)
      .then((d) => setIssues(d.issues))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [filter])

  return (
    <div className="page-content">
      <h1>Issues</h1>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {(['your_repositories', 'assigned', 'created_by'] as const).map((f) => (
          <button
            key={f}
            className={`btn${filter === f ? ' btn-primary' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'your_repositories' ? 'Your Repos' : f === 'assigned' ? 'Assigned' : 'Created by You'}
          </button>
        ))}
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      {loading ? (
        <div className="page-loading">Loading…</div>
      ) : issues.length === 0 ? (
        <p className="empty-placeholder">No issues found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {issues.map((issue) => (
            <li key={issue.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid #e0e0e0' }}>
              <div>
                <Link to={`/${issue.repo_owner}/${issue.repo_name}/issues/${issue.number}`}>
                  <strong>{issue.title}</strong>
                </Link>
                <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: issue.state === 'open' ? 'green' : '#888', border: '1px solid currentColor', borderRadius: '10px', padding: '0 6px' }}>
                  {issue.state}
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.2rem' }}>
                <Link to={`/${issue.repo_owner}/${issue.repo_name}`}>{issue.repo_owner}/{issue.repo_name}</Link>
                {' '}#{issue.number} · {new Date(issue.created_at).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
