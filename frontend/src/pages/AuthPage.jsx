import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function AuthPage({ loginFn }) {
  const navigate = useNavigate();
  const { roleType } = useParams(); // 'parent' or 'teacher'
  const isTeacher = roleType === 'teacher';

  const [mode, setMode] = useState('login');
  const [step, setStep] = useState(1);
  const [msg, setMsg] = useState('');

  // Parent/Teacher Auth Data
  const [authData, setAuthData] = useState({ name: '', email: '', password: '', phone: '', inviteCode: '' });

  // Teacher specific Data
  const [teacherData, setTeacherData] = useState({ org: '', specialization: 'ADHD', experience: 'Beginner' });

  // Child Data (for Parent Signup)
  const [childData, setChildData] = useState({
    name: '', age: '', condition: 'ADHD', severity: 'Moderate',
    learningStyle: 'Visual', attentionSpan: 'Medium', pace: 'Medium',
    interests: '', strengths: '', weaknesses: '', goals: ''
  });

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/auth/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: authData.email, password: authData.password })
          });
          if (response.ok) {
            const data = await response.json();
            loginFn({ role: isTeacher ? 'teacher' : 'parent', name: data.email, id: data.id });
            navigate(isTeacher ? '/teacher-dashboard' : '/parent-dashboard');
            return;
          }
        } catch (e) { console.warn("Backend unavailable, using demo login"); }
        
        // Demo Fallback
        loginFn({ role: isTeacher ? 'teacher' : 'parent', name: authData.email, email: authData.email, inviteCode: authData.inviteCode });
        navigate(isTeacher ? '/teacher-dashboard' : '/parent-dashboard');
      } else if (mode === 'signup') {
        const maxSteps = isTeacher ? 2 : 4;
        if (step < maxSteps) { setStep(step + 1); return; }
        
        const payload = {
           email: authData.email, password: authData.password, name: authData.name, role: isTeacher ? 'teacher' : 'parent',
           inviteCode: authData.inviteCode,
           ...(isTeacher ? { teacherData } : { childData })
        };

        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/auth/register`, {
              method: 'POST', headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
          });
          if (response.ok) {
            const data = await response.json();
            loginFn({ role: isTeacher ? 'teacher' : 'parent', name: payload.name || data.email, id: data.id, childData });
            navigate(isTeacher ? '/teacher-dashboard' : '/parent-dashboard');
            return;
          }
        } catch (e) { console.warn("Backend unavailable, using demo signup"); }

        // Demo Fallback
        loginFn({ role: isTeacher ? 'teacher' : 'parent', name: payload.name || authData.email, email: authData.email, childData });
        navigate(isTeacher ? '/teacher-dashboard' : '/parent-dashboard');
      }
    } catch (error) { setMsg(error.message); }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', marginTop: '5vh' }}>
      <div className="enhanced-card">
        <h1 className="text-center mb-4" style={{ color: 'var(--primary)' }}>
          {isTeacher ? '🧑‍🏫 Teacher Portal' : '👨‍👩‍👧 Parent Portal'}
        </h1>
        
        {msg && <div className="p-3 mb-4 rounded" style={{ background: 'var(--error)' }}>{msg}</div>}

        <div className="flex gap-4 mb-4 justify-center">
          <button className={`btn ${mode === 'login' ? '' : 'btn-secondary'}`} onClick={() => { setMode('login'); setStep(1); }}>Sign In</button>
          <button className={`btn ${mode === 'signup' ? '' : 'btn-secondary'}`} onClick={() => { setMode('signup'); setStep(1); }}>Create Account</button>
        </div>

        <form onSubmit={handleAuth}>
          {mode === 'login' && (
            <div className="anim-pop flex-col gap-4" style={{ display: 'flex' }}>
              <input type="email" className="input-field" placeholder="Email Address" required onChange={e => setAuthData({...authData, email: e.target.value})} />
              <input type="password" className="input-field" placeholder="Password" required onChange={e => setAuthData({...authData, password: e.target.value})} />
              <button className="btn w-full hover:scale-105" style={{ width: '100%', justifyContent: 'center' }}>Login securely 🚀</button>
            </div>
          )}

          {mode === 'signup' && (
             <div className="anim-pop">
                {/* Step 1: Basic Creds */}
                {step === 1 && (
                  <div>
                    <h3 className="mb-2">Step 1: Your Details</h3>
                    <input type="text" className="input-field mb-4" placeholder="Full Name" required onChange={e => setAuthData({...authData, name: e.target.value})} />
                    <input type="email" className="input-field mb-4" placeholder="Email Address" required onChange={e => setAuthData({...authData, email: e.target.value})} />
                    <input type="password" className="input-field mb-4" placeholder="Password" required onChange={e => setAuthData({...authData, password: e.target.value})} />
                    
                    {!isTeacher && (
                      <div className="invite-input-container anim-pop" style={{ marginTop: '30px' }}>
                         <p style={{ fontSize: '0.85rem', marginBottom: '10px', color: 'var(--primary)', fontWeight: 'bold' }}>🔗 Linked by Teacher?</p>
                         <input type="text" className="input-field" style={{ fontSize: '0.9rem', padding: '12px 20px', border: '2px dashed var(--primary)' }} placeholder="Enter NEURO Code (Optional)" onChange={e => setAuthData({...authData, inviteCode: e.target.value})} />
                      </div>
                    )}
                  </div>
                )}

                {/* ===== PARENT SPECIFIC WIZARD ===== */}
                {!isTeacher && mode === 'signup' && (
                  <>
                    {step === 2 && (
                      <div>
                        <h3 className="mb-2">Step 2: Child Basic Info</h3>
                        <input type="text" className="input-field mb-4" placeholder="Child's Name" required onChange={e => setChildData({...childData, name: e.target.value})} />
                        <input type="number" className="input-field mb-4" placeholder="Child's Age" required onChange={e => setChildData({...childData, age: e.target.value})} />
                        <select className="input-field mb-4" onChange={e => setChildData({...childData, condition: e.target.value})}>
                          <option>ADHD</option><option>Autism</option><option>Dyslexia</option>
                        </select>
                        <select className="input-field mb-4" onChange={e => setChildData({...childData, severity: e.target.value})}>
                          <option>Basic</option><option>Moderate</option><option>High</option>
                        </select>
                      </div>
                    )}
                    {step === 3 && (
                      <div>
                        <h3 className="mb-2">Step 3: 🧠 Learning Profile</h3>
                        <label className="mb-1 block">Learning Style</label>
                        <select className="input-field mb-4" onChange={e => setChildData({...childData, learningStyle: e.target.value})}>
                          <option>Visual</option><option>Audio</option><option>Interactive</option>
                        </select>
                        <label className="mb-1 block">Attention Span</label>
                        <select className="input-field mb-4" onChange={e => setChildData({...childData, attentionSpan: e.target.value})}>
                          <option>Short</option><option>Medium</option><option>Long</option>
                        </select>
                        <label className="mb-1 block">Preferred Pace</label>
                        <select className="input-field mb-4" onChange={e => setChildData({...childData, pace: e.target.value})}>
                          <option>Slow</option><option>Medium</option><option>Fast</option>
                        </select>
                      </div>
                    )}
                    {step === 4 && (
                      <div>
                        <h3 className="mb-2">Step 4: 🎯 Behavioral & Goals</h3>
                        <input type="text" className="input-field mb-4" placeholder="Interests (e.g. Space, Dinosaurs)" onChange={e => setChildData({...childData, interests: e.target.value})} />
                        <input type="text" className="input-field mb-4" placeholder="Strengths" onChange={e => setChildData({...childData, strengths: e.target.value})} />
                        <input type="text" className="input-field mb-4" placeholder="Areas to improve" onChange={e => setChildData({...childData, weaknesses: e.target.value})} />
                        <select className="input-field mb-4" onChange={e => setChildData({...childData, goals: e.target.value})}>
                          <option>Improve focus</option><option>Improve reading</option><option>Social skills</option><option>Academic learning</option>
                        </select>
                        <label className="flex items-center gap-2 mt-4 text-sm" style={{ padding: '10px 0' }}>
                           <input type="checkbox" required style={{ transform: 'scale(1.5)' }} /> I consent to creating a child-safe educational profile.
                        </label>
                      </div>
                    )}
                  </>
                )}

                {/* ===== TEACHER SPECIFIC WIZARD ===== */}
                {isTeacher && mode === 'signup' && (
                  <>
                    {step === 2 && (
                      <div>
                        <h3 className="mb-2">Step 2: Professional Details</h3>
                        <input type="text" className="input-field mb-4" placeholder="School / Clinic Name (Optional)" onChange={e => setTeacherData({...teacherData, org: e.target.value})} />
                        <label className="mb-1 block">Specialization</label>
                        <select className="input-field mb-4" onChange={e => setTeacherData({...teacherData, specialization: e.target.value})}>
                          <option>ADHD</option><option>Autism</option><option>Dyslexia</option>
                        </select>
                        <label className="mb-1 block">Experience Level</label>
                        <select className="input-field mb-4" onChange={e => setTeacherData({...teacherData, experience: e.target.value})}>
                          <option>Beginner</option><option>Intermediate</option><option>Expert</option>
                        </select>
                      </div>
                    )}
                  </>
                )}

                <button className="btn w-full mt-4" style={{ width: '100%' }}>
                   {step < (isTeacher ? 2 : 4) ? `Next Step (${step}/${isTeacher ? 2 : 4}) ➔` : 'Complete Setup ✅'}
                </button>
             </div>
          )}
        </form>
      </div>
    </div>
  );
}
