import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listMyOrgs } from '../../../api/client'

interface OrgEntry { id: string; name: string; display_name: string | null; description: string | null; visibility: string; role: string }

export default function SettingsOrganization() {
  const [orgs, setOrgs] = useState<OrgEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    listMyOrgs()
      .then(r => setOrgs(r.orgs))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page">
      <h2 style={{ marginBottom: '1rem' }}>Organizations</h2>
      {loading && <div className="page-loading">Loading…</div>}
      {error && <div className="alert alert-error">{error}</div>}
      {!loading && !error && orgs.length === 0 && (
        <div className="empty-placeholder">
          <p>You are not a member of any organizations.</p>
          <Link to="/org/create" className="btn btn-primary">Create an Organization</Link>
        </div>
      )}
      {orgs.map(o => (
        <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ flex: 1 }}>
            <Link to={`/org/${o.name}`} style={{ fontWeight: 600, color: 'var(--color-accent)' }}>{o.display_name ?? o.name}</Link>
            {o.description && <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{o.description}</div>}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--bg-secondary)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{o.role}</span>
          <Link to={`/org/${o.name}`} className="btn btn-sm" style={{ fontSize: '0.8rem' }}>View</Link>
        </div>
      ))}
    </div>
  )
}
