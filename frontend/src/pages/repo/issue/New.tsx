import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'
import { createIssue, listLabels, listMilestones, type Label, type Milestone } from '../../../api/client'

export default function IssueNew() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [labels, setLabels] = useState<Label[]>([])
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [selectedMilestone, setSelectedMilestone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username || !repo) return
    listLabels(username, repo).then(r => setLabels(r.labels)).catch(() => {})
    listMilestones(username, repo).then(r => setMilestones(r.milestones)).catch(() => {})
  }, [username, repo])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!username || !repo) return
    setSubmitting(true)
    try {
      const res = await createIssue(username, repo, {
        title,
        body: body || undefined,
        milestone_id: selectedMilestone || undefined,
      })
      navigate(`/${username}/${repo}/issues/${res.number}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create issue')
      setSubmitting(false)
    }
  }

  // suppress unused variable warning
  void labels

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content" style={{ maxWidth: '800px' }}>
        <h2 style={{ marginBottom: '1rem' }}>New Issue</h2>
        {error && <div className="alert alert-error" style={{ marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Title *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Issue title"
              required
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Description</label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="Describe the issue…"
              style={{ width: '100%', minHeight: '150px', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', resize: 'vertical', boxSizing: 'border-box' }}
            />
          </div>
          {milestones.length > 0 && (
            <div style={{ marginBottom: '0.75rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 500 }}>Milestone</label>
              <select
                value={selectedMilestone}
                onChange={e => setSelectedMilestone(e.target.value)}
                style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
              >
                <option value="">None</option>
                {milestones.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
              </select>
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button type="submit" className="btn btn-primary" disabled={submitting || !title.trim()}>
              {submitting ? 'Creating…' : 'Submit Issue'}
            </button>
            <Link to={`/${username}/${repo}/issues`} className="btn">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
