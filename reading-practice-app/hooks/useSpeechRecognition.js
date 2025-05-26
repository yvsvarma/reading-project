// hooks/useSpeechRecognition.js
import { useRef } from 'react';

const useSpeechRecognition = ({ onResult, onFail, paused }) => {
  const recognitionRef = useRef(null);

  const start = () => {
    if (paused) return;

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript;
      onResult(spoken);
    };

    recognition.onerror = onFail;
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stop = () => recognitionRef.current?.abort();

  return { start, stop };
};

export default useSpeechRecognition;
