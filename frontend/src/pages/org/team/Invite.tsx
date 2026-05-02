import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { addTeamMember } from '../../api/client'

export default function OrgTeamInvite() {
  const { org, teamname } = useParams<{ org: string; teamname: string }>()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!org || !teamname || !username.trim()) return
    setLoading(true); setError('')
    try {
      await addTeamMember(org, teamname, username.trim())
      navigate(`/org/${org}/teams/${teamname}/members`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to add member')
    } finally { setLoading(false) }
  }

  return (
    <div className="page">
      <h2 style={{ marginBottom: '1.5rem' }}>{org}/{teamname} – Invite Member</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '400px' }}>
        <div className="form-group">
          <label>Username <span style={{ color: 'red' }}>*</span></label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required placeholder="johndoe" />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Adding…' : 'Add to Team'}</button>
        </div>
      </form>
    </div>
  )
}
