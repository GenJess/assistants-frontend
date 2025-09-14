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
    const first = response?.messages?.[0] as any;
    let reply = "No response";
    if (first) {
      if (Array.isArray(first.content)) {
        const textPart = first.content.find(
          (c: any) => c.type === "text"
        );
        if (typeof textPart?.text === "string") {
          reply = textPart.text;
        }
      } else if (typeof first.reasoning === "string") {
        reply = first.reasoning;
      }
    }
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
