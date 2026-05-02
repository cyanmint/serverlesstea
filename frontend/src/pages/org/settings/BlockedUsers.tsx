import { useParams } from 'react-router-dom'

export default function OrgBlockedUsers() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Settings – Blocked Users</h2>
      <p style={{ color: 'var(--text-muted)' }}>This deployment does not support Blocked Users.</p>
    </div>
  )
}
