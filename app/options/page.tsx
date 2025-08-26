"use client";

import { useEffect, useState } from 'react';

type Contract = {
  type: string;
  strike: number;
  bid: number | null;
  ask: number | null;
  volume: number | null;
  openInterest: number | null;
  impliedVolatility: number | null;
};

const providers = [
  { value: 'yahoo', label: 'Yahoo' },
  { value: 'tradier', label: 'Tradier' },
  { value: 'alphavantage', label: 'Alpha Vantage' },
];

export default function OptionsPage() {
  const [symbol, setSymbol] = useState('AAPL');
  const [provider, setProvider] = useState('yahoo');
  const [expiries, setExpiries] = useState<string[]>([]);
  const [expiry, setExpiry] = useState('');
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setExpiry('');
      setContracts([]);
      try {
        const res = await fetch(`/api/options/expiries?symbol=${symbol}&provider=${provider}`);
        const json = await res.json();
        setExpiries(json.expiries || []);
        if (json.expiries && json.expiries.length) {
          setExpiry(json.expiries[0]);
        }
      } catch {
        setExpiries([]);
      }
    };
    load();
  }, [symbol, provider]);

  useEffect(() => {
    const load = async () => {
      if (!expiry) return;
      try {
        const res = await fetch(`/api/options/chain?symbol=${symbol}&expiry=${expiry}&provider=${provider}`);
        const json = await res.json();
        setContracts(json.contracts || []);
      } catch {
        setContracts([]);
      }
    };
    load();
  }, [expiry, provider, symbol]);

  const ask = async () => {
    setLoading(true);
    setAnswer('');
    try {
      const res = await fetch('/api/options/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, symbol, expiry, provider }),
      });
      const json = await res.json();
      setAnswer(json.answer || json.error || '');
    } catch {
      setAnswer('Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Options Chain Explorer</h1>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          className="border px-2 py-1"
          placeholder="Ticker"
        />
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="border px-2 py-1"
        >
          {providers.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <select
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          className="border px-2 py-1"
        >
          {expiries.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2">Type</th>
              <th className="border px-2">Strike</th>
              <th className="border px-2">Bid</th>
              <th className="border px-2">Ask</th>
              <th className="border px-2">Vol</th>
              <th className="border px-2">OI</th>
              <th className="border px-2">IV%</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c, idx) => (
              <tr key={idx}>
                <td className="border px-2 text-center">{c.type}</td>
                <td className="border px-2 text-right">{c.strike}</td>
                <td className="border px-2 text-right">{c.bid ?? '-'}</td>
                <td className="border px-2 text-right">{c.ask ?? '-'}</td>
                <td className="border px-2 text-right">{c.volume ?? '-'}</td>
                <td className="border px-2 text-right">{c.openInterest ?? '-'}</td>
                <td className="border px-2 text-right">{c.impliedVolatility ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <h2 className="mb-2 font-semibold">Ask the AI</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-grow border px-2 py-1"
            placeholder="Question about this chain"
          />
          <button
            onClick={ask}
            disabled={loading}
            className="rounded bg-blue-600 px-3 py-1 text-white disabled:opacity-50"
          >
            Ask
          </button>
        </div>
        {answer && <p className="mt-2 whitespace-pre-wrap text-sm">{answer}</p>}
      </div>
    </main>
  );
}
