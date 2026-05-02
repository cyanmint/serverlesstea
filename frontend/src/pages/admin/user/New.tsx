import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminUserNew() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert('Creating users via admin panel is not yet supported.')
    navigate('/-/admin/users')
  }

  return (
    <div className="page">
      <h1>New User</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Create User</button>
      </form>
    </div>
  )
}
