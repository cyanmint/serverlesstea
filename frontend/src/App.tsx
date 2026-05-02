import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/:username" element={<UserProfile />} />
          <Route path="/:username/:repo" element={<RepoPage />} />
          <Route path="/:username/:repo/tree/:ref/*" element={<FileTree />} />
          <Route path="/:username/:repo/blob/:ref/*" element={<FileViewer />} />
          <Route path="/:username/:repo/commits/:ref" element={<CommitHistory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
