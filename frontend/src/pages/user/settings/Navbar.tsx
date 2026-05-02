import { Link, useLocation } from 'react-router-dom'

export default function SettingsNavbar() {
  const loc = useLocation()
  const links = [
    { to: '/user/settings', label: 'Profile' },
    { to: '/user/settings/account', label: 'Account' },
    { to: '/user/settings/security', label: 'Security' },
    { to: '/user/settings/keys', label: 'SSH / GPG Keys' },
  ]
  return (
    <nav className="settings-nav">
      {links.map((l) => (
        <Link key={l.to} to={l.to} className={`settings-nav-item${loc.pathname === l.to ? ' active' : ''}`}>
          {l.label}
        </Link>
      ))}
    </nav>
  )
}
