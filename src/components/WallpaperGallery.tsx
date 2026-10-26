import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, Eye, Lock, Flame, Check, X,
  Sparkles, ArrowDownToLine, Shield, Zap, Image as ImageIcon
} from 'lucide-react';
import { getStoredStreak } from '../streakStore';
import type { DayWallpaper } from '../data/wallpapers';
import {
  getWallpaperForDay,
  downloadCanvasWallpaper
} from '../data/wallpapers';

export default function WallpaperGallery() {
  const [streakDays, setStreakDays] = useState(8);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'milestones'>('all');
  const [previewItem, setPreviewItem] = useState<DayWallpaper | null>(null);
  const [savedDayId, setSavedDayId] = useState<number | null>(null);
  const [previewDownloadSuccess, setPreviewDownloadSuccess] = useState(false);

  // Sync with global reactive streak store
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

  // Show unlocked days up to current streak
  const unlockedDays = Array.from({ length: Math.max(1, streakDays) }, (_, i) => i + 1);

  // Dynamic upcoming locked days for infinite progression preview
  const upcomingLockedDays = [
    streakDays + 1,
    streakDays + 2,
    streakDays + 3,
    streakDays + 4,
    streakDays <= 14 ? 14 : streakDays <= 21 ? 21 : streakDays <= 30 ? 30 : streakDays <= 60 ? 60 : streakDays <= 90 ? 90 : streakDays + 10,
  ].filter((d, idx, arr) => d > streakDays && arr.indexOf(d) === idx).slice(0, 4);

  const allDisplayDays = [...unlockedDays, ...upcomingLockedDays];

  // Active filter set
  const displayedDays = filter === 'unlocked'
    ? unlockedDays
    : filter === 'milestones'
    ? [1, 3, 7, 10, 14, 21, 30, 45, 60, 90, 100, 125, 141, 365].filter(d => d <= streakDays || upcomingLockedDays.includes(d))
    : allDisplayDays;

  // Direct Save Wallpaper Trigger from Card Button
  const handleDirectSave = (item: DayWallpaper) => {
    setSavedDayId(item.day);
    downloadCanvasWallpaper(item, () => {
      setTimeout(() => setSavedDayId(null), 2200);
    });
  };

  return (
    <section id="wallpapers" className="py-8 sm:py-12 relative w-full max-w-full overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">

        {/* ── Compact Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-2 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Daily Streak Progression Gallery</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight text-balance">
            Infinite Ultra-HD{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent metallic-gold-text">
              Wallpaper Engine
            </span>
          </h2>

          <p className="mt-1.5 text-xs sm:text-sm text-zinc-300 text-balance">
            Every day of Brahmacharya unlocks a dedicated cinematic wallpaper with high-impact motivational quotes. Currently unlocked up to <strong className="text-amber-400">Day {streakDays}</strong>.
          </p>

          {/* Compact Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-3.5 text-xs font-bold">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-xl transition cursor-pointer text-xs ${
                filter === 'all'
                  ? 'bg-amber-400 text-zinc-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-zinc-900/90 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              All ({allDisplayDays.length})
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter('unlocked')}
              className={`px-3 py-1 rounded-xl transition cursor-pointer text-xs flex items-center gap-1.5 ${
                filter === 'unlocked'
                  ? 'bg-emerald-500 text-zinc-950 font-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'bg-zinc-900/90 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Unlocked ({unlockedDays.length})</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter('milestones')}
              className={`px-3 py-1 rounded-xl transition cursor-pointer text-xs ${
                filter === 'milestones'
                  ? 'bg-purple-500 text-white font-black shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'bg-zinc-900/90 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Milestones
            </motion.button>
          </div>
        </motion.div>

        {/* ── Tight 2-Column Portrait Grid (Compact Mobile-App Layout) ── */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 md:gap-4.5 w-full">
          {displayedDays.map((dayNum) => {
            const item = getWallpaperForDay(dayNum);
            const isUnlocked = dayNum <= streakDays;
            const isJustSaved = savedDayId === dayNum;

            return (
              <motion.div
                key={dayNum}
                whileHover={isUnlocked ? { scale: 1.03, y: -3 } : {}}
                whileTap={isUnlocked ? { scale: 0.98 } : {}}
                onClick={() => {
                  if (isUnlocked) {
                    setPreviewItem(item);
                  }
                }}
                className={`relative rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-300 aspect-[9/14] sm:aspect-[9/13.5] flex flex-col justify-between p-3 sm:p-4.5 select-none shadow-lg ${
                  isUnlocked
                    ? 'border-zinc-800/80 hover:border-amber-400/80 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] cursor-pointer group'
                    : 'border-zinc-800/40 opacity-70 cursor-not-allowed'
                }`}
              >
                {/* Background Image */}
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${
                    isUnlocked
                      ? 'group-hover:scale-105'
                      : 'filter blur-[3px] brightness-40 grayscale-[30%]'
                  }`}
                  style={{ backgroundImage: `url('${item.imageUrl}')` }}
                />

                {/* Dark Vignette Overlay for Crisp Typography Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/35 pointer-events-none" />

                {/* ── TOP BADGE: Stamped Day [X] ── */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <span
                    className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-black tracking-wider uppercase shadow-md flex items-center gap-1 ${
                      isUnlocked
                        ? 'bg-black/70 backdrop-blur-md border border-white/20 text-amber-300'
                        : 'bg-zinc-950/80 border border-zinc-700/60 text-zinc-400'
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>Day {dayNum}</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3 text-zinc-400" />
                        <span>Day {dayNum}</span>
                      </>
                    )}
                  </span>

                  {isUnlocked ? (
                    <span className="p-1 rounded-full bg-black/50 backdrop-blur-md text-zinc-300 group-hover:text-amber-400 transition shadow-sm">
                      <Eye className="w-3 h-3" />
                    </span>
                  ) : (
                    <span className="p-1 rounded-full bg-black/70 text-zinc-500">
                      <Lock className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* ── CENTER LOCK OVERLAY FOR LOCKED DAYS ── */}
                {!isUnlocked && (
                  <div className="relative z-20 flex flex-col items-center justify-center text-center p-2 my-auto">
                    <div className="w-9 h-9 rounded-2xl bg-zinc-900/90 border border-zinc-700 flex items-center justify-center text-amber-400 mb-1.5 shadow-lg">
                      <Lock className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-black text-white tracking-wide uppercase">
                      Unlocks on Day {dayNum}
                    </span>
                    <span className="text-[9px] text-amber-400/90 font-semibold mt-0.5">
                      {dayNum - streakDays} {dayNum - streakDays === 1 ? 'day' : 'days'} to go
                    </span>
                  </div>
                )}

                {/* ── BOTTOM: Bold Uppercase Motivational Quote & Direct Save Button ── */}
                <div className="relative z-10 text-left space-y-1 sm:space-y-1.5">
                  <h3 className={`text-xs xs:text-sm sm:text-base font-black font-cinzel leading-tight tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] line-clamp-2 ${
                    isUnlocked ? 'text-white' : 'text-zinc-400'
                  }`}>
                    {item.headline}
                  </h3>

                  <p className="text-[8px] xs:text-[9px] sm:text-[10px] font-bold text-amber-300 tracking-wider truncate uppercase">
                    {item.subtext}
                  </p>

                  {/* ── DIRECT "SAVE WALLPAPER" BUTTON ON EVERY UNLOCKED CARD ── */}
                  {isUnlocked && (
                    <div className="pt-1.5 border-t border-white/10 flex items-center justify-between gap-1.5">
                      <span className="text-[8px] sm:text-[10px] text-zinc-400 font-medium truncate max-w-[85px] sm:max-w-none">
                        {item.theme.split('•')[0]}
                      </span>

                      <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDirectSave(item);
                        }}
                        className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-xl text-[9px] sm:text-[10px] font-black transition cursor-pointer shadow-md ${
                          isJustSaved
                            ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                            : 'bg-amber-400 hover:bg-amber-300 text-zinc-950 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                        }`}
                        title={`Save Day ${dayNum} Wallpaper`}
                      >
                        {isJustSaved ? (
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
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* ── Fullscreen HD Preview & Download Modal ── */}
      <AnimatePresence>
        {previewItem && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-black/92 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-3xl border-2 border-amber-500/60 p-4 sm:p-6 shadow-[0_0_80px_rgba(0,0,0,0.95),0_0_40px_rgba(245,158,11,0.25)] relative overflow-hidden flex flex-col items-center text-center space-y-3 sm:space-y-4"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(2,4,10,0.98) 0%, rgba(2,4,10,0.7) 50%, rgba(2,4,10,0.5) 100%), url('${previewItem.imageUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setPreviewItem(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-zinc-300 hover:text-white transition shadow-md z-20 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Day Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-zinc-950 font-black text-xs shadow-lg uppercase tracking-wider z-10">
                <Flame className="w-3.5 h-3.5 fill-black" />
                <span>DAY {previewItem.day} UNLOCKED</span>
              </div>

              {/* Headline */}
              <div className="z-10 pt-1">
                <h3 className="text-xl sm:text-2xl font-black font-cinzel text-white tracking-tight drop-shadow-lg text-balance">
                  {previewItem.headline}
                </h3>
                <p className="text-xs font-bold text-amber-300 tracking-widest mt-1 uppercase">
                  {previewItem.subtext}
                </p>
              </div>

              {/* Bilingual Quotes Card */}
              <div className="p-3.5 rounded-2xl bg-black/85 border border-white/10 backdrop-blur-md max-w-xs text-left z-10 space-y-2">
                <p className="text-xs font-serif text-amber-200 italic leading-relaxed">
                  “{previewItem.hindiQuote}”
                </p>
                <p className="text-[11px] text-zinc-300 leading-relaxed border-t border-white/10 pt-1.5">
                  “{previewItem.englishQuote}”
                </p>
                <span className="text-[10px] font-bold text-amber-400 block pt-0.5">
                  — {previewItem.author}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex items-center gap-2 pt-1 z-10">
                <button
                  onClick={() => setPreviewItem(null)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-900/90 text-xs font-bold text-zinc-300 hover:text-white transition cursor-pointer"
                >
                  Close
                </button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setPreviewDownloadSuccess(true);
                    downloadCanvasWallpaper(previewItem, () => {
                      setTimeout(() => setPreviewDownloadSuccess(false), 2500);
                    });
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-[0_0_25px_rgba(245,158,11,0.5)] cursor-pointer"
                >
                  {previewDownloadSuccess ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Saved in HD!</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownToLine className="w-4 h-4" />
                      <span>Save Wallpaper</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
