import { useParams } from 'react-router-dom'

export default function OrgProjectsView() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Project</h2>
      <p>This feature is coming soon.</p>
    </div>
  )
}
