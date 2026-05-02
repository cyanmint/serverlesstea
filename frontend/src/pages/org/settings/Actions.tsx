import { useParams } from 'react-router-dom'

export default function OrgSettingsActions() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Settings – Actions</h2>
      <p style={{ color: 'var(--text-muted)' }}>This deployment does not support CI/CD Actions.</p>
    </div>
  )
}
