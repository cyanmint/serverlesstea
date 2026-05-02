import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getCurrentUser } from '../../api/client'

export default function AdminPerftrace() {
  const navigate = useNavigate()
  useEffect(() => {
    if (!getCurrentUser()?.isAdmin) navigate('/')
  }, [navigate])
  return (
    <div className="page">
      <h2>Performance Trace</h2>
      <p style={{ color: 'var(--text-muted)' }}>This deployment does not support Performance Tracing.</p>
    </div>
  )
}
