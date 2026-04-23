import React, { useState, useEffect } from 'react';
import { generateLearningContent } from '../services/llm';
import AnimatedScene from '../components/AnimatedScene';

const CHAPTERS = [
   { id: 1, title: "Numbers Fun 🔢", color: "#EBF8FF", icon: "🔢" },
   { id: 2, title: "Colors & Shapes 🌈", color: "#F0FFF4", icon: "🌈" },
   { id: 3, title: "Pattern Play 🔁", color: "#E6FFFA", icon: "🔁" },
   { id: 4, title: "Sound & Listening 🎵", color: "#FAF5FF", icon: "🎵" },
   { id: 5, title: "Story Time 🐰", color: "#FFF5F5", icon: "🐰" },
   { id: 6, title: "Memory Boost 🧠", color: "#FDF2F8", icon: "🧠" },
   { id: 7, title: "Focus Game 🎮", color: "#FEFCBF", icon: "🎮" },
   { id: 8, title: "Drawing Fun 🚀", color: "#FFFAF0", icon: "🚀" },
   { id: 9, title: "Real-Life Learning 🏡", color: "#E9D8FD", icon: "🏡" },
   { id: 10, title: "Emotions & Mood 💛", color: "#FED7E2", icon: "💛" }
];

import { useLocation } from 'react-router-dom';

