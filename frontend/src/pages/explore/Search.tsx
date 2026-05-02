import { useState } from 'react'

export default function ExploreSearch() {
  const [query, setQuery] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
  }

  return (
    <div className="page">
      <h1>Search</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      <p style={{ marginTop: '1rem' }}>Full search coming soon.</p>
    </div>
  )
}
