import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App.jsx';
import confetti from 'canvas-confetti';

export default function StoryPage() {
  const navigate = useNavigate();
  const { addPoints, addHistory } = useContext(AppContext);
  const [scene, setScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState(false);

  // Library of 10 dynamic stories
  const storyLibrary = [
    [
      { type: 'narration', title: "🌍 The Solar System Adventure", text: "Welcome to Space! The Solar System is a massive neighborhood filled with glowing stars and colorful planets.", icon: "🌌", anim: "fade-in", audio: "Welcome to Space! The Solar System is a massive neighborhood filled with glowing stars and colorful planets." },
      { type: 'animation', title: "🚀 Meet the Rocket", text: "Look! A shiny red rocket is zooming past Mars! It travels super fast through the starry sky.", icon: "🚀", anim: "slide-up-glow", audio: "Look! A shiny red rocket is zooming past Mars! It travels super fast through the starry sky." },
      { type: 'quiz', title: "🧩 Your Checkpoint", text: "What did the red rocket zoom past?", icon: "❓", audio: "Listen carefully... What did the red rocket zoom past?", options: ["The Sun", "Mars", "The Moon"], correct: "Mars" }
    ],
    [
      { type: 'narration', title: "🐠 Journey to the Deep Sea", text: "Dive! We are exploring the bottom of the ocean. It's blue, calm, and full of wonderful creatures.", icon: "🌊", anim: "fade-in", audio: "Dive! We are exploring the bottom of the ocean. It's blue, calm, and full of wonderful creatures." },
      { type: 'animation', title: "🐙 The Friendly Octopus", text: "There's an octopus! It has eight long, swooshy arms and loves playing hide and seek.", icon: "🐙", anim: "slide-up-glow", audio: "There's an octopus! It has eight long, swooshy arms and loves playing hide and seek." },
      { type: 'quiz', title: "🧩 Ocean Checkpoint", text: "How many arms does the friendly octopus have?", icon: "❓", audio: "How many arms does the friendly octopus have?", options: ["Five", "Eight", "Ten"], correct: "Eight" }
    ],
    [
      { type: 'narration', title: "🦁 Jungle Safari", text: "Welcome to the wild jungle! The trees are incredibly tall and the leaves are huge and green.", icon: "🌴", anim: "fade-in", audio: "Welcome to the wild jungle! The trees are incredibly tall and the leaves are huge and green." },
      { type: 'animation', title: "🐒 The Silly Monkey", text: "A silly monkey is swinging from vine to vine, looking for a yellow banana!", icon: "🐒", anim: "slide-up-glow", audio: "A silly monkey is swinging from vine to vine, looking for a yellow banana!" },
      { type: 'quiz', title: "🧩 Safari Checkpoint", text: "What is the monkey looking for?", icon: "❓", audio: "What is the silly monkey looking for?", options: ["An Apple", "A Coconut", "A Banana"], correct: "A Banana" }
    ],
    [
      { type: 'narration', title: "🦸 Superhero Training", text: "You have arrived at superhero school! Here, kids learn to fly and use magic powers safely.", icon: "🏫", anim: "fade-in", audio: "You have arrived at superhero school! Here, kids learn to fly and use magic powers safely." },
      { type: 'animation', title: "⚡ Discovering Speed", text: "Your power today is Super Speed! You can run faster than a sports car zooming down a track.", icon: "⚡", anim: "slide-up-glow", audio: "Your power today is Super Speed! You can run faster than a sports car zooming down a track." },
      { type: 'quiz', title: "🧩 Hero Checkpoint", text: "What super power did you practice today?", icon: "❓", audio: "What super power did you practice today?", options: ["Super Speed", "Invisibility", "Flying"], correct: "Super Speed" }
    ],
    [
      { type: 'narration', title: "🤖 The Robot Factory", text: "Beep boop! We are inside a futuristic robot factory. Tools are spinning and gears are turning.", icon: "⚙️", anim: "fade-in", audio: "Beep boop! We are inside a futuristic robot factory. Tools are spinning and gears are turning." },
      { type: 'animation', title: "🔧 Fix-It Bot", text: "Meet Fix-It Bot! He has a bright light on his head to help find missing screws.", icon: "🤖", anim: "slide-up-glow", audio: "Meet Fix-It Bot! He has a bright light on his head to help find missing screws." },
      { type: 'quiz', title: "🧩 Tech Checkpoint", text: "What does Fix-It Bot have on his head?", icon: "❓", audio: "What does Fix-It Bot have on his head?", options: ["A Hat", "A Bright Light", "A Speaker"], correct: "A Bright Light" }
    ],
    [
      { type: 'narration', title: "❄️ Winter Wonderland", text: "Brrr! It's snowing gently. The ground is covered in a soft, white, sparkly blanket of snow.", icon: "❄️", anim: "fade-in", audio: "Brrr! It's snowing gently. The ground is covered in a soft, white, sparkly blanket of snow." },
      { type: 'animation', title: "⛄ Building a Snowman", text: "We rolled three giant snowballs to make a happy snowman with a carrot nose!", icon: "⛄", anim: "slide-up-glow", audio: "We rolled three giant snowballs to make a happy snowman with a carrot nose!" },
      { type: 'quiz', title: "🧩 Frost Checkpoint", text: "What did we use for the snowman's nose?", icon: "❓", audio: "What did we use for the snowman's nose?", options: ["A Stick", "A Rock", "A Carrot"], correct: "A Carrot" }
    ],
    [
      { type: 'narration', title: "🌋 Volcano Island", text: "We landed on a warm tropical island! In the middle sits a huge, rumbling mountain.", icon: "🏝️", anim: "fade-in", audio: "We landed on a warm tropical island! In the middle sits a huge, rumbling mountain." },
      { type: 'animation', title: "🔥 Safe Observation", text: "We are watching safely from a distance as bright orange lava warmly bubbles up.", icon: "🌋", anim: "slide-up-glow", audio: "We are watching safely from a distance as bright orange lava warmly bubbles up." },
      { type: 'quiz', title: "🧩 Island Checkpoint", text: "What color is the bubbling lava we saw?", icon: "❓", audio: "What color is the bubbling lava we saw?", options: ["Blue", "Orange", "Green"], correct: "Orange" }
    ],
    [
      { type: 'narration', title: "🏰 Magic Castle", text: "The heavy wooden doors open for you... welcome to the magical, floating castle in the sky!", icon: "🏰", anim: "fade-in", audio: "The heavy wooden doors open for you... welcome to the magical, floating castle in the sky!" },
      { type: 'animation', title: "🐉 The Tiny Dragon", text: "A tiny, friendly green dragon flies down to greet you and puffs a small, sparky cloud.", icon: "🐉", anim: "slide-up-glow", audio: "A tiny, friendly green dragon flies down to greet you and puffs a small, sparky cloud." },
      { type: 'quiz', title: "🧩 Magic Checkpoint", text: "Who came down to greet you at the castle?", icon: "❓", audio: "Who came down to greet you at the castle?", options: ["A Wizard", "A Green Dragon", "A Knight"], correct: "A Green Dragon" }
    ],
    [
      { type: 'narration', title: "🐝 Bug's Life Adventure", text: "Shrink down! We are now the size of an ant, walking through a massive forest of grass.", icon: "🌱", anim: "fade-in", audio: "Shrink down! We are now the size of an ant, walking through a massive forest of grass." },
      { type: 'animation', title: "🐞 The Spotted Ladybug", text: "We meet a helpful ladybug who lets us ride on her back to fly over the giant puddles.", icon: "🐞", anim: "slide-up-glow", audio: "We meet a helpful ladybug who lets us ride on her back to fly over the giant puddles." },
      { type: 'quiz', title: "🧩 Insect Checkpoint", text: "Who gave us a ride over the puddles?", icon: "❓", audio: "Who gave us a ride over the puddles?", options: ["A Spider", "A Grasshopper", "A Ladybug"], correct: "A Ladybug" }
    ],
    [
      { type: 'narration', title: "🎵 The Musical Forest", text: "Every tree here makes a gentle humming sound, and the leaves ring like tiny bells.", icon: "🌲", anim: "fade-in", audio: "Every tree here makes a gentle humming sound, and the leaves ring like tiny bells." },
      { type: 'animation', title: "🦊 Drumming Fox", text: "A clever fox is sitting on a log, tapping out a happy beat with two wooden sticks.", icon: "🦊", anim: "slide-up-glow", audio: "A clever fox is sitting on a log, tapping out a happy beat with two wooden sticks." },
      { type: 'quiz', title: "🧩 Sound Checkpoint", text: "What instrument is the fox playing?", icon: "❓", audio: "What instrument is the fox playing?", options: ["A Flute", "A Piano", "Wooden Sticks on a Log"], correct: "Wooden Sticks on a Log" }
    ]
  ];

  // Pick a random story ONLY on first mount to avoid switching mid-way
  const [activeStory] = useState(() => storyLibrary[Math.floor(Math.random() * storyLibrary.length)]);
  const currentSegment = activeStory[scene];

  useEffect(() => {
    // Play TTS if it's not a quiz (or if it is, read the question)
    if (currentSegment.audio) {
      const synth = window.speechSynthesis;
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(currentSegment.audio);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      synth.speak(utterance);
      setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
    }
  }, [scene, currentSegment]);

  const handleNext = () => {
    if (scene < activeStory.length - 1) {
      setScene(scene + 1);
    } else {
       // Finish Story
       confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
       addPoints(20);
       addHistory({ type: '📖 Story', topic: activeStory[0].title, points: 20 });
       setTimeout(() => navigate('/child-dashboard'), 3000);
    }
  };

  const handleQuizAnswer = (ans) => {
    if(quizAnswered) return;
    if(ans === currentSegment.correct) {
       setQuizAnswered(true);
       const synth = window.speechSynthesis;
       synth.cancel();
       synth.speak(new SpeechSynthesisUtterance("Great job! That is correct!"));
    } else {
       const synth = window.speechSynthesis;
       synth.cancel();
       synth.speak(new SpeechSynthesisUtterance("Not quite, but good try! Think about the red planet."));
    }
  };

  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5vh' }}>
      <h2 className="mb-4" style={{ fontSize: '2rem', color: 'var(--primary)' }}>{currentSegment.title}</h2>
      
      <div className="enhanced-card hover:scale-105" style={{ position: 'relative', overflow: 'hidden', padding: '60px', minHeight: '350px', width: '100%', maxWidth: '700px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)', border: '3px solid var(--border)' }}>
        
        {/* Dynamic Scene Visuals */}
        <div style={{ 
            fontSize: '8rem', 
            marginBottom: '30px',
            animation: currentSegment.anim === 'slide-up-glow' ? 'bounce 3s infinite' : 'float 4s ease-in-out infinite' 
          }}>
          {currentSegment.icon}
        </div>
        
        <p style={{ fontSize: '1.6rem', fontWeight: 'bold', transition: 'all 0.5s', textAlign: 'center', lineHeight: '1.5' }}>
          {currentSegment.text}
        </p>

        {/* Quiz Interaction rendering */}
        {currentSegment.type === 'quiz' && (
           <div style={{ display: 'flex', gap: '15px', marginTop: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {currentSegment.options.map((opt, i) => (
                 <button 
                    key={i} 
                    className={`btn ${quizAnswered && opt === currentSegment.correct ? 'btn-success target-correct' : 'btn-secondary'}`}
                    style={{ fontSize: '1.2rem', padding: '15px 30px', background: quizAnswered && opt === currentSegment.correct ? '#10B981' : '' }}
                    onClick={() => handleQuizAnswer(opt)}
                 >
                    {opt}
                 </button>
              ))}
           </div>
        )}

        {/* Audio Indicator */}
        {isPlaying && (
           <div style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', gap: '3px' }}>
              <span className="sound-wave-bar"></span>
              <span className="sound-wave-bar" style={{ animationDelay: '0.2s', height: '15px' }}></span>
              <span className="sound-wave-bar" style={{ animationDelay: '0.4s', height: '24px' }}></span>
           </div>
        )}

        <div className="progress-container" style={{ position: 'absolute', bottom: 0, left: 0, height: '8px', borderRadius: 0, width: '100%', background: 'var(--bg)' }}>
          <div className="progress-fill" style={{ width: `${((scene + 1) / activeStory.length) * 100}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.5s' }}></div>
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        {currentSegment.type !== 'quiz' || quizAnswered ? (
           <button className="btn hover:scale-110" onClick={handleNext} style={{ fontSize: '1.4rem', padding: '20px 50px', background: 'var(--primary)', position: 'relative', overflow: 'hidden' }}>
             <span className="anim-pop" style={{ position: 'relative', zIndex: 1 }}>{scene < activeStory.length - 1 ? 'Next Scene ➔' : 'Claim Reward! 🎁'}</span>
             <div className="btn-glow-bg"></div>
           </button>
        ) : (
           <p style={{ fontSize: '1.2rem', color: 'var(--muted)', fontWeight: 'bold' }}>Answer the question to continue!</p>
        )}
      </div>
    </div>
  );
}
