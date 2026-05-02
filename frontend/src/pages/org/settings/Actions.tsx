import { useParams } from 'react-router-dom'

export default function OrgSettingsActions() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Settings – Actions</h2>
      <p>This feature is coming soon.</p>
    </div>
  )
}
