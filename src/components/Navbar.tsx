import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, ShieldAlert, Heart, Menu, X, Sparkles,
  Calculator, Brain, Compass, ChevronRight, ArrowRight,
  UserCircle, BookOpen, BarChart3, Users, Wind,
  Image as ImageIcon, Settings, ChevronLeft, Zap
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../i18n';
import AuthModal from './AuthModal';

// MDF Feature Sub-Views
import JournalNotesView from './mdf/JournalNotesView';
import StatsView from './mdf/StatsView';
import CommunityView from './mdf/CommunityView';
import BreatheView from './mdf/BreatheView';
import GalleryView from './mdf/GalleryView';
import SettingsView from './mdf/SettingsView';

/* ─────────────────────────────────────────────────────────────
   Minimalist Black Shadow Silhouette of Lord Hanuman Ji (holding Gada)
───────────────────────────────────────────────────────────── */
function HanumanLogo({ size = 46 }: { size?: number }) {
  return (
    <div
      className="relative flex-shrink-0 rounded-full overflow-hidden shadow-[0_0_24px_rgba(245,158,11,0.55)] group cursor-pointer"
      style={{ width: size, height: size }}
    >
      <div
        className="absolute inset-0 rounded-full z-20 pointer-events-none animate-spin-slow"
        style={{
          background: 'conic-gradient(from 0deg, #f59e0b, #fef08a, #d97706, #fbbf24, #f59e0b)',
          padding: '2px',
          borderRadius: '50%',
        }}
      />
      <div className="absolute inset-[2px] rounded-full z-20 pointer-events-none border border-amber-300/40" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-amber-400 via-amber-600 to-yellow-900" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_45%_35%,rgba(255,255,255,0.95)_0%,rgba(251,191,36,0.85)_30%,rgba(217,119,6,0.9)_65%,rgba(120,53,15,1)_100%)]" />

      <svg
        viewBox="0 0 100 100"
        className="w-full h-full relative z-10 scale-[1.1] translate-y-[2px]"
        fill="#050508"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="28" y1="88" x2="68" y2="22" stroke="#050508" strokeWidth="5.5" strokeLinecap="round" />
        <line x1="68" y1="22" x2="73" y2="14" stroke="#050508" strokeWidth="4" strokeLinecap="round" />
        <circle cx="70" cy="18" r="11" fill="#050508" />
        <ellipse cx="70" cy="18" rx="13" ry="8" transform="rotate(-35 70 18)" fill="#050508" />
        <polygon points="76,9 79,4 73,8" fill="#050508" />
        <circle cx="28" cy="88" r="3.5" fill="#050508" />
        <path
          d="M 28 85 C 10 75, 4 45, 16 25 C 24 12, 42 10, 48 18 C 50 20, 48 24, 45 23 C 38 18, 25 19, 21 30 C 13 46, 17 68, 32 83 Z"
          fill="#050508"
        />
        <path d="M 44 26 L 47 16 L 51 21 L 55 12 L 58 22 L 62 18 L 60 28 Z" fill="#050508" />
        <path
          d="M 44 26 C 43 32, 44 38, 48 40 C 50 41, 52 42, 53 45 C 54 48, 52 50, 48 51 C 43 51, 40 47, 39 42 C 38 35, 40 28, 44 26 Z"
          fill="#050508"
        />
        <path d="M 48 37 C 54 36, 59 38, 60 42 C 61 45, 58 48, 53 48 C 50 48, 48 45, 48 40 Z" fill="#050508" />
        <circle cx="43" cy="38" r="2.5" fill="#050508" />
        <path d="M 43 40 C 44 45, 42 47, 41 48" stroke="#050508" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M 43 48 C 37 54, 30 62, 33 78 C 34 85, 38 95, 42 100 L 76 100 C 74 88, 70 78, 64 68 C 58 58, 54 52, 48 48 Z"
          fill="#050508"
        />
        <path
          d="M 46 54 C 52 56, 60 60, 64 68 C 66 72, 64 78, 59 81 C 54 83, 49 78, 47 72 C 45 66, 45 58, 46 54 Z"
          fill="#050508"
        />
        <path d="M 59 74 C 64 70, 67 66, 68 58 C 69 54, 66 52, 63 56 C 60 61, 56 68, 54 75 Z" fill="#050508" />
      </svg>
      <div className="absolute -inset-2 rounded-full bg-amber-500/35 blur-md z-0 pointer-events-none animate-pulse-slow" />
    </div>
  );
}

type DrawerScreen = 'menu' | 'journal' | 'stats' | 'community' | 'breathe' | 'gallery' | 'settings';

