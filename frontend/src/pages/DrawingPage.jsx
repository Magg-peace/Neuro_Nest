import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DrawingPage({ addPoints }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#4A4A4A');
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const prompts = ["Draw a friendly alien 👽", "Color a big house 🏠", "Scribble a happy sun ☀️", "Draw your favorite animal 🐶"];
  const [prompt] = useState(prompts[Math.floor(Math.random() * prompts.length)]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 0.8 > 600 ? 600 : window.innerWidth * 0.8;
      canvas.height = 400;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const startDraw = (e) => {
    setIsDrawing(true);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const endDraw = () => setIsDrawing(false);

  const saveDrawing = () => {
    setSaved(true);
    if(addPoints) addPoints(20);
    setTimeout(() => {
      navigate('/child-dashboard');
    }, 2000);
  };

  return (
    <div className="container text-center">
      <h2 className="mb-2">🎨 Creative Space</h2>
      <p className="mb-4"><strong>Idea:</strong> {prompt}</p>

      {saved && (
        <div className="alert mb-4 pulse" style={{ background: 'var(--success)', padding: '15px', borderRadius: '10px' }}>
          🎉 Beautiful! +20 Points added. Saving & Returning to Dashboard...
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '15px' }}>
        {['#FFB5A7', '#D4A373', '#CCD5AE', '#4A4A4A', '#5bc0de', '#d9534f'].map(c => (
          <button 
            key={c} 
            onClick={() => setColor(c)} 
            style={{ background: c, width: '40px', height: '40px', borderRadius: '50%', border: color === c ? '3px solid white' : 'none', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', cursor: 'pointer' }}
          />
        ))}
      </div>

      <div className="enhanced-card" style={{ padding: 0, overflow: 'hidden', display: 'inline-block', border: '5px solid var(--primary)', touchAction: 'none' }}>
        <canvas 
          ref={canvasRef}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={(e) => { const touch = e.touches[0]; const rect = e.target.getBoundingClientRect(); startDraw({ nativeEvent: { offsetX: touch.clientX - rect.left, offsetY: touch.clientY - rect.top }}); }}
          onTouchMove={(e) => { const touch = e.touches[0]; const rect = e.target.getBoundingClientRect(); draw({ nativeEvent: { offsetX: touch.clientX - rect.left, offsetY: touch.clientY - rect.top }}); }}
          onTouchEnd={endDraw}
          style={{ cursor: 'crosshair', display: 'block' }}
        />
      </div>

      <div className="mt-4">
        <button className="btn" onClick={saveDrawing}>Save Artwork</button>
      </div>
    </div>
  );
}
