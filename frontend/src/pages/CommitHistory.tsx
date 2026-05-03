import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCommits } from '../api/client'
import RepoHeader from '../components/RepoHeader'

interface Commit {
  oid: string
  message: string
  author: { name: string; email: string; timestamp: number }
  committer: { name: string; email: string; timestamp: number }
}

function groupByDate(commits: Commit[]): Map<string, Commit[]> {
  const groups = new Map<string, Commit[]>()
  for (const c of commits) {
    const key = new Date(c.author.timestamp * 1000).toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric',
    })
    const existing = groups.get(key) ?? []
    existing.push(c)
    groups.set(key, existing)
  }
  return groups
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

  if (loading) return <div className="page-loading">Loading…</div>
  if (error) return <div className="alert alert-error">{error}</div>

  const groups = groupByDate(commits)

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />

      <div className="commits-page">
        <div className="commits-page-header">
          <h2>Commits on <span className="branch-badge"><span className="branch-icon">🌿</span>{ref}</span></h2>
          <span className="commits-count">{commits.length} commit{commits.length !== 1 ? 's' : ''}</span>
        </div>

        {commits.length === 0 ? (
          <p className="page-loading">No commits yet.</p>
        ) : (
          Array.from(groups.entries()).map(([date, group]) => (
            <div key={date} className="commit-group">
              <div className="commit-group-header">Commits on {date}</div>
              <div className="commit-list">
                {group.map((commit) => (
                  <div key={commit.oid} className="commit-item">
                    <div className="commit-item-main">
                      <Link
                        to={`/${username}/${repo}/commit/${commit.oid}`}
                        className="commit-message"
                      >
                        {commit.message.split('\n')[0]}
                      </Link>
                      <div className="commit-meta">
                        <span>{commit.author.name}</span>
                        <span> authored </span>
                        <span>{new Date(commit.author.timestamp * 1000).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="commit-item-sha">
                      <Link
                        to={`/${username}/${repo}/commit/${commit.oid}`}
                        className="commit-sha"
                      >
                        {commit.oid.slice(0, 7)}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
