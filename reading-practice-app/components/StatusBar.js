// components/StatusBar.js
import React from 'react';

const StatusBar = ({ score, timer, onPause }) => {
  return (
    <div className="score-bar">
      <span className="score-text">Score: {score}</span>
      <span style={{ marginLeft: '20px' }}>Timer: {timer}s</span>
      <button onClick={onPause} style={{ marginLeft: '20px' }}>
        ⏸ Pause
      </button>
    </div>
  );
};

export default StatusBar;
