import React, { useState } from 'react';
import { Inquiry } from '../types';
import { submitInquiry } from '../utils/inquiry';

export default function Contact() {
  const [formData, setFormData] = useState<Inquiry>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      await submitInquiry(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Failed to submit inquiry', error);
      setStatus('error');
    }
  };

  return (
    <section className="space-y-6 animate-slide-in">
      <div className="card-gradient rounded-3xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-2xl">📬</div>
          <div>
            <h2 className="text-2xl font-bold text-yellow-400">Hubungi Kami</h2>
            <p className="text-white/60 text-sm">Kirimkan pertanyaan atau saran Anda</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-white/80 text-sm mb-1">Nama Lengkap</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-400 transition"
              placeholder="Masukkan nama Anda"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-white/80 text-sm mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-400 transition"
              placeholder="contoh@email.com"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-white/80 text-sm mb-1">Subjek</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-400 transition"
              placeholder="Judul pesan"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-white/80 text-sm mb-1">Pesan</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-400 transition resize-none"
              placeholder="Tuliskan pesan Anda di sini..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold hover:shadow-lg hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'submitting' ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mengirim...
              </>
            ) : (
              <>
                <span>Kirim Pesan</span>
                <span>📤</span>
              </>
            )}
          </button>

          {status === 'success' && (
            <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl p-4 text-center animate-fade-in">
              <p className="text-emerald-300 font-bold">✅ Pesan berhasil dikirim!</p>
              <p className="text-white/70 text-sm">Terima kasih telah menghubungi kami.</p>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-center animate-fade-in">
              <p className="text-red-300 font-bold">❌ Gagal mengirim pesan</p>
              <p className="text-white/70 text-sm">Silakan coba lagi beberapa saat lagi.</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
