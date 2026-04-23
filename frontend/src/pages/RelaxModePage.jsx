import { useEffect, useState } from "react";
import KidsActivityShell from "../components/KidsActivityShell";
import relaxIllustration from "../assets/cartoon-reading-kid.svg";
import { getCalmingMessages } from "../services/api";

export default function RelaxModePage() {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = getCalmingMessages();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [messages.length]);

  return (
    <KidsActivityShell
      title="Relax Mode"
      subtitle="Breathe in slowly for 4 counts, then breathe out for 4 counts."
      image={relaxIllustration}
      accent="from-pink-200 via-rose-100 to-yellow-100"
      progressLabel="Calm Break"
    >
      <article className="card-surface flex flex-col items-center rounded-[2rem] bg-white/75 p-6 shadow-md">
        <div className="rounded-[2rem] bg-gradient-to-br from-violet-100 to-sky-100 p-4">
          <div className="breathing-circle" aria-hidden />
        </div>
        <p className="mt-6 text-center text-2xl font-black text-violet-950">{messages[messageIndex]}</p>
        <div className="mt-4 flex gap-2">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-violet-700 shadow-sm">inhale 4</span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-violet-700 shadow-sm">exhale 4</span>
        </div>
      </article>
    </KidsActivityShell>
  );
}