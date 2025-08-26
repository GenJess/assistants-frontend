import { NextRequest, NextResponse } from 'next/server';
import { fetchExpiries } from '@/lib/options';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get('symbol');
  const provider = searchParams.get('provider') ?? 'yahoo';
  if (!symbol) {
    return NextResponse.json({ error: 'symbol is required' }, { status: 400 });
  }
  try {
    const expiries = await fetchExpiries(symbol, provider);
    return NextResponse.json({ symbol, provider, expiries });
  } catch (e) {
    return NextResponse.json({ error: 'failed to fetch expiries' }, { status: 500 });
  }
}
