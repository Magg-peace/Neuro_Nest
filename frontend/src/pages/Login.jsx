import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import { loginUser } from "../services/api";

const roleOptions = [
  { value: "child", label: "Child" },
  { value: "parent", label: "Parent" },
  { value: "teacher", label: "Teacher" },
];

export default function Login({ onAuthSuccess, existingUser }) {
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "", role: "child" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const successMessage = location.state?.successMessage || "";

  if (existingUser) return <Navigate to={`/${existingUser.role}`} replace />;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await loginUser(formData);
      onAuthSuccess(result);
    } catch (apiError) {
      setError(apiError.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="Let us Start Your Learning Adventure!" subtitle="Login and continue your magical learning journey.">
      <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
        {successMessage && (
          <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-base font-bold text-emerald-700">
            {successMessage}
          </p>
        )}

        <label className="block text-left text-base font-bold text-slate-700" htmlFor="email">
          Email
        </label>
        <div className="flex min-h-14 items-center gap-3 rounded-xl border border-orange-200 bg-white px-4 shadow-sm">
          <Mail size={20} className="text-orange-500" aria-hidden />
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@example.com"
            className="w-full bg-transparent text-lg font-semibold text-slate-800 outline-none"
            required
          />
        </div>

        <label className="block text-left text-base font-bold text-slate-700" htmlFor="password">
          Password
        </label>
        <div className="flex min-h-14 items-center gap-3 rounded-xl border border-orange-200 bg-white px-4 shadow-sm">
          <Lock size={20} className="text-orange-500" aria-hidden />
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full bg-transparent text-lg font-semibold text-slate-800 outline-none"
            required
          />
        </div>

        <label className="block text-left text-base font-bold text-slate-700" htmlFor="role">
          Role
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="min-h-14 w-full rounded-xl border border-orange-200 bg-white px-4 text-lg font-semibold text-slate-800 shadow-sm"
        >
          {roleOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && <p className="rounded-xl bg-red-100 p-3 text-base font-semibold text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-orange-400 px-5 py-4 text-xl font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-200"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="pt-2 text-center text-base font-semibold text-slate-700">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-bold text-orange-600 underline">
            Create one
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}