export default function ActivityCard({ title, description, emoji, onStart }) {
  return (
    <article className="card-surface rounded-3xl p-5">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-white/80 p-3 text-3xl" aria-hidden>
          {emoji}
        </div>
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-soft mt-1 text-base">{description}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="btn-primary mt-5 min-h-12 rounded-xl px-5 text-base font-bold"
      >
        Start Activity
      </button>
    </article>
  );
}