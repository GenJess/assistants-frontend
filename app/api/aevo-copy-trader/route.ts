import { NextResponse } from "next/server";
import { saveJson } from "@/utils/blob";
import { Redis } from "@upstash/redis";

const TRADES_FEED_URL = "https://api.degen.aevo.xyz/public-trade-history";
const CACHE_KEY = "aevo:trades";
const SNAPSHOT_KEY = "aevo:last_snapshot_ms";
const SNAPSHOT_INTERVAL_MS = 60 * 60 * 1000;

let redis: Redis | null = null;
try {
  redis = Redis.fromEnv();
} catch {
  console.warn("Redis env vars missing; running without cache");
}

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const saveParam = new URL(req.url).searchParams.get("save");
  const saveEnabled = saveParam === "1";

  try {
    if (redis) {
      const cached = await redis.get(CACHE_KEY);
      if (cached) {
        return NextResponse.json(cached);
      }
    }

    const res = await fetch(TRADES_FEED_URL, { cache: "no-store" });
    if (!res.ok) {
      console.error("Aevo API error status:", res.status);
      return NextResponse.json(
        { error: "Failed to fetch trades" },
        { status: res.status }
      );
    }
    const data = await res.json();

    if (redis) {
      await redis.set(CACHE_KEY, data, { ex: 3600 });

      if (saveEnabled) {
        const last = await redis.get<number>(SNAPSHOT_KEY);
        const now = Date.now();
        if (!last || now - last > SNAPSHOT_INTERVAL_MS) {
          await saveJson(`aevo/trades-${now}.json`, data);
          await redis.set(SNAPSHOT_KEY, now);
        }
      }
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Aevo API fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch trades" },
      { status: 500 }
    );
  }
}
