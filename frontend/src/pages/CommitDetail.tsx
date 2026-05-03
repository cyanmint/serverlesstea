import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getDiff, getCommits } from '../api/client'
import RepoHeader from '../components/RepoHeader'

interface CommitInfo {
  oid: string
  message: string
  author: { name: string; email: string; timestamp: number }
  committer: { name: string; email: string; timestamp: number }
}

interface DiffEntry {
  path: string
  type: string
}

export default function CommitDetail() {
  const { username, repo, sha } = useParams<{ username: string; repo: string; sha: string }>()
  const [commit, setCommit] = useState<CommitInfo | null>(null)
  const [diff, setDiff] = useState<DiffEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username || !repo || !sha) return
    Promise.all([
      // find the commit in the log by SHA prefix
      getCommits(username, repo, sha).catch(() => ({ commits: [] as CommitInfo[] })),
      getDiff(username, repo, sha).catch(() => ({ diff: [] as DiffEntry[] })),
    ])
      .then(([commitsData, diffData]) => {
        const found = commitsData.commits.find((c) => c.oid.startsWith(sha)) ?? commitsData.commits[0] ?? null
        setCommit(found)
        setDiff(diffData.diff)
      })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Error'))
      .finally(() => setLoading(false))
  }, [username, repo, sha])

  if (loading) return <div className="page-loading">Loading…</div>
  if (error) return <div className="alert alert-error">{error}</div>

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />

      <div className="commit-detail-page">
        {commit ? (
          <>
            <div className="commit-detail-header">
              <h2 className="commit-detail-title">{commit.message.split('\n')[0]}</h2>
              {commit.message.includes('\n') && (
                <pre className="commit-detail-body">
                  {commit.message.split('\n').slice(1).join('\n').trim()}
                </pre>
              )}
              <div className="commit-detail-meta">
                <span className="commit-author">
                  <strong>{commit.author.name}</strong> &lt;{commit.author.email}&gt;
                </span>
                <span className="commit-detail-date">
                  authored {new Date(commit.author.timestamp * 1000).toLocaleString()}
                </span>
              </div>
              {commit.committer.name !== commit.author.name && (
                <div className="commit-detail-meta">
                  <span className="commit-author">
                    Committed by <strong>{commit.committer.name}</strong>
                  </span>
                  <span className="commit-detail-date">
                    {new Date(commit.committer.timestamp * 1000).toLocaleString()}
                  </span>
                </div>
              )}
              <div className="commit-sha-row">
                <code className="commit-sha-full">{commit.oid}</code>
                <Link
                  to={`/${username}/${repo}/src/branch/${sha}`}
                  className="btn btn-sm"
                >
                  Browse source
                </Link>
              </div>
            </div>

            <div className="diff-stats">
              <span>{diff.length} file{diff.length !== 1 ? 's' : ''} changed</span>
            </div>

            {diff.length > 0 && (
              <div className="diff-file-list">
                {diff.map((entry) => (
                  <div key={entry.path} className={`diff-file-entry diff-${entry.type}`}>
                    <span className="diff-type-badge">{entry.type}</span>
                    <Link to={`/${username}/${repo}/blob/${sha}/${entry.path}`}>
                      {entry.path}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="alert alert-error">Commit not found.</div>
        )}
      </div>
    </div>
  )
}
