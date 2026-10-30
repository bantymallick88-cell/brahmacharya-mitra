import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, ShieldAlert, CheckCircle2, Circle, Trophy,
  Sunrise, Sun, Moon, Sparkles, Award, RotateCcw,
  Plus, Edit3, ArrowUpRight, Heart, Droplets,
  BookOpen, Activity, Disc, Zap, Check, ChevronRight
} from 'lucide-react';
import type { UserProfile } from './OnboardingWizard';

const DEFAULT_PROFILE: UserProfile = {
  name: 'Brave Sadhak',
  country: 'India',
  countryFlag: '🇮🇳',
  state: 'Bharat',
  city: 'Kashi',
  targetDays: 90,
  routines: {
    morning: ['water', 'yoga', 'naam_jap', 'meditation'],
    afternoon: ['water', 'walk', 'swadhyaya'],
    night: ['naam_jap', 'gratitude', 'screen_off'],
  },
};

const TASK_DEFINITIONS: Record<string, { label: string; icon: string; time: string }> = {
  water: { label: 'Surya Namaskar Water (1L)', icon: '💧', time: '5 Mins' },
  yoga: { label: 'Asana & Pranayama', icon: '🧘', time: '20 Mins' },
  naam_jap: { label: '108 Naam Jap Mala', icon: '📿', time: '15 Mins' },
  meditation: { label: 'Trataka / Dhyana', icon: '🕉️', time: '10 Mins' },
  cold_bath: { label: 'Cold Water Bath', icon: '🚿', time: '10 Mins' },
  walk: { label: 'Mindful Sunlight Walk', icon: '🚶', time: '15 Mins' },
  swadhyaya: { label: 'Scripture / Gita Study', icon: '📚', time: '20 Mins' },
  satvik_food: { label: 'Satvik Wholesome Meal', icon: '🥗', time: '30 Mins' },
  gratitude: { label: 'Daily Introspection & Diary', icon: '✍️', time: '10 Mins' },
  screen_off: { label: 'No Screens 1hr Prior Bed', icon: '📵', time: '60 Mins' },
  mantra: { label: 'Gayatri Mantra Recitation', icon: '✨', time: '10 Mins' },
};

