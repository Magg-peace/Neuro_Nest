const fs = require('fs');
const path = 'frontend/src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. ADD IMPORTS
if (!content.includes("ChatBox")) {
    content = content.replace(
        "import './index.css';",
        "import ChatBox from './components/ChatBox';\nimport ProgressChart from './components/ProgressChart';\nimport './index.css';"
    );
}

// 2. ADD STATE TO APP COMPONENT
if (!content.includes("showChat")) {
    content = content.replace(
        "const [targetReward, setTargetReward] = useState(null);",
        "const [targetReward, setTargetReward] = useState(null);\n   const [showChat, setShowChat] = useState(false);\n   const [chatMessages, setChatMessages] = useState([\n      { id: 1, text: \"Hi! I'm your NeuroNest assistant. How can I help you learn today?\", sender: 'ai' }\n   ]);"
    );
}

// 3. ADD LOWER DASHBOARD CARDS TO ChildDashboard
const lowerCards = `
      {/* 5. Final Progress Summary (Restored Feature) */}
      <div className="grid mt-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
         <div className="cartoon-card" style={{ padding: '30px', background: '#F2F2F2' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>📊 TODAY'S PROGRESS</h3>
            <div className="flex gap-4 mb-6">
                <div style={{ background: '#EAF6FF', padding: '15px', borderRadius: '20px', flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem' }}>📘</div>
                    <strong>2</strong>
                    <small style={{ display: 'block', opacity: 0.6 }}>Lessons</small>
                </div>
                <div style={{ background: '#C6F6D5', padding: '15px', borderRadius: '20px', flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem' }}>🎮</div>
                    <strong>1</strong>
                    <small style={{ display: 'block', opacity: 0.6 }}>Games</small>
                </div>
                <div style={{ background: '#FEFCBF', padding: '15px', borderRadius: '20px', flex: 1, textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem' }}>⭐</div>
                    <strong>+20</strong>
                    <small style={{ display: 'block', opacity: 0.6 }}>XP Earned</small>
                </div>
            </div>
            <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--primary)', textAlign: 'center' }}>🎉 You're building great consistency! Keep going!</p>
         </div>

         <div className="cartoon-card" style={{ padding: '30px', background: '#F2F2F2' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>🥰 MOOD JOURNEY</h3>
            <div className="flex items-center justify-between mb-6 px-4">
                <span style={{ fontSize: '2.5rem', opacity: 0.4 }}>😴</span>
                <span style={{ fontSize: '1.5rem', opacity: 0.4 }}>➜</span>
                <span style={{ fontSize: '2.5rem', opacity: 0.6 }}>😌</span>
                <span style={{ fontSize: '1.5rem', opacity: 0.6 }}>➜</span>
                <span style={{ fontSize: '3rem' }}>😊</span>
            </div>
            <div style={{ background: 'var(--secondary)', padding: '15px', borderRadius: '20px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--primary)' }}>📝 You are more positive today than yesterday!</p>
            </div>
         </div>

         <div className="cartoon-card" style={{ padding: '30px', background: '#F2F2F2' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>⭐ REWARDS STORE</h3>
            <div className="flex-col gap-3">
                <div className="flex justify-between items-center opacity-40">
                    <span>🎭 Avatar Styles</span>
                    <span className="font-bold">100 XP</span>
                </div>
                <div className="flex justify-between items-center opacity-40">
                    <span>🌈 Color Themes</span>
                    <span className="font-bold">50 XP</span>
                </div>
                <div className="flex justify-between items-center opacity-40">
                    <span>🎮 Bonus Levels</span>
                    <span className="font-bold">150 XP</span>
                </div>
                <div style={{ borderTop: '2px dashed #ccc', margin: '10px 0' }}></div>
                <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--accent-2)', textAlign: 'center' }}>Almost unlocked! Keep earning XP ✨</p>
            </div>
         </div>
      </div>
`;

// Search for the end of ChildDashboard where we just added two divs
const childEndRegex = /(<Link to="\/drawing"(.|\n)*?<\/p>\s*<\/Link>\s*<\/div>)(\s*<\/div>\s*\);\s*};)/;
if (childEndRegex.test(content)) {
    content = content.replace(childEndRegex, `$1${lowerCards}$3`);
}

// 4. ADD FLOATING CHATBOT TO App RETURN
const chatbotUI = `
                        {/* Floating AI Chatbot Button (Restored Feature) */}
                        {user && user.role === 'child' && (
                           <>
                              <button 
                                 className="floating-voice" 
                                 onClick={() => setShowChat(true)}
                                 style={{ 
                                    background: 'linear-gradient(135deg, #9c78ff, #ec4899)', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '50px', 
                                    padding: '12px 25px', 
                                    fontWeight: 'bold', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: '10px',
                                    boxShadow: '0 8px 20px rgba(156, 120, 255, 0.4)'
                                 }}
                              >
                                 <span style={{ fontSize: '1.5rem' }}>🎙️</span> Talk to NeuroNest
                              </button>
                              
                              {showChat && (
                                 <div style={{ position: 'fixed', bottom: '100px', right: '40px', width: '380px', zIndex: 10001 }}>
                                    <div style={{ position: 'relative' }}>
                                       <button 
                                          onClick={() => setShowChat(false)}
                                          style={{ position: 'absolute', top: '-15px', right: '-15px', background: 'white', border: '3px solid #333', borderRadius: '50%', width: '35px', height: '35px', zIndex: 2, cursor: 'pointer' }}
                                       >❌</button>
                                       <ChatBox 
                                          title=\"Neuro Assistant\" 
                                          messages={chatMessages} 
                                          onSendMessage={(txt) => {
                                             const userMsg = { id: Date.now(), text: txt, sender: 'child' };
                                             setChatMessages(prev => [...prev, userMsg]);
                                             setTimeout(() => {
                                                const botMsg = { id: Date.now()+1, text: \`I heard you! \"\${txt}\" sounds interesting. Let's explore together!\`, sender: 'ai' };
                                                setChatMessages(prev => [...prev, botMsg]);
                                             }, 1000);
                                          }} 
                                       />
                                    </div>
                                 </div>
                              )}
                           </>
                        )}
`;

const appReturnRegex = /(<div className="hover:scale-105" style={{ display: 'none' }} \/> \/\* Hook for later if needed \*\/)\s+(<\/div>)\s+(\)})/;
if (appReturnRegex.test(content)) {
    content = content.replace(appReturnRegex, `$1\n                           </div>\n                        )}\n${chatbotUI}`);
} else {
    // Try another pattern if the above fails
    content = content.replace(
        "                        {user && <button className=\"btn btn-secondary\" onClick={handleLogout}>Logout</button>}",
        `${chatbotUI}\n                        {user && <button className=\"btn btn-secondary\" onClick={handleLogout}>Logout</button>}`
    );
}

fs.writeFileSync(path, content);
console.log('Features restored successfully.');
