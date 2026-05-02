import { Link, useParams } from 'react-router-dom'

export default function OrgMenu() {
  const { org, orgname } = useParams<{ org?: string; orgname?: string }>()
  const orgId = org ?? orgname ?? ''
  return (
    <nav className="repo-tabs">
      <Link to={`/org/${orgId}/teams`} className="repo-tab">Teams</Link>
      <Link to={`/org/${orgId}/members`} className="repo-tab">Members</Link>
      <Link to={`/org/${orgId}/settings`} className="repo-tab">Settings</Link>
    </nav>
  )
}
