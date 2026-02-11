import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'

import Dashboard from './components/Dashboard'
import Projects from './components/Projects'
import Tasks from './components/Tasks'
import Teams from './components/Teams'
import Settings from './components/Settings'

import './App.css'

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn')

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Home /> : <Navigate to="/" />}
          >
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="teams" element={<Teams />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
