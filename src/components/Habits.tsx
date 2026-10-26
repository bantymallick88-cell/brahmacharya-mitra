import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Check, Download, Flame, Eye, X, Shield, Lock
} from 'lucide-react';
import { getStoredStreak } from '../streakStore';
import { getWallpaperForDay, downloadCanvasWallpaper } from '../data/wallpapers';
import type { DayWallpaper } from '../data/wallpapers';

export interface HabitItem {
  id: string;
  name: string;
  icon: string;
  completed: number;
  total: number;
  unit: string;
  color: string;
}

const DEFAULT_HABITS: HabitItem[] = [
  { id: 'workout', name: 'WORKOUT', icon: '🏋️‍♂️', completed: 0, total: 7, unit: 'days', color: 'from-amber-400 to-yellow-500' },
  { id: 'reading', name: 'READING', icon: '📚', completed: 0, total: 7, unit: 'days', color: 'from-purple-400 to-indigo-500' },
  { id: 'cold_shower', name: 'COLD SHOWER', icon: '🧊', completed: 0, total: 7, unit: 'days', color: 'from-cyan-400 to-blue-500' },
  { id: 'meditation', name: 'MEDITATION', icon: '🧘', completed: 0, total: 7, unit: 'days', color: 'from-emerald-400 to-teal-500' },
  { id: 'pranayama', name: 'PRANAYAMA', icon: '💨', completed: 0, total: 7, unit: 'days', color: 'from-rose-400 to-pink-500' },
  { id: 'sattvik_diet', name: 'SATTVIK DIET', icon: '🥗', completed: 0, total: 7, unit: 'days', color: 'from-lime-400 to-emerald-500' },
  { id: 'japa_chanting', name: 'JAPA MANTRA', icon: '📿', completed: 0, total: 7, unit: 'days', color: 'from-amber-300 to-orange-500' },
];

