import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { listRepos } from '../../api/client'

interface Repo { id: string; name: string; owner_username: string; is_private: number }

export default function OrgTeamRepositories() {
  const { org } = useParams<{ org: string; teamname: string }>()
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    listRepos()
      .then(r => setRepos((r.repos as Repo[]).filter(repo => repo.owner_username === org)))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [org])

  return (
    <div className="page">
      <h2 style={{ marginBottom: '1rem' }}>{org} – Team Repositories</h2>
      {loading && <div className="page-loading">Loading…</div>}
      {error && <div className="alert alert-error">{error}</div>}
      {!loading && !error && repos.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No repositories in this organization.</p>}
      {repos.map(r => (
        <div key={r.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
          <Link to={`/${r.owner_username}/${r.name}`} style={{ color: 'var(--color-accent)', fontWeight: 500 }}>{r.name}</Link>
          <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{r.is_private ? '🔒' : '🌐'}</span>
        </div>
      ))}
    </div>
  )
}
