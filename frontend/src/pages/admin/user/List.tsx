import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminListUsers, adminDeleteUser, getCurrentUser } from '../../../api/client'

interface AdminUser {
  id: string
  username: string
  email: string
  display_name: string | null
  is_admin: number
  created_at: string
}

export default function AdminUserList() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  function loadUsers() {
    adminListUsers()
      .then((d) => setUsers(d.users))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!getCurrentUser()?.isAdmin) { navigate('/'); return }
    loadUsers()
  }, [navigate])

  async function handleDelete(id: string, username: string) {
    if (!confirm(`Delete user "${username}"? This cannot be undone.`)) return
    try {
      await adminDeleteUser(id)
      setUsers((prev) => prev.filter((u) => u.id !== id))
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to delete')
    }
  }

  if (loading) return <div className="page-loading">Loading…</div>

  return (
    <div className="page-content">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>User Management</h1>
        <Link to="/-/admin/users/new" className="btn btn-primary">New User</Link>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      {users.length === 0 ? (
        <p className="empty-placeholder">No users found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Username</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Email</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Admin</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Joined</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ borderTop: '1px solid #e0e0e0' }}>
                <td style={{ padding: '0.5rem' }}><Link to={`/-/admin/users/${u.id}`}>{u.username}</Link></td>
                <td style={{ padding: '0.5rem' }}>{u.email}</td>
                <td style={{ padding: '0.5rem' }}>{u.is_admin ? '✓' : ''}</td>
                <td style={{ padding: '0.5rem' }}>{new Date(u.created_at).toLocaleDateString()}</td>
                <td style={{ padding: '0.5rem' }}>
                  <Link to={`/-/admin/users/${u.id}/edit`} className="btn btn-sm" style={{ marginRight: '0.5rem' }}>Edit</Link>
                  <button className="btn btn-sm" style={{ color: 'red' }} onClick={() => handleDelete(u.id, u.username)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
