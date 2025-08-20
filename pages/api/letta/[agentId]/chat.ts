import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { agentId } = req.query;
  const { message } = req.body;

  const validAgents: Record<string, string | undefined> = {
    aoc: process.env.LETTA_AGENT_ID_AOC,
    anna: process.env.LETTA_AGENT_ID_ANNA,
  };

  const actualAgentId = validAgents[String(agentId)];
  if (!actualAgentId) {
    return res.status(400).json({ error: "Invalid agent ID" });
  }

  try {
    const response = await fetch(
      `${process.env.LETTA_BASE_URL}/v1/agents/${actualAgentId}/messages/stream`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.LETTA_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
          stream_steps: true,
          stream_tokens: true,
        }),
      }
    );

    if (!response.ok || !response.body) {
      throw new Error(`Letta API error: ${response.status}`);
    }

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    response.body.on("data", (chunk: Buffer) => {
      res.write(chunk);
    });
    response.body.on("end", () => {
      res.end();
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return res.status(500).json({ error: "Failed to communicate with agent" });
  }
}

