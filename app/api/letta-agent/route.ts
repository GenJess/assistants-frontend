import { NextResponse } from "next/server";
import { LettaClient } from "@letta-ai/letta-client";

const apiKey = process.env.LETTA_API_KEY;
const agentId = process.env.LETTA_AGENT_ID;

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!apiKey || !agentId) {
    return NextResponse.json(
      { error: "Letta environment variables missing" },
      { status: 500 }
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

export async function GET() {
  if (!apiKey || !agentId) {
    return NextResponse.json(
      { error: "Letta environment variables missing" },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}
