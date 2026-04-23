import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Note: Create AppContext in a separate context file if you extract this fully, 
// for now we'll accept setMood via props to fix the crash quickly.
export default function MoodPage({ setMood }) {
  const navigate = useNavigate();
  const moods = [
    { label: 'Happy', emoji: '😁' },
    { label: 'Calm', emoji: '😌' },
    { label: 'Tired', emoji: '😴' },
    { label: 'Stressed', emoji: '😫' }
  ];

  return (
    <div className="container text-center">
      <h1 className="mb-4">How are you feeling?</h1>
      <div className="mood-grid">
        {moods.map((m) => (
          <div 
            key={m.label} 
            className="mood-item border-glow bounce-card" 
            onClick={() => {
              if (setMood) setMood(m.label);
              navigate('/learning');
            }}
            style={{ cursor: 'pointer' }}
          >
            <div className="mood-icon">{m.emoji}</div>
            <h3>{m.label}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
