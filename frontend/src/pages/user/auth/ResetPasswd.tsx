import { useState } from 'react'
import { Link } from 'react-router-dom'
import { changePassword } from '../../../api/client'

export default function ResetPasswd() {
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match'); return }
    setLoading(true); setError('')
    try {
      await changePassword(oldPassword, password)
      setMsg('Password changed successfully.')
      setOldPassword(''); setPassword(''); setConfirm('')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to change password')
    } finally { setLoading(false) }
  }

  return (
    <div className="page-centered">
      <div className="form-card">
        <h2>Change Password</h2>
        {msg && <div className="alert alert-success">{msg}</div>}
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Password</label>
            <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required minLength={8} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Saving…' : 'Change Password'}</button>
        </form>
        <p style={{ marginTop: '1rem', fontSize: '0.85rem' }}><Link to="/user/settings/account" style={{ color: 'var(--color-accent)' }}>Back to account settings</Link></p>
      </div>
    </div>
  )
}
