import React, { Suspense } from 'react'
import { MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'

const ROUTES: Array<{ path: string; gen: string }> = [
  { path: '/install', gen: 'install' },
  { path: '/explore/repos', gen: 'explore/repos' },
  { path: '/explore/users', gen: 'explore/users' },
  { path: '/:owner/:repo/commits/:branch', gen: 'repo/commits' },
  { path: '/:owner/:repo/src/:branch/*', gen: 'repo/view_file' },
  { path: '/:owner/:repo', gen: 'repo/home' },
  { path: '/:username', gen: 'user/profile' },
  { path: '/', gen: 'home' },
]

function lazyPage(gen: string) {
  return React.lazy(() => import(`./pages-generated/${gen}.tsx`))
}

const lazyComponents = Object.fromEntries(ROUTES.map(({ gen }) => [gen, lazyPage(gen)]))

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

export default function App() {
  return (
    <MemoryRouter initialEntries={[queryToPath()]}>
      <QuerySync />
      <Suspense fallback={<div className="tw-p-8">Loading…</div>}>
        <Routes>
          {ROUTES.map(({ path, gen }) => {
            const Comp = lazyComponents[gen]
            return <Route key={gen} path={path} element={<Comp />} />
          })}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </MemoryRouter>
  )
}
