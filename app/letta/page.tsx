"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export type Message = { role: "agent" | "user"; content: string };

export default function LettaPage() {
  const [agentId, setAgentId] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [rawOutput, setRawOutput] = useState<string>("");

  const send = async () => {
    if (!input.trim() || !agentId.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    try {
      const res = await fetch("/api/letta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId, message: userMsg.content }),
      });
      const data = await res.json();
      const reply = data?.reply || data?.error || "No response";
      setMessages((m) => [...m, { role: "agent", content: reply }]);
      setRawOutput(JSON.stringify(data.raw, null, 2));
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "agent", content: "Error contacting agent" },
      ]);
    }
  };

  const newThread = async () => {
    if (agentId.trim()) {
      await fetch("/api/letta", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId }),
      });
    }
    setMessages([]);
    setRawOutput("");
  };

  return (
    <main className="mx-auto max-w-5xl p-4 space-y-4">
      <h1 className="text-2xl font-bold">Letta Chat</h1>
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <input
          type="text"
          placeholder="Agent ID"
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />
        <Button variant="secondary" onClick={newThread}>
          New Thread
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col h-[60vh] border rounded">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-2 max-w-[80%]",
                    m.role === "user" && "ml-auto"
                  )}
                >
                  {m.role === "agent" && (
                    <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
                  )}
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea
                placeholder="Type a message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[44px] max-h-32"
              />
              <Button onClick={send} className="px-8">
                Send
              </Button>
            </div>
          </div>
        </div>
        <div className="h-[60vh] border rounded p-4 overflow-auto">
          <h2 className="font-semibold mb-2">Agent Canvas</h2>
          <pre className="text-xs whitespace-pre-wrap">{rawOutput}</pre>
        </div>
      </div>
    </main>
  );
}

