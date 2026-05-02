import { Link } from 'react-router-dom'

export default function ServerErrorAlt() {
  return (
    <div className="page-content">
      <div className="ui container">
        <div className="status-page-error">
          <div className="status-page-error-title">500 Internal Server Error</div>
          <div className="tw-text-center">
            <div className="tw-my-4">An internal server error occurred.</div>
            <Link className="tw-block tw-my-4" to="/">Go back home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
