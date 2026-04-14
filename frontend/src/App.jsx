import './App.css'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'

function App() {
  const api = import.meta.env.VITE_API
  return (
    <main className="app-shell">
      <div className="login-card">
        <div className="heart-scene" aria-hidden="true">
          <div className="heart heart-main"></div>
          <div className="heart heart-small heart-small-1"></div>
          <div className="heart heart-small heart-small-2"></div>
          <div className="heart heart-small heart-small-3"></div>
        </div>

        <div className="hero-image-wrap">
          <img
            className="hero-image"
            src="/download__8_-removebg-preview.png"
            alt="Rizzler character"
          />
        </div>

        <header className="login-header">
          <p className="eyebrow">The Rizzler</p>
          <h1>Get rizzed by your chat bot</h1>
          <p className="subtitle">
            get rizzed 
          </p>
        </header>

        <div className="login-actions">
          <div className="google-login-button">
            <GoogleLogin shape='pill'
              onSuccess={(response) => {
                axios.post(`${api}/auth/login`, { token: response.credential })
              }}
              onError={() => console.error('Login failed')}
            />
          </div>
          <p className="login-note">Fast, secure Google login with a touch of Rizzler magic.</p>
        </div>
      </div>
    </main>
  )
}

export default App
