import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { getCurrentUser, adminGetUser } from '../../../api/client'

interface UserDetail { id: string; username: string; email: string; is_admin: number; created_at: string }

export default function AdminUserViewEmails() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [user, setUser] = useState<UserDetail | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!getCurrentUser()?.isAdmin) { navigate('/'); return }
    if (!id) return
    adminGetUser(id)
      .then(r => setUser(r.user))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [navigate, id])

  if (loading) return <div className="page-loading">Loading…</div>

  return (
    <div className="page">
      {error && <div className="alert alert-error">{error}</div>}
      {user && (
        <>
          <h2 style={{ marginBottom: '1rem' }}>Emails for {user.username}</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem' }}>Email</th>
                <th style={{ padding: '0.5rem' }}>Primary</th>
                <th style={{ padding: '0.5rem' }}>Verified</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.5rem' }}><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td style={{ padding: '0.5rem' }}>✅</td>
                <td style={{ padding: '0.5rem' }}>✅</td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop: '1rem' }}>
            <Link to={`/admin/users/${id}`} style={{ color: 'var(--color-accent)' }}>← Back to user details</Link>
          </div>
        </>
      )}
    </div>
  )
}
