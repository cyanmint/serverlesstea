import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../api/client'

export default function AdminNotice() {
  const navigate = useNavigate()
  useEffect(() => {
    if (!getCurrentUser()?.isAdmin) navigate('/')
  }, [navigate])
  return (
    <div className="page">
      <h2 style={{ marginBottom: '1rem' }}>System Notices</h2>
      <div className="empty-placeholder">
        <p>No system notices.</p>
      </div>
    </div>
  )
}
