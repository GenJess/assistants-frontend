import { NextResponse } from "next/server";
import { LettaClient } from "@letta-ai/letta-client";
import { saveJson } from "@/utils/blob";

const apiKey = process.env.LETTA_API_KEY;

export const dynamic = "force-dynamic";

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
  try {
    const { messages } = await req.json();
    const last = messages[messages.length - 1];
    const client = new LettaClient({ token: apiKey });
    const response = await client.agents.messages.create(params.agent, {
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: last.content }],
        },
      ],
    });
    const reply =
      response?.messages?.[0]?.content?.[0]?.text || "No response";
    await saveJson(
      `letta/${params.agent}-${Date.now()}.json`,
      [...messages, { role: "agent", content: reply }]
    );
    return NextResponse.json(response);
  } catch (err) {
    console.error("Letta API error:", err);
    return NextResponse.json(
      { error: "Failed to contact Letta" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  if (!apiKey) {
    return NextResponse.json(
      { error: "Letta API key missing" },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true });
}
