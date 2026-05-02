import { Link, useLocation } from 'react-router-dom'

export default function DashboardNavbar() {
  const location = useLocation()
  const tabs = [
    { label: 'Overview', to: '/dashboard' },
    { label: 'Issues', to: '/issues' },
    { label: 'Milestones', to: '/milestones' },
  ]
  return (
    <nav className="repo-tabs">
      {tabs.map((t) => (
        <Link
          key={t.to}
          to={t.to}
          className={`repo-tab${location.pathname === t.to ? ' active' : ''}`}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  )
}
