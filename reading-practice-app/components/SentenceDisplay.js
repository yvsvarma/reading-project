// components/SentenceDisplay.js
import React from 'react';

const SentenceDisplay = ({ sentence, spokenText }) => {
  return (
    <div>
      <p className="sentence-big">{sentence}</p>
      {spokenText && (
        <p className="spoken">You said: "{spokenText}"</p>
      )}
    </div>
  );
};

export default SentenceDisplay;
