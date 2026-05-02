import { useParams } from 'react-router-dom'

export default function OrgProjectsList() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Projects</h2>
      <p style={{ color: 'var(--text-muted)' }}>This deployment does not support Projects.</p>
    </div>
  )
}
