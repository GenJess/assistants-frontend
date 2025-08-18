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
  const [snapshots, setSnapshots] = useState<string[]>([]);

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

  useEffect(() => {
    const fetchSnapshots = async () => {
      try {
        const res = await fetch("/api/blob/list?prefix=aevo/");
        if (!res.ok) return;
        const data = await res.json();
        const list: string[] = (data.blobs || []).map(
          (b: any) =>
            `https://i13543ak1qmumggz.public.blob.vercel-storage.com/${b.pathname}`
        );
        setSnapshots(list);
      } catch {
        // ignore
      }
    };
    fetchSnapshots();
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
      <main className="mx-auto max-w-3xl p-4">
        <h1 className="mb-4 text-2xl font-bold">Aevo Copy Trader Feed</h1>
        <p className="text-sm text-gray-500">No trades available</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Aevo Copy Trader Feed</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        {trades.map((t) => (
          <div key={t.trade_id} className="rounded border p-4">
            <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
              <span className="break-all">{formatAddress(t.address)}</span>
              <span>{t.is_long ? "Long" : "Short"}</span>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <span className="font-medium">{t.asset}</span>
              <span className="text-gray-500">Price {t.exit_price}</span>
              <span className="text-gray-500">Size {t.amount}</span>
              <span className={t.pnl >= 0 ? "text-green-600" : "text-red-600"}>
                PnL {t.pnl.toFixed(4)}
              </span>
            </div>
          </div>
        ))}
      </div>
      {snapshots.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-2 text-lg font-semibold">Snapshots</h2>
          <ul className="space-y-1 text-sm">
            {snapshots.map((url) => (
              <li key={url}>
                <a
                  href={url}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {url.split("/").pop()}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default AevoCopyTraderPage;

