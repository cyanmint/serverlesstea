import { useParams } from 'react-router-dom'

export default function OrgHooks() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Settings – Webhooks</h2>
      <p>This feature is coming soon.</p>
    </div>
  )
}
