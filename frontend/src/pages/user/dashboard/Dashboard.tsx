import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMe, getDashboardIssues, getCurrentUser, Issue } from '../../../api/client'

interface Repo {
  id: string
  name: string
  description: string | null
  is_private: number
  default_branch: string
  created_at: string
}

type DashIssue = Issue & { repo_name: string; repo_owner: string }

export default function Dashboard() {
  const navigate = useNavigate()
  const currentUser = getCurrentUser()
  const [repos, setRepos] = useState<Repo[]>([])
  const [issues, setIssues] = useState<DashIssue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!currentUser) {
      navigate('/user/login')
      return
    }
    Promise.all([getMe(), getDashboardIssues()])
      .then(([meData, issueData]) => {
        setRepos(meData.repos)
        setIssues(issueData.issues.slice(0, 10))
      })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Error'))
      .finally(() => setLoading(false))
  }, [currentUser, navigate])

  if (loading) return <div className="page-loading">Loading…</div>
  if (error) return <div className="alert alert-error">{error}</div>

  return (
    <div className="page-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Welcome, {currentUser?.username}</h1>
        <Link to="/repo/create" className="btn btn-primary">New Repository</Link>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', margin: '1rem 0' }}>
        <Link to="/issues" className="btn">My Issues</Link>
        <Link to="/milestones" className="btn">Milestones</Link>
        <Link to="/notifications" className="btn">Notifications</Link>
        <Link to="/user/settings" className="btn">Settings</Link>
      </div>

      <h2>Recent Issues</h2>
      {issues.length === 0 ? (
        <p className="empty-placeholder">No recent issues.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {issues.map((issue) => (
            <li key={issue.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #e0e0e0' }}>
              <Link to={`/${issue.repo_owner}/${issue.repo_name}/issues/${issue.number}`}>
                <strong>{issue.repo_owner}/{issue.repo_name}</strong> #{issue.number} {issue.title}
              </Link>
              <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: issue.state === 'open' ? 'green' : '#888' }}>
                {issue.state}
              </span>
            </li>
          ))}
        </ul>
      )}

      <h2>Your Repositories</h2>
      {repos.length === 0 ? (
        <p className="empty-placeholder">No repositories yet. <Link to="/repo/create">Create one</Link>.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {repos.map((repo) => (
            <li key={repo.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #e0e0e0' }}>
              <Link to={`/${currentUser!.username}/${repo.name}`}>
                <strong>{repo.name}</strong>
              </Link>
              {repo.description && <span style={{ marginLeft: '0.5rem', color: '#666' }}>{repo.description}</span>}
              {!!repo.is_private && <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#888' }}>private</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
