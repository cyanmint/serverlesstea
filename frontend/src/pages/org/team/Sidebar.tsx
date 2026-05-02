import { useParams, NavLink } from 'react-router-dom'

export default function OrgTeamSidebar() {
  const { org } = useParams<{ org: string }>()
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    display: 'block',
    padding: '0.3rem 0.6rem',
    color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
    fontWeight: isActive ? 600 : 400,
    textDecoration: 'none' as const,
    borderRadius: '4px',
  })
  return (
    <aside style={{ minWidth: '160px' }}>
      <NavLink to={`/org/${org}/teams`} style={linkStyle}>All Teams</NavLink>
    </aside>
  )
}
