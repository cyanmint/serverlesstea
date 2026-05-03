import { useParams, Link } from 'react-router-dom'
import RepoHeader from '../components/RepoHeader'

interface WikiPageEntry {
  name: string
  subURL: string
  updated_at: string
}

export default function WikiPage() {
  const { username, repo, page: pageSlug } = useParams<{
    username: string
    repo: string
    page?: string
  }>()

  // Wiki backend not yet implemented — renders Gitea-mirrored UI structure
  const pages: WikiPageEntry[] = []
  const currentPage = null as WikiPageEntry | null
  const content: string | null = null

  const repoBase = `/${username}/${repo}`

  return (
    <div className="repo-page repository wiki view">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="ui container">
        {pages.length === 0 && !currentPage ? (
          <div className="empty-placeholder">
            <span style={{ fontSize: '3rem' }}>📖</span>
            <h2>No wiki pages yet</h2>
            <p>
              A wiki allows you to write documentation for your project.{' '}
              <Link to={`${repoBase}/wiki/_new`} className="btn btn-primary btn-sm">
                Create first page
              </Link>
            </p>
          </div>
        ) : (
          <div className="wiki-layout">
            {/* Sidebar */}
            <aside className="wiki-sidebar">
              <h4>Pages</h4>
              <ul className="wiki-page-list">
                <li>
                  <Link
                    to={`${repoBase}/wiki`}
                    className={!pageSlug ? 'active' : ''}
                  >
                    Home
                  </Link>
                </li>
                {pages.map((p) => (
                  <li key={p.subURL}>
                    <Link
                      to={`${repoBase}/wiki/${p.subURL}`}
                      className={pageSlug === p.subURL ? 'active' : ''}
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="wiki-sidebar-actions">
                <Link to={`${repoBase}/wiki/_new`} className="btn btn-primary btn-sm">
                  New Page
                </Link>
              </div>
            </aside>

            {/* Content */}
            <main className="wiki-content">
              {currentPage ? (
                <>
                  <div className="wiki-page-header">
                    <h2>{currentPage.name}</h2>
                    <div className="wiki-page-meta muted">
                      Last updated {new Date(currentPage.updated_at).toLocaleDateString()}
                      {' · '}
                      <Link to={`${repoBase}/wiki/${currentPage.subURL}?action=_edit`}>
                        Edit
                      </Link>
                      {' · '}
                      <Link to={`${repoBase}/wiki/${currentPage.subURL}?action=_revision`}>
                        History
                      </Link>
                    </div>
                  </div>
                  <div className="render-content markup">
                    {content ?? <em>Loading…</em>}
                  </div>
                </>
              ) : (
                <div className="empty-placeholder">
                  <p>Page not found.</p>
                  <Link to={`${repoBase}/wiki`}>Go to Home</Link>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  )
}
