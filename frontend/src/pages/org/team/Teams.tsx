import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { listOrgTeams } from '../../../api/client'

interface Team { id: string; name: string; permission: string }

export default function OrgTeams() {
  const { org } = useParams<{ org: string }>()
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!org) return
    listOrgTeams(org)
      .then(r => setTeams(r.teams as Team[]))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [org])

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>{org} – Teams</h2>
        <Link to={`/org/${org}/teams/new`} className="btn btn-primary">New Team</Link>
      </div>
      {loading && <div className="page-loading">Loading…</div>}
      {error && <div className="alert alert-error">{error}</div>}
      {!loading && !error && teams.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No teams yet.</p>}
      {teams.map(t => (
        <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.65rem 0', borderBottom: '1px solid var(--border-color)' }}>
          <Link to={`/org/${org}/teams/${t.name}`} style={{ fontWeight: 600, color: 'var(--color-accent)', flex: 1 }}>{t.name}</Link>
          <span style={{ fontSize: '0.8rem', background: 'var(--bg-secondary)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--text-muted)' }}>{t.permission}</span>
        </div>
      ))}
    </div>
  )
}
