import React, { useEffect, useState } from 'react';
import { StudentRank } from '../types';
import { getLeaderboard } from '../utils/ramadhan';

interface LeaderboardProps {
  currentUser: string;
}

export default function Leaderboard({ currentUser }: LeaderboardProps) {
  const [rankings, setRankings] = useState<StudentRank[]>([]);

  useEffect(() => {
    const loadLeaderboard = async () => {
      const data = await getLeaderboard();
      setRankings(data);
    };
    loadLeaderboard();
  }, []);

  const myRankIndex = rankings.findIndex(r => r.name === currentUser);
  const myRank = rankings[myRankIndex];

  return (
    <section className="space-y-6 animate-slide-in">
      <div className="card-gradient rounded-3xl p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-2xl">🏆</div>
          <div>
            <h2 className="text-2xl font-bold text-yellow-400">Leaderboard</h2>
            <p className="text-white/60 text-sm">Peringkat Kelas 6A SDN Pekayon 09</p>
          </div>
        </div>

        <div className="flex items-end justify-center gap-2 mb-6">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-3xl border-4 border-gray-400/50">
              🥈
            </div>
            <div className="bg-gray-400/30 rounded-t-xl p-3 h-20 flex flex-col justify-end">
              <p className="font-bold text-sm text-white truncate w-20 sm:w-24 mx-auto">{rankings[1]?.name.split(' ')[0] || '-'}</p>
              <p className="text-xs text-gray-300">{rankings[1]?.exp || 0} EXP</p>
            </div>
          </div>

          {/* 1st Place */}
          <div className="text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-2 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-4xl border-4 border-yellow-400/50 animate-pulse-glow">
              🥇
            </div>
            <div className="bg-yellow-500/30 rounded-t-xl p-3 h-28 flex flex-col justify-end">
              <p className="font-bold text-sm text-white truncate w-24 sm:w-28 mx-auto">{rankings[0]?.name.split(' ')[0] || '-'}</p>
              <p className="text-xs text-yellow-300">{rankings[0]?.exp || 0} EXP</p>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-3xl border-4 border-amber-600/50">
              🥉
            </div>
            <div className="bg-amber-700/30 rounded-t-xl p-3 h-16 flex flex-col justify-end">
              <p className="font-bold text-sm text-white truncate w-20 sm:w-24 mx-auto">{rankings[2]?.name.split(' ')[0] || '-'}</p>
              <p className="text-xs text-amber-300">{rankings[2]?.exp || 0} EXP</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl overflow-hidden">
          <div className="grid grid-cols-12 gap-2 p-3 bg-white/10 text-sm font-bold text-yellow-300">
            <div className="col-span-2 text-center">#</div>
            <div className="col-span-7">Nama</div>
            <div className="col-span-3 text-right">EXP</div>
          </div>
          <div className="divide-y divide-white/10 max-h-80 overflow-y-auto scroll-hidden">
            {rankings.map((student, index) => {
              const isCurrentUser = student.name === currentUser;
              const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';
              
              return (
                <div key={student.name} className={`grid grid-cols-12 gap-2 p-3 hover:bg-white/5 transition ${isCurrentUser ? 'bg-emerald-500/20' : ''}`}>
                  <div className={`col-span-2 text-center font-bold ${index < 3 ? 'text-yellow-400' : 'text-white/60'}`}>
                    {medal || (index + 1)}
                  </div>
                  <div className={`col-span-7 truncate ${isCurrentUser ? 'text-emerald-300 font-bold' : ''}`}>
                    {student.name}
                  </div>
                  <div className="col-span-3 text-right font-bold text-yellow-300">
                    {student.exp}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl p-4 border border-emerald-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-gray-900">
                {myRankIndex >= 0 ? myRankIndex + 1 : '-'}
              </div>
              <div>
                <p className="font-bold text-emerald-300">{currentUser}</p>
                <p className="text-xs text-white/60">Peringkatmu</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-yellow-300">{myRank?.exp || 0} EXP</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card-gradient rounded-xl p-4 border border-yellow-500/30">
        <p className="text-center text-yellow-200/80 italic text-sm">🏆 "Berlomba-lombalah dalam kebaikan" - QS. Al-Baqarah: 148</p>
      </div>
    </section>
  );
}
