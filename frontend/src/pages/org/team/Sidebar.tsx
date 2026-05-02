import { useParams } from 'react-router-dom'

export default function OrgTeamSidebar() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Team Sidebar</h2>
      <p>This feature is coming soon.</p>
    </div>
  )
}
