import React, { Suspense } from 'react'
import { MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useRef } from 'react'

const pageModules = import.meta.glob('./pages-generated/**/*.tsx')

function toPageKey(pathname: string): string | null {
  const clean = pathname.replace(/^\/+|\/+$/g, '')
  if (!clean) return 'home'

  const parts = clean.split('/')
  if (clean === 'explore/repos' || clean === 'explore/users' || clean === 'install') return clean
  if (parts.length === 2) return 'repo/home'
  if (parts.length >= 4 && parts[2] === 'commits') return 'repo/commits'
  if (parts.length >= 4 && parts[2] === 'src') return 'repo/view_file'
  if (parts.length === 1) return 'user/profile'

  return clean
}

function lazyPageFromPath(pathname: string) {
  const key = toPageKey(pathname)
  if (!key) return null
  const importer = pageModules[`./pages-generated/${key}.tsx`]
  if (!importer) return null
  return React.lazy(importer as () => Promise<{ default: React.ComponentType }>)
}

const NotFound = () => <div className="tw-p-8">404 – Page not found</div>

function pathToQuery(pathname: string): string {
  return '?' + (pathname === '/' ? '' : pathname.slice(1))
}

function queryToPath(): string {
  const s = window.location.search
  return !s || s === '?' ? '/' : `/${s.slice(1)}`
}

function QuerySync() {
  const location = useLocation()
  const navigate = useNavigate()
  const isFirst = useRef(true)

  useEffect(() => {
    const query = pathToQuery(location.pathname)
    if (window.location.search !== query) {
      if (isFirst.current) history.replaceState(null, '', window.location.pathname + query)
      else history.pushState(null, '', window.location.pathname + query)
    }
    isFirst.current = false
  })

  useEffect(() => {
    const onPopState = () => navigate(queryToPath(), { replace: true })
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [navigate])

  return null
}

function PathRenderer() {
  const { pathname } = useLocation()
  const Comp = useMemo(() => lazyPageFromPath(pathname), [pathname])
  if (!Comp) return <NotFound />
  return <Comp />
}

export default function App() {
  return (
    <MemoryRouter initialEntries={[queryToPath()]}>
      <QuerySync />
      <Suspense fallback={<div className="tw-p-8">Loading…</div>}>
        <Routes>
          <Route path="*" element={<PathRenderer />} />
        </Routes>
      </Suspense>
    </MemoryRouter>
  )
}
