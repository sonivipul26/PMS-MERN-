import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'

const API_URL = "https://project-management-backend-lkt3.onrender.com"

function Signup() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignup(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Signup failed')
      }

      alert('Account created successfully!')
      navigate('/')

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

        <p style={{ marginTop: '15px' }}>
          Already have an account?{' '}
          <Link to="/">Sign In</Link>
        </p>
      </form>
    </div>
  )
}

export default Signup