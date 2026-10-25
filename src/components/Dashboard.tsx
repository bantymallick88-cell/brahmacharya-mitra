import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, Award, RotateCcw, AlertTriangle, Check, Plus,
  Dumbbell, BookOpen, Droplets, Sparkles, Clock, Calendar,
  ShieldCheck, RefreshCw, ChevronRight, X
} from 'lucide-react';

interface HabitItem {
  id: string;
  name: string;
  icon: string;
  completed: number;
  total: number;
  unit: string;
  color: string;
}

const INITIAL_HABITS: HabitItem[] = [
  { id: 'workout', name: 'WORKOUT', icon: '🏋️‍♂️', completed: 0, total: 7, unit: 'days', color: 'from-amber-400 to-yellow-500' },
  { id: 'reading', name: 'READING', icon: '📚', completed: 0, total: 7, unit: 'days', color: 'from-purple-400 to-indigo-500' },
  { id: 'cold_shower', name: 'COLD SHOWER', icon: '🧊', completed: 0, total: 7, unit: 'days', color: 'from-cyan-400 to-blue-500' },
  { id: 'meditation', name: 'MEDITATION', icon: '🧘', completed: 0, total: 7, unit: 'days', color: 'from-emerald-400 to-teal-500' },
];

export default function Dashboard() {
  const [streakDays, setStreakDays] = useState(7);
  const [bestDays, setBestDays] = useState(45);
  const [attemptNumber, setAttemptNumber] = useState(3);
  const [confirmRelapseOpen, setConfirmRelapseOpen] = useState(false);

  // Real-time Sobriety Timer: Days, Hours, Minutes, Seconds
  const [timeState, setTimeState] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  // Daily Habits State
  const [habits, setHabits] = useState<HabitItem[]>(() => {
    try {
      const saved = localStorage.getItem('bm_daily_habits');
      return saved ? JSON.parse(saved) : INITIAL_HABITS;
    } catch {
      return INITIAL_HABITS;
    }
  });

  // Sync streak from localStorage & custom events
  useEffect(() => {
    try {
      const savedDays = localStorage.getItem('bm_streak_days');
      if (savedDays) setStreakDays(parseInt(savedDays, 10));

      const savedBest = localStorage.getItem('bm_best_days');
      if (savedBest) setBestDays(parseInt(savedBest, 10));

      const savedAttempt = localStorage.getItem('bm_attempt_num');
      if (savedAttempt) setAttemptNumber(parseInt(savedAttempt, 10));

      // Calculate timer offset from stored start time or synthesize clock
      const startTimeStr = localStorage.getItem('bm_streak_start_time');
      if (!startTimeStr) {
        // Set a default start time based on streakDays
        const defaultStart = new Date(Date.now() - (streakDays * 86400000 + 14 * 3600000 + 32 * 60000));
        localStorage.setItem('bm_streak_start_time', defaultStart.toISOString());
      }
    } catch {}

    const handleStreakChange = (e: any) => {
      if (e.detail?.days !== undefined) setStreakDays(e.detail.days);
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

        setStreakDays(d);
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

  // Persist habits
  useEffect(() => {
    try {
      localStorage.setItem('bm_daily_habits', JSON.stringify(habits));
    } catch {}
  }, [habits]);

  const handleIncrementHabit = (id: string) => {
    setHabits(prev => prev.map(h => {
      if (h.id === id) {
        const nextVal = h.completed >= h.total ? 0 : h.completed + 1;
        return { ...h, completed: nextVal };
      }
      return h;
    }));
  };

  const handleRelapseReset = () => {
    try {
      const newAttempt = attemptNumber + 1;
      setAttemptNumber(newAttempt);
      localStorage.setItem('bm_attempt_num', String(newAttempt));

      // Reset streak days
      setStreakDays(0);
      localStorage.setItem('bm_streak_days', '0');
      localStorage.setItem('bm_streak_start_time', new Date().toISOString());

      window.dispatchEvent(new CustomEvent('streak-updated', { detail: { days: 0 } }));
      setConfirmRelapseOpen(false);
    } catch {}
  };

  // Circular progress calculations (based on 90-day mastery cycle)
  const radius = 108;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = Math.min(100, Math.max(5, (streakDays / 90) * 100));
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <section id="streak" className="py-16 sm:py-20 relative w-full max-w-full overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* ── Main Dashboard Glass Panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative backdrop-blur-3xl bg-zinc-950/80 rounded-3xl p-6 sm:p-10 border border-amber-500/30 hover:border-amber-400/60 shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.15)] flex flex-col items-center text-center w-full max-w-full"
        >
          {/* Subtle Ambient Cosmic Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] bg-[radial-gradient(circle,rgba(236,72,153,0.12)_0%,rgba(168,85,247,0.15)_35%,rgba(245,158,11,0.12)_65%,transparent_80%)] blur-3xl rounded-full pointer-events-none -z-10 animate-aura-pulse" />

          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-amber-500/15 border border-purple-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-6 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Flame className="w-4 h-4 text-pink-400 fill-pink-400" />
            <span>MDF Sobriety & Akhand Streak Engine</span>
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
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-4 mb-8 w-full max-w-md">
            {/* BEST Record Card */}
            <div className="flex-1 min-w-[120px] p-2.5 sm:p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center shadow-sm">
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">BEST</span>
              <span className="text-sm sm:text-base font-black text-amber-300 font-cinzel">{bestDays} days</span>
            </div>

            {/* ATTEMPT Count Card */}
            <div className="flex-1 min-w-[120px] p-2.5 sm:p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-center shadow-sm">
              <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">ATTEMPT</span>
              <span className="text-sm sm:text-base font-black text-white font-cinzel">
                {attemptNumber}{attemptNumber === 1 ? 'st' : attemptNumber === 2 ? 'nd' : attemptNumber === 3 ? 'rd' : 'th'}
              </span>
            </div>

            {/* Relapse Trigger / Reset Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setConfirmRelapseOpen(true)}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 sm:py-3 rounded-2xl bg-red-950/50 hover:bg-red-900/70 border border-red-500/50 hover:border-red-400 text-red-200 hover:text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(239,68,68,0.25)] transition cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>Relapse Log</span>
            </motion.button>
          </div>

          {/* ── Daily Habit Tracking Cards Section Below Timer ── */}
          <div className="w-full pt-4 border-t border-zinc-800/80 text-left">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white font-cinzel flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Daily Habit Transformation</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Tap card to check off daily streak discipline (0/7 target)
                </p>
              </div>
              <span className="text-xs font-bold text-amber-400 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                Weekly Target
              </span>
            </div>

            {/* 4 Habit Cards Grid */}
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 w-full">
              {habits.map((habit) => {
                const progressPct = (habit.completed / habit.total) * 100;
                const isMax = habit.completed >= habit.total;

                return (
                  <motion.div
                    key={habit.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleIncrementHabit(habit.id)}
                    className="p-3.5 rounded-2xl bg-zinc-950/70 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-amber-400/50 transition-all cursor-pointer shadow-md group relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{habit.icon}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isMax
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 group-hover:border-amber-500/40'
                      }`}>
                        {habit.completed}/{habit.total}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      {habit.name}
                    </h4>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800 mt-2.5">
                      <div
                        className={`h-full bg-gradient-to-r ${habit.color} transition-all duration-300`}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
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
