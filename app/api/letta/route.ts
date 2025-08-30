import { NextResponse } from "next/server";
import { LettaClient } from "@letta-ai/letta-client";

const apiKey = process.env.LETTA_KEY;

export async function POST(req: Request) {
  if (!apiKey) {
    return NextResponse.json({ error: "Letta API key missing" }, { status: 500 });
  }
  try {
    const { agentId, message } = await req.json();
    if (!agentId) {
      return NextResponse.json({ error: "Missing agent ID" }, { status: 400 });
    }
    const client = new LettaClient({ token: apiKey });
    const response = await client.agents.messages.create(agentId, {
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: message }],
        },
      ],
    });
    const reply = response?.messages?.[0]?.content?.[0]?.text ?? "";
    return NextResponse.json({ reply, raw: response });
  } catch (err) {
    console.error("Letta API error:", err);
    return NextResponse.json(
      { error: "Failed to contact Letta" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  if (!apiKey) {
    return NextResponse.json({ error: "Letta API key missing" }, { status: 500 });
  }
  try {
    const { agentId } = await req.json();
    if (!agentId) {
      return NextResponse.json({ error: "Missing agent ID" }, { status: 400 });
    }
    const client = new LettaClient({ token: apiKey });
    await client.agents.messages.reset(agentId);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Letta API reset error:", err);
    return NextResponse.json(
      { error: "Failed to reset agent" },
      { status: 500 }
    );
  }
}

