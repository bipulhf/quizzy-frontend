"use client";

import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    // Create payment intent on the server
    const res = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const { clientSecret } = await res.json();

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            setError(error.message || 'An unexpected error occurred.');
        } else {
            // Payment successful
            console.log('Payment successful:', paymentIntent);
        }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (in credits)</label>
            <input 
                type="number" 
                id="amount" 
                value={amount} 
                onChange={(e) => setAmount(Number(e.target.value))} 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                min="1"
            />
        </div>
      <CardElement />
      <button type="submit" disabled={!stripe || processing} className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        {processing ? 'Processing...' : `Pay $${amount}`}
      </button>
      {error && <div className="mt-2 text-red-600">{error}</div>}
    </form>
  );
};

export default PaymentForm;
