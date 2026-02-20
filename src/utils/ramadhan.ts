import { AmalanRecord, StudentRank } from '../types';
import { students } from '../data/students';
import { supabase } from '../lib/supabase';

const STORAGE_KEY = 'jurnal_ramadhan_data';

export const calculateExp = (record: Partial<AmalanRecord>): number => {
  let exp = 0;
  
  const sholatPoints = (type: 'jamaah' | 'munfarid' | null) => {
    if (type === 'jamaah') return 15;
    if (type === 'munfarid') return 10;
    return 0;
  };

  exp += sholatPoints(record.sholat_subuh || null);
  exp += sholatPoints(record.sholat_dzuhur || null);
  exp += sholatPoints(record.sholat_ashar || null);
  exp += sholatPoints(record.sholat_maghrib || null);
  exp += sholatPoints(record.sholat_isya || null);
  exp += sholatPoints(record.sholat_tarawih || null);

  if (record.sholat_dhuha) exp += 10;
  if (record.infaq) exp += 15;
  if (record.dzikir) exp += 15;
  if (record.itikaf) exp += 15;
  
  // Tausiyah +20 EXP if intisari is filled
  if (record.tausiyah_intisari && record.tausiyah_intisari.trim().length > 0) {
    exp += 20;
  }

  exp += (record.quran_pages || 0) * 10;

  return exp;
};

export const getRamadhanDay = (): number => {
  // 19 Feb 2026 is 1 Ramadhan 1447 H
  const ramadhanStart = new Date(2026, 1, 19); 
  const now = new Date();
  
  // Reset hours to compare just dates (local time)
  const start = new Date(ramadhanStart);
  start.setHours(0, 0, 0, 0);
  
  const current = new Date(now);
  current.setHours(0, 0, 0, 0);
  
  const diffTime = current.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // If before start, return 1 (default to day 1)
  if (diffDays < 0) return 1;
  
  return diffDays + 1;
};

// Helper to get local records synchronously (for fallback/cache)
const getLocalRecords = (): AmalanRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load local data", e);
    return [];
  }
};

export const getAllRecords = async (studentName?: string): Promise<AmalanRecord[]> => {
  try {
    let query = supabase.from('amalan_records').select('*');
    
    if (studentName) {
      query = query.eq('student_name', studentName);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    // Update local cache if we fetched everything (or merge?)
    // For simplicity, we just return the data. 
    // In a real offline-first app, we would merge.
    if (data) return data as AmalanRecord[];
    return [];
  } catch (e) {
    console.error("Failed to fetch records from Supabase", e);
    return getLocalRecords(); // Fallback to local
  }
};

export const saveRecord = async (record: AmalanRecord) => {
  // 1. Save to Local Storage (Optimistic / Backup)
  const localRecords = getLocalRecords();
  const index = localRecords.findIndex(r => r.student_name === record.student_name && r.day === record.day);
  
  if (index >= 0) {
    localRecords[index] = record;
  } else {
    localRecords.push(record);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(localRecords));
  
  // 2. Save to Supabase
  try {
    // We need to remove 'id' if it exists in the record object to avoid issues, 
    // but AmalanRecord type doesn't have id.
    // However, Supabase returns it.
    const { id, ...recordData } = record as any;
    
    const { error } = await supabase
      .from('amalan_records')
      .upsert(recordData, { onConflict: 'student_name,day' });
      
    if (error) throw error;
    console.log('Saved to Supabase successfully');
  } catch (e) {
    console.error("Failed to save to Supabase", e);
    // We already saved to local storage, so user data is safe locally.
  }
};

export const getRecord = async (studentName: string, day: number): Promise<AmalanRecord | undefined> => {
  try {
    const { data, error } = await supabase
      .from('amalan_records')
      .select('*')
      .eq('student_name', studentName)
      .eq('day', day)
      .single();
      
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"
    
    if (data) return data as AmalanRecord;
    
    // Fallback to local if not found (maybe offline?)
    const localRecords = getLocalRecords();
    return localRecords.find(r => r.student_name === studentName && r.day === day);
  } catch (e) {
    console.error("Error fetching record", e);
    const localRecords = getLocalRecords();
    return localRecords.find(r => r.student_name === studentName && r.day === day);
  }
};

export const getTotalExp = async (studentName: string): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('amalan_records')
      .select('total_exp')
      .eq('student_name', studentName);
      
    if (error) throw error;
    
    return data?.reduce((sum, r) => sum + (r.total_exp || 0), 0) || 0;
  } catch (e) {
    console.error("Error calculating total EXP", e);
    const localRecords = getLocalRecords();
    return localRecords
      .filter(r => r.student_name === studentName)
      .reduce((sum, r) => sum + r.total_exp, 0);
  }
};

