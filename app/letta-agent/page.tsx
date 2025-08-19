import LettaChat from "./letta-chat";

const LettaAgentPage = () => {
  const apiKey = process.env.LETTA_API_KEY;
  const agentId = process.env.LETTA_AGENT_ID;
  if (!apiKey || !agentId) {
    return (
      <main className="mx-auto max-w-2xl p-4">
        <h1 className="mb-4 text-2xl font-bold">Letta Agent</h1>
        <p className="text-red-600">Missing LETTA_API_KEY or LETTA_AGENT_ID.</p>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-2xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Letta Agent</h1>
      <LettaChat />
    </main>
  );
};

export default LettaAgentPage;
