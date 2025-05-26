// pages/Practice.js
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import StatusBar from '../components/StatusBar';
import SentenceDisplay from '../components/SentenceDisplay';
import PauseOverlay from '../components/PauseOverlay';
import FeedbackMessage from '../components/FeedbackMessage';
import { isMatch } from '../utils/similarity';
import useSpeechRecognition from '../hooks/useSpeechRecognition'; 

function Practice() {
  const [difficulty, setDifficulty] = useState('beginner');
  const [sentence, setSentence] = useState('');
  const [status, setStatus] = useState('select-level');
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [spokenText, setSpokenText] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [paused, setPaused] = useState(false);

  const intervalRef = useRef(null);
  const recognitionCompletedRef = useRef(false);
  const startTimeRef = useRef(null);

  const username = localStorage.getItem('username') || '';

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const getInitialTime = (level) => {
    switch (level) {
      case 'beginner': return 15;
      case 'intermediate': return 10;
      case 'expert': return 7;
      default: return 10;
    }
  };

  const savePerformance = ({ sentence, correct, timeTaken, retries }) => {
    const entry = { date: new Date().toISOString(), level: difficulty, sentence, correct, timeTaken, retries };
    const logs = JSON.parse(localStorage.getItem('reading_logs') || '{}');
    if (!logs[username]) logs[username] = [];
    logs[username].push(entry);
    localStorage.setItem('reading_logs', JSON.stringify(logs));
  };

  const fetchSentence = async (level) => {
    try {
      const response = await fetch('https://reading-project.onrender.com/generate-sentence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level,
          prompt: `Generate a sentence for a 1st grade reader. Avoid repeating words like cat/mat/sat. Use vocabulary from school, animals, food, or colors. Return only the sentence.`
        })
      });
      const data = await response.json();
      setSentence(data.sentence);
      setStatus('waiting');
    } catch (err) {
      console.error('Sentence fetch failed:', err);
      setSentence('Failed to load sentence.');
      setStatus('waiting');
    }
  };

  const { start, stop } = useSpeechRecognition({
    onResult: (spoken) => {
      recognitionCompletedRef.current = true;
      setSpokenText(spoken);
      const timeTaken = Date.now() - startTimeRef.current;

      if (isMatch(spoken, sentence)) {
        setStatus('success');
        setScore((prev) => prev + 1);
        setRetryCount(0);
        savePerformance({ sentence, correct: true, timeTaken, retries: retryCount });
        speakText("Great job!");
      } else {
        setStatus('failed');
        setRetryCount((prev) => prev + 1);
        savePerformance({ sentence, correct: false, timeTaken, retries: retryCount });
        speakText("Try again!");
      }
    },
    onFail: () => {
      if (!recognitionCompletedRef.current) {
        recognitionCompletedRef.current = true;
        setStatus('failed');
        speakText("Try again!");
      }
    },
    paused
  });

  useEffect(() => {
    if (status === 'listening' && !paused) {
      recognitionCompletedRef.current = false;
      setTimer(getInitialTime(difficulty));
      startTimeRef.current = Date.now();
      start();

      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1 && !recognitionCompletedRef.current) {
            clearInterval(intervalRef.current);
            stop();
            setStatus('failed');
            speakText("Try again!");
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [status, paused]);

  useEffect(() => {
    if (status === 'waiting' && sentence && !paused) {
      setTimeout(() => setStatus('listening'), 500);
    }
  }, [status, sentence, paused]);

  useEffect(() => {
    if (status === 'success') {
      const delay = setTimeout(() => {
        fetchSentence(difficulty);
      }, 3000);
      return () => clearTimeout(delay);
    }
  }, [status]);

  const handlePause = () => {
    clearInterval(intervalRef.current);
    stop();
    setPaused(true);
  };

  const handleResume = () => {
    setPaused(false);
    setStatus('waiting');
  };

  const handleRetry = () => {
    setStatus('waiting');
  };

  const handleDifficultySelect = (level) => {
    setDifficulty(level);
    speakText("Starting reading practice"); // Unlock audio on mobile
    fetchSentence(level);
  };

  if (!username) {
    return (
      <div className="app-container">
        <h2>Please login to start practice</h2>
        <Link to="/login"><button>Go to Login</button></Link>
      </div>
    );
  }

  if (!['select-level', 'waiting', 'listening', 'success', 'failed'].includes(status)) {
    return (
      <div className="app-container">
        <h2>⏳ Preparing Practice...</h2>
      </div>
    );
  }

  if (status === 'select-level') {
    return (
      <div className="app-container">
        <h1 className="title">Hi {username}, select your level</h1>
        <div className="difficulty-buttons">
          <button onClick={() => handleDifficultySelect('beginner')}>Beginner</button>
          <button onClick={() => handleDifficultySelect('intermediate')}>Intermediate</button>
          <button onClick={() => handleDifficultySelect('expert')}>Expert</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <StatusBar score={score} timer={timer} onPause={handlePause} />
      {paused ? (
        <PauseOverlay onResume={handleResume} />
      ) : (
        <>
          <SentenceDisplay sentence={sentence} spokenText={spokenText} />
          <FeedbackMessage status={status} spokenText={spokenText} onRetry={handleRetry} />
        </>
      )}
    </div>
  );
}

export default Practice;
