import { useParams } from 'react-router-dom'

export default function OrgTeamRepositories() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Team Repositories</h2>
      <p>This feature is coming soon.</p>
    </div>
  )
}
