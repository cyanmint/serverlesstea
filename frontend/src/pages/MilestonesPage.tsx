import { useParams, Link } from 'react-router-dom'
import RepoHeader from '../components/RepoHeader'

interface Milestone {
  id: number
  title: string
  description: string | null
  open_issues: number
  closed_issues: number
  due_on: string | null
  closed_at: string | null
  state: 'open' | 'closed'
}

export default function MilestonesPage() {
  const { username, repo } = useParams<{ username: string; repo: string }>()

  // Milestone API not yet implemented — renders Gitea-mirrored UI structure
  const milestones: Milestone[] = []
  const openCount = 0
  const closedCount = 0

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="ui container">
        <div className="list-header flex-text-block">
          <div className="milestone-tabs">
            <Link to={`/${username}/${repo}/milestones`} className="tab-link active">
              🎯 {openCount} Open
            </Link>
            <Link to={`/${username}/${repo}/milestones?state=closed`} className="tab-link">
              ✓ {closedCount} Closed
            </Link>
          </div>
          <Link to={`/${username}/${repo}/milestones/new`} className="btn btn-primary btn-sm">
            New Milestone
          </Link>
        </div>

        {milestones.length === 0 ? (
          <div className="empty-placeholder">
            <span style={{ fontSize: '3rem' }}>🎯</span>
            <h2>No milestones</h2>
            <p>
              Milestones help you track progress on groups of issues or pull requests.{' '}
              <Link to={`/${username}/${repo}/milestones/new`}>Create a milestone</Link>.
            </p>
          </div>
        ) : (
          <div className="milestone-list">
            {milestones.map((m) => {
              const total = m.open_issues + m.closed_issues
              const pct = total > 0 ? Math.round((m.closed_issues / total) * 100) : 0
              return (
                <div key={m.id} className="milestone-item">
                  <div className="milestone-header">
                    <Link
                      to={`/${username}/${repo}/milestone/${m.id}`}
                      className="milestone-title"
                    >
                      {m.title}
                    </Link>
                    {m.due_on && (
                      <span className="milestone-due muted">
                        Due {new Date(m.due_on).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  {m.description && (
                    <p className="milestone-description">{m.description}</p>
                  )}
                  <div className="milestone-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="progress-text">{pct}%</span>
                  </div>
                  <div className="milestone-stats muted">
                    <span>{m.open_issues} open</span>
                    <span> · {m.closed_issues} closed</span>
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
