import { useParams } from 'react-router-dom'

export default function OrgTeamNew() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – New Team</h2>
      <p>This feature is coming soon.</p>
    </div>
  )
}
