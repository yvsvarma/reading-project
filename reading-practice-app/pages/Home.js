// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="app-container" style={{ textAlign: 'center', paddingTop: '40px' }}>
      <h1 className="title">📚 Welcome to Reading Practice</h1>
      <p style={{ marginBottom: '30px' }}>Choose an option to get started:</p>

      <div className="button-group" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <Link to="/register">
          <button style={{ fontSize: '18px', padding: '10px 20px' }}>📝 Register</button>
        </Link>
        <Link to="/login">
          <button style={{ fontSize: '18px', padding: '10px 20px' }}>🔐 Login</button>
        </Link>
        <Link to="/app">
          <button style={{ fontSize: '18px', padding: '10px 20px', marginTop: '20px' }}>▶️ Start Practice</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
