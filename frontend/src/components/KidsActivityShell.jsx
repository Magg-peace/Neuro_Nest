import { BookOpen, Home, Settings, Sparkles, TrendingUp } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const tabs = [
  { key: "home", label: "Home", icon: <Home size={18} />, to: "/child" },
  { key: "learn", label: "Learn", icon: <BookOpen size={18} />, to: "/child/story" },
  { key: "progress", label: "Progress", icon: <TrendingUp size={18} />, to: "/child" },
  { key: "settings", label: "Settings", icon: <Settings size={18} />, to: "/child" },
];

export default function KidsActivityShell({
  title,
  subtitle,
  image,
  accent = "from-violet-200 via-pink-100 to-blue-100",
  progressLabel,
  onBack,
  children,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const activeKey =
    location.pathname === "/child/story"
      ? "learn"
      : location.pathname === "/child"
        ? "home"
        : location.pathname === "/child/quiz"
          ? "learn"
          : location.pathname === "/child/relax"
            ? "settings"
            : "home";

  return (
    <div className="min-h-[calc(100vh-2rem)] bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 px-3 py-3 sm:px-4 sm:py-4">
      <div className="mx-auto flex w-full max-w-[430px] flex-col gap-4 rounded-[2.5rem] border border-white/70 bg-white/35 p-3 shadow-[0_25px_70px_rgba(109,76,152,0.25)] backdrop-blur-xl sm:p-4">
        <header className={`overflow-hidden rounded-[2rem] bg-gradient-to-br ${accent} p-4 shadow-[0_15px_35px_rgba(109,76,152,0.16)]`}>
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onBack || (() => navigate(-1))}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-violet-900 shadow-md transition hover:scale-105"
              aria-label="Go back"
            >
              ←
            </button>

            <div className="text-right">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-violet-900/60">NeuroNest</p>
              {progressLabel && <p className="text-sm font-bold text-violet-950">{progressLabel}</p>}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-black text-violet-950">{title}</h1>
              <p className="mt-1 text-sm font-semibold text-violet-900/75">{subtitle}</p>
            </div>
            {image && (
              <img src={image} alt={title} className="h-24 w-24 rounded-[1.5rem] bg-white/70 p-2 shadow-md" />
            )}
          </div>
        </header>

        <main className="space-y-4">{children}</main>

        <nav className="sticky bottom-3 z-50 mt-1 flex items-center justify-between rounded-[1.75rem] border border-white/80 bg-white/85 px-3 py-3 shadow-[0_18px_40px_rgba(90,73,157,0.24)] backdrop-blur-md">
          {tabs.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => navigate(item.to)}
              className={`flex min-h-12 flex-1 flex-col items-center justify-center rounded-[1.25rem] px-3 py-2 text-xs font-black transition ${
                activeKey === item.key ? "bg-violet-600 text-white shadow-md" : "text-violet-700 hover:bg-violet-100"
              }`}
            >
              {item.icon}
              <span className="mt-1">{item.label}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => navigate("/ai-tutor")}
            className="ml-2 flex min-h-12 items-center justify-center rounded-[1.25rem] bg-orange-400 px-3 text-white transition hover:scale-105"
            aria-label="AI Tutor"
          >
            <Sparkles size={18} />
          </button>
        </nav>
      </div>
    </div>
  );
}