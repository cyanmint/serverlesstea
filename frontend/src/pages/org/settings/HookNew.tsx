import { useParams } from 'react-router-dom'

export default function OrgHookNew() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Settings – New Webhook</h2>
      <p style={{ color: 'var(--text-muted)' }}>This deployment does not support Webhooks.</p>
    </div>
  )
}
