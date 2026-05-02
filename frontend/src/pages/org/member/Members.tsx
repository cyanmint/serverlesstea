import { useParams } from 'react-router-dom'

export default function OrgMembers() {
  const { org } = useParams<{ org: string }>()
  return (
    <div className="page">
      <h1>{org} – Members</h1>
      <p>No members to display.</p>
    </div>
  )
}
