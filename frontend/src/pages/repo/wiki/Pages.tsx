import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import RepoHeader from '../../../components/RepoHeader'
import { listWikiPages, type WikiPage } from '../../../api/client'

export default function WikiPages() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const [pages, setPages] = useState<WikiPage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!username || !repo) return
    listWikiPages(username, repo).then(r => setPages(r.pages)).catch(() => {}).finally(() => setLoading(false))
  }, [username, repo])

  if (loading) return <div className="page-loading">Loading…</div>

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0 }}>Wiki Pages</h2>
          <Link to={`/${username}/${repo}/wiki/_new`} className="btn btn-primary btn-sm">New Page</Link>
        </div>
        {pages.length === 0 ? (
          <div className="empty-placeholder">
            <p>No wiki pages yet.</p>
          </div>
        ) : (
          <div>
            {pages.map(p => (
              <div key={p.id} style={{ padding: '0.6rem 0', borderBottom: '1px solid var(--border-color)' }}>
                <Link to={`/${username}/${repo}/wiki/${encodeURIComponent(p.title)}`} style={{ fontWeight: 500 }}>{p.title}</Link>
                <span style={{ marginLeft: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>Updated {new Date(p.updated_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
