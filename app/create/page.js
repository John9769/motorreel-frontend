'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function CreatePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [photos, setPhotos] = useState(Array(6).fill(null));
  const [previews, setPreviews] = useState(Array(6).fill(null));
  const inputRefs = useRef([]);
  const [form, setForm] = useState({
    sellerName: '',
    sellerPhone: '',
    sellerEmail: '',
    vehicleType: 'CAR',
    brand: '',
    model: '',
    year: '',
    color: '',
    price: '',
    mileage: '',
    condition: 'USED',
    description: '',
    audioTrack: 'BASS',
    language: 'BOTH'
  });

  const photoLabels = [
    'Depan', 'Belakang', 'Kiri', 'Kanan', 'Dashboard', 'Enjin/Ekzos'
  ];

  const handlePhotoChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const newPhotos = [...photos];
    const newPreviews = [...previews];
    newPhotos[index] = file;
    newPreviews[index] = URL.createObjectURL(file);
    setPhotos(newPhotos);
    setPreviews(newPreviews);
    setError('');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      photos.forEach(photo => formData.append('photos', photo));
      Object.entries(form).forEach(([key, val]) => {
        if (val) formData.append(key, val);
      });

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jobs`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      router.push(`/payment/${res.data.jobId}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400";

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white pb-20">

      {/* Nav */}
      <nav className="border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="font-black text-lg uppercase">Motor<span className="text-yellow-400">Reel</span></div>
        <div className="text-gray-400 text-xs">Step {step} of 2</div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pt-10">

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-black mb-1">Upload Gambar Kenderaan</h1>
              <p className="text-gray-400 text-sm">6 gambar diperlukan — pelbagai sudut kenderaan anda</p>
            </div>

            {/* 6 individual photo slots */}
            <div className="grid grid-cols-3 gap-3">
              {Array(6).fill(null).map((_, i) => (
                <div key={i}>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => handlePhotoChange(e, i)}
                    className="hidden"
                    id={`photo-${i}`}
                    ref={el => inputRefs.current[i] = el}
                  />
                  <label htmlFor={`photo-${i}`} className="cursor-pointer block">
                    <div className={`relative rounded-xl overflow-hidden border-2 border-dashed transition h-24 ${
                      previews[i] ? 'border-yellow-400' : 'border-white/10 hover:border-white/30'
                    }`}>
                      {previews[i] ? (
                        <>
                          <img src={previews[i]} alt={`Photo ${i+1}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                            <span className="text-white text-xs font-bold">Tukar</span>
                          </div>
                          <div className="absolute top-1 right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                            <span className="text-black text-[10px] font-black">✓</span>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-white/5">
                          <span className="text-2xl mb-1">📷</span>
                          <span className="text-gray-500 text-[10px] text-center px-1">{photoLabels[i]}</span>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              ))}
            </div>

            <p className="text-gray-500 text-xs text-center">
              {photos.filter(p => p !== null).length}/6 gambar dipilih
            </p>

            {/* Vehicle type */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Jenis Kenderaan</label>
              <div className="grid grid-cols-2 gap-3">
                {['CAR', 'MOTORCYCLE'].map(type => (
                  <button
                    key={type}
                    onClick={() => setForm({ ...form, vehicleType: type })}
                    className={`py-3 rounded-xl font-bold text-sm border transition ${
                      form.vehicleType === type
                        ? 'bg-yellow-400 text-black border-yellow-400'
                        : 'bg-white/5 text-gray-300 border-white/10'
                    }`}
                  >
                    {type === 'CAR' ? '🚗 Kereta' : '🏍️ Motorsikal'}
                  </button>
                ))}
              </div>
            </div>

            {/* Brand + Model */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Brand</label>
                <input name="brand" value={form.brand} onChange={handleChange} placeholder="Honda, Yamaha..." className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Model</label>
                <input name="model" value={form.model} onChange={handleChange} placeholder="Myvi, CBR..." className={inputClass} />
              </div>
            </div>

            {/* Year + Color */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Tahun</label>
                <input name="year" value={form.year} onChange={handleChange} placeholder="2020" type="number" className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Warna</label>
                <input name="color" value={form.color} onChange={handleChange} placeholder="Hitam, Putih..." className={inputClass} />
              </div>
            </div>

            {/* Price + Mileage */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Harga (RM)</label>
                <input name="price" value={form.price} onChange={handleChange} placeholder="15000" type="number" className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Mileage (km)</label>
                <input name="mileage" value={form.mileage} onChange={handleChange} placeholder="50000" type="number" className={inputClass} />
              </div>
            </div>

            {/* Condition */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Kondisi</label>
              <div className="grid grid-cols-2 gap-3">
                {['USED', 'NEW'].map(c => (
                  <button
                    key={c}
                    onClick={() => setForm({ ...form, condition: c })}
                    className={`py-3 rounded-xl font-bold text-sm border transition ${
                      form.condition === c
                        ? 'bg-yellow-400 text-black border-yellow-400'
                        : 'bg-white/5 text-gray-300 border-white/10'
                    }`}
                  >
                    {c === 'USED' ? 'Terpakai' : 'Baru'}
                  </button>
                ))}
              </div>
            </div>

            {/* Audio */}
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Muzik Latar</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { val: 'PHONK', label: '⚡ Phonk', desc: 'High energy' },
                  { val: 'BASS', label: '🔊 Bass', desc: 'Deep & premium' },
                  { val: 'VOICEOVER', label: '🎙️ Soft', desc: 'For voiceover' },
                ].map(a => (
                  <button
                    key={a.val}
                    onClick={() => setForm({ ...form, audioTrack: a.val })}
                    className={`py-3 px-2 rounded-xl text-xs border transition text-center ${
                      form.audioTrack === a.val
                        ? 'bg-yellow-400 text-black border-yellow-400'
                        : 'bg-white/5 text-gray-300 border-white/10'
                    }`}
                  >
                    <div className="font-bold">{a.label}</div>
                    <div className="opacity-70 mt-0.5">{a.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              onClick={() => {
                if (photos.filter(p => p !== null).length !== 6) return setError('Sila upload tepat 6 gambar');
                if (!form.brand || !form.model || !form.year || !form.price) return setError('Sila lengkapkan maklumat kenderaan');
                setError('');
                setStep(2);
              }}
              className="w-full bg-yellow-400 text-black font-black py-4 rounded-xl hover:bg-yellow-300 transition"
            >
              Seterusnya →
            </button>
          </div>
        )}

        {/* Step 2 — Seller Info */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <button onClick={() => setStep(1)} className="text-gray-400 text-sm mb-4 flex items-center gap-2">← Kembali</button>
              <h1 className="text-2xl font-black mb-1">Maklumat Penjual</h1>
              <p className="text-gray-400 text-sm">Maklumat ini untuk menghantar video dan resit pembayaran</p>
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Nama Penuh</label>
              <input name="sellerName" value={form.sellerName} onChange={handleChange} placeholder="Ahmad bin Ali" className={inputClass} />
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Nombor Telefon</label>
              <input name="sellerPhone" value={form.sellerPhone} onChange={handleChange} placeholder="0121234567" className={inputClass} />
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Email</label>
              <input name="sellerEmail" value={form.sellerEmail} onChange={handleChange} placeholder="ahmad@email.com" type="email" className={inputClass} />
              <p className="text-gray-600 text-xs mt-1">Video dan resit akan dihantar ke email ini</p>
            </div>

            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-2 block">Deskripsi (Optional)</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Contoh: Kereta baik punya, servis rekod lengkap..." rows={3} className={`${inputClass} resize-none`} />
            </div>

            {/* Summary */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="font-black text-sm mb-3">Ringkasan Order</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Kenderaan</span>
                  <span>{form.year} {form.brand} {form.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Jenis</span>
                  <span>{form.vehicleType === 'CAR' ? 'Kereta' : 'Motorsikal'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Muzik</span>
                  <span>{form.audioTrack}</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between font-black">
                  <span>Jumlah</span>
                  <span className="text-yellow-400">RM 9.99</span>
                </div>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              onClick={() => {
                if (!form.sellerName || !form.sellerPhone || !form.sellerEmail) {
                  return setError('Sila lengkapkan semua maklumat penjual');
                }
                handleSubmit();
              }}
              disabled={loading}
              className="w-full bg-yellow-400 text-black font-black py-4 rounded-xl hover:bg-yellow-300 transition disabled:opacity-50"
            >
              {loading ? 'Memproses...' : 'Teruskan ke Pembayaran → RM 9.99'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}