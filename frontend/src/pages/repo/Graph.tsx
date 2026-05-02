import { useParams } from 'react-router-dom'
import RepoHeader from '../../components/RepoHeader'

export default function RepoGraph() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2>Commit Graph</h2>
        <p>Commit graph coming soon.</p>
      </div>
    </div>
  )
}
