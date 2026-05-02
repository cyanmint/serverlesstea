import { useParams } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'

export default function Migrating() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2>Migrating...</h2>
        <p>Migration in progress.</p>
      </div>
    </div>
  )
}
