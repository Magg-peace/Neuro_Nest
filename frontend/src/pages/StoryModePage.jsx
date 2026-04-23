import { Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import KidsActivityShell from "../components/KidsActivityShell";
import { getMoodProfile, getNextStory } from "../services/api";
import storyIllustration from "../assets/cartoon-reading-kid.svg";

export default function StoryModePage({ user }) {
  const [story, setStory] = useState(null);
  const [moodProfile, setMoodProfile] = useState(getMoodProfile("calm"));
  const [speechInfo, setSpeechInfo] = useState("");

  useEffect(() => {
    loadStory();
  }, []);

  const loadStory = async () => {
    const result = await getNextStory(user.id);
    setStory(result.story);
    setMoodProfile(result.moodProfile);
  };

  const speakStory = () => {
    if (!story) return;
    if (!("speechSynthesis" in window)) {
      setSpeechInfo("Text-to-speech is not available in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(`${story.title}. ${story.body}`);
    utterance.rate = 0.92;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setSpeechInfo("Reading story aloud...");
  };

  if (!story) return <p className="text-lg">Preparing your story...</p>;

  return (
    <KidsActivityShell
      title="Story Mode"
      subtitle={moodProfile.storyTip}
      image={storyIllustration}
      accent="from-violet-200 via-pink-100 to-blue-100"
      progressLabel="Reading Adventure"
    >
      <article className="card-surface overflow-hidden rounded-[2rem] bg-white/70 p-4 shadow-md">
        <div className="flex items-center gap-3 rounded-[1.5rem] bg-violet-50 p-3">
          <img src={storyIllustration} alt="Cartoon reading kid" className="h-20 w-20 rounded-[1.25rem] bg-white p-1 shadow-sm" />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-violet-700">Cartoon Story</p>
            <h2 className="text-2xl font-black text-violet-950">{story.title}</h2>
          </div>
        </div>

        <div className="mt-4 rounded-[1.5rem] bg-gradient-to-br from-white to-violet-50 p-4">
          <p className="text-lg font-semibold leading-relaxed text-violet-950">{story.body}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" className="min-h-12 rounded-full bg-violet-600 px-5 font-bold text-white transition hover:scale-105 hover:bg-violet-700" onClick={loadStory}>
            Next Story
          </button>
          <button
            type="button"
            className="min-h-12 rounded-full border border-violet-200 bg-white px-5 font-bold text-violet-900 transition hover:scale-105 hover:bg-violet-50"
            onClick={speakStory}
          >
            <span className="inline-flex items-center gap-2">
              <Volume2 size={18} /> Read Aloud
            </span>
          </button>
        </div>
        {speechInfo && <p className="mt-3 text-sm font-semibold text-violet-700">{speechInfo}</p>}
      </article>
    </KidsActivityShell>
  );
}