export default function LearningPage({ mood, addPoints, addHistory, completeTask }) {
   const location = useLocation();
   const taskId = location.state?.taskId;
   const [content, setContent] = useState(null);
   const [loading, setLoading] = useState(false);
   const [view, setView] = useState('chapters'); // chapters | learn | activity | quiz
   const [selectedAnswer, setSelectedAnswer] = useState(null);
   const [topic, setTopic] = useState('');

   const startChapter = async (chap) => {
      setLoading(true);
      setTopic(chap.title);
      try {
         const res = await generateLearningContent(chap.title, mood || 'Happy', { condition: 'ADHD', style: 'Visual' });
         setContent(res);
         setView('learn');
      } catch (err) {
         console.error(err);
      }
      setLoading(false);
   };

   const handleQuiz = (opt) => {
      setSelectedAnswer(opt);
      if (opt === content.quiz.answer && addPoints) {
         addPoints(10);
      }
   };

   return (
      <div className="container" style={{ maxWidth: '1000px', paddingBottom: '100px' }}>

         {/* 🏫 TOP NAVIGATION & PROGRESS */}
         <div className="flex justify-between items-center mb-10 p-6 glass rounded-full" style={{ background: 'var(--surface)' }}>
            <div className="flex items-center gap-4">
               <div className="avatar-box" style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}>🎓</div>
               <div>
                  <h4 style={{ margin: 0, fontWeight: '950' }}>Mastery Level 4</h4>
                  <div style={{ width: '150px', height: '8px', background: '#eee', borderRadius: '10px', marginTop: '5px' }}>
                     <div style={{ width: '65%', height: '100%', background: 'var(--primary)', borderRadius: '10px' }}></div>
                  </div>
               </div>
            </div>
            <div className="flex gap-4">
                <span className="glass-pill">🔥 3 Day Streak</span>
                <span className="glass-pill">⭐ 24 Tasks Done</span>
            </div>
         </div>

         {/* 🟡 STEP 1: CHAPTER SELECTION */}
         {view === 'chapters' && !loading && (
            <div className="anim-pop">
               <div className="text-center mb-10">
                  <h1 style={{ fontSize: '3rem', fontWeight: '950', letterSpacing: '-1px', margin: 0 }}>🎬 Pick an Animated Adventure</h1>
                  <p style={{ opacity: 0.6, fontWeight: 'bold' }}>Choose a quest to start your journey!</p>
               </div>
               
               <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px' }}>
                  {CHAPTERS.map(chap => (
                     <div key={chap.id} className="cartoon-card wobble-hover p-0 overflow-hidden group" onClick={() => startChapter(chap)} style={{ background: 'white', cursor: 'pointer', border: '5px solid #333', transition: 'all 0.3s ease-in-out' }}>
                        <div style={{ height: '150px', background: chap.color, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '4.5rem', position: 'relative' }}>
                           <span className="group-hover:scale-125 transition-transform">{chap.icon}</span>
                           <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                           <div className="glass px-3 py-1 rounded-full text-[0.6rem] font-black absolute bottom-2 right-2 uppercase tracking-tighter" style={{ background: 'rgba(255,255,255,0.8)', color: '#333' }}>Available ✨</div>
                        </div>
                        <div className="p-5 text-left border-t-4 border-black">
                           <h3 style={{ fontSize: '1.2rem', fontWeight: '950', margin: '0 0 12px 0', minHeight: '3em', display: 'flex', alignItems: 'center' }}>{chap.title}</h3>
                           <div className="flex items-center justify-between text-[0.7rem] font-black opacity-60 mb-4">
                              <span>🎬 5 MIN VIDEO</span>
                              <span>🎮 1 GAME</span>
                           </div>
                           <button className="btn w-full" style={{ fontSize: '0.8rem', padding: '12px', background: chap.color, color: '#333', border: '3px solid #333', boxShadow: '4px 4px 0 #333' }}>BEGIN QUEST 🚀</button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         )}

         {loading && (
            <div className="text-center mt-20">
               <div className="logo-loop" style={{ fontSize: '6rem' }}>🎬</div>
               <h2 className="mt-4">Generating your AI Adventure...</h2>
            </div>
         )}

         {/* 🟢 STEP 2: LEARN & SEE (CUSTOM VIDEO) */}
         {view === 'learn' && content && (
            <div className="anim-pop">
               <div className="flex justify-between items-center mb-6">
                  <button className="btn btn-secondary" onClick={() => setView('chapters')}>⬅ Back to Map</button>
                  <h2 className="text-3xl font-bold">{topic}</h2>
                  <div style={{ opacity: 0 }}>.</div>
               </div>

               <div className="enhanced-card" style={{ padding: '0', overflow: 'hidden', border: '8px solid var(--primary)', borderRadius: '30px', background: 'white' }}>
                  {/* CUSTOM ANIMATED VIDEO */}
                  <div className="p-4 bg-sky-200">
                     <AnimatedScene type={topic} />
                  </div>

                  {/* LEARN CARD */}
                  <div style={{ padding: '40px' }}>
                     <div className="flex items-center gap-3 mb-6">
                        <span style={{ fontSize: '2.5rem' }}>💡</span>
                        <h3 style={{ fontSize: '1.8rem', margin: 0, fontWeight: 'bold' }}>Quick Learn</h3>
                     </div>
                     <div style={{ background: '#F7FAFC', padding: '30px', borderRadius: '25px', borderLeft: '10px solid var(--primary)' }}>
                        {content.learnLines ? content.learnLines.map((line, idx) => (
                           <p key={idx} style={{ fontSize: '1.5rem', margin: '10px 0', color: '#2D3748', fontWeight: '500' }}>{line}</p>
                        )) : <p style={{ fontSize: '1.5rem' }}>{content.lesson}</p>}
                     </div>

                     <div className="mt-10 flex justify-center">
                        <button className="btn border-glow" style={{ padding: '25px 90px', fontSize: '1.8rem', borderRadius: '60px' }} onClick={() => setView('activity')}>
                           I Watched it! Let's Do it! 🚀
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* 🟢 STEP 3: DO (ACTIVITY) */}
         {view === 'activity' && content && (
            <div className="anim-pop text-center">
               <div className="bounce-card" style={{ padding: '80px 40px', borderRadius: '50px', border: '8px solid var(--primary)' }}>
                  <div style={{ fontSize: '7rem', marginBottom: '30px' }}>🧠</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '20px' }}>
                  Step {view === 'learn' ? '1' : view === 'activity' ? '2' : '3'} of 3: {view === 'learn' ? 'Watch' : view === 'activity' ? 'Interact' : 'Master'}
               </div>
               <div style={{ width: '100%', height: '10px', background: '#EDF2F7', borderRadius: '10px', overflow: 'hidden', marginBottom: '30px', border: '2px solid #333' }}>
                  <div style={{ width: view === 'learn' ? '33%' : view === 'activity' ? '66%' : '100%', height: '100%', background: 'var(--primary)', transition: 'width 0.5s' }}></div>
               </div>
                  <div style={{ background: 'var(--primary)', color: 'white', padding: '50px', borderRadius: '35px', margin: '40px 0', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}>
                     <h3 style={{ fontSize: '2.5rem', lineHeight: '1.4' }}>{content.activity}</h3>
                  </div>

                  <button className="btn mt-10" style={{ padding: '25px 120px', fontSize: '2rem', borderRadius: '60px' }} onClick={() => setView('quiz')}>
                     Mission Done! 🎯
                  </button>
               </div>
            </div>
         )}

         {/* 🟢 STEP 4: TEST (QUIZ) */}
         {view === 'quiz' && content && (
            <div className="anim-pop">
               <div className="bounce-card" style={{ padding: '60px', border: '12px solid white' }}>
                  <h2 className="text-center mb-12" style={{ fontSize: '3.5rem', color: 'var(--primary)', fontWeight: 'bold' }}>🎯 Star Quiz</h2>
                  <p className="text-center" style={{ fontSize: '2rem', marginBottom: '50px', fontWeight: 'bold', color: '#2D3748' }}>{content.quiz.question}</p>

                  <div className="flex flex-col gap-6">
                     {content.quiz.options.map(opt => {
                        const isSelected = selectedAnswer === opt;
                        const isCorrect = opt === content.quiz.answer;
                        return (
                           <button key={opt} className="btn" onClick={() => handleQuiz(opt)} disabled={selectedAnswer}
                              style={{
                                 fontSize: '1.8rem', padding: '35px', borderRadius: '35px',
                                 background: isSelected ? (isCorrect ? 'var(--success)' : 'var(--warning)') : 'white',
                                 color: isSelected ? 'white' : 'var(--text)', border: '5px solid var(--border)',
                                 boxShadow: isSelected ? 'none' : '0 10px 0 #CBD5E0', transform: isSelected ? 'translateY(5px)' : 'none'
                              }} >
                              {opt} {isSelected && (isCorrect ? ' ✅' : ' ❌')}
                           </button>
                        )
                     })}
                  </div>

                  {selectedAnswer && (
                     <div className="mt-16 text-center anim-pop p-12" style={{ background: '#F7FAFC', borderRadius: '50px', border: '4px dashed var(--primary)' }}>
                        <div style={{ fontSize: '5rem', marginBottom: '20px' }}>{selectedAnswer === content.quiz.answer ? '🎊' : '🩹'}</div>
                        <h2 style={{ fontSize: '3rem', fontWeight: 'bold', color: selectedAnswer === content.quiz.answer ? 'var(--success)' : 'var(--warning)' }}>
                           {selectedAnswer === content.quiz.answer ? 'Correct! You are a Hero! 🎉' : `Nice try! The star was: ${content.quiz.answer} 🙂`}
                        </h2>
                        <button className="btn mt-10" style={{ padding: '25px 80px', borderRadius: '60px' }} onClick={() => {
                           if (completeTask && taskId) {
                              completeTask(taskId, 15);
                           } else {
                              addHistory({ type: '🏆 Adventure', topic: topic, points: selectedAnswer === content.quiz.answer ? 10 : 0 });
                              if (selectedAnswer === content.quiz.answer) addPoints(10);
                           }
                           setView('chapters'); setContent(null); setSelectedAnswer(null);
                           window.history.back();
                        }}>
                           Back to Map 🚀
                        </button>
                     </div>
                  )}
               </div>
            </div>
         )}

      </div>
   );
}
