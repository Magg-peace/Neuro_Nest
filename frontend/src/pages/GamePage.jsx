import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App.jsx';
import confetti from 'canvas-confetti';

const GAMES = [
  { id: 'pattern', name: 'Pattern Builder 🧠', type: 'Autism-friendly (Logic)' },
  { id: 'emotion', name: 'Emotion Match 😊', type: 'Autism-friendly (Social)' },
  { id: 'focus', name: 'Focus Burst 🎯', type: 'ADHD-friendly (Attention)' },
  { id: 'memory', name: 'Memory Flash ⚡', type: 'ADHD-friendly (Working Memory)' },
  { id: 'sound', name: 'Read & Tap 🔈', type: 'Dyslexia-friendly (Audio-Visual)' }
];

const ICONS_SHAPES = ['🔺', '🟦', '🟡', '🟩'];
const ICONS_EMOTIONS = [{f: '😊', w: 'Happy'}, {f: '😢', w: 'Sad'}, {f: '😡', w: 'Angry'}, {f: '😴', w: 'Tired'}];
const ICONS_DISTRACTIONS = ['🍎', '🚗', '🎈', '🐶', '⚽', '🎯'];
const ICONS_FRUITS = ['🍎', '🍌', '🍇', '🍉', '🍓'];

export default function GamePage() {
  const navigate = useNavigate();
  const { addPoints, addHistory } = useContext(AppContext);
  const [gameIndex] = useState(() => Math.floor(Math.random() * GAMES.length));
  const currentGame = GAMES[gameIndex];

  const [message, setMessage] = useState('Get ready!');
  const [streak, setStreak] = useState(0);
  const [won, setWon] = useState(false);
  const [gameData, setGameData] = useState(null);

  const initGameData = () => {
     if (currentGame.id === 'pattern') {
        const seq = [];
        for (let i = 0; i < 3; i++) seq.push(ICONS_SHAPES[Math.floor(Math.random() * ICONS_SHAPES.length)]);
        const nextTarget = ICONS_SHAPES[Math.floor(Math.random() * ICONS_SHAPES.length)];
        let opts = [nextTarget];
        while (opts.length < 3) {
           const r = ICONS_SHAPES[Math.floor(Math.random() * ICONS_SHAPES.length)];
           if (!opts.includes(r)) opts.push(r);
        }
        opts = opts.sort(() => Math.random() - 0.5);
        setMessage('What comes next in the pattern?');
        setGameData({ sequence: seq, target: nextTarget, options: opts });
     } 
     else if (currentGame.id === 'emotion') {
        const target = ICONS_EMOTIONS[Math.floor(Math.random() * ICONS_EMOTIONS.length)];
        let opts = [target];
        while (opts.length < 3) {
           const r = ICONS_EMOTIONS[Math.floor(Math.random() * ICONS_EMOTIONS.length)];
           if (!opts.find(o => o.f === r.f)) opts.push(r);
        }
        opts = opts.sort(() => Math.random() - 0.5);
        setMessage(`Which face is feeling ${target.w}?`);
        setGameData({ target: target.f, options: opts.map(o => o.f), correct: target.f });
     }
     else if (currentGame.id === 'focus') {
        const target = '🎯';
        let grid = [target];
        for (let i = 0; i < 8; i++) grid.push(ICONS_DISTRACTIONS[Math.floor(Math.random() * ICONS_DISTRACTIONS.length)]);
        grid = grid.sort(() => Math.random() - 0.5);
        setMessage('Find and tap the Target quickly! Ignore the rest!');
        setGameData({ grid, target });
     }
     else if (currentGame.id === 'memory') {
        setMessage('Remember this fruit sequence!!');
        const seq = [];
        for (let i = 0; i < 3; i++) seq.push(ICONS_FRUITS[Math.floor(Math.random() * ICONS_FRUITS.length)]);
        setGameData({ sequence: seq, hidden: false, options: [...ICONS_FRUITS].sort(() => Math.random() - 0.5), step: 0 });
        
        // Hide after 2 seconds
        setTimeout(() => {
           setGameData(prev => prev ? { ...prev, hidden: true } : null);
           setMessage('Now tap them in order!');
        }, 2000);
     }
     else if (currentGame.id === 'sound') {
        const target = ICONS_EMOTIONS[Math.floor(Math.random() * ICONS_EMOTIONS.length)];
        let opts = [target];
        while (opts.length < 3) {
           const r = ICONS_EMOTIONS[Math.floor(Math.random() * ICONS_EMOTIONS.length)];
           if (!opts.find(o => o.f === r.f)) opts.push(r);
        }
        opts = opts.sort(() => Math.random() - 0.5);
        setMessage(`Read this: "${target.w.toUpperCase()}"`);
        // Speak the word to assist dyslexia
        const synth = window.speechSynthesis;
        synth.cancel();
        synth.speak(new SpeechSynthesisUtterance(`Tap the ${target.w} face!`));
        setGameData({ target: target.w, options: opts.map(o => o.f), correct: target.f });
     }
  };

  useEffect(() => {
    initGameData();
  }, [currentGame.id]);

  const handleWinClick = () => {
     setMessage('🎉 Correct!');
     addPoints(5);
     const newStreak = streak + 1;
     setStreak(newStreak);
     
     if (newStreak >= 3) {
        setWon(true);
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
     } else {
        setTimeout(() => initGameData(), 1000);
     }
  };

  const handleFailClick = () => {
     setMessage('💪 Almost! Try again!');
     setStreak(0);
  };

  const onOptionTap = (opt) => {
     if (won || !gameData) return;

     if (currentGame.id === 'pattern' && opt === gameData.target) handleWinClick();
     else if (currentGame.id === 'emotion' && opt === gameData.correct) handleWinClick();
     else if (currentGame.id === 'focus' && opt === gameData.target) handleWinClick();
     else if (currentGame.id === 'sound' && opt === gameData.correct) handleWinClick();
     else if (currentGame.id === 'memory' && gameData.hidden) {
        if (opt === gameData.sequence[gameData.step]) {
           const nextStep = gameData.step + 1;
           if (nextStep >= gameData.sequence.length) {
              handleWinClick();
           } else {
              setGameData({ ...gameData, step: nextStep });
           }
        } else handleFailClick();
     }
     else {
        handleFailClick();
     }
  };

  return (
    <div className="container text-center" style={{ marginTop: '5vh' }}>
      <h1 className="mb-2" style={{ color: 'var(--primary)' }}>{currentGame.name}</h1>
      <p className="mb-4" style={{ opacity: 0.7, fontWeight: 'bold' }}>{currentGame.type}</p>
      
      {won ? (
        <div className="enhanced-card bounce-card pulse">
          <div style={{ fontSize: '5rem' }}>🎉</div>
          <h2>Level Complete!</h2>
          <p style={{ color: 'var(--success)', fontWeight: 'bold' }}>You earned +15 Points!</p>
          <button className="btn mt-4" onClick={() => {
              addHistory({ type: '🎮 Game', topic: currentGame.name, points: 15 });
              navigate('/child-dashboard');
           }} style={{ background: 'var(--primary)', padding: '15px 30px', fontSize: '1.2rem' }}>Back to World</button>
        </div>
      ) : (
        <div className="enhanced-card" style={{ maxWidth: '600px', margin: '0 auto', background: 'var(--surface)', minHeight: '300px' }}>
          
          <p className="anim-pop" style={{ fontSize: '1.4rem', marginBottom: '20px', fontWeight: 'bold', color: message.includes('Almost') ? 'var(--warning)' : 'var(--text)' }}>
             {message}
          </p>
          
          {/* Dynamic Game Rendering */}
          <div className="mb-6" style={{ minHeight: '100px' }}>
             {/* Pattern Rendering */}
             {currentGame.id === 'pattern' && gameData && (
                 <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', fontSize: '3rem' }}>
                    {gameData.sequence.map((item, idx) => <span key={idx} className="anim-pop">{item}</span>)}
                    <span style={{ color: 'var(--muted)', animation: 'pulse 1s infinite' }}>?</span>
                 </div>
             )}

             {/* Focus Grid Rendering */}
             {currentGame.id === 'focus' && gameData && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', maxWidth: '300px', margin: '0 auto' }}>
                   {gameData.grid.map((item, idx) => (
                      <button key={idx} className="btn-secondary" style={{ fontSize: '3rem', padding: '15px', borderRadius: '15px' }} onClick={() => onOptionTap(item)}>{item}</button>
                   ))}
                </div>
             )}

             {/* Memory Rendering */}
             {currentGame.id === 'memory' && gameData && (
                 <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', fontSize: '4rem' }}>
                    {!gameData.hidden ? (
                       gameData.sequence.map((item, idx) => <span key={idx} className="anim-pop">{item}</span>)
                    ) : (
                       <span style={{ color: 'var(--primary)', fontSize: '2rem', animation: 'pulse 2s infinite' }}>🤔 Tap the sequence below! ({gameData.step} / {gameData.sequence.length})</span>
                    )}
                 </div>
             )}
          </div>

          {/* Options Renderer for Multiple Choice Games */}
          {['pattern', 'emotion', 'sound', 'memory'].includes(currentGame.id) && gameData && (
             <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {gameData.options.map((opt, idx) => (
                   <button 
                     key={idx} 
                     className="btn-secondary hover:scale-110" 
                     style={{ fontSize: '4rem', padding: '20px 40px', borderRadius: '25px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                     onClick={() => onOptionTap(opt)}
                   >
                      {opt}
                   </button>
                ))}
             </div>
          )}

          <div style={{ marginTop: '30px', width: '100%', height: '10px', background: 'var(--bg)', borderRadius: '10px' }}>
             <div style={{ width: `${(streak / 3) * 100}%`, height: '100%', background: 'var(--success)', borderRadius: '10px', transition: 'width 0.3s' }}></div>
          </div>
          <p style={{ marginTop: '10px', opacity: 0.7, fontWeight: 'bold' }}>Progress: {streak} / 3 🌟</p>
        </div>
      )}
    </div>
  );
}
