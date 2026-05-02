import { useParams } from 'react-router-dom'

export default function OrgApplications() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Settings – OAuth2 Applications</h2>
      <p style={{ color: 'var(--text-muted)' }}>This deployment does not support OAuth Applications.</p>
    </div>
  )
}
