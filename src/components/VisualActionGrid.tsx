import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  ShieldAlert, 
  Disc, 
  Trophy, 
  ArrowRight, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { getStoredStreak } from '../streakStore';

const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/';

export default function VisualActionGrid() {
  const [streakDays, setStreakDays] = useState<number>(() => {
    try {
      return getStoredStreak().days;
    } catch {
      return 14;
    }
  });

  const [japaCount, setJapaCount] = useState<number>(108);

  // Synchronize streak in real-time with global store
  useEffect(() => {
    try {
      const current = getStoredStreak();
      setStreakDays(current.days);

      const savedJapa = localStorage.getItem('bm_japa_counter');
      if (savedJapa) setJapaCount(parseInt(savedJapa, 10) || 108);
    } catch (e) {}

    const handleStreakUpdate = (e: any) => {
      if (e.detail?.days !== undefined) {
        setStreakDays(e.detail.days);
      }
    };

    window.addEventListener('streak-updated', handleStreakUpdate);
    window.addEventListener('bm_streak_sync', handleStreakUpdate);

    return () => {
      window.removeEventListener('streak-updated', handleStreakUpdate);
      window.removeEventListener('bm_streak_sync', handleStreakUpdate);
    };
  }, []);

  const triggerPanic = () => {
    window.dispatchEvent(new CustomEvent('open-panic-modal'));
  };

  const handleScrollToStreak = () => {
    const el = document.getElementById('streak');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#streak';
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 mb-12 relative z-20 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* ── CARD 1: STREAK COUNTER (FIRE ICON) ── */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative overflow-hidden rounded-3xl p-5 sm:p-6 backdrop-blur-2xl shadow-2xl flex flex-col justify-between group transition-all"
          style={{
            background: 'rgba(28, 20, 10, 0.75)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            boxShadow: '0 10px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(245, 158, 11, 0.1)',
          }}
        >
          {/* Ambient Warm Saffron Glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/25 transition-all" />

          <div>
            {/* Top Icon & Status Pill */}
            <div className="flex items-center justify-between mb-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                🔥
              </div>
              <span className="text-[11px] font-black uppercase px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/40 tracking-wider">
                Active • सक्रिय
              </span>
            </div>

            {/* Large Visual Day Display */}
            <div className="my-2">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black font-cinzel text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)] tracking-tight">
                  {streakDays}
                </span>
                <span className="text-sm sm:text-base font-extrabold text-amber-300 uppercase tracking-wide">
                  Days Clean
                </span>
              </div>
              <p className="text-xs text-amber-200/90 font-sanskrit font-medium mt-1">
                दिन पवित्र • अखंड ब्रह्मचर्य संकल्प
              </p>
            </div>

            <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
              Track your daily retention victory. Never break the divine energy flow.
            </p>
          </div>

          {/* 1-Tap Action Button */}
          <button
            onClick={handleScrollToStreak}
            className="mt-5 w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <Flame className="w-4 h-4 fill-zinc-950 text-zinc-950" />
            <span>Start / Update Streak</span>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </button>
        </motion.div>

        {/* ── CARD 2: EMERGENCY RELIEF (BRIGHT RED ALERT SOS) ── */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative overflow-hidden rounded-3xl p-5 sm:p-6 backdrop-blur-2xl shadow-2xl flex flex-col justify-between group transition-all"
          style={{
            background: 'rgba(38, 10, 10, 0.85)',
            border: '1px solid rgba(239, 68, 68, 0.55)',
            boxShadow: '0 10px 35px rgba(0, 0, 0, 0.8), 0 0 35px rgba(239, 68, 68, 0.25)',
          }}
        >
          {/* Ambient Red Alert Glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-600/20 rounded-full blur-2xl pointer-events-none group-hover:bg-red-600/35 transition-all" />

          <div>
            {/* Top Icon & Status Pill */}
            <div className="flex items-center justify-between mb-3">
              <div className="w-14 h-14 rounded-2xl bg-red-500/25 border border-red-500/60 flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(239,68,68,0.4)] animate-pulse">
                🛑
              </div>
              <span className="text-[11px] font-black uppercase px-3 py-1 rounded-full bg-red-500/20 text-red-200 border border-red-500/50 tracking-wider">
                Instant • तुरंत राहत
              </span>
            </div>

            {/* High-Contrast Bold SOS Title */}
            <div className="my-2">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-1.5">
                <span>SOS / Urge Breaker</span>
              </h3>
              <p className="text-xs text-red-200 font-sanskrit font-bold mt-1">
                काम-वेग नियंत्रण • तुरंत राहत
              </p>
            </div>

            <p className="text-xs text-red-100/90 mt-2 leading-relaxed font-medium">
              Having sudden urges? Tap once for the 4-7-8 emergency breathwork shield.
            </p>
          </div>

          {/* 1-Tap Action Button */}
          <button
            onClick={triggerPanic}
            className="mt-5 w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 animate-bounce text-white" />
            <span>Save Me Now • मुझे बचाओ</span>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </button>
        </motion.div>

        {/* ── CARD 3: DAILY SADHANA & JAPA (PRAYER BEADS) ── */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative overflow-hidden rounded-3xl p-5 sm:p-6 backdrop-blur-2xl shadow-2xl flex flex-col justify-between group transition-all"
          style={{
            background: 'rgba(28, 20, 10, 0.75)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            boxShadow: '0 10px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(245, 158, 11, 0.1)',
          }}
        >
          {/* Ambient Cosmic Purple/Gold Glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/25 transition-all" />

          <div>
            {/* Top Icon & Status Pill */}
            <div className="flex items-center justify-between mb-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                📿
              </div>
              <span className="text-[11px] font-black uppercase px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/40 tracking-wider">
                108 Beads • माला
              </span>
            </div>

            {/* Visual Progress Circles / Japa Metric */}
            <div className="my-2">
              <div className="flex items-center gap-3">
                {/* Mini SVG Progress Ring */}
                <div className="relative w-12 h-12 shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3.5"
                      strokeDasharray={100}
                      strokeDashoffset={25}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-amber-300">
                    108
                  </span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                    Daily Sadhana & Japa
                  </h3>
                  <p className="text-xs text-amber-200/90 font-sanskrit font-medium">
                    दैनिक साधना व जप माला
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
              Complete your daily Gayatri or Mahamrityunjaya mala with digital bead counter.
            </p>
          </div>

          {/* 1-Tap Action Button */}
          <a
            href={baseUrl + "dashboard/"}
            className="mt-5 w-full py-3.5 px-4 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-center"
          >
            <Disc className="w-4 h-4 text-amber-400 animate-spin-slow shrink-0" />
            <span>Open Daily Sadhana</span>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </a>
        </motion.div>

        {/* ── CARD 4: LEADERBOARD & RANKS (PODIUM VISUALS) ── */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative overflow-hidden rounded-3xl p-5 sm:p-6 backdrop-blur-2xl shadow-2xl flex flex-col justify-between group transition-all"
          style={{
            background: 'rgba(28, 20, 10, 0.75)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            boxShadow: '0 10px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(245, 158, 11, 0.1)',
          }}
        >
          {/* Ambient Warm Golden Glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-yellow-500/25 transition-all" />

          <div>
            {/* Top Icon & Status Pill */}
            <div className="flex items-center justify-between mb-3">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                🏆
              </div>
              <span className="text-[11px] font-black uppercase px-3 py-1 rounded-full bg-yellow-500/15 text-yellow-300 border border-yellow-500/40 tracking-wider">
                Podium • शीर्ष साधक
              </span>
            </div>

            {/* Simple Visual 1-2-3 Podium Badges */}
            <div className="my-2">
              <div className="flex items-center justify-between gap-1.5 p-2 rounded-2xl bg-zinc-950/60 border border-amber-500/20 text-center mb-2">
                <div className="flex-1">
                  <span className="text-base sm:text-lg block">🥈</span>
                  <span className="text-[10px] text-zinc-300 font-bold block">#2 Silver</span>
                </div>
                <div className="flex-1 pb-1 border-x border-amber-500/20">
                  <span className="text-xl sm:text-2xl block">🥇</span>
                  <span className="text-[10px] text-amber-300 font-black block">#1 Gold</span>
                </div>
                <div className="flex-1">
                  <span className="text-base sm:text-lg block">🥉</span>
                  <span className="text-[10px] text-orange-300 font-bold block">#3 Bronze</span>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                Global Sadhak Ranks
              </h3>
              <p className="text-xs text-amber-200/90 font-sanskrit font-medium">
                विश्व साधक श्रेणी • आत्म-विजय
              </p>
            </div>

            <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
              Unite with disciplined warriors worldwide and claim your place on the podium.
            </p>
          </div>

          {/* 1-Tap Action Button */}
          <a
            href={baseUrl + "leaderboard/"}
            className="mt-5 w-full py-3.5 px-4 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-center"
          >
            <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
            <span>View Top Sadhaks</span>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}

