import { Link } from 'react-router-dom'

export default function DashboardIssues() {
  return (
    <div className="page">
      <h1>My Issues &amp; Pull Requests</h1>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Link to="?type=your_repositories" className="btn">My Repositories</Link>
        <Link to="?type=assigned" className="btn">Assigned</Link>
        <Link to="?type=created_by" className="btn">Created</Link>
      </div>
      <p>No items found.</p>
    </div>
  )
}
