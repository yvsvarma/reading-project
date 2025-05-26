// pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Basic validation (you can expand this)
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    // ✅ Simulate login
    localStorage.setItem('username', username);

    // ✅ Redirect to /app (reading practice)
    navigate('/app');
  };

  return (
    <div className="app-container" style={{ textAlign: 'center', paddingTop: '40px' }}>
      <h1 className="title">🔐 Login</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '8px', width: '200px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '8px', width: '200px' }}
        />
        <button type="submit" style={{ fontSize: '16px', padding: '8px 16px' }}>
          Login
        </button>
      </form>
      <p style={{ marginTop: '20px' }}>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
