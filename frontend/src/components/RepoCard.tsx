import { Link } from 'react-router-dom'

interface RepoCardProps {
  owner: string
  name: string
  description?: string | null
  defaultBranch?: string
  updatedAt?: string
}

export default function RepoCard({ owner, name, description, updatedAt }: RepoCardProps) {
  return (
    <div className="card">
      <div className="card-header">
        <Link className="repo-link" to={`/${owner}/${name}`}>
          {owner}/{name}
        </Link>
      </div>
      {description && <p className="card-desc">{description}</p>}
      {updatedAt && <small className="card-meta">Updated {new Date(updatedAt).toLocaleDateString()}</small>}
    </div>
  )
}
