import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminConfig, getCurrentUser } from '../../api/client'

export default function AdminConfig() {
  const navigate = useNavigate()
  const [config, setConfig] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!getCurrentUser()?.isAdmin) { navigate('/'); return }
    adminConfig()
      .then((d) => setConfig(d.config))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed'))
      .finally(() => setLoading(false))
  }, [navigate])

  if (loading) return <div className="page-loading">Loading…</div>

  return (
    <div className="page-content">
      <h1>Site Configuration</h1>
      {error && <div className="alert alert-error">{error}</div>}
      {config && (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'monospace' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '0.5rem', background: '#f5f5f5' }}>Key</th>
              <th style={{ textAlign: 'left', padding: '0.5rem', background: '#f5f5f5' }}>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(config).map(([k, v]) => (
              <tr key={k} style={{ borderTop: '1px solid #e0e0e0' }}>
                <td style={{ padding: '0.5rem', color: '#333', verticalAlign: 'top' }}>{k}</td>
                <td style={{ padding: '0.5rem', color: '#555', wordBreak: 'break-all' }}>
                  {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
