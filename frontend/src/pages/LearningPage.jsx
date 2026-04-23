import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { generateLearningContent } from '../services/llm';

const CHAPTERS = [
  { id: 1, title: "Space Rockets 🚀", color: "#EAF6FF", icon: "🚀", youtubeId: "libKWYXQHjw", description: "Learn how rockets zoom to the stars!" },
  { id: 2, title: "Dinosaurs 🦖", color: "#C6F6D5", icon: "🦖", youtubeId: "vN5J_Vj5p0U", description: "The world of giants and fast runners!" },
  { id: 3, title: "Ocean Life 🌊", color: "#BEE3F8", icon: "🐬", youtubeId: "aYvYp9p_yvE", description: "Diving deep with dolphins and squids!" },
  { id: 4, title: "Human Body 💪", color: "#FED7E2", icon: "❤️", youtubeId: "j8SshXvP6S8", description: "How your heart and brain keep you moving!" },
  { id: 5, title: "Plants Hunt 🌿", color: "#F0FFF4", icon: "🌱", youtubeId: "TKpShN9_fA8", description: "Discover how plants eat sunlight!" },
  { id: 6, title: "Weather Magic ☁️", color: "#EBF8FF", icon: "🌧️", youtubeId: "X_h0XyG5DFA", description: "Where does rain come from?" },
  { id: 7, title: "Music World 🎵", color: "#FAF5FF", icon: "🎸", youtubeId: "9l-f_qM-KFE", description: "The secret of fast-wiggling strings!" },
  { id: 8, title: "Color Mix 🎨", color: "#FFF5F5", icon: "🎨", youtubeId: "y_OqH8fK5M8", description: "Mixing colors like a magic potion!" },
  { id: 9, title: "Inventors 💡", color: "#FFFFF0", icon: "⚙️", youtubeId: "mGzWhf8413k", description: "Tools that changed the whole world!" },
  { id: 10, title: "Numbers Fun 🔢", color: "#FDF2F8", icon: "🍎", youtubeId: "1a4CidXmF6M", description: "Counting apples and building towers!" }
];

