import { useParams } from 'react-router-dom'
import RepoHeader from '../components/RepoHeader'

export default function ReleasesPage() {
  const { username, repo } = useParams<{ username: string; repo: string }>()

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="stub-page">
        <div className="stub-icon">🏷️</div>
        <h2>Releases</h2>
        <p>Releases are not yet implemented.</p>
      </div>
    </div>
  )
}
