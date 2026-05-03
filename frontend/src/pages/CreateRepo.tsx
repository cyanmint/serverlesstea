import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createRepo, getCurrentUser } from '../api/client'

export default function CreateRepo() {
  const navigate = useNavigate()
  const user = getCurrentUser()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!user) {
    navigate('/login')
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await createRepo(name, description, isPrivate)
      navigate(`/${user!.username}/${name}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create repository')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-centered">
      <div className="form-card">
        <h2>New Repository</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Repository Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="my-repo"
              pattern="[a-zA-Z0-9_.\-]+"
              title="Letters, digits, underscores, hyphens and dots only"
              required
            />
          </div>
          <div className="form-group">
            <label>Description (optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short description"
            />
          </div>
          <div className="form-group form-group-checkbox">
            <label>
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
              />
              {' '}Private repository
            </label>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Repository'}
          </button>
        </form>
      </div>
    </div>
  )
}
