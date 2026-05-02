import { useState } from 'react'
import { changePassword } from '../../../../api/client'

export default function SecuritySettings() {
  const [oldPwd, setOldPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess(false)
    if (newPwd !== confirm) {
      setError('New passwords do not match')
      return
    }
    setLoading(true)
    try {
      await changePassword(oldPwd, newPwd)
      setSuccess(true)
      setOldPwd('')
      setNewPwd('')
      setConfirm('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-content">
      <h2>Security Settings</h2>

      <div className="form-card">
        <h3>Change Password</h3>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">Password changed successfully.</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Password</label>
            <input type="password" value={oldPwd} onChange={(e) => setOldPwd(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} required minLength={6} />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving…' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}
