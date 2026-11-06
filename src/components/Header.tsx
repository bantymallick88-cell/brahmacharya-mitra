import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, ShieldAlert, Menu, X, Sparkles, Trophy,
  Calculator, Brain, Compass, ChevronRight, ArrowRight,
  UserCircle, BookOpen, BarChart3, Users, Wind,
  Image as ImageIcon, Settings, ChevronLeft, Zap, Clock,
  Share2, Check, Smartphone, HelpCircle, Lock, ShieldCheck
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../i18n';
import AuthModal from './AuthModal';
import TelegramIcon from './TelegramIcon';
import { useIsRegisteredUser } from '../utils/useRegisteredUser';
import ThemeToggle from './ThemeToggle';

// Feature Sub-Views
import JournalNotesView from './mdf/JournalNotesView';
import StatsView from './mdf/StatsView';
import CommunityFeed from './CommunityFeed';
import BreatheView from './mdf/BreatheView';
import GalleryView from './mdf/GalleryView';
import SettingsView from './mdf/SettingsView';

import { MAHADEV_IMAGE_DATA } from '../assets/mahadevBase64';

const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/';

/* ─────────────────────────────────────────────────────────────
   App Brand Logo — Mahadev Divine Photo
   Strict Circular CSS Fit with Centered Face Framing & Divine Glow
───────────────────────────────────────────────────────────── */
export function MahadevLogo({ className, size }: { size?: number; className?: string }) {
  return (
    <img
      src={baseUrl + "photo_mahadev.jpg"}
      alt="Brahmacharya Mitra"
      className={className || "w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-[#FF8C00] shadow-[0_0_15px_rgba(255,140,0,0.5)] shrink-0"}
      style={{ objectPosition: 'center 20%' }}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = MAHADEV_IMAGE_DATA;
      }}
    />
  );
}

