import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Award, 
  ShieldCheck, 
  Plus, 
  Minus, 
  RotateCcw, 
  Droplets, 
  Clock, 
  Calendar,
  Sparkles,
  Check
} from 'lucide-react';
import { useTranslation } from '../i18n';

interface StageInfo {
  name: string;
  hindiName: string;
  range: string;
  desc: string;
  chakra: string;
}

const STAGES: StageInfo[] = [
  {
    name: "Bhasma (Purification)",
    hindiName: "भस्म • शोधन काल",
    range: "Day 1 - 7",
    desc: "Acute withdrawal phase. Brain craves cheap dopamine. Intense urges peak on days 3-5.",
    chakra: "Muladhara (Root)"
  },
  {
    name: "Agni (Willpower Awakening)",
    hindiName: "अग्नि • संकल्प जागरण",
    range: "Day 8 - 21",
    desc: "Flatline hits; dopamine receptors begin repair. Testosterone re-stabilizes and mental fog starts clearing.",
    chakra: "Swadhisthana (Sacral)"
  },
  {
    name: "Tejas (Vital Radiance)",
    hindiName: "तेजस • ओजस्वी आभा",
    range: "Day 22 - 45",
    desc: "Eyes brighten, voice deepens, effortless eye contact returns. Social anxiety drastically declines.",
    chakra: "Manipura (Solar Plexus)"
  },
  {
    name: "Ojas (Transmutation Mastery)",
    hindiName: "ओजस • ऊर्जा रूपांतरण",
    range: "Day 46 - 90",
    desc: "Sexual energy ascends to higher centers. Unshakable focus, magnetic aura, and creative genius awaken.",
    chakra: "Anahata & Vishuddha"
  },
  {
    name: "Urdhva Retas (Master of Senses)",
    hindiName: "ऊर्ध्वरेता • इंद्रियजयी",
    range: "Day 90+",
    desc: "The vital fluid is permanently converted into spiritual electricity (Kundalini Tejas). Complete conqueror of Kamadeva.",
    chakra: "Ajna & Sahasrara"
  }
];

