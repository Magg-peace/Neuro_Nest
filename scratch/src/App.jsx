import { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AiTutorPage from "./pages/AiTutorPage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ParentDashboardPage from "./pages/ParentDashboardPage";
import QuizModePage from "./pages/QuizModePage";
import RelaxModePage from "./pages/RelaxModePage";
import Signup from "./pages/Signup";
import StoryModePage from "./pages/StoryModePage";
import TeacherDashboardPage from "./pages/TeacherDashboardPage";
import VoiceChatModePage from "./pages/VoiceChatModePage";
import {
  clearSessionUser,
  getGamification,
  getStoredTheme,
  saveStoredTheme,
} from "./services/api";

const ROLES = {
  CHILD: "child",
  PARENT: "parent",
  TEACHER: "teacher",
};

function ProtectedRoute({ user, allowedRoles, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return children;
}

function HomeRedirect({ user }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={`/${user.role}`} replace />;
}

export default function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState(getStoredTheme());
  const [pointsState, setPointsState] = useState({ points: 0, badges: [], rewards: [] });
  const location = useLocation();

  const showNavbar =
    location.pathname !== "/login" &&
    location.pathname !== "/signup" &&
    !location.pathname.startsWith("/child") &&
    location.pathname !== "/ai-tutor";

  useEffect(() => {
    saveStoredTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (!user) {
      setPointsState({ points: 0, badges: [], rewards: [] });
      return;
    }

    getGamification(user.id).then(setPointsState);
  }, [user]);

  const themeClassName = useMemo(() => {
    if (theme === "dark") return "theme-dark";
    if (theme === "pastel") return "theme-pastel";
    return "";
  }, [theme]);

  const handleLogout = () => {
    clearSessionUser();
    setUser(null);
  };

  return (
    <div className={`${themeClassName} min-h-screen`}>
      {showNavbar && (
        <Navbar
          user={user}
          onLogout={handleLogout}
          theme={theme}
          onThemeChange={setTheme}
        />
      )}

      <main className="mx-auto w-full max-w-7xl px-4 pb-10 pt-5 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomeRedirect user={user} />} />

          <Route path="/login" element={<Login onAuthSuccess={setUser} existingUser={user} />} />
          <Route path="/signup" element={<Signup onAuthSuccess={setUser} existingUser={user} />} />

          <Route
            path="/child"
            element={
              <ProtectedRoute user={user} allowedRoles={[ROLES.CHILD]}>
                <Dashboard user={user} pointsState={pointsState} onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/child/story"
            element={
              <ProtectedRoute user={user} allowedRoles={[ROLES.CHILD]}>
                <StoryModePage user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/child/quiz"
            element={
              <ProtectedRoute user={user} allowedRoles={[ROLES.CHILD]}>
                <QuizModePage user={user} onPointsUpdate={setPointsState} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/child/voice"
            element={
              <ProtectedRoute user={user} allowedRoles={[ROLES.CHILD]}>
                <VoiceChatModePage user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/child/relax"
            element={
              <ProtectedRoute user={user} allowedRoles={[ROLES.CHILD]}>
                <RelaxModePage user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ai-tutor"
            element={
              <ProtectedRoute user={user} allowedRoles={[ROLES.CHILD, ROLES.PARENT, ROLES.TEACHER]}>
                <AiTutorPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/parent"
            element={
              <ProtectedRoute user={user} allowedRoles={[ROLES.PARENT]}>
                <ParentDashboardPage user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/teacher"
            element={
              <ProtectedRoute user={user} allowedRoles={[ROLES.TEACHER]}>
                <TeacherDashboardPage user={user} />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}