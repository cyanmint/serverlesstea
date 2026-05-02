import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ResetPasswd() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    alert('Password reset is not yet supported in this version.')
    navigate('/user/login')
  }

  return (
    <div className="page-centered">
      <div className="form-card">
        <h2>Reset Password</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>New Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary">Reset Password</button>
        </form>
      </div>
    </div>
  )
}
