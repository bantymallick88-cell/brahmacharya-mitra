import React, { useState, useEffect } from 'react';
import { 
  X, 
  Wind, 
  CheckCircle2, 
  Droplets, 
  Dumbbell, 
  Footprints, 
  Flame, 
  ShieldAlert, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useTranslation } from '../i18n';

export default function PanicModal() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'Inhale' | 'Hold (Full)' | 'Exhale' | 'Hold (Empty)'>('Inhale');
  const [breathCount, setBreathCount] = useState(4);
  const [isBreathingActive, setIsBreathingActive] = useState(true);
  const [pushupCount, setPushupCount] = useState(0);
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-panic-modal', handleOpen);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-panic-modal', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isOpen || !isBreathingActive) return;

    const interval = setInterval(() => {
      setBreathCount((prev) => {
        if (prev > 1) return prev - 1;

        setBreathingPhase((phase) => {
          if (phase === 'Inhale') return 'Hold (Full)';
          if (phase === 'Hold (Full)') return 'Exhale';
          if (phase === 'Exhale') return 'Hold (Empty)';
          return 'Inhale';
        });
        return 4;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, isBreathingActive]);

  const toggleStep = (id: number) => {
    setCheckedSteps(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/92 backdrop-blur-3xl overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl backdrop-blur-3xl bg-gradient-to-b from-[#120508] via-[#06040a] to-[#02040a] border-2 border-red-500/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(239,68,68,0.35),0_0_40px_rgba(109,40,217,0.25)] text-zinc-100 my-8">
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-950/80 border border-zinc-800 hover:border-amber-400 text-zinc-400 hover:text-white transition-all cursor-pointer shadow-md"
          aria-label="Close Panic Shield"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Emergency Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-500/60 text-red-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3 shadow-[0_0_20px_rgba(239,68,68,0.35)] animate-pulse">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            {t.panic.badge}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight drop-shadow-md">
            {t.panic.stopTitle}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-300 to-yellow-500 metallic-gold-text">
              {t.panic.stepBackTitle}
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-zinc-300 max-w-2xl font-medium leading-relaxed bg-red-950/30 p-3.5 rounded-2xl border border-red-900/40">
            {t.panic.quote}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
          
          {/* Box Breathing Pranayama Card with Dynamic Breathing Ring Animation */}
          <div className="backdrop-blur-2xl bg-zinc-950/70 border border-amber-500/20 hover:border-amber-400/50 rounded-3xl p-5 sm:p-6 flex flex-col items-center text-center relative overflow-hidden shadow-xl transition-all">
            
            {/* Ambient Cosmic Glow behind timer */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[radial-gradient(circle,rgba(245,158,11,0.15)_0%,rgba(109,40,217,0.12)_50%,transparent_70%)] blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between w-full mb-3 z-10">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 tracking-wider uppercase">
                <Wind className="w-4 h-4 text-amber-400" /> {t.panic.pranayamaTitle}
              </span>
              <button 
                onClick={() => setIsBreathingActive(!isBreathingActive)}
                className="text-xs text-zinc-400 hover:text-amber-300 underline cursor-pointer transition"
              >
                {isBreathingActive ? t.panic.pauseBtn : t.panic.resumeBtn}
              </button>
            </div>

            {/* Dynamic Breathing Timer Ring Animation */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center my-4">
              
              {/* Outer rhythmic breathing timer glow ring */}
              <div 
                className={`absolute inset-0 rounded-full border-2 transition-all duration-1000 ${
                  breathingPhase === 'Inhale' 
                    ? 'scale-110 border-amber-400/80 bg-gradient-to-tr from-amber-500/20 to-yellow-500/10 shadow-[0_0_40px_rgba(245,158,11,0.35)]' 
                    : breathingPhase === 'Hold (Full)' 
                    ? 'scale-110 border-amber-300 bg-amber-400/20 shadow-[0_0_50px_rgba(251,191,36,0.45)]' 
                    : breathingPhase === 'Exhale' 
                    ? 'scale-90 border-violet-500/60 bg-violet-600/10 shadow-[0_0_30px_rgba(109,40,217,0.3)]' 
                    : 'scale-90 border-zinc-700 bg-zinc-950/50 shadow-inner'
                }`}
              />

              {/* Secondary delicate pulse ring */}
              <div className="absolute inset-3 rounded-full border border-dashed border-amber-500/30 animate-spin-slow pointer-events-none" style={{ animationDuration: '30s' }} />

              <div className="relative z-10 text-center flex flex-col items-center">
                <div className="text-4xl sm:text-5xl font-black font-cinzel text-white metallic-gold-text drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                  {breathCount}s
                </div>
                <div className="text-sm sm:text-base font-bold text-amber-200 tracking-wide mt-1">
                  {breathingPhase}
                </div>
                <p className="text-[11px] text-zinc-300 mt-1 max-w-[130px] font-medium leading-tight">
                  {breathingPhase === 'Inhale' && t.panic.breathBelly}
                  {breathingPhase === 'Hold (Full)' && t.panic.breathChin}
                  {breathingPhase === 'Exhale' && t.panic.breathTension}
                  {breathingPhase === 'Hold (Empty)' && t.panic.breathStillness}
                </p>
              </div>
            </div>

            <p className="text-xs text-amber-300/80 italic mt-2 z-10">
              {t.panic.kumbhakaDesc}
            </p>
          </div>

          {/* Rapid Physical Urge Disruptor Checklist */}
          <div className="backdrop-blur-2xl bg-zinc-950/70 border border-red-900/40 hover:border-red-500/50 rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-xl transition-all">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-red-400 tracking-wider uppercase">
                  <Flame className="w-4 h-4 text-red-400" /> {t.panic.shockProtocolTitle}
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    id: 1,
                    icon: Droplets,
                    title: t.panic.step1Title,
                    desc: t.panic.step1Desc,
                  },
                  {
                    id: 2,
                    icon: Dumbbell,
                    title: t.panic.step2Title,
                    desc: t.panic.step2Desc,
                  },
                  {
                    id: 3,
                    icon: Footprints,
                    title: t.panic.step3Title,
                    desc: t.panic.step3Desc,
                  },
                  {
                    id: 4,
                    icon: Sparkles,
                    title: t.panic.step4Title,
                    desc: t.panic.step4Desc,
                  },
                ].map((step) => {
                  const Icon = step.icon;
                  const isChecked = checkedSteps[step.id];
                  return (
                    <div 
                      key={step.id}
                      onClick={() => toggleStep(step.id)}
                      className={`flex items-start gap-3 p-3 rounded-2xl border cursor-pointer transition-all duration-300 glass-card-lift ${
                        isChecked 
                          ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                          : 'bg-zinc-950/80 border-zinc-800/80 hover:border-amber-500/40 text-zinc-300'
                      }`}
                    >
                      <div className="mt-0.5">
                        <CheckCircle2 className={`w-5 h-5 ${isChecked ? 'text-emerald-400' : 'text-zinc-600'}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                          <Icon className="w-3.5 h-3.5 text-amber-400" />
                          {step.title}
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-tight mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Push-up Counter Widget */}
            <div className="mt-4 pt-3.5 border-t border-zinc-800/80 flex items-center justify-between">
              <div className="text-left">
                <span className="text-xs text-zinc-400">{t.panic.pushupReps}</span>
                <div className="text-2xl font-black font-cinzel text-amber-400">{pushupCount} / 25</div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setPushupCount(c => Math.min(25, c + 5))}
                  className="px-3.5 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-500/50 text-xs font-bold text-white transition cursor-pointer hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                >
                  {t.panic.add5Btn}
                </button>
                <button 
                  onClick={() => setPushupCount(0)}
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs cursor-pointer border border-zinc-800"
                  title="Reset counter"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Victory & Dismiss Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800/80">
          <div className="text-xs text-zinc-300 text-center sm:text-left">
            {t.panic.waveReminder}
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="btn-shimmer btn-metallic-glow w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-black text-sm tracking-wide shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] transition-all transform hover:scale-[1.02] cursor-pointer"
          >
            {t.panic.victoriousBtn}
          </button>
        </div>

      </div>
    </div>
  );
}
