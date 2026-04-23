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
import ChatBox from './components/ChatBox';
import ProgressChart from './components/ProgressChart';
import './index.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const ThemeContext = createContext();
const AuthContext = createContext();
export const AppContext = createContext();

const ThemeToggle = () => {
   const { theme, toggleTheme } = useContext(ThemeContext);
   return (
      <button className="theme-toggle" onClick={toggleTheme} style={{
        '--bg-main': 'radial-gradient(circle at 8% 12%, #d8c9ff 0%, transparent 34%), radial-gradient(circle at 88% 14%, #ffdca9 0%, transparent 30%), radial-gradient(circle at 20% 90%, #fbd6ed 0%, transparent 34%), linear-gradient(150deg, #f2eaff, #fce7f3 46%, #dbeafe)',
        '--bg-card': 'rgba(255, 255, 255, 0.7)',
        '--text-main': '#35285f',
        '--text-soft': '#5f4f8e',
        '--accent': '#9c78ff',
        '--accent-2': '#f59e0b',
        '--border': 'rgba(156, 120, 255, 0.2)',
        '--radius': '24px'
      }}>
         {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>
   );
};

import AuthPage from './pages/AuthPage';

const MagicLayer = () => {
  return (
    <div className="magic-layer">
      {[...Array(15)].map((_, i) => (
        <div 
          key={i} 
          className="star" 
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`, 
            animationDelay: `${Math.random() * 10}s`,
            fontSize: `${0.5 + Math.random() * 1.5}rem`
          }}
        >
          {['✨', '⭐', '🎈', '☁️', '🌈'][Math.floor(Math.random() * 5)]}
        </div>
      ))}
      <div style={{ position: 'fixed', top: '15%', left: '10%', fontSize: '4rem', opacity: 0.1, animation: 'float 8s infinite ease-in-out' }}>☁️</div>
      <div style={{ position: 'fixed', bottom: '20%', right: '15%', fontSize: '5rem', opacity: 0.1, animation: 'float 10s infinite ease-in-out', animationDelay: '2s' }}>☁️</div>
    </div>
  );
};
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
                  NeuroNest<br />
                  <span style={{ fontSize: '2.5rem', color: 'var(--text)' }}>AI-Powered Learning for Every Unique Mind</span>
               </h1>
               <p style={{ fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 30px auto', opacity: 0.8, lineHeight: '1.6' }}>
                  Designed for children with ADHD, Autism & Dyslexia —<br />NeuroNest adapts learning to how <em>they think, feel, and grow.</em><br /><br />
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
                  <p style={{ opacity: 0.8, marginBottom: '20px', minHeight: '80px' }}>Fun, adaptive learning designed just for them.<br />• Interactive stories & games<br />• Voice-assisted learning<br />• Mood-based sessions<br />• Rewards & achievements</p>
                  <Link to="/login/child" className="btn w-full" style={{ background: 'var(--primary)' }}>Explore Child Mode →</Link>
               </div>
               <div className="feat-card hover:scale-105" style={{ transition: 'all 0.3s' }}>
                  <div className="f-icon anim-pop" style={{ animationDelay: '0.1s' }}>👨‍👩‍👧</div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Parent Dashboard</h3>
                  <p style={{ opacity: 0.8, marginBottom: '20px', minHeight: '80px' }}>Stay connected to your child’s growth.<br />• Real-time progress tracking<br />• Mood & behavior insights<br />• Smart AI recommendations<br />• Direct teacher communication</p>
                  <Link to="/login/parent" className="btn w-full" style={{ background: '#10B981' }}>Explore Parent Panel →</Link>
               </div>
               <div className="feat-card hover:scale-105" style={{ transition: 'all 0.3s' }}>
                  <div className="f-icon anim-pop" style={{ animationDelay: '0.2s' }}>🧑‍🏫</div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Teacher Command</h3>
                  <p style={{ opacity: 0.8, marginBottom: '20px', minHeight: '80px' }}>Empowering educators with AI insights.<br />• Student performance analytics<br />• Behavioral & learning insights<br />• Task assignment system<br />• Early intervention alerts</p>
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
                  {[0, 1, 2, 3].map(i => (
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
               {[0, 1, 2, 3].map(i => (
                  <input key={i} type="password"
                     style={{ width: '70px', height: '70px', fontSize: '3rem', textAlign: 'center', border: '3px solid var(--primary)', borderRadius: '20px' }}
                     value={loginPin[i]}
                     onChange={(e) => handleLoginPin(i, e.target.value)}
                  />
               ))}
            </div>
            <button className="btn btn-secondary mt-6" onClick={() => { setMode('select'); setLoginPin(['', '', '', '']); setErrorMsg(''); }}>Go Back</button>
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
   const { 
      mood, setMood, points, setPoints, tasks, setTasks, 
      notifications, setNotifications,
      learningSettings, targetReward, setTargetReward, 
      completedTaskIds, completeTask, addHistory
   } = useContext(AppContext);
   const [modalType, setModalType] = useState(null); // 'store' | 'awards' | null
   
   const moodOptions = [
      { e: '😊', label: 'Happy', msg: 'Awesome! Let’s learn something exciting! 🌟', sub: 'Focused & Ready' },
      { e: '😌', label: 'Calm', msg: 'A peaceful learning time sounds perfect 🌈', sub: 'Relaxed Mind' },
      { e: '😟', label: 'Anxious', msg: 'It’s okay, we’ll go slow and comfortable 💙', sub: 'Take a Breath' },
      { e: '😴', label: 'Tired', msg: 'Let’s do something light and easy today 💤', sub: 'Low Energy' }
   ];

   const getHeaderMsg = () => {
      const active = moodOptions.find(m => m.label === mood);
      return active ? active.msg : 'Ready for a fun adventure? 🚀';
   };

   const getMoodTasks = () => {
      const profile = user?.childData || {};
      const interests = profile.interests?.toLowerCase() || '';

      const base = [
         { id: '1', name: 'Solar System Adventure 🚀', from: 'AI', link: '/story', duration: '5 mins', mode: '🌌 Exploration', tag: 'CONTINUE ▶️' },
         { id: '2', name: 'Ocean Focus Challenge 🌊', from: 'AI', link: '/game', duration: '5 mins', mode: '🧠 Focus', tag: 'RECOMMENDED ⭐' },
         { id: '3', name: 'Animal Discoveries 🐘', from: 'AI', link: '/learning', duration: '5 mins', mode: '📘 Learning', tag: 'NEW 🆕' }
      ];

      let moodRecs = [];
      if (mood === 'Happy' || mood === 'Excited') moodRecs = [
         { id: 'q1', name: 'Math Rocket Adventure 🚀', from: 'AI', link: '/game', duration: '10 mins', mode: '🎮 Challenging', tag: 'STREAK BONUS! 🔥' },
         { id: 'q2', name: 'Draw your Dreams 🎨', from: 'AI', link: '/drawing', duration: '15 mins', mode: '🎨 Creative', tag: 'PEAK MOOD ✨' }
      ];
      else if (mood === 'Tired' || mood === 'Calm') moodRecs = [
         { id: 'q3', name: 'Soothing Stardust Tales 🌌', from: 'AI', link: '/story', duration: '20 mins', mode: '😌 Relaxing', tag: 'CHILL MODE ☁️' },
         { id: 'q4', name: 'Color Matching Zen 🌈', from: 'AI', link: '/learning', duration: '5 mins', mode: '🧘 Calm', tag: 'LOW ENERGY OK ✅' }
      ];
      else moodRecs = [
         { id: 'q5', name: 'Focus Builder 🧩', from: 'AI', link: '/game', duration: '5 mins', mode: '🧩 Focused', tag: 'BOOSTING FOCUS ⚡' }
      ];

      if (learningSettings.mode === 'Visual') {
         moodRecs.unshift({ id: 'vis1', name: 'Interactive Card Match 🧩', from: 'AI', link: '/game', duration: '5 mins', mode: '👁️ Visual', tag: 'MODE ADAPTED ✨' });
      }

      return moodRecs.slice(0, 4);
   };

   const displayTasks = tasks.length > 0 
      ? tasks.filter(t => t.ownerName === user?.name).map(t => ({...t, duration: '5 mins', mode: 'Coursework', tag: 'ASSIGNED 🎒'})) 
      : getMoodTasks();

   const handleBuy = (item, cost) => {
      if (points >= cost) {
         setPoints(prev => prev - cost);
         alert(`🎁 Yay! You bought ${item}! It's now in your collection.`);
         setModalType(null);
      } else {
         alert(`💎 Not enough XP yet! Keep learning to earn more.`);
      }
   };

   const handleClaimReward = (reward) => {
      setPoints(prev => prev - reward.cost);
      setNotifications(prev => [
         { id: Date.now(), text: `🎉 ${user.name} just claimed their target reward: ${reward.name}!`, unread: true },
         ...prev
      ]);
      addHistory({ type: 'Reward Claimed', topic: `Redeemed ${reward.name}`, points: -reward.cost });
      setTargetReward(null);
      alert(`🎁 CONGRATULATIONS! You've claimed your ${reward.name}! Your parent and teacher have been notified of your hard work! 🌟`);
   };

   return (
    <div className="container" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '120px' }}>
      
      {/* 🏛️ MODALS ARENA */}
      {modalType && (
         <div className="glass anim-pop" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', zIndex: 10000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <div className="enhanced-card" style={{ width: '100%', maxWidth: '600px', border: '8px solid var(--card-border)', position: 'relative' }}>
               <button onClick={() => setModalType(null)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer' }}>❌</button>
               
               {modalType === 'store' ? (
                  <div>
                     <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)', textAlign: 'center' }}>🎁 Rewards Store</h2>
                     <div className="grid mt-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                         <div className="cartoon-card p-4 text-center">
                            <div style={{ fontSize: '3rem' }}>🦊</div>
                            <h3>Super Fox</h3>
                            <button className="btn w-full mt-2" onClick={() => handleBuy('Super Fox', 100)} disabled={points < 100}>Buy (100 XP)</button>
                            <button className="btn btn-secondary w-full mt-2" style={{ fontSize: '0.8rem' }} onClick={() => { setTargetReward({ name: 'Super Fox', icon: '🦊', cost: 100 }); setModalType(null); }}>Set as Goal 🎯</button>
                         </div>
                         <div className="cartoon-card p-4 text-center">
                            <div style={{ fontSize: '3rem' }}>🎨</div>
                            <h3>Neon Canvas</h3>
                            <button className="btn w-full mt-2" onClick={() => handleBuy('Neon Canvas', 50)} disabled={points < 50}>Buy (50 XP)</button>
                            <button className="btn btn-secondary w-full mt-2" style={{ fontSize: '0.8rem' }} onClick={() => { setTargetReward({ name: 'Neon Canvas', icon: '🎨', cost: 50 }); setModalType(null); }}>Set as Goal 🎯</button>
                         </div>
                         <div className="cartoon-card p-4 text-center">
                            <div style={{ fontSize: '3rem' }}>🚀</div>
                            <h3>Rocket Ship</h3>
                            <button className="btn w-full mt-2" onClick={() => handleBuy('Rocket Ship', 200)} disabled={points < 200}>Buy (200 XP)</button>
                            <button className="btn btn-secondary w-full mt-2" style={{ fontSize: '0.8rem' }} onClick={() => { setTargetReward({ name: 'Rocket Ship', icon: '🚀', cost: 200 }); setModalType(null); }}>Set as Goal 🎯</button>
                         </div>
                         <div className="cartoon-card p-4 text-center">
                            <div style={{ fontSize: '3rem' }}>🐲</div>
                            <h3>Dragon Pal</h3>
                            <button className="btn w-full mt-2" onClick={() => handleBuy('Dragon Pal', 500)} disabled={points < 500}>Buy (500 XP)</button>
                            <button className="btn btn-secondary w-full mt-2" style={{ fontSize: '0.8rem' }} onClick={() => { setTargetReward({ name: 'Dragon Pal', icon: '🐲', cost: 500 }); setModalType(null); }}>Set as Goal 🎯</button>
                         </div>
                     </div>
                  </div>
               ) : (
                  <div className="text-center">
                     <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#4169E1' }}>🏆 Achievements</h2>
                     <div className="mt-8 flex flex-col gap-4">
                        <div className="glass p-4" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                           <span style={{ fontSize: '2rem' }}>⭐</span>
                           <div className="text-left"><strong>First Quest</strong> - Completed 1 lesson!</div>
                        </div>
                        <div className="glass p-4" style={{ display: 'flex', alignItems: 'center', gap: '20px', opacity: 0.5 }}>
                           <span style={{ fontSize: '2rem' }}>🔥</span>
                           <div className="text-left"><strong>Explorer</strong> - Reach 5 day streak!</div>
                        </div>
                        <div className="glass p-4" style={{ display: 'flex', alignItems: 'center', gap: '20px', opacity: 0.5 }}>
                           <span style={{ fontSize: '2rem' }}>💎</span>
                           <div className="text-left"><strong>Grandmaster</strong> - Earn 1000 XP!</div>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      )}

      {/* Decorative Cartoon Background Elements */}
      <div style={{ position: 'absolute', top: '10%', left: '-5%', fontSize: '8rem', opacity: 0.05, animation: 'float 6s ease-in-out infinite', zIndex: 0 }}>🛸</div>
      <div style={{ position: 'absolute', top: '40%', right: '-5%', fontSize: '10rem', opacity: 0.05, animation: 'logoLoopAnim 8s ease-in-out infinite', zIndex: 0 }}>🚀</div>
      
      <div className="flex justify-between items-center mb-6" style={{ position: 'relative', zIndex: 2 }}>
        <div className="flex items-center gap-4">
           {/* Cartoon Avatar Box */}
           <div className="avatar-box float-anim" style={{ width: '100px', height: '100px', fontSize: '3rem' }}>
              <span>{user?.avatar || '🦊'}</span>
           </div>
           <div>
             <h1 style={{ fontSize: '2.8rem', margin: 0, color: 'var(--text)', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
               Hi {user?.name || 'Alex'}!
             </h1>
             <p className="anim-pop" style={{ fontSize: '1.3rem', opacity: 0.9, margin: 0, color: 'var(--primary)', fontWeight: '800' }}>
               {getHeaderMsg()}
             </p>
             <p style={{ margin: 0, opacity: 0.6, fontWeight: 'bold' }}>🌟 Let’s learn, play & earn rewards!</p>
           </div>
        </div>

        <div className="flex flex-col gap-2">
           <div className="cartoon-card" style={{ padding: '15px 25px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', borderColor: '#FFD700', minWidth: '220px' }}>
              <div style={{ display: 'flex', gap: '20px', width: '100%', justifyContent: 'center' }}>
                 <div style={{ textAlign: 'center' }}>
                   <span style={{ fontSize: '1.2rem' }}>⭐ XP</span>
                   <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#B8860B' }}>{points} / 100</div>
                 </div>
                 <div style={{ borderLeft: '2px solid #eee', paddingLeft: '20px', textAlign: 'center' }}>
                   <span style={{ fontSize: '1.2rem' }}>🔥 Streak</span>
                   <div style={{ fontSize: '1.5rem', fontWeight: '900', color: '#FF4500' }}>3 Days</div>
                 </div>
              </div>
              <div style={{ width: '100%', height: '14px', background: '#f0f0f0', borderRadius: '10px', margin: '12px 0', border: '3px solid #333', overflow: 'hidden' }}>
                 <div style={{ width: `${Math.min(points, 100)}%`, height: '100%', background: 'linear-gradient(90deg, #FFD700, #FFA500)', transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}></div>
              </div>
              <small style={{ fontWeight: '900', color: '#9c78ff', textTransform: 'uppercase' }}>🎁 Next Reward at 100 XP</small>
           </div>
           <div className="flex gap-2">
             <button className="btn w-full wobble-hover" onClick={() => setModalType('store')} style={{ padding: '10px', fontSize: '0.9rem', background: '#FF69B4', border: '3px solid #333', boxShadow: '4px 4px 0 #333' }}>🎁 Store</button>
             <button className="btn w-full wobble-hover" onClick={() => setModalType('awards')} style={{ padding: '10px', fontSize: '0.9rem', background: '#4169E1', border: '3px solid #333', boxShadow: '4px 4px 0 #333' }}>🏆 Awards</button>
           </div>
        </div>
      </div>

      {/* 🧠 Smart Personalization Line */}
      <div className="anim-pop" style={{ background: 'rgba(156, 120, 255, 0.1)', padding: '10px 20px', borderRadius: '50px', display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '30px', border: '2px dashed var(--primary)' }}>
         <span style={{ fontSize: '1.2rem' }}>🧠</span>
         <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>Based on your mood & progress, we picked today’s path!</span>
      </div>

      {/* 2. Interactive Mood Selector */}
      <h3 className="mb-4" style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text)' }}>How are you feeling today?</h3>
      <div className="flex gap-4 mb-8">
         {moodOptions.map(m => (
            <button key={m.label} onClick={() => setMood(m.label)} className={`btn ${mood === m.label ? 'border-glow' : ''}`} 
               style={{ 
                  background: mood === m.label ? 'var(--primary)' : 'var(--card-bg)', 
                  color: mood === m.label ? 'white' : 'var(--text)', 
                  padding: '20px', borderRadius: '30px', flex: 1, 
                  display: 'flex', flexDirection: 'column', 
                  border: mood === m.label ? '4px solid #333' : '2px solid var(--border)',
                  transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
                  transform: mood === m.label ? 'scale(1.05) translateY(-5px)' : 'scale(1)' 
               }}>
               <span style={{ fontSize: '3rem' }}>{m.e}</span>
               <span style={{ fontSize: '1.1rem', marginTop: '5px', fontWeight: '900' }}>{m.label}</span>
               <small style={{ opacity: 0.7, fontSize: '0.7rem', fontWeight: 'bold' }}>{m.sub}</small>
            </button>
         ))}
      </div>

      {/* 🎯 Daily Goal Widget */}
      <div className="glass mb-8" style={{ padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '30px', border: '3px solid white' }}>
         <div className="flex items-center gap-4">
            <div style={{ fontSize: '2.5rem' }}>🎯</div>
            <div>
               <h4 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '900' }}>Daily Goal</h4>
               <p style={{ margin: 0, opacity: 0.8, fontWeight: 'bold' }}>Complete 2 lessons today to earn bonus XP!</p>
            </div>
         </div>
         <div style={{ fontWeight: '900', color: 'var(--primary)', fontSize: '1.5rem' }}>{completedTaskIds.length} / 2</div>
      </div>

      {/* 🏆 Target Reward Tracker */}
      {targetReward && (
         <div className="enhanced-card mb-8 border-glow" style={{ padding: '15px 30px', border: '3px solid var(--accent-2)' }}>
            <div className="flex justify-between items-center">
               <div className="flex items-center gap-3">
                  <span style={{ fontSize: '2.5rem' }}>{targetReward.icon}</span>
                  <div>
                     <h4 style={{ margin: 0 }}>Target Goal: {targetReward.name}</h4>
                     <small style={{ fontWeight: 'bold', opacity: 0.8 }}>Progress: {Math.round((points / targetReward.cost) * 100)}%</small>
                  </div>
               </div>
               
               {points >= targetReward.cost ? (
                  <button onClick={() => handleClaimReward(targetReward)} className="btn anim-pop" style={{ background: 'var(--accent-2)', color: '#333', fontWeight: '900', padding: '10px 25px' }}>
                     CLAIM REWARD 🎁
                  </button>
               ) : (
                  <div style={{ width: '200px', height: '10px', background: '#eee', borderRadius: '10px', overflow: 'hidden' }}>
                     <div style={{ width: `${Math.min((points / targetReward.cost) * 100, 100)}%`, height: '100%', background: 'var(--accent-2)' }}></div>
                  </div>
               )}
            </div>
         </div>
      )}

      {/* 3. Recommended Section */}
      <div className="cartoon-card mb-10" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white', padding: '30px', border: '5px solid #333', boxShadow: '14px 14px 0 rgba(0,0,0,0.2)' }}>
         <div className="flex justify-between items-center mb-6">
            <h2 style={{ fontSize: '2.5rem', margin: 0, fontWeight: '950', letterSpacing: '-1.5px' }}>🚀 THE DAILY QUESTS</h2>
            <div className="flex gap-2">
               <span className="glass px-4 py-1 rounded-full text-sm font-black">AI ON ✨</span>
               <span className="glass px-4 py-1 rounded-full text-sm font-black bg-white/20">{displayTasks.length} Missions</span>
            </div>
         </div>

         <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            {displayTasks.map(task => (
               <div key={task.id} className="glass hover:scale-105 group" style={{ padding: '25px', borderRadius: '30px', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', border: '3px solid rgba(255,255,255,0.4)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-10px', right: '10px', background: 'var(--accent-2)', color: '#333', padding: '6px 16px', borderRadius: '20px', fontWeight: '950', fontSize: '0.75rem', border: '3px solid #333' }}>
                     {task.tag}
                  </div>
                  <h3 style={{ fontSize: '1.8rem', margin: '0 0 10px 0', fontWeight: '950', opacity: completedTaskIds.includes(task.id) ? 0.6 : 1 }}>{task.name} {completedTaskIds.includes(task.id) && '⭐'}</h3>
                  <div className="flex flex-col gap-1 mb-8">
                     <div className="flex gap-4 font-black">
                        <span className="glass-pill" style={{ padding: '4px 12px' }}>⏱ {task.duration}</span>
                        <span className="glass-pill" style={{ padding: '4px 12px' }}>{task.mode}</span>
                     </div>
                  </div>
                  {!completedTaskIds.includes(task.id) ? (
                     <Link to={task.link} state={{ taskId: task.id }} className="btn w-full hover:scale-105" style={{ background: 'white', color: 'var(--primary)', borderRadius: '20px', fontWeight: '950', padding: '15px', border: '4px solid #333', boxShadow: '6px 6px 0 #333' }}>
                        PLAY NOW!! 🚀
                     </Link>
                  ) : (
                     <div className="text-center p-4" style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '20px', fontWeight: '950', border: '3px solid #333' }}>
                        MISSION MASTERED! 🏆
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>

      {/* 4. Action Cards with Descriptions */}
      <div className="grid mb-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px' }}>
        <Link to="/learning" className="cartoon-card wobble-hover" style={{ padding: '25px', textAlign: 'center', background: '#EAF6FF', textDecoration: 'none', border: '5px solid #2C5282' }}>
           <div style={{ fontSize: '3.5rem', marginBottom: '10px', color: '#2C5282', fontWeight: '900' }} className="float-anim">📘 Learn</div>
           <h3 style={{ color: '#2C5282', fontSize: '1.6rem', margin: '0 0 5px 0', fontWeight: '950' }}>“Animal Adventure”</h3>
           <p style={{ color: '#2C5282', fontWeight: 'bold', margin: 0, opacity: 1 }}>Explore wild animals 🐅</p>
        </Link>
        <Link to="/game" className="cartoon-card wobble-hover" style={{ padding: '25px', textAlign: 'center', background: '#C6F6D5', textDecoration: 'none', animationDelay: '0.2s', border: '5px solid #22543D' }}>
           <div style={{ fontSize: '3.5rem', marginBottom: '10px', color: '#22543D', fontWeight: '900' }} className="float-anim">🎮 Play</div>
           <h3 style={{ color: '#22543D', fontSize: '1.6rem', margin: '0 0 5px 0', fontWeight: '950' }}>“Memory Flash”</h3>
           <p style={{ color: '#22543D', fontWeight: 'bold', margin: 0, opacity: 1 }}>Train your brain 🧠</p>
        </Link>
        <Link to="/story" className="cartoon-card wobble-hover" style={{ padding: '25px', textAlign: 'center', background: '#FED7E2', textDecoration: 'none', animationDelay: '0.4s', border: '5px solid #702459' }}>
           <div style={{ fontSize: '3.5rem', marginBottom: '10px', color: '#702459', fontWeight: '900' }} className="float-anim">📖 Stories</div>
           <h3 style={{ color: '#702459', fontSize: '1.6rem', margin: '0 0 5px 0', fontWeight: '950' }}>“Space Voyage”</h3>
           <p style={{ color: '#702459', fontWeight: 'bold', margin: 0, opacity: 1 }}>Animated tales 🚀</p>
        </Link>
        <Link to="/drawing" className="cartoon-card wobble-hover" style={{ padding: '25px', textAlign: 'center', background: '#FEFCBF', textDecoration: 'none', animationDelay: '0.6s', border: '5px solid #744210' }}>
           <div style={{ fontSize: '3.5rem', marginBottom: '10px', color: '#744210', fontWeight: '900' }} className="float-anim">🎨 Draw</div>
           <h3 style={{ color: '#744210', fontSize: '1.6rem', margin: '0 0 5px 0', fontWeight: '950' }}>“Magic Canvas”</h3>
            <p style={{ color: '#744210', fontWeight: 'bold', margin: 0, opacity: 1 }}>Creative sketching ✏️</p>
         </Link>
      </div>

      {/* 5. Final Progress Summary (Restored Feature) */}
      <div className="grid mt-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
         <div className="cartoon-card" style={{ padding: '30px', background: '#ffffff', border: '5px solid var(--primary)', color: '#333' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', fontWeight: '950' }}>📊 TODAY'S PROGRESS</h3>
            <div className="flex gap-4 mb-6">
                <div style={{ background: '#EAF6FF', padding: '15px', borderRadius: '20px', flex: 1, textAlign: 'center', border: '2px solid #ccc' }}>
                    <div style={{ fontSize: '2rem' }}>📘</div>
                    <strong style={{ fontSize: '1.4rem' }}>2</strong>
                    <small style={{ display: 'block', opacity: 0.8, fontWeight: 'bold' }}>Lessons</small>
                </div>
                <div style={{ background: '#C6F6D5', padding: '15px', borderRadius: '20px', flex: 1, textAlign: 'center', border: '2px solid #ccc' }}>
                    <div style={{ fontSize: '2rem' }}>🎮</div>
                    <strong style={{ fontSize: '1.4rem' }}>1</strong>
                    <small style={{ display: 'block', opacity: 0.8, fontWeight: 'bold' }}>Games</small>
                </div>
                <div style={{ background: '#FEFCBF', padding: '15px', borderRadius: '20px', flex: 1, textAlign: 'center', border: '2px solid #ccc' }}>
                    <div style={{ fontSize: '2rem' }}>⭐</div>
                    <strong style={{ fontSize: '1.4rem', color: '#B8860B' }}>+20</strong>
                    <small style={{ display: 'block', opacity: 0.8, fontWeight: 'bold' }}>XP Earned</small>
                </div>
            </div>
            <p style={{ margin: 0, fontWeight: '900', color: 'var(--primary)', textAlign: 'center', fontSize: '1.1rem' }}>🎉 You're building great consistency! Keep going!</p>
         </div>

         <div className="cartoon-card" style={{ padding: '30px', background: '#ffffff', border: '5px solid #FF69B4', color: '#333' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#FF69B4', fontWeight: '950' }}>🥰 MOOD JOURNEY</h3>
            <div className="flex items-center justify-between mb-6 px-4">
                <span style={{ fontSize: '2.5rem', opacity: 0.3 }}>😴</span>
                <span style={{ fontSize: '1.5rem', opacity: 1, color: '#FF69B4' }}>➜</span>
                <span style={{ fontSize: '2.5rem', opacity: 0.5 }}>😌</span>
                <span style={{ fontSize: '1.5rem', opacity: 1, color: '#FF69B4' }}>➜</span>
                <span style={{ fontSize: '3.5rem' }}>😊</span>
            </div>
            <div style={{ background: '#FFF5F7', padding: '15px', borderRadius: '20px', textAlign: 'center', border: '2px dashed #FF69B4' }}>
                <p style={{ margin: 0, fontWeight: '900', color: '#FF69B4', fontSize: '1.1rem' }}>📝 You are more positive today than yesterday!</p>
            </div>
         </div>

         <div className="cartoon-card" style={{ padding: '30px', background: '#ffffff', border: '5px solid var(--accent-2)', color: '#333' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--accent-2)', fontWeight: '950' }}>⭐ REWARDS STORE</h3>
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                    <span style={{ opacity: 0.7 }}>🎭 Avatar Styles</span>
                    <span style={{ color: 'var(--accent-2)' }}>100 XP</span>
                </div>
                <div className="flex justify-between items-center" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                    <span style={{ opacity: 0.7 }}>🌈 Color Themes</span>
                    <span style={{ color: 'var(--accent-2)' }}>50 XP</span>
                </div>
                <div className="flex justify-between items-center" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                    <span style={{ opacity: 0.7 }}>🎮 Bonus Levels</span>
                    <span style={{ color: 'var(--accent-2)' }}>150 XP</span>
                </div>
                <div style={{ borderTop: '3px dashed var(--accent-2)', margin: '10px 0' }}></div>
                <p style={{ margin: 0, fontWeight: '950', color: 'var(--accent-2)', textAlign: 'center', fontSize: '1.1rem' }}>Almost unlocked! Keep earning XP ✨</p>
            </div>
         </div>
      </div>

    </div>
   );
};

const ParentDashboard = () => {
   const { user, points, history, notifications, setNotifications, learningSettings } = useContext(AppContext);

   const barChartData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [{ label: 'Cognitive Engagement', data: [65, 59, 80, 81, 74], backgroundColor: 'rgba(156, 120, 255, 0.6)', borderRadius: 10 }]
   };

   return (
      <div className="container" style={{ maxWidth: '1200px', background: 'var(--bg)', minHeight: '100vh', borderRadius: 'var(--radius)', padding: '20px', paddingBottom: '120px' }}>
         <h1 className="mb-4" style={{ fontSize: '2.5rem', color: 'var(--text)' }}>👨‍👩‍👧 Parent Command Center</h1>

         {/* AI Roadmap Overview */}
         <div className="grid mb-10" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
            <div className="enhanced-card" style={{ background: 'linear-gradient(135deg, #FF9A8B66, #FF6A8866)', border: '2px dashed #FF6A88' }}>
               <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>🌈 Learning Roadmap</h3>
               <div className="flex-col gap-3">
                  <div className="glass-pill">Step 1: Basics 🟢</div>
                  <div className="glass-pill" style={{ opacity: 0.6 }}>Step 2: Applied Logic 🔒</div>
                  <div className="glass-pill" style={{ opacity: 0.4 }}>Step 3: Creative Mastery 🔒</div>
               </div>
            </div>
            <div className="enhanced-card" style={{ background: 'linear-gradient(135deg, #84fab066, #8fd3f466)', border: '2px dashed #48bb78' }}>
               <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>📈 Skill Radar</h3>
               <div className="flex-col gap-2">
                  <p style={{ margin: 0, fontSize: '0.85rem' }}>Visual Attention: 85%</p>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.1)', borderRadius: '10px' }}><div style={{ width: '85%', height: '100%', background: '#48bb78', borderRadius: '10px' }}></div></div>
                  <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem' }}>Social Focus: 42%</p>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.1)', borderRadius: '10px' }}><div style={{ width: '42%', height: '100%', background: '#f59e0b', borderRadius: '10px' }}></div></div>
               </div>
            </div>
            <div className="enhanced-card" style={{ background: 'linear-gradient(135deg, #a1c4fd66, #c2e9fb66)', border: '2px dashed #4299e1' }}>
               <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>💡 AI Recommendation</h3>
               <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Try <b>Auditory Mode</b> today. {user?.childData?.name} showed strong patterns in sound-based memory games yesterday.</p>
               <button className="btn w-full mt-2" style={{ padding: '10px', fontSize: '0.85rem' }}>Apply Now</button>
            </div>
         </div>

         <div className="grid-cols-dashboard">
            <div className="flex-col gap-6">
               <div className="enhanced-card" style={{ background: 'var(--surface)' }}>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>👤 {user?.childData?.name}'s Profile</h2>
                  <div className="flex items-center gap-4 mb-6">
                     <div className="avatar-box" style={{ width: '80px', height: '80px', fontSize: '2.5rem' }}>👦</div>
                     <div>
                        <h3 style={{ margin: 0 }}>{user?.childData?.name} ({user?.childData?.age} yrs)</h3>
                        <p style={{ margin: 0, opacity: 0.7 }}>Condition: {user?.childData?.condition}</p>
                     </div>
                  </div>
                  <div className="flex-col gap-4">
                     <div className="glass p-4 rounded-xl">
                        <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: 'var(--primary)' }}>🎯 Focus Goal</h4>
                        <p style={{ margin: 0, fontSize: '0.85rem' }}>{user?.childData?.goals}</p>
                     </div>
                     <div className="glass p-4 rounded-xl">
                        <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#B8860B' }}>✨ Interests</h4>
                        <p style={{ margin: 0, fontSize: '0.85rem' }}>Loves {user?.childData?.interests}</p>
                     </div>
                  </div>
               </div>

               <div className="enhanced-card">
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>📜 Mastery History</h3>
                  <div className="flex-col gap-4">
                     {history.length === 0 ? <p style={{ opacity: 0.6 }}>No activities yet...</p> : history.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center glass p-3 rounded-lg border-l-4" style={{ borderColor: 'var(--primary)' }}>
                           <div>
                              <strong style={{ display: 'block', fontSize: '0.9rem' }}>{item.type}: {item.topic}</strong>
                              <small style={{ opacity: 0.6 }}>{item.date}</small>
                           </div>
                           <span style={{ color: 'var(--accent-2)', fontWeight: 'bold' }}>+{item.points} XP</span>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            <div className="flex-col gap-6">
               <div className="enhanced-card" style={{ background: 'var(--surface)', minHeight: '300px' }}>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>🔔 Recent Notifications</h2>
                  <div className="flex-col gap-3">
                     {notifications.map(notif => (
                        <div key={notif.id} className={`glass p-4 rounded-xl border-l-4 ${notif.unread ? 'border-primary' : 'border-gray-200'}`} style={{ background: notif.unread ? 'var(--secondary)' : '' }}>
                           <p style={{ margin: 0, fontSize: '0.95rem' }}>{notif.text}</p>
                        </div>
                     ))}
                     <button className="btn-secondary w-full mt-4" onClick={() => setNotifications([])}>Clear All</button>
                  </div>
               </div>
               <div className="enhanced-card">
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>📈 Engagement Trend</h3>
                  <div style={{ height: '200px' }}>
                     <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

const TeacherDashboard = () => {
   const { tasks, setTasks, notifications, setNotifications, registeredStudents, setRegisteredStudents } = useContext(AppContext);
   const [btnLoading, setBtnLoading] = useState(false);
   const [selectedStudent, setSelectedStudent] = useState(registeredStudents[0]);

   const filteredStudents = registeredStudents;

   const handleAssignTask = async (taskName, studentName) => {
      setBtnLoading(true);
      setTimeout(() => {
         setTasks(prev => [...prev, { id: Date.now(), name: taskName, from: 'Teacher', tag: 'URGENT ⚡', mode: 'Teacher Assigned', ownerName: studentName, duration: '10m', link: '/learning' }]);
         setNotifications(prev => [{ id: Date.now(), text: `🔔 Teacher assigned task to ${studentName}: ${taskName}`, unread: true }, ...prev]);
         setBtnLoading(false);
         alert(`🚀 Success! "${taskName}" sent to ${studentName}.`);
      }, 600);
   };

   const handleAlertParent = async (sName) => {
      setNotifications(prev => [{ id: Date.now(), text: `📲 Real-time Alert Sent to ${sName}'s Parent!`, unread: true }, ...prev]);
      alert(`📲 ALERT SENT: Parent of ${sName} has been notified.`);
   };

   const handleApplySuggestion = () => {
      setNotifications(prev => [{ id: Date.now(), text: `⚡ AI Suggestion applied for ${selectedStudent.name}`, unread: true }, ...prev]);
      alert(`✅ Insight applied for ${selectedStudent.name}!`);
   };

   const handleSendMsg = (msg) => {
      setNotifications(prev => [{ id: Date.now(), text: `📨 Message sent to parent.`, unread: true }, ...prev]);
      alert(`📨 Message sent!`);
   };

   const handleInviteParent = () => {
      const code = `NEURO-${Math.random().toString(36).substring(7).toUpperCase()}`;
      setRegisteredStudents(prev => prev.map(s => s.id === selectedStudent.id ? { ...s, inviteCode: code } : s));
      alert(`📩 INVITE GENERATED!\n\nCode: ${code}`);
   };

   const chartData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [{ label: `${selectedStudent.name}'s Attendance`, data: [75, 78, 80, 83, 82], borderColor: '#9c78ff', tension: 0.4 }]
   };

   return (
      <div className="container" style={{ maxWidth: '1200px', background: 'var(--bg)', minHeight: '100vh', borderRadius: 'var(--radius)', padding: '20px', paddingBottom: '100px' }}>
         <h1 className="mb-4" style={{ fontSize: '2.5rem', color: 'var(--text)' }}>🧑‍🏫 Teacher Command Center</h1>

         {/* Classroom Dashboard Widgets */}
         <div className="grid mb-10" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {[
               { l: 'Daily Active', v: '92%', i: '🔥', c: '#f6ad55' },
               { l: 'Mastery Score', v: '78', i: '⭐', c: '#48bb78' },
               { l: 'Avg Attention', v: '18m', i: '⏳', c: '#4299e1' },
               { l: 'Mood Index', v: 'Happy', i: '😊', c: '#ed64a1' }
            ].map((stat, i) => (
               <div key={i} className="enhanced-card text-center" style={{ padding: '20px', borderBottom: `5px solid ${stat.c}` }}>
                  <span style={{ fontSize: '2rem' }}>{stat.i}</span>
                  <p style={{ margin: '5px 0', opacity: 0.6, fontSize: '0.8rem' }}>{stat.l}</p>
                  <strong style={{ fontSize: '1.8rem', color: stat.c }}>{stat.v}</strong>
               </div>
            ))}
         </div>

         <div className="grid-cols-dashboard">
            {/* Sidebar */}
            <div className="flex-col gap-4">
               <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>👥 Students</h2>
               {registeredStudents.map(student => (
                  <div key={student.id} onClick={() => setSelectedStudent(student)} className={`enhanced-card hover:scale-105 cursor-pointer ${selectedStudent.id === student.id ? 'border-glow' : ''}`} style={{ padding: '15px', background: selectedStudent.id === student.id ? 'var(--primary)' : 'var(--card-bg)', color: selectedStudent.id === student.id ? 'white' : 'var(--text)' }}>
                     <div className="flex items-center gap-3">
                        <span style={{ fontSize: '1.8rem' }}>👦</span>
                        <div style={{ overflow: 'hidden' }}>
                           <strong style={ {fontSize: '1rem', display: 'block'} }>{student.name}</strong>
                           <p style={{ margin: 0, fontSize: '0.7rem', opacity: 0.7 }}>{student.condition}</p>
                        </div>
                     </div>
                  </div>
               ))}
               <button onClick={handleInviteParent} className="btn-secondary w-full" style={{ borderStyle: 'dashed' }}>+ Invite Parent</button>
            </div>

            {/* Main Content */}
            <div className="flex-col gap-6">
               <div className="enhanced-card" style={{ background: 'var(--surface)', padding: '30px' }}>
                  <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>📊 {selectedStudent.name}'s Insight Hub</h2>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                     <div className="glass p-4 rounded-xl border-l-4 border-primary">
                        <h4 style={{ margin: 0, fontSize: '0.8rem', color: 'var(--primary)' }}>GOAL</h4>
                        <p style={{ margin: 0 }}>{selectedStudent.goals}</p>
                     </div>
                     <div className="glass p-4 rounded-xl border-l-4 border-accent-2">
                        <h4 style={{ margin: 0, fontSize: '0.8rem', color: '#B8860B' }}>INTEREST</h4>
                        <p style={{ margin: 0 }}>Loves {selectedStudent.interests}</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <button className="btn flex-1" onClick={() => handleAssignTask(`${selectedStudent.interests} Theme`, selectedStudent.name)}>Assign Theme</button>
                     <button className="btn btn-secondary flex-1" onClick={() => handleAlertParent(selectedStudent.name)}>Alert Parent</button>
                  </div>
               </div>

               <div className="enhanced-card">
                  <div className="flex gap-4 items-center mb-4">
                     <span style={{ fontSize: '2rem' }}>🧠</span>
                     <h3 style={{ margin: 0 }}>Neuro-Analytics AI</h3>
                  </div>
                  <div style={{ background: 'var(--secondary)', padding: '20px', borderRadius: '15px', border: '1px dashed var(--primary)' }}>
                     {selectedStudent.name} is showing 20% higher engagement in visual modules.
                  </div>
                  <button className="btn w-full mt-4" style={{ background: 'var(--success)' }} onClick={handleApplySuggestion}>⚡ Apply Mastery Path</button>
               </div>

               <div className="enhanced-card">
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '15px' }}>📩 Parent Comm</h3>
                  <textarea id="msgArea" className="input-field mb-4" placeholder="Type message to parent..."></textarea>
                  <button className="btn w-full" onClick={() => handleSendMsg('info')}>Send Update 🚀</button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default function App() {
   const navigate = useNavigate();
   const [theme, setTheme] = useState('light');
   const [user, setUser] = useState(null);
   const [mood, setMood] = useState('Happy');
   const [points, setPoints] = useState(0);

   // New Global State for Data Flow
   const [tasks, setTasks] = useState([]);
   const [notifications, setNotifications] = useState([{ id: 1, text: 'Welcome to NeuroNest!', unread: true }]);
   const [learningSettings, setLearningSettings] = useState({ mode: 'Visual', timer: '15 mins', games: true });
   
   // Global Students List (Synced with Parent Signup)
   const [registeredStudents, setRegisteredStudents] = useState([
      { id: 'child_1', name: 'Alex', age: 7, condition: 'ADHD', interests: 'Space', strengths: 'listening', weaknesses: 'speaking positively', goals: 'Improve focus', points: 0, inviteCode: 'NEURO-123' }
   ]);

   const [completedTaskIds, setCompletedTaskIds] = useState([]);
   const [targetReward, setTargetReward] = useState(null);
   const [showChat, setShowChat] = useState(false);
   const [chatMessages, setChatMessages] = useState([
      { id: 1, text: "Hi! I'm your NeuroNest assistant. How can I help you learn today?", sender: 'ai' }
   ]);

   // PERSISTENCE 💾
   useEffect(() => {
      const saved = localStorage.getItem('neuronest_state');
      if (saved) {
         const data = JSON.parse(saved);
         if (data.points) setPoints(data.points);
         if (data.tasks) setTasks(data.tasks);
         if (data.registeredStudents) setRegisteredStudents(data.registeredStudents);
         if (data.completedTaskIds) setCompletedTaskIds(data.completedTaskIds);
      }
   }, []);

   useEffect(() => {
      const state = { points, tasks, registeredStudents, completedTaskIds };
      localStorage.setItem('neuronest_state', JSON.stringify(state));
   }, [points, tasks, registeredStudents, completedTaskIds]);

   // Persistent History for Parent Tracking
   const [history, setHistory] = useState([
      { type: 'Login', topic: 'Started Session', points: 0, date: new Date().toLocaleTimeString() }
   ]);

   const addHistory = (item) => setHistory(prev => [{ ...item, date: new Date().toLocaleTimeString() }, ...prev]);

   const completeTask = (taskId, pts = 20) => {
      if (completedTaskIds.includes(taskId)) return;
      setCompletedTaskIds(prev => [...prev, taskId]);
      setPoints(prev => prev + pts);
      addHistory({ type: 'Task Completed', topic: `Mission Unlocked!`, points: pts });
      alert(`🎉 MISSION COMPLETE! You earned ${pts} XP!`);
   };

   useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);
   const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
   const addPoints = (p) => setPoints(prev => prev + p);

   const handleLogout = () => {
      setUser(null);
      navigate('/');
   };

   const markNotificationsRead = () => {
      setNotifications(notifications.map(n => ({ ...n, unread: false })));
   };

   const handleLogin = (u) => {
      setUser(u);
      // Handle Invite Linkage for Parents
      if (u.role === 'parent' && u.inviteCode) {
         const student = registeredStudents.find(s => s.inviteCode === u.inviteCode);
         if (student) {
            alert(`🔗 Welcome! You are now linked to ${student.name}'s progress.`);
            const updatedUser = { ...u, childData: student };
            setUser(updatedUser);
         }
      }
      if (u.role === 'parent' && u.childData) {
         setRegisteredStudents(prev => {
            if (prev.find(s => s.name === u.childData.name)) return prev;
            return [...prev, { ...u.childData, id: `child_${Date.now()}`, points: 0, inviteCode: `NEURO-${Math.floor(Math.random()*900)+100}` }];
         });
      }
   };

   return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
         <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>
            <AppContext.Provider value={{ 
               mood, setMood, points, setPoints, addPoints, tasks, setTasks, 
               notifications, setNotifications, learningSettings, setLearningSettings, 
               history, addHistory, registeredStudents, setRegisteredStudents,
               completedTaskIds, completeTask, targetReward, setTargetReward
            }}>
               <>
                  <MagicLayer />
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


                        {/* Floating AI Chatbot Button (Restored Feature) */}
                        {user && user.role === 'child' && (
                           <>
                              <button 
                                 className="floating-voice border-glow" 
                                 onClick={() => setShowChat(true)}
                                 style={{ 
                                    background: 'linear-gradient(135deg, #9c78ff, #ec4899)', 
                                    color: 'white', 
                                    border: '4px solid white', 
                                    borderRadius: '50px', 
                                    padding: '12px 25px', 
                                    fontWeight: '900', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '10px',
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                                    fontSize: '1.1rem'
                                 }}
                              >
                                 <span style={{ fontSize: '1.8rem' }}>🎙️</span> Talk to NeuroNest Assistant
                              </button>
                              
                              {showChat && (
                                 <div style={{ position: 'fixed', bottom: '100px', right: '40px', width: '380px', zIndex: 10001 }}>
                                    <div style={{ position: 'relative' }}>
                                       <button 
                                          onClick={() => setShowChat(false)}
                                          style={{ position: 'absolute', top: '-15px', right: '-15px', background: 'white', border: '3px solid #333', borderRadius: '50%', width: '35px', height: '35px', zIndex: 2, cursor: 'pointer' }}
                                       >❌</button>
                                       <ChatBox 
                                          title="Neuro Assistant" 
                                          messages={chatMessages} 
                                          onSendMessage={(txt) => {
                                             const userMsg = { id: Date.now(), text: txt, sender: 'child' };
                                             setChatMessages(prev => [...prev, userMsg]);
                                             setTimeout(() => {
                                                const botMsg = { id: Date.now()+1, text: `I heard you! "${txt}" sounds interesting. Let's explore together!`, sender: 'ai' };
                                                setChatMessages(prev => [...prev, botMsg]);
                                             }, 1000);
                                          }} 
                                       />
                                    </div>
                                 </div>
                              )}
                           </>
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
                        <Route path="/story" element={<StoryPage addPoints={addPoints} completeTask={completeTask} />} />
                        <Route path="/game" element={<GamePage addPoints={addPoints} completeTask={completeTask} />} />
                        <Route path="/drawing" element={<DrawingPage addPoints={addPoints} completeTask={completeTask} />} />
                        <Route path="/mood" element={<MoodPage setMood={setMood} />} />
                        <Route path="/learning" element={<LearningPage mood={mood} addPoints={addPoints} addHistory={addHistory} completeTask={completeTask} />} />
                     </Routes>
                  </main>
                  <DockMenu />
               </>
            </AppContext.Provider>
         </AuthContext.Provider>
      </ThemeContext.Provider>
   );
}
