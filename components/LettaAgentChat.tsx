"use client";

import { useState } from "react";

interface Agent {
  id: string;
  name: string;
  description: string;
}

const agents: Agent[] = [
  { id: "aoc", name: "AOC", description: "Alexandria Ocasio-Cortez AI Agent" },
  { id: "anna", name: "ANNA", description: "Anna AI Agent" },
];

interface Message {
  role: string;
  content: string;
}

export default function LettaAgentChat() {
  const [selectedAgent, setSelectedAgent] = useState<string>("aoc");
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    aoc: [],
    anna: [],
  });
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string) => {
    setIsLoading(true);
    setMessages((prev) => ({
      ...prev,
      [selectedAgent]: [...prev[selectedAgent], { role: "user", content: message }],
    }));

    try {
      const response = await fetch(`/api/letta/${selectedAgent}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok || !response.body) throw new Error("Failed to send message");

      const reader = response.body.getReader();
      let assistantMessage = "";
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        chunk
          .split("\n")
          .forEach((line) => {
            if (line.startsWith("data:")) {
              assistantMessage += line.replace(/^data:\s*/, "");
            }
          });
      }

      setMessages((prev) => ({
        ...prev,
        [selectedAgent]: [
          ...prev[selectedAgent],
          { role: "assistant", content: assistantMessage },
        ],
      }));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentMessages = messages[selectedAgent] || [];

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Agent Selector */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Letta Agents</h2>
        <div className="flex gap-4">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setSelectedAgent(agent.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedAgent === agent.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {agent.name}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="border rounded-lg h-96 flex flex-col">
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {currentMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}
            >
              <div
                className={`inline-block p-3 rounded-lg max-w-xs ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && <div className="text-gray-500">Agent is thinking...</div>}
        </div>

        {/* Input */}
        <div className="border-t p-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Type a message to ${
              agents.find((a) => a.id === selectedAgent)?.name
            }...`}
            className="flex-1 border rounded px-3 py-2"
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) {
                sendMessage(input.trim());
                setInput("");
              }
            }}
          />
          <button
            onClick={() => {
              if (input.trim()) {
                sendMessage(input.trim());
                setInput("");
              }
            }}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

