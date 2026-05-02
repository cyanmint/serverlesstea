import { useParams } from 'react-router-dom'

export default function RepoEmpty() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  return (
    <div className="repo-page">
      <div className="page-content">
        <h2>{username}/{repo}</h2>
        <p>This repository is empty. Get started by cloning and pushing your first commit:</p>
        <pre className="empty-repo-hint">{`git clone ${origin}/git/${username}/${repo}.git
cd ${repo ?? 'repo'}
git commit --allow-empty -m "initial commit"
git push origin HEAD:main`}</pre>
      </div>
    </div>
  )
}
