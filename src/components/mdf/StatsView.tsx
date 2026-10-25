import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Flame, Award, TrendingUp, Calendar, Droplets, Clock,
  ShieldCheck, AlertTriangle, ChevronLeft, ChevronRight, Zap
} from 'lucide-react';

export default function StatsView() {
  const [streakDays, setStreakDays] = useState(7);
  const [selectedMonth, setSelectedMonth] = useState('October 2026');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bm_streak_days');
      if (saved) setStreakDays(parseInt(saved, 10));
    } catch {}
  }, []);

  const totalDropsPreserved = streakDays * 40;
  const hoursReclaimed = (streakDays * 2.5).toFixed(1);
  const successRate = 97.4;
  const bestStreak = Math.max(streakDays, 45);

  // Generate 31 calendar days
  const calendarDays = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const isClean = day <= streakDays;
    const isToday = day === streakDays;
    return { day, isClean, isToday };
  });

  return (
    <div className="flex flex-col h-full text-zinc-100 space-y-4 overflow-y-auto pr-1 pb-16">
      {/* ── Top Metric Highlights ── */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Current Streak</span>
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-black font-cinzel text-white metallic-gold-text">{streakDays}</span>
            <span className="text-xs text-amber-300 ml-1.5 font-bold">Days Clean</span>
          </div>
          <span className="text-[10px] text-zinc-400">Akhand Sadhak Mode</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Best Record</span>
            <Award className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-black font-cinzel text-white">{bestStreak}</span>
            <span className="text-xs text-zinc-400 ml-1.5 font-bold">Days High</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-medium">97.4% Preservation Rate</span>
        </div>
      </div>

      {/* ── Veerya & Vitality Bio-Metrics ── */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/70">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-1">
            <Droplets className="w-3.5 h-3.5" />
            <span>Drops Preserved</span>
          </div>
          <div className="text-xl font-bold font-cinzel text-white">~{totalDropsPreserved}</div>
          <p className="text-[10px] text-zinc-400 mt-0.5">1 drop = 40 drops of blood & bone marrow essence</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/70">
          <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Time Reclaimed</span>
          </div>
          <div className="text-xl font-bold font-cinzel text-white">{hoursReclaimed} hrs</div>
          <p className="text-[10px] text-zinc-400 mt-0.5">Reclaimed from brain fog, screens & post-relapse lethargy</p>
        </div>
      </div>

      {/* ── Interactive Streak History Calendar ── */}
      <div className="p-4 rounded-3xl bg-zinc-950/80 border border-amber-500/25 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{selectedMonth}</h4>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
            {streakDays} Clean Days
          </span>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
            <div key={i} className="text-[10px] font-bold text-zinc-500 py-1">
              {d}
            </div>
          ))}
          {calendarDays.map(item => (
            <div
              key={item.day}
              className={`h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all relative ${
                item.isToday
                  ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.8)] scale-105'
                  : item.isClean
                  ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                  : 'bg-zinc-900/60 border border-zinc-800 text-zinc-600'
              }`}
            >
              <span>{item.day}</span>
              {item.isClean && !item.isToday && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-emerald-400" />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between text-[11px] pt-1 text-zinc-400 border-t border-zinc-800/80">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-emerald-500/60 border border-emerald-400/80" />
            <span>Preserved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-amber-400" />
            <span>Today</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded bg-zinc-800" />
            <span>Upcoming</span>
          </div>
        </div>
      </div>

      {/* ── Transmutation Milestones ── */}
      <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-2.5">
        <h4 className="text-xs font-bold text-white flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Neurochemical Stages Progress</span>
        </h4>

        {[
          { range: 'Day 1 - 7', title: 'Bhasma (Physical Detox)', done: streakDays >= 7, current: streakDays < 7 },
          { range: 'Day 8 - 21', title: 'Tejas (Dopamine Reset & Clarity)', done: streakDays >= 21, current: streakDays >= 7 && streakDays < 21 },
          { range: 'Day 22 - 45', title: 'Ojas (Supreme Vigor & Magnetism)', done: streakDays >= 45, current: streakDays >= 21 && streakDays < 45 },
          { range: 'Day 46 - 90', title: 'Urdhva-Retas (Spiritual Awakening)', done: streakDays >= 90, current: streakDays >= 45 && streakDays < 90 },
        ].map((stage, i) => (
          <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
            <div className="flex items-center gap-2.5">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                stage.done ? 'bg-emerald-500 text-black font-bold' : stage.current ? 'bg-amber-400 text-black font-bold animate-pulse' : 'bg-zinc-800 text-zinc-500'
              }`}>
                {stage.done ? '✓' : i + 1}
              </div>
              <div>
                <div className={`text-xs font-bold ${stage.current ? 'text-amber-300' : stage.done ? 'text-white' : 'text-zinc-500'}`}>
                  {stage.title}
                </div>
                <div className="text-[10px] text-zinc-500">{stage.range}</div>
              </div>
            </div>
            {stage.current && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                Active Phase
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
