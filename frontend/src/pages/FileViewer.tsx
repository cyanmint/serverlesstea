import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlob } from '../api/client'

export default function FileViewer() {
  const { username, repo, ref, '*': path } = useParams<{ username: string; repo: string; ref: string; '*': string }>()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username || !repo || !ref || !path) return
    getBlob(username, repo, ref, path)
      .then((data) => setContent(data.content))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Error'))
      .finally(() => setLoading(false))
  }, [username, repo, ref, path])

  if (loading) return <div className="page-loading">Loading...</div>
  if (error) return <div className="alert alert-error">{error}</div>

  return (
    <div className="page">
      <h2>
        <Link to={`/${username}/${repo}`}>{username}/{repo}</Link>
        {path && ` / ${path}`}
      </h2>
      <div className="file-viewer">
        <pre><code>{content}</code></pre>
      </div>
    </div>
  )
}
