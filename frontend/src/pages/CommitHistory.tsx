import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCommits } from '../api/client'

interface Commit {
  oid: string
  message: string
  author: { name: string; email: string; timestamp: number }
}

export default function CommitHistory() {
  const { username, repo, ref } = useParams<{ username: string; repo: string; ref: string }>()
  const [commits, setCommits] = useState<Commit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username || !repo || !ref) return
    getCommits(username, repo, ref)
      .then((data) => setCommits(data.commits))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Error'))
      .finally(() => setLoading(false))
  }, [username, repo, ref])

  if (loading) return <div className="page-loading">Loading...</div>
  if (error) return <div className="alert alert-error">{error}</div>

  return (
    <div className="page">
      <h2>
        <Link to={`/${username}/${repo}`}>{username}/{repo}</Link> — Commits on {ref}
      </h2>
      <div className="commit-list">
        {commits.map((commit) => (
          <div key={commit.oid} className="commit-item">
            <div className="commit-message">{commit.message.split('\n')[0]}</div>
            <div className="commit-meta">
              <span>{commit.author.name}</span>
              <span> · </span>
              <span>{new Date(commit.author.timestamp * 1000).toLocaleDateString()}</span>
              <span> · </span>
              <code className="commit-sha">{commit.oid.slice(0, 7)}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
