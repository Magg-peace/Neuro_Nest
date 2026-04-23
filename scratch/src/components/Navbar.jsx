import { Brain, LogOut, Moon, Palette, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const roleLinks = {
  child: [
    { label: "Dashboard", to: "/child" },
    { label: "AI Tutor", to: "/ai-tutor" },
  ],
  parent: [
    { label: "Dashboard", to: "/parent" },
    { label: "AI Tutor", to: "/ai-tutor" },
  ],
  teacher: [
    { label: "Dashboard", to: "/teacher" },
    { label: "AI Tutor", to: "/ai-tutor" },
  ],
};

function ThemeButton({ active, onClick, label, icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition ${
        active
          ? "border-transparent bg-[var(--accent)] text-white"
          : "border-[var(--border)] bg-white/70 text-[var(--text-main)]"
      }`}
      aria-pressed={active}
      aria-label={`Switch to ${label} mode`}
    >
      {icon}
      {label}
    </button>
  );
}

export default function Navbar({ user, onLogout, theme, onThemeChange }) {
  const location = useLocation();
  const links = user ? roleLinks[user.role] || [] : [];
  const displayName = user?.name || user?.username || "Learner";

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-[var(--accent)] p-2 text-white">
            <Brain size={22} />
          </div>
          <div>
            <p className="text-2xl font-bold">NeuroNest</p>
            <p className="text-soft text-sm">Adaptive learning with care</p>
            {user && <p className="text-soft text-sm">Signed in as {displayName}</p>}
          </div>
        </div>

        {user && (
          <nav className="flex flex-wrap items-center gap-2" aria-label="Role based navigation">
            {links.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`rounded-xl px-4 py-3 text-base font-semibold transition ${
                    active
                      ? "bg-[var(--accent)] text-white"
                      : "bg-white/70 text-[var(--text-main)] hover:bg-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <ThemeButton
            label="Light"
            active={theme === "default"}
            onClick={() => onThemeChange("default")}
            icon={<Sun size={16} />}
          />
          <ThemeButton
            label="Dark"
            active={theme === "dark"}
            onClick={() => onThemeChange("dark")}
            icon={<Moon size={16} />}
          />
          <ThemeButton
            label="Pastel"
            active={theme === "pastel"}
            onClick={() => onThemeChange("pastel")}
            icon={<Palette size={16} />}
          />

          {user && (
            <button
              type="button"
              className="flex min-h-11 items-center gap-2 rounded-xl border border-[var(--border)] bg-white/70 px-3 py-2 text-sm font-semibold"
              onClick={onLogout}
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}