import './Navbar.css'

function Navbar({ onCreateTask }) {
  const user = JSON.parse(localStorage.getItem('user'))
  const savedProfileName = localStorage.getItem('profileName')

  // Priority: profileName -> user.name -> user.email -> default
  const displayName =
    savedProfileName ||
    user?.name ||
    user?.email ||
    'User'

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('profileName')
    window.location.href = '/'
  }

  return (
    <div className="navbar">
      <h3>Dashboard</h3>

      <div className="nav-actions">
        <span className="profile-name">
          Hi, {displayName}
        </span>

        <button
          onClick={onCreateTask}
          className="create-btn"
        >
          Create Task
        </button>

        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar