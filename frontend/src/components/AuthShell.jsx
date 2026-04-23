import kidsIllustration from "../assets/kids-learning.svg";

export default function AuthShell({ title, subtitle, children }) {
  return (
    <section className="relative min-h-[calc(100vh-1.5rem)] overflow-hidden rounded-[2rem] bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-4 sm:p-6 lg:p-8">
      <div className="absolute -left-16 top-12 h-40 w-40 rounded-full bg-purple-300/35 blur-3xl" aria-hidden />
      <div className="absolute right-8 top-28 h-36 w-36 rounded-full bg-orange-300/35 blur-3xl" aria-hidden />
      <div className="absolute bottom-10 right-12 h-48 w-48 rounded-full bg-sky-300/30 blur-3xl" aria-hidden />

      <div className="relative grid min-h-[80vh] gap-6 lg:grid-cols-2 lg:gap-8">
        <aside className="hidden rounded-[2rem] border border-white/60 bg-white/40 p-6 shadow-[0_18px_45px_rgba(91,76,146,0.2)] backdrop-blur-md lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-base font-bold text-violet-700">
              😊 Welcome to NeuroNest
            </p>
            <h2 className="mt-4 text-4xl font-bold text-violet-900">Learn with Joy!</h2>
            <p className="mt-3 max-w-md text-lg font-semibold text-violet-900/80">
              A playful and supportive place for neurodivergent learners.
            </p>
          </div>

          <img
            src={kidsIllustration}
            alt="Cartoon children learning with books in a cheerful classroom"
            className="mx-auto mt-4 w-full max-w-xl rounded-[1.8rem] border border-white/80 bg-white/60 p-2"
          />

          <p className="text-lg font-bold text-violet-900/80">📚 🎨 Playful learning, steady progress, gentle support.</p>
        </aside>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-lg rounded-[2rem] border border-white/75 bg-white/75 p-6 shadow-[0_20px_48px_rgba(105,88,168,0.26)] backdrop-blur-md sm:p-8">
            <p className="text-center text-lg font-bold text-violet-700">Welcome to NeuroNest - Learn with Joy! 😊</p>
            <h1 className="mt-3 text-center text-4xl font-bold text-violet-900">{title}</h1>
            <p className="mt-2 text-center text-lg font-semibold text-slate-700">{subtitle}</p>

            {children}
          </div>
        </div>
      </div>
    </section>
  );
}