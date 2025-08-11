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

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const res = await fetch("/api/aevo-copy-trader");
        if (!res.ok) return;
        const data = await res.json();
        const list = data.trades || data.items || data.data || [];
        setTrades(list);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrades();
    const id = setInterval(fetchTrades, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Aevo Copy Trader Feed</h1>
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
    </main>
  );
}
