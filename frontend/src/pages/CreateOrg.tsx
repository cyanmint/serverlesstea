import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, createOrg } from '../api/client'

export default function CreateOrg() {
  const navigate = useNavigate()
  const user = getCurrentUser()

  const [orgName, setOrgName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [description, setDescription] = useState('')
  const [visibility, setVisibility] = useState<'public' | 'private'>('public')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!user) {
    navigate('/login')
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!orgName.trim()) { setError('Organization name is required.'); return }
    setLoading(true)
    try {
      const result = await createOrg({ name: orgName.trim(), display_name: displayName.trim() || undefined, description: description.trim() || undefined, visibility })
      navigate(`/org/${result.name}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create organization')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-content organization new org">
      <div className="ui container medium-width">
        <h3 className="form-card-heading">Create Organization</h3>
        <div className="form-card">
          {error && <div className="alert alert-error">{error}</div>}
          <form className="ui form left-right-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="org_name">Organization Name <span style={{ color: 'red' }}>*</span></label>
              <input id="org_name" name="org_name" type="text" value={orgName}
                onChange={e => setOrgName(e.target.value)} required maxLength={40}
                placeholder="my-organization" autoFocus pattern="[a-zA-Z0-9_-]+" />
              <span className="form-help">Only letters, numbers, hyphens, and underscores.</span>
            </div>

            <div className="form-group">
              <label htmlFor="org_display_name">Display Name</label>
              <input id="org_display_name" type="text" value={displayName}
                onChange={e => setDisplayName(e.target.value)} maxLength={100} placeholder="My Organization" />
            </div>

            <div className="form-group">
              <label htmlFor="org_description">Description</label>
              <textarea id="org_description" rows={3} value={description}
                onChange={e => setDescription(e.target.value)} maxLength={500} placeholder="What is this organization about?" />
            </div>

            <div className="form-group">
              <label>Visibility</label>
              <div className="radio-group">
                {(['public', 'private'] as const).map(v => (
                  <label key={v} className="radio-option">
                    <input type="radio" name="visibility" value={v} checked={visibility === v} onChange={() => setVisibility(v)} />
                    <span className="radio-label">{v.charAt(0).toUpperCase() + v.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating…' : 'Create Organization'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
