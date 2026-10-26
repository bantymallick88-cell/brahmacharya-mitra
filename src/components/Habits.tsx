import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, Check, Download, ArrowRight, Flame
} from 'lucide-react';
import { getStoredStreak } from '../streakStore';
import { getWallpaperForDay, downloadCanvasWallpaper } from '../data/wallpapers';

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

  // Direct Save Wallpaper Trigger for Active Unlocked Day
  const handleSaveActiveWallpaper = () => {
    setIsSavingWallpaper(true);
    const activeWallpaper = getWallpaperForDay(streakDays);
    downloadCanvasWallpaper(activeWallpaper, () => {
      setIsSavingWallpaper(false);
      setWallpaperSaved(true);
      setTimeout(() => setWallpaperSaved(false), 2400);
    });
  };

  return (
    <div className="w-full pt-3 text-left">
      {/* ── Carousel Header: Habit Discipline & Direct Save Wallpaper Action ── */}
      <div className="flex items-center justify-between mb-2.5 px-0.5">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-white font-cinzel flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Daily Habit Transformation</span>
          </h3>
          <p className="text-[10px] sm:text-xs text-zinc-400 mt-0.5">
            Single-row motion carousel • Tap card to check off daily target (0/7)
          </p>
        </div>

        {/* Direct "Save Wallpaper" Quick Trigger */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSaveActiveWallpaper}
          disabled={isSavingWallpaper}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-black transition cursor-pointer shadow-md ${
            wallpaperSaved
              ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
              : 'bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
          }`}
          title={`Direct Save Day ${streakDays} Wallpaper`}
        >
          {wallpaperSaved ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Save Day {streakDays} Wallpaper</span>
            </>
          )}
        </motion.button>
      </div>

      {/* ── Compact Single-Line Horizontal Motion Carousel ── */}
      {/* Exact CSS requested: display: flex; flex-direction: row; overflow-x: auto; gap: 12px; scroll-snap-type: x mandatory; */}
      <div
        className="w-full overflow-x-auto pb-2 pt-1 scrollbar-none flex flex-row items-center"
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          gap: '12px',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {habits.map((habit) => {
          const progressPct = (habit.completed / habit.total) * 100;
          const isMax = habit.completed >= habit.total;

          return (
            <motion.div
              key={habit.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleIncrement(habit.id)}
              className="p-3 rounded-2xl bg-zinc-950/80 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-amber-400/80 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all cursor-pointer shadow-md group relative overflow-hidden select-none snap-start"
              style={{
                flex: '0 0 150px',
                width: '150px',
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
              <h4 className="text-[11px] sm:text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                {habit.name}
              </h4>

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
    </div>
  );
}
