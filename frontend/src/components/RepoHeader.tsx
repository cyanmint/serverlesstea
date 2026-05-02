import { Link, useLocation } from 'react-router-dom'
import { getCurrentUser } from '../api/client'

interface RepoHeaderProps {
  owner: string
  repo: string
  isPrivate?: boolean
  defaultBranch?: string
}

export default function RepoHeader({ owner, repo, isPrivate, defaultBranch }: RepoHeaderProps) {
  const location = useLocation()
  const currentUser = getCurrentUser()
  const isOwner = currentUser?.username === owner

  const repoBase = `/${owner}/${repo}`

  function activeTab(): 'code' | 'issues' | 'releases' | 'settings' | null {
    const p = location.pathname
    if (p.startsWith(`${repoBase}/issues`)) return 'issues'
    if (p.startsWith(`${repoBase}/releases`)) return 'releases'
    if (p.startsWith(`${repoBase}/settings`)) return 'settings'
    return 'code'
  }

  const tab = activeTab()

  const srcBase =
    defaultBranch
      ? `${repoBase}/src/branch/${defaultBranch}`
      : repoBase

  return (
    <div className="repo-subheader">
      <div className="repo-title-row">
        <span className="repo-title-icon">
          {isPrivate ? '🔒' : '📦'}
        </span>
        <h1 className="repo-title">
          <Link to={`/${owner}`}>{owner}</Link>
          <span className="repo-title-sep"> / </span>
          <Link to={repoBase}>{repo}</Link>
        </h1>
        {isPrivate && <span className="repo-visibility-badge">Private</span>}
      </div>

      <nav className="repo-tabs" aria-label="Repository navigation">
        <Link
          to={srcBase}
          className={`repo-tab${tab === 'code' ? ' active' : ''}`}
        >
          <span className="tab-icon">💻</span> Code
        </Link>
        <Link
          to={`${repoBase}/issues`}
          className={`repo-tab${tab === 'issues' ? ' active' : ''}`}
        >
          <span className="tab-icon">⭕</span> Issues
        </Link>
        <Link
          to={`${repoBase}/releases`}
          className={`repo-tab${tab === 'releases' ? ' active' : ''}`}
        >
          <span className="tab-icon">🏷️</span> Releases
        </Link>
        {isOwner && (
          <Link
            to={`${repoBase}/settings`}
            className={`repo-tab${tab === 'settings' ? ' active' : ''}`}
          >
            <span className="tab-icon">⚙️</span> Settings
          </Link>
        )}
      </nav>
    </div>
  )
}
