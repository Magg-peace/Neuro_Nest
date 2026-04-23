import { Mic, MicOff } from "lucide-react";
import { useState } from "react";
import KidsActivityShell from "../components/KidsActivityShell";
import voiceIllustration from "../assets/cartoon-playing-kid.svg";
import { getVoiceReply } from "../services/api";

export default function VoiceChatModePage() {
  const [listening, setListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [reply, setReply] = useState("Say something and I will respond.");
  const [supportMessage, setSupportMessage] = useState("");

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupportMessage("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
      setSupportMessage("Listening...");
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setSpokenText(transcript);
      const aiReply = await getVoiceReply(transcript);
      setReply(aiReply);
    };

    recognition.onerror = () => {
      setSupportMessage("Could not understand. Please try again.");
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  return (
    <KidsActivityShell
      title="Voice Chat"
      subtitle="Press the mic and speak naturally. I will respond in a friendly way."
      image={voiceIllustration}
      accent="from-sky-200 via-blue-100 to-violet-100"
      progressLabel="Talk Time"
    >
      <article className="card-surface rounded-[2rem] bg-white/75 p-5 text-center shadow-md">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-violet-500 text-white shadow-lg transition hover:scale-105">
          <button
            type="button"
            onClick={startListening}
            className="flex h-full w-full items-center justify-center rounded-full"
            aria-label="Start voice input"
          >
            {listening ? <MicOff size={30} /> : <Mic size={30} />}
          </button>
        </div>

        <p className="mt-4 text-sm font-black uppercase tracking-[0.25em] text-sky-700">Speech bubble</p>
        <div className="mt-3 rounded-[1.5rem] bg-sky-50 p-4 text-left shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">You said</p>
          <p className="mt-1 text-lg font-semibold text-violet-950">{spokenText || "..."}</p>
        </div>

        <div className="mt-3 rounded-[1.5rem] bg-violet-50 p-4 text-left shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">AI reply</p>
          <p className="mt-1 text-lg font-semibold text-violet-950">{reply}</p>
        </div>

        {supportMessage && <p className="mt-4 text-sm font-semibold text-orange-700">{supportMessage}</p>}
      </article>
    </KidsActivityShell>
  );
}