export default function ServiceUnavailable() {
  return (
    <div className="page-content">
      <div className="ui container">
        <div className="status-page-error">
          <div className="status-page-error-title">503 Service Unavailable</div>
          <div className="tw-text-center">
            <div className="tw-my-4">The service is temporarily unavailable.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
