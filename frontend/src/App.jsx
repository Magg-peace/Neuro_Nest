import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, Home, User, BookOpen, Activity, PlaySquare, PenTool } from 'lucide-react';
import { generateLearningContent } from './services/llm';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import GamePage from './pages/GamePage';
import DrawingPage from './pages/DrawingPage';
import StoryPage from './pages/StoryPage';
import LearningPage from './pages/LearningPage';
import MoodPage from './pages/MoodPage';
import './index.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const ThemeContext = createContext();
const AuthContext = createContext();
export const AppContext = createContext();

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

import AuthPage from './pages/AuthPage';

// ... Navigation
const DockMenu = () => {
  const { user } = useContext(AuthContext);
  if (!user || user.role === 'parent') return null;
  return (
    <div className="dock-menu">
      <Link to="/child-dashboard" className="dock-item"><Home size={24} /></Link>
      <Link to="/learning" className="dock-item"><BookOpen size={24} /></Link>
      <Link to="/mood" className="dock-item"><Activity size={24} /></Link>
    </div>
  );
};

const LandingPage = () => {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Navbar */}
      <nav className="container flex justify-between items-center" style={{ padding: '20px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="flex items-center gap-2 logo-loop">
           <span style={{ fontSize: '2rem' }}>🧠</span>
           <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>NeuroNest</span>
        </div>
        <div className="flex gap-4">
           <Link to="/login/parent" className="btn btn-secondary">Login</Link>
           <Link to="/login/parent" className="btn" style={{ background: 'var(--primary)' }}>Get Started 🚀</Link>
        </div>
      </nav>

      <div className="container" style={{ padding: '40px 20px' }}>
         {/* 1. Hero Section */}
         <div className="hero" style={{ padding: '60px 20px', textAlign: 'center', position: 'relative' }}>
           <div className="anim-pop" style={{ fontSize: '48px', marginBottom: '12px', animation: 'float 3s ease-in-out infinite' }}>🧠</div>
           <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: 1.1, color: 'var(--primary)', marginBottom: '20px' }}>
              NeuroNest<br/>
              <span style={{ fontSize: '2.5rem', color: 'var(--text)' }}>AI-Powered Learning for Every Unique Mind</span>
           </h1>
           <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 30px auto', opacity: 0.8, lineHeight: '1.6' }}>
              Designed for children with ADHD, Autism & Dyslexia —<br/>NeuroNest adapts learning to how <em>they think, feel, and grow.</em><br/><br/>
              <strong>🎯 Personalized • 😊 Emotion-Aware • 🎮 Engaging</strong>
           </p>
           <div className="flex justify-center gap-4 flex-wrap">
              <Link to="/login/child" className="btn hover:scale-105" style={{ padding: '15px 30px', fontSize: '1.3rem' }}>🚀 Start Learning</Link>
              <Link to="/login/parent" className="btn btn-secondary hover:scale-105" style={{ padding: '15px 30px', fontSize: '1.3rem', borderColor: 'var(--primary)', color: 'var(--primary)' }}>📊 Watch Demo</Link>
           </div>
         </div>

         {/* 2. Problem vs Solution Comparison Section */}
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '60px' }}>
            <div className="comp-box comp-old hover:scale-105" style={{ transition: 'all 0.3s' }}>
               <h3 style={{ color: '#E53E3E', fontSize: '1.5rem', marginBottom: '15px' }}>❌ The Old Way</h3>
               <ul style={{ listStyle: 'none', padding: 0 }}>
                 <li style={{ marginBottom: '10px' }}>• One-size-fits-all learning</li>
                 <li style={{ marginBottom: '10px' }}>• No emotional awareness</li>
                 <li style={{ marginBottom: '10px' }}>• Overstimulation & distractions</li>
                 <li style={{ marginBottom: '10px' }}>• No connection between parent & teacher</li>
               </ul>
            </div>
            <div className="comp-box comp-new hover:scale-105" style={{ transition: 'all 0.3s', boxShadow: '0 10px 25px rgba(16, 185, 129, 0.15)' }}>
               <h3 style={{ color: '#065F46', fontSize: '1.5rem', marginBottom: '15px' }}>✅ The NeuroNest Way</h3>
               <ul style={{ listStyle: 'none', padding: 0 }}>
                 <li style={{ marginBottom: '10px' }}>• AI-personalized learning paths</li>
                 <li style={{ marginBottom: '10px' }}>• Mood-aware adaptive sessions</li>
                 <li style={{ marginBottom: '10px' }}>• Multi-sensory learning (audio + visual + games)</li>
                 <li style={{ marginBottom: '10px' }}>• Connected ecosystem (child + parent + teacher)</li>
               </ul>
            </div>
         </div>

         {/* 3. The Ecosystem (Roles) as Interactive Cards */}
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginBottom: '60px' }}>
            <div className="feat-card hover:scale-105" style={{ transition: 'all 0.3s' }}>
               <div className="f-icon anim-pop">🧒🏽</div>
               <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Child Experience</h3>
               <p style={{ opacity: 0.8, marginBottom: '20px', minHeight: '80px' }}>Fun, adaptive learning designed just for them.<br/>• Interactive stories & games<br/>• Voice-assisted learning<br/>• Mood-based sessions<br/>• Rewards & achievements</p>
               <Link to="/login/child" className="btn w-full" style={{ background: 'var(--primary)' }}>Explore Child Mode →</Link>
            </div>
            <div className="feat-card hover:scale-105" style={{ transition: 'all 0.3s' }}>
               <div className="f-icon anim-pop" style={{ animationDelay: '0.1s' }}>👨‍👩‍👧</div>
               <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Parent Dashboard</h3>
               <p style={{ opacity: 0.8, marginBottom: '20px', minHeight: '80px' }}>Stay connected to your child’s growth.<br/>• Real-time progress tracking<br/>• Mood & behavior insights<br/>• Smart AI recommendations<br/>• Direct teacher communication</p>
               <Link to="/login/parent" className="btn w-full" style={{ background: '#10B981' }}>Explore Parent Panel →</Link>
            </div>
            <div className="feat-card hover:scale-105" style={{ transition: 'all 0.3s' }}>
               <div className="f-icon anim-pop" style={{ animationDelay: '0.2s' }}>🧑‍🏫</div>
               <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Teacher Command</h3>
               <p style={{ opacity: 0.8, marginBottom: '20px', minHeight: '80px' }}>Empowering educators with AI insights.<br/>• Student performance analytics<br/>• Behavioral & learning insights<br/>• Task assignment system<br/>• Early intervention alerts</p>
               <Link to="/login/teacher" className="btn w-full" style={{ background: '#F59E0B' }}>Explore Teacher Panel →</Link>
            </div>
         </div>

         {/* 4. How It Works Section */}
         <div className="enhanced-card" style={{ marginBottom: '60px', background: 'var(--surface)', padding: '40px', borderRadius: '20px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: 'var(--text)' }}>⚙️ How NeuroNest Works</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', fontSize: '1.1rem' }}>
              <div><span style={{ fontSize: '2rem', display: 'block', marginBottom: '10px' }}>1️⃣</span> <strong>Create Child Profile</strong></div>
              <div><span style={{ fontSize: '2rem', display: 'block', marginBottom: '10px' }}>2️⃣</span> <strong>Select Mood & Topic</strong></div>
              <div><span style={{ fontSize: '2rem', display: 'block', marginBottom: '10px' }}>3️⃣</span> <strong>AI Generates Content</strong></div>
              <div><span style={{ fontSize: '2rem', display: 'block', marginBottom: '10px' }}>4️⃣</span> <strong>Track Progress & Insights</strong></div>
            </div>
            <p style={{ marginTop: '30px', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)' }}>Simple. Adaptive. Powerful.</p>
         </div>

         {/* 5. Impact Metrics */}
         <div style={{ background: 'linear-gradient(135deg, var(--primary), #A78BFA)', borderRadius: '30px', padding: '40px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', color: 'white', textAlign: 'center', gap: '20px', boxShadow: '0 10px 30px rgba(156, 120, 255, 0.4)', marginBottom: '60px' }}>
            <div className="anim-pop"><div style={{ fontSize: '3.5rem', fontWeight: '900' }}>📈 +49%</div><div style={{ fontSize: '1.2rem', fontWeight: 'bold', opacity: 0.9 }}>Focus Improvement</div></div>
            <div className="anim-pop" style={{ animationDelay: '0.2s' }}><div style={{ fontSize: '3.5rem', fontWeight: '900' }}>🧠 3x</div><div style={{ fontSize: '1.2rem', fontWeight: 'bold', opacity: 0.9 }}>Better Retention</div></div>
            <div className="anim-pop" style={{ animationDelay: '0.4s' }}><div style={{ fontSize: '3.5rem', fontWeight: '900' }}>😊 80%</div><div style={{ fontSize: '1.2rem', fontWeight: 'bold', opacity: 0.9 }}>Reduction in Learning Stress</div></div>
         </div>

         {/* 6. Why It's Different Section */}
         <div className="border-glow" style={{ marginBottom: '60px', background: 'var(--surface)', padding: '40px', borderRadius: '20px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: 'var(--text)' }}>💡 Why NeuroNest Stands Out</h2>
            <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6', opacity: 0.9 }}>
              Unlike traditional apps, NeuroNest adapts not just to what a child learns, but <strong>*how they feel while learning.*</strong>
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', marginTop: '30px', fontSize: '1.1rem' }}>
               <div style={{ background: 'var(--bg)', padding: '15px 30px', borderRadius: '30px' }}>• Cognitive personalization</div>
               <div style={{ background: 'var(--bg)', padding: '15px 30px', borderRadius: '30px' }}>• Emotional intelligence</div>
               <div style={{ background: 'var(--bg)', padding: '15px 30px', borderRadius: '30px' }}>• Real-time collaboration</div>
            </div>
            <p style={{ marginTop: '30px', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--success)' }}>→ Creating a truly inclusive learning experience.</p>
         </div>

         {/* 7. Final CTA */}
         <div style={{ padding: '40px 20px', textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="mb-4" style={{ fontSize: '2.5rem' }}>🚀 Give Every Child the Learning They Deserve</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.8 }}>Start your NeuroNest journey today.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link to="/login/child" className="btn hover:scale-110" style={{ padding: '15px 40px', fontSize: '1.3rem' }}>🚀 Start Learning</Link>
              <Link to="/login/parent" className="btn btn-secondary hover:scale-110" style={{ padding: '15px 40px', fontSize: '1.3rem', borderColor: 'var(--primary)', color: 'var(--primary)' }}>📊 Try Demo</Link>
            </div>
         </div>
      </div>

      {/* 8. Footer */}
      <footer style={{ padding: '40px 20px', textAlign: 'center', borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
         <h3 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '10px' }}>NeuroNest — AI Learning Companion</h3>
         <p style={{ opacity: 0.8, marginBottom: '20px' }}>Built for inclusive education 💛</p>
         <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
            <a href="#" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 'bold' }}>Contact</a> | 
            <Link to="/login/parent" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 'bold' }}>Demo</Link> | 
            <a href="https://github.com/Meghana-sh/NeuroNest" style={{ color: 'var(--text)', textDecoration: 'none', fontWeight: 'bold' }}>GitHub</a>
         </div>
         <div style={{ opacity: 0.5, fontSize: '0.9rem' }}>
            © 2026 NeuroNest Team. Hackathon Showcase.
         </div>
      </footer>
    </div>
  );
};

const ChildLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Local state for hackathon demo child profiles
  const [profiles, setProfiles] = useState(() => {
     const saved = localStorage.getItem('childProfiles');
     return saved ? JSON.parse(saved) : [];
  });

  const [mode, setMode] = useState('select'); // select | login | create
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  
  // Create Profile State
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState('🦊');
  const [newPin, setNewPin] = useState(['', '', '', '']);
  
  // Login State
  const [loginPin, setLoginPin] = useState(['', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');

  const availableAvatars = ['🦊', '🐻', '🐼', '🐯', '🐰', '🦁', '🐙', '🦄'];

  const handleCreatePin = (idx, val) => {
     let pinArr = [...newPin]; pinArr[idx] = val.slice(-1); setNewPin(pinArr);
  };
  const handleLoginPin = (idx, val) => {
     let pinArr = [...loginPin]; pinArr[idx] = val.slice(-1); setLoginPin(pinArr);
     
     if (pinArr.join('').length === 4) {
        if (pinArr.join('') === selectedAvatar.pin) {
           setTimeout(() => {
              login({ role: 'child', name: selectedAvatar.name, avatar: selectedAvatar.icon });
              navigate('/child-dashboard');
           }, 300);
        } else {
           setErrorMsg('Oops! Wrong PIN. Try again!');
           setLoginPin(['', '', '', '']);
        }
     }
  };

  const saveProfile = () => {
     if (!newName || newPin.join('').length < 4) return;
     const updated = [...profiles, { name: newName, icon: newAvatar, pin: newPin.join('') }];
     setProfiles(updated);
     localStorage.setItem('childProfiles', JSON.stringify(updated));
     setMode('select');
  };

  if (mode === 'create') {
     return (
       <div className="container text-center" style={{ marginTop: '5vh', maxWidth: '600px' }}>
          <div className="enhanced-card border-glow">
             <h2 className="mb-4 text-center">Create Your Profile! 🌟</h2>
             <input type="text" placeholder="What is your name?" className="input-field text-center mb-4" value={newName} onChange={e => setNewName(e.target.value)} />
             
             <h3 className="mb-2">Pick an Avatar!</h3>
             <div className="flex justify-center gap-2 flex-wrap mb-4">
                {availableAvatars.map(a => (
                   <div key={a} onClick={() => setNewAvatar(a)} className={`mood-item ${newAvatar === a ? 'selected' : ''}`} style={{ fontSize: '3rem', padding: '10px', minWidth: '80px' }}>{a}</div>
                ))}
             </div>

             <h3 className="mb-2">Create a 4-Digit Secret PIN 🔒</h3>
             <div className="flex justify-center gap-4 mb-4">
               {[0,1,2,3].map(i => (
                 <input key={i} type="number" className="input-field text-center" style={{ width: '70px', height: '70px', fontSize: '2rem', padding: '0' }} value={newPin[i]} onChange={(e) => handleCreatePin(i, e.target.value)} />
               ))}
             </div>

             <button className="btn w-full mt-4" style={{ width: '100%' }} onClick={saveProfile}>Save My Profile! 🚀</button>
             <button className="btn btn-secondary mt-2" style={{ width: '100%' }} onClick={() => setMode('select')}>Cancel</button>
          </div>
       </div>
     )
  }

  if (mode === 'login' && selectedAvatar) {
    return (
      <div className="container text-center" style={{ marginTop: '5vh' }}>
         <h2 className="mb-4" style={{ fontSize: '2.5rem' }}>Enter your secret PIN! 🔒</h2>
         <div style={{ fontSize: '5rem', marginBottom: '20px' }} className="anim-breathe">{selectedAvatar.icon}</div>
         {errorMsg && <p style={{ color: 'var(--error)', fontSize: '1.2rem', fontWeight: 'bold' }}>{errorMsg}</p>}
         <div className="flex justify-center gap-4 mt-4">
           {[0,1,2,3].map(i => (
             <input key={i} type="password" 
               style={{ width: '70px', height: '70px', fontSize: '3rem', textAlign: 'center', border: '3px solid var(--primary)', borderRadius: '20px' }}
               value={loginPin[i]}
               onChange={(e) => handleLoginPin(i, e.target.value)}
             />
           ))}
         </div>
         <button className="btn btn-secondary mt-6" onClick={() => { setMode('select'); setLoginPin(['','','','']); setErrorMsg(''); }}>Go Back</button>
      </div>
    )
  }

  // Select Mode
  return (
    <div className="container text-center" style={{ marginTop: '5vh' }}>
      <h2 className="mb-4" style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>Who is exploring today? 🚀</h2>
      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {profiles.map((p, idx) => (
          <div key={idx} onClick={() => { setSelectedAvatar(p); setMode('login'); }} 
               className="bounce-card hover:scale-110" style={{ cursor: 'pointer', fontSize: '5rem', padding: '30px', minWidth: '150px' }}>
            <div className="anim-pop">{p.icon}</div>
            <h3 style={{ fontSize: '1.5rem', marginTop: '10px' }}>{p.name}</h3>
          </div>
        ))}
        
        <div onClick={() => setMode('create')} className="bounce-card hover:scale-110" style={{ cursor: 'pointer', fontSize: '4rem', padding: '30px', minWidth: '150px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '3px dashed var(--primary)' }}>
            <div style={{ color: 'var(--primary)' }}>➕</div>
            <h3 style={{ fontSize: '1.2rem', marginTop: '10px', color: 'var(--primary)' }}>New Profile</h3>
        </div>
      </div>
    </div>
  );
};

const ChildDashboard = () => {
   const { user } = useContext(AuthContext);
   const { mood, setMood, points, tasks, setTasks } = useContext(AppContext);
   
   const moodOptions = [
      { e: '😊', label: 'Happy', msg: 'Let’s explore something fun today! 🌟' },
      { e: '😌', label: 'Calm', msg: 'A peaceful learning time sounds perfect 🌈' },
      { e: '😟', label: 'Anxious', msg: 'It’s okay, we’ll go slow 💙' },
      { e: '😴', label: 'Tired', msg: 'Let’s do something light and easy 💤' }
   ];

   const getHeaderMsg = () => {
      const active = moodOptions.find(m => m.label === mood);
      return active ? active.msg : 'Ready for a fun adventure? 🚀';
   };

   // Fallback multi-options if no tasks
   const defaultTasks = [
      { id: '1', name: 'Resume: Solar System Adventure 🚀', from: 'AI', link: '/story' },
      { id: '2', name: 'Play: Ocean Focus Game 🌊', from: 'AI', link: '/game' },
      { id: '3', name: 'Learn: Animal Discoveries 🐘', from: 'AI', link: '/learning' }
   ];

   const displayTasks = tasks.length > 0 ? tasks.map(t => ({...t})) : defaultTasks;

   return (
    <div className="container" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorative Cartoon Background Elements */}
      <div style={{ position: 'absolute', top: '10%', left: '-5%', fontSize: '8rem', opacity: 0.1, animation: 'float 6s ease-in-out infinite', zIndex: 0 }}>🛸</div>
      <div style={{ position: 'absolute', top: '40%', right: '-5%', fontSize: '10rem', opacity: 0.1, animation: 'logoLoopAnim 8s ease-in-out infinite', zIndex: 0 }}>🚀</div>
      <div style={{ position: 'absolute', bottom: '10%', left: '10%', fontSize: '6rem', opacity: 0.15, animation: 'bounce 4s infinite', zIndex: 0 }}>🌟</div>
      
      <div className="flex justify-between items-center mb-6" style={{ position: 'relative', zIndex: 2 }}>
        <div className="flex items-center gap-4">
           {/* Cartoon Avatar Box */}
           <div className="avatar-box float-anim">
              <span>{user?.avatar || '🦊'}</span>
           </div>
           <div>
             <h1 style={{ fontSize: '2.5rem', margin: 0, color: 'var(--text)', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>Hi {user?.name || 'Alex'}!</h1>
             <p className="anim-pop" style={{ fontSize: '1.2rem', opacity: 0.8, margin: 0, color: 'var(--primary)', fontWeight: 'bold' }}>{getHeaderMsg()}</p>
           </div>
        </div>
        <div className="flex flex-col gap-2">
           <div className="cartoon-card" style={{ padding: '15px 25px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', borderColor: '#FFD700' }}>
              <div style={{ display: 'flex', gap: '15px' }}>
                 <div style={{ textAlign: 'center' }}>
                   <span style={{ fontSize: '1.5rem' }}>⭐</span>
                   <div style={{ fontWeight: 'bold', color: '#B8860B' }}>{points}</div>
                 </div>
                 <div style={{ borderLeft: '2px solid #eee', paddingLeft: '15px', textAlign: 'center' }}>
                   <span style={{ fontSize: '1.5rem' }}>🔥</span>
                   <div style={{ fontWeight: 'bold', color: '#FF4500' }}>3 Days</div>
                 </div>
              </div>
              <div style={{ width: '100%', height: '12px', background: '#f0f0f0', borderRadius: '10px', margin: '10px 0', border: '2px solid #333', overflow: 'hidden' }}>
                 <div style={{ width: `${Math.min(points, 100)}%`, height: '100%', background: 'linear-gradient(90deg, #FFD700, #FFA500)', transition: 'width 0.5s' }}></div>
              </div>
              <small style={{ fontWeight: 'bold', color: '#9c78ff' }}>Next Gift at 100! 🎁</small>
           </div>
           <div className="flex gap-2">
             <button className="btn w-full wobble-hover" style={{ padding: '10px', fontSize: '0.9rem', background: '#FF69B4', border: '3px solid #333', boxShadow: '4px 4px 0 #333' }}>🎁 Shop</button>
             <button className="btn w-full wobble-hover" style={{ padding: '10px', fontSize: '0.9rem', background: '#4169E1', border: '3px solid #333', boxShadow: '4px 4px 0 #333' }}>🏆 Awards</button>
           </div>
        </div>
      </div>

      {/* 2. Interactive Mood Selector */}
      <h3 className="mb-2 mt-4" style={{ fontSize: '1.5rem', color: 'var(--text)' }}>How are you feeling today?</h3>
      <div className="flex gap-4 mb-6">
         {moodOptions.map(m => (
            <button key={m.label} onClick={() => setMood(m.label)} className={`btn ${mood === m.label ? 'border-glow' : ''}`} style={{ background: mood === m.label ? 'var(--primary)' : 'var(--surface)', color: mood === m.label ? 'white' : 'var(--text)', fontSize: '2rem', padding: '15px 25px', borderRadius: '20px', flex: 1, display: 'flex', flexDirection: 'column', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', transform: mood === m.label ? 'scale(1.1) translateY(-5px)' : 'scale(1)', boxShadow: mood === m.label ? '0 10px 25px rgba(156, 120, 255, 0.4)' : '0 4px 6px rgba(0,0,0,0.05)' }}>
               <span>{m.e}</span>
               <span style={{ fontSize: '1rem', marginTop: '5px', fontWeight: 'bold' }}>{m.label}</span>
            </button>
         ))}
      </div>
      {mood !== 'Happy' && <div className="anim-pop" style={{ background: 'var(--surface)', padding: '15px', borderRadius: '15px', color: 'var(--primary)', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>💡 Got it! Let’s adjust to keep things comfortable for you 💛</div>}

      {/* 3. Recommended Section (Multiple Options synced from Teacher!) */}
      <div className="enhanced-card mb-6" style={{ background: 'linear-gradient(135deg, var(--primary), #a78bfa)', color: 'white', animation: 'borderGlowAnim 3s infinite alternate' }}>
         <h2 style={{ fontSize: '1.8rem', margin: '0 0 10px 0' }}>✨ Recommended for you</h2>
         
         <div className="flex-col gap-2" style={{ display: 'flex' }}>
            {displayTasks.map(task => (
               <div key={task.id} className="flex justify-between items-center bg-white hover:scale-105" style={{ background: 'rgba(255,255,255,0.2)', padding: '15px 25px', borderRadius: '15px', transition: 'all 0.2s', borderLeft: task.from === 'Teacher' ? '4px solid var(--warning)' : 'none' }}>
                  <div>
                     <h3 style={{ fontSize: '1.4rem', margin: 0 }}>
                        {task.from === 'Teacher' && '🎯 New Task: '}
                        {task.name}
                     </h3>
                     {task.from === 'Teacher' ? (
                        <>
                           <p style={{ margin: '5px 0 0 0', opacity: 1, color: 'var(--warning)', fontWeight: 'bold' }}>From your Teacher! 🎒</p>
                           <p style={{ margin: '5px 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>💡 Because you’re feeling {mood.toLowerCase()}, this will be comfortable!</p>
                        </>
                     ) : (
                        <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>⏱ 5 mins left • Multi-Sensory Mode</p>
                     )}
                  </div>
                  <Link to={task.link} className="btn" style={{ background: 'white', color: 'var(--primary)', fontSize: '1.2rem', padding: '10px 30px' }}>
                     Start NOW
                  </Link>
               </div>
            ))}
         </div>
      </div>
      {/* 4. Action Cards (Immersive & Cartoon Style) */}
      <div className="grid mb-10" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px', position: 'relative', zIndex: 2 }}>
        <Link to="/learning" className="cartoon-card wobble-hover" style={{ padding: '30px', textAlign: 'center', background: '#EAF6FF', textDecoration: 'none' }}>
           <div style={{ fontSize: '5rem', marginBottom: '15px' }} className="float-anim">📘</div>
           <h3 style={{ color: '#2C5282', fontSize: '1.8rem' }}>Learn</h3>
           <p style={{ color: '#4A5568', fontWeight: 'bold' }}>Fun Lessons! ✨</p>
           <small style={{ color: 'var(--primary)', fontWeight: 'bold' }}>👉 Animal Adventure</small>
        </Link>
        <Link to="/game" className="cartoon-card wobble-hover" style={{ padding: '30px', textAlign: 'center', background: '#C6F6D5', textDecoration: 'none' }}>
           <div style={{ fontSize: '5rem', marginBottom: '15px', animationDelay: '0.5s' }} className="float-anim">🎮</div>
           <h3 style={{ color: '#22543D', fontSize: '1.8rem' }}>Play</h3>
           <p style={{ color: '#2F855A', fontWeight: 'bold' }}>Mini Games! 🕹️</p>
           <small style={{ color: 'var(--primary)', fontWeight: 'bold' }}>👉 New: Memory Flash</small>
        </Link>
        <Link to="/story" className="cartoon-card wobble-hover" style={{ padding: '30px', textAlign: 'center', background: '#FED7E2', textDecoration: 'none' }}>
           <div style={{ fontSize: '5rem', marginBottom: '15px', animationDelay: '1s' }} className="float-anim">📖</div>
           <h3 style={{ color: '#702459', fontSize: '1.8rem' }}>Stories</h3>
           <p style={{ color: '#97266D', fontWeight: 'bold' }}>Animated Tales! 🎬</p>
           <small style={{ color: 'var(--primary)', fontWeight: 'bold' }}>👉 Space Voyage</small>
        </Link>
        <Link to="/drawing" className="cartoon-card wobble-hover" style={{ padding: '30px', textAlign: 'center', background: '#FEFCBF', textDecoration: 'none' }}>
           <div style={{ fontSize: '5rem', marginBottom: '15px', animationDelay: '1.5s' }} className="float-anim">🎨</div>
           <h3 style={{ color: '#744210', fontSize: '1.8rem' }}>Draw</h3>
           <p style={{ color: '#975A16', fontWeight: 'bold' }}>Creative Fun! 🖌️</p>
           <small style={{ color: 'var(--primary)', fontWeight: 'bold' }}>👉 Magic Canvas</small>
        </Link>
      </div>

      {/* 5. Daily Progress, Mood History & Rewards */}
      <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) minmax(250px, 1fr) minmax(200px, 1fr)', gap: '20px', marginBottom: '80px' }}>
         <div className="enhanced-card" style={{ background: 'var(--surface)' }}>
            <h2 style={{ fontSize: '1.3rem', borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '15px' }}>📊 Today's Progress</h2>
            <div className="flex gap-4 mb-4">
               <div style={{ flex: 1, background: '#EAF6FF', padding: '15px', borderRadius: '15px', textAlign: 'center' }}>
                  <span style={{ fontSize: '1.5rem' }}>📘</span> <br/>
                  <strong>2</strong> Lessons
               </div>
               <div style={{ flex: 1, background: '#C6F6D5', padding: '15px', borderRadius: '15px', textAlign: 'center' }}>
                  <span style={{ fontSize: '1.5rem' }}>🎮</span> <br/>
                  <strong>1</strong> Game
               </div>
               <div style={{ flex: 1, background: '#FFF3C4', padding: '15px', borderRadius: '15px', textAlign: 'center' }}>
                  <span style={{ fontSize: '1.5rem' }}>⭐</span> <br/>
                  <strong>+{points}</strong> Points
               </div>
            </div>
            <p className="anim-pop" style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--success)', textAlign: 'center', margin: 0 }}>🎉 Great job! Keep going!</p>
         </div>
         
         <div className="enhanced-card" style={{ background: 'var(--surface)' }}>
            <h2 style={{ fontSize: '1.3rem', borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '15px' }}>😊 Mood Journey</h2>
            <div className="flex items-center justify-center gap-2" style={{ fontSize: '1.8rem', height: '100px' }}>
               <span>😌</span><span style={{ fontSize: '1rem', opacity: 0.5 }}>→</span>
               <span>😊</span><span style={{ fontSize: '1rem', opacity: 0.5 }}>→</span>
               <span className="anim-pop border-glow" style={{ borderBottom: '3px solid var(--primary)', borderRadius: '50px', padding: '0 5px' }}>{moodOptions.find(m=>m.label===mood)?.e || '😊'}</span>
            </div>
         </div>

         <div className="enhanced-card" style={{ background: 'var(--surface)' }}>
            <h2 style={{ fontSize: '1.3rem', borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '15px' }}>🎁 Rewards</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 15px 0' }}>
               <li style={{ marginBottom: '10px' }}>⭐ <strong>Unlock Avatar</strong> (100 pts)</li>
               <li style={{ marginBottom: '10px' }}>🎨 <strong>New Colors</strong> (50 pts)</li>
               <li>🎮 <strong>New Game Level</strong></li>
            </ul>
         </div>
      </div>

      {/* 6. Floating Voice Assistant */}
      <Link to="/learning" className="hover:scale-110" style={{ position: 'fixed', bottom: '100px', right: '30px', background: 'var(--primary)', color: 'white', padding: '15px 30px', borderRadius: '50px', fontSize: '1.4rem', fontWeight: 'bold', boxShadow: '0 10px 30px rgba(156, 120, 255, 0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '15px', animation: 'breatheGlow 3s infinite' }}>
      <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
            <span className="sound-wave-bar"></span>
            <span className="sound-wave-bar" style={{ animationDelay: '0.2s', height: '24px' }}></span>
            <span className="sound-wave-bar" style={{ animationDelay: '0.4s' }}></span>
         </div>
         🎤 Talk to NeuroNest
      </Link>
    </div>
  );
};

const ParentDashboard = () => {
  const { points, history, notifications, learningSettings, setLearningSettings } = useContext(AppContext);
  
  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{ label: 'Points Earned', data: [65, 59, 80, 81, points], backgroundColor: 'rgba(156, 120, 255, 0.6)', borderRadius: 10 }]
  };

  return (
  <div className="container" style={{ maxWidth: '1200px', background: 'var(--bg)', minHeight: '100vh', borderRadius: 'var(--radius)', padding: '20px' }}>
    <h1 className="mb-4" style={{ fontSize: '2.5rem', color: 'var(--text)' }}>👨‍👩‍👧 Parent Dashboard</h1>
    
    <div className="grid mb-6" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
      <div className="cartoon-card" style={{ padding: '20px', borderLeft: '6px solid var(--primary)', background: 'white' }}>
        <p style={{ fontSize: '1rem', color: 'var(--text)', opacity: 0.8, margin: 0 }}>⭐ Total Points</p>
        <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '5px 0' }}>{points}</p>
        <small style={{ color: 'var(--success)', fontWeight: 'bold' }}>+15% from last week</small>
      </div>
      <div className="cartoon-card" style={{ padding: '20px', borderLeft: '6px solid var(--success)', background: 'white' }}>
        <p style={{ fontSize: '1rem', color: 'var(--text)', opacity: 0.8, margin: 0 }}>📈 Improvement</p>
        <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '5px 0', color: 'var(--success)' }}>Steady</p>
        <small style={{ color: 'var(--success)', fontWeight: 'bold' }}>Progressing in Visual Path</small>
      </div>
      <div className="cartoon-card" style={{ padding: '20px', borderLeft: '6px solid #FFD700', background: 'white' }}>
        <p style={{ fontSize: '1rem', color: 'var(--text)', opacity: 0.8, margin: 0 }}>🏆 Active Streak</p>
        <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '5px 0' }}>3 Days</p>
        <small style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Top 5% of Learners</small>
      </div>
    </div>

    <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '20px' }}>
       {/* AI Insights & Graphs */}
       <div className="flex-col gap-4" style={{ display: 'flex' }}>
          <div className="enhanced-card" style={{ background: 'var(--surface)' }}>
             <h2 className="mb-2 flex items-center gap-2">🧠 AI Behavioral Insights</h2>
             <div style={{ padding: '15px', background: 'var(--bg)', borderLeft: '4px solid var(--success)', borderRadius: '10px', marginBottom: '10px' }}>
                <p style={{ margin: 0 }}><strong>✔ Strength:</strong> Excels in visual learning formats.</p>
             </div>
             <div style={{ padding: '15px', background: 'var(--bg)', borderLeft: '4px solid #E53E3E', borderRadius: '10px', marginBottom: '10px' }}>
                <p style={{ margin: 0 }}><strong>⚠ Weakness:</strong> Focus drops consistently during long texts.</p>
             </div>
             <div style={{ padding: '15px', background: 'var(--bg)', borderLeft: '4px solid var(--primary)', borderRadius: '10px' }}>
                <p style={{ margin: '0 0 5px 0' }}>💡 <strong>Recommendation:</strong> Use shorter sessions + audio support.</p>
                <p style={{ margin: 0, color: 'var(--primary)', fontWeight: 'bold' }}>📊 Impact: Estimated +40% retention.</p>
             </div>
          </div>
          
          <div className="enhanced-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
             <h2 className="mb-2 flex items-center gap-2">📈 Weekly Progress</h2>
             <div style={{ flex: 1, width: '100%', minHeight: '200px' }}>
                <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
             </div>
          </div>
       </div>

       {/* Sessions & Controls & Notifications */}
       <div className="flex-col gap-4" style={{ display: 'flex' }}>
          
          {/* Notifications Panel */}
          <div className="enhanced-card border-glow" style={{ padding: '20px', background: 'var(--surface)' }}>
             <h2 className="mb-4">🔔 Live School Alerts</h2>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '180px', overflowY: 'auto' }}>
                {notifications.map((n, i) => (
                   <div key={i} className="anim-pop" style={{ padding: '10px 15px', background: 'var(--bg)', borderRadius: '10px', borderLeft: n.unread ? '4px solid var(--warning)' : '4px solid #ccc', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                      {n.text}
                   </div>
                ))}
             </div>
          </div>

          <div className="enhanced-card" style={{ background: 'var(--surface)', maxHeight: '400px', overflowY: 'auto' }}>
             <h2 className="mb-4 flex items-center gap-2">📜 Activity History</h2>
             <div className="flex flex-col gap-2">
                {history.map((h, i) => (
                   <div key={i} className="flex justify-between items-center p-3" style={{ background: 'var(--bg)', borderRadius: '10px' }}>
                      <div>
                         <strong style={{ color: 'var(--primary)' }}>{h.type}</strong>
                         <p style={{ margin: 0, fontSize: '0.9rem' }}>{h.topic}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                         <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{h.date}</span>
                         <div style={{ color: 'var(--success)', fontWeight: 'bold' }}>+{h.points} pts</div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  </div>
)};

const TeacherDashboard = () => {
  const { tasks, setTasks, notifications, setNotifications } = useContext(AppContext);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleAssignTask = async (taskName) => {
     setBtnLoading(true);
     try {
       await fetch('http://localhost:3001/api/notify', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ type: 'task', childName: 'Alex', taskTitle: taskName })
       });
     } catch(e) { console.error('Email failed', e); }

     setTimeout(() => {
        setTasks(prev => [...prev, { id: Date.now(), name: taskName, from: 'Teacher' }]);
        setNotifications(prev => [{ id: Date.now(), text: `🔔 Teacher assigned new task: ${taskName}`, unread: true }, ...prev]);
        setBtnLoading(false);
     }, 600);
  };

  const handleApplySuggestion = () => {
     setNotifications(prev => [{ id: Date.now(), text: `⚡ AI Suggestion applied: Switched Mia to Visual Mode`, unread: true }, ...prev]);
  };

  const handleAlertParent = async () => {
     try {
       await fetch('http://localhost:3001/api/notify', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ type: 'alert', childName: 'Mia' })
       });
       setNotifications(prev => [{ id: Date.now(), text: `📲 Alert Email Sent to Mia's Parent!`, unread: true }, ...prev]);
     } catch(e) { console.error('Email failed', e); }
  };

  const handleSendMsg = () => {
     setNotifications(prev => [{ id: Date.now(), text: `📨 Teacher sent a direct message.`, unread: true }, ...prev]);
  };

  const chartData = {
     labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
     datasets: [{ label: 'Class Avg Score', data: [75, 78, 80, 83, 82], borderColor: '#9c78ff', tension: 0.4 }]
  };

  return (
  <div className="container" style={{ maxWidth: '1200px', background: 'var(--bg)', minHeight: '100vh', borderRadius: 'var(--radius)', padding: '20px' }}>
    <h1 className="mb-4" style={{ fontSize: '2.5rem', color: 'var(--text)' }}>🧑‍🏫 Teacher Command Center</h1>
    
    {/* 1. Smart Top Cards */}
    <div className="grid mb-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
      <div className="enhanced-card hover:scale-105" style={{ background: 'var(--surface)', borderLeft: '6px solid var(--primary)', transition: 'transform 0.2s' }}>
        <p style={{ fontSize: '1rem', color: 'var(--text)', opacity: 0.8, margin: 0 }}>👥 Students Assigned</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
           <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '5px 0' }}>12</p>
           <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>↑ +2 this week</span>
        </div>
      </div>
      <div className="enhanced-card hover:scale-105" style={{ background: 'var(--surface)', borderLeft: '6px solid var(--success)', transition: 'transform 0.2s' }}>
        <p style={{ fontSize: '1rem', color: 'var(--text)', opacity: 0.8, margin: 0 }}>📊 Class Avg Score</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
           <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '5px 0' }}>82%</p>
           <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>↑ +5% improvement</span>
        </div>
      </div>
      <div className="enhanced-card border-glow hover:scale-105" style={{ background: 'var(--surface)', border: '2px solid #E53E3E', boxShadow: '0 0 15px rgba(229, 62, 62, 0.4)', transition: 'transform 0.2s' }}>
        <p style={{ fontSize: '1rem', color: '#E53E3E', fontWeight: 'bold', margin: 0 }}>⚠️ Needs Attention</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
           <p style={{ fontSize: '3rem', fontWeight: 'bold', margin: 0, color: '#C53030' }}>2</p>
           <span style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '0.9rem' }}>↓ from 4 yesterday</span>
        </div>
      </div>
    </div>

    <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(500px, 1.5fr) 1fr', gap: '20px', marginBottom: '20px' }}>
       {/* LEFT COLUMN */}
       <div className="flex-col gap-4" style={{ display: 'flex' }}>
         {/* 2. Enhanced Student Cards */}
         <div className="enhanced-card" style={{ padding: '0', overflow: 'hidden' }}>
           <h2 style={{ padding: '20px', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>📋 Student Insights</h2>
           <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              {/* Alert Student Card */}
              <div style={{ border: '2px solid #FC8181', borderRadius: '15px', padding: '15px', background: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 4px 10px rgba(229,62,62,0.15)' }}>
                 <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                       <div className="anim-pop" style={{ fontSize: '2.5rem', background: 'var(--bg)', borderRadius: '50px', padding: '5px' }}>👧</div>
                       <div>
                          <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Mia (6)</h3>
                          <div className="flex gap-2 mt-1">
                             <span style={{ fontSize: '0.8rem', background: 'var(--primary)', padding: '2px 8px', borderRadius: '10px', color: 'white' }}>🧠 Autism</span>
                             <span style={{ fontSize: '0.8rem', background: 'var(--success)', padding: '2px 8px', borderRadius: '10px', color: 'white' }}>🎧 Auditory</span>
                          </div>
                       </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                       <p style={{ margin: 0, color: '#E53E3E', fontWeight: 'bold' }}>⚠️ Focus Drop: 40%</p>
                       <p style={{ margin: 0, fontSize: '0.9rem' }}>😟 Mood: Stressed</p>
                    </div>
                 </div>
                 <div className="flex gap-2 mt-2">
                    <button className="btn" style={{ background: '#E53E3E', color: 'white', flex: 1, padding: '8px' }}>⚡ Intervene</button>
                    <button className="btn btn-secondary" style={{ flex: 1, padding: '8px' }} onClick={() => handleAssignTask("Auditory Practice (Mia)")}>
                       {btnLoading ? <span className="typing-dot" /> : 'Assign Task'}
                    </button>
                    <button className="btn btn-secondary" style={{ flex: 1, padding: '8px' }}>View Details</button>
                 </div>
              </div>

              {/* Standard Student Card */}
              <div className="hover:scale-105" style={{ border: '1px solid var(--border)', borderRadius: '15px', padding: '15px', background: 'var(--surface)', display: 'flex', flexDirection: 'column', gap: '10px', transition: 'all 0.2s' }}>
                 <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                       <div style={{ fontSize: '2.5rem', background: 'var(--bg)', borderRadius: '50px', padding: '5px' }}>👦</div>
                       <div>
                          <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Alex (7)</h3>
                          <div className="flex gap-2 mt-1">
                             <span style={{ fontSize: '0.8rem', background: 'var(--primary)', padding: '2px 8px', borderRadius: '10px', color: 'white' }}>🧠 ADHD</span>
                             <span style={{ fontSize: '0.8rem', background: 'var(--success)', padding: '2px 8px', borderRadius: '10px', color: 'white' }}>👁️ Visual</span>
                          </div>
                       </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                       <p style={{ margin: 0, color: 'var(--success)', fontWeight: 'bold' }}>📊 Score: 90%</p>
                       <p style={{ margin: 0, fontSize: '0.9rem' }}>😊 Mood: Happy</p>
                    </div>
                 </div>
                 <div className="flex gap-2 mt-2">
                    <button className="btn" style={{ background: 'var(--primary)', flex: 1, padding: '8px' }} onClick={() => handleAssignTask("Advanced Puzzles (Alex)")}>Assign Task</button>
                    <button className="btn btn-secondary" style={{ flex: 1, padding: '8px' }}>View Details</button>
                 </div>
              </div>
           </div>
         </div>

         {/* 3. AI Interventions */}
         <div className="enhanced-card border-glow" style={{ background: 'var(--surface)' }}>
             <h2 className="mb-4 flex items-center gap-2" style={{ color: 'var(--text)' }}><span className="anim-pop" style={{ fontSize: '1.8rem' }}>🧠</span> AI Classroom Alert</h2>
             
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div style={{ background: 'var(--bg)', padding: '15px', borderRadius: '10px' }}>
                   <p style={{ margin: '0 0 5px 0', opacity: 0.7, fontSize: '0.9rem' }}>⚠ Student Setup</p>
                   <h3 style={{ margin: 0, color: '#FC8181' }}>Mia is struggling with Auditory</h3>
                </div>
                <div style={{ background: 'var(--bg)', padding: '15px', borderRadius: '10px' }}>
                   <p style={{ margin: '0 0 5px 0', opacity: 0.7, fontSize: '0.9rem' }}>📊 Insight</p>
                   <h3 style={{ margin: 0 }}>Performance dropped 30%</h3>
                </div>
             </div>

             <div style={{ background: 'var(--bg)', borderLeft: '4px solid var(--success)', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
                <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>💡 Recommendation:</p>
                <p style={{ margin: 0 }}>Switch to Visual Mode + generate 5-minute shorter reading modules.</p>
                <div style={{ marginTop: '10px', fontSize: '0.9rem', fontWeight: 'bold' }}>🎯 Expected Outcome: +40% retention improvement</div>
             </div>

             <div className="flex gap-2">
                <button className="btn flex-1" style={{ background: 'var(--success)' }} onClick={handleApplySuggestion}>⚡ Apply Suggestion</button>
                <button className="btn btn-secondary flex-1" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'var(--text)' }} onClick={handleAlertParent}>Notify Parent</button>
             </div>
         </div>
       </div>

       {/* RIGHT COLUMN */}
       <div className="flex-col gap-4" style={{ display: 'flex' }}>
          
          {/* 4. Interactive Graph Placeholder */}
          <div className="enhanced-card" style={{ display: 'flex', flexDirection: 'column' }}>
             <div className="flex justify-between items-center mb-4">
                <h2 className="flex items-center gap-2" style={{ margin: 0 }}>📈 Progress</h2>
                <div style={{ background: 'var(--bg)', padding: '5px', borderRadius: '10px', display: 'flex', gap: '5px' }}>
                   <button style={{ padding: '5px 10px', background: 'white', border: '1px solid #ccc', borderRadius: '5px', fontSize: '0.8rem', cursor: 'pointer' }}>Class</button>
                   <button style={{ padding: '5px 10px', background: 'transparent', border: 'none', borderRadius: '5px', fontSize: '0.8rem', cursor: 'pointer' }}>Individual</button>
                </div>
             </div>
             
             <div style={{ width: '100%', height: '180px' }}>
                <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
             </div>
          </div>

          {/* 5. Mood Analytics */}
          <div className="enhanced-card" style={{ background: 'var(--surface)' }}>
             <h2 className="mb-4">😊 Classroom Mood</h2>
             <div style={{ marginBottom: '15px' }}>
                <div className="flex justify-between mb-1"><span style={{ fontSize: '0.9rem' }}>Happy (60%)</span><span>😊</span></div>
                <div style={{ width: '100%', height: '8px', background: 'var(--bg)', borderRadius: '5px' }}><div style={{ width: '60%', height: '100%', background: 'var(--success)', borderRadius: '5px' }}></div></div>
             </div>
             <div style={{ marginBottom: '15px' }}>
                <div className="flex justify-between mb-1"><span style={{ fontSize: '0.9rem' }}>Calm (25%)</span><span>😌</span></div>
                <div style={{ width: '100%', height: '8px', background: 'var(--bg)', borderRadius: '5px' }}><div style={{ width: '25%', height: '100%', background: 'var(--primary)', borderRadius: '5px' }}></div></div>
             </div>
             <div>
                <div className="flex justify-between mb-1"><span style={{ fontSize: '0.9rem' }}>Stressed (15%)</span><span>😟</span></div>
                <div style={{ width: '100%', height: '8px', background: 'var(--bg)', borderRadius: '5px' }}><div style={{ width: '15%', height: '100%', background: '#E53E3E', borderRadius: '5px' }}></div></div>
             </div>
          </div>

          {/* 6. Quick Actions */}
          <div className="enhanced-card" style={{ background: 'var(--surface)' }}>
             <h2 className="mb-4">⚙️ Quick Actions</h2>
             <div className="flex-col gap-2" style={{ display: 'flex' }}>
             </div>
          </div>

          {/* 7. Parent Communication */}
          <div className="enhanced-card" style={{ background: 'var(--surface)', border: '2px solid var(--primary)' }}>
             <h2 className="mb-2">📩 Message Parent</h2>
             <textarea className="input-field mb-2" defaultValue="Mia might need visual learning support today. Feel free to adjust her mode." style={{ width: '100%', height: '80px', background: 'var(--bg)', color: 'var(--text)' }}></textarea>
             <button className="btn w-full" style={{ background: 'var(--primary)' }} onClick={handleSendMsg}>Send Message 🚀</button>
          </div>

       </div>
    </div>
  </div>
)};

export default function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [mood, setMood] = useState('Happy');
  const [points, setPoints] = useState(0);

  // New Global State for Data Flow
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([{ id: 1, text: 'Welcome to NeuroNest!', unread: true }]);
  const [learningSettings, setLearningSettings] = useState({ mode: 'Visual', timer: '15 mins', games: true });

  // Persistent History for Parent Tracking
  const [history, setHistory] = useState([
     { type: 'Login', topic: 'Started Session', points: 0, date: new Date().toLocaleTimeString() }
  ]);

  const addHistory = (item) => setHistory(prev => [{ ...item, date: new Date().toLocaleTimeString() }, ...prev]);

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const addPoints = (p) => setPoints(points + p);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const markNotificationsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AuthContext.Provider value={{ user, login: setUser, logout: handleLogout }}>
        <AppContext.Provider value={{ mood, setMood, points, addPoints, tasks, setTasks, notifications, setNotifications, learningSettings, setLearningSettings, history, addHistory }}>
          <>
            <header className="container" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to="/" className="logo-loop" style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '2rem' }}>🧠</span> NeuroNest
              </Link>
              <div className="flex gap-4 items-center">
                {user && user.role === 'child' && <span className="btn btn-secondary border-glow">⭐ {points}</span>}
                
                {/* Global Notification Bell */}
                {user && user.role !== 'child' && (
                   <div style={{ position: 'relative' }}>
                      <button className="btn btn-secondary" style={{ padding: '10px', borderRadius: '50%' }} onClick={markNotificationsRead}>
                         🔔
                         {notifications.filter(n => n.unread).length > 0 && (
                            <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: 'var(--warning)', color: 'white', borderRadius: '50px', padding: '2px 8px', fontSize: '0.8rem', fontWeight: 'bold', animation: 'popAnim 0.5s' }}>
                               {notifications.filter(n => n.unread).length}
                            </span>
                         )}
                      </button>
                      <div className="hover:scale-105" style={{ display: 'none' }} /> {/* Hook for later if needed */}
                   </div>
                )}

                {user && <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>}
                <ThemeToggle />
              </div>
            </header>

            <main style={{ paddingBottom: '80px' }}>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login/:roleType" element={<AuthPage loginFn={setUser} />} />
                <Route path="/login/child" element={<ChildLogin />} />
                <Route path="/child-dashboard" element={<ChildDashboard />} />
                <Route path="/parent-dashboard" element={<ParentDashboard />} />
                <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                <Route path="/story" element={<StoryPage addPoints={addPoints} />} />
                <Route path="/game" element={<GamePage addPoints={addPoints} />} />
                <Route path="/drawing" element={<DrawingPage addPoints={addPoints} />} />
                <Route path="/mood" element={<MoodPage setMood={setMood} />} />
                <Route path="/learning" element={<LearningPage mood={mood} addPoints={addPoints} addHistory={addHistory} />} />
              </Routes>
            </main>
            <DockMenu />
          </>
        </AppContext.Provider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}
