import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getRepo, getRepoTree } from '../api/client'

interface Repo {
  id: string
  name: string
  description: string | null
  is_private: number
  default_branch: string
  created_at: string
  owner_username: string
}

interface FileEntry {
  path: string
  type: string
  oid: string
}

export default function RepoPage() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const [repoData, setRepoData] = useState<Repo | null>(null)
  const [files, setFiles] = useState<FileEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username || !repo) return
    getRepo(username, repo)
      .then(async (data) => {
        setRepoData(data.repo)
        try {
          const tree = await getRepoTree(username, repo, data.repo.default_branch)
          setFiles(tree.files)
        } catch {
          // repo might be empty
        }
      })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Error'))
      .finally(() => setLoading(false))
  }, [username, repo])

  if (loading) return <div className="page-loading">Loading...</div>
  if (error) return <div className="alert alert-error">{error}</div>
  if (!repoData) return <div className="alert alert-error">Repository not found</div>

  return (
    <div className="page">
      <div className="repo-header">
        <h1>
          <Link to={`/${username}`}>{username}</Link>
          <span className="separator"> / </span>
          {repoData.name}
        </h1>
        {repoData.description && <p>{repoData.description}</p>}
        <div className="repo-meta">
          <span className="badge">{repoData.default_branch}</span>
          <Link to={`/${username}/${repo}/commits/${repoData.default_branch}`}>Commits</Link>
        </div>
        <p className="clone-url">
          <strong>Clone:</strong>{' '}
          <code>{window.location.origin}/{username}/{repo}.git</code>
        </p>
      </div>
      {files.length > 0 && (
        <div className="file-tree">
          <table className="files-table">
            <tbody>
              {files.map((f) => (
                <tr key={f.path}>
                  <td>
                    <Link to={`/${username}/${repo}/blob/${repoData.default_branch}/${f.path}`}>
                      {f.path}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
