import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function ProgressChart({ progressData, moodData }) {
  const lineData = {
    labels: progressData.labels,
    datasets: [
      {
        label: "Learning Progress (%)",
        data: progressData.values,
        borderColor: "#3e8cff",
        backgroundColor: "rgba(62, 140, 255, 0.2)",
        tension: 0.35,
        pointRadius: 4,
      },
    ],
  };

  const doughnutData = {
    labels: ["Happy", "Calm", "Sad", "Angry"],
    datasets: [
      {
        data: [moodData.happy, moodData.calm, moodData.sad, moodData.angry],
        backgroundColor: ["#f6d95f", "#7bd0bc", "#88afe8", "#ea8b95"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
            family: "Atkinson Hyperlegible",
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="card-surface h-80 rounded-3xl p-4 sm:p-6">
        <h3 className="text-2xl font-bold">Learning Progress</h3>
        <div className="mt-4 h-56">
          <Line data={lineData} options={chartOptions} />
        </div>
      </div>

      <div className="card-surface h-80 rounded-3xl p-4 sm:p-6">
        <h3 className="text-2xl font-bold">Mood History</h3>
        <div className="mt-4 h-56">
          <Doughnut data={doughnutData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}