import { useParams, NavLink } from 'react-router-dom'

export default function OrgTeamNavbar() {
  const { org, teamname } = useParams<{ org: string; teamname: string }>()
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
    padding: '0.3rem 0.6rem',
    borderRadius: '4px',
    textDecoration: 'none' as const,
    fontWeight: isActive ? 600 : 400,
  })
  return (
    <nav style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
      <NavLink to={`/org/${org}/teams/${teamname}/members`} style={linkStyle}>Members</NavLink>
      <NavLink to={`/org/${org}/teams/${teamname}/repositories`} style={linkStyle}>Repositories</NavLink>
    </nav>
  )
}
