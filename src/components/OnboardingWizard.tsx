import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Trophy,
  Flame, Compass, Sun, Moon, Sunrise, Droplet, BookOpen,
  X, ShieldCheck, Heart, User, MapPin, Globe, Sliders,
  Check, RefreshCw, Zap
} from 'lucide-react';

export interface UserProfile {
  name: string;
  country: string;
  countryFlag: string;
  state: string;
  city: string;
  targetDays: number;
  routines: {
    morning: string[];
    afternoon: string[];
    night: string[];
  };
  completedAt?: string;
}

export const COUNTRIES = [
  { name: 'India', flag: '🇮🇳', code: 'IN' },
  { name: 'Nepal', flag: '🇳🇵', code: 'NP' },
  { name: 'United States', flag: '🇺🇸', code: 'US' },
  { name: 'United Kingdom', flag: '🇬🇧', code: 'UK' },
  { name: 'Canada', flag: '🇨🇦', code: 'CA' },
  { name: 'United Arab Emirates', flag: '🇦🇪', code: 'AE' },
  { name: 'Australia', flag: '🇦🇺', code: 'AU' },
  { name: 'Germany', flag: '🇩🇪', code: 'DE' },
  { name: 'Singapore', flag: '🇸🇬', code: 'SG' },
  { name: 'Mauritius', flag: '🇲🇺', code: 'MU' },
  { name: 'Global Sadhak', flag: '🌐', code: 'GL' },
];

export const PRESET_GOALS = [
  {
    days: 21,
    title: '21 Days',
    subtitle: 'Dopamine Reset',
    hindi: 'वीर्य रक्षण आरम्भ',
    icon: Zap,
    gradient: 'from-amber-500/20 to-yellow-500/10',
    border: 'border-amber-500/30',
    highlight: 'Dopamine Receptors Heal',
  },
  {
    days: 60,
    title: '60 Days',
    subtitle: 'Energy Awakening',
    hindi: 'तेजस उत्थान',
    icon: Flame,
    gradient: 'from-orange-500/20 to-amber-500/10',
    border: 'border-orange-500/30',
    highlight: 'Magnetism & Vigor',
  },
  {
    days: 90,
    title: '90 Days',
    subtitle: 'Mental Clarity',
    hindi: 'मनः शुद्धि संकल्प',
    icon: Compass,
    gradient: 'from-emerald-500/20 to-teal-500/10',
    border: 'border-emerald-500/30',
    highlight: 'Zero Brain Fog & Iron Will',
  },
  {
    days: 108,
    title: '108 Days',
    subtitle: 'Vedic Siddhi',
    hindi: 'दिव्य ओजस सिद्धि',
    icon: Trophy,
    gradient: 'from-amber-400/30 to-purple-600/20',
    border: 'border-amber-400/50',
    highlight: 'Spiritual Transmutation',
  },
];

export const ROUTINE_TASKS = {
  morning: [
    { id: 'm_water', label: 'Ushapaan (Warm Water)', icon: '💧', desc: '1 Litre water upon waking' },
    { id: 'm_yoga', label: 'Surya Namaskar & Pranayama', icon: '🧘', desc: '20 mins breathwork' },
    { id: 'm_shower', label: 'Cold Water Bath (शीतल स्नान)', icon: '🚿', desc: 'Soothes nervous system' },
    { id: 'm_jap', label: 'Morning Japa (नाम जप)', icon: '📿', desc: '108 chants of Mahamantra/Om' },
  ],
  afternoon: [
    { id: 'a_sattvic', label: 'Sattvic Pure Lunch', icon: '🥗', desc: 'No onion, garlic, junk' },
    { id: 'a_walk', label: 'Pranic Sunlight Walk', icon: '☀️', desc: '15 mins post-meal stroll' },
    { id: 'a_study', label: 'Swadhyaya (Spiritual Study)', icon: '📚', desc: 'Gita or Swami Vivekananda' },
    { id: 'a_breathe', label: 'Anulom Vilom Reset', icon: '💨', desc: '5 mins afternoon pause' },
  ],
  night: [
    { id: 'n_noscreen', label: 'Digital Fast (No Phone 9 PM)', icon: '🚫', desc: 'Block late night triggers' },
    { id: 'n_evening_jap', label: 'Evening Meditation & Gratitude', icon: '📿', desc: 'Calm wandering mind' },
    { id: 'n_dairy', label: 'Introspection Journaling', icon: '✍️', desc: 'Review victories of the day' },
    { id: 'n_sleep', label: 'Sleep by 10 PM (ब्रह्म मुहूर्त उत्थान)', icon: '🌙', desc: 'Wake up at 4 AM refreshed' },
  ],
};