/* ─────────────────────────────────────────────────────────────
   Glassmorphic Hamburger Navigation Drawer
   Integrates Selected MDF Features:
   - 📔 Journal & Notes
   - 📊 Stats
   - 👥 Community
   - 🧘 Meditate / Breathe
   - 🖼️ Gallery & Wallpapers
   - ⚙️ Settings
   Excludes: AI Mentor, Battles & Clans, MDF Lessons, Kegels, Store/Coins
───────────────────────────────────────────────────────────── */
function ToolsDrawer({
  open, onClose, streakDays, t, triggerPanic, openAuth
}: {
  open: boolean;
  onClose: () => void;
  streakDays: number;
  t: any;
  triggerPanic: () => void;
  openAuth: () => void;
}) {
  const [currentScreen, setCurrentScreen] = useState<DrawerScreen>('menu');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setCurrentScreen('menu'); // Reset to main menu whenever opened
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // The 6 Selected MDF Features
  const mdfFeatures = [
    {
      id: 'journal',
      title: 'Journal & Notes',
      subtitle: 'Daily reflections, notes, sadhana todos & schedule',
      icon: BookOpen,
      badge: 'Interactive',
      color: 'from-amber-400 to-yellow-500',
    },
    {
      id: 'stats',
      title: 'Stats & Heatmap',
      subtitle: 'Streak analytics, calendar history & milestones',
      icon: BarChart3,
      badge: 'Analytics',
      color: 'from-emerald-400 to-teal-500',
    },
    {
      id: 'community',
      title: 'Sadhak Community',
      subtitle: 'Public sharing feed for sadhak brotherhood posts',
      icon: Users,
      badge: 'Live Feed',
      color: 'from-blue-400 to-indigo-500',
    },
    {
      id: 'breathe',
      title: 'Meditate & Breathe',
      subtitle: 'Guided Pranayama with Om sound modes & vibration',
      icon: Wind,
      badge: 'Transmute',
      color: 'from-purple-400 to-pink-500',
    },
    {
      id: 'gallery',
      title: 'Gallery & Wallpapers',
      subtitle: 'Motivational HD wallpapers with instant download',
      icon: ImageIcon,
      badge: 'HD Gallery',
      color: 'from-amber-300 to-orange-500',
    },
    {
      id: 'settings',
      title: 'Settings & Backup',
      subtitle: 'Daily reminders, alarms, panic FAB & data export',
      icon: Settings,
      badge: 'Preferences',
      color: 'from-zinc-400 to-zinc-600',
    },
  ];

  // Quick navigation to on-page sections
  const quickSections = [
    {
      title: 'Brain Fog Quiz',
      subtitle: 'Porn-induced mental fog diagnostic',
      href: '#brain-fog',
      icon: Brain,
    },
    {
      title: 'Relapse Cost Calculator',
      subtitle: 'Lost vitality, dopamine & life energy',
      href: '#calculator',
      icon: Calculator,
    },
    {
      title: '100-Day Reboot Roadmap',
      subtitle: 'Structured transmutation stages',
      href: '#courses',
      icon: Compass,
    },
    {
      title: 'Ultra-HD Wallpaper Gallery',
      subtitle: 'Dynamic active streak wallpapers',
      href: '#wallpapers',
      icon: ImageIcon,
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] bg-[#02040a]/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Drawer panel — fully fluid on mobile: w-full sm:max-w-md */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 bottom-0 z-[100] w-full sm:max-w-md flex flex-col overflow-x-hidden"
            style={{
              background: 'rgba(5, 5, 12, 0.98)',
              backdropFilter: 'blur(45px)',
              WebkitBackdropFilter: 'blur(45px)',
              borderLeft: '1px solid rgba(245,158,11,0.22)',
              boxShadow: '-20px 0 80px rgba(0,0,0,0.95), 0 0 50px rgba(109,40,217,0.2)',
            }}
          >
            {/* Top gold beam */}
            <div className="h-[2px] w-full bg-gradient-to-r from-amber-500/30 via-yellow-300 to-indigo-500/40 flex-shrink-0" />

            {/* Header: Dynamic (Menu Title or Back Button) */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 flex-shrink-0 border-b border-zinc-800/80 bg-zinc-950/40">
              {currentScreen === 'menu' ? (
                <div className="flex items-center gap-3">
                  <HanumanLogo size={36} />
                  <div className="flex flex-col leading-none">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-cinzel font-black text-sm tracking-wider text-white">
                        BRAHMACHARYA
                      </span>
                      <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600 bg-clip-text text-transparent font-serif italic drop-shadow-[0_0_12px_rgba(245,158,11,0.6)] text-base font-bold">
                        MITRA
                      </span>
                    </div>
                    <span className="text-[9px] font-sanskrit text-amber-400/80 mt-0.5 tracking-widest">
                      ब्रह्मचर्य मित्र • MDF Features
                    </span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setCurrentScreen('menu')}
                  className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-400 text-xs font-bold text-amber-300 transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to Menu</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-white hover:border-amber-500/50 transition cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ── Screen Container ── */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-5 py-4 w-full">

              {/* SCREEN 1: MAIN MENU */}
              {currentScreen === 'menu' && (
                <div className="space-y-4">

                  {/* Sign-In / Register Action Card */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { openAuth(); onClose(); }}
                    className="w-full relative group p-3.5 rounded-2xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-amber-500/35 hover:border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.2)] hover:shadow-[0_0_35px_rgba(245,158,11,0.4)] transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center flex-shrink-0">
                          <UserCircle className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-2">
                            <span>Sadhak Profile & Login</span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
                              Free
                            </span>
                          </div>
                          <div className="text-[11px] text-zinc-400 mt-0.5">
                            Google & Phone OTP Verification
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.button>

                  {/* Streak & Emergency Panic Quick Row */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setCurrentScreen('stats')}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-zinc-950/80 border border-amber-500/30 hover:border-amber-400 text-xs font-bold text-amber-300 transition shadow-[0_0_15px_rgba(245,158,11,0.15)] cursor-pointer"
                    >
                      <Flame className="w-4 h-4 text-amber-400 fill-amber-400/40 flex-shrink-0" />
                      <span className="truncate">🔥 {streakDays} Days Clean</span>
                    </button>

                    <button
                      onClick={() => { triggerPanic(); onClose(); }}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-red-950/50 border border-red-500/60 hover:border-red-400 text-xs font-bold text-red-200 transition shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:shadow-[0_0_30px_rgba(239,68,68,0.45)] cursor-pointer"
                    >
                      <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse flex-shrink-0" />
                      <span>{t.nav.panicMode}</span>
                    </button>
                  </div>

                  {/* Divider label */}
                  <div className="flex items-center gap-2.5 py-1">
                    <div className="flex-1 h-px bg-zinc-800/80" />
                    <span className="text-[10px] font-black text-amber-400/90 tracking-widest uppercase flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-amber-400" />
                      MDF Sravana & Sadhana Modules
                    </span>
                    <div className="flex-1 h-px bg-zinc-800/80" />
                  </div>

                  {/* ── 6 Selected MDF Features Grid ── */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {mdfFeatures.map(item => {
                      const Icon = item.icon;
                      return (
                        <motion.button
                          key={item.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setCurrentScreen(item.id as DrawerScreen)}
                          className="group flex flex-col justify-between p-3.5 rounded-2xl bg-zinc-950/70 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-amber-400/60 text-left transition-all duration-200 shadow-md hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] cursor-pointer"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-amber-500/50 group-hover:bg-amber-500/10 flex items-center justify-center transition-colors">
                              <Icon className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                            </div>
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 group-hover:text-amber-300 border border-zinc-800">
                              {item.badge}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-[10px] sm:text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                              {item.subtitle}
                            </p>
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Quick-Jump On-Page Sections */}
                  <div className="pt-2 space-y-2">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-1">
                      Quick On-Page Tools
                    </div>
                    {quickSections.map(sec => {
                      const Icon = sec.icon;
                      return (
                        <a
                          key={sec.title}
                          href={sec.href}
                          onClick={onClose}
                          className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/50 hover:bg-zinc-900 border border-zinc-850 border-zinc-800/60 hover:border-amber-500/40 transition group"
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-amber-400" />
                            <div>
                              <div className="text-xs font-bold text-zinc-200 group-hover:text-white">
                                {sec.title}
                              </div>
                              <div className="text-[10px] text-zinc-500">{sec.subtitle}</div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400" />
                        </a>
                      );
                    })}
                  </div>

                  {/* Support & Donation card */}
                  <motion.a
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    href="#donate"
                    onClick={onClose}
                    className="btn-shimmer flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-400/15 to-transparent border border-amber-500/30 hover:border-amber-400/60 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
                        <Heart className="w-4 h-4 fill-amber-400" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-amber-200">Support Brahmacharya Mitra</div>
                        <div className="text-[10px] text-zinc-400">100% free & ad-free Sanatan platform</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </motion.a>

                </div>
              )}

              {/* SCREEN 2: JOURNAL & NOTES */}
              {currentScreen === 'journal' && <JournalNotesView />}

              {/* SCREEN 3: STATS & HEATMAP */}
              {currentScreen === 'stats' && <StatsView />}

              {/* SCREEN 4: COMMUNITY SAKHAD FEED */}
              {currentScreen === 'community' && <CommunityView />}

              {/* SCREEN 5: MEDITATE & BREATHE */}
              {currentScreen === 'breathe' && <BreatheView />}

              {/* SCREEN 6: GALLERY & WALLPAPERS */}
              {currentScreen === 'gallery' && <GalleryView />}

              {/* SCREEN 7: SETTINGS & BACKUP */}
              {currentScreen === 'settings' && <SettingsView />}

            </div>

            {/* Bottom Shimmer & Footer */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/30 to-transparent flex-shrink-0" />
            <div className="px-4 py-3 flex-shrink-0 bg-zinc-950/90 text-center">
              <p className="text-[10px] text-zinc-500 font-sanskrit">
                ॐ ब्रह्मचर्येण तपसा देवा मृत्युमपाघ्नत • अखंड साधना
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main Navbar — Ultra-Clean Top Bar with Mobile Responsiveness
───────────────────────────────────────────────────────────── */
export default function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [streakDays, setStreakDays] = useState(7);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });

    try {
      const saved = localStorage.getItem('bm_streak_days');
      if (saved) setStreakDays(parseInt(saved, 10));
    } catch (e) {}

    const handleStreakChange = (e: any) => {
      if (e.detail?.days !== undefined) setStreakDays(e.detail.days);
    };
    window.addEventListener('streak-updated', handleStreakChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('streak-updated', handleStreakChange);
    };
  }, []);

  const triggerPanic = () => {
    window.dispatchEvent(new CustomEvent('open-panic-modal'));
  };

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 w-full ${
          isScrolled ? 'py-1.5 sm:py-2' : 'py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-3 sm:px-6 w-full">
          <div
            className={`flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 rounded-2xl transition-all duration-500 w-full ${
              isScrolled
                ? 'py-2 sm:py-2.5 bg-zinc-950/90 backdrop-blur-3xl border border-amber-500/20 shadow-[0_10px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(109,40,217,0.15)] nav-dock-glow'
                : 'py-2.5 sm:py-3 bg-zinc-950/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.7)]'
            }`}
          >

            {/* ── Left: Logo (Hanuman Ji) & Responsive Brand Title ── */}
            <a href="#" className="flex items-center gap-2 sm:gap-3.5 group flex-shrink min-w-0">
              <div className="relative pulse-gold-ring rounded-full group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                <HanumanLogo size={38} />
              </div>

              <div className="flex flex-col leading-none min-w-0">
                <div className="flex items-baseline gap-1 sm:gap-2 flex-wrap">
                  <span className="font-cinzel font-black text-xs xs:text-sm sm:text-base md:text-lg tracking-wider text-white drop-shadow-[0_1px_12px_rgba(255,255,255,0.4)] whitespace-nowrap">
                    BRAHMACHARYA
                  </span>
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600 bg-clip-text text-transparent font-serif italic drop-shadow-[0_0_12px_rgba(245,158,11,0.6)] text-sm xs:text-base sm:text-lg md:text-xl font-bold tracking-wide whitespace-nowrap">
                    MITRA
                  </span>
                </div>
                <span className="mt-0.5 sm:mt-1 text-[8px] sm:text-[9px] font-sanskrit tracking-[0.2em] text-amber-400/80 hidden xs:flex items-center gap-1.5 truncate">
                  ब्रह्मचर्य मित्र
                  <span className="inline-block w-px h-2 bg-amber-500/50" />
                  <span className="text-amber-300/75">दिव्य शक्ति</span>
                </span>
              </div>
            </a>

            {/* ── Right: Language Dropdown and 3-Line Hamburger Menu Icon ── */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <div className="scale-90 sm:scale-100 origin-right">
                <LanguageSelector />
              </div>

              {/* 3-line Hamburger Menu Icon */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="relative group p-2 sm:p-3 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800/90 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_30px_rgba(245,158,11,0.45)] transition-all cursor-pointer active:scale-95 flex items-center justify-center flex-shrink-0"
                aria-label="Open MDF Tools and Navigation Drawer"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 group-hover:scale-110 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Slide-Open Glassmorphic Drawer with MDF Modules ── */}
      <ToolsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        streakDays={streakDays}
        t={t}
        triggerPanic={triggerPanic}
        openAuth={() => setAuthOpen(true)}
      />

      {/* ── Auth Modal (Google & Phone + OTP) ── */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
