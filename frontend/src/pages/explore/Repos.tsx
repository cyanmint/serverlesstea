import { Link } from 'react-router-dom'
import ExploreNavbar from './Navbar'
export default function ExploreRepos() {
  return (
    <div className="page-content explore repositories">
      <ExploreNavbar />
      <div className="ui container">
        <div className="ui text sub header">Explore Repositories</div>
      </div>
    </div>
  )
}
