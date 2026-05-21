import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Login.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Invalid credentials')
      }

     
      localStorage.setItem('token', data.token)

    
      localStorage.setItem(
        'user',
        JSON.stringify({
          _id: data.user._id,
          email: data.user.email,
          role: data.user.role
        })
      )

      
      navigate('/dashboard')

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

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
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p style={{ marginTop: '15px' }}>
          Don’t have an account?{' '}
          <Link to="/signup">Sign Up</Link>
        </p>

        <p className="demo">
          Demo:
          <br />
          admin@test.com / 123456
        </p>
      </form>
    </div>
  )
}

export default Login