import { useState } from 'react'

export default function Twofa() {
  const [code, setCode] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.error('Two-factor authentication is not available in this deployment.')
}

  return (
    <div className="page-centered">
      <div className="form-card">
        <h2>Two-Factor Authentication</h2>
        <p>Enter the 6-digit code from your authenticator app.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Authentication Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="000000"
              maxLength={6}
              pattern="[0-9]{6}"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Verify</button>
        </form>
      </div>
    </div>
  )
}
