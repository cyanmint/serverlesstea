import { useParams } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'

export default function ProtectedBranch() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2>Protected Branch</h2>
        <p style={{ color: 'var(--text-muted)' }}>This deployment does not support Branch Protection Rules.</p>
      </div>
    </div>
  )
}
