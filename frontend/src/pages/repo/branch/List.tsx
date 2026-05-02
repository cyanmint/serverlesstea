import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'
import { listBranches, type Branch } from '../../../api/client'

export default function BranchList() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const [branches, setBranches] = useState<Branch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username || !repo) return
    listBranches(username, repo)
      .then(r => setBranches(r.branches))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load branches'))
      .finally(() => setLoading(false))
  }, [username, repo])

  if (loading) return <div className="page-loading">Loading…</div>

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2 style={{ marginBottom: '1rem' }}>Branches</h2>
        {error && <div className="alert alert-error">{error}</div>}
        {branches.length === 0 ? (
          <div className="empty-placeholder"><p>No branches found.</p></div>
        ) : (
          <div>
            {branches.map(b => (
              <div key={b.name} style={{ display: 'flex', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid var(--border-color)', gap: '1rem' }}>
                <Link to={`/${username}/${repo}/src/branch/${b.name}`} style={{ fontWeight: 500, flex: 1 }}>
                  🌿 {b.name}
                </Link>
                {b.commit_sha && <code style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.commit_sha.slice(0, 7)}</code>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
