import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  ShieldAlert, 
  Disc, 
  Trophy, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { getStoredStreak, updateGlobalStreak } from '../streakStore';
import { useTranslation } from '../i18n';

const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/';

export default function VisualActionGrid() {
  const { t, currentLang } = useTranslation();
  const isHindi = currentLang === 'hi';

  const [streakDays, setStreakDays] = useState<number>(() => {
    try {
      return getStoredStreak().days;
    } catch {
      return 14;
    }
  });

  const [japaCount, setJapaCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('bm_japa_counter');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [completedMalas, setCompletedMalas] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('bm_japa_malas');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Synchronize streak in real-time with global store
  useEffect(() => {
    try {
      const current = getStoredStreak();
      setStreakDays(current.days);
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

  const triggerInterceptor = () => {
    window.dispatchEvent(new CustomEvent('open-interceptor-modal'));
  };

  const handleScrollToStreak = () => {
    const el = document.getElementById('streak');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#streak';
    }
  };

  const handleAdjustStreak = (delta: number) => {
    const newDays = Math.max(0, streakDays + delta);
    setStreakDays(newDays);
    updateGlobalStreak(newDays);
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(30);
      }
    } catch (e) {}
  };

  const handleIncrementJapa = () => {
    const nextCount = japaCount + 1;
    if (nextCount >= 108) {
      setJapaCount(0);
      const nextMalas = completedMalas + 1;
      setCompletedMalas(nextMalas);
      try {
        localStorage.setItem('bm_japa_counter', '0');
        localStorage.setItem('bm_japa_malas', String(nextMalas));
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate([60, 40, 60, 40, 100]);
        }
      } catch (e) {}
    } else {
      setJapaCount(nextCount);
      try {
        localStorage.setItem('bm_japa_counter', String(nextCount));
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate(25);
        }
      } catch (e) {}
    }
  };

  const handleResetJapa = () => {
    setJapaCount(0);
    try {
      localStorage.setItem('bm_japa_counter', '0');
    } catch (e) {}
  };

  const japaProgressPercent = Math.min(100, Math.round((japaCount / 108) * 100));

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 mb-12 relative z-20 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* ── MODULE 1: 🔥 START / TRACK YOUR STREAK ── */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative overflow-hidden rounded-3xl p-5 sm:p-6 backdrop-blur-2xl shadow-2xl flex flex-col justify-between group transition-all"
          style={{
            background: 'rgba(28, 20, 10, 0.85)',
            border: '1.5px solid rgba(245, 158, 11, 0.45)',
            boxShadow: '0 10px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(245, 158, 11, 0.15)',
          }}
        >
          {/* Ambient Warm Saffron Glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/30 transition-all" />

          <div>
            {/* Top Icon & Status Pill */}
            <div className="flex items-center justify-between mb-3">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(245,158,11,0.35)] shrink-0">
                🔥
              </div>
              <span className="text-[11px] font-black uppercase px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/50 tracking-wider">
                {isHindi ? 'सक्रिय • अखंड' : 'ACTIVE • CLEAN'}
              </span>
            </div>

            {/* Large Visual Day Display with 1-Tap Adjustment */}
            <div className="my-2">
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black font-cinzel text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)] tracking-tight">
                    {streakDays}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-amber-300 uppercase tracking-wide">
                    {isHindi ? 'दिन अखंड' : 'Days Clean'}
                  </span>
                </div>

                {/* 1-Tap Unpad-Friendly Quick Steppers */}
                <div className="flex items-center gap-1.5 bg-zinc-950/70 p-1 rounded-xl border border-amber-500/30">
                  <button
                    onClick={() => handleAdjustStreak(-1)}
                    className="w-7 h-7 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition cursor-pointer active:scale-95"
                    title={isHindi ? '-1 दिन घटाएं' : '-1 Day'}
                    aria-label="Subtract 1 day"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleAdjustStreak(1)}
                    className="w-7 h-7 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 flex items-center justify-center transition cursor-pointer active:scale-95 font-bold"
                    title={isHindi ? '+1 दिन जोड़ें' : '+1 Day'}
                    aria-label="Add 1 day"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-black text-white tracking-tight mt-1.5">
                {isHindi ? 'अखंड ब्रह्मचर्य स्ट्रीक' : 'Start / Track Your Streak'}
              </h3>
              <p className="text-xs text-amber-200/90 font-sanskrit font-medium">
                {isHindi ? 'वीर्य रक्षा, तेजस्विता एवं आत्म-संयम' : 'Ojas Transmutation & Self-Mastery'}
              </p>
            </div>

            <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
              {isHindi 
                ? 'दैनिक वीर्य रक्षा का संकल्प लें। एक भी दिन पतन न होने दें।' 
                : 'Track daily retention victory and keep your sacred energy flowing.'}
            </p>
          </div>

          {/* 1-Tap Action Button */}
          <button
            onClick={handleScrollToStreak}
            className="mt-5 w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-zinc-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            <Flame className="w-4 h-4 fill-zinc-950 text-zinc-950 shrink-0" />
            <span>{isHindi ? 'स्ट्रीक काउंटर आरंभ करें' : 'Track Streak Now'}</span>
            <ArrowRight className="w-4 h-4 ml-auto shrink-0" />
          </button>
        </motion.div>

        {/* ── MODULE 2: 🛑 EMERGENCY RELIEF (PANIC MODE / URGE SHIELD) ── */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative overflow-hidden rounded-3xl p-5 sm:p-6 backdrop-blur-2xl shadow-2xl flex flex-col justify-between group transition-all"
          style={{
            background: 'rgba(45, 12, 12, 0.9)',
            border: '1.5px solid rgba(239, 68, 68, 0.65)',
            boxShadow: '0 10px 35px rgba(0, 0, 0, 0.8), 0 0 35px rgba(239, 68, 68, 0.3)',
          }}
        >
          {/* Ambient Red Alert Glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-600/25 rounded-full blur-2xl pointer-events-none group-hover:bg-red-600/40 transition-all" />

          <div>
            {/* Top Icon & Status Pill */}
            <div className="flex items-center justify-between mb-3">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-red-500/25 border-2 border-red-500/60 flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(239,68,68,0.4)] animate-pulse shrink-0">
                🛑
              </div>
              <span className="text-[11px] font-black uppercase px-3 py-1 rounded-full bg-red-500/20 text-red-200 border border-red-500/50 tracking-wider">
                {isHindi ? 'आपातकालीन राहत' : 'INSTANT RELIEF'}
              </span>
            </div>

            {/* High-Contrast Bold SOS Title */}
            <div className="my-2">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-1.5">
                <span>{isHindi ? 'आपातकालीन पैनिक मोड' : 'Emergency Panic Mode'}</span>
              </h3>
              <p className="text-xs text-red-200 font-sanskrit font-bold mt-1">
                {isHindi ? 'काम-वेग नियंत्रण • तुरंत सुरक्षा कवच' : 'Urge Shield & 4-7-8 Breathwork'}
              </p>
            </div>

            <p className="text-xs text-red-100/90 mt-2 leading-relaxed font-medium">
              {isHindi
                ? 'तीव्र काम-वासना या भटकाव? तुरंत 1-टैप करें और मस्तिष्क को शांत करें।'
                : 'Having sudden urges? Tap once for the 4-7-8 emergency breathwork shield.'}
            </p>
          </div>

          {/* 1-Tap Action Buttons Cluster */}
          <div className="mt-5 space-y-2">
            <button
              onClick={triggerPanic}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4 animate-bounce text-white shrink-0" />
              <span>{isHindi ? 'मुझे बचाओ • Save Me Now 🚨' : 'Save Me Now • मुझे बचाओ 🚨'}</span>
              <ArrowRight className="w-4 h-4 ml-auto shrink-0" />
            </button>

            <button
              onClick={triggerInterceptor}
              className="w-full py-2 px-3 rounded-xl bg-zinc-950/80 hover:bg-zinc-900 border border-red-500/40 text-red-200 hover:text-white font-bold text-[11px] flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>{isHindi ? '10-मिनट लॉकआउट शील्ड' : '10-Min Urge Interceptor'}</span>
            </button>
          </div>
        </motion.div>

        {/* ── MODULE 3: 📿 DAILY SADHANA & TAP-TO-COUNT JAPA MALA ── */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative overflow-hidden rounded-3xl p-5 sm:p-6 backdrop-blur-2xl shadow-2xl flex flex-col justify-between group transition-all"
          style={{
            background: 'rgba(26, 16, 36, 0.88)',
            border: '1.5px solid rgba(217, 119, 6, 0.45)',
            boxShadow: '0 10px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(217, 119, 6, 0.15)',
          }}
        >
          {/* Ambient Cosmic Purple/Gold Glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/30 transition-all" />

          <div>
            {/* Top Icon & Status Pill */}
            <div className="flex items-center justify-between mb-3">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(245,158,11,0.3)] shrink-0">
                📿
              </div>
              <span className="text-[11px] font-black uppercase px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/40 tracking-wider">
                {isHindi ? '108 मनके • माला' : '108 JAPA MALA'}
              </span>
            </div>

            {/* Interactive Tap-To-Count Progress Module */}
            <div className="my-2 p-3 rounded-2xl bg-zinc-950/70 border border-amber-500/30">
              <div className="flex items-center justify-between gap-3">
                
                {/* Visual SVG Progress Ring with Tap Counter */}
                <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 44 44">
                    <circle cx="22" cy="22" r="18" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3.5" />
                    <circle
                      cx="22"
                      cy="22"
                      r="18"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="4"
                      strokeDasharray={113}
                      strokeDashoffset={113 - (113 * japaProgressPercent) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                    <span className="text-xs font-black text-amber-300">{japaCount}</span>
                    <span className="text-[8px] text-zinc-400 font-bold">/108</span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs font-black text-white truncate">
                    {isHindi ? 'डिजिटल जप माला' : 'Digital Japa Mala'}
                  </div>
                  <div className="text-[10px] text-amber-300/90 font-medium">
                    {completedMalas > 0 
                      ? `${completedMalas} ${isHindi ? 'माला पूर्ण 🕉️' : 'Mala Done 🕉️'}` 
                      : (isHindi ? 'मनके गिनने के लिए टैप करें' : 'Tap bead to count')}
                  </div>

                  {/* 1-Tap Count Bead Button */}
                  <div className="flex items-center gap-1.5 mt-2">
                    <button
                      onClick={handleIncrementJapa}
                      className="flex-1 py-1.5 px-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-black text-xs flex items-center justify-center gap-1 shadow-md active:scale-95 transition cursor-pointer"
                    >
                      <span>+1 जप (Tap)</span>
                    </button>
                    <button
                      onClick={handleResetJapa}
                      className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer"
                      title={isHindi ? 'रीसेट करें' : 'Reset Mala'}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            <h3 className="text-base sm:text-lg font-black text-white tracking-tight mt-1">
              {isHindi ? 'दैनिक साधना व जप' : 'Daily Sadhana & Japa'}
            </h3>
            <p className="text-xs text-amber-200/90 font-sanskrit font-medium">
              {isHindi ? 'गायत्री, महामृत्युंजय व नाम-जप' : 'Gayatri, Mahamrityunjaya & Naam Jap'}
            </p>
          </div>

          {/* 1-Tap Action Button */}
          <a
            href={baseUrl + "dashboard/"}
            className="mt-5 w-full py-3.5 px-4 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 border-2 border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-center"
          >
            <Disc className="w-4 h-4 text-amber-400 animate-spin-slow shrink-0" />
            <span>{isHindi ? 'दैनिक साधना चेकलिस्ट खोलें' : 'Open Sadhana Routine'}</span>
            <ArrowRight className="w-4 h-4 ml-auto shrink-0" />
          </a>
        </motion.div>

        {/* ── MODULE 4: 📚 WISDOM & COMMUNITY (BOOKS & LEADERBOARD) ── */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative overflow-hidden rounded-3xl p-5 sm:p-6 backdrop-blur-2xl shadow-2xl flex flex-col justify-between group transition-all"
          style={{
            background: 'rgba(28, 20, 10, 0.85)',
            border: '1.5px solid rgba(234, 179, 8, 0.45)',
            boxShadow: '0 10px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(234, 179, 8, 0.15)',
          }}
        >
          {/* Ambient Golden Glow */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl pointer-events-none group-hover:bg-yellow-500/30 transition-all" />

          <div>
            {/* Top Icon & Status Pill */}
            <div className="flex items-center justify-between mb-3">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-yellow-500/20 border-2 border-yellow-500/40 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(234,179,8,0.3)] shrink-0">
                📚
              </div>
              <span className="text-[11px] font-black uppercase px-3 py-1 rounded-full bg-yellow-500/15 text-yellow-300 border border-yellow-500/40 tracking-wider">
                {isHindi ? 'ज्ञान व श्रेणी' : 'BOOKS & RANKS'}
              </span>
            </div>

            {/* Visual 1-2-3 Podium Badges */}
            <div className="my-2 p-2.5 rounded-2xl bg-zinc-950/70 border border-amber-500/30">
              <div className="flex items-center justify-between gap-1 text-center mb-2 pb-1.5 border-b border-zinc-800/80">
                <div className="flex-1">
                  <span className="text-base sm:text-lg block">🥈</span>
                  <span className="text-[10px] text-zinc-300 font-bold block">#2 Silver</span>
                </div>
                <div className="flex-1 border-x border-amber-500/20">
                  <span className="text-xl sm:text-2xl block">🥇</span>
                  <span className="text-[10px] text-amber-300 font-black block">#1 Gold</span>
                </div>
                <div className="flex-1">
                  <span className="text-base sm:text-lg block">🥉</span>
                  <span className="text-[10px] text-orange-300 font-bold block">#3 Bronze</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold text-amber-200">
                <span>📖 29 Sacred Shastras</span>
                <span>🏆 Top Sadhaks</span>
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-black text-white tracking-tight mt-1">
              {isHindi ? 'ग्रंथ पुस्तकालय एवं विश्व श्रेणी' : 'Sacred Books & Leaderboard'}
            </h3>
            <p className="text-xs text-amber-200/90 font-sanskrit font-medium">
              {isHindi ? 'प्रेमानंद जी, शिवानन्द जी व गैरी विल्सन' : 'Ancient Shastras & Global Sadhaks'}
            </p>
          </div>

          {/* 1-Tap Dual Action Buttons */}
          <div className="mt-5 grid grid-cols-2 gap-2">
            <a
              href={baseUrl + "books/"}
              className="py-3 px-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-amber-500/40 text-amber-300 hover:text-white font-black text-[11px] sm:text-xs flex items-center justify-center gap-1 shadow-sm transition-all cursor-pointer text-center"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{isHindi ? '29 ग्रंथ पढ़ें' : '29 Books'}</span>
            </a>

            <a
              href={baseUrl + "leaderboard/"}
              className="py-3 px-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-black text-[11px] sm:text-xs flex items-center justify-center gap-1 shadow-md transition-all cursor-pointer text-center"
            >
              <Trophy className="w-3.5 h-3.5 text-zinc-950 shrink-0" />
              <span>{isHindi ? 'लीडरबोर्ड 🏆' : 'Ranks 🏆'}</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
