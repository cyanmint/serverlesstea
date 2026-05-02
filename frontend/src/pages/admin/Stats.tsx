import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getCurrentUser, adminGetStats, type AdminStats } from '../../api/client'

export default function AdminStats() {
  const navigate = useNavigate()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!getCurrentUser()?.isAdmin) { navigate('/'); return }
    adminGetStats()
      .then(s => setStats(s))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [navigate])

  const tiles = stats ? [
    { label: 'Users', value: stats.users, icon: '👤', to: '/admin/users' },
    { label: 'Repositories', value: stats.repos, icon: '📦', to: '/admin/repos' },
    { label: 'Organizations', value: stats.orgs, icon: '🏢', to: '/admin/orgs' },
    { label: 'Issues', value: stats.issues, icon: '🐛', to: '/admin/orgs' },
  ] : []

  return (
    <div className="page">
      <h2 style={{ marginBottom: '1.5rem' }}>Instance Statistics</h2>
      {loading && <div className="page-loading">Loading…</div>}
      {error && <div className="alert alert-error">{error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '1rem' }}>
        {tiles.map(t => (
          <Link key={t.label} to={t.to} style={{ textDecoration: 'none' }}>
            <div style={{ padding: '1.5rem 1rem', background: 'var(--bg-secondary)', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{t.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{t.value}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{t.label}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
