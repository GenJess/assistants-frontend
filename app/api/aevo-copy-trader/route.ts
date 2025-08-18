import { NextResponse } from "next/server";
import { saveJson } from "@/utils/blob";

const TRADES_FEED_URL = "https://api.degen.aevo.xyz/public-trade-history";

export async function GET() {
  try {
    const res = await fetch(TRADES_FEED_URL, { cache: "no-store" });

    if (!res.ok) {
      console.error("Aevo API error status:", res.status);
      return NextResponse.json(
        { error: "Failed to fetch trades" },
        { status: res.status }
      );
    }

    const data = await res.json();
    await saveJson(`aevo/trades-${Date.now()}.json`, data);
    return NextResponse.json(data);
  } catch (err) {
    console.error("Aevo API fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch trades" },
      { status: 500 }
    );
  }
}
