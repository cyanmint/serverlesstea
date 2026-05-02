import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../api/client'

export default function CreateOrg() {
  const navigate = useNavigate()
  const user = getCurrentUser()

  const [orgName, setOrgName] = useState('')
  const [visibility, setVisibility] = useState<'public' | 'limited' | 'private'>('public')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!user) {
    navigate('/login')
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!orgName.trim()) {
      setError('Organization name is required.')
      return
    }
    setLoading(true)
    try {
      // Organization creation not yet supported by backend; show a friendly message
      setError('Organization support is not yet available.')
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
              <label htmlFor="org_name">Organization Name</label>
              <input
                id="org_name"
                name="org_name"
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                required
                maxLength={40}
                placeholder="my-organization"
                autoFocus
              />
              <span className="form-help">Great organization names are short and memorable.</span>
            </div>

            <div className="form-group">
              <label>Visibility</label>
              <div className="radio-group">
                {(['public', 'limited', 'private'] as const).map((v) => (
                  <label key={v} className="radio-option">
                    <input
                      type="radio"
                      name="visibility"
                      value={v}
                      checked={visibility === v}
                      onChange={() => setVisibility(v)}
                    />
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
