import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import RepoHeader from '../../../components/RepoHeader'

export default function IssueNew() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert('Issue creation is not yet supported in this version.')
    navigate(`/${username}/${repo}/issues`)
  }

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2>New Issue</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Issue title" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={8} placeholder="Describe the issue..." style={{ width: '100%' }} />
          </div>
          <button type="submit" className="btn btn-primary">Submit Issue</button>
        </form>
      </div>
    </div>
  )
}
