import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DrawingPage({ addPoints }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#FF6B6B');
  const [brushSize, setBrushSize] = useState(10);
  const [isMagic, setIsMagic] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hue, setHue] = useState(0);
  const navigate = useNavigate();

  const prompts = ["Draw a friendly alien 👽", "Paint a giant castle 🏰", "Scribble a happy sun ☀️", "Draw your favorite pet 🐶"];
  const [prompt] = useState(prompts[Math.floor(Math.random() * prompts.length)]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 0.9 > 800 ? 800 : window.innerWidth * 0.9;
      canvas.height = 500;
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
    
    if (isMagic) {
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      setHue(prev => (prev + 5) % 360);
    } else {
      ctx.strokeStyle = color;
    }
    
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const endDraw = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadArtwork = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `my-artwork-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    if(addPoints) addPoints(10);
  };

  const completeChallenge = () => {
    setSaved(true);
    if(addPoints) addPoints(20);
    setTimeout(() => {
      navigate('/child-dashboard');
    }, 2000);
  };

  return (
    <div className="container text-center" style={{ paddingBottom: '60px' }}>
      <div className="anim-pop">
         <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', fontWeight: '900' }}>🎨 Magic Drawing Canvas</h1>
         <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}><strong>Today's Challenge:</strong> {prompt}</p>
      </div>

      {saved && (
        <div className="alert mb-4 pulse" style={{ background: '#10B981', color: 'white', padding: '15px', borderRadius: '20px', fontWeight: 'bold' }}>
          🎉 AMAZING ARTWORK! +20 Points added. Journey continues...
        </div>
      )}

      {/* Control Panel */}
      <div className="cartoon-card mb-4" style={{ padding: '20px', display: 'inline-flex', gap: '20px', alignItems: 'center', background: 'white' }}>
         <div className="flex gap-2">
            {['#FF6B6B', '#4D96FF', '#6BCB77', '#FFD93D', '#6B728E', '#000000'].map(c => (
              <button 
                key={c} 
                onClick={() => { setColor(c); setIsMagic(false); }} 
                style={{ background: c, width: '45px', height: '45px', borderRadius: '50%', border: (!isMagic && color === c) ? '5px solid #333' : '3px solid transparent', cursor: 'pointer', transition: '0.2s' }}
              />
            ))}
            <button 
              onClick={() => setIsMagic(true)} 
              style={{ background: 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)', width: '45px', height: '45px', borderRadius: '50%', border: isMagic ? '5px solid #333' : '3px solid transparent', cursor: 'pointer' }}
              title="Magic Rainbow Brush"
            >✨</button>
         </div>
         
         <div className="flex flex-col">
            <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Brush Size</label>
            <input type="range" min="2" max="50" value={brushSize} onChange={(e) => setBrushSize(parseInt(e.target.value))} />
         </div>

         <div className="flex gap-2">
            <button className="btn" style={{ background: '#eee', color: '#333', padding: '10px 20px' }} onClick={clearCanvas}>🧹 Clear</button>
            <button className="btn" style={{ background: 'var(--primary)', padding: '10px 20px' }} onClick={downloadArtwork}>💾 Save to Gallery</button>
         </div>
      </div>

      <div className="enhanced-card" style={{ padding: 0, overflow: 'hidden', display: 'inline-block', border: '8px solid #333', borderRadius: '20px', boxShadow: '20px 20px 0 rgba(0,0,0,0.1)', touchAction: 'none' }}>
        <canvas 
          ref={canvasRef}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={(e) => { const touch = e.touches[0]; const rect = e.target.getBoundingClientRect(); startDraw({ nativeEvent: { offsetX: touch.clientX - rect.left, offsetY: touch.clientY - rect.top }}); }}
          onTouchMove={(e) => { const touch = e.touches[0]; const rect = e.target.getBoundingClientRect(); draw({ nativeEvent: { offsetX: touch.clientX - rect.left, offsetY: touch.clientY - rect.top }}); }}
          onTouchEnd={endDraw}
          style={{ cursor: 'crosshair', display: 'block', background: 'white' }}
        />
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button className="btn" style={{ padding: '15px 40px', fontSize: '1.4rem', boxShadow: '0 10px 0 #5b39c9' }} onClick={completeChallenge}>FINISH MASTERPIECE 🌟</button>
      </div>
    </div>
  );
}
