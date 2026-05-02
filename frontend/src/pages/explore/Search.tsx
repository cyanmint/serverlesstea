import { useState } from 'react'
import { Link } from 'react-router-dom'
import { listRepos, listUsers } from '../../api/client'

interface Repo { id: string; name: string; description: string | null; owner_username: string; is_private: number }
interface User { id: string; username: string; display_name: string | null; bio: string | null }

export default function ExploreSearch() {
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState<'repos' | 'users'>('repos')
  const [repos, setRepos] = useState<Repo[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true); setError(''); setSearched(true)
    const q = query.toLowerCase()
    try {
      const [repoRes, userRes] = await Promise.all([
        listRepos(),
        listUsers({ q: query }),
      ])
      setRepos((repoRes.repos as Repo[]).filter(r => !r.is_private && (r.name.toLowerCase().includes(q) || (r.description ?? '').toLowerCase().includes(q))))
      setUsers(userRes.users as User[])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Search failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="page">
      <h1 style={{ marginBottom: '1rem' }}>Search</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', maxWidth: '600px' }}>
        <input type="search" value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Search repositories and users…" style={{ flex: 1, padding: '0.5rem 0.75rem', border: '1px solid var(--border-color)', borderRadius: '6px' }} />
        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Searching…' : 'Search'}</button>
      </form>
      {error && <div className="alert alert-error">{error}</div>}
      {searched && !loading && (
        <>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
            {(['repos', 'users'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ padding: '0.4rem 0.75rem', background: 'none', border: 'none', cursor: 'pointer', borderBottom: tab === t ? '2px solid var(--color-accent)' : '2px solid transparent', fontWeight: tab === t ? 600 : 400 }}>
                {t === 'repos' ? `Repositories (${repos.length})` : `Users (${users.length})`}
              </button>
            ))}
          </div>
          {tab === 'repos' && (
            repos.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No repositories found.</p> :
            repos.map(r => (
              <div key={r.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)' }}>
                <Link to={`/${r.owner_username}/${r.name}`} style={{ color: 'var(--color-accent)', fontWeight: 600 }}>{r.owner_username}/{r.name}</Link>
                {r.description && <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{r.description}</p>}
              </div>
            ))
          )}
          {tab === 'users' && (
            users.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No users found.</p> :
            (users as User[]).map(u => (
              <div key={u.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span style={{ fontSize: '2rem' }}>👤</span>
                <div>
                  <Link to={`/${u.username}`} style={{ color: 'var(--color-accent)', fontWeight: 600 }}>{u.username}</Link>
                  {u.display_name && <span style={{ marginLeft: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{u.display_name}</span>}
                  {u.bio && <p style={{ margin: '0.1rem 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{u.bio}</p>}
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  )
}