export const DailyDashboard: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [streakDays, setStreakDays] = useState<number>(14);
  const [todayCompletedTasks, setTodayCompletedTasks] = useState<string[]>([]);
  const [japaCount, setJapaCount] = useState<number>(108);
  const [checkedInToday, setCheckedInToday] = useState<boolean>(false);
  const [copiedQuote, setCopiedQuote] = useState<boolean>(false);

  const todayKey = new Date().toISOString().slice(0, 10);

  // Load state from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedProfile = localStorage.getItem('bm_user_profile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }

      const savedStreak = localStorage.getItem('bm_active_streak');
      if (savedStreak) {
        setStreakDays(parseInt(savedStreak, 10) || 1);
      } else {
        localStorage.setItem('bm_active_streak', '14');
      }

      const savedTasks = localStorage.getItem(`bm_daily_tasks_${todayKey}`);
      if (savedTasks) {
        setTodayCompletedTasks(JSON.parse(savedTasks));
      } else {
        // Pre-check a couple for rich initial display
        const initial = ['water', 'yoga'];
        setTodayCompletedTasks(initial);
        localStorage.setItem(`bm_daily_tasks_${todayKey}`, JSON.stringify(initial));
      }

      const savedJapa = localStorage.getItem('bm_japa_counter');
      if (savedJapa) {
        setJapaCount(parseInt(savedJapa, 10) || 0);
      }

      const checkInStatus = localStorage.getItem(`bm_checkin_${todayKey}`);
      if (checkInStatus === 'true') {
        setCheckedInToday(true);
      }
    } catch (e) {
      console.warn('Error reading from localStorage', e);
    }

    const handleProfileUpdate = () => {
      try {
        const saved = localStorage.getItem('bm_user_profile');
        if (saved) setProfile(JSON.parse(saved));
      } catch (e) {}
    };

    window.addEventListener('bm_profile_updated', handleProfileUpdate);
    return () => window.removeEventListener('bm_profile_updated', handleProfileUpdate);
  }, [todayKey]);

  // Toggle routine task
  const toggleTask = (taskId: string) => {
    const updated = todayCompletedTasks.includes(taskId)
      ? todayCompletedTasks.filter((id) => id !== taskId)
      : [...todayCompletedTasks, taskId];

    setTodayCompletedTasks(updated);
    try {
      localStorage.setItem(`bm_daily_tasks_${todayKey}`, JSON.stringify(updated));
    } catch (e) {}
  };

  // Check-in for today
  const handleCheckIn = () => {
    if (checkedInToday) return;
    const newStreak = streakDays + 1;
    setStreakDays(newStreak);
    setCheckedInToday(true);
    try {
      localStorage.setItem('bm_active_streak', newStreak.toString());
      localStorage.setItem(`bm_checkin_${todayKey}`, 'true');
    } catch (e) {}
  };

  // Japa counter increments
  const addJapa = (amount: number) => {
    const nextCount = Math.max(0, japaCount + amount);
    setJapaCount(nextCount);
    try {
      localStorage.setItem('bm_japa_counter', nextCount.toString());
    } catch (e) {}
  };

  // Speedometer calculation
  const targetDays = profile.targetDays || 90;
  const progressPercent = Math.min(100, Math.round((streakDays / targetDays) * 100));
  const remainingDays = Math.max(0, targetDays - streakDays);

  // Rank determination
  const getSadhakRank = (days: number) => {
    if (days >= 108) return { title: 'Paramhansa Sadhak', color: 'text-amber-400', badge: '👑 Divya Tejas' };
    if (days >= 90) return { title: 'Ojasvi Brahmachari', color: 'text-amber-500', badge: '⚡ Vajra Kaya' };
    if (days >= 60) return { title: 'Tejasvi Warrior', color: 'text-orange-400', badge: '🔥 Agni Tejas' };
    if (days >= 21) return { title: 'Veerya Rakshak', color: 'text-yellow-400', badge: '🛡️ Shuddhi' };
    return { title: 'Sankalpa Initiate', color: 'text-zinc-300', badge: '🌱 Arambha' };
  };

  const rank = getSadhakRank(streakDays);

  // Speedometer SVG arc math
  // Semi-circle arc: from 180 to 0 degrees (left to right)
  const radius = 100;
  const circumference = Math.PI * radius; // approx 314
  const strokeDashoffset = circumference - (circumference * progressPercent) / 100;

  // Routines calculation
  const morningList = profile.routines?.morning?.length
    ? profile.routines.morning
    : ['water', 'yoga', 'naam_jap'];
  const afternoonList = profile.routines?.afternoon?.length
    ? profile.routines.afternoon
    : ['water', 'swadhyaya'];
  const nightList = profile.routines?.night?.length
    ? profile.routines.night
    : ['naam_jap', 'gratitude', 'screen_off'];

  const getCompletedCount = (items: string[]) =>
    items.filter((id) => todayCompletedTasks.includes(id)).length;

  const totalTasksCount = morningList.length + afternoonList.length + nightList.length;
  const totalCompletedCount =
    getCompletedCount(morningList) +
    getCompletedCount(afternoonList) +
    getCompletedCount(nightList);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Welcome & Profile Bar */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-zinc-950 border border-amber-500/20 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/20">
                <div className="w-full h-full bg-zinc-950 rounded-2xl flex items-center justify-center text-3xl">
                  {profile.countryFlag || '🇮🇳'}
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-zinc-950" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {profile.name}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold">
                  {rank.badge}
                </span>
              </div>
              <p className="text-sm text-zinc-400 flex items-center gap-2 mt-1">
                <span>📍 {profile.city ? `${profile.city}, ${profile.state || profile.country}` : profile.country}</span>
                <span>•</span>
                <span className={rank.color}>{rank.title}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('open-onboarding-wizard'));
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700 hover:border-amber-500/40 text-xs font-semibold text-zinc-200 transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>Edit Goal / Routine</span>
            </button>

            <button
              onClick={handleCheckIn}
              disabled={checkedInToday}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg cursor-pointer ${
                checkedInToday
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 shadow-amber-500/20 hover:scale-[1.02]'
              }`}
            >
              {checkedInToday ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Day {streakDays} Protected ✓</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-zinc-950" />
                  <span>Record Today's Victory</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Speedometer Dial + Right Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Speedometer Dial Card (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-amber-500/20 p-6 md:p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Live Tapasya Velocity
              </span>
              <h2 className="text-lg font-bold text-white">Brahmacharya Dial</h2>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Flame className="w-4 h-4 fill-amber-400 animate-pulse text-amber-500" />
              <span>{streakDays} DAYS ACTIVE</span>
            </div>
          </div>

          {/* SVG Speedometer Gauge */}
          <div className="relative flex flex-col items-center justify-center my-4">
            <svg
              className="w-72 sm:w-84 md:w-96 overflow-visible"
              viewBox="0 0 240 140"
            >
              <defs>
                <linearGradient id="speedGauge" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
                <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#f59e0b" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* Background Arc */}
              <path
                d="M 20 125 A 100 100 0 0 1 220 125"
                fill="none"
                stroke="#27272a"
                strokeWidth="18"
                strokeLinecap="round"
              />

              {/* Foreground Animated Value Arc */}
              <path
                d="M 20 125 A 100 100 0 0 1 220 125"
                fill="none"
                stroke="url(#speedGauge)"
                strokeWidth="18"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                filter="url(#goldGlow)"
                className="transition-all duration-1000 ease-out"
              />

              {/* Milestone ticks */}
              <circle cx="20" cy="125" r="3" fill="#71717a" />
              <circle cx="70" cy="50" r="3" fill="#71717a" />
              <circle cx="120" cy="25" r="3" fill="#f59e0b" />
              <circle cx="170" cy="50" r="3" fill="#71717a" />
              <circle cx="220" cy="125" r="3" fill="#f59e0b" />
            </svg>

            {/* Inner Center Metrics */}
            <div className="absolute bottom-2 text-center flex flex-col items-center">
              <span className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 font-cinzel">
                {streakDays}
              </span>
              <span className="text-xs uppercase tracking-widest text-zinc-400 font-bold mt-1">
                Days Preserved
              </span>
              <span className="text-xs font-semibold text-amber-400/90 mt-0.5">
                {progressPercent}% of {targetDays} Days Target
              </span>
            </div>
          </div>

          {/* Dial Stats Row */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zinc-800/80">
            <div className="bg-zinc-950/60 rounded-xl p-3 text-center border border-zinc-800/60">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Sankalpa</span>
              <span className="text-base font-extrabold text-amber-300">{targetDays} Days</span>
            </div>
            <div className="bg-zinc-950/60 rounded-xl p-3 text-center border border-zinc-800/60">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Remaining</span>
              <span className="text-base font-extrabold text-zinc-200">{remainingDays} Days</span>
            </div>
            <div className="bg-zinc-950/60 rounded-xl p-3 text-center border border-zinc-800/60">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Today's Tasks</span>
              <span className="text-base font-extrabold text-emerald-400">
                {totalCompletedCount}/{totalTasksCount}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side Cards (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Digital Naam Jap Mala Widget */}
          <div className="rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950 border border-amber-500/20 p-6 backdrop-blur-xl shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Disc className="w-5 h-5 animate-spin-slow" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Naam Jap Mala</h3>
                  <p className="text-xs text-zinc-400">Sacred Name Chanting Counter</p>
                </div>
              </div>
              <button
                onClick={() => addJapa(-japaCount)}
                title="Reset counter"
                className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded-lg hover:bg-zinc-800 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center py-4 bg-zinc-950/60 rounded-2xl border border-zinc-800/60 mb-4">
              <span className="text-4xl sm:text-5xl font-black text-amber-400 tracking-wider font-mono">
                {japaCount.toLocaleString()}
              </span>
              <span className="text-xs text-zinc-400 block mt-1">
                Completed Malas: <strong className="text-amber-300">{Math.floor(japaCount / 108)}</strong>
                {' '}({japaCount % 108}/108 beads)
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => addJapa(1)}
                className="py-3 px-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-sm flex items-center justify-center gap-1 shadow-lg shadow-amber-500/20 active:scale-95 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" /> 1 Bead
              </button>
              <button
                onClick={() => addJapa(108)}
                className="py-3 px-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-amber-500/30 font-bold text-sm flex items-center justify-center gap-1 active:scale-95 transition cursor-pointer"
              >
                +1 Mala (108)
              </button>
              <button
                onClick={() => addJapa(27)}
                className="py-3 px-2 rounded-xl bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 font-semibold text-xs flex items-center justify-center active:scale-95 transition cursor-pointer"
              >
                +27 Beads
              </button>
            </div>
          </div>

          {/* Today's Shloka / Inspiration Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-amber-950/30 via-zinc-900 to-zinc-950 border border-amber-500/20 p-5 backdrop-blur-xl relative flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Prashna Upanishad • 1.10</span>
              </div>
              <p className="text-sm font-sanskrit text-amber-200/90 italic leading-relaxed">
                "तपसा ब्रह्मचर्येण श्रद्धया विद्ययाऽऽत्मानमन्विष्य..."
              </p>
              <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                Through Tapas (discipline), Brahmacharya (chastity), Shraddha (faith), and true knowledge, the wise seek and attain Supreme Bliss.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-[11px] text-zinc-400">Veerya converts into divine Ojas & Tejas.</span>
              <a
                href={typeof window !== 'undefined' ? `${(import.meta.env.BASE_URL || '/').replace(/\/$/, '')}/leaderboard/` : '/leaderboard/'}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group"
              >
                <span>Global Rank</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Routine Cards: Morning, Afternoon, Night (Icon-heavy & Quick Checkable) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              Daily Satvik Dinacharya
            </span>
            <h2 className="text-xl md:text-2xl font-black text-white">Daily Routine & Tapasya</h2>
          </div>
          <span className="text-xs text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
            {totalCompletedCount} of {totalTasksCount} Completed Today
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Morning Routine Card */}
          <div className="rounded-3xl bg-zinc-900/80 border border-amber-500/20 p-5 backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Sunrise className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Morning Routine</h3>
                    <p className="text-[11px] text-zinc-400">04:00 AM – 08:00 AM</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  {getCompletedCount(morningList)}/{morningList.length}
                </span>
              </div>

              <div className="mt-4 space-y-2.5">
                {morningList.map((taskId) => {
                  const def = TASK_DEFINITIONS[taskId] || {
                    label: taskId,
                    icon: '⚡',
                    time: '15 Mins',
                  };
                  const isDone = todayCompletedTasks.includes(taskId);
                  return (
                    <button
                      key={taskId}
                      onClick={() => toggleTask(taskId)}
                      className={`w-full text-left p-3 rounded-2xl flex items-center justify-between border transition cursor-pointer ${
                        isDone
                          ? 'bg-amber-500/10 border-amber-500/40 text-white'
                          : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{def.icon}</span>
                        <div>
                          <p className={`text-xs font-bold ${isDone ? 'line-through text-zinc-400' : 'text-zinc-200'}`}>
                            {def.label}
                          </p>
                          <span className="text-[10px] text-zinc-500">{def.time}</span>
                        </div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center border transition ${
                          isDone
                            ? 'bg-amber-500 border-amber-400 text-zinc-950 shadow-md shadow-amber-500/30'
                            : 'border-zinc-700 bg-zinc-900 text-transparent'
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Afternoon Routine Card */}
          <div className="rounded-3xl bg-zinc-900/80 border border-orange-500/20 p-5 backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Afternoon Focus</h3>
                    <p className="text-[11px] text-zinc-400">12:00 PM – 04:00 PM</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20">
                  {getCompletedCount(afternoonList)}/{afternoonList.length}
                </span>
              </div>

              <div className="mt-4 space-y-2.5">
                {afternoonList.map((taskId) => {
                  const def = TASK_DEFINITIONS[taskId] || {
                    label: taskId,
                    icon: '☀️',
                    time: '15 Mins',
                  };
                  const isDone = todayCompletedTasks.includes(taskId);
                  return (
                    <button
                      key={taskId}
                      onClick={() => toggleTask(taskId)}
                      className={`w-full text-left p-3 rounded-2xl flex items-center justify-between border transition cursor-pointer ${
                        isDone
                          ? 'bg-orange-500/10 border-orange-500/40 text-white'
                          : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{def.icon}</span>
                        <div>
                          <p className={`text-xs font-bold ${isDone ? 'line-through text-zinc-400' : 'text-zinc-200'}`}>
                            {def.label}
                          </p>
                          <span className="text-[10px] text-zinc-500">{def.time}</span>
                        </div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center border transition ${
                          isDone
                            ? 'bg-orange-500 border-orange-400 text-zinc-950 shadow-md shadow-orange-500/30'
                            : 'border-zinc-700 bg-zinc-900 text-transparent'
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Night Routine Card */}
          <div className="rounded-3xl bg-zinc-900/80 border border-amber-500/20 p-5 backdrop-blur-xl shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Moon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Night Discipline</h3>
                    <p className="text-[11px] text-zinc-400">08:00 PM – 10:00 PM</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  {getCompletedCount(nightList)}/{nightList.length}
                </span>
              </div>

              <div className="mt-4 space-y-2.5">
                {nightList.map((taskId) => {
                  const def = TASK_DEFINITIONS[taskId] || {
                    label: taskId,
                    icon: '🌙',
                    time: '15 Mins',
                  };
                  const isDone = todayCompletedTasks.includes(taskId);
                  return (
                    <button
                      key={taskId}
                      onClick={() => toggleTask(taskId)}
                      className={`w-full text-left p-3 rounded-2xl flex items-center justify-between border transition cursor-pointer ${
                        isDone
                          ? 'bg-amber-500/10 border-amber-500/40 text-white'
                          : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{def.icon}</span>
                        <div>
                          <p className={`text-xs font-bold ${isDone ? 'line-through text-zinc-400' : 'text-zinc-200'}`}>
                            {def.label}
                          </p>
                          <span className="text-[10px] text-zinc-500">{def.time}</span>
                        </div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center border transition ${
                          isDone
                            ? 'bg-amber-500 border-amber-400 text-zinc-950 shadow-md shadow-amber-500/30'
                            : 'border-zinc-700 bg-zinc-900 text-transparent'
                        }`}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Emergency Action Button: "SOS Urge Killer" with Pulse Animation */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          id="btn-sos-urge-killer"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('open-panic-modal'));
            }
          }}
          className="relative group flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white font-extrabold text-sm tracking-wide shadow-2xl shadow-red-500/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-amber-300/40"
        >
          {/* Pulsing ring animation */}
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-red-600 to-amber-500 opacity-60 blur-md group-hover:opacity-100 animate-pulse pointer-events-none" />
          
          <div className="relative flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-bounce">
              <ShieldAlert className="w-5 h-5 text-amber-200" />
            </div>
            <div className="text-left">
              <span className="block text-[10px] uppercase font-bold tracking-wider text-amber-200">
                Immediate Shield
              </span>
              <span className="block font-black text-sm text-white drop-shadow">
                SOS Urge Killer
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default DailyDashboard;
