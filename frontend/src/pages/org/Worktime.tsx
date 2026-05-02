import { useParams } from 'react-router-dom'

export default function OrgWorktime() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Work Time</h2>
      <p style={{ color: 'var(--text-muted)' }}>This deployment does not support Work Time Tracking.</p>
    </div>
  )
}
