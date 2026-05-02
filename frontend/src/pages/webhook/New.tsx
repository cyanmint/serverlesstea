import { useState } from 'react'

export default function WebhookNew() {
  const [url, setUrl] = useState('')
  const [secret, setSecret] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.error('Webhook creation is not available in this deployment.')
}

  return (
    <div className="page">
      <h1>New Webhook</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Payload URL</label>
          <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/webhook" required />
        </div>
        <div className="form-group">
          <label>Secret (optional)</label>
          <input type="text" value={secret} onChange={(e) => setSecret(e.target.value)} placeholder="Webhook secret" />
        </div>
        <button type="submit" className="btn btn-primary">Add Webhook</button>
      </form>
    </div>
  )
}
