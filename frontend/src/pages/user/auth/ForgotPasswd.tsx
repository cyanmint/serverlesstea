import { useState } from 'react'

export default function ForgotPasswd() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="page-centered">
        <div className="form-card">
          <h2>Check your email</h2>
          <p>If this email address exists in our system, you will receive password reset instructions shortly.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-centered">
      <div className="form-card">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Send Reset Email</button>
        </form>
      </div>
    </div>
  )
}
