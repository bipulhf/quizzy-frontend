import { NextResponse } from 'next/server';

export async function GET() {
  // This should be your backend URL
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';

  try {
    const res = await fetch(`${backendUrl}/credits/balance`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // You might need to add an authorization header here
        // 'Authorization': `Bearer ${token}`
      },
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json({ error: error.detail || 'Failed to fetch credit balance' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
