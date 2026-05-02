import { useParams } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'

export default function ActionsView() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2>Action Run</h2>
        <p style={{ color: 'var(--text-muted)' }}>This deployment does not support CI/CD Actions.</p>
      </div>
    </div>
  )
}