export default function Habits() {
  const [streakDays, setStreakDays] = useState(8);
  const [isSavingWallpaper, setIsSavingWallpaper] = useState(false);
  const [wallpaperSaved, setWallpaperSaved] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  // Active streak wallpaper data (100% unique, non-repeating seeded image & dynamic quote)
  const activeWallpaper = getWallpaperForDay(streakDays);

  const [habits, setHabits] = useState<HabitItem[]>(() => {
    try {
      const saved = localStorage.getItem('bm_daily_habits');
      return saved ? JSON.parse(saved) : DEFAULT_HABITS;
    } catch {
      return DEFAULT_HABITS;
    }
  });

  // Sync streak state
  useEffect(() => {
    const current = getStoredStreak();
    setStreakDays(current.days);

    const handleStreakChange = (e: any) => {
      if (e.detail?.days !== undefined) {
        setStreakDays(e.detail.days);
      }
    };
    window.addEventListener('streak-updated', handleStreakChange);
    return () => window.removeEventListener('streak-updated', handleStreakChange);
  }, []);

  // Save habits to localStorage
  const saveHabits = (updated: HabitItem[]) => {
    setHabits(updated);
    try {
      localStorage.setItem('bm_daily_habits', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save habits:', e);
    }
  };

  // Increment habit progress with micro-bounce
  const handleIncrement = (id: string) => {
    const updated = habits.map(h => {
      if (h.id === id) {
        const next = h.completed >= h.total ? 0 : h.completed + 1;
        return { ...h, completed: next };
      }
      return h;
    });
    saveHabits(updated);
  };

  // Direct Save Wallpaper Trigger on 1st Card
  const handleSaveActiveWallpaper = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsSavingWallpaper(true);
    downloadCanvasWallpaper(activeWallpaper, () => {
      setIsSavingWallpaper(false);
      setWallpaperSaved(true);
      setTimeout(() => setWallpaperSaved(false), 2400);
    });
  };

  return (
    <div className="w-full pt-3 text-left">
      {/* ── Carousel Header ── */}
      <div className="flex items-center justify-between mb-2.5 px-0.5">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-white font-cinzel flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Daily Discipline & Active Wallpaper</span>
          </h3>
          <p className="text-[10px] sm:text-xs text-zinc-400 mt-0.5">
            1st Card: Day {streakDays} HD Motivation • Followed by Daily Habit Trackers (0/7)
          </p>
        </div>

        <span className="text-[10px] sm:text-xs font-bold text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 hidden xs:inline-block">
          Day {streakDays} Unlocked
        </span>
      </div>

      {/* ── Compact Single-Line Horizontal Motion Carousel ── */}
      {/* Exact CSS requested: display: flex; flex-direction: row; overflow-x: auto; gap: 12px; scroll-snap-type: x mandatory; */}
      <div
        className="w-full overflow-x-auto pb-2 pt-1 scrollbar-none flex flex-row items-stretch"
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          gap: '12px',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* ════════════════════════════════════════════════════════════════
            CARD 1: EMBEDDED SINGLE ACTIVE DAY WALLPAPER CARD
            Render ONLY the current unlocked streak day's wallpaper & quote
           ════════════════════════════════════════════════════════════════ */}
        <motion.div
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPreviewModalOpen(true)}
          className="rounded-2xl border border-amber-500/40 hover:border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.25)] relative overflow-hidden flex flex-col justify-between p-3 select-none cursor-pointer group snap-start transition-all"
          style={{
            flex: '0 0 175px',
            width: '175px',
            minHeight: '135px',
            scrollSnapAlign: 'start',
            backgroundImage: `linear-gradient(to top, rgba(2,4,10,0.96) 0%, rgba(2,4,10,0.65) 55%, rgba(2,4,10,0.4) 100%), url('${activeWallpaper.imageUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Top Row: Stamped Day Badge & Eye Preview Icon */}
          <div className="flex items-center justify-between w-full relative z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-amber-400/50 text-amber-300 text-[9px] font-black uppercase tracking-wider shadow">
              <Flame className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
              <span>Day {streakDays}</span>
            </span>

            <span className="p-1 rounded-full bg-black/60 text-zinc-300 group-hover:text-amber-400 transition shadow">
              <Eye className="w-3 h-3" />
            </span>
          </div>

          {/* Middle: Active Day Bold Motivational Headline & Quote */}
          <div className="my-1 relative z-10 text-left">
            <h4 className="text-[11px] font-black font-cinzel text-white leading-tight drop-shadow-md line-clamp-2">
              {activeWallpaper.headline}
            </h4>
            <p className="text-[8.5px] text-amber-200/90 font-medium line-clamp-1 italic mt-0.5">
              “{activeWallpaper.hindiQuote}”
            </p>
          </div>

          {/* Bottom: Compact Direct "Save Wallpaper" Button */}
          <div className="relative z-10 pt-1 border-t border-white/10 w-full">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveActiveWallpaper}
              disabled={isSavingWallpaper}
              className={`w-full flex items-center justify-center gap-1 py-1 px-2 rounded-xl text-[9.5px] font-black transition cursor-pointer shadow-md ${
                wallpaperSaved
                  ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                  : 'bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
              }`}
              title={`Save Day ${streakDays} Ultra-HD Wallpaper`}
            >
              {wallpaperSaved ? (
                <>
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Download className="w-3 h-3" />
                  <span>Save Wallpaper</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════
            HABIT CARDS (Workout, Reading, Cold Shower, Meditation, etc.)
            flex: 0 0 150px, single-row, micro-bounce on click
           ════════════════════════════════════════════════════════════════ */}
        {habits.map((habit) => {
          const progressPct = (habit.completed / habit.total) * 100;
          const isMax = habit.completed >= habit.total;

          return (
            <motion.div
              key={habit.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleIncrement(habit.id)}
              className="p-3 rounded-2xl bg-zinc-950/80 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-amber-400/80 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all cursor-pointer shadow-md group relative overflow-hidden select-none snap-start flex flex-col justify-between"
              style={{
                flex: '0 0 150px',
                width: '150px',
                minHeight: '135px',
                scrollSnapAlign: 'start',
              }}
            >
              {/* Top Row: Icon & Target Badge */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xl sm:text-2xl">{habit.icon}</span>
                <span
                  className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all ${
                    isMax
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 group-hover:border-amber-500/40'
                  }`}
                >
                  {habit.completed}/{habit.total}
                </span>
              </div>

              {/* Habit Name */}
              <div className="my-auto">
                <h4 className="text-[11px] sm:text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                  {habit.name}
                </h4>
                <p className="text-[9px] text-zinc-400 mt-0.5">
                  {isMax ? 'Target Completed!' : 'Tap to record discipline'}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800 mt-2">
                <div
                  className={`h-full bg-gradient-to-r ${habit.color} transition-all duration-300`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Fullscreen HD Wallpaper Preview Modal on Card 1 Tap ── */}
      <AnimatePresence>
        {previewModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-black/92 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-3xl border-2 border-amber-500/60 p-5 sm:p-6 shadow-[0_0_80px_rgba(0,0,0,0.95),0_0_40px_rgba(245,158,11,0.25)] relative overflow-hidden flex flex-col items-center text-center space-y-3"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(2,4,10,0.98) 0%, rgba(2,4,10,0.7) 50%, rgba(2,4,10,0.5) 100%), url('${activeWallpaper.imageUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setPreviewModalOpen(false)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-zinc-300 hover:text-white transition shadow-md z-20 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Day Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-zinc-950 font-black text-xs shadow-lg uppercase tracking-wider z-10">
                <Flame className="w-3.5 h-3.5 fill-black" />
                <span>DAY {activeWallpaper.day} UNLOCKED</span>
              </div>

              {/* Headline */}
              <div className="z-10 pt-1">
                <h3 className="text-xl sm:text-2xl font-black font-cinzel text-white tracking-tight drop-shadow-lg text-balance">
                  {activeWallpaper.headline}
                </h3>
                <p className="text-xs font-bold text-amber-300 tracking-widest mt-1 uppercase">
                  {activeWallpaper.subtext}
                </p>
              </div>

              {/* Quotes Card */}
              <div className="p-3.5 rounded-2xl bg-black/85 border border-white/10 backdrop-blur-md max-w-xs text-left z-10 space-y-2">
                <p className="text-xs font-serif text-amber-200 italic leading-relaxed">
                  “{activeWallpaper.hindiQuote}”
                </p>
                <p className="text-[11px] text-zinc-300 leading-relaxed border-t border-white/10 pt-1.5">
                  “{activeWallpaper.englishQuote}”
                </p>
                <span className="text-[10px] font-bold text-amber-400 block pt-0.5">
                  — {activeWallpaper.author}
                </span>
              </div>

              {/* Direct Save Button */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSaveActiveWallpaper()}
                disabled={isSavingWallpaper}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-zinc-950 font-black text-xs sm:text-sm shadow-[0_0_25px_rgba(245,158,11,0.5)] transition cursor-pointer z-10"
              >
                {wallpaperSaved ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Wallpaper Downloaded!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download Ultra-HD Wallpaper</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
