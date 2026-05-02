import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { adminListUsers, adminUpdateUser, getCurrentUser } from '../../../api/client'

interface User {
  id: string
  username: string
  email: string
  display_name: string | null
  is_admin: number
  created_at: string
}

export default function AdminUserEdit() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [displayName, setDisplayName] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!getCurrentUser()?.isAdmin) { navigate('/'); return }
    adminListUsers()
      .then((data) => {
        const found = data.users.find((u) => u.id === id)
        if (found) {
          setUser(found)
          setDisplayName(found.display_name ?? '')
          setIsAdmin(found.is_admin === 1)
        }
      })
      .catch(() => {})
  }, [id, navigate])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!id) return
    try {
      await adminUpdateUser(id, { display_name: displayName, is_admin: isAdmin })
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user')
    }
  }

  if (!user) return <div className="page-loading">Loading...</div>

  return (
    <div className="page">
      <h1>Edit User: {user.username}</h1>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">User updated successfully.</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Display Name</label>
          <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
            {' '}Administrator
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  )
}
