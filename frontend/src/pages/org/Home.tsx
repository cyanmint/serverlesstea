import { useParams } from 'react-router-dom'

export default function OrgHomePage() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h1>{org}</h1>
      <p>Organization home page.</p>
    </div>
  )
}
