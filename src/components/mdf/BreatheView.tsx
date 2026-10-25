import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Wind, Play, Pause, RotateCcw, Volume2, VolumeX,
  Vibrate, Sparkles, CheckCircle2, Shield
} from 'lucide-react';

type Phase = 'inhale' | 'hold1' | 'exhale' | 'hold2';
type SoundMode = 'om' | 'bowl' | 'rain' | 'mute';

export default function BreatheView() {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);
  const [targetCycles, setTargetCycles] = useState(10);
  const [soundMode, setSoundMode] = useState<SoundMode>('om');
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscNodeRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Initialize or trigger audio on phase change
  const triggerSound = (currentSound: SoundMode) => {
    if (currentSound === 'mute') return;

    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();

      if (currentSound === 'om') {
        // Sacred 432 Hz Warm Harmonic Om Tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, ctx.currentTime);
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 4.0);
      } else if (currentSound === 'bowl') {
        // Tibetan Singing Bowl Chime (528 Hz Solfeggio / DNA Clarity)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(528, ctx.currentTime);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 2.5);
      }
    } catch (e) {
      // Audio not supported or autoplay blocked
    }
  };

  // Vibration trigger
  const triggerVibration = () => {
    if (!vibrationEnabled) return;
    try {
      if (typeof window !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(80);
      }
    } catch {}
  };

  // Main Timer Loop
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev > 1) {
          return prev - 1;
        }

        // Phase Transition
        let nextPhase: Phase = 'inhale';
        if (phase === 'inhale') nextPhase = 'hold1';
        else if (phase === 'hold1') nextPhase = 'exhale';
        else if (phase === 'exhale') nextPhase = 'hold2';
        else if (phase === 'hold2') {
          nextPhase = 'inhale';
          setCycleCount(c => c + 1);
        }

        setPhase(nextPhase);
        triggerSound(soundMode);
        triggerVibration();
        return 4;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, phase, soundMode, vibrationEnabled]);

  const handleStartStop = () => {
    if (!isRunning) {
      setIsRunning(true);
      triggerSound(soundMode);
      triggerVibration();
    } else {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase('inhale');
    setSecondsLeft(4);
    setCycleCount(0);
  };

  const phaseDetails = {
    inhale: {
      title: 'Inhale Prana',
      hindi: 'पूरक • श्वास भीतर',
      guidance: 'Draw in divine golden cosmic Prana from the base',
      scale: 1.35,
      color: 'from-amber-400 via-amber-500 to-yellow-300',
      ringColor: 'border-amber-400',
      glow: 'rgba(245, 158, 11, 0.55)',
    },
    hold1: {
      title: 'Retain & Lock',
      hindi: 'कुम्भक • श्वास रोको',
      guidance: 'Lock Mulabandha. Circulate energy up the spine to Ajna Chakra',
      scale: 1.35,
      color: 'from-amber-300 via-yellow-400 to-amber-600',
      ringColor: 'border-yellow-400',
      glow: 'rgba(251, 191, 36, 0.65)',
    },
    exhale: {
      title: 'Exhale Tension',
      hindi: 'रेचक • श्वास बाहर',
      guidance: 'Expel all lust, restlessness & cheap dopamine impulses',
      scale: 0.85,
      color: 'from-indigo-400 via-purple-500 to-violet-600',
      ringColor: 'border-indigo-400',
      glow: 'rgba(99, 102, 241, 0.45)',
    },
    hold2: {
      title: 'Sacred Stillness',
      hindi: 'शून्य कुम्भक • मौन',
      guidance: 'Experience zero-desire absolute awareness & mental tranquility',
      scale: 0.85,
      color: 'from-zinc-400 via-zinc-600 to-zinc-800',
      ringColor: 'border-zinc-500',
      glow: 'rgba(161, 161, 170, 0.3)',
    },
  };

  const current = phaseDetails[phase];

  return (
    <div className="flex flex-col h-full text-zinc-100 space-y-4 overflow-y-auto pr-1 pb-16 items-center text-center">
      {/* ── Header Badge ── */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
        <Wind className="w-3.5 h-3.5" />
        <span>Vedic Box Pranayama • Urge Transmutation</span>
      </div>

      {/* ── Cycle Progress ── */}
      <div className="text-xs text-zinc-400">
        Cycle <span className="font-bold text-amber-400">{cycleCount}</span> of {targetCycles} Completed
      </div>

      {/* ── Main Expanding / Contracting Breathing Circle ── */}
      <div className="relative my-4 flex items-center justify-center w-60 h-60">
        {/* Outer glowing aura ring */}
        <motion.div
          animate={{
            scale: current.scale,
            opacity: isRunning ? [0.6, 0.9, 0.6] : 0.4,
          }}
          transition={{ duration: 4, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-full blur-2xl pointer-events-none"
          style={{ background: current.glow }}
        />

        {/* Outer Animated Border */}
        <motion.div
          animate={{ scale: current.scale }}
          transition={{ duration: 4, ease: 'easeInOut' }}
          className={`w-48 h-48 rounded-full border-4 ${current.ringColor} flex items-center justify-center transition-colors duration-700 bg-gradient-to-b from-zinc-950/90 to-black/95 shadow-2xl p-4`}
        >
          {/* Inner Content */}
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-sanskrit text-amber-300/90 mb-1">{current.hindi}</span>
            <span className="text-lg font-black font-cinzel text-white tracking-wide">{current.title}</span>
            <span className="text-4xl font-black font-cinzel text-amber-400 my-1">{secondsLeft}s</span>
          </div>
        </motion.div>
      </div>

      {/* ── Guidance Text ── */}
      <p className="text-xs text-zinc-300 max-w-xs px-2 leading-relaxed min-h-[36px]">
        {current.guidance}
      </p>

      {/* ── Controls: Play / Pause / Reset ── */}
      <div className="flex items-center gap-3 pt-1">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleStartStop}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-black text-xs sm:text-sm tracking-wide shadow-lg transition-all cursor-pointer ${
            isRunning
              ? 'bg-zinc-800 text-amber-300 border border-amber-500/40 hover:bg-zinc-700'
              : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 shadow-[0_0_25px_rgba(245,158,11,0.4)]'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 fill-amber-300" />
              <span>Pause Breath</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-zinc-950" />
              <span>Start Pranayama</span>
            </>
          )}
        </motion.button>

        <button
          onClick={handleReset}
          className="p-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition cursor-pointer"
          title="Reset Session"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* ── Sound & Vibration Customization Bar ── */}
      <div className="w-full max-w-xs p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-2 mt-2">
        <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400">
          <span>Audio Mode</span>
          <div className="flex items-center gap-1">
            {[
              { id: 'om', label: '🕉️ Om' },
              { id: 'bowl', label: '🔔 Bowl' },
              { id: 'mute', label: '🔕 Mute' },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setSoundMode(m.id as SoundMode)}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition ${
                  soundMode === m.id
                    ? 'bg-amber-400 text-black shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400 pt-1 border-t border-zinc-900">
          <span className="flex items-center gap-1.5">
            <Vibrate className="w-3.5 h-3.5 text-amber-400" />
            <span>Haptic Vibration</span>
          </span>
          <button
            onClick={() => setVibrationEnabled(!vibrationEnabled)}
            className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
              vibrationEnabled ? 'bg-amber-500' : 'bg-zinc-800'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                vibrationEnabled ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
