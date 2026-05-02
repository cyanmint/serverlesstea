import { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import RepoHeader from '../../components/RepoHeader'
import { getRepoTree } from '../../api/client'

interface FileEntry { path: string; type: string }

export default function RepoSearch() {
  const { username, repo } = useParams<{ username: string; repo: string }>()
  const [query, setQuery] = useState('')
  const [allFiles, setAllFiles] = useState<FileEntry[]>([])
  const [results, setResults] = useState<FileEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!username || !repo) return
    getRepoTree(username, repo, 'HEAD')
      .then(r => setAllFiles(r.files as FileEntry[]))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load tree'))
      .finally(() => setLoading(false))
    inputRef.current?.focus()
  }, [username, repo])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const q = query.toLowerCase()
    setResults(allFiles.filter(f => f.path.toLowerCase().includes(q)).slice(0, 50))
  }, [query, allFiles])

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2 style={{ marginBottom: '1rem' }}>Search Files</h2>
        {loading && <div className="page-loading">Loading…</div>}
        {error && <div className="alert alert-error">{error}</div>}
        {!loading && !error && (
          <>
            <input ref={inputRef} type="search" placeholder={`Search ${allFiles.length} files…`} value={query} onChange={e => setQuery(e.target.value)}
              style={{ width: '100%', maxWidth: '480px', padding: '0.5rem 0.75rem', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.95rem', marginBottom: '1rem' }} />
            {query.trim() && results.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No files match &ldquo;{query}&rdquo;</p>}
            {results.map(f => (
              <div key={f.path} style={{ padding: '0.4rem 0', borderBottom: '1px solid var(--border-color)' }}>
                <span style={{ marginRight: '0.5rem' }}>{f.type === 'tree' ? '📁' : '📄'}</span>
                <Link to={`/${username}/${repo}/src/branch/HEAD/${f.path}`} style={{ color: 'var(--color-accent)' }}>{f.path}</Link>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
