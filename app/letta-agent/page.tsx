"use client";

import { useState } from "react";
import ChatInterface from "./chat-interface";

interface Agent {
  name: string;
  id: string;
}

const LettaAgentPage = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const addAgent = () => {
    if (!name.trim() || !id.trim()) return;
    setAgents((a) => [...a, { name: name.trim(), id: id.trim() }]);
    setName("");
    setId("");
  };

  const removeAgent = (agentId: string) => {
    setAgents((a) => a.filter((ag) => ag.id !== agentId));
  };

  return (
    <main className="container mx-auto max-w-4xl p-4 space-y-8">
      <h1 className="mb-4 text-2xl font-bold">Letta Agents</h1>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          placeholder="Agent name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
        <input
          type="text"
          placeholder="Agent ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
        <button
          onClick={addAgent}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Add
        </button>
      </div>
      {agents.map((agent) => (
        <section key={agent.id} className="pt-8">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xl font-semibold">{agent.name}</h2>
            <button
              onClick={() => removeAgent(agent.id)}
              className="text-sm text-red-600"
            >
              Remove
            </button>
          </div>
          <ChatInterface agentId={agent.id} />
        </section>
      ))}
    </main>
  );
};

export default LettaAgentPage;
