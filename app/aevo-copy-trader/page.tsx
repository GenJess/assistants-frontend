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
  exit_created_timestamp: number;
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
        const res = await fetch(`/api/aevo-copy-trader`);
        console.log("API Response Status:", res.status);
        const data = await res.json();
        console.log("API Response Data:", data);
        if (!res.ok) {
          setError(`API error: ${res.status}`);
          setTrades([]);
          return;
        }
        const list: Trade[] = data.trades ?? [];
        console.log("Parsed trades:", list);
        setTrades(list);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
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
      <main className="container mx-auto max-w-2xl p-4">
        <h1 className="mb-4 text-2xl font-bold">Aevo Copy Trader Feed</h1>
        <p className="text-sm text-gray-500">Loading trades...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto max-w-2xl p-4">
        <h1 className="mb-4 text-2xl font-bold">Aevo Copy Trader Feed</h1>
        <p className="text-sm text-red-600">Error: {error}</p>
      </main>
    );
  }

  if (!trades.length) {
    return (
      <main className="container mx-auto max-w-3xl p-4">
        <h1 className="mb-4 text-2xl font-bold">Aevo Copy Trader Feed</h1>
        <p className="text-sm text-gray-500">No trades available</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-3xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Aevo Copy Trader Feed</h1>
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th className="border px-2 py-1 text-left">Time</th>
              <th className="border px-2 py-1 text-left">Asset</th>
              <th className="border px-2 py-1 text-left">Side</th>
              <th className="border px-2 py-1 text-right">Price</th>
              <th className="border px-2 py-1 text-right">Size</th>
              <th className="border px-2 py-1 text-right">PnL</th>
              <th className="border px-2 py-1 text-left">Address</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((t) => (
              <tr key={t.trade_id} className="odd:bg-gray-50">
                <td className="border px-2 py-1">
                  {new Date(t.exit_created_timestamp / 1_000_000).toLocaleTimeString()}
                </td>
                <td className="border px-2 py-1">{t.asset}</td>
                <td className="border px-2 py-1">{t.is_long ? "Long" : "Short"}</td>
                <td className="border px-2 py-1 text-right">{t.exit_price}</td>
                <td className="border px-2 py-1 text-right">{t.amount}</td>
                <td
                  className={`border px-2 py-1 text-right ${
                    t.pnl >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.pnl.toFixed(4)}
                </td>
                <td className="border px-2 py-1 break-all">
                  {formatAddress(t.address)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="sm:hidden">
        {trades.map((t) => (
          <details key={t.trade_id} className="mb-2 rounded border p-2">
            <summary className="flex justify-between text-sm">
              <span>{t.asset}</span>
              <span>{t.is_long ? "Long" : "Short"}</span>
            </summary>
            <div className="mt-2 text-xs">
              <div>Time: {new Date(t.exit_created_timestamp / 1_000_000).toLocaleTimeString()}</div>
              <div>Price: {t.exit_price}</div>
              <div>Size: {t.amount}</div>
              <div className={t.pnl >= 0 ? "text-green-600" : "text-red-600"}>
                PnL: {t.pnl.toFixed(4)}
              </div>
              <div className="break-all">Addr: {formatAddress(t.address)}</div>
            </div>
          </details>
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

