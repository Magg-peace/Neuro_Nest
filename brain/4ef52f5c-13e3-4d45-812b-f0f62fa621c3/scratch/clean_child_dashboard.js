const fs = require('fs');
const path = 'frontend/src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

const cleanChildDashboard = `
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
         alert(\`🎁 Yay! You bought \${item}! It's now in your collection.\`);
         setModalType(null);
      } else {
         alert(\`💎 Not enough XP yet! Keep learning to earn more.\`);
      }
   };

   const handleClaimReward = (reward) => {
      setPoints(prev => prev - reward.cost);
      setNotifications(prev => [
         { id: Date.now(), text: \`🎉 \${user.name} just claimed their target reward: \${reward.name}!\`, unread: true },
         ...prev
      ]);
      addHistory({ type: 'Reward Claimed', topic: \`Redeemed \${reward.name}\`, points: -reward.cost });
      setTargetReward(null);
      alert(\`🎁 CONGRATULATIONS! You've claimed your \${reward.name}! Your parent and teacher have been notified of your hard work! 🌟\`);
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
                 <div style={{ width: \`\${Math.min(points, 100)}%\`, height: '100%', background: 'linear-gradient(90deg, #FFD700, #FFA500)', transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}></div>
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
            <button key={m.label} onClick={() => setMood(m.label)} className={\`btn \${mood === m.label ? 'border-glow' : ''}\`} 
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
                     <div style={{ width: \`\${Math.min((points / targetReward.cost) * 100, 100)}%\`, height: '100%', background: 'var(--accent-2)' }}></div>
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
`;

const regex = /const ChildDashboard = \(\) => {[\s\S]*const ParentDashboard = \(\) => {/;
if (regex.test(content)) {
    content = content.replace(regex, cleanChildDashboard + "\nconst ParentDashboard = () => {");
    fs.writeFileSync(path, content);
    console.log('Successfully cleaned ChildDashboard.');
} else {
    console.log('Regex failed to match ChildDashboard block.');
    // Try a more aggressive split approach if regex fails
    const parts = content.split('const ChildDashboard = () => {');
    if (parts.length > 1) {
        const afterChild = parts[1].split('const ParentDashboard = () => {');
        if (afterChild.length > 1) {
            content = parts[0] + cleanChildDashboard + "\nconst ParentDashboard = () => {" + afterChild[1];
            fs.writeFileSync(path, content);
            console.log('Successfully cleaned ChildDashboard via Split.');
        }
    }
}
