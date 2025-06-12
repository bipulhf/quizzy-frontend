"use client";

import React, { useState, useEffect } from 'react';

const CreditBalance = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch('/api/credits/balance');
        if (res.ok) {
          const data = await res.json();
          setBalance(data.credits);
        }
      } catch (error) {
        console.error('Failed to fetch credit balance:', error);
      }
      setLoading(false);
    };

    fetchBalance();
  }, []);

  if (loading) {
    return <p>Loading credit balance...</p>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-8">
      <h2 className="text-xl font-semibold">Your Credit Balance</h2>
      <p className="text-3xl font-bold">{balance !== null ? balance : 'N/A'}</p>
    </div>
  );
};

export default CreditBalance;
