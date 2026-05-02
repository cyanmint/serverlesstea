import { useParams } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'

export default function GithookEdit() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2>Edit Git Hook</h2>
        <p>This feature is coming soon.</p>
      </div>
    </div>
  )
}
