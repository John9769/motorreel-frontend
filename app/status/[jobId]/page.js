'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function StatusPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [copied, setCopied] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${jobId}`
        );
        setJob(res.data);
        if (res.data.status !== 'DONE' && res.data.status !== 'FAILED') {
          setTimeout(fetchJob, 5000);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchJob();
  }, [jobId]);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const statusConfig = {
    AWAITING_PAYMENT: { label: 'Menunggu Pembayaran', color: 'text-gray-400', icon: '⏳' },
    PAID: { label: 'Pembayaran Diterima', color: 'text-blue-400', icon: '✅' },
    PROCESSING: { label: 'Video Sedang Diproses...', color: 'text-yellow-400', icon: '⚙️' },
    DONE: { label: 'Video Siap!', color: 'text-green-400', icon: '🎬' },
    FAILED: { label: 'Proses Gagal', color: 'text-red-400', icon: '❌' },
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white pb-20">

      <nav className="border-b border-white/5 px-6 py-4">
        <div className="font-black text-lg uppercase">Motor<span className="text-yellow-400">Reel</span></div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pt-10">

        {!job ? (
          <div className="flex items-center justify-center pt-20">
            <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <div className="text-4xl mb-3">{statusConfig[job.status]?.icon}</div>
              <h1 className={`text-xl font-black mb-1 ${statusConfig[job.status]?.color}`}>
                {statusConfig[job.status]?.label}
              </h1>
              <p className="text-gray-400 text-sm">{job.year} {job.brand} {job.model}</p>
              {(job.status === 'PROCESSING' || job.status === 'PAID') && (
                <div className="mt-4 w-full bg-white/10 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
                </div>
              )}
            </div>

            {job.status === 'DONE' && job.videoUrl && (
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h2 className="font-black text-sm mb-4 text-yellow-400 uppercase tracking-wider">Video Anda</h2>
                  <video src={job.videoUrl} controls className="w-full rounded-xl mb-4" />
                  <a href={job.videoUrl} download className="block w-full bg-yellow-400 text-black font-black py-3 rounded-xl text-center hover:bg-yellow-300 transition">
                    Download Video →
                  </a>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h2 className="font-black text-sm mb-4 text-yellow-400 uppercase tracking-wider">Caption Siap Guna</h2>
                  <div className="space-y-4">
                    {[
                      { key: 'captionFb', label: 'Facebook' },
                      { key: 'captionIg', label: 'Instagram' },
                      { key: 'captionTiktok', label: 'TikTok' },
                      { key: 'captionWhatsapp', label: 'WhatsApp' },
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-black text-gray-400 uppercase tracking-wider">{label}</span>
                          <button
                            onClick={() => copyToClipboard(job[key], key)}
                            className={`text-xs px-3 py-1 rounded-full font-bold transition ${
                              copied === key ? 'bg-green-400 text-black' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                            }`}
                          >
                            {copied === key ? '✓ Copied!' : 'Copy'}
                          </button>
                        </div>
                        <div className="bg-black/30 rounded-xl p-3 text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {job[key]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {job.status === 'FAILED' && (
              <div className="bg-red-400/10 border border-red-400/20 rounded-2xl p-6 text-center">
                <p className="text-red-400 text-sm mb-4">{job.errorMessage || 'Proses gagal. Sila hubungi support.'}</p>
                <a href="mailto:hello@awas.asia" className="text-yellow-400 text-sm font-bold underline">
                  Hubungi Support →
                </a>
              </div>
            )}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="font-black text-xs text-gray-400 uppercase tracking-wider mb-3">Butiran Order</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Job ID</span>
                  <span className="font-mono text-xs">{job.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Kenderaan</span>
                  <span>{job.year} {job.brand} {job.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rujukan</span>
                  <span className="font-mono text-xs">{job.paymentRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Amaun</span>
                  <span className="text-yellow-400 font-black">RM 9.99</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </main>
  );
}