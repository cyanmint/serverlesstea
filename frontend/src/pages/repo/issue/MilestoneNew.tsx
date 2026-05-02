import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'
import { createMilestone } from '../../../api/client'

export default function MilestoneNew() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!username || !repo) return
    setSubmitting(true)
    try {
      await createMilestone(username, repo, { title, description: description || undefined, due_date: dueDate || undefined })
      navigate(`/${username}/${repo}/milestones`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create milestone')
      setSubmitting(false)
    }
  }

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content" style={{ maxWidth: '600px' }}>
        <h2 style={{ marginBottom: '1rem' }}>New Milestone</h2>
        {error && <div className="alert alert-error" style={{ marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Title *</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ width: '100%', minHeight: '80px', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Due Date</label>
            <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} style={{ padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: '4px', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" className="btn btn-primary" disabled={submitting || !title.trim()}>{submitting ? 'Creating…' : 'Create Milestone'}</button>
            <Link to={`/${username}/${repo}/milestones`} className="btn">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
