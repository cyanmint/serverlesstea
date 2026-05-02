import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { adminListUsers, getCurrentUser } from '../../api/client'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [userCount, setUserCount] = useState<number | null>(null)

  useEffect(() => {
    if (!getCurrentUser()?.isAdmin) {
      navigate('/')
      return
    }
    adminListUsers()
      .then((data) => setUserCount(data.users.length))
      .catch(() => setUserCount(0))
  }, [navigate])

  return (
    <div className="page">
      <h1>Admin Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', margin: '1rem 0' }}>
        <div className="form-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem' }}>{userCount ?? '...'}</div>
          <div>Users</div>
          <Link to="/-/admin/users" className="btn" style={{ marginTop: '0.5rem', display: 'inline-block' }}>Manage Users</Link>
        </div>
        <div className="form-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem' }}>📦</div>
          <div>Repositories</div>
          <Link to="/-/admin/repos" className="btn" style={{ marginTop: '0.5rem', display: 'inline-block' }}>Manage Repos</Link>
        </div>
        <div className="form-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem' }}>⚙️</div>
          <div>Configuration</div>
          <Link to="/-/admin/config" className="btn" style={{ marginTop: '0.5rem', display: 'inline-block' }}>View Config</Link>
        </div>
      </div>
    </div>
  )
}
