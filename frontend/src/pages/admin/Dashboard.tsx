import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { adminListUsers, listRepos, getCurrentUser } from '../../api/client'

interface AdminUser {
  id: string
  username: string
  email: string
  display_name: string | null
  is_admin: number
  created_at: string
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [repoCount, setRepoCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!getCurrentUser()?.isAdmin) {
      navigate('/')
      return
    }
    Promise.all([adminListUsers(), listRepos()])
      .then(([userData, repoData]) => {
        setUsers(userData.users)
        setRepoCount(repoData.repos.length)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [navigate])

  if (loading) return <div className="page-loading">Loading…</div>

  return (
    <div className="page-content">
      <h1>Admin Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', margin: '1rem 0' }}>
        <div className="form-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{users.length}</div>
          <div style={{ color: '#666' }}>Total Users</div>
          <Link to="/-/admin/users" className="btn btn-sm" style={{ marginTop: '0.5rem', display: 'inline-block' }}>Manage</Link>
        </div>
        <div className="form-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{repoCount ?? '–'}</div>
          <div style={{ color: '#666' }}>Total Repositories</div>
          <Link to="/-/admin/repos" className="btn btn-sm" style={{ marginTop: '0.5rem', display: 'inline-block' }}>Manage</Link>
        </div>
        <div className="form-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem' }}>⚙️</div>
          <div style={{ color: '#666' }}>Configuration</div>
          <Link to="/-/admin/config" className="btn btn-sm" style={{ marginTop: '0.5rem', display: 'inline-block' }}>View</Link>
        </div>
      </div>

      <h2>Recent Users</h2>
      {users.length === 0 ? (
        <p className="empty-placeholder">No users yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Username</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Email</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Admin</th>
              <th style={{ textAlign: 'left', padding: '0.5rem' }}>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.slice(0, 10).map((u) => (
              <tr key={u.id} style={{ borderTop: '1px solid #e0e0e0' }}>
                <td style={{ padding: '0.5rem' }}>
                  <Link to={`/-/admin/users/${u.id}`}>{u.username}</Link>
                </td>
                <td style={{ padding: '0.5rem' }}>{u.email}</td>
                <td style={{ padding: '0.5rem' }}>{u.is_admin ? '✓' : ''}</td>
                <td style={{ padding: '0.5rem' }}>{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
