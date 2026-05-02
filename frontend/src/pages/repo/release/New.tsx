import { useParams } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'

export default function ReleaseNew() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2>New Release</h2>
        <p>This feature is coming soon.</p>
      </div>
    </div>
  )
}
