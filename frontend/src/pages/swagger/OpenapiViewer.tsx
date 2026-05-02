import { Link } from 'react-router-dom'

export default function OpenapiViewer() {
  return (
    <div className="page">
      <h1>API Documentation</h1>
      <p>The API documentation is available at the following endpoints:</p>
      <ul>
        <li><Link to="/api/swagger.json">OpenAPI 2.0 (swagger.json)</Link></li>
        <li><Link to="/api/openapi3.json">OpenAPI 3.0 (openapi3.json)</Link></li>
      </ul>
      <p>Use a tool like <a href="https://editor.swagger.io" target="_blank" rel="noreferrer">Swagger Editor</a> to view the interactive documentation.</p>
    </div>
  )
}
