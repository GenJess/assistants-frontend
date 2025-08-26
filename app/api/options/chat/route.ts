import { NextRequest, NextResponse } from 'next/server';
import { fetchChain } from '@/lib/options';

async function callGemini(question: string, context: string): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY not set');
  const body = {
    contents: [
      {
        role: 'user',
        parts: [{ text: `${context}\n\nQuestion: ${question}` }],
      },
    ],
  };
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  );
  if (!res.ok) throw new Error('Gemini API error');
  const json = await res.json();
  const text =
    json?.candidates?.[0]?.content?.parts?.[0]?.text?.toString().trim() || '';
  return text;
}

export async function POST(req: NextRequest) {
  const { question, symbol, expiry, provider } = await req.json();
  if (!question || !symbol || !expiry) {
    return NextResponse.json({ error: 'missing params' }, { status: 400 });
  }
  try {
    const chain = await fetchChain(symbol, expiry, provider ?? 'yahoo');
    const context = chain
      .slice(0, 20)
      .map(
        (c) =>
          `${c.type} ${c.strike} bid ${c.bid} ask ${c.ask} oi ${c.openInterest} iv ${c.impliedVolatility}`
      )
      .join('\n');
    const answer = await callGemini(
      question,
      `Options data for ${symbol} ${expiry}:\n${context}`
    );
    return NextResponse.json({ answer });
  } catch (e) {
    return NextResponse.json({ error: 'failed to get answer' }, { status: 500 });
  }
}
