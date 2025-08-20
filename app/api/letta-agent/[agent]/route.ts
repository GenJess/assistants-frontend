import { NextResponse } from "next/server";
import { LettaClient } from "@letta-ai/letta-client";

const apiKey = process.env.LETTA_API_KEY;

export const dynamic = "force-dynamic";

const agentMap: Record<string, string | undefined> = {
  aoc: process.env.LETTA_AGENT_ID_AOC,
  anna: process.env.LETTA_AGENT_ID_ANNA,
};

export async function POST(
  req: Request,
  { params }: { params: { agent: string } }
) {
  if (!apiKey) {
    return NextResponse.json(
      { error: "Letta API key missing" },
      { status: 500 }
    );
  }
  const agentId = agentMap[params.agent.toLowerCase()];
  if (!agentId) {
    return NextResponse.json(
      { error: "Unknown agent" },
      { status: 404 }
    );
  }
  try {
    const { message } = await req.json();
    const client = new LettaClient({ token: apiKey });
    const response = await client.agents.messages.create(agentId, {
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: message }],
        },
      ],
    });
    return NextResponse.json(response);
  } catch (err) {
    console.error("Letta API error:", err);
    return NextResponse.json(
      { error: "Failed to contact Letta" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { agent: string } }
) {
  if (!apiKey) {
    return NextResponse.json(
      { error: "Letta API key missing" },
      { status: 500 }
    );
  }
  const agentId = agentMap[params.agent.toLowerCase()];
  if (!agentId) {
    return NextResponse.json(
      { error: "Unknown agent" },
      { status: 404 }
    );
  }
  return NextResponse.json({ ok: true });
}
