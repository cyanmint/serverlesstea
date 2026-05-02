import { useParams } from 'react-router-dom'

export default function OrgRunnersEdit() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Settings – Edit Runner</h2>
      <p style={{ color: 'var(--text-muted)' }}>This deployment does not support Runners.</p>
    </div>
  )
}
