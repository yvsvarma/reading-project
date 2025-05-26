// Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Student';

  const handleCategoryClick = (category) => {
    if (category === 'english') navigate('/english');
    if (category === 'math') alert('Math module coming soon!');
  };

  return (
    <div className="app-container">
      <h1 className="title">Welcome, {username}</h1>
      <h2>Select a Subject</h2>
      <div className="button-group">
        <button onClick={() => handleCategoryClick('english')}>English</button>
        <button onClick={() => handleCategoryClick('math')}>Math</button>
      </div>
    </div>
  );
}

export default Dashboard;
