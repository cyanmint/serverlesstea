import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createOrgTeam } from '../../api/client'

export default function OrgTeamNew() {
  const { org } = useParams<{ org: string }>()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [permission, setPermission] = useState('read')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!org || !name.trim()) return
    setLoading(true); setError('')
    try {
      await createOrgTeam(org, { name: name.trim(), permission })
      navigate(`/org/${org}/teams`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create team')
    } finally { setLoading(false) }
  }

  return (
    <div className="page">
      <h2 style={{ marginBottom: '1.5rem' }}>{org} – New Team</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '480px' }}>
        <div className="form-group">
          <label>Team Name <span style={{ color: 'red' }}>*</span></label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. developers" maxLength={64} />
        </div>
        <div className="form-group">
          <label>Permission</label>
          <select value={permission} onChange={e => setPermission(e.target.value)} style={{ padding: '0.4rem', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
            <option value="read">Read</option>
            <option value="write">Write</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Creating…' : 'Create Team'}</button>
        </div>
      </form>
    </div>
  )
}
