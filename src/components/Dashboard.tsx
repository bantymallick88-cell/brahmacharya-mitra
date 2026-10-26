import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, Award, RotateCcw, AlertTriangle, Check, Plus, Minus,
  Dumbbell, BookOpen, Droplets, Sparkles, Clock, Calendar,
  ShieldCheck, RefreshCw, ChevronRight, X, SlidersHorizontal
} from 'lucide-react';
import { getStoredStreak, updateGlobalStreak, logRelapse } from '../streakStore';
import Habits from './Habits';

export default function Dashboard() {
  const initial = getStoredStreak();
  const [streakDays, setStreakDays] = useState(initial.days);
  const [bestDays, setBestDays] = useState(initial.bestDays);
  const [attemptNumber, setAttemptNumber] = useState(initial.attemptNumber);
  const [confirmRelapseOpen, setConfirmRelapseOpen] = useState(false);
  const [showQuickPresets, setShowQuickPresets] = useState(false);

  // Real-time Sobriety Timer: Days, Hours, Minutes, Seconds
  const [timeState, setTimeState] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45,
  });



  // Sync streak from global store & custom events
  useEffect(() => {
    const current = getStoredStreak();
    setStreakDays(current.days);
    setBestDays(current.bestDays);
    setAttemptNumber(current.attemptNumber);

    const handleStreakChange = (e: any) => {
      if (e.detail?.days !== undefined) setStreakDays(e.detail.days);
      if (e.detail?.bestDays !== undefined) setBestDays(e.detail.bestDays);
      if (e.detail?.attemptNumber !== undefined) setAttemptNumber(e.detail.attemptNumber);
    };
    window.addEventListener('streak-updated', handleStreakChange);

    return () => window.removeEventListener('streak-updated', handleStreakChange);
  }, []);

  // Live second-by-second ticker
  useEffect(() => {
    const updateTicker = () => {
      try {
        const startTimeStr = localStorage.getItem('bm_streak_start_time');
        const start = startTimeStr ? new Date(startTimeStr).getTime() : Date.now() - (streakDays * 86400000);
        const elapsed = Math.max(0, Date.now() - start);

        const d = Math.floor(elapsed / (1000 * 60 * 60 * 24));
        const h = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
        const m = Math.floor((elapsed / (1000 * 60)) % 60);
        const s = Math.floor((elapsed / 1000) % 60);

        // Keep days synced with stored streak
        setTimeState({ hours: h, minutes: m, seconds: s });
      } catch {
        setTimeState(prev => {
          const nextSec = (prev.seconds + 1) % 60;
          const nextMin = nextSec === 0 ? (prev.minutes + 1) % 60 : prev.minutes;
          const nextHr = nextSec === 0 && nextMin === 0 ? (prev.hours + 1) % 24 : prev.hours;
          return { hours: nextHr, minutes: nextMin, seconds: nextSec };
        });
      }
    };

    updateTicker();
    const interval = setInterval(updateTicker, 1000);
    return () => clearInterval(interval);
  }, [streakDays]);



  const handleRelapseReset = () => {
    logRelapse();
    setConfirmRelapseOpen(false);
  };

  const handleSetStreak = (days: number) => {
    updateGlobalStreak(days);
  };

  // Circular progress calculations (based on 90-day mastery cycle)
  const radius = 108;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = Math.min(100, Math.max(5, (streakDays / 90) * 100));
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <section id="streak" className="py-8 sm:py-12 relative w-full max-w-full overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-6">

        {/* ── Main Dashboard Glass Panel (Compact Mobile-App Layout) ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative backdrop-blur-3xl bg-zinc-950/80 rounded-3xl p-4 sm:p-7 border border-amber-500/30 hover:border-amber-400/60 shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_35px_rgba(245,158,11,0.15)] flex flex-col items-center text-center w-full max-w-full"
        >
          {/* Subtle Ambient Cosmic Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] bg-[radial-gradient(circle,rgba(236,72,153,0.12)_0%,rgba(168,85,247,0.15)_35%,rgba(245,158,11,0.12)_65%,transparent_80%)] blur-3xl rounded-full pointer-events-none -z-10 animate-aura-pulse" />

          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-amber-500/15 border border-purple-500/40 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Flame className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
            <span>Sadhana Sobriety & Akhand Streak Engine</span>
          </div>

          {/* ── Animated Circular Streak Timer (Matching 1st Screenshot) ── */}
          <div className="relative my-4 flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72">

            {/* Ambient Conic Ring Glow */}
            <div
              className="absolute inset-1 rounded-full z-0 opacity-40 blur-md pointer-events-none animate-spin-slow"
              style={{
                background: 'conic-gradient(from 0deg, #ec4899, #a855f7, #6366f1, #f59e0b, #ec4899)',
                animationDuration: '20s',
              }}
            />

            {/* SVG Circular Progress Ring with Pink-to-Amber Neon Gradient */}
            <svg
              className="w-full h-full transform -rotate-90 relative z-10"
              viewBox="0 0 250 250"
            >
              <defs>
                <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="45%" stopColor="#a855f7" />
                  <stop offset="75%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#fde047" />
                </linearGradient>

                <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background Track Ring */}
              <circle
                cx="125"
                cy="125"
                r={radius}
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth="11"
                fill="none"
              />

              {/* Animated Foreground Neon Progress Ring */}
              <circle
                cx="125"
                cy="125"
                r={radius}
                stroke="url(#neonGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
                filter="url(#neonGlow)"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset,
                  transition: 'stroke-dashoffset 1s ease-in-out',
                }}
              />
            </svg>

            {/* Inner Dark Surface & Live Sobriety Counter Display */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-b from-zinc-950/95 via-black to-[#050508] border border-white/10 flex flex-col items-center justify-center p-4 z-20 shadow-[inset_0_0_30px_rgba(0,0,0,0.9)]">
              {/* Huge Bold Days Count */}
              <span className="text-5xl sm:text-6xl font-black font-cinzel text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] tracking-tight">
                {streakDays}
              </span>
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-300 -mt-1 mb-2">
                Days Clean
              </span>

              {/* Real-time Second-by-Second Sobriety Ticker: Hrs : Mins : Secs */}
              <div className="px-3 py-1 rounded-xl bg-zinc-900/90 border border-zinc-800/80 shadow-inner flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold text-zinc-200">
                <span className="text-pink-400">{String(timeState.hours).padStart(2, '0')}</span>
                <span className="text-zinc-600">:</span>
                <span className="text-purple-400">{String(timeState.minutes).padStart(2, '0')}</span>
                <span className="text-zinc-600">:</span>
                <span className="text-amber-400">{String(timeState.seconds).padStart(2, '0')}</span>
              </div>
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1">
                Sobriety Ticker
              </span>
            </div>
          </div>

          {/* ── Stats Row Below Timer: BEST & ATTEMPT & Relapse Trigger Button ── */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-3 mb-3 w-full max-w-md">
            {/* BEST Record Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 min-w-[110px] p-2 sm:p-2.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-500/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] transition text-center shadow-sm cursor-default"
            >
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">BEST</span>
              <span className="text-sm sm:text-base font-black text-amber-300 font-cinzel">{bestDays} days</span>
            </motion.div>

            {/* ATTEMPT Count Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 min-w-[110px] p-2 sm:p-2.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-purple-500/40 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition text-center shadow-sm cursor-default"
            >
              <span className="text-[9px] sm:text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">ATTEMPT</span>
              <span className="text-sm sm:text-base font-black text-white font-cinzel">
                {attemptNumber}{attemptNumber === 1 ? 'st' : attemptNumber === 2 ? 'nd' : attemptNumber === 3 ? 'rd' : 'th'}
              </span>
            </motion.div>

            {/* Relapse Trigger / Reset Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setConfirmRelapseOpen(true)}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-2.5 rounded-2xl bg-red-950/50 hover:bg-red-900/70 border border-red-500/50 hover:border-red-400 text-red-200 hover:text-white font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:shadow-[0_0_25px_rgba(239,68,68,0.45)] transition cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
              <span>Relapse Log</span>
            </motion.button>
          </div>

          {/* ── Quick Streak Adjuster & Milestone Test Bar ── */}
          <div className="w-full max-w-lg mb-4 p-2.5 sm:p-3 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 backdrop-blur-md">
            <div className="flex items-center justify-between gap-2 mb-1.5 text-xs font-semibold text-zinc-400">
              <span className="flex items-center gap-1 text-amber-300 text-[11px] sm:text-xs">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Adjust Streak & Unlock Wallpapers</span>
              </span>
              <div className="flex items-center gap-1.5">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSetStreak(Math.max(0, streakDays - 1))}
                  className="p-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition cursor-pointer"
                  title="Minus 1 Day"
                >
                  <Minus className="w-3.5 h-3.5" />
                </motion.button>
                <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold font-mono text-xs">
                  Day {streakDays}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSetStreak(streakDays + 1)}
                  className="p-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition cursor-pointer"
                  title="Plus 1 Day"
                >
                  <Plus className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>

            {/* Quick Milestone presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-bold">
              {[1, 2, 3, 5, 8, 14, 21, 30, 90, 125, 141].map((d) => (
                <motion.button
                  key={d}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => handleSetStreak(d)}
                  className={`px-2.5 py-0.5 sm:py-1 rounded-xl whitespace-nowrap transition cursor-pointer text-[10px] sm:text-[11px] ${
                    streakDays === d
                      ? 'bg-amber-400 text-zinc-950 font-black shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                      : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                  }`}
                >
                  Day {d}
                </motion.button>
              ))}
            </div>
          </div>

          {/* ── Compact Single-Line Horizontal Motion Habits Carousel ── */}
          <div className="w-full pt-3 border-t border-zinc-800/80">
            <Habits />
          </div>

        </motion.div>

      </div>

      {/* ── Relapse Reset Confirmation Modal ── */}
      <AnimatePresence>
        {confirmRelapseOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-3xl bg-zinc-950 border border-red-500/60 p-6 shadow-2xl text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto shadow-lg">
                <AlertTriangle className="w-6 h-6 animate-pulse" />
              </div>

              <div>
                <h3 className="text-base font-bold text-white">Log a Relapse & Reset Streak?</h3>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  Honesty with yourself is the first step of genuine Brahmacharya. Your attempt count will advance to #{attemptNumber + 1}. Remember: Every master failed until he did not.
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-2">
                <button
                  onClick={() => setConfirmRelapseOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-zinc-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRelapseReset}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black transition shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                >
                  Confirm Reset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
