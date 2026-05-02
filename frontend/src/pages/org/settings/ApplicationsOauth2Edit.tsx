import { useParams } from 'react-router-dom'

export default function OrgOauth2Edit() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Settings – Edit OAuth2 Application</h2>
      <p style={{ color: 'var(--text-muted)' }}>This deployment does not support OAuth.</p>
    </div>
  )
}
