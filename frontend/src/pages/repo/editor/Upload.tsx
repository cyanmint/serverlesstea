import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { createFile } from '../../../api/client'
import RepoHeader from '../../../components/RepoHeader'

export default function EditorUpload() {
  const { username, repo, ref } = useParams<{ username: string; repo: string; ref: string }>()
  const navigate = useNavigate()
  const [filePath, setFilePath] = useState('')
  const [content, setContent] = useState('')
  const [commitMsg, setCommitMsg] = useState('Add new file')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!username || !repo) return
    setSaving(true); setError('')
    try {
      await createFile(username, repo, filePath, content, commitMsg)
      navigate(`/${username}/${repo}/src/branch/${ref ?? 'main'}/${filePath}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create file')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2>Create New File</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>File Path</label>
            <input type="text" value={filePath} onChange={(e) => setFilePath(e.target.value)} required placeholder="path/to/file.txt" />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={16} style={{ width: '100%', fontFamily: 'monospace', fontSize: '0.9rem' }} />
          </div>
          <div className="form-group">
            <label>Commit message</label>
            <input type="text" value={commitMsg} onChange={(e) => setCommitMsg(e.target.value)} required />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Creating…' : 'Commit New File'}</button>
            <button type="button" className="btn" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
