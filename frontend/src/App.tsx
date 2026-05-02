import { MemoryRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
import RepoPage from './pages/RepoPage'
import FileTree from './pages/FileTree'
import FileViewer from './pages/FileViewer'
import CommitHistory from './pages/CommitHistory'
import AdminPanel from './pages/AdminPanel'
import UserSettings from './pages/UserSettings'
import CreateRepo from './pages/CreateRepo'

// Encode a router pathname into a query string:  / → ?   /login → ?login
function pathToQuery(pathname: string): string {
  return '?' + (pathname === '/' ? '' : pathname.slice(1))
}

// Decode the current window query string back to a router pathname
function queryToPath(): string {
  const s = window.location.search
  return (!s || s === '?') ? '/' : '/' + s.slice(1)
}

// Keeps window.location.search in sync with the in-memory router location,
// and drives the in-memory router when the user presses back/forward.
function QuerySync() {
  const location = useLocation()
  const navigate = useNavigate()
  const isFirst = useRef(true)

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

export default function App() {
  return (
    <MemoryRouter initialEntries={[queryToPath()]}>
      <QuerySync />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new" element={<CreateRepo />} />
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/:username" element={<UserProfile />} />
          <Route path="/:username/:repo" element={<RepoPage />} />
          <Route path="/:username/:repo/tree/:ref/*" element={<FileTree />} />
          <Route path="/:username/:repo/blob/:ref/*" element={<FileViewer />} />
          <Route path="/:username/:repo/commits/:ref" element={<CommitHistory />} />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}
