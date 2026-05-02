import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUser } from '../api/client'
import RepoCard from '../components/RepoCard'

interface User {
  id: string
  username: string
  display_name: string | null
  bio: string | null
  created_at: string
}

interface Repo {
  id: string
  name: string
  description: string | null
  default_branch: string
}

export default function UserProfile() {
  const { username } = useParams<{ username: string }>()
  const [user, setUser] = useState<User | null>(null)
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username) return
    getUser(username)
      .then((data) => {
        setUser(data.user)
        setRepos(data.repos)
      })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Error'))
      .finally(() => setLoading(false))
  }, [username])

  if (loading) return <div className="page-loading">Loading...</div>
  if (error) return <div className="alert alert-error">{error}</div>
  if (!user) return <div className="alert alert-error">User not found</div>

  return (
    <div className="page">
      <div className="profile-header">
        <h1>{user.display_name ?? user.username}</h1>
        <p className="username">@{user.username}</p>
        {user.bio && <p className="bio">{user.bio}</p>}
        <small>Joined {new Date(user.created_at).toLocaleDateString()}</small>
      </div>
      <h2>Repositories</h2>
      <div className="repo-list">
        {repos.map((repo) => (
          <RepoCard key={repo.id} owner={user.username} name={repo.name} description={repo.description} />
        ))}
      </div>
    </div>
  )
}
