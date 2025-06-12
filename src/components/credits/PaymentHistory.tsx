"use client";

import React, { useState, useEffect } from 'react';

interface Payment {
  id: string;
  amount: number;
  status: string;
  created_at: string;
}

const PaymentHistory = () => {
  const [history, setHistory] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch('/api/payments/history');
        if (res.ok) {
          const data = await res.json();
          setHistory(data);
        }
      } catch (error) {
        console.error('Failed to fetch payment history:', error);
      }
      setLoading(false);
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <p>Loading payment history...</p>;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
      {history.length === 0 ? (
        <p>You have no payment history.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {history.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(payment.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${(payment.amount / 100).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{payment.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
