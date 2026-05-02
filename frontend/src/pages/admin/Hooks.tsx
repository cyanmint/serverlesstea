import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getCurrentUser } from '../../api/client'

export default function AdminHooks() {
  const navigate = useNavigate()
  useEffect(() => {
    if (!getCurrentUser()?.isAdmin) navigate('/')
  }, [navigate])
  return (
    <div className="page">
      <h2>System Webhooks</h2>
      <p style={{ color: 'var(--text-muted)' }}>This deployment does not support Webhooks.</p>
    </div>
  )
}
