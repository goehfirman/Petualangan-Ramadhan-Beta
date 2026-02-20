export interface AmalanRecord {
  student_name: string;
  day: number;
  sholat_subuh: 'jamaah' | 'munfarid' | null;
  sholat_dzuhur: 'jamaah' | 'munfarid' | null;
  sholat_ashar: 'jamaah' | 'munfarid' | null;
  sholat_maghrib: 'jamaah' | 'munfarid' | null;
  sholat_isya: 'jamaah' | 'munfarid' | null;
  sholat_tarawih: 'jamaah' | 'munfarid' | null;
  sholat_dhuha: boolean;
  infaq: boolean;
  dzikir: boolean;
  itikaf: boolean;
  tausiyah_ustadz?: string;
  tausiyah_tema?: string;
  tausiyah_intisari?: string;
  quran_pages: number;
  total_exp: number;
  updated_at: string;
}

export interface StudentRank {
  name: string;
  exp: number;
}

export interface Inquiry {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at?: string;
}
