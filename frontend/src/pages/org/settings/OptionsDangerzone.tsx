import { useParams } from 'react-router-dom'

export default function OrgOptionsDangerzone() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Settings – Danger Zone</h2>
      <p style={{ color: 'var(--text-muted)' }}>This deployment does not support Danger Zone Settings.</p>
    </div>
  )
}
