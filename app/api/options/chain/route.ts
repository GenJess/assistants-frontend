import { NextRequest, NextResponse } from 'next/server';
import { fetchChain } from '@/lib/options';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get('symbol');
  const expiry = searchParams.get('expiry');
  const provider = searchParams.get('provider') ?? 'yahoo';
  if (!symbol || !expiry) {
    return NextResponse.json({ error: 'symbol and expiry are required' }, { status: 400 });
  }
  try {
    const contracts = await fetchChain(symbol, expiry, provider);
    return NextResponse.json({ symbol, expiry, provider, contracts });
  } catch (e) {
    return NextResponse.json({ error: 'failed to fetch chain' }, { status: 500 });
  }
}
