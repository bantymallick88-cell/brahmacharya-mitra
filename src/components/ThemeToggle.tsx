import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ className }: { className?: string }) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('bm_theme');
      // Default is OFF / Sun active unless specifically saved as 'dark'
      const isDark = saved === 'dark' || (saved === null && document.documentElement.classList.contains('dark'));
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
        document.body?.classList?.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body?.classList?.remove('dark');
      }
    } catch {}

    const handleSync = (e: any) => {
      if (e?.detail?.isDarkMode !== undefined) {
        setIsDarkMode(e.detail.isDarkMode);
      }
    };
    window.addEventListener('bm-theme-changed', handleSync);
    return () => window.removeEventListener('bm-theme-changed', handleSync);
  }, []);

  const handleToggle = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    try {
      if (next) {
        document.documentElement.classList.add('dark');
        document.body?.classList?.add('dark');
        localStorage.setItem('bm_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body?.classList?.remove('dark');
        localStorage.setItem('bm_theme', 'light');
      }
    } catch {}

    window.dispatchEvent(
      new CustomEvent('bm-theme-changed', {
        detail: { isDarkMode: next, theme: next ? 'dark' : 'light' },
      })
    );
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`relative inline-flex items-center h-6 sm:h-7.5 w-[42px] sm:w-[56px] shrink-0 p-0.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer select-none active:scale-95 touch-manipulation ${
        isDarkMode
          ? 'bg-[#0a0a0c] border border-zinc-700/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.95),0_1px_1px_rgba(255,255,255,0.08)]'
          : 'bg-zinc-950/90 border border-amber-500/35 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.08)]'
      } ${className || ''}`}
      aria-label="Toggle Dark Mode: Pure Pitch Black vs Original Light Mode"
      title={
        isDarkMode
          ? 'Moon Active: Pure Pitch Black Dark Mode ON (Click to switch to Light Mode)'
          : 'Sun Active: Original Light Theme (Click to switch to Pure Pitch Black Dark Mode)'
      }
    >
      {/* Background track mini indicators */}
      <span className="absolute left-1 flex items-center justify-center pointer-events-none opacity-40">
        <Sun className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-amber-500" />
      </span>
      <span className="absolute right-1 flex items-center justify-center pointer-events-none opacity-40">
        <Moon className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-zinc-400" />
      </span>

      {/* 3D Tactile Sliding Knob */}
      <span
        className={`w-4.5 h-4.5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all duration-300 transform shadow-[0_2px_5px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.35)] relative z-10 ${
          isDarkMode
            ? 'translate-x-[18px] sm:translate-x-[27px] bg-gradient-to-tr from-zinc-800 via-zinc-700 to-zinc-600 text-white border border-zinc-500/50 shadow-[0_0_10px_rgba(255,255,255,0.25)]'
            : 'translate-x-0.5 bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-200 text-zinc-950 shadow-[0_0_10px_rgba(245,158,11,0.55)]'
        }`}
      >
        {isDarkMode ? (
          <Moon className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 stroke-[2.5] text-white" />
        ) : (
          <Sun className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 stroke-[2.5] text-zinc-950" />
        )}
      </span>
    </button>
  );
}
