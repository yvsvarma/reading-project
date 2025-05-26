// English.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function English() {
  const navigate = useNavigate();

  const handleTopicClick = (topic) => {
    if (topic === 'reading') navigate('/app');
    else alert(`${topic} module coming soon!`);
  };

  return (
    <div className="app-container">
      <h2>English Topics</h2>
      <div className="button-group">
        <button onClick={() => handleTopicClick('reading')}>Reading</button>
        <button onClick={() => handleTopicClick('writing')}>Writing</button>
        <button onClick={() => handleTopicClick('vocabulary')}>Vocabulary</button>
      </div>
    </div>
  );
}

export default English;
