import { useParams } from 'react-router-dom'
import RepoHeader from '../components/RepoHeader'

export default function IssuesPage() {
  const { username, repo } = useParams<{ username: string; repo: string }>()

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="stub-page">
        <div className="stub-icon">⭕</div>
        <h2>Issues</h2>
        <p>Issue tracking is not yet implemented.</p>
      </div>
    </div>
  )
}
