import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import RepoCard from '../components/RepoCard'

interface OrgData {
  name: string
  display_name: string
  description: string | null
  location: string | null
  website: string | null
  email: string | null
  visibility: 'public' | 'limited' | 'private'
  num_members: number
  num_repos: number
  created_at: string
}

interface Repo {
  id: string
  name: string
  description: string | null
  default_branch: string
}

export default function OrgHome() {
  const { orgname } = useParams<{ orgname: string }>()
  const [org] = useState<OrgData | null>(null)
  const [repos] = useState<Repo[]>([])
  const [loading] = useState(false)
  const [search, setSearch] = useState('')

  // Organization backend endpoints are not yet implemented;
  // the page renders the Gitea-mirrored structure ready to wire up.

  const filteredRepos = repos.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="page-loading">Loading…</div>

  return (
    <div className="page-content organization profile">
      {/* Org header */}
      <div className="ui container org-header">
        <div className="org-avatar-placeholder">
          {orgname?.[0]?.toUpperCase() ?? 'O'}
        </div>
        <div className="org-header-info">
          <h1 className="org-display-name">
            {org?.display_name ?? orgname}
            {org?.visibility === 'private' && (
              <span className="repo-badge private-badge">Private</span>
            )}
            {org?.visibility === 'limited' && (
              <span className="repo-badge">Limited</span>
            )}
          </h1>
          {org?.description && <p className="org-description">{org.description}</p>}
          <div className="org-meta">
            {org?.location && <span>📍 {org.location}</span>}
            {org?.website && (
              <span>
                🔗 <a href={org.website} target="_blank" rel="noopener noreferrer">{org.website}</a>
              </span>
            )}
            {org?.email && <span>✉️ {org.email}</span>}
          </div>
        </div>
      </div>

      {/* Org nav */}
      <div className="org-menu">
        <Link to={`/org/${orgname ?? ''}`} className="item active">🗂 Repositories</Link>
        <Link to={`/org/${orgname ?? ''}/members`} className="item">👥 Members</Link>
        <Link to={`/org/${orgname ?? ''}/teams`} className="item">🏷 Teams</Link>
      </div>

      <div className="ui container">
        <div className="explore-search-bar">
          <input
            type="text"
            className="explore-search-input"
            placeholder="Search repositories…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredRepos.length === 0 ? (
          <div className="empty-placeholder">
            <span style={{ fontSize: '3rem' }}>🗂</span>
            <h2>No repositories yet</h2>
            <p>This organization has no public repositories.</p>
          </div>
        ) : (
          <div className="repo-list">
            {filteredRepos.map((r) => (
              <RepoCard key={r.id} owner={orgname ?? ''} name={r.name} description={r.description} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
