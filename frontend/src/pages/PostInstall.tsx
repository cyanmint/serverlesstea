import { Link } from 'react-router-dom'

export default function PostInstall() {
  return (
    <div className="page-centered">
      <div className="form-card">
        <h1>Installation Complete</h1>
        <p>ServerlessTea has been set up successfully.</p>
        <Link className="btn btn-primary" to="/">Go to Home</Link>
      </div>
    </div>
  )
}
