"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export type Message = { role: "agent" | "user"; content: string };

export default function ChatInterface({ agent }: { agent: string }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    try {
      const res = await fetch(`/api/letta-agent/${agent}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content }),
      });
      const data = await res.json();
      const reply =
        data?.messages?.[0]?.content?.[0]?.text || data?.error || "No response";
      setMessages((m) => [...m, { role: "agent", content: reply }]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "agent", content: "Error contacting agent" },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn("flex gap-2 max-w-[80%]", m.role === "user" && "ml-auto")}
            >
              {m.role === "agent" && (
                <div className="h-8 w-8 rounded-full bg-primary flex-shrink-0" />
              )}
              <div className="space-y-2">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                </div>
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
  );
}
