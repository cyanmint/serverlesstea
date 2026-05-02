import { useParams } from 'react-router-dom'

export default function OrgCleanupPreview() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Settings – Cleanup Rules Preview</h2>
      <p style={{ color: 'var(--text-muted)' }}>This deployment does not support Package Registry.</p>
    </div>
  )
}
