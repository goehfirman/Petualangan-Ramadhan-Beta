import React, { useState, useEffect } from 'react';
import { AmalanRecord } from '../types';
import { calculateExp, getDateFromRamadhanDay, convertToHijri } from '../utils/ramadhan';

interface AmalanProps {
  currentUser: string;
  currentDay: number;
  record: AmalanRecord | undefined;
  onSave: (record: AmalanRecord) => void;
  onDayChange: (day: number) => void;
}

export default function Amalan({ currentUser, currentDay, record, onSave, onDayChange }: AmalanProps) {
  const [formData, setFormData] = useState<Partial<AmalanRecord>>({});
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [displayDate, setDisplayDate] = useState<{ gregorian: string; hijri: string }>({ gregorian: '', hijri: '' });

  useEffect(() => {
    // Update date display when currentDay changes
    const date = getDateFromRamadhanDay(currentDay);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setDisplayDate({
      gregorian: date.toLocaleDateString('id-ID', options),
      hijri: convertToHijri(date)
    });

    if (record) {
      setFormData(record);
    } else {
      // Reset form for new day/user if no record exists
      setFormData({
        student_name: currentUser,
        day: currentDay,
        sholat_subuh: null,
        sholat_dzuhur: null,
        sholat_ashar: null,
        sholat_maghrib: null,
        sholat_isya: null,
        sholat_tarawih: null,
        sholat_dhuha: false,
        infaq: false,
        dzikir: false,
        itikaf: false,
        tausiyah_ustadz: '',
        tausiyah_tema: '',
        tausiyah_intisari: '',
        quran_pages: 0,
        total_exp: 0
      });
    }
    setStatus('idle');
  }, [record, currentUser, currentDay]);

  const handleChange = (field: keyof AmalanRecord, value: any) => {
    const updated = { ...formData, [field]: value };
    // Recalculate EXP immediately for display
    updated.total_exp = calculateExp(updated);
    setFormData(updated);
    
    // Auto save
    setStatus('saving');
    // Debounce or just save? The original code saved on every change.
    // I'll just call onSave directly.
    
    // Construct full record
    const fullRecord: AmalanRecord = {
      student_name: currentUser,
      day: currentDay,
      sholat_subuh: updated.sholat_subuh || null,
      sholat_dzuhur: updated.sholat_dzuhur || null,
      sholat_ashar: updated.sholat_ashar || null,
      sholat_maghrib: updated.sholat_maghrib || null,
      sholat_isya: updated.sholat_isya || null,
      sholat_tarawih: updated.sholat_tarawih || null,
      sholat_dhuha: updated.sholat_dhuha || false,
      infaq: updated.infaq || false,
      dzikir: updated.dzikir || false,
      itikaf: updated.itikaf || false,
      tausiyah_ustadz: updated.tausiyah_ustadz || '',
      tausiyah_tema: updated.tausiyah_tema || '',
      tausiyah_intisari: updated.tausiyah_intisari || '',
      quran_pages: updated.quran_pages || 0,
      total_exp: updated.total_exp || 0,
      updated_at: new Date().toISOString()
    };

    onSave(fullRecord);
    setTimeout(() => setStatus('saved'), 500);
  };

  const renderSholatRadio = (label: string, field: keyof AmalanRecord, icon: string) => (
    <div className="bg-white/10 rounded-lg p-3 flex flex-col justify-between h-full">
      <p className="font-bold text-white mb-3 flex items-center gap-2 text-sm"><span className="text-lg">{icon}</span> {label}</p>
      <div className="flex gap-2">
        <button
          onClick={() => handleChange(field, formData[field] === 'jamaah' ? null : 'jamaah')}
          className={`flex-1 py-2 px-1 rounded-lg text-xs font-medium transition-all duration-200 border ${
            formData[field] === 'jamaah'
              ? 'bg-emerald-500 border-emerald-400 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]'
              : 'bg-transparent border-white/20 text-white/60 hover:bg-white/5'
          }`}
        >
          Berjamaah
          {formData[field] === 'jamaah' && <span className="block text-[10px] opacity-80">+15</span>}
        </button>
        <button
          onClick={() => handleChange(field, formData[field] === 'munfarid' ? null : 'munfarid')}
          className={`flex-1 py-2 px-1 rounded-lg text-xs font-medium transition-all duration-200 border ${
            formData[field] === 'munfarid'
              ? 'bg-blue-500 border-blue-400 text-white shadow-[0_0_10px_rgba(59,130,246,0.4)]'
              : 'bg-transparent border-white/20 text-white/60 hover:bg-white/5'
          }`}
        >
          Munfarid
          {formData[field] === 'munfarid' && <span className="block text-[10px] opacity-80">+10</span>}
        </button>
      </div>
    </div>
  );

  return (
    <section className="space-y-6 animate-slide-in">
      <div className="card-gradient rounded-3xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-2xl">✅</div>
            <div>
              <h2 className="text-2xl font-bold text-yellow-400">Amalan Ibadah Harian</h2>
              <p className="text-white/60 text-sm">Catat amalanmu setiap hari!</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-yellow-200 font-medium mb-2 block">📅 Pilih Hari Ramadhan:</label>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onDayChange(currentDay - 1)}
                disabled={currentDay <= 1}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition disabled:opacity-50 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <select 
                value={currentDay}
                onChange={(e) => onDayChange(parseInt(e.target.value))}
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white text-center font-bold text-lg focus:outline-none focus:border-yellow-400"
              >
                {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                  <option key={day} value={day} className="text-gray-800">Hari ke-{day} Ramadhan</option>
                ))}
              </select>
              <button 
                onClick={() => onDayChange(currentDay + 1)}
                disabled={currentDay >= 30}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition disabled:opacity-50 cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="text-center bg-white/5 rounded-lg p-2">
              <p className="text-emerald-300 font-medium">{displayDate.gregorian}</p>
              <p className="text-white/60 text-sm">{displayDate.hijri}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-emerald-500/20 rounded-xl p-4">
            <h3 className="font-bold text-emerald-300 mb-4 flex items-center gap-2">🕌 Sholat Wajib Berjamaah/Munfarid</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {renderSholatRadio('Subuh', 'sholat_subuh', '🌅')}
              {renderSholatRadio('Dzuhur', 'sholat_dzuhur', '☀️')}
              {renderSholatRadio('Ashar', 'sholat_ashar', '🌤️')}
              {renderSholatRadio('Maghrib', 'sholat_maghrib', '🌅')}
              {renderSholatRadio('Isya', 'sholat_isya', '🌙')}
              {renderSholatRadio('Tarawih', 'sholat_tarawih', '⭐')}
              
              <div className="bg-white/10 rounded-lg p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.sholat_dhuha || false}
                    onChange={(e) => handleChange('sholat_dhuha', e.target.checked)}
                    className="w-5 h-5 rounded accent-emerald-500"
                  />
                  <span className="flex-1 font-bold text-white flex items-center gap-2"><span className="text-lg">☀️</span> Dhuha</span>
                  <span className="text-xs bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded">+10 EXP</span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-purple-500/20 rounded-xl p-4">
            <h3 className="font-bold text-purple-300 mb-3 flex items-center gap-2">💫 Amalan Sunnah</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition">
                <input 
                  type="checkbox" 
                  checked={formData.infaq || false}
                  onChange={(e) => handleChange('infaq', e.target.checked)}
                  className="w-5 h-5 rounded accent-purple-500"
                />
                <span>💰 Infaq/Sedekah</span>
                <span className="text-xs bg-purple-500/30 text-purple-200 px-2 py-0.5 rounded ml-auto">+15 EXP</span>
              </label>
              <label className="flex items-center gap-3 bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition">
                <input 
                  type="checkbox" 
                  checked={formData.dzikir || false}
                  onChange={(e) => handleChange('dzikir', e.target.checked)}
                  className="w-5 h-5 rounded accent-purple-500"
                />
                <span>📿 Dzikir</span>
                <span className="text-xs bg-purple-500/30 text-purple-200 px-2 py-0.5 rounded ml-auto">+15 EXP</span>
              </label>
              <label className="flex items-center gap-3 bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition">
                <input 
                  type="checkbox" 
                  checked={formData.itikaf || false}
                  onChange={(e) => handleChange('itikaf', e.target.checked)}
                  className="w-5 h-5 rounded accent-purple-500"
                />
                <span>🕌 I'tikaf</span>
                <span className="text-xs bg-purple-500/30 text-purple-200 px-2 py-0.5 rounded ml-auto">+15 EXP</span>
              </label>
            </div>
          </div>

          <div className="bg-blue-500/20 rounded-xl p-4">
            <h3 className="font-bold text-blue-300 mb-3 flex items-center gap-2">🎤 Tausiyah / Ceramah Subuh <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">+20 EXP</span></h3>
            <div className="space-y-3">
              <div>
                <label className="block text-white/70 text-sm mb-1">Nama Ustadz/Dai</label>
                <input 
                  type="text" 
                  value={formData.tausiyah_ustadz || ''}
                  onChange={(e) => handleChange('tausiyah_ustadz', e.target.value)}
                  placeholder="Nama penceramah..."
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-400 text-sm"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-1">Tema Dakwah / Materi</label>
                <input 
                  type="text" 
                  value={formData.tausiyah_tema || ''}
                  onChange={(e) => handleChange('tausiyah_tema', e.target.value)}
                  placeholder="Judul atau tema ceramah..."
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-400 text-sm"
                />
              </div>
              <div>
                <label className="block text-white/70 text-sm mb-1">Intisari Dakwah/Ceramah</label>
                <textarea 
                  value={formData.tausiyah_intisari || ''}
                  onChange={(e) => handleChange('tausiyah_intisari', e.target.value)}
                  placeholder="Tuliskan ringkasan materi ceramah di sini..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-400 text-sm resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-amber-500/20 rounded-xl p-4">
            <h3 className="font-bold text-amber-300 mb-3 flex items-center gap-2">📖 Tilawah Al-Quran <span className="text-xs bg-amber-500 text-gray-900 px-2 py-0.5 rounded-full">+10 EXP/halaman</span></h3>
            <div className="flex items-center gap-4">
              <label className="text-white/80">Jumlah halaman hari ini:</label>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleChange('quran_pages', Math.max(0, (formData.quran_pages || 0) - 1))}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-xl font-bold cursor-pointer"
                >
                  -
                </button>
                <input 
                  type="number" 
                  value={formData.quran_pages || 0}
                  onChange={(e) => handleChange('quran_pages', Math.max(0, Math.min(50, parseInt(e.target.value) || 0)))}
                  min="0" 
                  max="50" 
                  className="w-20 px-3 py-2 rounded-xl bg-white/10 border border-white/30 text-white text-center font-bold text-lg focus:outline-none"
                />
                <button 
                  onClick={() => handleChange('quran_pages', Math.min(50, (formData.quran_pages || 0) + 1))}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition text-xl font-bold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">EXP Hari Ini</p>
              <p className="text-3xl font-bold text-yellow-300">{formData.total_exp || 0} EXP</p>
            </div>
            <div className="text-right">
              {status === 'saving' && <span className="text-yellow-400 text-sm">⏳ Menyimpan...</span>}
              {status === 'saved' && <span className="text-emerald-400 text-sm">✓ Tersimpan</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="card-gradient rounded-xl p-4 border border-emerald-500/30">
        <p className="text-center text-emerald-200/80 italic text-sm">🌟 "Sebaik-baik amalan adalah yang dilakukan secara istiqamah (konsisten) meskipun sedikit." - HR. Bukhari & Muslim</p>
      </div>
    </section>
  );
}
