import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { listRepos } from '../../../api/client'

interface Repo { id: string; name: string; owner_username: string }

export default function OrgLabels() {
  const { org } = useParams<{ org: string }>()
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listRepos()
      .then(r => setRepos((r.repos as Repo[]).filter(repo => repo.owner_username === org)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [org])

  return (
    <div className="page">
      <h2 style={{ marginBottom: '0.5rem' }}>{org} – Labels</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>Labels are managed per repository. Select a repository to manage its labels.</p>
      {loading && <div className="page-loading">Loading…</div>}
      {!loading && repos.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No repositories in this organization.</p>}
      {repos.map(r => (
        <div key={r.id} style={{ padding: '0.4rem 0', borderBottom: '1px solid var(--border-color)' }}>
          <a href={`/${r.owner_username}/${r.name}/labels`} style={{ color: 'var(--color-accent)' }}>{r.name}</a>
        </div>
      ))}
    </div>
  )
}
