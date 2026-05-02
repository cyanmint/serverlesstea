import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { listOrgMembers, removeOrgMember, getOrg, getCurrentUser, OrgMember } from '../../../api/client'

export default function OrgMembers() {
  const { orgname } = useParams<{ orgname: string }>()
  const [members, setMembers] = useState<OrgMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const currentUser = getCurrentUser()
  const [currentRole, setCurrentRole] = useState<string>('member')

  function loadMembers() {
    if (!orgname) return
    Promise.all([listOrgMembers(orgname), getOrg(orgname)])
      .then(([memberData, orgData]) => {
        setMembers(memberData.members)
        const me = orgData.members.find((m) => m.username === currentUser?.username)
        if (me) setCurrentRole(me.role)
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadMembers() }, [orgname])

  async function handleRemove(username: string) {
    if (!orgname || !confirm(`Remove ${username} from this organization?`)) return
    try {
      await removeOrgMember(orgname, username)
      setMembers((prev) => prev.filter((m) => m.username !== username))
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed')
    }
  }

  if (loading) return <div className="page-loading">Loading…</div>

  return (
    <div className="page-content">
      <h1>{orgname} – Members</h1>
      {error && <div className="alert alert-error">{error}</div>}
      {members.length === 0 ? (
        <p className="empty-placeholder">No members found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {members.map((m) => (
            <li key={m.user_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid #e0e0e0' }}>
              <div>
                <strong>{m.username}</strong>
                <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: '#888', border: '1px solid #ccc', borderRadius: '10px', padding: '0 6px' }}>{m.role}</span>
              </div>
              {currentRole === 'owner' && m.username !== currentUser?.username && (
                <button className="btn btn-sm" style={{ color: 'red' }} onClick={() => handleRemove(m.username)}>Remove</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
