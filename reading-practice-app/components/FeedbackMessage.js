// components/FeedbackMessage.js
import React from 'react';

const FeedbackMessage = ({ status, spokenText, onRetry }) => {
  if (status === 'success') {
    return <p className="success">✅ Great job!</p>;
  }

  if (status === 'failed') {
    return (
      <>
        <p className="fail">
          ❌ Try again! {spokenText ? `You said: "${spokenText}"` : "We couldn't hear you in time."}
        </p>
        <button onClick={onRetry} style={{ marginTop: '10px', fontSize: '18px' }}>
          🔁 Try Again
        </button>
      </>
    );
  }

  return null;
};

export default FeedbackMessage;
