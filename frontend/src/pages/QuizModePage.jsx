import { useEffect, useMemo, useState } from "react";
import KidsActivityShell from "../components/KidsActivityShell";
import quizIllustration from "../assets/cartoon-playing-kid.svg";
import { getQuizQuestions, rewardQuizPoints } from "../services/api";

export default function QuizModePage({ user, onPointsUpdate }) {
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [awardedPoints, setAwardedPoints] = useState(0);

  useEffect(() => {
    getQuizQuestions().then(setQuestions);
  }, []);

  const question = useMemo(() => questions[questionIndex], [questions, questionIndex]);

  const handleAnswer = async (choice) => {
    if (!question) return;

    const isCorrect = choice === question.answer;
    const updatedScore = isCorrect ? score + 1 : score;
    setScore(updatedScore);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      return;
    }

    setDone(true);
    const points = updatedScore * 20;
    setAwardedPoints(points);
    const updatedGamification = await rewardQuizPoints(user.id, points);
    onPointsUpdate(updatedGamification);
  };

  const resetQuiz = () => {
    setQuestionIndex(0);
    setScore(0);
    setDone(false);
    setAwardedPoints(0);
    getQuizQuestions().then(setQuestions);
  };

  if (!questions.length) return <p className="text-lg">Loading quiz...</p>;

  if (done) {
    return (
      <KidsActivityShell
        title="Quiz Complete!"
        subtitle="You earned stars and finished the challenge."
        image={quizIllustration}
        accent="from-orange-200 via-pink-100 to-yellow-100"
        progressLabel="Game Finished"
      >
        <article className="card-surface rounded-[2rem] bg-white/70 p-5 text-center shadow-md">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-orange-400 text-4xl text-white shadow-lg">
            🏆
          </div>
          <h2 className="mt-4 text-3xl font-black text-violet-950">Awesome job!</h2>
          <p className="mt-2 text-xl font-semibold text-violet-900/80">
            Score: {score} / {questions.length}
          </p>
          <p className="mt-1 text-lg font-bold text-orange-600">Reward points earned: +{awardedPoints}</p>
          <button
            type="button"
            onClick={resetQuiz}
            className="mt-5 rounded-full bg-violet-600 px-5 py-3 text-base font-bold text-white transition hover:scale-105 hover:bg-violet-700"
          >
            Play Again
          </button>
        </article>
      </KidsActivityShell>
    );
  }

  return (
    <KidsActivityShell
      title="Quiz Game"
      subtitle="Pick the right answer and earn bright reward points."
      image={quizIllustration}
      accent="from-orange-200 via-pink-100 to-yellow-100"
      progressLabel={`Question ${questionIndex + 1} of ${questions.length}`}
    >
      <article className="card-surface overflow-hidden rounded-[2rem] bg-white/75 p-4 shadow-md">
        <div className="flex items-center gap-3 rounded-[1.5rem] bg-orange-50 p-3">
          <img src={quizIllustration} alt="Cartoon kid playing" className="h-20 w-20 rounded-[1.25rem] bg-white p-1 shadow-sm" />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-700">Fun Question</p>
            <h2 className="text-2xl font-black text-violet-950">{question.question}</h2>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {question.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleAnswer(option)}
              className="min-h-14 rounded-[1.3rem] border border-white bg-gradient-to-br from-white to-orange-50 px-4 py-3 text-left text-lg font-bold text-violet-950 shadow-sm transition hover:scale-[1.02] hover:border-orange-300 hover:bg-orange-100"
            >
              {option}
            </button>
          ))}
        </div>
      </article>
    </KidsActivityShell>
  );
}