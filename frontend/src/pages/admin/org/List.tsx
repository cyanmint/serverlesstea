import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getCurrentUser, adminListOrgs } from '../../../api/client'

interface OrgRow { id: string; name: string; display_name: string | null; visibility: string; created_at: string; member_count: number }

export default function AdminOrgList() {
  const navigate = useNavigate()
  const [orgs, setOrgs] = useState<OrgRow[]>([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!getCurrentUser()?.isAdmin) { navigate('/'); return }
    adminListOrgs()
      .then(r => setOrgs(r.orgs))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [navigate])

  const filtered = q ? orgs.filter(o => o.name.toLowerCase().includes(q.toLowerCase())) : orgs

  return (
    <div className="page">
      <h2 style={{ marginBottom: '1rem' }}>All Organizations ({orgs.length})</h2>
      {loading && <div className="page-loading">Loading…</div>}
      {error && <div className="alert alert-error">{error}</div>}
      {!loading && !error && (
        <>
          <input type="search" placeholder="Filter by name…" value={q} onChange={e => setQ(e.target.value)}
            style={{ marginBottom: '1rem', padding: '0.4rem 0.75rem', border: '1px solid var(--border-color)', borderRadius: '6px', width: '100%', maxWidth: '360px' }} />
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem' }}>Organization</th>
                <th style={{ padding: '0.5rem' }}>Visibility</th>
                <th style={{ padding: '0.5rem' }}>Members</th>
                <th style={{ padding: '0.5rem' }}>Created</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.5rem' }}><Link to={`/org/${o.name}`} style={{ color: 'var(--color-accent)', fontWeight: 500 }}>{o.display_name ?? o.name}</Link></td>
                  <td style={{ padding: '0.5rem', fontSize: '0.85rem' }}>{o.visibility}</td>
                  <td style={{ padding: '0.5rem' }}>{o.member_count}</td>
                  <td style={{ padding: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{new Date(o.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
