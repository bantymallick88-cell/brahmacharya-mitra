import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Check, Download, Flame, Eye, X, Shield, Lock,
  Award, Trophy, Zap, ChevronRight
} from 'lucide-react';
import { getStoredStreak } from '../streakStore';
import { getWallpaperForDay, downloadCanvasWallpaper } from '../data/wallpapers';
import type { DayWallpaper } from '../data/wallpapers';

export interface MilestoneBadge {
  day: number;
  title: string;
  desc: string;
  icon: string;
  highlight: string;
}

export const MILESTONES: MilestoneBadge[] = [
  { day: 7, title: 'Day 7', desc: 'Dopamine Reset', icon: '🌱', highlight: 'Urges subside' },
  { day: 21, title: 'Day 21', desc: 'Veerya Raksha', icon: '🛡️', highlight: 'Habit locks in' },
  { day: 60, title: 'Day 60', desc: 'Tejas Awakening', icon: '🔥', highlight: 'Vital vigor' },
  { day: 90, title: 'Day 90', desc: 'Ojas Transmutation', icon: '⚡', highlight: 'Crystal clarity' },
  { day: 108, title: 'Day 108', desc: 'Brahmacharya Siddhi', icon: '👑', highlight: 'Divine bliss' },
  { day: 365, title: 'Day 365', desc: 'Akhand Tapasya', icon: '🕉️', highlight: 'Supreme mastery' },
];

export default function Habits() {
  const [streakDays, setStreakDays] = useState(14);
  const [isSavingWallpaper, setIsSavingWallpaper] = useState(false);
  const [wallpaperSaved, setWallpaperSaved] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  // Active streak wallpaper data
  const activeWallpaper = getWallpaperForDay(streakDays);

  // Sync streak state
  useEffect(() => {
    try {
      const current = getStoredStreak();
      if (current && current.days) setStreakDays(current.days);
    } catch (e) {}

    const handleStreakChange = (e: any) => {
      if (e.detail?.days !== undefined) {
        setStreakDays(e.detail.days);
      }
    };
    window.addEventListener('streak-updated', handleStreakChange);
    return () => window.removeEventListener('streak-updated', handleStreakChange);
  }, []);

  // Direct Save Wallpaper Trigger
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
    <div className="w-full pt-2 text-left space-y-4">
      {/* ── Section Header ── */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="text-xs sm:text-sm font-bold text-white font-cinzel flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Daily Motivational Wallpaper & Streak Badges</span>
          </h3>
          <p className="text-[10px] sm:text-xs text-zinc-400 mt-0.5">
            Daily unlocked inspirational wallpaper & milestone awards for your Tapasya
          </p>
        </div>

        <span className="text-[10px] sm:text-xs font-bold text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center gap-1">
          <Flame className="w-3 h-3 fill-amber-400" />
          <span>Day {streakDays} Active</span>
        </span>
      </div>

      {/* ── High-Impact Showcase Layout ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Active Wallpaper Card (Featured Large Left Card, 7 cols) */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          onClick={() => setPreviewModalOpen(true)}
          className="md:col-span-7 rounded-3xl border border-amber-500/40 hover:border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.2)] relative overflow-hidden flex flex-col justify-between p-5 sm:p-6 select-none cursor-pointer group transition-all min-h-[220px]"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(2,4,10,0.96) 0%, rgba(2,4,10,0.7) 50%, rgba(2,4,10,0.35) 100%), url('${activeWallpaper.imageUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Top Row: Stamped Day Badge & Eye Preview Icon */}
          <div className="flex items-center justify-between w-full relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-amber-400/60 text-amber-300 text-xs font-black uppercase tracking-wider shadow">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
              <span>Day {streakDays} Unlocked Wallpaper</span>
            </span>

            <span className="p-2 rounded-xl bg-black/60 text-zinc-300 group-hover:text-amber-400 transition shadow flex items-center gap-1 text-xs">
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Preview</span>
            </span>
          </div>

          {/* Middle: Active Day Bold Motivational Headline & Quote */}
          <div className="my-3 relative z-10 text-left">
            <h4 className="text-base sm:text-lg md:text-xl font-black font-cinzel text-white leading-snug drop-shadow-lg">
              {activeWallpaper.headline}
            </h4>
            <p className="text-xs sm:text-sm text-amber-200/95 font-serif italic mt-1 line-clamp-2 drop-shadow">
              “{activeWallpaper.hindiQuote}”
            </p>
            <span className="text-[10px] text-zinc-400 block mt-1">
              — {activeWallpaper.author || 'Ancient Wisdom'} • {activeWallpaper.intensityStage}
            </span>
          </div>

          {/* Bottom: Direct Actions */}
          <div className="relative z-10 pt-3 border-t border-white/10 w-full flex items-center justify-between gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSaveActiveWallpaper}
              disabled={isSavingWallpaper}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition cursor-pointer shadow-lg ${
                wallpaperSaved
                  ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                  : 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
              }`}
            >
              {wallpaperSaved ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Wallpaper Saved!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Save Ultra-HD Wallpaper</span>
                </>
              )}
            </motion.button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPreviewModalOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-white/10 text-xs font-bold transition"
            >
              Expand
            </button>
          </div>
        </motion.div>

        {/* Milestone Streak Badges (5 cols right) */}
        <div className="md:col-span-5 rounded-3xl bg-zinc-950/70 border border-zinc-800 p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <span className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Streak Milestone Badges</span>
            </span>
            <span className="text-[10px] text-zinc-500">
              {MILESTONES.filter((m) => streakDays >= m.day).length} of {MILESTONES.length} Unlocked
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 py-3">
            {MILESTONES.map((m) => {
              const isUnlocked = streakDays >= m.day;
              return (
                <div
                  key={m.day}
                  className={`p-2.5 rounded-2xl border transition flex items-center gap-2.5 ${
                    isUnlocked
                      ? 'bg-amber-500/10 border-amber-500/40 text-white shadow-sm'
                      : 'bg-zinc-900/50 border-zinc-800/80 text-zinc-500 opacity-60'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${
                      isUnlocked
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-zinc-900 text-zinc-600 border border-zinc-800'
                    }`}
                  >
                    {isUnlocked ? m.icon : <Lock className="w-3.5 h-3.5" />}
                  </div>

                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{m.title}</span>
                      {isUnlocked && <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />}
                    </div>
                    <div className="text-[9px] text-zinc-400 truncate">{m.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-zinc-800 text-[10px] text-zinc-500 flex items-center justify-between">
            <span>Next Goal: {MILESTONES.find((m) => m.day > streakDays)?.title || 'Paramhansa Level'}</span>
            <span className="text-amber-400 font-bold">Stay resolute!</span>
          </div>
        </div>
      </div>

      {/* ── Fullscreen HD Wallpaper Preview Modal ── */}
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
