import { useEffect, useState } from 'react'
import { listRepos } from '../api/client'
import RepoCard from '../components/RepoCard'

interface Repo {
  id: string
  name: string
  description: string | null
  default_branch: string
  created_at: string
  owner_username: string
}

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    listRepos()
      .then((data) => setRepos(data.repos))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Error'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="page-loading">Loading...</div>
  if (error) return <div className="alert alert-error">{error}</div>

  return (
    <div className="page">
      <h1>Explore Repositories</h1>
      {repos.length === 0 ? (
        <p>No public repositories yet.</p>
      ) : (
        <div className="repo-list">
          {repos.map((repo) => (
            <RepoCard
              key={repo.id}
              owner={repo.owner_username}
              name={repo.name}
              description={repo.description}
              updatedAt={repo.created_at}
            />
          ))}
        </div>
      )}
    </div>
  )
}
