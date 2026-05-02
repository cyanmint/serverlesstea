import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'
import { getIssue, updateIssue, addIssueComment, getCurrentUser, type Issue, type IssueComment } from '../../../api/client'

export default function IssueView() {
  const { username, repo, id } = useParams<{ username: string; repo: string; id: string }>()
  const [issue, setIssue] = useState<Issue | null>(null)
  const [comments, setComments] = useState<IssueComment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [commentBody, setCommentBody] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const currentUser = getCurrentUser()

  useEffect(() => {
    if (!username || !repo || !id) return
    getIssue(username, repo, parseInt(id))
      .then(res => { setIssue(res.issue); setComments(res.comments) })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to load issue'))
      .finally(() => setLoading(false))
  }, [username, repo, id])

  async function handleToggleState() {
    if (!issue || !username || !repo) return
    const newState = issue.state === 'open' ? 'closed' : 'open'
    await updateIssue(username, repo, issue.number, { state: newState })
    setIssue({ ...issue, state: newState })
  }

  async function handleSubmitComment(e: React.FormEvent) {
    e.preventDefault()
    if (!commentBody.trim() || !username || !repo || !issue) return
    setSubmitting(true)
    try {
      const res = await addIssueComment(username, repo, issue.number, commentBody)
      setComments(prev => [...prev, {
        id: res.id,
        issue_id: issue.id,
        user_id: currentUser?.id ?? '',
        username: currentUser?.username ?? '',
        body: res.body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }])
      setCommentBody('')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to post comment')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="page-loading">Loading…</div>
  if (error) return <div className="alert alert-error">{error}</div>
  if (!issue) return null

  const isOwnerOrCreator = currentUser?.username === username || currentUser?.id === issue.creator_id

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ marginBottom: '0.25rem' }}>
            {issue.title}
            <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '0.5rem' }}>#{issue.number}</span>
          </h2>
          <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem', background: issue.state === 'open' ? '#2ea44f' : '#8250df', color: '#fff' }}>
            {issue.state === 'open' ? '⭕ Open' : '✅ Closed'}
          </span>
          <span style={{ marginLeft: '0.75rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            opened by {issue.creator_username} · {new Date(issue.created_at).toLocaleDateString()}
          </span>
        </div>

        <div style={{ borderRadius: '6px', border: '1px solid var(--border-color)', padding: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{issue.creator_username}</div>
          <div style={{ whiteSpace: 'pre-wrap' }}>{issue.body ?? <em>No description provided.</em>}</div>
        </div>

        {comments.map(comment => (
          <div key={comment.id} style={{ borderRadius: '6px', border: '1px solid var(--border-color)', padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{comment.username}
              <span style={{ fontWeight: 400, color: 'var(--text-muted)', marginLeft: '0.5rem', fontSize: '0.85rem' }}>
                {new Date(comment.created_at).toLocaleDateString()}
              </span>
            </div>
            <div style={{ whiteSpace: 'pre-wrap' }}>{comment.body}</div>
          </div>
        ))}

        {currentUser && (
          <form onSubmit={handleSubmitComment} style={{ marginTop: '1rem' }}>
            <textarea
              value={commentBody}
              onChange={e => setCommentBody(e.target.value)}
              placeholder="Leave a comment…"
              style={{ width: '100%', minHeight: '100px', marginBottom: '0.5rem', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', resize: 'vertical', boxSizing: 'border-box' }}
              required
            />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="submit" className="btn btn-primary btn-sm" disabled={submitting}>
                {submitting ? 'Posting…' : 'Comment'}
              </button>
              {isOwnerOrCreator && (
                <button type="button" className="btn btn-sm" onClick={handleToggleState}>
                  {issue.state === 'open' ? 'Close issue' : 'Reopen issue'}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
