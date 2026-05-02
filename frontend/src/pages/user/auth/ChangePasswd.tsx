import { useState } from 'react'

export default function ChangePasswd() {
  const [oldPwd, setOldPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (newPwd !== confirm) {
      setError('Passwords do not match')
      return
    }
    alert('Password change is not yet supported in this version.')
    setSuccess(true)
  }

  return (
    <div className="page-centered">
      <div className="form-card">
        <h2>Change Password</h2>
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
          <button type="submit" className="btn btn-primary">Change Password</button>
        </form>
      </div>
    </div>
  )
}
