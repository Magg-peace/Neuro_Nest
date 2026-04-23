import React from 'react';

export default function AnimatedScene({ type }) {
  const renderScene = () => {
    switch (type) {
      case "Numbers Fun 🔢":
        return (
          <div className="scene-container flex flex-col items-center justify-center h-full">
            <div className="flex gap-4">
              <div className="bounce-anim text-6xl">🍎</div>
              <div className="bounce-anim delay-1 text-6xl">🍎</div>
              <div className="bounce-anim delay-2 text-6xl">🍎</div>
              <div className="text-6xl font-bold flex items-center">+</div>
              <div className="bounce-anim delay-3 text-6xl">🍎</div>
              <div className="bounce-anim delay-4 text-6xl">🍎</div>
            </div>
            <div className="mt-8 text-4xl font-bold text-primary anim-pop">3 + 2 = 5!</div>
          </div>
        );
      case "Colors & Shapes 🌈":
        return (
          <div className="scene-container flex items-center justify-center h-full gap-8">
            <div className="w-24 h-24 bg-red-500 rounded-full float-anim"></div>
            <div className="w-24 h-24 bg-blue-500 float-anim delay-1"></div>
            <div className="w-0 h-0 border-l-[50px] border-l-transparent border-r-[50px] border-r-transparent border-b-[100px] border-b-green-500 float-anim delay-2"></div>
          </div>
        );
      case "Pattern Play 🔁":
        return (
          <div className="scene-container flex items-center justify-center h-full gap-4">
            <div className="text-6xl slide-in">⭐</div>
            <div className="text-6xl slide-in delay-1">🔵</div>
            <div className="text-6xl slide-in delay-2">⭐</div>
            <div className="text-6xl slide-in delay-3">🔵</div>
            <div className="text-6xl pulse italic opacity-50">?</div>
          </div>
        );
      case "Sound & Listening 🎵":
        return (
          <div className="scene-container flex items-center justify-center h-full">
            <div className="text-9xl wobble">🐄</div>
            <div className="absolute text-4xl font-bold text-white bg-black/50 px-4 py-2 rounded-full mt-48 animate-bounce">
              MOOOOOOO!
            </div>
          </div>
        );
      case "Story Time 🐰":
        return (
          <div className="scene-container flex items-center justify-center h-full">
            <div className="text-8xl hop-anim">🐰</div>
            <div className="flex gap-2 ml-8">
              <div className="text-4xl anim-pop delay-1">🥕</div>
              <div className="text-4xl anim-pop delay-2">🥕</div>
              <div className="text-4xl anim-pop delay-3">🥕</div>
            </div>
          </div>
        );
      case "Memory Boost 🧠":
        return (
          <div className="scene-container flex items-center justify-center h-full gap-6">
            <div className="flip-card">🍎</div>
            <div className="flip-card delay-1">🍌</div>
            <div className="flip-card delay-2">🍇</div>
          </div>
        );
      case "Focus Game 🎮":
        return (
          <div className="scene-container grid grid-cols-2 gap-8 items-center justify-center h-full">
            <div className="text-6xl">🐶</div>
            <div className="text-6xl">🐱</div>
            <div className="text-6xl">🐭</div>
            <div className="text-6xl wobble-fast border-4 border-red-500 rounded-xl p-2">🚗</div>
          </div>
        );
      case "Drawing Fun 🚀":
        return (
          <div className="scene-container flex flex-col items-center justify-center h-full">
            <div className="relative h-64 w-32">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[60px] border-b-red-600 slide-down"></div>
              <div className="absolute top-[60px] left-0 w-32 h-48 bg-blue-600 rounded-b-xl anim-pop"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-4">
                <div className="w-8 h-12 bg-orange-500 animate-pulse"></div>
                <div className="w-8 h-12 bg-orange-500 animate-pulse delay-75"></div>
              </div>
            </div>
          </div>
        );
      case "Real-Life Learning 🏡":
        return (
          <div className="scene-container flex flex-col items-center justify-center h-full gap-8">
            <div className="flex gap-2">
              <div className="text-5xl slide-in">🍫</div>
              <div className="text-5xl slide-in delay-1">🍫</div>
            </div>
            <div className="flex gap-20">
              <div className="text-6xl anim-pop delay-2">👦</div>
              <div className="text-6xl anim-pop delay-3">👧</div>
            </div>
          </div>
        );
      case "Emotions & Mood 💛":
        return (
          <div className="scene-container flex items-center justify-center h-full">
            <div className="text-[12rem] emotion-morph">😊</div>
          </div>
        );
      default:
        return <div className="text-4xl">Something magical is happening...</div>;
    }
  };

  return (
    <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-sky-100 rounded-3xl overflow-hidden relative border-4 border-white shadow-inner">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300/20 to-transparent"></div>
      <div className="relative z-10 w-full h-full p-8">
        {renderScene()}
      </div>
      
      {/* Playback simulation overlay */}
      <div className="absolute bottom-4 left-0 w-full px-8 opacity-60">
        <div className="flex items-center gap-3">
          <div className="text-primary text-xl">▶</div>
          <div className="flex-1 h-2 bg-white/50 rounded-full overflow-hidden">
             <div className="h-full bg-primary animate-[progress_10s_linear_infinite]"></div>
          </div>
          <div className="text-xs font-bold text-primary">00:45</div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce { 
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float { 
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -15px); }
        }
        @keyframes slideIn { 
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes hop { 
          0%, 100% { transform: translate(0, 0) rotate(0); }
          25% { transform: translate(20px, -30px) rotate(10deg); }
          50% { transform: translate(40px, 0) rotate(0); }
          75% { transform: translate(60px, -30px) rotate(-10deg); }
        }
        @keyframes flip {
          0% { transform: rotateY(0); }
          50% { transform: rotateY(180deg); }
          100% { transform: rotateY(0); }
        }
        @keyframes morph {
          0% { content: '😊'; transform: scale(1); filter: hue-rotate(0); }
          50% { content: '😢'; transform: scale(1.1); filter: hue-rotate(180deg); }
          100% { content: '😊'; transform: scale(1); filter: hue-rotate(0); }
        }
        @keyframes progress {
          from { width: 0; }
          to { width: 100%; }
        }
        .bounce-anim { animation: bounce 2s infinite ease-in-out; }
        .float-anim { animation: float 3s infinite ease-in-out; }
        .slide-in { animation: slideIn 1s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275); opacity: 0; }
        .hop-anim { animation: hop 2s infinite linear; }
        .flip-card { 
          font-size: 5rem;
          animation: flip 3s infinite ease-in-out;
          background: white;
          padding: 20px;
          border-radius: 20px;
          box-shadow: 0 10px 0 #E2E8F0;
        }
        .emotion-morph:after {
          content: '😊';
          animation: morph 4s infinite ease-in-out;
        }
        .emotion-morph { font-size: 10rem; }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        .delay-4 { animation-delay: 0.8s; }
      `}} />
    </div>
  );
}
