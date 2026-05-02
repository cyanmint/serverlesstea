import { useState } from 'react'

export default function TwofaScratch() {
  const [code, setCode] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    alert('Scratch code authentication is not yet supported in this version.')
  }

  return (
    <div className="page-centered">
      <div className="form-card">
        <h2>Use Recovery Code</h2>
        <p>Enter one of your two-factor recovery (scratch) codes to sign in.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Recovery Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter recovery code"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Verify</button>
        </form>
      </div>
    </div>
  )
}
