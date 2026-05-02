import { useParams } from 'react-router-dom'

export default function OrgHookNew() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Settings – New Webhook</h2>
      <p>This feature is coming soon.</p>
    </div>
  )
}
