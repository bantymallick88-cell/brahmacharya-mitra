import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  X,
  Flame,
  Wind,
  CheckCircle2,
  Lock,
  Unlock,
  Sparkles,
  Droplets,
  Clock,
  Heart,
  Volume2,
  VolumeX,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';

export default function UrgeInterceptorModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes = 600 seconds
  const [isRunning, setIsRunning] = useState(false);
  const [reflection, setReflection] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathTimer, setBreathTimer] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [showOverrideConfirm, setShowOverrideConfirm] = useState(false);

  // Listen for global trigger event
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setTimeLeft(600);
      setIsRunning(true);
      setReflectionSaved(false);
      setShowOverrideConfirm(false);
    };
    const handleClose = () => {
      setIsOpen(false);
      setIsRunning(false);
    };

    window.addEventListener('open-interceptor-modal', handleOpen);
    window.addEventListener('close-interceptor-modal', handleClose);

    return () => {
      window.removeEventListener('open-interceptor-modal', handleOpen);
      window.removeEventListener('close-interceptor-modal', handleClose);
    };
  }, []);

  // 10-Minute Lockout Countdown Timer
  useEffect(() => {
    let interval: any = null;
    if (isOpen && isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, isRunning, timeLeft]);

  // 4-7-8 Breathwork Loop: Inhale 4s, Hold 7s, Exhale 8s
  useEffect(() => {
    if (!isOpen) return;

    let timer: any = null;

    if (breathPhase === 'inhale') {
      if (breathTimer > 0) {
        timer = setTimeout(() => setBreathTimer((t) => t - 1), 1000);
      } else {
        setBreathPhase('hold');
        setBreathTimer(7);
      }
    } else if (breathPhase === 'hold') {
      if (breathTimer > 0) {
        timer = setTimeout(() => setBreathTimer((t) => t - 1), 1000);
      } else {
        setBreathPhase('exhale');
        setBreathTimer(8);
      }
    } else if (breathPhase === 'exhale') {
      if (breathTimer > 0) {
        timer = setTimeout(() => setBreathTimer((t) => t - 1), 1000);
      } else {
        setCyclesCompleted((c) => c + 1);
        setBreathPhase('inhale');
        setBreathTimer(4);
      }
    }

    return () => clearTimeout(timer);
  }, [isOpen, breathPhase, breathTimer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSaveReflection = () => {
    if (reflection.trim().length >= 25) {
      try {
        const stored = JSON.parse(localStorage.getItem('interceptor_reflections') || '[]');
        stored.push({
          date: new Date().toISOString(),
          text: reflection.trim(),
        });
        localStorage.setItem('interceptor_reflections', JSON.stringify(stored));
      } catch {
        // fallback
      }
      setReflectionSaved(true);
    }
  };

  const isUnlockEligible = timeLeft === 0 && reflection.trim().length >= 25;
  const progressPercent = Math.min(100, Math.round(((600 - timeLeft) / 600) * 100));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[125] flex items-center justify-center p-3 sm:p-5 overflow-y-auto select-none">
        {/* Pitch-Black OLED Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#000000]/95 backdrop-blur-3xl"
        />

        {/* 3D Glass OLED Shield Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 25 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#050505] border border-amber-500/40 rounded-3xl p-5 sm:p-8 shadow-[0_0_80px_rgba(245,158,11,0.25),0_20px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl z-10 my-6 overflow-hidden text-center"
        >
          {/* Top Flaming Aura Glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[radial-gradient(circle,rgba(239,68,68,0.25)_0%,rgba(245,158,11,0.2)_40%,transparent_75%)] blur-3xl pointer-events-none" />

          {/* Header Title & Lock Status */}
          <div className="relative z-10 flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2.5 text-left">
              <div className="p-2.5 rounded-2xl bg-red-950/60 border border-red-500/60 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse">
                <ShieldAlert className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 tracking-wider">
                  Mandatory 10-Minute Lockout
                </span>
                <h2 className="text-xl sm:text-2xl font-black font-cinzel text-white mt-0.5">
                  Urge Interceptor & Anti-Relapse Shield
                </h2>
              </div>
            </div>

            {/* Emergency Close or Override */}
            <button
              onClick={() => {
                if (isUnlockEligible) {
                  setIsOpen(false);
                } else {
                  setShowOverrideConfirm(true);
                }
              }}
              className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer"
              title="Close or Override"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ── 1. The 10-Minute Countdown Clock & Progress ── */}
          <div className="relative z-10 mb-6 p-4 sm:p-5 rounded-3xl bg-zinc-950/90 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.15)] flex flex-col items-center">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-widest mb-1">
              <Clock className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span>Dopamine Spike Interception Window</span>
            </div>

            {/* Huge Digital Clock */}
            <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white drop-shadow-[0_0_30px_rgba(245,158,11,0.5)] my-2">
              <span className={timeLeft > 0 ? 'text-amber-300' : 'text-emerald-400'}>
                {formatTime(timeLeft)}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-zinc-800 my-2">
              <div
                className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-400 transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-[11px] text-zinc-400 max-w-md leading-relaxed mt-1">
              {timeLeft > 0
                ? `Neurochemical surge weakens in ${Math.ceil(timeLeft / 60)} min. Complete the 4-7-8 breathing cycles and write your pledge below.`
                : '10-minute interception complete! Your prefrontal cortex has regained supreme authority.'}
            </p>
          </div>

          {/* ── 2. Interactive 4-7-8 Visual Breathing Guide ── */}
          <div className="relative z-10 mb-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-zinc-950/80 to-[#050505] border border-zinc-800/80 flex flex-col items-center">
            <div className="flex items-center justify-between w-full mb-3 text-xs text-zinc-400 px-1">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-amber-400" />
                <span>Synchronized 4-7-8 Pranayama</span>
              </span>
              <span className="font-mono text-[11px] text-zinc-400">
                Cycles Completed: <strong className="text-amber-400">{cyclesCompleted}</strong>
              </span>
            </div>

            {/* Breathing Animated Sphere */}
            <div className="relative my-4 flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48">
              {/* Expanding Ripple Ring */}
              <motion.div
                animate={{
                  scale: breathPhase === 'inhale' ? 1.35 : breathPhase === 'hold' ? 1.35 : 0.95,
                  opacity: breathPhase === 'hold' ? 0.85 : 0.45,
                }}
                transition={{
                  duration: breathPhase === 'inhale' ? 4 : breathPhase === 'hold' ? 0.3 : 8,
                  ease: 'easeInOut',
                }}
                className={`absolute inset-0 rounded-full blur-xl pointer-events-none ${
                  breathPhase === 'inhale'
                    ? 'bg-amber-500/40'
                    : breathPhase === 'hold'
                    ? 'bg-purple-500/50'
                    : 'bg-emerald-500/30'
                }`}
              />

              {/* Main Sphere */}
              <motion.div
                animate={{
                  scale: breathPhase === 'inhale' ? 1.25 : breathPhase === 'hold' ? 1.25 : 0.9,
                }}
                transition={{
                  duration: breathPhase === 'inhale' ? 4 : breathPhase === 'hold' ? 0.3 : 8,
                  ease: 'easeInOut',
                }}
                className={`relative w-32 h-32 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center p-3 shadow-2xl border-2 transition-colors duration-500 ${
                  breathPhase === 'inhale'
                    ? 'bg-gradient-to-b from-amber-500/30 via-zinc-950 to-black border-amber-400 text-amber-200 shadow-[0_0_35px_rgba(245,158,11,0.5)]'
                    : breathPhase === 'hold'
                    ? 'bg-gradient-to-b from-purple-500/30 via-zinc-950 to-black border-purple-400 text-purple-200 shadow-[0_0_35px_rgba(168,85,247,0.5)]'
                    : 'bg-gradient-to-b from-emerald-500/30 via-zinc-950 to-black border-emerald-400 text-emerald-200 shadow-[0_0_35px_rgba(16,185,129,0.5)]'
                }`}
              >
                <span className="text-xs uppercase font-extrabold tracking-widest">
                  {breathPhase === 'inhale' ? 'Inhale Prana' : breathPhase === 'hold' ? 'Hold & Lock' : 'Exhale & Release'}
                </span>
                <span className="text-3xl font-black font-mono my-0.5">
                  {breathTimer}s
                </span>
                <span className="text-[9px] opacity-75 font-medium">
                  {breathPhase === 'inhale' ? 'Through Nose (4s)' : breathPhase === 'hold' ? 'Third Eye (7s)' : 'Through Mouth (8s)'}
                </span>
              </motion.div>
            </div>

            {/* Quick Grounding Tip */}
            <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-2 bg-zinc-900/60 px-3 py-1.5 rounded-full border border-zinc-800">
              <Droplets className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Cold Water Grounding: Splash icy water on your face & wrists now.</span>
            </div>
          </div>

          {/* ── 3. Mandatory Reflection Requirement ── */}
          <div className="relative z-10 text-left space-y-2 mb-6">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Mandatory Sadhak Reflection (Required to unlock):</span>
              </label>
              <span className={`text-[10px] font-mono font-bold ${reflection.trim().length >= 25 ? 'text-emerald-400' : 'text-amber-400/90'}`}>
                {reflection.trim().length} / 25 min chars
              </span>
            </div>

            <textarea
              rows={3}
              value={reflection}
              onChange={(e) => {
                setReflection(e.target.value);
                setReflectionSaved(false);
              }}
              placeholder="Why I want to master Brahmacharya and protect my energy today... (e.g., I refuse to trade my life's potential, clarity, and self-respect for 5 seconds of pixelated dopamine burnout. I choose Ojas.)"
              className="w-full p-3.5 rounded-2xl bg-zinc-950/90 border border-zinc-800 focus:border-amber-400 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition leading-relaxed shadow-inner"
            />

            <div className="flex items-center justify-between gap-2 pt-1">
              <p className="text-[11px] text-zinc-500 italic">
                “He who conquers his senses conquers the entire world.” — Bhagavad Gita
              </p>

              <button
                type="button"
                onClick={handleSaveReflection}
                disabled={reflection.trim().length < 25}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 disabled:opacity-30 text-amber-300 font-bold text-xs transition cursor-pointer shrink-0"
              >
                {reflectionSaved ? '✓ Saved' : 'Save Reflection'}
              </button>
            </div>
          </div>

          {/* ── Action Buttons & Unlock Status ── */}
          <div className="relative z-10 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              {isUnlockEligible ? (
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Shield Ready: You have triumphed over the urge wave!
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-amber-400/90 font-medium">
                  <Lock className="w-4 h-4 text-amber-400" />
                  Locked until 10 min timer expires and reflection is written.
                </span>
              )}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              disabled={!isUnlockEligible}
              className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                isUnlockEligible
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 shadow-emerald-500/30 active:scale-95'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-500 cursor-not-allowed opacity-50'
              }`}
            >
              {isUnlockEligible ? (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>Unlock Shield & Return to Sadhana</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Lock Active ({formatTime(timeLeft)})</span>
                </>
              )}
            </button>
          </div>

          {/* Emergency Override Confirmation Modal */}
          <AnimatePresence>
            {showOverrideConfirm && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-x-4 bottom-4 p-5 rounded-2xl bg-zinc-950/98 border border-red-500/80 shadow-[0_0_50px_rgba(239,68,68,0.6)] z-20 text-center"
              >
                <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-white font-cinzel">Break Lockout Protocol?</h4>
                <p className="text-xs text-zinc-400 mt-1 mb-4 leading-relaxed max-w-md mx-auto">
                  Relapses happen when you exit during the craving peak. Give yourself at least 3 more minutes of 4-7-8 breathwork before surrendering.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setShowOverrideConfirm(false)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition cursor-pointer"
                  >
                    Stay & Breathe (Recommended)
                  </button>
                  <button
                    onClick={() => {
                      setShowOverrideConfirm(false);
                      setIsOpen(false);
                    }}
                    className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-red-950 border border-zinc-800 hover:border-red-500/50 text-zinc-400 hover:text-red-300 font-semibold text-xs transition cursor-pointer"
                  >
                    Exit Anyway
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

