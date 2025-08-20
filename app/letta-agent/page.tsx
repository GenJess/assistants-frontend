import ChatInterface from "./chat-interface";

const LettaAgentPage = () => {
  return (
    <main className="mx-auto max-w-4xl p-4 space-y-8">
      <h1 className="mb-4 text-2xl font-bold">Letta Agents</h1>
      <section>
        <h2 className="mb-2 text-xl font-semibold">AOC</h2>
        <ChatInterface agent="aoc" />
      </section>
      <section className="pt-8">
        <h2 className="mb-2 text-xl font-semibold">ANNA</h2>
        <ChatInterface agent="anna" />
      </section>
    </main>
  );
};

export default LettaAgentPage;
