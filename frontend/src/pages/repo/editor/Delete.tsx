import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getFileContents, deleteFile } from '../../../api/client'
import RepoHeader from '../../../components/RepoHeader'

export default function EditorDelete() {
  const { username, repo, ref, '*': filePath } = useParams<{ username: string; repo: string; ref: string; '*': string }>()
  const navigate = useNavigate()
  const [exists, setExists] = useState(false)
  const [commitMsg, setCommitMsg] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username || !repo || !ref || !filePath) return
    getFileContents(username, repo, filePath, ref)
      .then(() => { setExists(true); setCommitMsg(`Delete ${filePath}`) })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'File not found'))
      .finally(() => setLoading(false))
  }, [username, repo, ref, filePath])

  async function handleDelete(e: React.FormEvent) {
    e.preventDefault()
    if (!username || !repo || !filePath) return
    setDeleting(true); setError('')
    try {
      await deleteFile(username, repo, filePath, commitMsg)
      navigate(`/${username}/${repo}/src/branch/${ref}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2>Delete File</h2>
        {error && <div className="alert alert-error">{error}</div>}
        {loading ? <div className="page-loading">Loading…</div> : !exists ? null : (
          <form onSubmit={handleDelete}>
            <p>You are about to delete <strong>{filePath}</strong>. This action will be committed.</p>
            <div className="form-group">
              <label>Commit message</label>
              <input type="text" value={commitMsg} onChange={(e) => setCommitMsg(e.target.value)} required />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" className="btn" style={{ background: '#c00', color: '#fff' }} disabled={deleting}>{deleting ? 'Deleting…' : 'Delete File'}</button>
              <button type="button" className="btn" onClick={() => navigate(-1)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
