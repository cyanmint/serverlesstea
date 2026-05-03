import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getRepoTree } from '../api/client'
import RepoHeader from '../components/RepoHeader'

interface FileEntry {
  path: string
  type: string
  oid: string
}

function fileIcon(type: string, name: string): string {
  if (type === 'tree' || type === 'dir') return '📁'
  const ext = name.split('.').pop()?.toLowerCase() ?? ''
  if (['ts', 'tsx', 'js', 'jsx', 'mjs'].includes(ext)) return '📜'
  if (['md', 'txt', 'rst'].includes(ext)) return '📝'
  if (['json', 'yaml', 'yml', 'toml'].includes(ext)) return '⚙️'
  if (['png', 'jpg', 'gif', 'svg', 'ico'].includes(ext)) return '🖼️'
  if (['sh', 'bash'].includes(ext)) return '🖥️'
  return '📄'
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
                return (
                  <span key={partial}>
                    <span className="breadcrumb-sep"> / </span>
                    <Link to={`/${username}/${repo}/src/branch/${ref}/${partial}`}>{part}</Link>
                  </span>
                )
              })}
            </div>
          </div>

          <div className="file-table-container">
            <table className="files-table">
              <tbody>
                {path && (
                  <tr>
                    <td className="file-icon-cell">📁</td>
                    <td className="file-name-cell">
                      <Link to={`/${username}/${repo}/src/branch/${ref}/${pathParts.slice(0, -1).join('/')}`}>
                        ..
                      </Link>
                    </td>
                  </tr>
                )}
                {files.map((f) => {
                  const name = f.path.split('/').pop() ?? f.path
                  const isDir = f.type === 'tree' || f.type === 'dir'
                  const href = isDir
                    ? `/${username}/${repo}/src/branch/${ref}/${f.path}`
                    : `/${username}/${repo}/blob/${ref}/${f.path}`
                  return (
                    <tr key={f.path}>
                      <td className="file-icon-cell">{fileIcon(f.type, name)}</td>
                      <td className="file-name-cell"><Link to={href}>{name}</Link></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
