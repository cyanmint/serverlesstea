import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { deleteRepo, getCurrentUser } from '../api/client'
import RepoHeader from '../components/RepoHeader'

export default function RepoSettings() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const navigate = useNavigate()
  const currentUser = getCurrentUser()
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [deleting, setDeleting] = useState(false)

  if (currentUser?.username !== username) {
    return <div className="alert alert-error">You do not have permission to access these settings.</div>
  }

  async function handleDelete() {
    if (confirm !== repo) {
      setError(`Type the repository name "${repo}" to confirm.`)
      return
    }
    setDeleting(true)
    try {
      await deleteRepo(username!, repo!)
      navigate('/')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Delete failed')
      setDeleting(false)
    }
  }

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />

      <div className="settings-page">
        <h2>Repository Settings</h2>

        <section className="settings-section danger-zone">
          <h3 className="danger-zone-title">⚠️ Danger Zone</h3>
          <div className="danger-action">
            <div className="danger-action-info">
              <strong>Delete this repository</strong>
              <p>Once deleted, the repository and all of its data are permanently removed.</p>
            </div>
            <div className="danger-action-form">
              {error && <div className="alert alert-error">{error}</div>}
              <p>
                Type <strong>{repo}</strong> to confirm:
              </p>
              <input
                className="form-group input"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder={repo}
              />
              <button
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting…' : 'Delete repository'}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
