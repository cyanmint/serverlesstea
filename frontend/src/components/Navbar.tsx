import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../api/client'

export default function Navbar() {
  const navigate = useNavigate()
  const user = getCurrentUser()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-brand">
          <Link to="/">🍵 serverlesstea</Link>
        </div>
        <div className="navbar-explore">
          <Link to="/explore/repos" className="navbar-explore-link">Explore</Link>
        </div>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/new" className="btn btn-sm btn-primary navbar-new-btn">＋ New</Link>
            <Link to={`/${user.username}`} className="navbar-username">{user.username}</Link>
            <Link to="/settings" className="navbar-link">Settings</Link>
            {user.isAdmin && <Link to="/admin" className="navbar-link">Admin</Link>}
            <button className="btn btn-sm" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Sign in</Link>
            <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
