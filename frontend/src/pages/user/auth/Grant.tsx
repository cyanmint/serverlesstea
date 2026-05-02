export default function Grant() {
  return (
    <div className="page-centered">
      <div className="form-card">
        <h2>OAuth2 Authorization</h2>
        <p>An application is requesting access to your account.</p>
        <p>OAuth2 authorization is not yet fully supported in this version.</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button className="btn btn-primary">Authorize</button>
          <button className="btn">Cancel</button>
        </div>
      </div>
    </div>
  )
}
