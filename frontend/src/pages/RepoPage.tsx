import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getRepo, getRepoTree, getCommits } from '../api/client'
import RepoHeader from '../components/RepoHeader'
import ClonePanel from '../components/ClonePanel'

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

interface Commit {
  oid: string
  message: string
  author: { name: string; email: string; timestamp: number }
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

export default function RepoPage() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const [repoData, setRepoData] = useState<Repo | null>(null)
  const [files, setFiles] = useState<FileEntry[]>([])
  const [latestCommit, setLatestCommit] = useState<Commit | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [readmeContent, setReadmeContent] = useState<string | null>(null)

  useEffect(() => {
    if (!username || !repo) return
    setLoading(true)
    setReadmeContent(null)
    getRepo(username, repo)
      .then(async (data) => {
        setRepoData(data.repo)
        const branch = data.repo.default_branch
        try {
          const [tree, commits] = await Promise.all([
            getRepoTree(username, repo, branch),
            getCommits(username, repo, branch),
          ])
          setFiles(tree.files)
          if (commits.commits.length > 0) setLatestCommit(commits.commits[0])

          // Try to fetch README
          const readmeFile = tree.files.find((f) =>
            /^readme(\.md|\.txt|\.rst)?$/i.test(f.path)
          )
          if (readmeFile) {
            try {
              const { getBlob } = await import('../api/client')
              const blob = await getBlob(username, repo, branch, readmeFile.path)
              setReadmeContent(blob.content)
            } catch {
              // no readme
            }
          }
        } catch {
          // empty repo
        }
      })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Error'))
      .finally(() => setLoading(false))
  }, [username, repo])

  if (loading) return <div className="page-loading">Loading…</div>
  if (error) return <div className="alert alert-error">{error}</div>
  if (!repoData) return <div className="alert alert-error">Repository not found</div>

  const branch = repoData.default_branch

  return (
    <div className="repo-page">
      <RepoHeader
        owner={username!}
        repo={repo!}
        isPrivate={repoData.is_private === 1}
        defaultBranch={branch}
      />

      <div className="repo-body">
        <div className="repo-main">
          {/* Branch / navigation bar */}
          <div className="repo-nav-bar">
            <span className="branch-badge">
              <span className="branch-icon">🌿</span>
              {branch}
            </span>
            <div className="repo-nav-links">
              <Link to={`/${username}/${repo}/commits/${branch}`} className="repo-nav-link">
                📋 Commits
              </Link>
            </div>
          </div>

          {/* File table */}
          {files.length > 0 ? (
            <div className="file-table-container">
              {latestCommit && (
                <div className="latest-commit-bar">
                  <Link to={`/${username}/${repo}/commit/${latestCommit.oid}`} className="latest-commit-msg">
                    {latestCommit.message.split('\n')[0]}
                  </Link>
                  <span className="latest-commit-meta">
                    {latestCommit.author.name} ·{' '}
                    {new Date(latestCommit.author.timestamp * 1000).toLocaleDateString()}
                  </span>
                  <Link to={`/${username}/${repo}/commit/${latestCommit.oid}`} className="latest-commit-sha">
                    {latestCommit.oid.slice(0, 7)}
                  </Link>
                </div>
              )}
              <table className="files-table">
                <tbody>
                  {files.map((f) => {
                    const name = f.path.split('/').pop() ?? f.path
                    const isDir = f.type === 'tree' || f.type === 'dir'
                    const href = isDir
                      ? `/${username}/${repo}/src/branch/${branch}/${f.path}`
                      : `/${username}/${repo}/blob/${branch}/${f.path}`
                    return (
                      <tr key={f.path}>
                        <td className="file-icon-cell">{fileIcon(f.type, name)}</td>
                        <td className="file-name-cell">
                          <Link to={href}>{name}</Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="repo-empty">
              <p>This repository is empty.</p>
              <p>Get started by pushing your first commit:</p>
              <pre className="empty-repo-hint">{`git clone ${window.location.origin.replace(/\?.*$/, '')}/git/${username}/${repo}.git
cd ${repo}
git commit --allow-empty -m "initial commit"
git push origin HEAD:${branch}`}</pre>
            </div>
          )}

          {/* README */}
          {readmeContent && (
            <div className="readme-container">
              <div className="readme-header">📝 README</div>
              <div className="readme-body">
                <pre>{readmeContent}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="repo-sidebar">
          {repoData.description && (
            <div className="sidebar-section">
              <p className="sidebar-desc">{repoData.description}</p>
            </div>
          )}
          <ClonePanel owner={username!} repo={repo!} />
          <div className="sidebar-section sidebar-meta">
            <small>
              Created {new Date(repoData.created_at).toLocaleDateString()}
            </small>
          </div>
        </aside>
      </div>
    </div>
  )
}
