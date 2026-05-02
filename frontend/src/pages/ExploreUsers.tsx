import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getUser } from '../api/client'

interface UserSummary {
  id: string
  username: string
  display_name: string | null
  bio: string | null
  created_at: string
}

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function ExploreUsers() {
  const query = useQuery()
  const keyword = query.get('q') ?? ''
  const sort = query.get('sort') ?? 'newest'

  const [users, setUsers] = useState<UserSummary[]>([])
  const [search, setSearch] = useState(keyword)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch a handful of known users (real search endpoint not yet implemented)
  useEffect(() => {
    setLoading(true)
    // Without a search API we show an empty list placeholder
    setUsers([])
    setLoading(false)
    setError('')
  }, [keyword, sort])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    // navigation would update URL; for now reload with new q
    window.location.search = `?q=${encodeURIComponent(search)}&sort=${sort}`
  }

  return (
    <div className="page-content explore users">
      <nav className="explore-navbar">
        <Link to="/explore/repos" className="item">🗂 Repositories</Link>
        <Link to="/explore/users" className="item active">👤 Users</Link>
        <Link to="/explore/organizations" className="item">🏢 Organizations</Link>
        <Link to="/explore/code" className="item">🔍 Code</Link>
      </nav>
      <div className="ui container">
        <div className="explore-search-bar">
          <form onSubmit={handleSearch} className="explore-search-form">
            <input
              type="text"
              className="explore-search-input"
              placeholder="Search users…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
          <div className="explore-sort">
            <span>Sort: </span>
            {[
              { key: 'newest', label: 'Newest' },
              { key: 'oldest', label: 'Oldest' },
              { key: 'alphabetically', label: 'A–Z' },
              { key: 'reversealphabetically', label: 'Z–A' },
            ].map(({ key, label }) => (
              <a
                key={key}
                href={`?q=${encodeURIComponent(keyword)}&sort=${key}`}
                className={`sort-option${sort === key ? ' active' : ''}`}
              >{label}</a>
            ))}
          </div>
        </div>

        {loading && <div className="page-loading">Loading…</div>}
        {error && <div className="alert alert-error">{error}</div>}

        <div className="flex-list user-list">
          {users.length === 0 && !loading ? (
            <div className="empty-placeholder">
              <span>👤</span>
              <p>No users found{keyword ? ` for "${keyword}"` : ''}.</p>
            </div>
          ) : (
            users.map((u) => (
              <div key={u.id} className="flex-item user-list-item">
                <div className="flex-item-leading user-avatar-placeholder">
                  {(u.display_name ?? u.username)[0].toUpperCase()}
                </div>
                <div className="flex-item-main">
                  <div className="flex-item-title">
                    <Link to={`/${u.username}`}>{u.display_name ?? u.username}</Link>
                  </div>
                  <div className="flex-item-body">
                    <span>@{u.username}</span>
                    {u.bio && <span> · {u.bio}</span>}
                    <span className="explore-joined"> · Joined {new Date(u.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
