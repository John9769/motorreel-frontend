'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function PaymentPage() {
  const { jobId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const createBill = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-bill`,
          { jobId }
        );
        window.location.href = res.data.paymentUrl;
      } catch (err) {
        setError(err.response?.data?.error || 'Payment failed. Please try again.');
        setLoading(false);
      }
    };
    createBill();
  }, [jobId]);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        {loading ? (
          <>
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h2 className="text-xl font-black mb-2">Menyediakan Pembayaran...</h2>
            <p className="text-gray-400 text-sm">Anda akan dihalakan ke halaman pembayaran sebentar lagi.</p>
          </>
        ) : (
          <>
            <div className="text-4xl mb-4">❌</div>
            <h2 className="text-xl font-black mb-2">Pembayaran Gagal</h2>
            <p className="text-red-400 text-sm mb-6">{error}</p>
            <button
              onClick={() => window.history.back()}
              className="bg-yellow-400 text-black font-black px-6 py-3 rounded-xl"
            >
              Cuba Semula
            </button>
          </>
        )}
      </div>
    </main>
  );
}