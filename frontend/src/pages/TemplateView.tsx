import { type ComponentType } from 'react'
import { useParams, Link } from 'react-router-dom'

type LoadedComponent = ComponentType<Record<string, unknown>>
const modules = import.meta.glob('./**/*.tsx', { eager: true }) as Record<string, { default?: LoadedComponent }>

function normalizePath(raw: string): string {
  const stripped = raw.replace(/^\/+|\/+$/g, '')
  if (!stripped || stripped.includes('..')) return ''
  return stripped.replace(/\.tsx$/, '')
}

export default function TemplateView() {
  const { '*': rawPath = '' } = useParams()
  const normalized = normalizePath(rawPath)
  const key = normalized ? `./${normalized}.tsx` : ''
  const mod = key ? modules[key] : undefined
  const Component = mod?.default ?? null
  const error = !normalized
    ? 'Template path is required.'
    : !mod
      ? `Template page not found: ${normalized}`
      : !Component
        ? `Template has no default export: ${normalized}`
        : null

  return (
    <div className="page-content">
      <div className="ui container">
        <div style={{ marginBottom: 12 }}>
          <Link to="/_templates">← Back to templates index</Link>
        </div>
        {error && <div className="ui negative message">{error}</div>}
        {!error && Component && <Component />}
      </div>
    </div>
  )
}
