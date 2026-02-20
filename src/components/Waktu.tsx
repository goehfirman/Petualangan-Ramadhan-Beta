import React, { useEffect, useState } from 'react';
import { getJakartaPrayerTimes, PrayerTimeSchedule } from '../utils/prayerTimes';

interface WaktuProps {
  currentDate: string;
}

export default function Waktu({ currentDate }: WaktuProps) {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimeSchedule>({
    imsak: '--:--',
    subuh: '--:--',
    dzuhur: '--:--',
    ashar: '--:--',
    maghrib: '--:--',
    isya: '--:--'
  });

  useEffect(() => {
    const times = getJakartaPrayerTimes(new Date());
    setPrayerTimes(times);
  }, []);

  return (
    <section className="space-y-6 animate-slide-in">
      <div className="card-gradient rounded-3xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-2xl">🕌</div>
          <div>
            <h2 className="text-2xl font-bold text-yellow-400">Waktu Sholat & Amaliyah</h2>
            <p className="text-white/60 text-sm">{currentDate} (WIB - Jakarta)</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-xl p-4 text-center hover:scale-105 transition duration-300">
            <p className="text-white/60 text-sm">Imsak</p>
            <p className="text-2xl font-bold text-indigo-300">{prayerTimes.imsak}</p>
          </div>
          <div className="bg-gradient-to-br from-amber-500/30 to-yellow-500/30 rounded-xl p-4 text-center hover:scale-105 transition duration-300">
            <p className="text-white/60 text-sm">🌅 Subuh</p>
            <p className="text-2xl font-bold text-amber-300">{prayerTimes.subuh}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-200/20 to-orange-200/20 rounded-xl p-4 text-center hover:scale-105 transition duration-300">
            <p className="text-white/60 text-sm">☀️ Terbit</p>
            <p className="text-2xl font-bold text-yellow-100">{prayerTimes.terbit}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-xl p-4 text-center hover:scale-105 transition duration-300">
            <p className="text-white/60 text-sm">🌤️ Dhuha</p>
            <p className="text-2xl font-bold text-yellow-200">{prayerTimes.dhuha}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/30 to-red-500/30 rounded-xl p-4 text-center hover:scale-105 transition duration-300">
            <p className="text-white/60 text-sm">☀️ Dzuhur</p>
            <p className="text-2xl font-bold text-orange-300">{prayerTimes.dzuhur}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-xl p-4 text-center hover:scale-105 transition duration-300">
            <p className="text-white/60 text-sm">🌤️ Ashar</p>
            <p className="text-2xl font-bold text-yellow-300">{prayerTimes.ashar}</p>
          </div>
          <div className="bg-gradient-to-br from-rose-500/30 to-pink-500/30 rounded-xl p-4 text-center hover:scale-105 transition duration-300">
            <p className="text-white/60 text-sm">🌅 Maghrib</p>
            <p className="text-2xl font-bold text-rose-300">{prayerTimes.maghrib}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/30 to-indigo-500/30 rounded-xl p-4 text-center hover:scale-105 transition duration-300">
            <p className="text-white/60 text-sm">🌙 Isya</p>
            <p className="text-2xl font-bold text-purple-300">{prayerTimes.isya}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl p-5 mb-6">
          <h3 className="font-bold text-emerald-300 mb-4 text-center flex items-center justify-center gap-2">🧭 Kompas Kiblat</h3>
          <div className="relative w-48 h-48 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-emerald-500/50 shadow-lg">
              <div className="absolute inset-2 rounded-full border-2 border-white/20">
                <span className="absolute top-1 left-1/2 -translate-x-1/2 text-xs font-bold text-red-400">U</span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs font-bold text-white/60">S</span>
                <span className="absolute left-1 top-1/2 -translate-y-1/2 text-xs font-bold text-white/60">B</span>
                <span className="absolute right-1 top-1/2 -translate-y-1/2 text-xs font-bold text-white/60">T</span>
              </div>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              </svg>
            </div>
            
            <div className="compass-needle absolute inset-0 flex items-center justify-center" style={{ transform: 'rotate(295deg)' }}>
              <svg className="w-32 h-32" viewBox="0 0 100 100">
                <polygon points="50,10 45,45 50,40 55,45" fill="#10b981" stroke="#10b981" strokeWidth="1" />
                <polygon points="50,90 45,55 50,60 55,55" fill="#4b5563" stroke="#4b5563" strokeWidth="1" />
                <rect x="45" y="5" width="10" height="10" fill="#fbbf24" rx="1" />
                <text x="50" y="13" fontSize="6" fill="#1e3a5f" textAnchor="middle" fontWeight="bold">🕋</text>
              </svg>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-white shadow-lg"></div>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-white/70 text-sm">Arah Kiblat dari Jakarta</p>
            <p className="text-emerald-300 font-bold text-lg">295° Barat Laut</p>
            <p className="text-white/50 text-xs mt-1">*Gunakan kompas fisik untuk akurasi lebih baik</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl p-5 mb-4">
          <h3 className="font-bold text-amber-300 mb-3 flex items-center gap-2">🤲 Doa Berbuka Puasa</h3>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="font-amiri text-2xl text-yellow-200 mb-3 leading-relaxed">ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللهُ</p>
            <p className="text-amber-300 font-medium mb-2">Dzahabazh zhama'u wabtallatil 'uruuqu wa tsabatal ajru insyaa Allah</p>
            <p className="text-white/80 text-sm">"Telah hilang rasa haus, dan urat-urat telah basah serta pahala tetap, insya Allah"</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl p-5">
          <h3 className="font-bold text-purple-300 mb-3 flex items-center gap-2">📚 Doa Penutup Majelis Ilmu</h3>
          <div className="bg-white/10 rounded-lg p-4 text-center">
            <p className="font-amiri text-2xl text-yellow-200 mb-3 leading-relaxed">سُبْحَانَكَ اللّٰهُمَّ وَبِحَمْدِكَ أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا أَنْتَ أَسْتَغْفِرُكَ وَأَتُوْبُ إِلَيْكَ</p>
            <p className="text-purple-300 font-medium mb-2">Subḥânakallâhumma wa biḥamdika asyhadu an-lâilâha illâ anta astaghfiruka wa atûbu ilaik</p>
            <p className="text-white/80 text-sm">"Mahasuci Engkau, ya Allah. Segala sanjungan untuk-Mu. Aku bersaksi bahwa tiada tuhan melainkan Engkau. Aku memohon ampun dan bertaubat kepada-Mu"</p>
          </div>
        </div>
      </div>

      <div className="card-gradient rounded-xl p-4 border border-indigo-500/30">
        <p className="text-center text-indigo-200/80 italic text-sm">🕌 "Sesungguhnya sholat itu adalah kewajiban yang ditentukan waktunya atas orang-orang yang beriman." - QS. An-Nisa: 103</p>
      </div>
    </section>
  );
}
