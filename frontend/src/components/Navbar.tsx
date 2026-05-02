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
      <div className="navbar-brand">
        <Link to="/">🍵 serverlesstea</Link>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to={`/${user.username}`}>{user.username}</Link>
            <Link to="/settings">Settings</Link>
            {user.isAdmin && <Link to="/admin">Admin</Link>}
            <button className="btn btn-sm" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}
