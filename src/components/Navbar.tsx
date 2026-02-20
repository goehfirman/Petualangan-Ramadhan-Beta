import React from 'react';

interface NavbarProps {
  currentUser: string;
  totalExp: number;
  activeSection: string;
  onNavigate: (section: string) => void;
  onLogout: () => void;
  currentDate: string;
}

export default function Navbar({ currentUser, totalExp, activeSection, onNavigate, onLogout, currentDate }: NavbarProps) {
  const navItems = [
    { id: 'home', label: '🏠 Beranda' },
    { id: 'puasa', label: '📖 Panduan Puasa' },
    { id: 'amalan', label: '✅ Amalan Harian' },
    { id: 'quran', label: '📚 Khatam Quran' },
    { id: 'waktu', label: '🕌 Waktu Sholat' },
    { id: 'leaderboard', label: '🏆 Leaderboard' },
    { id: 'contact', label: '📬 Hubungi Kami' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-900/95 to-blue-800/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <img 
              src="https://i.ibb.co.com/YswcXgP/LOGO-PEKAYON-09.png" 
              alt="Logo" 
              className="w-10 h-10 object-contain"
              referrerPolicy="no-referrer"
            />
            <div>
              <h1 className="font-bold text-yellow-400">Petualangan Ramadhan</h1>
              <p className="text-xs text-white/70">{currentUser}</p>
              <p className="text-xs text-amber-300/80 font-medium">{currentDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
              <span className="text-yellow-400">⭐</span>
              <span className="font-bold text-yellow-300">{totalExp} EXP</span>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 hover:bg-white/10 rounded-full transition cursor-pointer" 
              title="Keluar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex gap-1 pb-2 overflow-x-auto scroll-hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition cursor-pointer ${
                activeSection === item.id 
                  ? 'bg-yellow-500/20 text-yellow-300' 
                  : 'hover:bg-white/10 text-white/80'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
