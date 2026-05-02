import { useParams, Link } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'

export default function IssueChoose() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content" style={{ maxWidth: '600px' }}>
        <h2 style={{ marginBottom: '1rem' }}>Choose Issue Template</h2>
        <div style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: 0 }}>Blank Issue</h3>
            <p style={{ color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>Start with an empty issue form</p>
          </div>
          <Link to={`/${username}/${repo}/issues/new`} className="btn btn-primary btn-sm">Get Started</Link>
        </div>
      </div>
    </div>
  )
}
