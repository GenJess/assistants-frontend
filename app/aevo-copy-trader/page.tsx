"use client";

import { useEffect, useState } from "react";

type Trade = {
  trade_id: string;
  address: string;
  asset: string;
  amount: string;
  entry_price: string;
  exit_price: string;
  pnl: number;
  is_long: boolean;
};

const formatAddress = (addr: string) => `${addr.slice(0, 6)}…${addr.slice(-4)}`;

const AevoCopyTraderPage = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/aevo-copy-trader");
        if (!res.ok) {
          setError(`API error: ${res.status}`);
          setTrades([]);
          return;
        }
        const data = await res.json();
        const list: Trade[] = data.trades ?? [];
        setTrades(list);
        setError(null);
      } catch {
        setError("Failed to fetch trades");
        setTrades([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
    const id = setInterval(fetchTrades, 5000);
    return () => clearInterval(id);
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-2xl p-4">
        <h1 className="mb-4 text-2xl font-bold">Aevo Copy Trader Feed</h1>
        <p className="text-sm text-gray-500">Loading trades...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-2xl p-4">
        <h1 className="mb-4 text-2xl font-bold">Aevo Copy Trader Feed</h1>
        <p className="text-sm text-red-600">Error: {error}</p>
      </main>
    );
  }

  if (!trades.length) {
    return (
      <main className="mx-auto max-w-2xl p-4">
        <h1 className="mb-4 text-2xl font-bold">Aevo Copy Trader Feed</h1>
        <p className="text-sm text-gray-500">No trades available</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Aevo Copy Trader Feed</h1>
      <ul className="divide-y divide-gray-200">
        {trades.map((t) => (
          <li
            key={t.trade_id}
            className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="break-all text-xs text-gray-500">
              {formatAddress(t.address)}
            </span>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium">
                {t.is_long ? "Long" : "Short"} {t.asset}
              </span>
              <span className="text-gray-500">@ {t.exit_price}</span>
              <span className="text-gray-500">size {t.amount}</span>
              <span className={t.pnl >= 0 ? "text-green-600" : "text-red-600"}>
                pnl {t.pnl.toFixed(4)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default AevoCopyTraderPage;

