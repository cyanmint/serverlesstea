import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUser, listRepos, getRepoTree } from '../../api/client'

interface Repo { id: string; name: string; owner_username: string; is_private: number }
interface FileMatch { repo: string; owner: string; path: string }

export default function UserCode() {
  const { username } = useParams<{ username: string }>()
  const [query, setQuery] = useState('')
  const [repos, setRepos] = useState<Repo[]>([])
  const [results, setResults] = useState<FileMatch[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState<{ username: string } | null>(null)

  useEffect(() => {
    if (!username) return
    getUser(username).then(r => setUser(r.user as { username: string })).catch(() => {})
    listRepos().then(r => setRepos((r.repos as Repo[]).filter(repo => repo.owner_username === username && !repo.is_private))).catch(() => {})
  }, [username])

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true); setError(''); setResults([])
    const q = query.toLowerCase()
    try {
      const all: FileMatch[] = []
      await Promise.all(repos.slice(0, 8).map(async r => {
        try {
          const tree = await getRepoTree(r.owner_username, r.name, 'HEAD')
          for (const f of tree.files as Array<{ path: string; type: string }>) {
            if (f.type !== 'tree' && f.path.toLowerCase().includes(q)) {
              all.push({ repo: r.name, owner: r.owner_username, path: f.path })
            }
          }
        } catch { /* skip */ }
      }))
      setResults(all.slice(0, 50))
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="page">
      <h2 style={{ marginBottom: '1rem' }}>{user?.username ?? username} – Code</h2>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', maxWidth: '540px', marginBottom: '1.5rem' }}>
        <input type="search" value={query} onChange={e => setQuery(e.target.value)}
          placeholder={`Search files in ${username}'s public repos…`}
          style={{ flex: 1, padding: '0.5rem 0.75rem', border: '1px solid var(--border-color)', borderRadius: '6px' }} />
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Searching…' : 'Search'}</button>
      </form>
      {error && <div className="alert alert-error">{error}</div>}
      {results.map((r, i) => (
        <div key={i} style={{ padding: '0.4rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}>
          <span>📄</span>
          <a href={`/${r.owner}/${r.repo}/src/branch/HEAD/${r.path}`} style={{ color: 'var(--color-accent)', wordBreak: 'break-all' }}>{r.repo}/{r.path}</a>
        </div>
      ))}
    </div>
  )
}
