import { useParams, Link } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'

export default function WikiStart() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <div className="empty-placeholder">
          <span style={{ fontSize: '3rem' }}>📖</span>
          <h2>This repository has no wiki yet</h2>
          <p>A wiki allows you to write documentation for your project.</p>
          <Link to={`/${username}/${repo}/wiki/_new`} className="btn btn-primary">Create the first page</Link>
        </div>
      </div>
    </div>
  )
}
