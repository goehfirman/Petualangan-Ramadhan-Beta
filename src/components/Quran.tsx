import React from 'react';

interface QuranProps {
  totalQuranPages: number;
}

export default function Quran({ totalQuranPages }: QuranProps) {
  const percentComplete = Math.min((totalQuranPages / 604) * 100, 100);

  return (
    <section className="space-y-6 animate-slide-in">
      <div className="card-gradient rounded-3xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-2xl">📚</div>
          <div>
            <h2 className="text-2xl font-bold text-yellow-400">Tips Khatam Al-Quran</h2>
            <p className="text-white/60 text-sm">Target khatam selama Ramadhan</p>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl p-5 border border-emerald-500/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-emerald-300 text-lg flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-gray-900 font-bold">1x</span> Khatam 1 Kali
              </h3>
              <span className="text-xs bg-emerald-500/30 text-emerald-300 px-3 py-1 rounded-full">Pemula</span>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Total Halaman</p>
                  <p className="text-xl font-bold text-white">604 halaman</p>
                </div>
                <div>
                  <p className="text-white/60">Per Hari</p>
                  <p className="text-xl font-bold text-emerald-300">~20 halaman</p>
                </div>
              </div>
              <p className="text-white/70 text-sm mt-3">💡 Baca 4 halaman setiap selesai sholat wajib (5x4 = 20 halaman)</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl p-5 border border-blue-500/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-blue-300 text-lg flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-gray-900 font-bold">2x</span> Khatam 2 Kali
              </h3>
              <span className="text-xs bg-blue-500/30 text-blue-300 px-3 py-1 rounded-full">Menengah</span>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Total Halaman</p>
                  <p className="text-xl font-bold text-white">1.208 halaman</p>
                </div>
                <div>
                  <p className="text-white/60">Per Hari</p>
                  <p className="text-xl font-bold text-blue-300">~40 halaman</p>
                </div>
              </div>
              <p className="text-white/70 text-sm mt-3">💡 Baca 1 juz per hari (1 juz ≈ 20 halaman) + 4 halaman tiap sholat</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-5 border border-purple-500/30">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-purple-300 text-lg flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-gray-900 font-bold">3x</span> Khatam 3 Kali
              </h3>
              <span className="text-xs bg-purple-500/30 text-purple-300 px-3 py-1 rounded-full">Rajin</span>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Total Halaman</p>
                  <p className="text-xl font-bold text-white">1.812 halaman</p>
                </div>
                <div>
                  <p className="text-white/60">Per Hari</p>
                  <p className="text-xl font-bold text-purple-300">~60 halaman</p>
                </div>
              </div>
              <p className="text-white/70 text-sm mt-3">💡 Baca 2 juz per hari: 1 juz pagi, 1 juz malam sebelum tidur</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-500/30 to-amber-500/30 rounded-xl p-5 border border-yellow-500/50 animate-pulse-glow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-yellow-300 text-lg flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-gray-900 font-bold">5x</span> Khatam 5 Kali
              </h3>
              <span className="text-xs bg-yellow-500/30 text-yellow-300 px-3 py-1 rounded-full">⭐ Istimewa</span>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-white/60">Total Halaman</p>
                  <p className="text-xl font-bold text-white">3.020 halaman</p>
                </div>
                <div>
                  <p className="text-white/60">Per Hari</p>
                  <p className="text-xl font-bold text-yellow-300">~100 halaman</p>
                </div>
              </div>
              <p className="text-white/70 text-sm mt-3">💡 Baca 3-4 juz per hari: setiap waktu luang digunakan untuk tilawah</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white/10 rounded-xl p-5">
          <h3 className="font-bold text-yellow-300 mb-4">📊 Progress Tilawah Kamu</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Total halaman dibaca</span>
              <span className="font-bold text-yellow-300">{totalQuranPages} halaman</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
              <div 
                className="progress-bar h-full rounded-full transition-all duration-500" 
                style={{ width: `${percentComplete}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Progress menuju 1 khatam</span>
              <span className="font-bold text-emerald-300">{percentComplete.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card-gradient rounded-xl p-4 border border-teal-500/30">
        <p className="text-center text-teal-200/80 italic text-sm">📖 "Bacalah Al-Quran, karena ia akan datang pada hari kiamat sebagai pemberi syafaat bagi yang membacanya." - HR. Muslim</p>
      </div>
    </section>
  );
}
