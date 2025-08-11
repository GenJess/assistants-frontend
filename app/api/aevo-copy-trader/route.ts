import { NextResponse } from "next/server";

const TRADES_FEED_URL = "https://api.aevo.xyz/v1/trades/recent";

export async function GET() {
  try {
    const res = await fetch(TRADES_FEED_URL, {
      headers: {
        Accept: "application/json",
        Origin: "https://degen.aevo.xyz",
        Referer: "https://degen.aevo.xyz/",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Aevo API error status:", res.status);
      return NextResponse.json(
        { error: "Failed to fetch trades" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Aevo API fetch failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch trades" },
      { status: 500 }
    );
  }
}
