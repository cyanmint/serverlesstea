import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, updateUser } from '../api/client'

export default function UserSettings() {
  const navigate = useNavigate()
  const user = getCurrentUser()
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!user) {
    navigate('/login')
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)
    try {
      await updateUser(user!.username, {
        display_name: displayName || undefined,
        bio: bio || undefined,
      })
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-centered">
      <div className="form-card">
        <h2>Settings</h2>
        <p>@{user.username}</p>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">Profile updated!</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Display Name</label>
            <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your display name" />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A short bio" rows={4} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}
