import { useState } from 'react'

export default function ExploreCodeSearch() {
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="page">
      <h1>Search Code</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search code..."
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      {submitted && <p>Code search is coming soon. Query: <strong>{query}</strong></p>}
    </div>
  )
}
