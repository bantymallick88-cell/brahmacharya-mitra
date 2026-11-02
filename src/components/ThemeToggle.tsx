import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ className }: { className?: string }) {
  const [isPitchBlack, setIsPitchBlack] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('bm_theme_mode');
      const isNight = saved === 'pitch-black' || document.documentElement.classList.contains('pitch-black');
      setIsPitchBlack(isNight);
      if (isNight) {
        document.documentElement.classList.add('pitch-black');
      } else {
        document.documentElement.classList.remove('pitch-black');
      }
    } catch {}

    const handleSync = (e: any) => {
      if (e?.detail?.isPitchBlack !== undefined) {
        setIsPitchBlack(e.detail.isPitchBlack);
      }
    };
    window.addEventListener('bm-theme-changed', handleSync);
    return () => window.removeEventListener('bm-theme-changed', handleSync);
  }, []);

  const handleToggle = () => {
    const next = !isPitchBlack;
    setIsPitchBlack(next);
    try {
      if (next) {
        document.documentElement.classList.add('pitch-black');
        localStorage.setItem('bm_theme_mode', 'pitch-black');
      } else {
        document.documentElement.classList.remove('pitch-black');
        localStorage.setItem('bm_theme_mode', 'warm-dark');
      }
    } catch {}

    window.dispatchEvent(
      new CustomEvent('bm-theme-changed', {
        detail: { isPitchBlack: next, theme: next ? 'pitch-black' : 'warm-dark' },
      })
    );
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`relative inline-flex items-center h-7 sm:h-7.5 w-[48px] xs:w-[50px] sm:w-[56px] shrink-0 p-0.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer select-none active:scale-95 touch-manipulation ${
        isPitchBlack
          ? 'bg-[#07070a] border border-amber-400/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9),0_1px_1px_rgba(255,255,255,0.06)]'
          : 'bg-zinc-950/90 border border-amber-500/35 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.08)]'
      } ${className || ''}`}
      aria-label="Toggle Night Mode: OLED Pitch Black vs Warm Dark"
      title={
        isPitchBlack
          ? 'Moon Active: OLED Pitch Black Night Mode (Click to switch to Warm Dark)'
          : 'Sun Active: Default Warm Dark Interface (Click to switch to OLED Pitch Black)'
      }
    >
      {/* Background track mini indicators */}
      <span className="absolute left-1.5 flex items-center justify-center pointer-events-none opacity-40">
        <Sun className="w-2.5 h-2.5 text-amber-500" />
      </span>
      <span className="absolute right-1.5 flex items-center justify-center pointer-events-none opacity-40">
        <Moon className="w-2.5 h-2.5 text-indigo-300" />
      </span>

      {/* 3D Tactile Sliding Knob */}
      <span
        className={`w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all duration-300 transform shadow-[0_2px_5px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.35)] relative z-10 ${
          isPitchBlack
            ? 'translate-x-[22px] xs:translate-x-[24px] sm:translate-x-[27px] bg-gradient-to-tr from-zinc-800 via-zinc-700 to-zinc-600 text-amber-300 border border-amber-400/60 shadow-[0_0_10px_rgba(251,191,36,0.35)]'
            : 'translate-x-0.5 bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-200 text-zinc-950 shadow-[0_0_10px_rgba(245,158,11,0.55)]'
        }`}
      >
        {isPitchBlack ? (
          <Moon className="w-3.5 h-3.5 stroke-[2.5] text-amber-300" />
        ) : (
          <Sun className="w-3.5 h-3.5 stroke-[2.5] text-zinc-950" />
        )}
      </span>
    </button>
  );
}

