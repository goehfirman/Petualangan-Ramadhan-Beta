import React from 'react';
import { exportDataToCSV } from '../utils/ramadhan';

interface HomeProps {
  day: number;
  exp: number;
  quranPages: number;
  rank: number | string;
  quote: string;
  onNavigate: (section: string) => void;
}

export default function Home({ day, exp, quranPages, rank, quote, onNavigate }: HomeProps) {
  return (
    <section className="space-y-6 animate-slide-in">
      <div className="card-gradient rounded-3xl p-6 border border-white/20 text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent mb-2">
          ✨ Selamat Datang di Petualangan Ramadhan ✨
        </h2>
        <p className="text-yellow-200/80">Ayo semangat beribadah di bulan penuh berkah!</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="bg-gradient-to-br from-emerald-500/30 to-emerald-600/30 rounded-2xl p-4">
            <div className="text-3xl mb-2">🌙</div>
            <div className="text-2xl font-bold text-emerald-300">{day}</div>
            <div className="text-xs text-white/70">Hari ke</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-2xl p-4">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-yellow-300">{exp}</div>
            <div className="text-xs text-white/70">Total EXP</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500/30 to-rose-500/30 rounded-2xl p-4">
            <div className="text-3xl mb-2">📖</div>
            <div className="text-2xl font-bold text-pink-300">{quranPages}</div>
            <div className="text-xs text-white/70">Halaman Quran</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/30 to-indigo-500/30 rounded-2xl p-4">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-blue-300">{rank}</div>
            <div className="text-xs text-white/70">Peringkat</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => onNavigate('amalan')}
          className="card-gradient rounded-2xl p-5 border border-white/20 text-left hover:bg-white/10 transition group cursor-pointer"
        >
          <div className="text-4xl mb-3 group-hover:scale-110 transition">✅</div>
          <h3 className="font-bold text-yellow-300">Catat Amalan</h3>
          <p className="text-sm text-white/60">Isi amalan hari ini</p>
        </button>
        <button 
          onClick={() => onNavigate('leaderboard')}
          className="card-gradient rounded-2xl p-5 border border-white/20 text-left hover:bg-white/10 transition group cursor-pointer"
        >
          <div className="text-4xl mb-3 group-hover:scale-110 transition">🏆</div>
          <h3 className="font-bold text-yellow-300">Leaderboard</h3>
          <p className="text-sm text-white/60">Lihat peringkatmu</p>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <a 
          href="/database_template.csv" 
          download="database_template.csv"
          className="bg-white/5 rounded-xl p-4 border border-white/10 text-center hover:bg-white/10 transition group cursor-pointer flex flex-col items-center justify-center"
        >
          <div className="text-2xl mb-2 group-hover:scale-110 transition">📄</div>
          <h3 className="font-bold text-white/80 text-sm">Download Template CSV</h3>
        </a>
        <button 
          onClick={exportDataToCSV}
          className="bg-white/5 rounded-xl p-4 border border-white/10 text-center hover:bg-white/10 transition group cursor-pointer flex flex-col items-center justify-center"
        >
          <div className="text-2xl mb-2 group-hover:scale-110 transition">💾</div>
          <h3 className="font-bold text-white/80 text-sm">Export Data Saya</h3>
        </button>
      </div>

      <div className="card-gradient rounded-3xl p-6 border border-yellow-500/30 animate-pulse-glow">
        <div className="flex items-start gap-4">
          <div className="text-4xl">💫</div>
          <div>
            <h3 className="font-bold text-yellow-400 mb-2">Motivasi Hari Ini</h3>
            <p className="text-white/90 italic">"{quote}"</p>
          </div>
        </div>
      </div>
    </section>
  );
}