export default function LearningPage({ mood, addPoints, addHistory }) {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [view, setView] = useState('chapters'); // chapters | video | quiz
  const [currentChapter, setCurrentChapter] = useState(null);

  const startChapter = async (chap) => {
    setCurrentChapter(chap);
    setLoading(true);
    setTopic(chap.title);
    try {
      const res = await generateLearningContent(chap.title, mood || 'Happy', { condition: 'ADHD', style: 'Visual' });
      setContent(res);
      setView('video');
    } catch(err) {
      console.error(err);
    }
    setLoading(false);
  };

  const generateCustom = async () => {
    setLoading(true);
    try {
      const res = await generateLearningContent(topic, mood || 'Happy', { condition: 'ADHD', style: 'Visual' });
      setContent(res);
      setCurrentChapter({ youtubeId: 'dQw4w9WgXcQ' }); 
      setView('video');
    } catch(err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleQuiz = (opt) => {
    setSelectedAnswer(opt);
    if(opt === content.quiz.answer && addPoints) {
      addPoints(10);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '1000px', paddingBottom: '100px' }}>
      
      {/* 1. Chapter Selection View */}
      {view === 'chapters' && !loading && (
        <div className="anim-pop">
           <h1 className="text-center mb-2" style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>🎬 Pick a Video Lesson</h1>
           <p className="text-center mb-10" style={{ fontSize: '1.3rem', opacity: 0.8 }}>Watch an animated adventure and earn points!</p>
           
           <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
              {CHAPTERS.map(chap => (
                 <div 
                   key={chap.id} 
                   className="cartoon-card wobble-hover" 
                   onClick={() => startChapter(chap)}
                   style={{ background: chap.color, cursor: 'pointer', textAlign: 'center', padding: '30px' }}
                 >
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                       <div style={{ fontSize: '4rem', marginBottom: '15px' }}>{chap.icon}</div>
                       <div style={{ position: 'absolute', top: '0', right: '-10px', background: 'red', color: 'white', borderRadius: '50%', width: '25px', height: '25px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▶</div>
                    </div>
                    <h3 style={{ fontSize: '1.6rem', marginBottom: '10px' }}>{chap.title}</h3>
                    <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{chap.description}</p>
                 </div>
              ))}
           </div>

           <div className="text-center mt-12 p-6 cartoon-card" style={{ background: 'var(--surface)' }}>
              <h3>✨ Want to learn something else?</h3>
              <div className="flex justify-center gap-2 mt-4">
                 <input 
                   type="text" 
                   className="input-field" 
                   placeholder="Type a topic (e.g. Magic Dogs)..." 
                   value={topic}
                   onChange={(e) => setTopic(e.target.value)}
                 />
                 <button className="btn" onClick={generateCustom} disabled={!topic}>Ask AI 🤖</button>
              </div>
           </div>
        </div>
      )}

      {/* 2. Loading State */}
      {loading && (
        <div className="text-center mt-12 p-10 bounce-card">
           <div className="logo-loop" style={{ fontSize: '5rem' }}>🎬</div>
           <h2 className="mt-4">Loading your Animated Video...</h2>
           <p>Streaming from the star-map!</p>
        </div>
      )}

      {/* 3. Animated Video View */}
      {view === 'video' && content && !loading && (
        <div className="anim-pop">
           <button className="btn btn-secondary mb-4" onClick={() => setView('chapters')}>⬅ Back to Chapters</button>
           
           <div className="enhanced-card" style={{ padding: '0', overflow: 'hidden', border: '8px solid var(--primary)', borderRadius: '25px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
              {/* YouTube Video Embed - Standard Embed with broad compatibility */}
              <div style={{ position: 'relative', height: '0', paddingBottom: '56.25%' }}>
                 <iframe 
                   style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
                   src={`https://www.youtube.com/embed/${currentChapter?.youtubeId}?autoplay=1&rel=0&modestbranding=1&origin=${window.location.origin}`}
                   title="Lesson Video"
                   frameBorder="0"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowFullScreen
                 ></iframe>
              </div>

              {/* Lesson Text Content */}
              <div style={{ padding: '30px', background: 'white' }}>
                 <div className="flex items-center gap-4 mb-4">
                    <span style={{ fontSize: '3rem' }}>💡</span>
                    <div>
                       <h2 style={{ fontSize: '2rem', margin: 0 }}>Chapter: {topic}</h2>
                       <p style={{ margin: 0, opacity: 0.7 }}>Watch the video then click below!</p>
                    </div>
                 </div>
                 
                 <div style={{ background: '#F7FAFC', padding: '20px', borderRadius: '15px', borderLeft: '5px solid var(--primary)', marginBottom: '20px' }}>
                    <p style={{ fontSize: '1.3rem', lineHeight: '1.6', color: '#4A5568', margin: 0 }}>{content.lesson}</p>
                 </div>
                 
                 <div className="mt-8 flex justify-center">
                    <button className="btn border-glow" style={{ padding: '20px 60px', fontSize: '1.5rem', borderRadius: '50px' }} onClick={() => setView('quiz')}>
                       I Finished Watching! 🎮 Let's Play!
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* 4. Quiz View */}
      {view === 'quiz' && content && !loading && (
        <div className="anim-pop">
           <button className="btn btn-secondary mb-4" onClick={() => setView('video')}>⬅ Back to Video</button>
           
           <div className="bounce-card" style={{ background: 'var(--surface)', padding: '50px', borderRadius: '30px' }}>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                 <div style={{ fontSize: '4rem' }}>⭐</div>
                 <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>Knowledge Challenge!</h2>
              </div>

              <p style={{ fontSize: '1.6rem', marginBottom: '30px', textAlign: 'center', fontWeight: 'bold' }}>{content.quiz.question}</p>
              
              <div className="flex flex-col gap-4">
                 {content.quiz.options.map(opt => {
                    const isSelected = selectedAnswer === opt;
                    const isCorrect = opt === content.quiz.answer;
                    return (
                       <button 
                         key={opt}
                         className="btn btn-answer"
                         onClick={() => handleQuiz(opt)}
                         disabled={selectedAnswer}
                         style={{ 
                            fontSize: '1.3rem', 
                            padding: '25px', 
                            borderRadius: '20px',
                            background: isSelected ? (isCorrect ? 'var(--success)' : 'var(--warning)') : 'white',
                            borderColor: isSelected ? 'transparent' : 'var(--border)',
                            boxShadow: isSelected ? 'none' : '0 5px 15px rgba(0,0,0,0.05)'
                         }}
                       >
                          {opt}
                          {isSelected && (isCorrect ? ' ✅' : ' ❌')}
                       </button>
                    )
                 })}
              </div>

              {selectedAnswer && (
                 <div className="mt-12 text-center anim-pop">
                    {selectedAnswer === content.quiz.answer ? (
                       <div style={{ background: '#F0FFF4', padding: '30px', borderRadius: '20px', border: '3px solid var(--success)' }}>
                          <div style={{ fontSize: '3rem' }}>🏆</div>
                          <h2 style={{ color: 'var(--success)' }}>Perfect! You are a Star!</h2>
                          <p style={{ fontSize: '1.4rem' }}>You earned +10 Points</p>
                       </div>
                    ) : (
                       <div style={{ background: '#FFF5F5', padding: '30px', borderRadius: '20px', border: '3px solid var(--warning)' }}>
                          <div style={{ fontSize: '3rem' }}>💪</div>
                          <h2 style={{ color: 'var(--warning)' }}>Good Effort! Let's keep learning!</h2>
                          <p style={{ fontSize: '1.4rem' }}>The secret answer was: {content.quiz.answer}</p>
                       </div>
                    )}
                    <button className="btn mt-8" style={{ padding: '15px 60px', borderRadius: '50px' }} onClick={() => {
                       addHistory({ type: '🎬 Video Chapter', topic: topic, points: selectedAnswer === content.quiz.answer ? 10 : 0 });
                       setView('chapters');
                       setContent(null);
                       setSelectedAnswer(null);
                    }}>
                       Go to Next Mission 🚀
                    </button>
                 </div>
              )}
           </div>
        </div>
      )}

    </div>
  );
}
