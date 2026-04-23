import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MoodPage({ setMood }) {
  const navigate = useNavigate();
  const moods = [
    { label: 'Happy', emoji: '😁', color: '#FFF5F5', border: '#FEB2B2', text: 'Excited & Ready!' },
    { label: 'Calm', emoji: '😌', color: '#F0FFF4', border: '#9AE6B4', text: 'Peaceful & Quiet' },
    { label: 'Tired', emoji: '😴', color: '#EBF8FF', border: '#90CDF4', text: 'Low Energy' },
    { label: 'Stressed', emoji: '😫', color: '#FAF5FF', border: '#D6BCFA', text: 'Brave & Trying' }
  ];

  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div className="anim-pop text-center">
         <h1 style={{ fontSize: '3.5rem', fontWeight: '950', letterSpacing: '-2px', marginBottom: '10px' }}>How are you feeling?</h1>
         <p style={{ fontSize: '1.2rem', fontWeight: 'bold', opacity: 0.6, marginBottom: '50px' }}>NeuroNest will adapt your journey to match your energy level! 🦊✨</p>
         
         <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', width: '100%', maxWidth: '900px' }}>
            {moods.map((m) => (
            <div 
               key={m.label} 
               className="cartoon-card wobble-hover"
               onClick={() => {
                  if (setMood) setMood(m.label);
                  navigate('/learning');
               }}
               style={{ 
                  cursor: 'pointer', 
                  background: m.color, 
                  border: `6px solid #333`, 
                  boxShadow: `12px 12px 0 #333`,
                  padding: '40px 20px'
               }}
            >
               <div style={{ fontSize: '5rem', marginBottom: '15px' }}>{m.emoji}</div>
               <h3 style={{ fontSize: '1.8rem', fontWeight: '950', margin: 0 }}>{m.label}</h3>
               <p style={{ fontSize: '0.9rem', fontWeight: 'bold', opacity: 0.7 }}>{m.text}</p>
            </div>
            ))}
         </div>
      </div>
    </div>
  );
}
