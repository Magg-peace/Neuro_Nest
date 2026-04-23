import {
  ArrowRight,
  BookOpen,
  Home,
  LogOut,
  Medal,
  Gamepad2,
  Settings,
  Sparkles,
  TrendingUp,
  Volume2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateMoodCheckIn } from "../services/api";
import heroIllustration from "../assets/cartoon-reading-kid.svg";
import playIllustration from "../assets/cartoon-playing-kid.svg";

const moodOptions = [
  { value: "happy", emoji: "😄", label: "Happy", gradient: "from-yellow-200 to-orange-200" },
  { value: "calm", emoji: "😌", label: "Calm", gradient: "from-sky-200 to-cyan-200" },
  { value: "sad", emoji: "🥺", label: "Sad", gradient: "from-blue-200 to-indigo-200" },
  { value: "angry", emoji: "😠", label: "Angry", gradient: "from-rose-200 to-pink-200" },
];

const exploreCards = [
  {
    title: "Lessons",
    description: "Mini learning adventures with bright stories and friendly steps.",
    image: heroIllustration,
    color: "from-violet-200 via-fuchsia-100 to-white",
    to: "/child/story",
  },
  {
    title: "Games",
    description: "Tap, play, and earn sparkles while you answer fun questions.",
    image: playIllustration,
    color: "from-orange-200 via-amber-100 to-white",
    to: "/child/quiz",
  },
  {
    title: "Stories",
    description: "Listen to cartoon-style stories that match your mood.",
    image: heroIllustration,
    color: "from-sky-200 via-blue-100 to-white",
    to: "/child/story",
  },
  {
    title: "Activities",
    description: "Relax, breathe, or chat with the AI tutor when you need a pause.",
    image: playIllustration,
    color: "from-pink-200 via-rose-100 to-white",
    to: "/child/relax",
  },
];

const menuItems = [
  { label: "Lessons", icon: <BookOpen size={18} />, to: "/child/story" },
  { label: "Games", icon: <Gamepad2 size={18} />, to: "/child/quiz" },
  { label: "Stories", icon: <Sparkles size={18} />, to: "/child/story" },
  { label: "Activities", icon: <Volume2 size={18} />, to: "/child/relax" },
  { label: "Discover", icon: <TrendingUp size={18} />, to: "/ai-tutor" },
];

