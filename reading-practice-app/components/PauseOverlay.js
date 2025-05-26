// components/PauseOverlay.js
import React from 'react';

const PauseOverlay = ({ onResume }) => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '20px' }}>
      <p className="paused">⏸ Game Paused</p>
      <button onClick={onResume}>▶️ Resume</button>
    </div>
  );
};

export default PauseOverlay;
