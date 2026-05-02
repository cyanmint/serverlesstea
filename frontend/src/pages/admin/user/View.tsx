import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { adminListUsers, getCurrentUser } from '../../../api/client'

interface User {
  id: string
  username: string
  email: string
  display_name: string | null
  is_admin: number
  created_at: string
}

export default function AdminUserView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (!getCurrentUser()?.isAdmin) { navigate('/'); return }
    adminListUsers()
      .then((data) => {
        const found = data.users.find((u) => u.id === id)
        setUser(found ?? null)
      })
      .catch(() => {})
  }, [id, navigate])

  if (!user) return <div className="page-loading">Loading...</div>

  return (
    <div className="page">
      <h1>User: {user.username}</h1>
      <table className="data-table">
        <tbody>
          <tr><th>ID</th><td>{user.id}</td></tr>
          <tr><th>Username</th><td>{user.username}</td></tr>
          <tr><th>Email</th><td>{user.email}</td></tr>
          <tr><th>Display Name</th><td>{user.display_name ?? '-'}</td></tr>
          <tr><th>Admin</th><td>{user.is_admin ? 'Yes' : 'No'}</td></tr>
          <tr><th>Joined</th><td>{new Date(user.created_at).toLocaleDateString()}</td></tr>
        </tbody>
      </table>
    </div>
  )
}
