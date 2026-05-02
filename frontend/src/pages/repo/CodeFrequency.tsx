import { useParams } from 'react-router-dom'
import RepoHeader from '../../components/RepoHeader'

export default function RepoCodeFrequency() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2>Code Frequency</h2>
        <p>Repository insights coming soon.</p>
      </div>
    </div>
  )
}
