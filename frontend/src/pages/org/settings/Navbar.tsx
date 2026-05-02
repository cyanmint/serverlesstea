import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function OrgSettingsNavbar() {
  const { org } = useParams<{ org: string }>()
  return (
    <nav className="settings-nav">
      <Link to={`/org/${org}/settings`} className="settings-nav-item">Options</Link>
      <Link to={`/org/${org}/settings/hooks`} className="settings-nav-item">Webhooks</Link>
      <Link to={`/org/${org}/settings/labels`} className="settings-nav-item">Labels</Link>
    </nav>
  )
}
