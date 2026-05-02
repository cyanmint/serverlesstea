import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOrg, listRepos, Org, OrgMember } from '../../api/client'

interface Repo {
  id: string
  name: string
  description: string | null
  is_private: number
  owner_username: string
}

export default function OrgHome() {
  const { orgname } = useParams<{ orgname: string }>()
  const [org, setOrg] = useState<Org | null>(null)
  const [members, setMembers] = useState<OrgMember[]>([])
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!orgname) return
    Promise.all([getOrg(orgname), listRepos()])
      .then(([orgData, repoData]) => {
        setOrg(orgData.org)
        setMembers(orgData.members)
        setRepos(repoData.repos.filter((r) => r.owner_username === orgname))
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed'))
      .finally(() => setLoading(false))
  }, [orgname])

  if (loading) return <div className="page-loading">Loading…</div>
  if (error) return <div className="alert alert-error">{error}</div>
  if (!org) return null

  const initial = (org.display_name ?? org.name)[0].toUpperCase()

  return (
    <div className="page-content">
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ width: 64, height: 64, borderRadius: '8px', background: '#4a90d9', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold', flexShrink: 0 }}>
          {initial}
        </div>
        <div>
          <h1 style={{ margin: 0 }}>{org.display_name ?? org.name}</h1>
          {org.description && <p style={{ color: '#666', margin: '0.25rem 0 0' }}>{org.description}</p>}
          <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.25rem' }}>
            {members.length} {members.length === 1 ? 'member' : 'members'} · {repos.length} {repos.length === 1 ? 'repository' : 'repositories'}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <Link to={`/org/${orgname}/members`} className="btn btn-sm">Members</Link>
        <Link to={`/org/${orgname}/settings`} className="btn btn-sm">Settings</Link>
      </div>
      <h2>Repositories</h2>
      {repos.length === 0 ? (
        <p className="empty-placeholder">No repositories in this organization yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {repos.map((repo) => (
            <li key={repo.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid #e0e0e0' }}>
              <Link to={`/${orgname}/${repo.name}`}><strong>{repo.name}</strong></Link>
              {repo.description && <span style={{ marginLeft: '0.5rem', color: '#666' }}>{repo.description}</span>}
              {!!repo.is_private && <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: '#888' }}>private</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
