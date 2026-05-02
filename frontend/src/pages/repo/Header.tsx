import RepoHeader from '../../components/RepoHeader'
import { useParams } from 'react-router-dom'

export default function RepoHeaderPage() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  return <RepoHeader owner={username!} repo={repo!} />
}
