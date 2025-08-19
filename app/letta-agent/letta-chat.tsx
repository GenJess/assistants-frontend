"use client";

import { useState } from "react";

type Msg = { role: "user" | "assistant"; text: string };

const LettaChat = () => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user" as const, text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    const res = await fetch("/api/letta-agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg.text }),
    });
    const data = await res.json();
    const reply =
      data?.messages?.[0]?.content?.[0]?.text || data?.error || "No response";
    setMessages((m) => [...m, { role: "assistant", text: reply }]);
  };

  return (
    <div>
      <div className="mb-4 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <span
              className={
                m.role === "user" ? "inline-block rounded bg-blue-200 p-2" : "inline-block rounded bg-gray-200 p-2"
              }
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded border px-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say something"
        />
        <button
          onClick={send}
          className="rounded bg-blue-600 px-4 py-1 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default LettaChat;
