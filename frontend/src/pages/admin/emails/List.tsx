import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getCurrentUser, adminListUsers } from '../../../api/client'

interface User { id: string; username: string; email: string; display_name: string | null; is_admin: number; created_at: string }

export default function AdminEmailsList() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!getCurrentUser()?.isAdmin) { navigate('/'); return }
    adminListUsers()
      .then(r => setUsers(r.users as User[]))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [navigate])

  return (
    <div className="page">
      <h2 style={{ marginBottom: '1rem' }}>User Emails</h2>
      {loading && <div className="page-loading">Loading…</div>}
      {error && <div className="alert alert-error">{error}</div>}
      {!loading && !error && (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
              <th style={{ padding: '0.5rem' }}>Username</th>
              <th style={{ padding: '0.5rem' }}>Email</th>
              <th style={{ padding: '0.5rem' }}>Admin</th>
              <th style={{ padding: '0.5rem' }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.5rem' }}><Link to={`/admin/users/${u.id}`} style={{ color: 'var(--color-accent)' }}>{u.username}</Link></td>
                <td style={{ padding: '0.5rem' }}><a href={`mailto:${u.email}`}>{u.email}</a></td>
                <td style={{ padding: '0.5rem' }}>{u.is_admin ? '✅' : '—'}</td>
                <td style={{ padding: '0.5rem', color: 'var(--text-muted)' }}>{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
