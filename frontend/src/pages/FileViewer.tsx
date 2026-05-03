import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlob } from '../api/client'
import RepoHeader from '../components/RepoHeader'

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

  if (loading) return <div className="page-loading">Loading…</div>
  if (error) return <div className="alert alert-error">{error}</div>

  const pathParts = path ? path.split('/').filter(Boolean) : []

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} defaultBranch={ref} />

      <div className="repo-body">
        <div className="repo-main">
          <div className="repo-nav-bar">
            <span className="branch-badge"><span className="branch-icon">🌿</span>{ref}</span>
            <div className="breadcrumb">
              <Link to={`/${username}/${repo}`}>{repo}</Link>
              {pathParts.map((part, i) => {
                const partial = pathParts.slice(0, i + 1).join('/')
                const isLast = i === pathParts.length - 1
                return (
                  <span key={partial}>
                    <span className="breadcrumb-sep"> / </span>
                    {isLast
                      ? <span className="breadcrumb-current">{part}</span>
                      : <Link to={`/${username}/${repo}/src/branch/${ref}/${partial}`}>{part}</Link>
                    }
                  </span>
                )
              })}
            </div>
          </div>

          <div className="file-viewer-container">
            <div className="file-viewer-header">
              <span className="file-viewer-name">{pathParts[pathParts.length - 1]}</span>
              <span className="file-viewer-lines">{content.split('\n').length} lines</span>
            </div>
            <div className="file-viewer">
              <table className="file-viewer-table">
                <tbody>
                  {content.split('\n').map((line, i) => (
                    <tr key={i} className="file-line">
                      <td className="line-number">{i + 1}</td>
                      <td className="line-content"><code>{line}</code></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
