import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createOrg, getCurrentUser } from '../../api/client'

export default function OrgCreate() {
  const navigate = useNavigate()
  const user = getCurrentUser()
  const [orgName, setOrgName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [description, setDescription] = useState('')
  const [visibility, setVisibility] = useState<'public' | 'limited' | 'private'>('public')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!user) { navigate('/user/login'); return null }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await createOrg({ name: orgName, display_name: displayName || undefined, description: description || undefined, visibility })
      navigate(`/org/${data.name}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create organization')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-content">
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <h1>Create Organization</h1>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Organization Name *</label>
            <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} required maxLength={40} placeholder="my-organization" />
          </div>
          <div className="form-group">
            <label>Display Name</label>
            <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Optional display name" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={{ width: '100%' }} />
          </div>
          <div className="form-group">
            <label>Visibility</label>
            {(['public', 'limited', 'private'] as const).map((v) => (
              <label key={v} style={{ display: 'block', marginBottom: '0.25rem' }}>
                <input type="radio" name="visibility" value={v} checked={visibility === v} onChange={() => setVisibility(v)} style={{ marginRight: '0.5rem' }} />
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </label>
            ))}
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating…' : 'Create Organization'}
          </button>
        </form>
      </div>
    </div>
  )
}
