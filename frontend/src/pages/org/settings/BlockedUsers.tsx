import { useParams } from 'react-router-dom'

export default function OrgBlockedUsers() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Settings – Blocked Users</h2>
      <p>This feature is coming soon.</p>
    </div>
  )
}
