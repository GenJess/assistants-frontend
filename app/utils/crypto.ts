export interface PricePoint {
  time: number; // Unix timestamp in milliseconds
  price: number;
}

export interface Trade {
  timestamp: number; // Unix timestamp in seconds
  amount: number;
  price: number;
}

export interface TradeAnalysis {
  trade: Trade;
  marketPrice: number;
  difference: number;
}

export async function fetchHistoricalPrices(
  coinId: string,
  from: number,
  to: number,
  vsCurrency = "usd"
): Promise<PricePoint[]> {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=${vsCurrency}&from=${from}&to=${to}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch price data: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return (data.prices || []).map(([time, price]: [number, number]) => ({ time, price }));
}

function findClosestPrice(prices: PricePoint[], time: number): number {
  let closest = prices[0].price;
  let minDiff = Math.abs(prices[0].time - time * 1000); // prices time in ms
  for (const p of prices) {
    const diff = Math.abs(p.time - time * 1000);
    if (diff < minDiff) {
      minDiff = diff;
      closest = p.price;
    }
  }
  return closest;
}

export async function analyzeTradeTiming(
  coinId: string,
  trades: Trade[],
  vsCurrency = "usd"
): Promise<TradeAnalysis[]> {
  if (trades.length === 0) return [];
  const from = Math.min(...trades.map((t) => t.timestamp));
  const to = Math.max(...trades.map((t) => t.timestamp));
  const prices = await fetchHistoricalPrices(coinId, from, to, vsCurrency);
  return trades.map((trade) => {
    const marketPrice = findClosestPrice(prices, trade.timestamp);
    return {
      trade,
      marketPrice,
      difference: trade.price - marketPrice,
    };
  });
}
