import { useParams } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'

export default function EditorPatch() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2>Apply Patch</h2>
        <p>This feature is coming soon.</p>
      </div>
    </div>
  )
}
