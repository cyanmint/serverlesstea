import { useParams } from 'react-router-dom'

export default function OrgWorktime() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Work Time</h2>
      <p>This feature is coming soon.</p>
    </div>
  )
}
