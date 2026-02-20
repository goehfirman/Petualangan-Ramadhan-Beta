import React, { useState } from 'react';

export default function Puasa() {
  const [activeTab, setActiveTab] = useState('definisi');

  const tabs = [
    { id: 'definisi', label: '📚 Pengertian' },
    { id: 'hukum', label: '⚖️ Hukum & Rukun' },
    { id: 'syarat', label: '📋 Syarat & Sunnah' },
    { id: 'niat', label: '🤲 Niat & Doa' },
    { id: 'buka', label: '🍽️ Berbuka Puasa' },
    { id: 'boleh', label: '🔓 Rukhsah' },
    { id: 'keutamaan', label: '🌟 Keutamaan' },
  ];

  return (
    <section className="space-y-6 animate-slide-in">
      <div className="flex gap-2 overflow-x-auto scroll-hidden pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition cursor-pointer ${
              activeTab === tab.id
                ? 'bg-yellow-500/30 text-yellow-300'
                : 'hover:bg-white/10 text-white/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'definisi' && (
        <div className="card-gradient rounded-3xl p-6 border border-white/20 animate-slide-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-2xl">📚</div>
            <h2 className="text-2xl font-bold text-yellow-400">Pengertian Puasa</h2>
          </div>
          <div className="space-y-4 text-white/90">
            <p><strong className="text-yellow-300">Puasa (Shaum)</strong> secara bahasa berarti <em>menahan diri</em>. Secara istilah syar'i, puasa adalah menahan diri dari makan, minum, dan segala yang membatalkan puasa sejak terbit fajar hingga terbenam matahari dengan niat karena Allah SWT.</p>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-amiri text-2xl text-center text-yellow-200 mb-2">يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ</p>
              <p className="text-sm text-white/70 text-center">"Hai orang-orang yang beriman, diwajibkan atas kamu berpuasa sebagaimana diwajibkan atas orang-orang sebelum kamu agar kamu bertakwa." (QS. Al-Baqarah: 183)</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="bg-emerald-500/20 rounded-xl p-4">
                <h4 className="font-bold text-emerald-400 mb-2">🎯 Tujuan Puasa</h4>
                <ul className="text-sm space-y-1">
                  <li>• Meningkatkan ketakwaan</li>
                  <li>• Melatih kesabaran</li>
                  <li>• Mengendalikan hawa nafsu</li>
                  <li>• Menumbuhkan empati</li>
                </ul>
              </div>
              <div className="bg-blue-500/20 rounded-xl p-4">
                <h4 className="font-bold text-blue-400 mb-2">⏰ Waktu Puasa</h4>
                <ul className="text-sm space-y-1">
                  <li>• Dimulai: Terbit fajar (Imsak)</li>
                  <li>• Berakhir: Terbenam matahari</li>
                  <li>• Durasi: Sebulan penuh</li>
                  <li>• Bulan: Ramadhan (bulan ke-9)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'hukum' && (
        <div className="card-gradient rounded-3xl p-6 border border-white/20 animate-slide-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-2xl">⚖️</div>
            <h2 className="text-2xl font-bold text-yellow-400">Hukum & Rukun Puasa</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-purple-500/20 rounded-xl p-5">
              <h3 className="font-bold text-purple-300 text-lg mb-3">⚖️ Hukum Puasa Ramadhan</h3>
              <p className="text-white/90">Puasa Ramadhan hukumnya <strong className="text-yellow-300">WAJIB</strong> bagi setiap muslim yang telah memenuhi syarat. Puasa Ramadhan merupakan salah satu dari <strong className="text-yellow-300">Rukun Islam yang ke-4</strong>.</p>
            </div>
            <div className="bg-amber-500/20 rounded-xl p-5">
              <h3 className="font-bold text-amber-300 text-lg mb-3">📜 Rukun Puasa (2 Rukun)</h3>
              <div className="grid gap-3">
                <div className="flex items-start gap-3 bg-white/10 rounded-lg p-3">
                  <span className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center font-bold text-gray-900">1</span>
                  <div>
                    <h4 className="font-bold text-amber-200">Niat</h4>
                    <p className="text-sm text-white/70">Berniat di dalam hati untuk berpuasa pada malam hari sebelum terbit fajar</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-white/10 rounded-lg p-3">
                  <span className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center font-bold text-gray-900">2</span>
                  <div>
                    <h4 className="font-bold text-amber-200">Menahan Diri</h4>
                    <p className="text-sm text-white/70">Menahan diri dari segala yang membatalkan puasa sejak terbit fajar hingga terbenam matahari</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'syarat' && (
        <div className="card-gradient rounded-3xl p-6 border border-white/20 animate-slide-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-2xl">📋</div>
            <h2 className="text-2xl font-bold text-yellow-400">Syarat & Sunnah Puasa</h2>
          </div>
          <div className="grid gap-4">
            <div className="bg-cyan-500/20 rounded-xl p-5">
              <h3 className="font-bold text-cyan-300 text-lg mb-3">📋 Syarat Wajib Puasa</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                <div className="bg-white/10 rounded-lg p-3 flex items-center gap-2"><span className="text-cyan-400">✓</span> Islam</div>
                <div className="bg-white/10 rounded-lg p-3 flex items-center gap-2"><span className="text-cyan-400">✓</span> Baligh (dewasa)</div>
                <div className="bg-white/10 rounded-lg p-3 flex items-center gap-2"><span className="text-cyan-400">✓</span> Berakal sehat</div>
                <div className="bg-white/10 rounded-lg p-3 flex items-center gap-2"><span className="text-cyan-400">✓</span> Mampu berpuasa</div>
              </div>
            </div>
            <div className="bg-pink-500/20 rounded-xl p-5">
              <h3 className="font-bold text-pink-300 text-lg mb-3">💝 Sunnah-Sunnah Puasa</h3>
              <div className="grid gap-2">
                <div className="bg-white/10 rounded-lg p-3"><span className="text-pink-400 font-bold">1.</span> <strong>Sahur</strong> - Makan di waktu sahur, meski hanya seteguk air</div>
                <div className="bg-white/10 rounded-lg p-3"><span className="text-pink-400 font-bold">2.</span> <strong>Mengakhirkan Sahur</strong> - Sahur di akhir waktu mendekati imsak</div>
                <div className="bg-white/10 rounded-lg p-3"><span className="text-pink-400 font-bold">3.</span> <strong>Menyegerakan Berbuka</strong> - Segera berbuka saat maghrib tiba</div>
                <div className="bg-white/10 rounded-lg p-3"><span className="text-pink-400 font-bold">4.</span> <strong>Berbuka dengan Kurma</strong> - Atau air jika tidak ada kurma</div>
                <div className="bg-white/10 rounded-lg p-3"><span className="text-pink-400 font-bold">5.</span> <strong>Berdoa Saat Berbuka</strong> - Waktu mustajab untuk berdoa</div>
                <div className="bg-white/10 rounded-lg p-3"><span className="text-pink-400 font-bold">6.</span> <strong>Memperbanyak Sedekah</strong> - Berbagi dengan sesama</div>
                <div className="bg-white/10 rounded-lg p-3"><span className="text-pink-400 font-bold">7.</span> <strong>Memperbanyak Baca Quran</strong> - Bulan diturunkannya Al-Quran</div>
                <div className="bg-white/10 rounded-lg p-3"><span className="text-pink-400 font-bold">8.</span> <strong>I'tikaf</strong> - Terutama 10 malam terakhir Ramadhan</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'niat' && (
        <div className="card-gradient rounded-3xl p-6 border border-white/20 animate-slide-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-2xl">🤲</div>
            <h2 className="text-2xl font-bold text-yellow-400">Niat Puasa</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-5">
              <h3 className="font-bold text-green-300 text-lg mb-3">🌙 Niat Puasa Ramadhan</h3>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="font-amiri text-3xl text-yellow-200 mb-3 leading-relaxed">نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هٰذِهِ السَّنَةِ لِلّٰهِ تَعَالَى</p>
                <p className="text-emerald-300 font-medium mb-2">Nawaitu shauma ghadin 'an adaa'i fardhi syahri ramadhaana haadzihis sanati lillaahi ta'aalaa</p>
                <p className="text-white/80 text-sm">"Aku niat berpuasa esok hari untuk menunaikan fardhu bulan Ramadhan tahun ini karena Allah Ta'ala"</p>
              </div>
              <p className="text-sm text-white/60 mt-3 text-center">⏰ Dibaca pada malam hari sebelum fajar</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'buka' && (
        <div className="card-gradient rounded-3xl p-6 border border-white/20 animate-slide-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-2xl">🍽️</div>
            <h2 className="text-2xl font-bold text-yellow-400">Tata Cara Berbuka Puasa</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-orange-500/20 rounded-xl p-5">
              <h3 className="font-bold text-orange-300 text-lg mb-3">📝 Adab Berbuka Sesuai Sunnah</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white/10 rounded-lg p-3">
                  <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-gray-900 flex-shrink-0">1</span>
                  <p><strong className="text-orange-200">Menyegerakan Berbuka</strong> - Segera berbuka ketika matahari terbenam</p>
                </div>
                <div className="flex items-start gap-3 bg-white/10 rounded-lg p-3">
                  <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-gray-900 flex-shrink-0">2</span>
                  <p><strong className="text-orange-200">Berbuka dengan Kurma</strong> - Jika tidak ada, boleh dengan air putih</p>
                </div>
                <div className="flex items-start gap-3 bg-white/10 rounded-lg p-3">
                  <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-gray-900 flex-shrink-0">3</span>
                  <p><strong className="text-orange-200">Membaca Doa Berbuka</strong> - Berdoa sebelum berbuka</p>
                </div>
                <div className="flex items-start gap-3 bg-white/10 rounded-lg p-3">
                  <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center font-bold text-gray-900 flex-shrink-0">4</span>
                  <p><strong className="text-orange-200">Tidak Berlebihan</strong> - Makan secukupnya, tidak berlebihan</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-xl p-5">
              <h3 className="font-bold text-amber-300 text-lg mb-3">🤲 Doa Berbuka Puasa</h3>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <p className="font-amiri text-2xl text-yellow-200 mb-3 leading-relaxed">ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللهُ</p>
                <p className="text-amber-300 font-medium mb-2">Dzahabazh zhama'u wabtallatil 'uruuqu wa tsabatal ajru insyaa Allah</p>
                <p className="text-white/80 text-sm">"Telah hilang rasa haus, dan urat-urat telah basah serta pahala tetap, insya Allah"</p>
                <p className="text-xs text-white/50 mt-2">(HR. Abu Dawud)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'boleh' && (
        <div className="card-gradient rounded-3xl p-6 border border-white/20 animate-slide-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center text-2xl">🔓</div>
            <h2 className="text-2xl font-bold text-yellow-400">Rukhsah (Keringanan) Puasa</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-rose-500/20 rounded-xl p-5">
              <h3 className="font-bold text-rose-300 text-lg mb-3">👥 Orang yang Boleh Tidak Puasa</h3>
              <div className="grid gap-3">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2"><span className="text-2xl">🤰</span><h4 className="font-bold text-rose-200">Wanita Hamil & Menyusui</h4></div>
                  <p className="text-sm text-white/70">Jika khawatir terhadap keselamatan diri atau bayinya. Wajib qadha (mengganti) di hari lain.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2"><span className="text-2xl">🤒</span><h4 className="font-bold text-rose-200">Orang Sakit</h4></div>
                  <p className="text-sm text-white/70">Sakit yang akan bertambah parah jika berpuasa. Wajib qadha ketika sudah sembuh.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2"><span className="text-2xl">✈️</span><h4 className="font-bold text-rose-200">Musafir (Orang Bepergian)</h4></div>
                  <p className="text-sm text-white/70">Perjalanan jauh yang menyulitkan. Wajib qadha di hari lain.</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2"><span className="text-2xl">👴</span><h4 className="font-bold text-rose-200">Orang Tua Renta</h4></div>
                  <p className="text-sm text-white/70">Tidak mampu berpuasa. Wajib membayar fidyah (memberi makan fakir miskin).</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2"><span className="text-2xl">🩸</span><h4 className="font-bold text-rose-200">Wanita Haid & Nifas</h4></div>
                  <p className="text-sm text-white/70">Haram berpuasa saat haid/nifas. Wajib qadha di hari lain.</p>
                </div>
              </div>
            </div>
            <div className="bg-amber-500/20 rounded-xl p-5">
              <h3 className="font-bold text-amber-300 text-lg mb-3">⚖️ Kafarat (Denda) Puasa</h3>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white/90 mb-3">Kafarat wajib bagi yang <strong className="text-yellow-300">sengaja membatalkan puasa tanpa udzur</strong> (seperti hubungan suami istri di siang hari). Urutannya:</p>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center font-bold text-gray-900 flex-shrink-0 text-xs">1</span> <span>Memerdekakan budak (tidak relevan di zaman sekarang)</span></li>
                  <li className="flex items-start gap-2"><span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center font-bold text-gray-900 flex-shrink-0 text-xs">2</span> <span>Puasa 2 bulan berturut-turut</span></li>
                  <li className="flex items-start gap-2"><span className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center font-bold text-gray-900 flex-shrink-0 text-xs">3</span> <span>Memberi makan 60 orang miskin</span></li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'keutamaan' && (
        <div className="card-gradient rounded-3xl p-6 border border-white/20 animate-slide-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-2xl">🌟</div>
            <h2 className="text-2xl font-bold text-yellow-400">Keutamaan Berpuasa</h2>
          </div>
          <div className="grid gap-4">
            <div className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-xl p-5">
              <div className="grid gap-3">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2"><span className="text-2xl">🚪</span><h4 className="font-bold text-yellow-300">Pintu Ar-Rayyan</h4></div>
                  <p className="text-sm text-white/80">"Di surga ada pintu bernama Ar-Rayyan, yang akan dimasuki oleh orang-orang yang berpuasa pada hari kiamat." (HR. Bukhari & Muslim)</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2"><span className="text-2xl">🛡️</span><h4 className="font-bold text-yellow-300">Perisai dari Api Neraka</h4></div>
                  <p className="text-sm text-white/80">"Puasa adalah perisai yang melindungi seseorang dari api neraka." (HR. Ahmad)</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2"><span className="text-2xl">🎁</span><h4 className="font-bold text-yellow-300">Pahala Tanpa Batas</h4></div>
                  <p className="text-sm text-white/80">"Setiap amal anak Adam dilipat gandakan, satu kebaikan menjadi 10 hingga 700 kali lipat. Allah berfirman: kecuali puasa, karena puasa itu untuk-Ku dan Aku sendiri yang akan membalasnya." (HR. Muslim)</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2"><span className="text-2xl">✨</span><h4 className="font-bold text-yellow-300">Pengampunan Dosa</h4></div>
                  <p className="text-sm text-white/80">"Barangsiapa berpuasa Ramadhan dengan iman dan mengharap pahala, diampuni dosa-dosanya yang telah lalu." (HR. Bukhari & Muslim)</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2"><span className="text-2xl">😊</span><h4 className="font-bold text-yellow-300">Dua Kebahagiaan</h4></div>
                  <p className="text-sm text-white/80">"Orang yang berpuasa memiliki dua kebahagiaan: kebahagiaan saat berbuka dan kebahagiaan saat bertemu Rabbnya." (HR. Muslim)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card-gradient rounded-xl p-4 border border-yellow-500/30">
        <p className="text-center text-yellow-200/80 italic text-sm">💫 "Bulan Ramadhan adalah bulan yang di dalamnya diturunkan Al-Quran sebagai petunjuk bagi manusia." - QS. Al-Baqarah: 185</p>
      </div>
    </section>
  );
}
