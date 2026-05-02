import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, adminConfig } from '../../api/client'

export default function AdminSystemStatus() {
  const navigate = useNavigate()
  const [config, setConfig] = useState<Record<string, unknown> | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!getCurrentUser()?.isAdmin) { navigate('/'); return }
    adminConfig()
      .then(r => setConfig(r.config))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load'))
  }, [navigate])

  return (
    <div className="page">
      <h2 style={{ marginBottom: '1rem' }}>System Status</h2>
      {error && <div className="alert alert-error">{error}</div>}
      {config && (
        <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '600px', fontSize: '0.9rem' }}>
          <tbody>
            {Object.entries(config).map(([k, v]) => (
              <tr key={k} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.4rem 0.5rem', fontWeight: 500, width: '220px', color: 'var(--text-muted)' }}>{k}</td>
                <td style={{ padding: '0.4rem 0.5rem' }}>{String(v)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
