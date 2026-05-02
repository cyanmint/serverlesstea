import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getCurrentUser } from '../../api/client'

export default function AdminSelfCheck() {
  const navigate = useNavigate()
  useEffect(() => {
    if (!getCurrentUser()?.isAdmin) navigate('/')
  }, [navigate])
  return (
    <div className="page">
      <h2>Self Check</h2>
      <p style={{ color: 'var(--text-muted)' }}>This deployment does not support Self-Check.</p>
    </div>
  )
}
