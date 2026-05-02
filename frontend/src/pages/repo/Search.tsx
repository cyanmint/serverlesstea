import { useParams } from 'react-router-dom'
import RepoHeader from '../../components/RepoHeader'

export default function RepoSearch() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2>Search Repository</h2>
        <p>Repository search coming soon.</p>
      </div>
    </div>
  )
}
