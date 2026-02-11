import './Navbar.css'

function Navbar({ onCreateTask }) {

  function handleLogout() {
    localStorage.removeItem('isLoggedIn')
    window.location.href = '/'
  }

  return (
    <div className="navbar">
      <h3>Dashboard</h3>

      <div className="nav-actions">
        <button onClick={onCreateTask} className="create-btn">
          Create Task
        </button>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
