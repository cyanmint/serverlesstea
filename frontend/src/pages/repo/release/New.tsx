import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'
import { createRelease } from '../../../api/client'

export default function ReleaseNew() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const navigate = useNavigate()
  const [tagName, setTagName] = useState('')
  const [name, setName] = useState('')
  const [body, setBody] = useState('')
  const [isDraft, setIsDraft] = useState(false)
  const [isPrerelease, setIsPrerelease] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!username || !repo) return
    setSubmitting(true)
    try {
      await createRelease(username, repo, { tag_name: tagName, name, body: body || undefined, is_draft: isDraft, is_prerelease: isPrerelease })
      navigate(`/${username}/${repo}/releases`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create release')
      setSubmitting(false)
    }
  }

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content" style={{ maxWidth: '700px' }}>
        <h2 style={{ marginBottom: '1rem' }}>New Release</h2>
        {error && <div className="alert alert-error" style={{ marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Tag Name *</label>
            <input type="text" value={tagName} onChange={e => setTagName(e.target.value)} placeholder="v1.0.0" required style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Release Title *</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Release name" required style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Release Notes</label>
            <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Describe the release…" style={{ width: '100%', minHeight: '150px', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <input type="checkbox" checked={isDraft} onChange={e => setIsDraft(e.target.checked)} /> Draft
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <input type="checkbox" checked={isPrerelease} onChange={e => setIsPrerelease(e.target.checked)} /> Pre-release
            </label>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" className="btn btn-primary" disabled={submitting || !tagName.trim() || !name.trim()}>{submitting ? 'Publishing…' : 'Publish Release'}</button>
            <Link to={`/${username}/${repo}/releases`} className="btn">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
