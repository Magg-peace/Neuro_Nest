import { useState } from "react";
import ChatBox from "../components/ChatBox";
import kidsIllustration from "../assets/kids-learning.svg";
import { sendTutorMessage } from "../services/api";

export default function AiTutorPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hi! I am your AI tutor. Ask me about reading, math, or fun facts.",
    },
  ]);

  const handleSendMessage = async (text) => {
    const userMessage = { id: Date.now(), sender: "child", text };
    setMessages((prev) => [...prev, userMessage]);
    const reply = await sendTutorMessage(text);
    setMessages((prev) => [...prev, reply]);
  };

  return (
    <section className="space-y-5">
      <div className="card-surface rounded-[2rem] bg-gradient-to-r from-violet-100/80 via-pink-100/70 to-blue-100/80 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-violet-900">AI Tutor Playground</h1>
            <p className="mt-2 text-lg font-semibold text-violet-800/80">Chat, ask questions, and learn with fun friendly guidance.</p>
          </div>
          <img src={kidsIllustration} alt="Cartoon kids learning" className="h-24 w-24 rounded-2xl border border-white/80 bg-white/70 p-1" />
        </div>
      </div>
      <ChatBox messages={messages} onSendMessage={handleSendMessage} />
    </section>
  );
}