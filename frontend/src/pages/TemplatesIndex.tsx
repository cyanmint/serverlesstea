import { Link } from 'react-router-dom'

const modules = import.meta.glob('./**/*.tsx')

const excluded = new Set([
  './TemplatesIndex.tsx',
  './TemplateView.tsx',
])

const pages = Object.keys(modules)
  .filter((p) => !excluded.has(p))
  .map((p) => p.replace(/^\.\//, '').replace(/\.tsx$/, ''))
  .sort()

export default function TemplatesIndex() {
  return (
    <div className="page-content">
      <div className="ui container">
        <h2 className="ui header">Template Pages</h2>
        <p>Preview any converted page template:</p>
        <div className="ui relaxed divided list">
          {pages.map((p) => (
            <div key={p} className="item">
              <Link to={`/_templates/${p}`}>{p}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
