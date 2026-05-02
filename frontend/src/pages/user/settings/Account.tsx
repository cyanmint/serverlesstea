import { useState, useEffect } from 'react'
import { getCurrentUser, getMe, updateUser } from '../../../api/client'

export default function SettingsAccount() {
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const currentUser = getCurrentUser()

  useEffect(() => {
    getMe().then(r => {
      setDisplayName((r.user as { display_name?: string }).display_name ?? '')
      setBio((r.user as { bio?: string }).bio ?? '')
    }).catch(() => {})
  }, [])

  async function handleProfile(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setMsg(''); setError('')
    try {
      await updateUser(currentUser!.username, { display_name: displayName, bio })
      setMsg('Profile updated.')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally { setSaving(false) }
  }

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault()
    if (newPassword !== confirm) { setError('Passwords do not match'); return }
    setSaving(true); setMsg(''); setError('')
    try {
      const { changePassword } = await import('../../../api/client')
      await changePassword(oldPassword, newPassword)
      setMsg('Password changed.'); setOldPassword(''); setNewPassword(''); setConfirm('')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to change password')
    } finally { setSaving(false) }
  }

  return (
    <div className="page">
      <h1>Account Settings</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Signed in as <strong>{currentUser?.username}</strong> ({currentUser?.email})</p>
      {msg && <div className="alert alert-success">{msg}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Profile</h2>
        <form onSubmit={handleProfile} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '480px' }}>
          <div className="form-group">
            <label>Display Name</label>
            <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Your full name" />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea rows={3} value={bio} onChange={e => setBio(e.target.value)} placeholder="A short bio" style={{ resize: 'vertical' }} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save Profile'}</button>
        </form>
      </section>

      <section>
        <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Change Password</h2>
        <form onSubmit={handlePassword} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '480px' }}>
          <div className="form-group">
            <label>Current Password</label>
            <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={8} />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required minLength={8} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Change Password'}</button>
        </form>
      </section>
    </div>
  )
}
