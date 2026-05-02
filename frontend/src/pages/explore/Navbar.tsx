import { Link } from 'react-router-dom'
export default function ExploreNavbar() {
  return (
    <div className="ui secondary pointing menu">
      <div className="ui container">
        <Link className="item" to="/explore/repos">Repositories</Link>
        <Link className="item" to="/explore/users">Users</Link>
        <Link className="item" to="/explore/organizations">Organizations</Link>
        <Link className="item" to="/explore/code">Code</Link>
      </div>
    </div>
  )
}
