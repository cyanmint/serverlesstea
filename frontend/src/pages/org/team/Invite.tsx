import { useParams } from 'react-router-dom'

export default function OrgTeamInvite() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Invite Team Member</h2>
      <p>This feature is coming soon.</p>
    </div>
  )
}
