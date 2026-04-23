import { BarChart3, CheckCircle2, HeartPulse, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import ProgressChart from "../components/ProgressChart";
import { getParentAnalytics } from "../services/api";

function StatCard({ icon, title, value, helper }) {
  return (
    <article className="card-surface rounded-3xl p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        {icon}
      </div>
      <p className="mt-3 text-3xl font-bold">{value}</p>
      <p className="text-soft mt-1 text-base">{helper}</p>
    </article>
  );
}

export default function ParentDashboardPage({ user }) {
  const [analytics, setAnalytics] = useState(null);
  const displayName = user?.name || user?.username || "Parent";

  useEffect(() => {
    getParentAnalytics(user.id).then(setAnalytics);
  }, [user.id]);

  if (!analytics) return <p className="text-lg">Loading progress analytics...</p>;

  return (
    <div className="space-y-6">
      <section className="card-surface rounded-blob p-6">
        <h1 className="text-4xl font-bold">Parent Dashboard</h1>
        <p className="text-soft mt-2 text-lg">
          Hello {displayName}, here is your child&apos;s progress and emotional wellness overview.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Points Earned"
          value={analytics.summary.pointsEarned}
          helper="Total reward points"
          icon={<BarChart3 size={20} />}
        />
        <StatCard
          title="Learning Progress"
          value={`${analytics.summary.learningProgress}%`}
          helper="Average weekly progress"
          icon={<TrendingUp size={20} />}
        />
        <StatCard
          title="Mood Stability"
          value={`${analytics.summary.moodStability}%`}
          helper="Calm + happy check-ins"
          icon={<HeartPulse size={20} />}
        />
        <StatCard
          title="Activities Completed"
          value={analytics.summary.activityCompletion}
          helper="This week"
          icon={<CheckCircle2 size={20} />}
        />
        <StatCard
          title="Engagement"
          value={`${analytics.summary.engagement}%`}
          helper="Interactive sessions"
          icon={<CheckCircle2 size={20} />}
        />
      </section>

      <ProgressChart progressData={analytics.progressData} moodData={analytics.moodHistory} />
    </div>
  );
}