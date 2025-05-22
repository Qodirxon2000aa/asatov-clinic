import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import Images from "../img/logo.png"

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === '1' && password === '1') {
      localStorage.setItem('isAuthenticated', 'true')
      navigate('/')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">

        <div className="imagess">
          <img src={Images} alt="" />
        </div>
       
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          <div className="input-group">
            <input
              type="text"
              placeholder="Login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <input
              type="password"
              placeholder="Parol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit">Kirish</button>
        </form>
      </div>
    </div>
  )
}

export default Login