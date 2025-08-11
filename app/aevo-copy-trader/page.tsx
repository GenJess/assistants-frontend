"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

interface Trade {
  account?: string;
  user?: string;
  symbol?: string;
  asset?: string;
  side?: string;
  direction?: string;
  size?: number;
  amount?: number;
  price?: number;
  execution_price?: number;
  timestamp?: string;
  executed_at?: string;
}

export default function AevoCopyTraderPage() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mockTrades: Trade[] = [
    {
      account: "0x1234...abcd",
      symbol: "BTC",
      side: "buy",
      price: 50000,
      size: 1,
    },
  ];

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/aevo-copy-trader");
        console.log("API Response Status:", res.status);
        const data = await res.json();
        console.log("API Response Data:", data);
        if (!res.ok) {
          setError(`API Error: ${res.status}`);
          return;
        }
        const list = data.trades || data.items || data.data || [];
        console.log("Parsed trades:", list);
        setTrades(list);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch trades");
        setTrades(mockTrades);
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
    const id = setInterval(fetchTrades, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Aevo Copy Trader Feed</h1>
      {loading && <p className={styles.message}>Loading trades...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      {!loading && !error && trades.length === 0 && (
        <p className={styles.message}>No trades available</p>
      )}
      {!loading && !error && trades.length > 0 && (
        <ul className={styles.list}>
          {trades.map((t, i) => (
            <li key={i} className={styles.item}>
              <span className={styles.account}>{t.account || t.user}</span>
              <span className={styles.action}>
                {t.side || t.direction} {t.symbol || t.asset}
              </span>
              <span className={styles.price}>@ {t.price || t.execution_price}</span>
              <span className={styles.size}>size {t.size || t.amount}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
