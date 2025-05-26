// Register.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In next step, we'll capture form values
    navigate('/login');
  };

  return (
    <div className="app-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" placeholder="Full Name" required />
        <select required>
          <option value="">Select Grade</option>
          <option value="1">Grade 1</option>
          <option value="2">Grade 2</option>
          <option value="3">Grade 3</option>
        </select>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
