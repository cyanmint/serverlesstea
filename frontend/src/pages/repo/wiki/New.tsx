import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'
import { createWikiPage } from '../../../api/client'

export default function WikiNew() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!username || !repo) return
    setSubmitting(true)
    try {
      await createWikiPage(username, repo, { title, content })
      navigate(`/${username}/${repo}/wiki/${encodeURIComponent(title)}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to save wiki page')
      setSubmitting(false)
    }
  }

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2 style={{ marginBottom: '1rem' }}>New Wiki Page</h2>
        {error && <div className="alert alert-error" style={{ marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Title *</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required placeholder="Page title" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Content *</label>
            <textarea value={content} onChange={e => setContent(e.target.value)} required placeholder="Write your wiki content here…" style={{ width: '100%', minHeight: '300px', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'monospace' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" className="btn btn-primary" disabled={submitting || !title.trim() || !content.trim()}>{submitting ? 'Saving…' : 'Save Page'}</button>
            <Link to={`/${username}/${repo}/wiki`} className="btn">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
