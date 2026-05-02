import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getMe, getCurrentUser } from '../../../api/client'
import RepoCard from '../../../components/RepoCard'

interface Repo {
  id: string
  name: string
  description: string | null
  is_private: number
  default_branch: string
  created_at: string
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const currentUser = getCurrentUser()

  useEffect(() => {
    if (!currentUser) {
      navigate('/user/login')
      return
    }
    getMe()
      .then((data) => setRepos(data.repos))
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Error'))
      .finally(() => setLoading(false))
  }, [currentUser, navigate])

  if (loading) return <div className="page-loading">Loading...</div>
  if (error) return <div className="alert alert-error">{error}</div>

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard</h1>
        <Link to="/repo/create" className="btn btn-primary">New Repository</Link>
      </div>
      {repos.length === 0 ? (
        <p>You have no repositories yet. <Link to="/repo/create">Create one</Link>.</p>
      ) : (
        <div className="repo-list">
          {repos.map((repo) => (
            <RepoCard
              key={repo.id}
              owner={currentUser!.username}
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
