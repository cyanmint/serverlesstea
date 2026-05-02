import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { listBranches, Branch } from '../../../api/client'
import RepoHeader from '../../../components/RepoHeader'

export default function DiffCompare() {
  const { username, repo, '*': splat } = useParams<{ username: string; repo: string; '*': string }>()
  const navigate = useNavigate()
  const [branches, setBranches] = useState<Branch[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const parts = (splat ?? '').split('...')
  const [base, setBase] = useState(parts[0] ?? '')
  const [compare, setCompare] = useState(parts[1] ?? '')

  useEffect(() => {
    if (!username || !repo) return
    listBranches(username, repo)
      .then((d) => {
        setBranches(d.branches)
        if (!base && d.branches.length > 0) setBase(d.branches[0].name)
        if (!compare && d.branches.length > 1) setCompare(d.branches[1].name)
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed'))
      .finally(() => setLoading(false))
  }, [username, repo])

  return (
    <div className="repo-page">
      <RepoHeader owner={username!} repo={repo!} />
      <div className="page-content">
        <h2>Compare Branches</h2>
        {error && <div className="alert alert-error">{error}</div>}
        {loading ? <div className="page-loading">Loading branches…</div> : (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', margin: '1rem 0' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Base</label>
              <select value={base} onChange={(e) => setBase(e.target.value)}>
                {branches.map((b) => <option key={b.name} value={b.name}>{b.name}</option>)}
              </select>
            </div>
            <span style={{ fontSize: '1.5rem', paddingTop: '1.2rem' }}>…</span>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label>Compare</label>
              <select value={compare} onChange={(e) => setCompare(e.target.value)}>
                {branches.map((b) => <option key={b.name} value={b.name}>{b.name}</option>)}
              </select>
            </div>
            <button className="btn btn-primary" style={{ marginTop: '1.2rem' }} onClick={() => navigate(`/${username}/${repo}/compare/${base}...${compare}`)} disabled={!base || !compare || base === compare}>Compare</button>
          </div>
        )}
      </div>
    </div>
  )
}
