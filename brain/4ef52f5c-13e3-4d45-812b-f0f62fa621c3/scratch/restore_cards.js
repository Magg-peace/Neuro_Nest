const fs = require('fs');
const path = 'frontend/src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

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

// More robust regex for ChildDashboard ending
const magicCanvasEnd = 'Creative sketching ✏️</p>\\s*</Link>\\s*</div>';
const regex = new RegExp(`(${magicCanvasEnd})(\\s*</div>\\s*\\);\\s*};)`, 'g');

if (regex.test(content)) {
    content = content.replace(regex, `$1${lowerCards}$2`);
    fs.writeFileSync(path, content);
    console.log('Successfully inserted lower cards.');
} else {
    console.log('Regex failed again. Debugging...');
    // Fallback search
    if (content.includes('“Magic Canvas”')) {
        console.log('Found Magic Canvas string.');
        // Splitting by line might be easier
        const lines = content.split(/\r?\n/);
        let foundIdx = -1;
        for (let i = lines.length - 1; i >= 0; i--) {
            if (lines[i].includes('“Magic Canvas”')) {
                // Look forward for the next two </div>
                let openDivs = 0;
                for (let j = i; j < i + 20; j++) {
                   if (lines[j].includes('</div>')) {
                       openDivs++;
                       if (openDivs === 2) {
                           foundIdx = j;
                           break;
                       }
                   }
                }
                break;
            }
        }
        if (foundIdx !== -1) {
            lines.splice(foundIdx, 0, lowerCards);
            fs.writeFileSync(path, lines.join('\n'));
            console.log('Successfully inserted lower cards via Line Fallback.');
        }
    }
}
