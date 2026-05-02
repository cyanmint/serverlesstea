import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminListUsers, adminUpdateUser, getCurrentUser } from '../api/client'

interface User {
  id: string
  username: string
  email: string
  display_name: string | null
  is_admin: number
  created_at: string
}

export default function AdminPanel() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const currentUser = getCurrentUser()

  useEffect(() => {
    if (!currentUser?.isAdmin) {
      navigate('/')
      return
    }
    adminListUsers()
      .then((data) => setUsers(data.users))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Error'))
      .finally(() => setLoading(false))
  }, [currentUser, navigate])

  async function toggleAdmin(user: User) {
    try {
      await adminUpdateUser(user.id, { is_admin: user.is_admin === 0 })
      setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, is_admin: u.is_admin === 0 ? 1 : 0 } : u))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed')
    }
  }

  if (loading) return <div className="page-loading">Loading...</div>
  if (error) return <div className="alert alert-error">{error}</div>

  return (
    <div className="page">
      <h1>Admin Panel</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Admin</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.is_admin ? '✓' : ''}</td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-sm" onClick={() => void toggleAdmin(user)}>
                  {user.is_admin ? 'Remove Admin' : 'Make Admin'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
