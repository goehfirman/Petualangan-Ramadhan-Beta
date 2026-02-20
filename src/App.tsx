/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Puasa from './components/Puasa';
import Amalan from './components/Amalan';
import Quran from './components/Quran';
import Waktu from './components/Waktu';
import Leaderboard from './components/Leaderboard';
import { quotes } from './data/students';
import { 
  getRamadhanDay, 
  getRecord, 
  saveRecord, 
  getTotalExp, 
  getLeaderboard, 
  convertToHijri,
  getAllRecords
} from './utils/ramadhan';
import { AmalanRecord } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [currentDay, setCurrentDay] = useState(1);
  const [currentRecord, setCurrentRecord] = useState<AmalanRecord | undefined>(undefined);
  const [totalExp, setTotalExp] = useState(0);
  const [rank, setRank] = useState<number | string>('-');
  const [dailyQuote, setDailyQuote] = useState('');
  const [currentDateString, setCurrentDateString] = useState('');
  const [totalQuranPages, setTotalQuranPages] = useState(0);

  // Initialize
  useEffect(() => {
    // Set initial day based on date
    const day = getRamadhanDay();
    setCurrentDay(Math.min(30, Math.max(1, day)));
    
    // Set random quote
    setDailyQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    // Create stars
    const starsContainer = document.getElementById('stars');
    if (starsContainer && starsContainer.childElementCount === 0) {
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star animate-twinkle';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
      }
    }

    // Update time
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const gregorian = now.toLocaleDateString('id-ID', options);
      const hijri = convertToHijri(now);
      setCurrentDateString(`📅 ${gregorian} / 📆 ${hijri}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Load user data when user or day changes
  useEffect(() => {
    if (currentUser) {
      const record = getRecord(currentUser, currentDay);
      setCurrentRecord(record);
      
      const exp = getTotalExp(currentUser);
      setTotalExp(exp);

      const leaderboard = getLeaderboard();
      const myRankIndex = leaderboard.findIndex(r => r.name === currentUser);
      setRank(myRankIndex >= 0 ? myRankIndex + 1 : '-');

      // Calculate total quran pages
      const allRecords = getAllRecords().filter(r => r.student_name === currentUser);
      const pages = allRecords.reduce((sum, r) => sum + (r.quran_pages || 0), 0);
      setTotalQuranPages(pages);
    }
  }, [currentUser, currentDay, activeSection]); // Reload on section change to refresh leaderboard/exp

  const handleLogin = (name: string) => {
    setCurrentUser(name);
    setActiveSection('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveSection('home');
  };

  const handleSaveRecord = (record: AmalanRecord) => {
    saveRecord(record);
    setCurrentRecord(record);
    // Update exp immediately
    setTotalExp(getTotalExp(currentUser!));
  };

  if (!currentUser) {
    return (
      <div className="h-full overflow-auto scroll-hidden gradient-bg text-white relative">
        <div id="stars" className="fixed inset-0 pointer-events-none z-0"></div>
        <div className="fixed top-8 right-8 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-300 shadow-2xl animate-float z-10 opacity-90"></div>
        <div className="relative z-20">
          <Login onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto scroll-hidden gradient-bg text-white relative font-poppins">
      <div id="stars" className="fixed inset-0 pointer-events-none z-0"></div>
      <div className="fixed top-8 right-8 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-300 shadow-2xl animate-float z-10 opacity-90"></div>
      
      <div className="relative z-20 min-h-screen pb-20">
        <Navbar 
          currentUser={currentUser} 
          totalExp={totalExp} 
          activeSection={activeSection} 
          onNavigate={setActiveSection} 
          onLogout={handleLogout}
          currentDate={currentDateString}
        />

        <main className="max-w-5xl mx-auto p-4">
          {activeSection === 'home' && (
            <Home 
              day={currentDay} 
              exp={totalExp} 
              quranPages={totalQuranPages} 
              rank={rank} 
              quote={dailyQuote}
              onNavigate={setActiveSection}
            />
          )}
          
          {activeSection === 'puasa' && <Puasa />}
          
          {activeSection === 'amalan' && (
            <Amalan 
              currentUser={currentUser} 
              currentDay={currentDay} 
              record={currentRecord} 
              onSave={handleSaveRecord}
              onDayChange={setCurrentDay}
            />
          )}
          
          {activeSection === 'quran' && <Quran totalQuranPages={totalQuranPages} />}
          
          {activeSection === 'waktu' && <Waktu currentDate={currentDateString} />}
          
          {activeSection === 'leaderboard' && <Leaderboard currentUser={currentUser} />}
        </main>
      </div>
    </div>
  );
}
