import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { listRepos } from '../../api/client'

interface Repo { id: string; name: string; description: string | null; owner_username: string; is_private: number }
interface FileMatch { repo: string; owner: string; path: string }

export default function ExploreCodeSearch() {
  const [query, setQuery] = useState('')
  const [allFiles, setAllFiles] = useState<FileMatch[]>([])
  const [results, setResults] = useState<FileMatch[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true); setError('')
    try {
      const { repos } = await listRepos()
      const pubRepos = (repos as Repo[]).filter(r => !r.is_private)
      const { getRepoTree } = await import('../../api/client')
      const all: FileMatch[] = []
      await Promise.all(pubRepos.slice(0, 10).map(async r => {
        try {
          const tree = await getRepoTree(r.owner_username, r.name, 'HEAD')
          for (const f of tree.files as Array<{ path: string; type: string }>) {
            if (f.type !== 'tree' && f.path.toLowerCase().includes(query.toLowerCase())) {
              all.push({ repo: r.name, owner: r.owner_username, path: f.path })
            }
          }
        } catch { /* skip inaccessible repos */ }
      }))
      setAllFiles(all)
      setResults(all.slice(0, 50))
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="page">
      <h1 style={{ marginBottom: '1rem' }}>Search Code</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', maxWidth: '600px' }}>
        <input ref={inputRef} type="search" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search filenames across public repositories…" style={{ flex: 1, padding: '0.5rem 0.75rem', border: '1px solid var(--border-color)', borderRadius: '6px' }} />
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Searching…' : 'Search'}</button>
      </form>
      {error && <div className="alert alert-error">{error}</div>}
      {!loading && results.length > 0 && (
        <>
          <p style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{allFiles.length} file{allFiles.length !== 1 ? 's' : ''} found{allFiles.length > 50 ? ' (showing first 50)' : ''}</p>
          {results.map((r, i) => (
            <div key={i} style={{ padding: '0.4rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span>📄</span>
              <Link to={`/${r.owner}/${r.repo}/src/branch/HEAD/${r.path}`} style={{ color: 'var(--color-accent)', wordBreak: 'break-all' }}>
                {r.owner}/{r.repo}/{r.path}
              </Link>
            </div>
          ))}
        </>
      )}
      {!loading && query && results.length === 0 && allFiles.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No files found matching &ldquo;{query}&rdquo;</p>}
    </div>
  )
}
