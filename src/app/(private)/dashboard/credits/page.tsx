"use client";

import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '@/components/credits/PaymentForm';
import CreditBalance from '@/components/credits/CreditBalance';
import PaymentHistory from '@/components/credits/PaymentHistory';

// Make sure to add your publishable key to your .env.local file
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CreditsPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Manage Your Credits</h1>
      
      <CreditBalance />

      <p className="text-lg mb-8">You can purchase more credits below.</p>
      <div className="max-w-md mx-auto">
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </div>

      <PaymentHistory />
    </div>
  );
};

export default CreditsPage;
