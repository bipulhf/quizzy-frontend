import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { amount } = await request.json();

  // This should be your backend URL
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000';

  try {
    const res = await fetch(`${backendUrl}/payments/create-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You might need to add an authorization header here
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ amount }),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json({ error: error.detail || 'Failed to create payment intent' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
