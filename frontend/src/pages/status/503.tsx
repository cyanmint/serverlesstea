import { Link } from 'react-router-dom'

export default function ServiceUnavailable() {
  return (
    <div className="page-content">
      <div className="ui container">
        <div className="status-page-error">
          <div className="status-page-error-title">503 Service Unavailable</div>
          <div className="tw-text-center">
            <div className="tw-my-4">The service is temporarily unavailable. Please try again later.</div>
            <Link className="tw-block tw-my-4" to="/">Go back home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
