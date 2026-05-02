import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'
import { getWikiPage, type WikiPage } from '../../../api/client'

export default function WikiView() {
  const { username, repo, page } = useParams<{ username: string; repo: string; page: string }>()
  const [wikiPage, setWikiPage] = useState<WikiPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username || !repo || !page) return
    getWikiPage(username, repo, page)
      .then(r => setWikiPage(r.page))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Page not found'))
      .finally(() => setLoading(false))
  }, [username, repo, page])

  if (loading) return <div className="page-loading">Loading…</div>

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        {error ? (
          <div className="empty-placeholder">
            <h2>Page not found</h2>
            <p><Link to={`/${username}/${repo}/wiki`}>Go to wiki home</Link></p>
          </div>
        ) : wikiPage ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0 }}>{wikiPage.title}</h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to={`/${username}/${repo}/wiki/_new`} className="btn btn-sm">Edit</Link>
                <Link to={`/${username}/${repo}/wiki/_pages`} className="btn btn-sm">All Pages</Link>
              </div>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              By {wikiPage.creator_username} · Updated {new Date(wikiPage.updated_at).toLocaleDateString()}
            </div>
            <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{wikiPage.content}</div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
