import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure the data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const dbPath = path.join(dataDir, 'ramadhan.db');
const db = new Database(dbPath);

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_name TEXT NOT NULL,
    day INTEGER NOT NULL,
    sholat_subuh TEXT,
    sholat_dzuhur TEXT,
    sholat_ashar TEXT,
    sholat_maghrib TEXT,
    sholat_isya TEXT,
    sholat_tarawih TEXT,
    sholat_dhuha BOOLEAN,
    infaq BOOLEAN,
    dzikir BOOLEAN,
    itikaf BOOLEAN,
    tausiyah_ustadz TEXT,
    tausiyah_tema TEXT,
    tausiyah_intisari TEXT,
    quran_pages INTEGER DEFAULT 0,
    total_exp INTEGER DEFAULT 0,
    updated_at TEXT,
    UNIQUE(student_name, day)
  )
`);

export default db;
