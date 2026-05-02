import { useState } from 'react'
import { getCurrentUser } from '../../../api/client'

export default function SettingsAccount() {
  const currentUser = getCurrentUser()
  const [username, setUsername] = useState(currentUser?.username ?? '')
  const [email, setEmail] = useState(currentUser?.email ?? '')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert('Account settings update is coming soon.')
  }

  return (
    <div className="page">
      <h1>Account Settings</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
        <p><small>⚠ Account settings changes are not yet supported in this version.</small></p>
      </form>
    </div>
  )
}
