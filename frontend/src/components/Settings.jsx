import { useState, useEffect } from 'react'
import './Settings.css'

function Settings() {
  const [darkMode, setDarkMode] = useState(false)
  const [profileName, setProfileName] = useState('')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const savedName = localStorage.getItem('profileName')
    const user = JSON.parse(localStorage.getItem('user'))

    if (savedTheme === 'dark') {
      setDarkMode(true)
      document.body.classList.add('dark')
    }

    // Priority: profileName -> user.name -> email
    if (savedName) {
      setProfileName(savedName)
    } else if (user?.name) {
      setProfileName(user.name)
    } else if (user?.email) {
      setProfileName(user.email.split('@')[0])
    }
  }, [])

  function toggleTheme() {
    const newTheme = !darkMode
    setDarkMode(newTheme)

    if (newTheme) {
      document.body.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  function saveProfile() {
    if (!profileName.trim()) {
      alert('Profile name cannot be empty')
      return
    }

    // Save separate profile name (your current system)
    localStorage.setItem('profileName', profileName)

    // 🔥 ALSO update user object
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      const updatedUser = {
        ...user,
        name: profileName
      }

      localStorage.setItem('user', JSON.stringify(updatedUser))
    }

    alert('Profile updated!')

    // Refresh to update Navbar instantly
    window.location.reload()
  }

  function clearData() {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="settings">
      <h2>Settings</h2>

      <div className="setting-card">
        <h4>Dark Mode</h4>
        <button onClick={toggleTheme}>
          {darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
        </button>
      </div>

      <div className="setting-card">
        <h4>Profile Name</h4>
        <input
          type="text"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
        />
        <button onClick={saveProfile}>Save</button>
      </div>

      <div className="setting-card danger">
        <h4>Clear All Data</h4>
        <button onClick={clearData}>Reset Application</button>
      </div>
    </div>
  )
}

export default Settings