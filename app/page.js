'use client';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-gray-100 antialiased overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5 px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="font-black text-lg tracking-tighter text-white uppercase">
          Motor<span className="text-yellow-400">Reel</span>
        </div>
        <button
          onClick={() => router.push('/create')}
          className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold px-5 py-2 rounded-full text-xs uppercase tracking-wider hover:brightness-110 transition-all duration-300"
        >
          Buat Video →
        </button>
      </nav>

      {/* Hero — fullscreen video background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-yellow-400 text-[10px] font-black px-4 py-1.5 rounded-full tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            RM 9.99 Per Video • Premium Quality
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-white mb-4">
            Gambar je. Jadi <span className="text-yellow-400">Video Cinematic.</span> Terus Jual.
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Upload 6 gambar kenderaan anda. Kami hasilkan video cinematic 15 saat untuk TikTok, Instagram, Facebook dan WhatsApp status.
          </p>
          <button
            onClick={() => router.push('/create')}
            className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-black text-sm px-8 py-4 rounded-full hover:scale-[1.02] transition-all duration-300 shadow-[0_10px_30px_rgba(234,179,8,0.25)]"
          >
            Buat Video Sekarang →
          </button>
          <p className="text-gray-500 text-xs mt-4">✓ Tiada langganan. Bayar sekali, dapat video terus.</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-[#0F0F0F] via-[#161616] to-[#0F0F0F] border-y border-white/5 py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { value: 'RM 9.99', label: 'Flat Rate Per Video' },
            { value: '15 Saat', label: 'Cinematic Duration' },
            { value: '4 Platform', label: 'Auto Captions' },
          ].map((stat) => (
            <div key={stat.label} className="space-y-1">
              <div className="text-white text-xl md:text-3xl font-black">{stat.value}</div>
              <div className="text-yellow-500/70 text-[10px] font-bold uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Vehicle cards */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
            Kereta & Motor. <span className="text-yellow-400">Semua Boleh.</span>
          </h2>
          <p className="text-gray-400 text-sm">Kualiti premium untuk semua jenis kenderaan. Tetap RM 9.99.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="auto-spin relative rounded-2xl overflow-hidden min-h-[300px] flex flex-col justify-end cursor-pointer transition-all duration-500" onClick={() => router.push('/create')}>
            <img src="/motorcycle.png" alt="Motorcycle" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
            <div className="relative z-10 p-6">
              <div className="text-yellow-400 text-[10px] font-black tracking-widest uppercase mb-1">Motorsikal</div>
              <h3 className="text-white text-xl font-black mb-1">Jual Motor Lagi Laju</h3>
              <p className="text-gray-300 text-xs">Yamaha • Honda • Kawasaki • Suzuki • Modenas</p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden min-h-[300px] flex flex-col justify-end cursor-pointer hover:scale-[1.02] transition-all duration-500" onClick={() => router.push('/create')}>
            <img src="/car.png" alt="Car" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
            <div className="relative z-10 p-6">
              <div className="text-yellow-400 text-[10px] font-black tracking-widest uppercase mb-1">Kereta</div>
              <h3 className="text-white text-xl font-black mb-1">Jual Kereta Macam Pro</h3>
              <p className="text-gray-300 text-xs">Myvi • Axia • Vios • City • Civic</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 bg-[#0D0D0D] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-center text-white mb-12">
            4 Langkah. <span className="text-yellow-400">Siap.</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Upload 6 Gambar', desc: 'Pelbagai sudut kenderaan' },
              { step: '02', title: 'Isi Details', desc: 'Brand, model, tahun, harga' },
              { step: '03', title: 'Bayar RM9.99', desc: 'FPX atau DuitNow' },
              { step: '04', title: 'Download & Post', desc: 'TikTok, IG, FB, WA' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-black text-black text-xs">{item.step}</span>
                </div>
                <h3 className="font-black text-white text-xs mb-1">{item.title}</h3>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Captions */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-black text-center text-white mb-3">
          Caption <span className="text-yellow-400">Auto-Generated.</span>
        </h2>
        <p className="text-gray-400 text-center mb-10 text-xs">Lepas video siap, terus dapat caption untuk semua platform. Copy. Paste. Done.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { platform: 'Facebook', desc: 'Full spec sheet' },
            { platform: 'Instagram', desc: 'Hashtags included' },
            { platform: 'TikTok', desc: 'SEO tags + hook' },
            { platform: 'WhatsApp', desc: 'Short & punchy' },
          ].map((item) => (
            <div key={item.platform} className="bg-[#141414] border border-white/5 rounded-xl p-4 text-center hover:border-yellow-400/30 transition">
              <div className="font-black text-white mb-1 text-xs">{item.platform}</div>
              <div className="text-gray-500 text-[10px]">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-[#0D0D0D] border-t border-white/5">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
            Jom Cuba. <span className="text-yellow-400">RM 9.99 je.</span>
          </h2>
          <p className="text-gray-400 mb-6 text-sm">Tiada subscription. Tiada kontrak. Bayar bila nak guna.</p>
          <button
            onClick={() => router.push('/create')}
            className="bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-black text-sm px-10 py-4 rounded-full hover:brightness-110 transition shadow-[0_10px_40px_rgba(234,179,8,0.3)]"
          >
            Buat Video Sekarang →
          </button>
        </div>
      </section>

    </main>
  );
}