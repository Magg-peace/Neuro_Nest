import { Mic, SendHorizontal, Volume2 } from "lucide-react";
import { useState } from "react";

export default function ChatBox({ messages, onSendMessage, title = "AI Tutor" }) {
  const [draft, setDraft] = useState("");
  const [voiceInfo, setVoiceInfo] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!draft.trim()) return;
    onSendMessage(draft.trim());
    setDraft("");
  };

  const useSpeechInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceInfo("Speech input is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setVoiceInfo("Listening...");
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setDraft(transcript);
      setVoiceInfo("Speech captured. You can edit and send.");
    };
    recognition.onerror = () => setVoiceInfo("Could not capture speech. Try again.");
    recognition.start();
  };

  return (
    <section id="ai" className="card-surface rounded-[2rem] bg-gradient-to-br from-white/90 via-violet-50/70 to-pink-50/70 p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-2xl bg-violet-100 p-3 text-violet-700 shadow-sm" aria-hidden>
          <Volume2 size={20} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-violet-900">{title} 🤖✨</h2>
          <p className="text-base font-semibold text-violet-800/80">Ask anything. I will explain it in a fun kid-friendly way.</p>
        </div>
      </div>

      <div className="max-h-80 space-y-3 overflow-y-auto rounded-2xl border border-violet-200 bg-white/75 p-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex items-end gap-2 ${message.sender === "child" ? "justify-end" : "justify-start"}`}>
            {message.sender !== "child" && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-200 text-lg" aria-hidden>
                🧠
              </div>
            )}

            <div
              className={`max-w-[82%] rounded-2xl px-4 py-3 text-base shadow-sm ${
                message.sender === "child"
                  ? "bg-gradient-to-r from-violet-500 to-indigo-500 text-white"
                  : "bg-white text-violet-950"
              }`}
            >
              <p className="font-bold">{message.sender === "child" ? "You" : "AI Tutor"}</p>
              <p className="leading-relaxed">{message.text}</p>
            </div>

            {message.sender === "child" && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-200 text-lg" aria-hidden>
                😊
              </div>
            )}
          </div>
        ))}
      </div>

      <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <label htmlFor="chat-input" className="sr-only">
          Ask the AI tutor
        </label>
        <input
          id="chat-input"
          className="min-h-12 flex-1 rounded-2xl border border-violet-300 bg-white px-4 text-base font-semibold text-violet-950 outline-none focus:border-violet-500"
          type="text"
          placeholder="Ask for help with stories, math, or reading..."
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button
          type="button"
          onClick={useSpeechInput}
          className="min-h-12 rounded-2xl border border-violet-300 bg-white px-4 text-violet-700 transition hover:-translate-y-0.5 hover:bg-violet-50"
          aria-label="Use speech input"
        >
          <Mic size={20} />
        </button>
        <button type="submit" className="min-h-12 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 px-5 font-bold text-white transition hover:-translate-y-0.5 hover:from-violet-600 hover:to-indigo-600">
          <span className="inline-flex items-center gap-2">
            Send <SendHorizontal size={16} />
          </span>
        </button>
      </form>
      {voiceInfo && <p className="mt-2 text-sm font-semibold text-violet-700">{voiceInfo}</p>}
    </section>
  );
}