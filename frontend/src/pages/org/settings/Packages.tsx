import { useParams } from 'react-router-dom'

export default function OrgPackages() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Settings – Packages</h2>
      <p>This feature is coming soon.</p>
    </div>
  )
}
