import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'
import { getRepo, updateRepo, deleteRepo } from '../../../api/client'

export default function RepoSettingsOptions() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [defaultBranch, setDefaultBranch] = useState('main')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!username || !repo) return
    getRepo(username, repo).then(r => {
      setName(r.repo.name)
      setDescription(r.repo.description ?? '')
      setIsPrivate(r.repo.is_private === 1)
      setDefaultBranch(r.repo.default_branch)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [username, repo])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!username || !repo) return
    setSaving(true); setError(''); setSuccess('')
    try {
      await updateRepo(username, repo, { name, description: description || null, is_private: isPrivate, default_branch: defaultBranch })
      setSuccess('Settings saved.')
      if (name !== repo) navigate(`/${username}/${name}/settings/options`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!username || !repo) return
    if (!confirm(`Delete ${repo}? This cannot be undone.`)) return
    setDeleting(true)
    try {
      await deleteRepo(username, repo)
      navigate(`/${username}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to delete')
      setDeleting(false)
    }
  }

  if (loading) return <div className="page-loading">Loading…</div>

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content" style={{ maxWidth: '600px' }}>
        <h2 style={{ marginBottom: '1.5rem' }}>Repository Settings</h2>
        {error && <div className="alert alert-error" style={{ marginBottom: '1rem' }}>{error}</div>}
        {success && <div className="alert alert-success" style={{ marginBottom: '1rem' }}>{success}</div>}
        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Repository Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Description</label>
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Default Branch</label>
            <input type="text" value={defaultBranch} onChange={e => setDefaultBranch(e.target.value)} style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" checked={isPrivate} onChange={e => setIsPrivate(e.target.checked)} />
              Private repository
            </label>
          </div>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</button>
        </form>

        <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--border-color)' }} />
        <div style={{ border: '1px solid #f85149', borderRadius: '6px', padding: '1.25rem' }}>
          <h3 style={{ color: '#f85149', marginBottom: '0.5rem' }}>Danger Zone</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Once you delete a repository, there is no going back.</p>
          <button className="btn btn-sm" style={{ background: '#f85149', color: '#fff', border: 'none' }} onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Deleting…' : 'Delete this repository'}
          </button>
        </div>
      </div>
    </div>
  )
}
