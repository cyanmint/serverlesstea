import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOrg, updateOrg, deleteOrg, Org } from '../../../api/client'

export default function OrgOptions() {
  const { orgname } = useParams<{ orgname: string }>()
  const navigate = useNavigate()
  const [org, setOrg] = useState<Org | null>(null)
  const [displayName, setDisplayName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!orgname) return
    getOrg(orgname)
      .then((d) => { setOrg(d.org); setDisplayName(d.org.display_name ?? ''); setDescription(d.org.description ?? '') })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed'))
      .finally(() => setLoading(false))
  }, [orgname])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!orgname) return
    setError(''); setSuccess(false); setSaving(true)
    try {
      await updateOrg(orgname, { display_name: displayName || null, description: description || null })
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!orgname || !confirm(`Delete organization "${orgname}"? This cannot be undone.`)) return
    try {
      await deleteOrg(orgname)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete')
    }
  }

  if (loading) return <div className="page-loading">Loading…</div>
  if (!org) return <div className="alert alert-error">{error || 'Organization not found'}</div>

  return (
    <div className="page-content">
      <h1>{orgname} – Settings</h1>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">Settings saved.</div>}
      <div className="form-card">
        <h2>General</h2>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Display Name</label>
            <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder={org.name} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={{ width: '100%' }} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save Settings'}</button>
        </form>
      </div>
      <div className="form-card" style={{ marginTop: '2rem', borderColor: '#ffcccc' }}>
        <h2 style={{ color: '#c00' }}>Danger Zone</h2>
        <p>Deleting this organization is permanent and cannot be undone.</p>
        <button className="btn" style={{ background: '#c00', color: '#fff' }} onClick={handleDelete}>Delete Organization</button>
      </div>
    </div>
  )
}
