import { useParams } from 'react-router-dom'

export default function OrgRunnersEdit() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h2>{org} – Settings – Edit Runner</h2>
      <p>This feature is coming soon.</p>
    </div>
  )
}
