// File: src/app/api/feeling/[feel]/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Get pathname: /api/feeling/sad → extract 'sad'
  const feel = request.nextUrl.pathname.split('/').pop();

  if (!feel) {
    return NextResponse.json({ error: 'No emotion provided' }, { status: 400 });
  }

  try {
    const response = await fetch('http://localhost:3001/api/feeling');
    const res = await response.json();

    const emotions = res.emotions?.emotions || [];

    const emo = emotions.find(
      (emotion: { emotion: string }) =>
        emotion.emotion.toLowerCase() === feel.toLowerCase()
    );

    if (!emo) {
      return NextResponse.json({ error: 'Emotion not found' }, { status: 404 });
    }

    return NextResponse.json(emo);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
