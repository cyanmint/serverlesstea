import { useParams } from 'react-router-dom'
import RepoHeader from '../../components/RepoHeader'

export default function RepoWatchers() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2>Watchers</h2>
        <p>No watchers yet.</p>
      </div>
    </div>
  )
}
