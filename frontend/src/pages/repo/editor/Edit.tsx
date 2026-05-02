import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getFileContents, updateFile } from '../../../api/client'
import RepoHeader from '../../../components/RepoHeader'

export default function EditorEdit() {
  const { username, repo, ref, '*': filePath } = useParams<{ username: string; repo: string; ref: string; '*': string }>()
  const navigate = useNavigate()
  const [content, setContent] = useState('')
  const [commitMsg, setCommitMsg] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username || !repo || !ref || !filePath) return
    getFileContents(username, repo, filePath, ref)
      .then((d) => { setContent(d.content); setCommitMsg(`Update ${filePath}`) })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load file'))
      .finally(() => setLoading(false))
  }, [username, repo, ref, filePath])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!username || !repo || !filePath) return
    setSaving(true); setError('')
    try {
      await updateFile(username, repo, filePath, content, commitMsg)
      navigate(`/${username}/${repo}/src/branch/${ref}/${filePath}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2>Edit: {filePath}</h2>
        {error && <div className="alert alert-error">{error}</div>}
        {loading ? <div className="page-loading">Loading file…</div> : (
          <form onSubmit={handleSave}>
            <div className="form-group">
              <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={24} style={{ width: '100%', fontFamily: 'monospace', fontSize: '0.9rem' }} />
            </div>
            <div className="form-group">
              <label>Commit message</label>
              <input type="text" value={commitMsg} onChange={(e) => setCommitMsg(e.target.value)} required />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Commit Changes'}</button>
              <button type="button" className="btn" onClick={() => navigate(-1)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
