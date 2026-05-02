import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getCurrentUser } from '../../../../api/client'

export default function AdminOauth() {
  const navigate = useNavigate()
  useEffect(() => {
    if (!getCurrentUser()?.isAdmin) navigate('/')
  }, [navigate])
  return (
    <div className="page">
      <h2>OAuth Authentication</h2>
      <p>Admin feature – coming soon.</p>
    </div>
  )
}
