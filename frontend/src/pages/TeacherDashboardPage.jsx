import { ClipboardCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { assignTask, getTeacherOverview } from "../services/api";

export default function TeacherDashboardPage({ user }) {
  const [overview, setOverview] = useState(null);
  const displayName = user?.name || user?.username || "Teacher";
  const [taskForm, setTaskForm] = useState({
    title: "",
    dueDate: "",
    assignedTo: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    getTeacherOverview().then(setOverview);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTaskForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await assignTask(taskForm);
    setStatus("Task assigned successfully.");
    setTaskForm({ title: "", dueDate: "", assignedTo: "" });
  };

  if (!overview) return <p className="text-lg">Loading class overview...</p>;

  return (
    <div className="space-y-6">
      <section className="card-surface rounded-blob p-6">
        <h1 className="text-4xl font-bold">Teacher Dashboard</h1>
        <p className="text-soft mt-2 text-lg">
          Hello {displayName}, manage classroom activities and monitor student performance.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <article className="card-surface rounded-3xl p-5">
          <h2 className="mb-3 inline-flex items-center gap-2 text-2xl font-bold">
            <Users size={20} /> Class Overview
          </h2>
          <p className="text-lg">Students: {overview.classroom.totalStudents}</p>
          <p className="text-lg">Active Today: {overview.classroom.activeToday}</p>
          <p className="text-lg">Assignments This Week: {overview.classroom.assignmentsThisWeek}</p>
        </article>

        <article className="card-surface rounded-3xl p-5">
          <h2 className="mb-3 inline-flex items-center gap-2 text-2xl font-bold">
            <ClipboardCheck size={20} /> Assign Task
          </h2>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={taskForm.title}
              onChange={handleChange}
              placeholder="Task title"
              className="min-h-12 w-full rounded-xl border border-[var(--border)] bg-white px-4"
              required
            />
            <input
              type="date"
              name="dueDate"
              value={taskForm.dueDate}
              onChange={handleChange}
              className="min-h-12 w-full rounded-xl border border-[var(--border)] bg-white px-4"
              required
            />
            <input
              type="text"
              name="assignedTo"
              value={taskForm.assignedTo}
              onChange={handleChange}
              placeholder="Assign to (student/group)"
              className="min-h-12 w-full rounded-xl border border-[var(--border)] bg-white px-4"
              required
            />
            <button type="submit" className="btn-primary min-h-12 rounded-xl px-5 font-bold">
              Assign Task
            </button>
            {status && <p className="text-base text-green-700">{status}</p>}
          </form>
        </article>
      </section>

      <section className="card-surface overflow-x-auto rounded-3xl p-5">
        <h2 className="mb-4 text-2xl font-bold">Student Performance</h2>
        <table className="min-w-full text-left text-base">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="px-3 py-2">Student</th>
              <th className="px-3 py-2">Progress</th>
              <th className="px-3 py-2">Mood Trend</th>
              <th className="px-3 py-2">Activities Completed</th>
            </tr>
          </thead>
          <tbody>
            {overview.performance.map((student) => (
              <tr key={student.name} className="border-b border-[var(--border)]">
                <td className="px-3 py-2 font-semibold">{student.name}</td>
                <td className="px-3 py-2">{student.progress}%</td>
                <td className="px-3 py-2">{student.moodTrend}</td>
                <td className="px-3 py-2">{student.completedActivities}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}