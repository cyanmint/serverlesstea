import { useParams } from 'react-router-dom'

export default function OrgProjectsList() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Projects</h2>
      <p>This feature is coming soon.</p>
    </div>
  )
}
