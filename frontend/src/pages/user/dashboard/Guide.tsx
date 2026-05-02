import { Link } from 'react-router-dom'

export default function Guide() {
  return (
    <div className="page">
      <h2>Getting Started</h2>
      <ul>
        <li><Link to="/repo/create">Create a new repository</Link></li>
        <li><Link to="/org/create">Create an organization</Link></li>
        <li><Link to="/explore">Explore public repositories</Link></li>
      </ul>
    </div>
  )
}
