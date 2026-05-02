import { useParams } from 'react-router-dom'

export default function OrgTeamNavbar() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Team Navigation</h2>
      <p>This feature is coming soon.</p>
    </div>
  )
}
