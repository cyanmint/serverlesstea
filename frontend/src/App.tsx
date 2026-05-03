import React, { Suspense } from 'react'
import { MemoryRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Layout from './components/Layout'

// ── Route map: URL pattern → generated component path ────────────────────────
const ROUTES: Array<{ path: string; gen: string }> = [
  { path: '/install',                         gen: 'install' },
  { path: '/user/login',                      gen: 'user/auth/signin' },
  { path: '/user/sign_up',                    gen: 'user/auth/signup' },
  { path: '/user/forgot_password',            gen: 'user/auth/forgot_passwd' },
  { path: '/user/reset_password',             gen: 'user/auth/reset_passwd' },
  { path: '/user/settings',                   gen: 'user/settings/profile' },
  { path: '/explore/repos',                   gen: 'explore/repos' },
  { path: '/explore/users',                   gen: 'explore/users' },
  { path: '/explore/organizations',           gen: 'explore/orgs' },
  { path: '/:owner/:repo/commits/:branch',    gen: 'repo/commits' },
  { path: '/:owner/:repo/src/:branch/*',      gen: 'repo/view_file' },
  { path: '/:owner/:repo',                    gen: 'repo/home' },
  { path: '/:username',                       gen: 'user/profile' },
  { path: '/',                                gen: 'home' },
]

// Lazily import a generated component by its path key
function lazyPage(gen: string) {
  return React.lazy(() => import(`./pages-generated/${gen}.tsx`))
}

// Pre-build lazy components so they aren't recreated on each render
const lazyComponents = Object.fromEntries(
  ROUTES.map(({ gen }) => [gen, lazyPage(gen)])
)

const NotFound = () => <div style={{ padding: '2rem' }}>404 – Page not found</div>

// ── URL ↔ in-memory router sync ───────────────────────────────────────────────
function pathToQuery(pathname: string): string {
  return '?' + (pathname === '/' ? '' : pathname.slice(1))
}

function queryToPath(): string {
  const s = window.location.search
  return (!s || s === '?') ? '/' : '/' + s.slice(1)
}

function QuerySync() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const isFirst   = useRef(true)

  useEffect(() => {
    const query = pathToQuery(location.pathname)
    if (window.location.search !== query) {
      if (isFirst.current) {
        history.replaceState(null, '', window.location.pathname + query)
      } else {
        history.pushState(null, '', window.location.pathname + query)
      }
    }
    isFirst.current = false
  })

  useEffect(() => {
    function onPopState() {
      navigate(queryToPath(), { replace: true })
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [navigate])

  return null
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <MemoryRouter initialEntries={[queryToPath()]}>
      <QuerySync />
      <Suspense fallback={<div className="tw-p-8">Loading…</div>}>
        <Routes>
          <Route element={<Layout />}>
            {ROUTES.map(({ path, gen }) => {
              const Comp = lazyComponents[gen]
              return <Route key={gen} path={path} element={<Comp />} />
            })}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </MemoryRouter>
  )
}
