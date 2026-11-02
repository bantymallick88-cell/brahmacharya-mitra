import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Flame,
  Compass,
  Trophy,
  BookOpen,
  Sparkles,
  ShieldAlert,
  Home
} from 'lucide-react';

export default function BottomNav() {
  const [currentPath, setCurrentPath] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL)
    ? (import.meta.env.BASE_URL.replace(/\/$/, '') + '/')
    : '/';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);

      const handleScroll = () => {
        const currentY = window.scrollY;
        // Keep visible or show on scroll
        setIsVisible(true);
        setLastScrollY(currentY);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [lastScrollY]);

  const triggerPanic = () => {
    window.dispatchEvent(new CustomEvent('open-panic-modal'));
  };

  const triggerWizard = () => {
    window.dispatchEvent(new CustomEvent('open-onboarding-wizard'));
  };

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      href: baseUrl,
      isActive: currentPath === baseUrl || currentPath === '/' || currentPath === '',
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Compass,
      href: `${baseUrl}dashboard/`,
      isActive: currentPath.includes('/dashboard'),
    },
    {
      id: 'leaderboard',
      label: 'Ranks',
      icon: Trophy,
      href: `${baseUrl}leaderboard/`,
      isActive: currentPath.includes('/leaderboard'),
    },
    {
      id: 'books',
      label: 'Sanctuary',
      badge: '29',
      icon: BookOpen,
      href: `${baseUrl}books/`,
      isActive: currentPath.includes('/books'),
    },
  ];

  return (
    <nav
      aria-label="Bottom Navigation Bar"
      className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[96vw] sm:max-w-fit select-none"
    >
      <div className="relative group">
        {/* Ambient Cosmic Gold Pulse Aura */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/20 via-yellow-500/30 to-amber-600/20 blur-md opacity-70 group-hover:opacity-100 transition duration-500 pointer-events-none animate-aura-pulse" />

        {/* 3D Glassmorphic Floating Nav Shell */}
        <div className="relative flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-2xl sm:rounded-3xl backdrop-blur-2xl bg-zinc-950/90 border border-amber-500/40 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(245,158,11,0.25)]">
          
          {/* Main Route Nav Links */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.isActive;

            return (
              <motion.a
                key={item.id}
                href={item.href}
                whileHover={{ y: -2, scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className={`relative flex flex-col items-center justify-center px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  active
                    ? 'text-amber-300 font-bold'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                }`}
                title={item.label}
              >
                {/* Active Glowing Indicator Pill */}
                {active && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute inset-0 rounded-xl bg-gradient-to-b from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.35)]"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}

                <div className="relative flex items-center justify-center">
                  <Icon className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${active ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'text-zinc-400'}`} />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2 px-1 py-0.1 text-[8px] font-black rounded-full bg-amber-500 text-zinc-950 shadow-sm leading-none">
                      {item.badge}
                    </span>
                  )}
                </div>

                <span className={`text-[9px] sm:text-[10px] tracking-wide mt-0.5 leading-none ${active ? 'text-amber-300 font-extrabold' : 'text-zinc-400'}`}>
                  {item.label}
                </span>
              </motion.a>
            );
          })}

          {/* Divider */}
          <div className="w-px h-6 bg-zinc-800/80 mx-0.5 sm:mx-1" />

          {/* Setup Wizard Quick Action */}
          <motion.button
            onClick={triggerWizard}
            whileHover={{ y: -2, scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-amber-300/90 hover:text-amber-200 hover:bg-zinc-900/60 transition cursor-pointer"
            title="Configure Setup & Goals"
          >
            <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400" />
            <span className="text-[9px] sm:text-[10px] tracking-wide mt-0.5 leading-none font-semibold">
              Setup
            </span>
          </motion.button>

          {/* Emergency Panic Beacon Action Button */}
          <motion.button
            onClick={triggerPanic}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            className="btn-shimmer flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-[10px] sm:text-xs shadow-[0_0_20px_rgba(239,68,68,0.5)] border border-red-400/80 cursor-pointer active:scale-95 ml-0.5 shrink-0"
            title="Emergency Panic Mode Shield (4-7-8 Breathwork & Urge Breaker)"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            <ShieldAlert className="w-3.5 h-3.5 text-white" />
            <span className="hidden xs:inline uppercase tracking-wider font-extrabold">Panic 🚨</span>
          </motion.button>

        </div>
      </div>
    </nav>
  );
}

