import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'
import { getMilestone, listIssues, type Milestone, type Issue } from '../../../api/client'

export default function MilestoneIssues() {
  const { username, repo, id } = useParams<{ username: string; repo: string; id: string }>()
  const [milestone, setMilestone] = useState<Milestone | null>(null)
  const [issues, setIssues] = useState<Issue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!username || !repo || !id) return
    Promise.all([
      getMilestone(username, repo, id),
      listIssues(username, repo, { state: 'all', milestone_id: id }),
    ]).then(([mRes, iRes]) => {
      setMilestone(mRes.milestone)
      setIssues(iRes.issues)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [username, repo, id])

  if (loading) return <div className="page-loading">Loading…</div>

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <div style={{ marginBottom: '1rem' }}>
          <Link to={`/${username}/${repo}/milestones`} style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>← Milestones</Link>
          <h2 style={{ marginTop: '0.5rem' }}>{milestone?.title ?? 'Milestone'}</h2>
          {milestone?.description && <p style={{ color: 'var(--text-muted)' }}>{milestone.description}</p>}
        </div>
        {issues.length === 0 ? (
          <div className="empty-placeholder"><p>No issues in this milestone.</p></div>
        ) : (
          <div>
            {issues.map(issue => (
              <div key={issue.id} style={{ display: 'flex', gap: '0.5rem', padding: '0.6rem 0', borderBottom: '1px solid var(--border-color)', alignItems: 'flex-start' }}>
                <span>{issue.state === 'open' ? '⭕' : '✅'}</span>
                <div>
                  <Link to={`/${username}/${repo}/issues/${issue.number}`} style={{ fontWeight: 500 }}>{issue.title}</Link>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>#{issue.number} by {issue.creator_username}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