interface OnboardingWizardProps {
  isOpen?: boolean;
  onClose?: () => void;
  onComplete?: (profile: UserProfile) => void;
  forceShow?: boolean;
}

export default function OnboardingWizard({
  isOpen: propIsOpen,
  onClose,
  onComplete,
  forceShow = false,
}: OnboardingWizardProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [step, setStep] = useState(1);

  // Form State
  const [name, setName] = useState('');
  const [country, setCountry] = useState(COUNTRIES[0].name);
  const [countryFlag, setCountryFlag] = useState(COUNTRIES[0].flag);
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');

  // Target Goal State
  const [targetDays, setTargetDays] = useState(90);
  const [customDays, setCustomDays] = useState(90);

  // Routines State
  const [selectedRoutines, setSelectedRoutines] = useState<{
    morning: string[];
    afternoon: string[];
    night: string[];
  }>({
    morning: ['m_water', 'm_yoga', 'm_jap'],
    afternoon: ['a_sattvic', 'a_study'],
    night: ['n_noscreen', 'n_sleep'],
  });

  const [activeRoutineTab, setActiveRoutineTab] = useState<'morning' | 'afternoon' | 'night'>('morning');

  useEffect(() => {
    try {
      const completed = localStorage.getItem('bm_onboarding_completed');
      const savedProfile = localStorage.getItem('bm_user_profile');

      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        if (parsed.name) setName(parsed.name);
        if (parsed.country) setCountry(parsed.country);
        if (parsed.countryFlag) setCountryFlag(parsed.countryFlag);
        if (parsed.state) setStateName(parsed.state);
        if (parsed.city) setCityName(parsed.city);
        if (parsed.targetDays) {
          setTargetDays(parsed.targetDays);
          setCustomDays(parsed.targetDays);
        }
        if (parsed.routines) setSelectedRoutines(parsed.routines);
      }

      if (forceShow) {
        setInternalOpen(true);
      } else if (!completed && propIsOpen === undefined) {
        setInternalOpen(true);
      }
    } catch (e) {}

    const handleOpenEvent = () => {
      setStep(1);
      setInternalOpen(true);
    };

    window.addEventListener('open-onboarding-wizard', handleOpenEvent);
    return () => window.removeEventListener('open-onboarding-wizard', handleOpenEvent);
  }, [forceShow, propIsOpen]);

  const isModalOpen = propIsOpen !== undefined ? propIsOpen : internalOpen;

  const handleClose = () => {
    setInternalOpen(false);
    if (onClose) onClose();
  };

  const handleCountryChange = (cName: string) => {
    setCountry(cName);
    const found = COUNTRIES.find((c) => c.name === cName);
    if (found) setCountryFlag(found.flag);
  };

  const toggleTask = (period: 'morning' | 'afternoon' | 'night', taskId: string) => {
    setSelectedRoutines((prev) => {
      const current = prev[period];
      const exists = current.includes(taskId);
      return {
        ...prev,
        [period]: exists ? current.filter((id) => id !== taskId) : [...current, taskId],
      };
    });
  };

  const handleSaveAndComplete = () => {
    const profile: UserProfile = {
      name: name.trim() || 'Sadhak Veer',
      country,
      countryFlag,
      state: stateName.trim() || 'Dharma Kshetra',
      city: cityName.trim() || 'Kashi',
      targetDays,
      routines: selectedRoutines,
      completedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem('bm_user_profile', JSON.stringify(profile));
      localStorage.setItem('bm_target_goal', String(targetDays));
      localStorage.setItem('bm_onboarding_completed', 'true');
      localStorage.setItem('bm_daily_routines', JSON.stringify(selectedRoutines));

      window.dispatchEvent(new CustomEvent('onboarding-completed', { detail: profile }));
    } catch (e) {
      console.warn('LocalStorage error in OnboardingWizard:', e);
    }

    if (onComplete) onComplete(profile);
    handleClose();
  };

  const totalSelectedTasks =
    selectedRoutines.morning.length +
    selectedRoutines.afternoon.length +
    selectedRoutines.night.length;

  if (!isModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#02040a]/90 backdrop-blur-2xl transition-all"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-zinc-950/95 border-2 border-amber-500/35 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.95),0_0_40px_rgba(245,158,11,0.2)] overflow-hidden my-auto z-10"
        >
          {/* Top Ambient Saffron Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-gradient-to-b from-amber-500/25 via-amber-600/10 to-transparent blur-2xl pointer-events-none" />

          {/* Header Bar with Step Progress */}
          <div className="relative px-6 pt-6 pb-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center font-cinzel font-black text-amber-400 text-sm">
                  ॐ
                </div>
              </div>
              <div>
                <h3 className="font-cinzel font-bold text-base sm:text-lg text-white flex items-center gap-2">
                  <span>Sadhak Onboarding</span>
                  <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Step {step} of 4
                  </span>
                </h3>
                <p className="text-xs text-zinc-400">Personalize your Brahmacharya journey & global leaderboard rank</p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition cursor-pointer"
              title="Close Wizard"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Animated Top Progress Line */}
          <div className="w-full h-1 bg-zinc-900 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 via-amber-300 to-yellow-400 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
              initial={{ width: '25%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Content Area */}
          <div className="p-6 sm:p-8 max-h-[72vh] overflow-y-auto no-scrollbar">
            {/* ── STEP 1: USER PROFILE ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                    <User className="w-3.5 h-3.5" />
                    <span>STEP 1: SACRED IDENTITY</span>
                  </div>
                  <h4 className="text-2xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200">
                    Who is Taking the Sankalpa?
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    Your name and location appear on the Global Sadhak Brotherhood Leaderboard.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      <span>Your Name / Sadhak Alias (साधक नाम) *</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Banty, Aryan, Rohit, Shiva..."
                      className="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-amber-500/30 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-white placeholder-zinc-500 text-sm transition"
                    />
                  </div>

                  {/* Country Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1.5 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" />
                      <span>Country / Desh (देश) *</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {COUNTRIES.map((c) => {
                        const isSelected = country === c.name;
                        return (
                          <button
                            key={c.code}
                            type="button"
                            onClick={() => handleCountryChange(c.name)}
                            className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition cursor-pointer text-xs ${
                              isSelected
                                ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.25)] font-bold'
                                : 'bg-zinc-900/70 border-white/10 hover:border-amber-500/30 text-zinc-300'
                            }`}
                          >
                            <span className="text-lg">{c.flag}</span>
                            <span className="truncate">{c.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* State & City Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>State / Province (राज्य)</span>
                      </label>
                      <input
                        type="text"
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        placeholder="e.g. Odisha, Delhi, California..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/15 focus:border-amber-400 focus:outline-none text-white placeholder-zinc-500 text-xs transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>City / Town (नगर)</span>
                      </label>
                      <input
                        type="text"
                        value={cityName}
                        onChange={(e) => setCityName(e.target.value)}
                        placeholder="e.g. Bhubaneswar, Varanasi, London..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900/90 border border-white/15 focus:border-amber-400 focus:outline-none text-white placeholder-zinc-500 text-xs transition"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: GOAL SELECTOR ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>STEP 2: CHOOSE YOUR GOAL</span>
                  </div>
                  <h4 className="text-2xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200">
                    What is Your Sacred Resolve?
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    Select a classical milestone or calibrate a custom day target.
                  </p>
                </div>

                {/* 4 Large Preset Goal Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {PRESET_GOALS.map((g) => {
                    const isSelected = targetDays === g.days;
                    const Icon = g.icon;
                    return (
                      <button
                        key={g.days}
                        type="button"
                        onClick={() => {
                          setTargetDays(g.days);
                          setCustomDays(g.days);
                        }}
                        className={`relative p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer overflow-hidden group ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.3)] ring-1 ring-amber-400'
                            : 'bg-zinc-900/80 border-white/10 hover:border-amber-500/40'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-11 h-11 rounded-2xl flex items-center justify-center border transition-all ${
                                isSelected
                                  ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-md font-black'
                                  : 'bg-zinc-800 text-amber-300 border-white/10 group-hover:scale-105'
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-cinzel font-black text-lg text-white">
                                {g.title}
                              </div>
                              <div className="text-xs text-amber-400/90 font-medium">{g.subtitle}</div>
                            </div>
                          </div>

                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-zinc-950">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
                          <span className="font-sanskrit text-zinc-300">{g.hindi}</span>
                          <span className="text-amber-300/90 font-semibold">{g.highlight}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Target Slider */}
                <div className="p-4 rounded-2xl bg-zinc-900/70 border border-amber-500/25 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-amber-400" />
                      <span>Custom Target Slider</span>
                    </span>
                    <span className="font-mono font-black text-amber-300 text-sm">
                      {targetDays} DAYS
                    </span>
                  </div>

                  <input
                    type="range"
                    min="7"
                    max="365"
                    step="1"
                    value={targetDays}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setTargetDays(val);
                      setCustomDays(val);
                    }}
                    className="w-full accent-amber-400 cursor-pointer h-2 bg-zinc-800 rounded-lg"
                  />

                  <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                    <span>7 Days (Reset)</span>
                    <span>108 Days (Siddhi)</span>
                    <span>365 Days (Akhand Veer)</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: DAILY ROUTINE BUILDER ── */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
                    <Compass className="w-3.5 h-3.5" />
                    <span>STEP 3: DAILY DINACHARYA</span>
                  </div>
                  <h4 className="text-2xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200">
                    Build Your Daily Disciplines
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    Select habits for morning, afternoon, and night to anchor your streak.
                  </p>
                </div>

                {/* Period Badges (Morning / Afternoon / Night) */}
                <div className="flex items-center justify-center gap-2 p-1 rounded-2xl bg-zinc-900 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setActiveRoutineTab('morning')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeRoutineTab === 'morning'
                        ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/30'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>🌅</span>
                    <span>Morning ({selectedRoutines.morning.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveRoutineTab('afternoon')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeRoutineTab === 'afternoon'
                        ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/30'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>☀️</span>
                    <span>Afternoon ({selectedRoutines.afternoon.length})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveRoutineTab('night')}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeRoutineTab === 'night'
                        ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/30'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>🌙</span>
                    <span>Night ({selectedRoutines.night.length})</span>
                  </button>
                </div>

                {/* Task Items List for Active Tab */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ROUTINE_TASKS[activeRoutineTab].map((task) => {
                    const isChecked = selectedRoutines[activeRoutineTab].includes(task.id);
                    return (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => toggleTask(activeRoutineTab, task.id)}
                        className={`p-3.5 rounded-2xl border text-left transition flex items-start gap-3 cursor-pointer group ${
                          isChecked
                            ? 'bg-amber-500/15 border-amber-400/60 shadow-[0_0_15px_rgba(245,158,11,0.15)] text-white'
                            : 'bg-zinc-900/60 border-white/10 hover:border-white/20 text-zinc-400'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center text-xs mt-0.5 transition ${
                            isChecked
                              ? 'bg-amber-400 border-amber-400 text-zinc-950 font-black'
                              : 'border-white/20 group-hover:border-amber-400/50'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>{task.icon}</span>
                            <span className="truncate">{task.label}</span>
                          </div>
                          <div className="text-[10px] text-zinc-400 mt-0.5">{task.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="text-center text-xs text-amber-300/80 font-medium">
                  ✨ Total {totalSelectedTasks} daily disciplines chosen for your Dinacharya.
                </div>
              </motion.div>
            )}

            {/* ── STEP 4: ALL SET SCREEN ── */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6 text-center"
              >
                {/* Glowing Checkmark Badge */}
                <div className="relative inline-flex items-center justify-center mt-2">
                  <div className="absolute inset-0 bg-amber-500/30 rounded-full blur-2xl animate-pulse" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 p-1 flex items-center justify-center shadow-[0_0_35px_rgba(245,158,11,0.6)]">
                    <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-amber-400 animate-bounce" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-2xl sm:text-3xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-100">
                    Your Sacred Resolve is Sealed!
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    Sadhak <span className="text-amber-300 font-bold">{name || 'Veer'}</span>, you are now registered in the Global Brotherhood.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-amber-500/30 text-left space-y-3 shadow-xl">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{countryFlag}</span>
                      <div>
                        <div className="font-bold text-white text-sm">{name || 'Sadhak Veer'}</div>
                        <div className="text-[11px] text-zinc-400">
                          {cityName ? `${cityName}, ` : ''}{stateName || country}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-amber-300/80 uppercase font-semibold">Target Resolve</div>
                      <div className="font-mono font-black text-amber-400 text-lg">{targetDays} DAYS</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-zinc-950/70 border border-white/10">
                      <div className="text-[10px] text-zinc-500">Morning</div>
                      <div className="font-bold text-amber-300">{selectedRoutines.morning.length} Habits</div>
                    </div>
                    <div className="p-2 rounded-xl bg-zinc-950/70 border border-white/10">
                      <div className="text-[10px] text-zinc-500">Afternoon</div>
                      <div className="font-bold text-amber-300">{selectedRoutines.afternoon.length} Habits</div>
                    </div>
                    <div className="p-2 rounded-xl bg-zinc-950/70 border border-white/10">
                      <div className="text-[10px] text-zinc-500">Night</div>
                      <div className="font-bold text-amber-300">{selectedRoutines.night.length} Habits</div>
                    </div>
                  </div>
                </div>

                {/* Sacred Quote */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 font-serif italic">
                  "ब्रह्मचर्येण तपसा देवा मृत्युमपाघ्नत — Through Brahmacharya and Tapasya, one conquers all mortality and attains divine effulgence."
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Action Footer */}
          <div className="px-6 py-4 bg-zinc-950/90 border-t border-white/10 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-yellow-300 text-zinc-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-500/25 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ml-auto"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveAndComplete}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 hover:from-amber-400 hover:to-yellow-200 text-zinc-950 font-black text-sm tracking-wider shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-zinc-950" />
                <span>START JOURNEY (साधना आरम्भ करें)</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