export const getLeaderboard = async (): Promise<StudentRank[]> => {
  try {
    // Fetch all records to calculate leaderboard
    // In a production app with many records, you'd use a database view or RPC
    const { data, error } = await supabase
      .from('amalan_records')
      .select('student_name, total_exp');
      
    if (error) throw error;
    
    const expMap = new Map<string, number>();
    
    // Initialize with 0 for all students
    students.forEach(s => expMap.set(s, 0));
    
    // Sum up EXP from DB records
    data?.forEach((r: any) => {
      const current = expMap.get(r.student_name) || 0;
      expMap.set(r.student_name, current + (r.total_exp || 0));
    });
    
    return Array.from(expMap.entries())
      .map(([name, exp]) => ({ name, exp }))
      .sort((a, b) => b.exp - a.exp);
      
  } catch (e) {
    console.error("Error fetching leaderboard", e);
    // Fallback to local
    const records = getLocalRecords();
    const expMap = new Map<string, number>();
    students.forEach(s => expMap.set(s, 0));
    records.forEach(r => {
      const current = expMap.get(r.student_name) || 0;
      expMap.set(r.student_name, current + r.total_exp);
    });
    return Array.from(expMap.entries())
      .map(([name, exp]) => ({ name, exp }))
      .sort((a, b) => b.exp - a.exp);
  }
};

export const getDateFromRamadhanDay = (day: number): Date => {
  const ramadhanStart = new Date(2026, 1, 19);
  const targetDate = new Date(ramadhanStart);
  targetDate.setDate(ramadhanStart.getDate() + (day - 1));
  return targetDate;
};

export const convertToHijri = (date: Date): string => {
  const anchorDate = new Date(2026, 1, 19); // 19 Feb 2026 = 1 Ramadhan
  anchorDate.setHours(0, 0, 0, 0);
  
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  const diffTime = targetDate.getTime() - anchorDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Calculate Ramadhan day
  const ramadhanDay = diffDays + 1;
  
  // If within reasonable Ramadhan range (e.g. 1-30), return specific format
  if (ramadhanDay >= 1 && ramadhanDay <= 30) {
    return `${ramadhanDay} Ramadhan 1447 H`;
  }
  
  // Fallback for other dates (approximate)
  const J = Math.floor((11 * date.getFullYear() + 3) / 30);
  const K = Math.floor((date.getMonth() + 1) * 3.6 - 0.5) + Math.floor(date.getDate() / 10.875);
  let H = (date.getFullYear() - 1970) * 365 + Math.floor((date.getFullYear() - 1969) / 4) - Math.floor((date.getFullYear() - 1901) / 100) + Math.floor((date.getFullYear() - 1601) / 400) + date.getDate() + K - J - 1948440;
  
  let N = H + 1;
  let Q = Math.floor(N / 10631);
  N = N % 10631;
  let R = Math.floor(N / 30);
  let S = N % 30;
  
  const hijriYear = Q * 30 + R + 1;
  const hijriMonth = Math.floor((S * 11 + 3) / 325) + 1;
  const hijriDay = S - Math.floor((hijriMonth * 325 - 3) / 11) + 1;
  
  const monthsHijri = ['Muh', 'Saf', 'R.Aw', 'R.Akh', 'Jum.Aw', 'Jum.Akh', 'Raj', 'Sha', 'Ram', 'Syaw', 'Dhu.Q', 'Dhu.H'];
  const monthName = monthsHijri[hijriMonth - 1] || '';
  
  return `${hijriDay} ${monthName} ${hijriYear} H`;
};

export const exportDataToCSV = async () => {
  const records = await getAllRecords();
  if (records.length === 0) {
    alert("Belum ada data untuk diekspor!");
    return;
  }

  const headers = [
    "student_name", "day", "sholat_subuh", "sholat_dzuhur", "sholat_ashar", 
    "sholat_maghrib", "sholat_isya", "sholat_tarawih", "sholat_dhuha", 
    "infaq", "dzikir", "itikaf", "tausiyah_ustadz", "tausiyah_tema", 
    "tausiyah_intisari", "quran_pages", "total_exp", "updated_at"
  ];

  const csvContent = [
    headers.join(","),
    ...records.map(r => [
      `"${r.student_name}"`,
      r.day,
      r.sholat_subuh || "",
      r.sholat_dzuhur || "",
      r.sholat_ashar || "",
      r.sholat_maghrib || "",
      r.sholat_isya || "",
      r.sholat_tarawih || "",
      r.sholat_dhuha,
      r.infaq,
      r.dzikir,
      r.itikaf,
      `"${(r.tausiyah_ustadz || "").replace(/"/g, '""')}"`,
      `"${(r.tausiyah_tema || "").replace(/"/g, '""')}"`,
      `"${(r.tausiyah_intisari || "").replace(/"/g, '""')}"`,
      r.quran_pages,
      r.total_exp,
      r.updated_at
    ].join(","))
  ].join("\n");

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "petualangan_ramadhan_data.csv");
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
