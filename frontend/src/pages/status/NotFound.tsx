import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="page-content">
      <div className="ui container">
        <div className="status-page-error">
          <div className="status-page-error-title">404 Not Found</div>
          <div className="tw-text-center">
            <div className="tw-my-4">The page you are looking for does not exist.</div>
            <Link className="tw-block tw-my-4" to="/">Go back home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
