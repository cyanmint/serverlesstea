import { useParams } from 'react-router-dom'

export default function OrgTeams() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Teams</h2>
      <p>This feature is coming soon.</p>
    </div>
  )
}
