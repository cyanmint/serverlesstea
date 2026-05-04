import { MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useRef } from 'react'
import type { ComponentType } from 'react'

type PageModule = { default: ComponentType }
const pageModules = import.meta.glob<PageModule>('./pages-generated/**/*.tsx', { eager: true })
const moduleKeys = new Set(Object.keys(pageModules).map((key) => key.replace('./pages-generated/', '').replace('.tsx', '')))

function toPageKey(pathname: string): string | null {
  const clean = pathname.replace(/^\/+|\/+$/g, '')

  if (!clean) {
    if (moduleKeys.has('user/dashboard/dashboard')) return 'user/dashboard/dashboard'
    if (moduleKeys.has('user/dashboard/feeds')) return 'user/dashboard/feeds'
    return 'user/auth/signin'
  }

  if (moduleKeys.has(clean)) return clean

  const aliases: Record<string, string> = {
    login: 'user/auth/signin',
    signin: 'user/auth/signin',
    register: 'user/auth/signup',
    signup: 'user/auth/signup',
    'user/login': 'user/auth/signin',
  }
  if (aliases[clean] && moduleKeys.has(aliases[clean])) return aliases[clean]

  const parts = clean.split('/')
  if (parts.length >= 4 && parts[2] === 'commits' && moduleKeys.has('repo/commits')) return 'repo/commits'
  if (parts.length >= 4 && parts[2] === 'src' && moduleKeys.has('repo/view_file')) return 'repo/view_file'
  if (parts.length === 2 && moduleKeys.has('repo/home')) return 'repo/home'
  if (parts.length === 1 && moduleKeys.has('user/profile')) return 'user/profile'

  return null
}

function pageFromPath(pathname: string): ComponentType | null {
  const key = toPageKey(pathname)
  if (!key) return null
  return pageModules[`./pages-generated/${key}.tsx`]?.default ?? null
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
  const Comp = useMemo(() => pageFromPath(pathname), [pathname])
  if (!Comp) return <NotFound />
  return <Comp />
}

export default function App() {
  return (
    <MemoryRouter initialEntries={[queryToPath()]}>
      <QuerySync />
      <Routes>
        <Route path="*" element={<PathRenderer />} />
      </Routes>
    </MemoryRouter>
  )
}
