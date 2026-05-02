import { useParams } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'

export default function RepoProjectsView() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2>Project</h2>
        <p style={{ color: 'var(--text-muted)' }}>This deployment does not support Projects.</p>
      </div>
    </div>
  )
}
