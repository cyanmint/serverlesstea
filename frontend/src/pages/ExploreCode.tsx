import { useState } from 'react'
import { Link } from 'react-router-dom'

interface CodeResult {
  owner: string
  repo: string
  path: string
  lineNumber: number
  fragment: string
}

export default function ExploreCode() {
  const [query, setQuery] = useState('')
  const [results] = useState<CodeResult[]>([])
  const [searched, setSearched] = useState(false)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setSearched(true)
    // Code search endpoint not yet implemented in backend
  }

  return (
    <div className="page-content explore code">
      <nav className="explore-navbar">
        <Link to="/explore/repos" className="item">🗂 Repositories</Link>
        <Link to="/explore/users" className="item">👤 Users</Link>
        <Link to="/explore/organizations" className="item">🏢 Organizations</Link>
        <Link to="/explore/code" className="item active">🔍 Code</Link>
      </nav>

      <div className="ui container">
        <form onSubmit={handleSearch} className="explore-search-form">
          <input
            type="text"
            className="explore-search-input"
            placeholder="Search code…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        {searched && results.length === 0 && (
          <div className="empty-placeholder">
            <span>🔍</span>
            <p>No code results found{query ? ` for "${query}"` : ''}.</p>
            <p className="muted">Code search requires an indexed backend.</p>
          </div>
        )}

        <div className="code-search-results">
          {results.map((r, i) => (
            <div key={i} className="code-result-item">
              <div className="code-result-path">
                <Link to={`/${r.owner}/${r.repo}`}>{r.owner}/{r.repo}</Link>
                {' / '}
                <Link to={`/${r.owner}/${r.repo}/blob/HEAD/${r.path}`}>{r.path}</Link>
                <span className="muted"> line {r.lineNumber}</span>
              </div>
              <pre className="code-result-fragment">{r.fragment}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