export default function StreakCounterWidget() {
  const { t } = useTranslation();
  const [days, setDays] = useState(7);
  const [pledgedToday, setPledgedToday] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [customDays, setCustomDays] = useState('7');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bm_streak_days');
      if (saved) {
        const val = parseInt(saved, 10);
        if (!isNaN(val)) {
          setDays(val);
          setCustomDays(String(val));
        }
      }

      const pledgeDate = localStorage.getItem('bm_pledge_date');
      const today = new Date().toDateString();
      if (pledgeDate === today) {
        setPledgedToday(true);
      }
    } catch (e) {}
  }, []);

  const updateStreak = (newDays: number) => {
    const val = Math.max(0, newDays);
    setDays(val);
    setCustomDays(String(val));
    try {
      localStorage.setItem('bm_streak_days', String(val));
      window.dispatchEvent(new CustomEvent('streak-updated', { detail: { days: val } }));
    } catch (e) {}
  };

  const handlePledge = () => {
    setPledgedToday(true);
    try {
      localStorage.setItem('bm_pledge_date', new Date().toDateString());
    } catch (e) {}
  };

  const getCurrentStage = (d: number): StageInfo => {
    if (d <= 7) return STAGES[0];
    if (d <= 21) return STAGES[1];
    if (d <= 45) return STAGES[2];
    if (d <= 90) return STAGES[3];
    return STAGES[4];
  };

  const currentStage = getCurrentStage(days);
  const veeryaDropsSaved = days * 40;
  const hoursReclaimed = days * 2.5;

  return (
    <section id="streak" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative backdrop-blur-3xl bg-zinc-950/70 rounded-3xl p-6 sm:p-10 border border-amber-500/25 hover:border-amber-400/70 hover:shadow-[0_0_35px_rgba(245,158,11,0.3)] transition-all duration-500 overflow-hidden shadow-2xl"
        >
          
          {/* Subtle Ambient Cosmic Violet & Electric Gold Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(109,40,217,0.22)_0%,rgba(99,102,241,0.18)_40%,rgba(245,158,11,0.14)_70%,transparent_100%)] blur-3xl rounded-full pointer-events-none -z-10 animate-aura-pulse" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Streak Display & Controls */}
            <div className="lg:col-span-5 flex flex-col items-center text-center p-4">
              
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {t.streak.badge}
              </div>

              {/* Day Streak Big Display */}
              <div className="relative my-2">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-amber-400/50 bg-gradient-to-b from-zinc-950 to-black flex flex-col items-center justify-center p-4 shadow-[0_0_50px_rgba(245,158,11,0.35),inset_0_0_25px_rgba(245,158,11,0.15)]">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                    {t.streak.akhandStreak}
                  </span>
                  <span className="text-6xl sm:text-7xl font-black font-cinzel text-white metallic-gold-text tracking-tight my-1 drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                    {days}
                  </span>
                  <span className="text-sm font-bold text-amber-300">
                    {t.streak.daysClean}
                  </span>
                </div>
              </div>

              {/* Adjuster Buttons */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => updateStreak(days - 1)}
                  className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white transition cursor-pointer"
                  title={t.streak.minus1Day}
                >
                  <Minus className="w-4 h-4" />
                </button>

                <button
                  onClick={() => updateStreak(days + 1)}
                  className="btn-shimmer btn-metallic-glow flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-extrabold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-105 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  {t.streak.plus1Day}
                </button>

                <button
                  onClick={() => setShowInput(!showInput)}
                  className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-amber-400 text-zinc-300 hover:text-amber-400 transition cursor-pointer"
                  title="Set exact day"
                >
                  <Calendar className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (confirm(t.streak.resetPrompt)) {
                      updateStreak(0);
                    }
                  }}
                  className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-red-500/60 text-zinc-400 hover:text-red-400 transition cursor-pointer"
                  title="Reset Streak"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Custom Day Input Box */}
              {showInput && (
                <div className="mt-3 flex items-center gap-2 p-2 rounded-2xl bg-zinc-950 border border-amber-500/30 animate-in fade-in shadow-xl">
                  <input
                    type="number"
                    min="0"
                    max="10000"
                    value={customDays}
                    onChange={(e) => setCustomDays(e.target.value)}
                    className="w-24 px-2.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 text-center text-white text-sm focus:outline-none focus:border-amber-400"
                    placeholder={t.streak.customDaysPlaceholder}
                  />
                  <button
                    onClick={() => {
                      const n = parseInt(customDays, 10);
                      if (!isNaN(n)) updateStreak(n);
                      setShowInput(false);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-400 text-black text-xs font-bold hover:bg-amber-300 transition"
                  >
                    {t.streak.save}
                  </button>
                </div>
              )}

              {/* Today's Daily Sankalpa Pledge */}
              <div className="mt-6 w-full max-w-sm">
                <button
                  onClick={handlePledge}
                  disabled={pledgedToday}
                  className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                    pledgedToday 
                      ? 'bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.25)] cursor-default'
                      : 'btn-shimmer bg-zinc-950/90 hover:bg-zinc-900 border border-amber-500/40 text-amber-300 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] cursor-pointer'
                  }`}
                >
                  {pledgedToday ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>{t.streak.pledgeTaken}</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <span>{t.streak.takePledge}</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Right Column: Stage Progression & Vitality Metrics */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Current Spiritual Stage Card */}
              <div className="p-5 sm:p-6 rounded-3xl backdrop-blur-2xl bg-zinc-950/80 border border-amber-500/30 hover:border-amber-400/60 hover:shadow-[0_0_35px_rgba(245,158,11,0.2)] transition-all duration-500 relative overflow-hidden shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    {t.streak.currentStageLabel}
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                    {t.streak.chakraLabel}: {currentStage.chakra}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-white">
                      {currentStage.name}
                    </h3>
                    <div className="text-xs font-sanskrit text-amber-300">
                      {currentStage.hindiName} ({currentStage.range})
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {currentStage.desc}
                </p>

                {/* Progress bar to Day 90 */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs text-zinc-300 mb-1.5 font-medium">
                    <span>{t.streak.progressTo90}</span>
                    <span className="text-amber-400 font-bold">{Math.min(100, Math.round((days / 90) * 100))}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-300 transition-all duration-700 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                      style={{ width: `${Math.min(100, Math.round((days / 90) * 100))}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Vitality Reclaimed Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                
                <div className="p-4 sm:p-5 rounded-2xl backdrop-blur-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-amber-400/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] transition-all duration-300 glass-card-lift">
                  <div className="flex items-center gap-2 text-xs font-medium text-amber-400 mb-1">
                    <Droplets className="w-4 h-4 text-amber-400" />
                    <span>{t.streak.veeryaDropsSaved}</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-cinzel text-white">
                    ~{veeryaDropsSaved.toLocaleString()}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {t.streak.veeryaDesc}
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl backdrop-blur-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-amber-400/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] transition-all duration-300 glass-card-lift">
                  <div className="flex items-center gap-2 text-xs font-medium text-amber-300 mb-1">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{t.streak.hoursReclaimed}</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-cinzel text-white">
                    {hoursReclaimed.toFixed(1)} hrs
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {t.streak.hoursDesc}
                  </p>
                </div>

              </div>

              {/* Sanatan Shloka Quote */}
              <div className="p-4 rounded-2xl bg-amber-950/25 border border-amber-500/30 text-center sm:text-left flex items-start gap-3 shadow-md">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-zinc-300">
                  <strong className="text-amber-300 font-sanskrit">{t.streak.shlokaHighlight}</strong> {t.streak.shlokaText}
                </div>
              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
