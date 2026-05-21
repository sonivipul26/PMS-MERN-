import { NavLink } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Dreadline</h2>

      <ul>
        <li>
          <NavLink to="/dashboard" end>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/projects">
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/tasks">
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/teams">
            Teams
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/settings">
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