export const HeaderLogo = MahadevLogo;

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
  open, onClose, streakDays, t, triggerPanic, openAuth, onShare
}: {
  open: boolean;
  onClose: () => void;
  streakDays: number;
  t: any;
  triggerPanic: () => void;
  openAuth: () => void;
  onShare: () => void;
}) {
  const [currentScreen, setCurrentScreen] = useState<DrawerScreen>('menu');
  const isRegistered = useIsRegisteredUser();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      setCurrentScreen('menu'); // Reset to main menu whenever opened
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // The 6 Selected Sadhana Features
  const sadhanaFeatures = [
    {
      id: 'journal',
      title: t('menu.streakCounter'),
      subtitle: t('menu.quickStreakSubtitle'),
      icon: Clock,
      badge: 'Interactive',
      color: 'from-amber-400 to-yellow-500',
    },
    {
      id: 'stats',
      title: t('menu.analyticsTitle'),
      subtitle: t('menu.analyticsSubtitle'),
      icon: BarChart3,
      badge: t('menu.analyticsBadge'),
      color: 'from-emerald-400 to-teal-500',
    },
    {
      id: 'community',
      title: t('menu.communityTitle'),
      subtitle: t('menu.communitySubtitle'),
      icon: Users,
      badge: t('menu.communityBadge'),
      color: 'from-blue-400 to-indigo-500',
    },
    {
      id: 'breathe',
      title: t('menu.breatheTitle'),
      subtitle: t('menu.breatheSubtitle'),
      icon: Wind,
      badge: t('menu.breatheBadge'),
      color: 'from-purple-400 to-pink-500',
    },
    {
      id: 'gallery',
      title: t('menu.galleryTitle'),
      subtitle: t('menu.gallerySubtitle'),
      icon: ImageIcon,
      badge: t('menu.galleryBadge'),
      color: 'from-amber-300 to-orange-500',
    },
    {
      id: 'settings',
      title: t('menu.settingsTitle'),
      subtitle: t('menu.settingsSubtitle'),
      icon: Settings,
      badge: t('menu.settingsBadge'),
      color: 'from-zinc-400 to-zinc-600',
    },
  ];

  // Direct Diagnostic & Emergency Tools (Opens Dedicated Modals)
  const diagnosticTools = [
    {
      title: t('menu.urgeInterceptorTitle'),
      subtitle: t('menu.urgeInterceptorSubtitle'),
      icon: ShieldAlert,
      badge: t('menu.urgeInterceptorBadge'),
      color: 'border-red-500/60 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.25)]',
      action: () => {
        window.dispatchEvent(new CustomEvent('open-interceptor-modal'));
        onClose();
      },
    },
    {
      title: t('menu.dnsBlockerTitle'),
      subtitle: t('menu.dnsBlockerSubtitle'),
      icon: ShieldCheck,
      badge: t('menu.dnsBlockerBadge'),
      color: 'border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]',
      action: () => {
        window.dispatchEvent(new CustomEvent('open-blocker-modal'));
        onClose();
      },
    },
    {
      title: t('menu.brainFogTitle'),
      subtitle: t('menu.brainFogSubtitle'),
      icon: Brain,
      badge: t('menu.brainFogBadge'),
      color: 'border-cyan-500/40 text-cyan-300',
      action: () => {
        window.dispatchEvent(new CustomEvent('open-brainfog-modal'));
        onClose();
      },
    },
    {
      title: t('menu.calculatorTitle'),
      subtitle: t('menu.calculatorSubtitle'),
      icon: Calculator,
      badge: t('menu.calculatorBadge'),
      color: 'border-amber-500/40 text-amber-300',
      action: () => {
        window.dispatchEvent(new CustomEvent('open-calculator-modal'));
        onClose();
      },
    },
    {
      title: t('menu.panicModeTitle'),
      subtitle: t('menu.panicModeSubtitle'),
      icon: ShieldAlert,
      badge: t('menu.panicModeBadge'),
      color: 'border-red-500/50 text-red-300',
      action: () => {
        triggerPanic();
        onClose();
      },
    },
  ];

  // Quick navigation to primary sections
  const quickSections = [
    {
      title: t('menu.quickStreakTitle'),
      subtitle: t('menu.quickStreakSubtitle'),
      href: '#streak',
      icon: Flame,
    },
    {
      title: t('menu.quickLibraryTitle'),
      subtitle: t('menu.quickLibrarySubtitle'),
      href: baseUrl + 'books/',
      icon: BookOpen,
    },
    {
      title: t('menu.quickFaqTitle'),
      subtitle: t('menu.quickFaqSubtitle'),
      href: '#faq',
      icon: HelpCircle,
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
                  <div className="relative shrink-0 flex items-center justify-center">
                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 blur-[3px] opacity-75" />
                    <img
                      src={baseUrl + "photo_mahadev.jpg"}
                      alt="Brahmacharya Mitra"
                      className="relative w-9 h-9 rounded-full object-cover border-2 border-[#FF8C00] shadow-[0_0_12px_rgba(255,140,0,0.5)] shrink-0"
                      style={{ objectPosition: 'center 20%' }}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = MAHADEV_IMAGE_DATA;
                      }}
                    />
                  </div>
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
                      ब्रह्मचर्य मित्र • {t('menu.sadhanaTools')}
                    </span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setCurrentScreen('menu')}
                  className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-400 text-xs font-bold text-amber-300 transition cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{t('menu.backToMenu')}</span>
                </button>
              )}

              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-400 hover:text-white hover:border-amber-500/50 transition cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
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
                            <span>{t('menu.sadhakProfileLogin')}</span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
                              {t('menu.freeBadge')}
                            </span>
                          </div>
                          <div className="text-[11px] text-zinc-400 mt-0.5">
                            {t('menu.otpVerification')}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.button>

                  {/* Share & Add to Home Screen Quick Row */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={onShare}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500/15 to-yellow-500/10 hover:from-amber-500/25 hover:to-yellow-500/20 border border-amber-500/40 hover:border-amber-400 text-xs font-bold text-amber-300 transition shadow-[0_0_15px_rgba(245,158,11,0.15)] cursor-pointer"
                    >
                      <Share2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>{t('menu.shareApp')}</span>
                    </button>

                    <button
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('open-install-prompt'));
                        onClose();
                      }}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-850 border border-amber-500/30 hover:border-amber-400 text-xs font-bold text-amber-200 transition shadow-[0_0_15px_rgba(245,158,11,0.15)] cursor-pointer"
                    >
                      <Smartphone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>📱 {t('menu.installPwa')}</span>
                    </button>
                  </div>

                  {/* Streak & Emergency Panic Quick Row */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setCurrentScreen('stats')}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-zinc-950/80 border border-amber-500/30 hover:border-amber-400 text-xs font-bold text-amber-300 transition shadow-[0_0_15px_rgba(245,158,11,0.15)] cursor-pointer"
                    >
                      <Flame className="w-4 h-4 text-amber-400 fill-amber-400/40 flex-shrink-0" />
                      <span className="truncate">🔥 {t('menu.daysCleanCount', { count: streakDays })}</span>
                    </button>

                    <button
                      onClick={() => { triggerPanic(); onClose(); }}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-red-950/50 border border-red-500/60 hover:border-red-400 text-xs font-bold text-red-200 transition shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:shadow-[0_0_30px_rgba(239,68,68,0.45)] cursor-pointer"
                    >
                      <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse flex-shrink-0" />
                      <span>{t('nav.panicMode')}</span>
                    </button>
                  </div>

                  {/* ── Featured Core Pages: Daily Dashboard, Global Leaderboard, Onboarding Wizard ── */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href={baseUrl + "dashboard/"}
                      onClick={onClose}
                      className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/15 via-zinc-900 to-zinc-950 border border-amber-500/40 hover:border-amber-400 text-left transition group shadow-md flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                          <Compass className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
                        </div>
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          DIAL
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-white group-hover:text-amber-300">
                          {t('nav.dashboard')}
                        </h4>
                        <p className="text-[10px] text-zinc-400 mt-0.5">{t('menu.speedometerDesc')}</p>
                      </div>
                    </a>

                    <a
                      href={baseUrl + "leaderboard/"}
                      onClick={onClose}
                      className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/15 via-zinc-900 to-zinc-950 border border-amber-500/40 hover:border-amber-400 text-left transition group shadow-md flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                          <Trophy className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          TOP 100
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-white group-hover:text-amber-300">
                          {t('nav.leaderboard')}
                        </h4>
                        <p className="text-[10px] text-zinc-400 mt-0.5">{t('menu.podiumDesc')}</p>
                      </div>
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('open-onboarding-wizard'));
                      onClose();
                    }}
                    className="w-full p-2.5 rounded-2xl bg-zinc-950/80 hover:bg-zinc-900 border border-amber-500/30 hover:border-amber-400 flex items-center justify-between transition cursor-pointer group text-left shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white group-hover:text-amber-300 block">
                          {t('menu.setupWizardTitle')}
                        </span>
                        <span className="text-[10px] text-zinc-400">{t('menu.setupWizardSubtitle')}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                  </button>

                  {/* Official Telegram Community Quick Card (Private to Registered Users) */}
                  {isRegistered ? (
                    <a
                      href="https://t.me/+aeaMsRXfx0VhZDJl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full p-2.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-600/15 hover:from-amber-500/25 hover:to-amber-500/35 border border-amber-500/40 hover:border-amber-400 flex items-center justify-between transition-all duration-300 group shadow-[0_0_15px_rgba(245,158,11,0.15)] hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                          <TelegramIcon className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-amber-200 group-hover:text-white block">
                            {t('menu.telegramCommunity')}
                          </span>
                          <span className="text-[10px] text-zinc-400">{t('menu.telegramDesc')}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                        {t('menu.joinTelegram')}
                      </span>
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('open-onboarding-wizard'));
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-2xl bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 flex items-center justify-between transition-all group shadow-sm cursor-pointer text-left"
                      title={t('menu.unlockTelegramTitle')}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-amber-400">
                          <Lock className="w-3.5 h-3.5 text-amber-500/80" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-zinc-300 group-hover:text-amber-200 block">
                            {t('menu.telegramCommunity')}
                          </span>
                          <span className="text-[10px] text-zinc-500">{t('menu.privateSanghaDesc')}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        {t('menu.unlock')}
                      </span>
                    </button>
                  )}

                  {/* Divider label */}
                  <div className="flex items-center gap-2.5 py-1">
                    <div className="flex-1 h-px bg-zinc-800/80" />
                    <span className="text-[10px] font-black text-amber-400/90 tracking-widest uppercase flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-amber-400" />
                      {t('menu.sadhanaModules')}
                    </span>
                    <div className="flex-1 h-px bg-zinc-800/80" />
                  </div>

                  {/* ── 6 Selected Sadhana Features Grid ── */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {sadhanaFeatures.map(item => {
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

                  {/* ── Diagnostic & Emergency Modals Section ── */}
                  <div className="pt-2 space-y-2">
                    <div className="text-[10px] font-black text-amber-400/90 uppercase tracking-widest px-1 flex items-center justify-between">
                      <span>{t('menu.diagnosticTools')}</span>
                      <span className="text-[9px] text-zinc-500 font-normal">{t('menu.interactiveModals')}</span>
                    </div>

                    {diagnosticTools.map(tool => {
                      const Icon = tool.icon;
                      return (
                        <motion.button
                          key={tool.title}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={tool.action}
                          className="w-full flex items-center justify-between p-3 rounded-2xl bg-zinc-950/80 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-amber-400/60 transition group cursor-pointer text-left shadow-sm"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                              <Icon className="w-4 h-4 text-amber-400" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-2">
                                <span>{tool.title}</span>
                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border bg-zinc-900 ${tool.color}`}>
                                  {tool.badge}
                                </span>
                              </div>
                              <div className="text-[10px] text-zinc-400 mt-0.5">{tool.subtitle}</div>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Primary Landing Page Links */}
                  <div className="pt-2 space-y-1.5">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider px-1">
                      {t('menu.mainLandingNav')}
                    </div>
                    {quickSections.map(sec => {
                      const Icon = sec.icon;
                      return (
                        <a
                          key={sec.title}
                          href={sec.href}
                          onClick={onClose}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950/40 hover:bg-zinc-900/70 border border-zinc-800/60 hover:border-amber-500/30 transition group"
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-amber-400" />
                            <div>
                              <div className="text-xs font-semibold text-zinc-300 group-hover:text-white">
                                {sec.title}
                              </div>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-amber-400" />
                        </a>
                      );
                    })}
                  </div>

                </div>
              )}

              {/* SCREEN 2: JOURNAL & NOTES */}
              {currentScreen === 'journal' && <JournalNotesView />}

              {/* SCREEN 3: STATS & HEATMAP */}
              {currentScreen === 'stats' && <StatsView />}

              {/* SCREEN 4: COMMUNITY SAKHAD FEED */}
              {currentScreen === 'community' && <CommunityFeed />}

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
   Main Header / Navbar — Ultra-Clean Top Bar with Mobile Responsiveness
───────────────────────────────────────────────────────────── */
export default function Header() {
  const { t, currentLang } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [streakDays, setStreakDays] = useState(7);
  const [authOpen, setAuthOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const isRegistered = useIsRegisteredUser();

  useEffect(() => {
    try {
      const CURRENT_BUILD_VERSION = "2.5.0";
      const storedBuildVersion = localStorage.getItem("app_build_version");
      if (storedBuildVersion !== CURRENT_BUILD_VERSION) {
        localStorage.setItem("app_build_version", CURRENT_BUILD_VERSION);
        localStorage.setItem("app_version", CURRENT_BUILD_VERSION);
        if (storedBuildVersion) {
          window.location.reload();
        }
      }
    } catch (e) {}

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    try {
      const saved = localStorage.getItem('bm_streak_days');
      if (saved) setStreakDays(parseInt(saved, 10));
    } catch (e) { }

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

  /* ─────────────────────────────────────────────────────────────
     Share & Copy Link API (Mobile Native Share or Desktop Clipboard)
  ───────────────────────────────────────────────────────────── */
  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: 'Brahmacharya Mitra',
      text: 'Master Your Vitality & Transmute Your Energy with Brahmacharya Mitra!',
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return;
      }
    }

    // Desktop fallback: copy to clipboard & show "Link Copied!" toast
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setToastMessage(t('menu.linkCopied'));
      setTimeout(() => setToastMessage(null), 2500);
    } catch (e) {
      setToastMessage(t('menu.linkCopied'));
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  return (
    <>
      <header
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-[99999] transition-all duration-500 w-full px-2 sm:px-4 ${isScrolled ? 'py-1 sm:py-2' : 'py-1.5 sm:py-3'
          }`}
      >
        <div
          className={`header-nav-container flex flex-row items-center justify-between w-full px-2.5 sm:px-4 py-2 sm:py-2.5 max-w-5xl mx-auto flex-nowrap rounded-2xl transition-all duration-300 relative ${isScrolled
              ? 'backdrop-blur-md shadow-[0_10px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(245,158,11,0.2)]'
              : 'backdrop-blur-sm shadow-[0_8px_25px_rgba(0,0,0,0.7)]'
            }`}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'nowrap',
            width: '100%',
            background: isScrolled ? 'rgba(16, 11, 8, 0.95)' : 'rgba(24, 16, 10, 0.88)',
            border: '1.5px solid rgba(245, 158, 11, 0.3)',
          }}
        >

          {/* ── Column 1: Logo & Ultra-Bold Typography (Always 100% Visible, No Clipping) ── */}
          <a
            href={baseUrl}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="header-logo-link flex items-center gap-2 sm:gap-2.5 flex-1 min-w-0 pr-2 cursor-pointer group"
            title="Brahmacharya Mitra — Home"
          >
            <div className="relative group/logo shrink-0 flex items-center justify-center">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 blur-[5px] opacity-80 group-hover/logo:opacity-100 transition-opacity duration-300" />
              <img
                src={baseUrl + "photo_mahadev.jpg"}
                alt="Brahmacharya Mitra Logo"
                className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full object-cover border-2 border-amber-400 shadow-[0_0_15px_rgba(255,140,0,0.6)] group-hover/logo:scale-105 transition-transform duration-300 shrink-0"
                style={{ objectPosition: 'center 20%' }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = MAHADEV_IMAGE_DATA;
                }}
              />
            </div>

            <div className="min-w-0 overflow-hidden">
              <span className="truncate text-xs sm:text-base font-black tracking-wider text-amber-400 uppercase drop-shadow-md select-none block">
                BRAHMACHARYA MITRA
              </span>
            </div>
          </a>

          {/* ── Column 2: Right-Side Controls (Language Dropdown & ☰ Menu Button) ── */}
          <div
            className="header-controls-group flex flex-row items-center gap-2 shrink-0 whitespace-nowrap relative z-[99999]"
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '8px',
              flexShrink: 0,
              whiteSpace: 'nowrap',
            }}
          >
            {/* Desktop Navigation Links (Large Screens Only) */}
            <div className="hidden lg:flex items-center gap-1.5 mr-1">
              <a
                href={baseUrl + "dashboard/"}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-amber-500/30 hover:border-amber-400 text-xs font-bold text-amber-300 hover:text-white transition cursor-pointer whitespace-nowrap"
              >
                <Compass className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{t('nav.dashboard')}</span>
              </a>

              <a
                href={baseUrl + "leaderboard/"}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-amber-500/30 hover:border-amber-400 text-xs font-bold text-amber-300 hover:text-white transition cursor-pointer whitespace-nowrap"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{t('nav.leaderboard')}</span>
              </a>

              <a
                href={baseUrl + "books/"}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-amber-500/30 hover:border-amber-400 text-xs font-bold text-amber-300 hover:text-white transition cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{t('nav.books')}</span>
              </a>
            </div>

            {/* Language Selector ('IN OR ∨' / 'EN') with Front Layer z-[9999] */}
            <LanguageSelector />

            {/* 3-line Hamburger Menu Icon '☰' */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative group p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border-2 border-amber-500/40 hover:border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all cursor-pointer active:scale-95 flex items-center gap-1 shrink-0"
              aria-label="Open Navigation Menu"
              title="Menu"
            >
              {/* 3-line Authentic Hamburger Menu Graphic */}
              <div className="flex flex-col justify-center items-center w-4 h-3.5 sm:w-4.5 sm:h-4 gap-0.5 sm:gap-1">
                <span className="w-4 sm:w-4.5 h-0.5 bg-amber-300 rounded-full group-hover:bg-white transition-colors" />
                <span className="w-4 sm:w-4.5 h-0.5 bg-amber-300 rounded-full group-hover:bg-white transition-colors" />
                <span className="w-4 sm:w-4.5 h-0.5 bg-amber-300 rounded-full group-hover:bg-white transition-colors" />
              </div>
              <span className="hidden sm:inline text-xs font-black uppercase tracking-wider text-amber-300 ml-0.5">
                {t('menu.menuLabel')}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* ── Slide-Open Glassmorphic Drawer with Sadhana Modules ── */}
      <ToolsDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        streakDays={streakDays}
        t={t}
        triggerPanic={triggerPanic}
        openAuth={() => setAuthOpen(true)}
        onShare={handleShare}
      />

      {/* ── Toast Notification: Link Copied! ── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[120] pointer-events-none"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinc-950/95 border border-amber-400/80 shadow-[0_0_30px_rgba(245,158,11,0.5)] backdrop-blur-2xl text-white font-bold text-xs sm:text-sm">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-amber-200">{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Auth Modal (Google & Phone + OTP) ── */}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
