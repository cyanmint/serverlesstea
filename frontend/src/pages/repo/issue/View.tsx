import { useParams } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'

export default function IssueView() {
  const { username, repo, index } = useParams<{ username: string; repo: string; index: string }>()
  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2>Issue #{index}</h2>
        <p>Issue details coming soon.</p>
      </div>
    </div>
  )
}
