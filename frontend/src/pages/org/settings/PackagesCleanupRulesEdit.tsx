import { useParams } from 'react-router-dom'

export default function OrgCleanupEdit() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Settings – Edit Cleanup Rule</h2>
      <p style={{ color: 'var(--text-muted)' }}>This deployment does not support Package Registry.</p>
    </div>
  )
}
