import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getRepoTree } from '../api/client'

interface FileEntry {
  path: string
  type: string
  oid: string
}

export default function FileTree() {
  const { username, repo, ref, '*': path } = useParams<{ username: string; repo: string; ref: string; '*': string }>()
  const [files, setFiles] = useState<FileEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username || !repo || !ref) return
    getRepoTree(username, repo, ref)
      .then((data) => {
        const prefix = path ? path + '/' : ''
        setFiles(data.files.filter((f) => prefix ? f.path.startsWith(prefix) : true))
      })
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
      <table className="files-table">
        <tbody>
          {files.map((f) => (
            <tr key={f.path}>
              <td>
                <Link to={`/${username}/${repo}/blob/${ref}/${f.path}`}>{f.path}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
