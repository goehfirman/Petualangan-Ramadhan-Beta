import React, { useState } from 'react';
import { students } from '../data/students';

interface LoginProps {
  onLogin: (name: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [selectedName, setSelectedName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!selectedName) {
      setError('Pilih nama terlebih dahulu!');
      return;
    }
    if (password !== '1234') {
      setError('Password salah! Gunakan: 1234');
      return;
    }
    onLogin(selectedName);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card-gradient rounded-3xl p-8 max-w-md w-full border border-white/20 animate-slide-in">
        <div className="text-center mb-6">
          <img 
            src="https://i.ibb.co.com/YswcXgP/LOGO-PEKAYON-09.png" 
            alt="Logo SDN Pekayon 09" 
            className="w-24 h-24 mx-auto drop-shadow-[0_0_20px_rgba(251,191,36,0.3)] object-contain"
            referrerPolicy="no-referrer"
          />
          <h1 className="text-3xl font-bold mt-4 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
            Petualangan Ramadhan
          </h1>
          <p className="text-yellow-200/80 mt-2">SDN Pekayon 09</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-yellow-200 mb-2 font-medium">👤 Nama Siswa</label>
            <select 
              value={selectedName}
              onChange={(e) => setSelectedName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white focus:outline-none focus:border-yellow-400 transition"
            >
              <option value="" className="text-gray-800">-- Pilih Nama --</option>
              {students.map((name) => (
                <option key={name} value={name} className="text-gray-800">{name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-yellow-200 mb-2 font-medium">🔐 Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password" 
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-yellow-400 transition"
            />
          </div>

          <button 
            onClick={handleLogin}
            className="w-full py-4 golden-gradient text-gray-900 font-bold rounded-xl hover:opacity-90 transition transform hover:scale-[1.02] active:scale-[0.98] mt-6 cursor-pointer"
          >
            ✨ Masuk Petualangan Ramadhan ✨
          </button>
          
          {error && <p className="text-red-400 text-center mt-2">{error}</p>}
        </div>
        
        <p className="text-center text-white/60 text-sm mt-6">
          "Barangsiapa berpuasa Ramadhan dengan iman dan mengharap pahala, diampuni dosa-dosanya yang telah lalu" - HR. Bukhari
        </p>
      </div>
    </div>
  );
}
