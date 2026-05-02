import { MemoryRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
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
import CommitDetail from './pages/CommitDetail'
import IssuesPage from './pages/IssuesPage'
import ReleasesPage from './pages/ReleasesPage'
import RepoSettings from './pages/RepoSettings'
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
          {/* Global pages */}
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Navigate to="/" replace />} />
          <Route path="/explore/repos" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new" element={<CreateRepo />} />
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/admin" element={<AdminPanel />} />

          {/* User profile */}
          <Route path="/:username" element={<UserProfile />} />

          {/* Repository — home / code view */}
          <Route path="/:username/:repo" element={<RepoPage />} />

          {/* Gitea-style source routes: /src/branch/:branch[/:path] */}
          <Route path="/:username/:repo/src/branch/:ref" element={<FileTree />} />
          <Route path="/:username/:repo/src/branch/:ref/*" element={<FileTree />} />
          <Route path="/:username/:repo/src/tag/:ref" element={<FileTree />} />
          <Route path="/:username/:repo/src/tag/:ref/*" element={<FileTree />} />
          <Route path="/:username/:repo/src/commit/:ref" element={<FileTree />} />
          <Route path="/:username/:repo/src/commit/:ref/*" element={<FileTree />} />

          {/* Legacy tree/blob routes kept for compatibility */}
          <Route path="/:username/:repo/tree/:ref/*" element={<FileTree />} />
          <Route path="/:username/:repo/blob/:ref/*" element={<FileViewer />} />

          {/* Commits */}
          <Route path="/:username/:repo/commits/:ref" element={<CommitHistory />} />
          <Route path="/:username/:repo/commit/:sha" element={<CommitDetail />} />

          {/* Issues */}
          <Route path="/:username/:repo/issues" element={<IssuesPage />} />

          {/* Releases */}
          <Route path="/:username/:repo/releases" element={<ReleasesPage />} />

          {/* Settings */}
          <Route path="/:username/:repo/settings" element={<RepoSettings />} />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}
