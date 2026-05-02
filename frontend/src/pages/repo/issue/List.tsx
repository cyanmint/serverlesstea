import { useEffect, useState } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'
import { listIssues, getCurrentUser, type Issue } from '../../../api/client'

export default function IssueList() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const state = searchParams.get('state') ?? 'open'
  const type = searchParams.get('type') ?? 'issues'
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const currentUser = getCurrentUser()

  useEffect(() => {
    if (!username || !repo) return
    setLoading(true)
    listIssues(username, repo, { state, type })
      .then(res => setIssues(res.issues))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load issues'))
      .finally(() => setLoading(false))
  }, [username, repo, state, type])

  const repoBase = `/${username}/${repo}`

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className={`btn btn-sm ${state === 'open' ? 'btn-primary' : ''}`}
              onClick={() => setSearchParams({ state: 'open', type })}
            >
              ⭕ Open
            </button>
            <button
              className={`btn btn-sm ${state === 'closed' ? 'btn-primary' : ''}`}
              onClick={() => setSearchParams({ state: 'closed', type })}
            >
              ✓ Closed
            </button>
          </div>
          {currentUser && (
            <Link to={`${repoBase}/issues/new`} className="btn btn-primary btn-sm">
              New Issue
            </Link>
          )}
        </div>

        {loading && <div className="page-loading">Loading…</div>}
        {error && <div className="alert alert-error">{error}</div>}
        {!loading && !error && issues.length === 0 && (
          <div className="empty-placeholder">
            <span style={{ fontSize: '3rem' }}>⭕</span>
            <h2>No {state} issues</h2>
            <p>
              {currentUser
                ? <Link to={`${repoBase}/issues/new`}>Create the first issue</Link>
                : 'There are no issues here yet.'}
            </p>
          </div>
        )}
        {!loading && issues.length > 0 && (
          <div className="issue-list">
            {issues.map(issue => (
              <div key={issue.id} className="issue-item" style={{ padding: '0.75rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: issue.state === 'open' ? 'green' : 'purple', fontSize: '1.1rem' }}>
                  {issue.state === 'open' ? '⭕' : '✅'}
                </span>
                <div style={{ flex: 1 }}>
                  <Link
                    to={`${repoBase}/issues/${issue.number}`}
                    style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}
                  >
                    {issue.title}
                  </Link>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    #{issue.number} opened by {issue.creator_username} · {new Date(issue.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
