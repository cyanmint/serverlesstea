import { useParams } from 'react-router-dom'

export default function OrgActionsGeneral() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Settings – Actions General</h2>
      <p style={{ color: 'var(--text-muted)' }}>This deployment does not support CI/CD Actions.</p>
    </div>
  )
}
