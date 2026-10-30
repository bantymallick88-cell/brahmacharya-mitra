import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Trophy,
  Flame, Compass, Sun, Moon, Sunrise, Droplet, BookOpen,
  X, ShieldCheck, Heart, User, MapPin, Globe, Sliders,
  Check, RefreshCw, Zap, Search, AlertCircle, Compass as CompassIcon
} from 'lucide-react';

export interface UserProfile {
  name: string;
  country: string;
  countryFlag: string;
  countryCode?: string;
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

// 70+ Global Countries with Country Codes & Flags
export const GLOBAL_COUNTRIES = [
  { name: 'India', flag: '🇮🇳', code: 'IN', coords: '20.59° N, 78.96° E' },
  { name: 'Nepal', flag: '🇳🇵', code: 'NP', coords: '28.39° N, 84.12° E' },
  { name: 'United States', flag: '🇺🇸', code: 'US', coords: '37.09° N, 95.71° W' },
  { name: 'United Kingdom', flag: '🇬🇧', code: 'GB', coords: '55.37° N, 3.43° W' },
  { name: 'Canada', flag: '🇨🇦', code: 'CA', coords: '56.13° N, 106.34° W' },
  { name: 'United Arab Emirates', flag: '🇦🇪', code: 'AE', coords: '23.42° N, 53.84° E' },
  { name: 'Australia', flag: '🇦🇺', code: 'AU', coords: '25.27° S, 133.77° E' },
  { name: 'Germany', flag: '🇩🇪', code: 'DE', coords: '51.16° N, 10.45° E' },
  { name: 'Singapore', flag: '🇸🇬', code: 'SG', coords: '1.35° N, 103.81° E' },
  { name: 'Mauritius', flag: '🇲🇺', code: 'MU', coords: '20.34° S, 57.55° E' },
  { name: 'New Zealand', flag: '🇳🇿', code: 'NZ', coords: '40.90° S, 174.88° E' },
  { name: 'France', flag: '🇫🇷', code: 'FR', coords: '46.22° N, 2.21° E' },
  { name: 'Japan', flag: '🇯🇵', code: 'JP', coords: '36.20° N, 138.25° E' },
  { name: 'Russia', flag: '🇷🇺', code: 'RU', coords: '61.52° N, 105.31° E' },
  { name: 'Brazil', flag: '🇧🇷', code: 'BR', coords: '14.23° S, 51.92° W' },
  { name: 'South Africa', flag: '🇿🇦', code: 'ZA', coords: '30.55° S, 22.93° E' },
  { name: 'Indonesia', flag: '🇮🇩', code: 'ID', coords: '0.78° S, 113.92° E' },
  { name: 'Malaysia', flag: '🇲🇾', code: 'MY', coords: '4.21° N, 101.97° E' },
  { name: 'Sri Lanka', flag: '🇱🇰', code: 'LK', coords: '7.87° N, 80.77° E' },
  { name: 'Bangladesh', flag: '🇧🇩', code: 'BD', coords: '23.68° N, 90.35° E' },
  { name: 'Bhutan', flag: '🇧🇹', code: 'BT', coords: '27.51° N, 90.43° E' },
  { name: 'Thailand', flag: '🇹🇭', code: 'TH', coords: '15.87° N, 100.99° E' },
  { name: 'Netherlands', flag: '🇳🇱', code: 'NL', coords: '52.13° N, 5.29° E' },
  { name: 'Switzerland', flag: '🇨🇭', code: 'CH', coords: '46.81° N, 8.22° E' },
  { name: 'Italy', flag: '🇮🇹', code: 'IT', coords: '41.87° N, 12.56° E' },
  { name: 'Spain', flag: '🇪🇸', code: 'ES', coords: '40.46° N, 3.74° W' },
  { name: 'Sweden', flag: '🇸🇪', code: 'SE', coords: '60.12° N, 18.64° E' },
  { name: 'Norway', flag: '🇳🇴', code: 'NO', coords: '60.47° N, 8.46° E' },
  { name: 'Denmark', flag: '🇩🇰', code: 'DK', coords: '56.26° N, 9.50° E' },
  { name: 'Poland', flag: '🇵🇱', code: 'PL', coords: '51.91° N, 19.14° E' },
  { name: 'Ireland', flag: '🇮🇪', code: 'IE', coords: '53.14° N, 7.69° W' },
  { name: 'Saudi Arabia', flag: '🇸🇦', code: 'SA', coords: '23.88° N, 45.07° E' },
  { name: 'Qatar', flag: '🇶🇦', code: 'QA', coords: '25.35° N, 51.18° E' },
  { name: 'Kuwait', flag: '🇰🇼', code: 'KW', coords: '29.31° N, 47.48° E' },
  { name: 'Oman', flag: '🇴🇲', code: 'OM', coords: '21.51° N, 55.92° E' },
  { name: 'Israel', flag: '🇮🇱', code: 'IL', coords: '31.04° N, 34.85° E' },
  { name: 'Mexico', flag: '🇲🇽', code: 'MX', coords: '23.63° N, 102.55° W' },
  { name: 'Argentina', flag: '🇦🇷', code: 'AR', coords: '38.41° S, 63.61° W' },
  { name: 'Chile', flag: '🇨🇱', code: 'CL', coords: '35.67° S, 71.54° W' },
  { name: 'South Korea', flag: '🇰🇷', code: 'KR', coords: '35.90° N, 127.76° E' },
  { name: 'Vietnam', flag: '🇻🇳', code: 'VN', coords: '14.05° N, 108.27° E' },
  { name: 'Philippines', flag: '🇵🇭', code: 'PH', coords: '12.87° N, 121.77° E' },
  { name: 'Egypt', flag: '🇪🇬', code: 'EG', coords: '26.82° N, 30.80° E' },
  { name: 'Kenya', flag: '🇰🇪', code: 'KE', coords: '0.02° S, 37.90° E' },
  { name: 'Nigeria', flag: '🇳🇬', code: 'NG', coords: '9.08° N, 8.67° E' },
  { name: 'Turkey', flag: '🇹🇷', code: 'TR', coords: '38.96° N, 35.24° E' },
  { name: 'Greece', flag: '🇬🇷', code: 'GR', coords: '39.07° N, 21.82° E' },
  { name: 'Portugal', flag: '🇵🇹', code: 'PT', coords: '39.39° N, 8.22° W' },
  { name: 'Austria', flag: '🇦🇹', code: 'AT', coords: '47.51° N, 14.55° E' },
  { name: 'Belgium', flag: '🇧🇪', code: 'BE', coords: '50.50° N, 4.46° E' },
  { name: 'Finland', flag: '🇫🇮', code: 'FI', coords: '61.92° N, 25.74° E' },
  { name: 'Czech Republic', flag: '🇨🇿', code: 'CZ', coords: '49.81° N, 15.47° E' },
  { name: 'Hungary', flag: '🇭🇺', code: 'HU', coords: '47.16° N, 19.50° E' },
  { name: 'Romania', flag: '🇷🇴', code: 'RO', coords: '45.94° N, 24.96° E' },
  { name: 'Fiji', flag: '🇫🇯', code: 'FJ', coords: '17.71° S, 178.06° E' },
  { name: 'Trinidad and Tobago', flag: '🇹🇹', code: 'TT', coords: '10.69° N, 61.22° W' },
  { name: 'Guyana', flag: '🇬🇾', code: 'GY', coords: '4.86° N, 58.93° W' },
  { name: 'Suriname', flag: '🇸🇷', code: 'SR', coords: '3.91° N, 56.02° W' },
  { name: 'Global Sadhak', flag: '🌐', code: 'GL', coords: '0.00° N, 0.00° E' },
];

export const COUNTRIES = GLOBAL_COUNTRIES;

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

// EXACTLY 10 Habits Per Period (Spiritual & Health Discipline)
export const ROUTINE_TASKS = {
  morning: [
    { id: 'm_water', label: 'Ushapaan (1L Warm Copper Water)', icon: '💧', desc: 'Flushes metabolic toxins & awakens digestive agni' },
    { id: 'm_surya', label: 'Surya Namaskar & Yoga Asanas', icon: '🧘', desc: '12 cycles to direct vital prana upward to brain' },
    { id: 'm_pranayama', label: 'Pranayama (Kapalbhati & Anulom)', icon: '💨', desc: '15 mins breath control to still fluctuating mind' },
    { id: 'm_jap', label: '108 Sacred Naam Jap (Mala)', icon: '📿', desc: 'Purifies subconscious impressions (Samskaras)' },
    { id: 'm_bath', label: 'Shital Snan (Cold Water Shower)', icon: '🚿', desc: 'Cools root chakra & strengthens nervous vigor' },
    { id: 'm_dhyana', label: 'Trataka / Silent Meditation', icon: '🕉️', desc: '10 mins focus to dissolve lustful mental chatter' },
    { id: 'm_sunlight', label: 'Pranic Sunlight Absorption', icon: '🌅', desc: '15 mins early sun gazing for natural testosterone' },
    { id: 'm_gita', label: 'Morning Gita / Upanishad Shloka', icon: '📖', desc: 'Anchor day with timeless divine wisdom' },
    { id: 'm_affirmation', label: 'Brahmacharya Mahasankalpa', icon: '⚡', desc: 'Recite pledge: "My vitality is sacred & protected"' },
    { id: 'm_diet', label: 'Satvik Herbal Tea / Desi Cow Milk', icon: '🥛', desc: 'Nourishes Shukra Dhatu and supreme Ojas' },
  ],
  afternoon: [
    { id: 'a_satvik', label: 'Satvik Mitahara (Pure Veg Lunch)', icon: '🥗', desc: 'No heavy garlic, excess spice, or unholy foods' },
    { id: 'a_vajrasana', label: 'Post-Meal Vajrasana (10 Mins)', icon: '🧎', desc: 'Accelerates digestion & eliminates afternoon lethargy' },
    { id: 'a_walk', label: 'Mindful Sunlight Walk', icon: '🚶', desc: '15 mins walking meditation in open fresh air' },
    { id: 'a_hydration', label: 'Hydration & Coconut/Lemon Water', icon: '🥥', desc: 'Maintains internal alkaline electrolyte balance' },
    { id: 'a_swadhyaya', label: 'Swadhyaya (Spiritual Study)', icon: '📚', desc: 'Read teachings of Swami Vivekananda & Saints' },
    { id: 'a_screenpause', label: 'Digital Eye Rest & Palming', icon: '👁️', desc: 'Protect dopamine from endless digital overstimulation' },
    { id: 'a_mindfulness', label: 'Indriya Nigraha (Sense Discipline)', icon: '🛡️', desc: 'Guarding eyes and thoughts from tempting visuals' },
    { id: 'a_sewa', label: 'Nishkama Karma / Kindness Action', icon: '🤝', desc: 'Serve someone without expectation of reward' },
    { id: 'a_shavasana', label: '10-Min Yoga Nidra Power Reset', icon: '🧘‍♂️', desc: 'Deep biological rejuvenation without falling asleep' },
    { id: 'a_posture', label: 'Spine Alignment & Mula Bandha', icon: '🌲', desc: 'Subtle pelvic floor lock to transmute seminal fluids' },
  ],
  night: [
    { id: 'n_digitalfast', label: 'Digital Fast (No Phone After 9 PM)', icon: '📵', desc: 'Complete barrier against late-night relapse traps' },
    { id: 'n_lightmeal', label: 'Laghu Satvik Dinner before Sunset', icon: '🍲', desc: 'Light, early meal prevents night emissions (Swapnadash)' },
    { id: 'n_eveningjap', label: 'Evening Meditation & Naam Jap', icon: '📿', desc: 'Purify accumulated daily mental debris' },
    { id: 'n_coldfeet', label: 'Wash Feet with Cold Water', icon: '🦶', desc: 'Ancient yogic method to cool head and induce deep sleep' },
    { id: 'n_introspection', label: 'Atma-Vichar & Daily Diary', icon: '✍️', desc: 'Record victories, urges overcome & lessons learned' },
    { id: 'n_reading', label: 'Saint Biographies / Scriptures', icon: '📜', desc: 'Fill conscious mind with purity before slumber' },
    { id: 'n_gratitude', label: '5 Gratitudes to Ishwara', icon: '🙏', desc: 'Surrender all ego, anxiety, and desire to the Divine' },
    { id: 'n_cleanspace', label: 'Purify Sleep Sanctuary', icon: '🪔', desc: 'Clean bed, incense/camphor, and ventilated bedroom' },
    { id: 'n_brahmamuhurta', label: 'Sleep by 10 PM for Brahma Muhurta', icon: '🌙', desc: 'Ensure waking at 4:00 AM full of magnetic vigor' },
    { id: 'n_breathrelax', label: '4-7-8 Deep Cleansing Breath', icon: '💤', desc: 'Soothes heart rate into blissful restful recovery' },
  ],
};

// Global task lookup map for DailyDashboard
export const ALL_TASK_MAP: Record<string, { label: string; icon: string; desc: string }> = {};
Object.values(ROUTINE_TASKS).forEach((list) => {
  list.forEach((t) => {
    ALL_TASK_MAP[t.id] = { label: t.label, icon: t.icon, desc: t.desc };
  });
});

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
  const [selectedCountryObj, setSelectedCountryObj] = useState(GLOBAL_COUNTRIES[0]);
  const [countryModalOpen, setCountryModalOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');

  // Target Goal State
  const [targetDays, setTargetDays] = useState(90);
  const [customDays, setCustomDays] = useState(90);

  // Routines State (Default: exactly 3 pre-selected per category to ensure instant valid start)
  const [selectedRoutines, setSelectedRoutines] = useState<{
    morning: string[];
    afternoon: string[];
    night: string[];
  }>({
    morning: ['m_water', 'm_surya', 'm_jap'],
    afternoon: ['a_satvik', 'a_walk', 'a_swadhyaya'],
    night: ['n_digitalfast', 'n_coldfeet', 'n_brahmamuhurta'],
  });

  const [activeRoutineTab, setActiveRoutineTab] = useState<'morning' | 'afternoon' | 'night'>('morning');

  useEffect(() => {
    try {
      const completed = localStorage.getItem('bm_onboarding_completed');
      const savedProfile = localStorage.getItem('bm_user_profile');

      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        if (parsed.name) setName(parsed.name);
        if (parsed.country) {
          const found = GLOBAL_COUNTRIES.find(
            (c) => c.name.toLowerCase() === parsed.country.toLowerCase() || c.code === parsed.countryCode
          );
          if (found) setSelectedCountryObj(found);
        }
        if (parsed.state) setStateName(parsed.state);
        if (parsed.city) setCityName(parsed.city);
        if (parsed.targetDays) {
          setTargetDays(parsed.targetDays);
          setCustomDays(parsed.targetDays);
        }
        if (parsed.routines) {
          setSelectedRoutines(parsed.routines);
        }
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

  // Filtered countries for searchable modal
  const filteredCountries = useMemo(() => {
    if (!countrySearch.trim()) return GLOBAL_COUNTRIES;
    const q = countrySearch.toLowerCase().trim();
    return GLOBAL_COUNTRIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [countrySearch]);

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

  // Rule enforcement: Users MUST select at least 3 tasks per category
  const morningCount = selectedRoutines.morning.length;
  const afternoonCount = selectedRoutines.afternoon.length;
  const nightCount = selectedRoutines.night.length;

  const morningValid = morningCount >= 3;
  const afternoonValid = afternoonCount >= 3;
  const nightValid = nightCount >= 3;
  const allRoutinesValid = morningValid && afternoonValid && nightValid;

  const currentTabCount = selectedRoutines[activeRoutineTab].length;

  // Validation per step
  const canContinue = useMemo(() => {
    if (step === 1) return name.trim().length > 0;
    if (step === 2) return targetDays >= 7;
    if (step === 3) return allRoutinesValid;
    return true;
  }, [step, name, targetDays, allRoutinesValid]);

  const handleSaveAndComplete = () => {
    const profile: UserProfile = {
      name: name.trim() || 'Sadhak Veer',
      country: selectedCountryObj.name,
      countryFlag: selectedCountryObj.flag,
      countryCode: selectedCountryObj.code,
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

      // Append / update current user in dynamic LocalStorage sadhaks registry
      const existingRaw = localStorage.getItem('bm_registered_sadhaks');
      let registeredList: any[] = existingRaw ? JSON.parse(existingRaw) : [];

      const currentStreak = parseInt(localStorage.getItem('bm_active_streak') || '14', 10);
      const currentJapa = parseInt(localStorage.getItem('bm_japa_counter') || '108', 10);

      const existingIndex = registeredList.findIndex(
        (s: any) => s.name?.toLowerCase().trim() === profile.name.toLowerCase().trim()
      );

      const sadhakEntry = {
        name: profile.name,
        country: profile.country,
        countryFlag: profile.countryFlag,
        countryCode: profile.countryCode,
        city: profile.city || profile.state || 'Dharma Kshetra',
        state: profile.state,
        streakDays: currentStreak,
        japaCount: currentJapa,
        targetDays: profile.targetDays,
        completedAt: profile.completedAt,
      };

      if (existingIndex >= 0) {
        registeredList[existingIndex] = { ...registeredList[existingIndex], ...sadhakEntry };
      } else {
        registeredList.push(sadhakEntry);
      }

      localStorage.setItem('bm_registered_sadhaks', JSON.stringify(registeredList));

      window.dispatchEvent(new CustomEvent('onboarding-completed', { detail: profile }));
      window.dispatchEvent(new CustomEvent('bm_profile_updated', { detail: profile }));
      window.dispatchEvent(new CustomEvent('bm_sadhaks_updated'));
    } catch (e) {
      console.warn('LocalStorage error in OnboardingWizard:', e);
    }

    if (onComplete) onComplete(profile);
    handleClose();
  };

  const totalSelectedTasks = morningCount + afternoonCount + nightCount;

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
                <p className="text-xs text-zinc-400">Personalize your Brahmacharya journey & dynamic leaderboard rank</p>
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
            {/* ── STEP 1: USER PROFILE & SEARCHABLE GLOBAL COUNTRY PICKER ── */}
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
                    Your name and location appear dynamically on the Global Sadhak Brotherhood Leaderboard.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        <span>Your Name / Sadhak Alias (साधक नाम) *</span>
                      </span>
                      {!name.trim() && (
                        <span className="text-[10px] text-amber-400 font-normal">Required to continue</span>
                      )}
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Banty, Aryan, Rohit, Shiva..."
                      className="w-full px-4 py-3 rounded-2xl bg-zinc-900/90 border border-amber-500/30 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-white placeholder-zinc-500 text-sm transition"
                    />
                  </div>

                  {/* Searchable Global Country Picker with Mini Map Badge Visual */}
                  <div>
                    <label className="block text-xs font-semibold text-amber-300 mb-1.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" />
                        <span>Global Country / Desh (देश) *</span>
                      </span>
                      <span className="text-[10px] text-zinc-400">Searchable across all nations</span>
                    </label>

                    {/* Interactive Country Selector Box */}
                    <button
                      type="button"
                      onClick={() => {
                        setCountrySearch('');
                        setCountryModalOpen(true);
                      }}
                      className="w-full p-3.5 rounded-2xl bg-zinc-900/90 border border-amber-500/30 hover:border-amber-400 text-left transition flex items-center justify-between cursor-pointer group shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{selectedCountryObj.flag}</span>
                        <div>
                          <div className="text-sm font-bold text-white group-hover:text-amber-300 flex items-center gap-2">
                            <span>{selectedCountryObj.name}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-amber-300 font-mono border border-zinc-700">
                              {selectedCountryObj.code}
                            </span>
                          </div>
                          {/* Mini Map Visual Coordinates Badge */}
                          <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 mt-0.5">
                            <MapPin className="w-3 h-3 text-amber-400" />
                            <span className="font-mono text-zinc-400">{selectedCountryObj.coords}</span>
                            <span className="text-amber-500/70">• Earth Sadhak Coordinate</span>
                          </div>
                        </div>
                      </div>

                      <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold group-hover:bg-amber-500/20 transition flex items-center gap-1">
                        <Search className="w-3 h-3" />
                        <span>Search</span>
                      </div>
                    </button>
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
                        placeholder="e.g. Bhubaneswar, Varanasi, Austin..."
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

            {/* ── STEP 3: DAILY ROUTINE BUILDER (10 HABITS PER PERIOD & MIN 3 RULE) ── */}
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
                    <span>STEP 3: 10 DAILY DINACHARYA RULES</span>
                  </div>
                  <h4 className="text-2xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200">
                    Build Your Daily Disciplines
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    Choose 10 spiritual & health habits per period. <span className="text-amber-300 font-bold">Min 3 tasks required in every period</span> to proceed.
                  </p>
                </div>

                {/* Period Badges (Morning / Afternoon / Night) with Dynamic Status */}
                <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-zinc-900 border border-white/10">
                  <button
                    type="button"
                    onClick={() => setActiveRoutineTab('morning')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                      activeRoutineTab === 'morning'
                        ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/30'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>🌅 Morning</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${morningValid ? 'bg-emerald-500/30 text-emerald-200' : 'bg-red-500/30 text-red-200'}`}>
                      {morningCount}/10 {morningValid ? '✓' : ''}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveRoutineTab('afternoon')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                      activeRoutineTab === 'afternoon'
                        ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/30'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>☀️ Afternoon</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${afternoonValid ? 'bg-emerald-500/30 text-emerald-200' : 'bg-red-500/30 text-red-200'}`}>
                      {afternoonCount}/10 {afternoonValid ? '✓' : ''}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveRoutineTab('night')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                      activeRoutineTab === 'night'
                        ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/30'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>🌙 Night</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${nightValid ? 'bg-emerald-500/30 text-emerald-200' : 'bg-red-500/30 text-red-200'}`}>
                      {nightCount}/10 {nightValid ? '✓' : ''}
                    </span>
                  </button>
                </div>

                {/* Dynamic Counter Banner: "X/10 selected (min 3 required)" */}
                <div className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                  currentTabCount >= 3
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                }`}>
                  <div className="flex items-center gap-2">
                    {currentTabCount >= 3 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                    )}
                    <span className="text-xs font-bold tracking-wide">
                      {activeRoutineTab.toUpperCase()} ROUTINE: {currentTabCount}/10 selected (min 3 required)
                    </span>
                  </div>

                  <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                    currentTabCount >= 3 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    {currentTabCount >= 3 ? '✓ Requirement Met' : `Needs ${3 - currentTabCount} more`}
                  </span>
                </div>

                {/* 10 Task Items List for Active Tab */}
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
                          <div className="text-[10px] text-zinc-400 mt-0.5 leading-snug">{task.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Overall Dinacharya Status Summary */}
                <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                  <span>Total {totalSelectedTasks} of 30 daily disciplines activated</span>
                  {!allRoutinesValid && (
                    <span className="text-amber-400 font-bold text-[11px]">
                      Ensure at least 3 tasks in each period to continue.
                    </span>
                  )}
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
                    Sadhak <span className="text-amber-300 font-bold">{name || 'Veer'}</span>, you are now dynamically active in the Global Brotherhood.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-amber-500/30 text-left space-y-3 shadow-xl">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{selectedCountryObj.flag}</span>
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-1.5">
                          <span>{name || 'Sadhak Veer'}</span>
                          <span className="text-[10px] px-1.5 py-0.2 bg-zinc-800 text-amber-300 rounded font-mono">
                            {selectedCountryObj.code}
                          </span>
                        </div>
                        <div className="text-[11px] text-zinc-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>{cityName ? `${cityName}, ` : ''}{stateName || selectedCountryObj.name}</span>
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
                      <div className="text-[10px] text-zinc-500">Morning (10)</div>
                      <div className="font-bold text-amber-300">{selectedRoutines.morning.length} Selected</div>
                    </div>
                    <div className="p-2 rounded-xl bg-zinc-950/70 border border-white/10">
                      <div className="text-[10px] text-zinc-500">Afternoon (10)</div>
                      <div className="font-bold text-amber-300">{selectedRoutines.afternoon.length} Selected</div>
                    </div>
                    <div className="p-2 rounded-xl bg-zinc-950/70 border border-white/10">
                      <div className="text-[10px] text-zinc-500">Night (10)</div>
                      <div className="font-bold text-amber-300">{selectedRoutines.night.length} Selected</div>
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
                disabled={!canContinue}
                onClick={() => {
                  if (canContinue) setStep((s) => s + 1);
                }}
                className={`px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm tracking-wide transition-all flex items-center gap-1.5 ml-auto ${
                  canContinue
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-yellow-300 text-zinc-950 shadow-lg shadow-amber-500/25 cursor-pointer active:scale-95'
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50'
                }`}
              >
                <span>
                  {step === 3 && !allRoutinesValid ? 'Select Min 3 Tasks per Period' : 'Continue'}
                </span>
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

        {/* Searchable Global Country Picker Modal */}
        <AnimatePresence>
          {countryModalOpen && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setCountryModalOpen(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
              />

              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                className="relative w-full max-w-lg bg-zinc-950 border border-amber-500/30 rounded-3xl p-5 shadow-2xl z-10 flex flex-col max-h-[80vh]"
              >
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-amber-400" />
                    <h4 className="text-base font-bold text-white">Select Global Country</h4>
                  </div>
                  <button
                    onClick={() => setCountryModalOpen(false)}
                    className="p-1 rounded-lg text-zinc-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Country Search Input */}
                <div className="relative my-3">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    placeholder="Search by country name or code (e.g. India, US, Nepal, IN)..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 focus:outline-none text-white text-xs"
                    autoFocus
                  />
                </div>

                {/* Scrollable Countries List */}
                <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {filteredCountries.map((c) => {
                    const isSelected = selectedCountryObj.code === c.code;
                    return (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setSelectedCountryObj(c);
                          setCountryModalOpen(false);
                        }}
                        className={`w-full p-2.5 rounded-xl flex items-center justify-between transition cursor-pointer text-left ${
                          isSelected
                            ? 'bg-amber-500/20 border border-amber-400 text-amber-200'
                            : 'hover:bg-zinc-900 text-zinc-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{c.flag}</span>
                          <div>
                            <span className="text-xs font-bold text-white">{c.name}</span>
                            <span className="text-[10px] text-zinc-500 block font-mono">{c.coords}</span>
                          </div>
                        </div>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-amber-300 font-bold border border-zinc-700">
                          {c.code}
                        </span>
                      </button>
                    );
                  })}
                  {filteredCountries.length === 0 && (
                    <div className="text-center py-6 text-zinc-500 text-xs">
                      No country found matching "{countrySearch}"
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}
