import { AmalanRecord, StudentRank } from '../types';
import { students } from '../data/students';

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

export const getAllRecords = (): AmalanRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load data", e);
    return [];
  }
};

export const saveRecord = (record: AmalanRecord) => {
  const records = getAllRecords();
  const index = records.findIndex(r => r.student_name === record.student_name && r.day === record.day);
  
  if (index >= 0) {
    records[index] = record;
  } else {
    records.push(record);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  
  // Sync to Google Sheets (Fire and forget)
  syncToDatabase(record);
};

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwNDQu15Nq_uN4s0-ZHN-MdBSgGtD6F1gRm21QqVMpoVJNkF2FZtKCKGGuUePsc45amag/exec';

const syncToDatabase = async (record: AmalanRecord) => {
  try {
    // We use no-cors to avoid CORS issues with Google Apps Script
    // sending as text/plain allows the request to go through without preflight
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', 
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(record)
    });
    console.log('Data synced to cloud');
  } catch (error) {
    console.error('Failed to sync data to cloud', error);
  }
};

export const getRecord = (studentName: string, day: number): AmalanRecord | undefined => {
  const records = getAllRecords();
  return records.find(r => r.student_name === studentName && r.day === day);
};

export const getTotalExp = (studentName: string): number => {
  const records = getAllRecords();
  return records
    .filter(r => r.student_name === studentName)
    .reduce((sum, r) => sum + r.total_exp, 0);
};

export const getLeaderboard = (): StudentRank[] => {
  // We need to include all students, even those with 0 EXP
  const records = getAllRecords();
  const expMap = new Map<string, number>();
  
  // Initialize with 0
  students.forEach(s => expMap.set(s, 0));
  
  // Add actual exp
  records.forEach(r => {
    const current = expMap.get(r.student_name) || 0;
    expMap.set(r.student_name, current + r.total_exp); // Note: total_exp is stored in record
    // Or recalculate? Better to use stored total_exp if we trust it, or recalculate to be safe.
    // Let's recalculate to be safe against corrupted data
    // actually calculateExp takes a record.
  });

  // Re-calculate total from records to be sure
  const calculatedExpMap = new Map<string, number>();
  students.forEach(s => calculatedExpMap.set(s, 0));
  
  records.forEach(r => {
    if (calculatedExpMap.has(r.student_name)) {
       calculatedExpMap.set(r.student_name, calculatedExpMap.get(r.student_name)! + calculateExp(r));
    }
  });

  return Array.from(calculatedExpMap.entries())
    .map(([name, exp]) => ({ name, exp }))
    .sort((a, b) => b.exp - a.exp);
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

export const exportDataToCSV = () => {
  const records = getAllRecords();
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
