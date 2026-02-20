import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import db from './src/db/index.js';
import cors from 'cors';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get('/api/records', (req, res) => {
    try {
      const { student_name, day } = req.query;
      let query = 'SELECT * FROM records';
      let params: any[] = [];

      if (student_name && day) {
        query += ' WHERE student_name = ? AND day = ?';
        params = [student_name, day];
      } else if (student_name) {
        query += ' WHERE student_name = ?';
        params = [student_name];
      }

      const records = db.prepare(query).all(...params);
      res.json(records);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch records' });
    }
  });

  app.post('/api/records', (req, res) => {
    try {
      const record = req.body;
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO records (
          student_name, day, sholat_subuh, sholat_dzuhur, sholat_ashar, 
          sholat_maghrib, sholat_isya, sholat_tarawih, sholat_dhuha, 
          infaq, dzikir, itikaf, tausiyah_ustadz, tausiyah_tema, tausiyah_intisari,
          quran_pages, total_exp, updated_at
        ) VALUES (
          @student_name, @day, @sholat_subuh, @sholat_dzuhur, @sholat_ashar, 
          @sholat_maghrib, @sholat_isya, @sholat_tarawih, @sholat_dhuha, 
          @infaq, @dzikir, @itikaf, @tausiyah_ustadz, @tausiyah_tema, @tausiyah_intisari,
          @quran_pages, @total_exp, @updated_at
        )
      `);
      
      // Convert boolean to number (0/1) for sqlite
      const params = {
        ...record,
        sholat_dhuha: record.sholat_dhuha ? 1 : 0,
        infaq: record.infaq ? 1 : 0,
        dzikir: record.dzikir ? 1 : 0,
        itikaf: record.itikaf ? 1 : 0
      };

      stmt.run(params);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to save record' });
    }
  });

  app.get('/api/leaderboard', (req, res) => {
    try {
      // Calculate total exp per student
      const leaderboard = db.prepare(`
        SELECT student_name as name, SUM(total_exp) as exp
        FROM records
        GROUP BY student_name
        ORDER BY exp DESC
      `).all();
      res.json(leaderboard);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
