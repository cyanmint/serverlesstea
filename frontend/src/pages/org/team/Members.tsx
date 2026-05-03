import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOrgTeam, addTeamMember } from '../../../api/client'

interface Member { id: string; username: string; role?: string }
interface TeamDetail { id: string; name: string; permission: string; members?: Member[] }

export default function OrgTeamMembers() {
  const { org, teamname } = useParams<{ org: string; teamname: string }>()
  const [team, setTeam] = useState<TeamDetail | null>(null)
  const [newMember, setNewMember] = useState('')
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

  function loadTeam() {
    if (!org || !teamname) return
    setLoading(true)
    getOrgTeam(org, teamname)
      .then(r => setTeam(r.team as TeamDetail))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadTeam() }, [org, teamname])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!org || !teamname || !newMember.trim()) return
    setAdding(true); setMsg(''); setError('')
    try {
      await addTeamMember(org, teamname, newMember.trim())
      setMsg(`Added ${newMember}.`); setNewMember(''); loadTeam()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to add member')
    } finally { setAdding(false) }
  }

  return (
    <div className="page">
      <h2 style={{ marginBottom: '1rem' }}>{org}/{teamname} – Members</h2>
      {loading && <div className="page-loading">Loading…</div>}
      {error && <div className="alert alert-error">{error}</div>}
      {msg && <div className="alert alert-success">{msg}</div>}
      {team && (
        <>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Permission: <strong>{team.permission}</strong></p>
          {(!team.members || team.members.length === 0) && <p style={{ color: 'var(--text-muted)' }}>No members yet.</p>}
          {team.members?.map(m => (
            <div key={m.id} style={{ padding: '0.4rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span>👤</span>
              <Link to={`/${m.username}`} style={{ color: 'var(--color-accent)' }}>{m.username}</Link>
            </div>
          ))}
          <form onSubmit={handleAdd} style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', maxWidth: '400px' }}>
            <input type="text" value={newMember} onChange={e => setNewMember(e.target.value)} placeholder="Add username…"
              style={{ flex: 1, padding: '0.4rem 0.75rem', border: '1px solid var(--border-color)', borderRadius: '6px' }} />
            <button type="submit" className="btn btn-primary" disabled={adding}>{adding ? 'Adding…' : 'Add'}</button>
          </form>
          <div style={{ marginTop: '1rem' }}>
            <Link to={`/org/${org}/teams`} style={{ color: 'var(--color-accent)', fontSize: '0.9rem' }}>← All teams</Link>
          </div>
        </>
      )}
    </div>
  )
}
