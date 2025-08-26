const AV_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const TRADIER_TOKEN = process.env.TRADIER_TOKEN;

export interface OptionContract {
  type: 'call' | 'put';
  strike: number;
  bid: number | null;
  ask: number | null;
  volume: number | null;
  openInterest: number | null;
  impliedVolatility: number | null;
}

function toYMD(date: Date): string {
  const yr = date.getUTCFullYear();
  const mo = String(date.getUTCMonth() + 1).padStart(2, '0');
  const da = String(date.getUTCDate()).padStart(2, '0');
  return `${yr}-${mo}-${da}`;
}

async function fetchYahoo(symbol: string, expiry?: string) {
  const base = `https://query1.finance.yahoo.com/v7/finance/options/${encodeURIComponent(symbol)}`;
  const url = expiry ? `${base}?date=${Math.floor(new Date(expiry + 'T00:00:00Z').getTime() / 1000)}` : base;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Yahoo request failed');
  const json = await res.json();
  const result = json?.optionChain?.result?.[0];
  if (!result) return { expiries: [], chain: [] };
  const expiries: string[] = (result.expirationDates || []).map((ts: number) => toYMD(new Date(ts * 1000)));
  const options = result.options?.[0];
  const chain: OptionContract[] = [];
  if (options) {
    const calls = options.calls || [];
    const puts = options.puts || [];
    for (const c of calls) {
      chain.push({
        type: 'call',
        strike: c.strike,
        bid: c.bid ?? null,
        ask: c.ask ?? null,
        volume: c.volume ?? null,
        openInterest: c.openInterest ?? null,
        impliedVolatility: c.impliedVolatility != null ? Number((c.impliedVolatility * 100).toFixed(2)) : null,
      });
    }
    for (const p of puts) {
      chain.push({
        type: 'put',
        strike: p.strike,
        bid: p.bid ?? null,
        ask: p.ask ?? null,
        volume: p.volume ?? null,
        openInterest: p.openInterest ?? null,
        impliedVolatility: p.impliedVolatility != null ? Number((p.impliedVolatility * 100).toFixed(2)) : null,
      });
    }
  }
  return { expiries, chain };
}

async function fetchTradier(symbol: string, expiry?: string) {
  if (!TRADIER_TOKEN) throw new Error('TRADIER_TOKEN not set');
  if (!expiry) {
    const url = `https://api.tradier.com/v1/markets/options/expirations?symbol=${encodeURIComponent(symbol)}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${TRADIER_TOKEN}`, Accept: 'application/json' }, cache: 'no-store' });
    if (!res.ok) throw new Error('Tradier expiries failed');
    const json = await res.json();
    const expiries: string[] = json?.expirations?.date || [];
    return { expiries, chain: [] };
  }
  const url = `https://api.tradier.com/v1/markets/options/chains?symbol=${encodeURIComponent(symbol)}&expiration=${expiry}&greeks=true`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${TRADIER_TOKEN}`, Accept: 'application/json' }, cache: 'no-store' });
  if (!res.ok) throw new Error('Tradier chain failed');
  const json = await res.json();
  const options = json?.options?.option || [];
  const chain: OptionContract[] = options.map((o: any) => ({
    type: o.option_type,
    strike: o.strike,
    bid: o.bid ?? null,
    ask: o.ask ?? null,
    volume: o.volume ?? null,
    openInterest: o.open_interest ?? null,
    impliedVolatility: o.greeks?.mid_iv != null ? Number((o.greeks.mid_iv * 100).toFixed(2)) : null,
  }));
  return { expiries: [], chain };
}

async function fetchAlpha(symbol: string, expiry?: string) {
  if (!AV_KEY) throw new Error('ALPHA_VANTAGE_API_KEY not set');
  const url = `https://www.alphavantage.co/query?function=OPTIONS_CHAIN&symbol=${encodeURIComponent(symbol)}&apikey=${AV_KEY}`;
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Alpha Vantage request failed');
  const json = await res.json();
  const data = json?.data || {};
  const expiries = Object.keys(data);
  if (!expiry) {
    return { expiries, chain: [] };
  }
  const expData = data[expiry];
  const chain: OptionContract[] = [];
  if (expData) {
    const calls = expData.call || [];
    const puts = expData.put || [];
    for (const c of calls) {
      chain.push({
        type: 'call',
        strike: Number(c.strikePrice),
        bid: c.bid ?? null,
        ask: c.ask ?? null,
        volume: c.volume ?? null,
        openInterest: c.openInterest ?? null,
        impliedVolatility: c.impliedVolatility != null ? Number(c.impliedVolatility) : null,
      });
    }
    for (const p of puts) {
      chain.push({
        type: 'put',
        strike: Number(p.strikePrice),
        bid: p.bid ?? null,
        ask: p.ask ?? null,
        volume: p.volume ?? null,
        openInterest: p.openInterest ?? null,
        impliedVolatility: p.impliedVolatility != null ? Number(p.impliedVolatility) : null,
      });
    }
  }
  return { expiries, chain };
}

export async function fetchExpiries(symbol: string, provider: string): Promise<string[]> {
  switch (provider) {
    case 'tradier':
      return (await fetchTradier(symbol)).expiries;
    case 'alpha':
    case 'alphavantage':
      return (await fetchAlpha(symbol)).expiries;
    case 'yahoo':
    default:
      return (await fetchYahoo(symbol)).expiries;
  }
}

export async function fetchChain(symbol: string, expiry: string, provider: string): Promise<OptionContract[]> {
  switch (provider) {
    case 'tradier':
      return (await fetchTradier(symbol, expiry)).chain;
    case 'alpha':
    case 'alphavantage':
      return (await fetchAlpha(symbol, expiry)).chain;
    case 'yahoo':
    default:
      return (await fetchYahoo(symbol, expiry)).chain;
  }
}