export default function Dashboard({ user, pointsState, onLogout }) {
  const navigate = useNavigate();
  const displayName = user?.name || user?.username || "Learner";
  const [selectedMood, setSelectedMood] = useState("happy");
  const [activeTab, setActiveTab] = useState("home");
  const [showSettings, setShowSettings] = useState(false);

  const level = useMemo(() => Math.max(1, Math.floor(pointsState.points / 100) + 1), [pointsState.points]);
  const progress = useMemo(() => (pointsState.points % 100), [pointsState.points]);

  const selectedMoodInfo = useMemo(() => {
    const mood = moodOptions.find((item) => item.value === selectedMood);
    if (selectedMood === "sad") {
      return {
        title: "Gentle mode on",
        text: "Let us keep things short and encouraging today.",
        action: "/child/relax",
      };
    }
    if (selectedMood === "angry") {
      return {
        title: "Need a calm break?",
        text: "Relax Mode can help you breathe and reset.",
        action: "/child/relax",
      };
    }
    return {
      title: `${mood?.label || "Happy"} learning time!`,
      text: "Pick a bright activity and keep your streak going.",
      action: "/child/story",
    };
  }, [selectedMood]);

  const goTo = (path) => navigate(path);

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood);
    await updateMoodCheckIn(user.id, mood);
  };

  const handleTab = (tab) => {
    setActiveTab(tab);
    if (tab === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (tab === "learn") {
      document.getElementById("explore-zone")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (tab === "progress") {
      document.getElementById("progress-zone")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (tab === "settings") {
      setShowSettings((prev) => !prev);
    }
  };

  return (
    <div className="min-h-[calc(100vh-2rem)] bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 px-3 py-3 sm:px-4 sm:py-4">
      <div className="mx-auto flex w-full max-w-[430px] flex-col gap-4 rounded-[2.5rem] border border-white/70 bg-white/35 p-3 shadow-[0_25px_70px_rgba(109,76,152,0.25)] backdrop-blur-xl sm:p-4">
        <header className="card-surface rounded-[2rem] bg-white/65 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3048/3048122.png"
                  alt="Cartoon learner avatar"
                  className="h-14 w-14 rounded-full border-4 border-white bg-violet-100 object-cover shadow-md"
                />
                <span className="absolute -right-1 -top-1 rounded-full bg-yellow-300 px-2 py-0.5 text-[10px] font-black text-violet-900 shadow-sm">
                  LIVE
                </span>
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-700">NeuroNest</p>
                <h1 className="text-2xl font-black text-violet-950">Hello, {displayName} 🎉</h1>
                <p className="text-sm font-semibold text-violet-800/70">Level {level} learning adventure</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/ai-tutor")}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-violet-800 shadow-md transition hover:scale-105"
              aria-label="Open AI Tutor"
            >
              <Volume2 size={18} />
            </button>
          </div>

          <div className="mt-4 rounded-[1.75rem] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-500 p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold opacity-90">Progress {progress}%</p>
                <p className="text-lg font-black">Keep collecting stars!</p>
              </div>
              <div className="rounded-full bg-white/20 p-3">
                <Medal size={24} />
              </div>
            </div>
            <div className="mt-4 h-3 rounded-full bg-white/25">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-yellow-300 to-orange-300 transition-all duration-700"
                style={{ width: `${Math.max(12, progress)}%` }}
              />
            </div>
          </div>
        </header>

        <section className="card-surface rounded-[2rem] bg-white/60 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-violet-950">Pick your mood</h2>
              <p className="text-sm font-semibold text-violet-800/70">Tap a bubble to personalize the app</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {moodOptions.map((mood) => {
              const selected = selectedMood === mood.value;
              return (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => handleMoodSelect(mood.value)}
                  className={`group flex aspect-square flex-col items-center justify-center rounded-full bg-gradient-to-br ${mood.gradient} text-center transition duration-300 hover:scale-105 hover:animate-bounce ${
                    selected ? "ring-4 ring-violet-500 ring-offset-2 ring-offset-white shadow-[0_0_0_6px_rgba(139,92,246,0.16)]" : "shadow-md"
                  }`}
                >
                  <span className="text-3xl drop-shadow-sm">{mood.emoji}</span>
                  <span className="mt-1 text-[11px] font-black text-violet-950">{mood.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="card-surface rounded-[2rem] bg-white/65 p-4" id="explore-zone">
          <h2 className="mb-3 text-2xl font-black text-violet-950">Explore</h2>
          <div className="space-y-4">
            {exploreCards.map((card) => (
              <article key={card.title} className={`overflow-hidden rounded-[2rem] bg-gradient-to-br ${card.color} p-4 shadow-md transition duration-300 hover:scale-[1.02] hover:-translate-y-1`}>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-violet-700">
                      {card.title}
                    </div>
                    <p className="mt-2 text-base font-semibold text-violet-950/85">{card.description}</p>
                    <button
                      type="button"
                      onClick={() => goTo(card.to)}
                      className="mt-3 inline-flex items-center gap-2 rounded-full bg-violet-950 px-4 py-2 text-sm font-bold text-white transition hover:scale-105"
                    >
                      Open <ArrowRight size={16} />
                    </button>
                  </div>
                  <img src={card.image} alt={card.title} className="h-24 w-24 rounded-[1.5rem] bg-white/70 p-2 shadow-sm" />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2" id="progress-zone">
          <article className="card-surface rounded-[2rem] bg-gradient-to-br from-orange-200 via-pink-100 to-white p-4 transition hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-orange-700">Stars</p>
                <h3 className="text-3xl font-black text-violet-950">{pointsState.points}</h3>
              </div>
              <div className="rounded-full bg-white p-3 text-orange-500 shadow-md">
                <Sparkles size={22} />
              </div>
            </div>
            <p className="mt-2 text-sm font-semibold text-violet-900/70">Earn points by finishing lessons and games.</p>
          </article>

          <article className="card-surface rounded-[2rem] bg-gradient-to-br from-sky-200 via-white to-violet-100 p-4 transition hover:scale-[1.02]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-sky-700">Badges</p>
                <h3 className="text-2xl font-black text-violet-950">{pointsState.badges.length}</h3>
              </div>
              <div className="rounded-full bg-white p-3 text-sky-500 shadow-md">
                <Medal size={22} />
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {pointsState.badges.slice(0, 3).map((badge) => (
                <span key={badge} className="rounded-full bg-white/90 px-3 py-1 text-xs font-black text-violet-800 shadow-sm">
                  {badge}
                </span>
              ))}
            </div>
          </article>
        </section>

        <section className="card-surface rounded-[2rem] bg-white/65 p-4 transition hover:scale-[1.01]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-violet-950">{selectedMoodInfo.title}</h2>
              <p className="mt-1 text-sm font-semibold text-violet-800/75">{selectedMoodInfo.text}</p>
            </div>
            <button
              type="button"
              onClick={() => goTo(selectedMoodInfo.action)}
              className="rounded-full bg-violet-600 px-4 py-2 text-sm font-black text-white transition hover:scale-105 hover:bg-violet-700"
            >
              Go
            </button>
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => goTo(item.to)}
                className="flex min-w-[90px] flex-col items-center justify-center rounded-[1.5rem] bg-white px-3 py-4 text-center shadow-md transition hover:scale-105"
              >
                <span className="rounded-full bg-violet-100 p-3 text-violet-700">{item.icon}</span>
                <span className="mt-2 text-xs font-black text-violet-950">{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        {showSettings && (
          <section className="card-surface rounded-[2rem] bg-violet-50/80 p-4">
            <h2 className="text-2xl font-black text-violet-950">Settings</h2>
            <p className="mt-1 text-sm font-semibold text-violet-800/80">Use the top navbar for profile and theme changes on other screens.</p>
          </section>
        )}

        <nav className="sticky bottom-3 z-50 mt-2 flex items-center justify-between rounded-[1.75rem] border border-white/80 bg-white/85 px-3 py-3 shadow-[0_18px_40px_rgba(90,73,157,0.24)] backdrop-blur-md">
          {[
            { key: "home", label: "Home", icon: <Home size={18} /> },
            { key: "learn", label: "Learn", icon: <BookOpen size={18} /> },
            { key: "progress", label: "Progress", icon: <TrendingUp size={18} /> },
            { key: "settings", label: "Settings", icon: <Settings size={18} /> },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => handleTab(item.key)}
              className={`flex min-h-12 flex-1 flex-col items-center justify-center rounded-[1.25rem] px-3 py-2 text-xs font-black transition ${
                activeTab === item.key ? "bg-violet-600 text-white shadow-md" : "text-violet-700 hover:bg-violet-100"
              }`}
            >
              {item.icon}
              <span className="mt-1">{item.label}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={onLogout}
            className="ml-2 flex min-h-12 items-center justify-center rounded-[1.25rem] bg-orange-400 px-3 text-white transition hover:scale-105"
            aria-label="Logout"
          >
            <LogOut size={18} />
          </button>
        </nav>
      </div>
    </div>
  );
}