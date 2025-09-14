import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const TRADES_FEED_URL = "https://api.degen.aevo.xyz/public-trade-history";
const CACHE_KEY = "aevo:trades";

let redis: Redis | null = null;
try {
  redis = Redis.fromEnv();
} catch {
  console.warn("Redis env vars missing; running without cache");
}

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
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
