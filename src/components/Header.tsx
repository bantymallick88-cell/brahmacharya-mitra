import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Flame, ShieldAlert, Menu, X, Sparkles, Trophy, Heart,
  Calculator, Brain, Compass, ChevronRight, ArrowRight,
  UserCircle, BookOpen, BarChart3, Users, Wind,
  Image as ImageIcon, Settings, ChevronLeft, Zap, Clock,
  Share2, Check, Smartphone, HelpCircle, Lock
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../i18n';
import AuthModal from './AuthModal';
import TelegramIcon from './TelegramIcon';
import { useIsRegisteredUser } from '../utils/useRegisteredUser';

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
   Strict Circular CSS Fit: w-9 h-9 rounded-full object-cover border-2 border-[#FF8C00] shrink-0
───────────────────────────────────────────────────────────── */
export function MahadevLogo({ className }: { size?: number; className?: string }) {
  return (
    <img
      src={baseUrl + "photo_mahadev.jpg"}
      alt="Mahadev"
      className={className || "w-9 h-9 rounded-full object-cover border-2 border-[#FF8C00] shrink-0"}
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
      title: 'Schedule, Todo & Journal',
      subtitle: 'Ideal Dinacharya, daily tasks, notes & reflections',
      icon: Clock,
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

  // Direct Diagnostic & Emergency Tools (Opens Dedicated Modals)
  const diagnosticTools = [
    {
      title: 'Brain Fog Test',
      subtitle: 'Porn-induced mental fog diagnostic',
      icon: Brain,
      badge: 'Test Modal',
      color: 'border-cyan-500/40 text-cyan-300',
      action: () => {
        window.dispatchEvent(new CustomEvent('open-brainfog-modal'));
        onClose();
      },
    },
    {
      title: 'Relapse Cost Calculator',
      subtitle: 'Lost vitality, hours & economic drain',
      icon: Calculator,
      badge: 'Calculator Modal',
      color: 'border-amber-500/40 text-amber-300',
      action: () => {
        window.dispatchEvent(new CustomEvent('open-calculator-modal'));
        onClose();
      },
    },
    {
      title: 'Panic Mode',
      subtitle: 'Instant urge breaker & 4-7-8 breathwork',
      icon: ShieldAlert,
      badge: 'Emergency',
      color: 'border-red-500/50 text-red-300',
      action: () => {
        triggerPanic();
        onClose();
      },
    },
    {
      title: 'Seva & Web Contribution',
      subtitle: 'Direct UPI support for server & research',
      icon: Heart,
      badge: 'Contribute',
      color: 'border-amber-500/50 text-amber-300',
      action: () => {
        window.dispatchEvent(new CustomEvent('open-payment-modal', { detail: { amount: 108 } }));
        onClose();
      },
    },
  ];

  // Quick navigation to primary sections
  const quickSections = [
    {
      title: 'Streak Counter & Habit Carousel',
      subtitle: 'Sobriety timer & daily disciplines',
      href: '#streak',
      icon: Flame,
    },
    {
      title: 'Sacred Library (29+ Free Books)',
      subtitle: 'Complete scriptures, PDF studies & science',
      href: baseUrl + 'books/',
      icon: BookOpen,
    },
    {
      title: 'Frequently Asked Questions (FAQ)',
      subtitle: 'NoFap, celibacy, brain fog & app guide',
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
                  <img
                    src={baseUrl + "photo_mahadev.jpg"}
                    alt="Mahadev"
                    className="w-9 h-9 rounded-full object-cover border-2 border-[#FF8C00] shrink-0"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = MAHADEV_IMAGE_DATA;
                    }}
                  />
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
                      ब्रह्मचर्य मित्र • Sadhana Tools
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

                  {/* Share & Add to Home Screen Quick Row */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={onShare}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500/15 to-yellow-500/10 hover:from-amber-500/25 hover:to-yellow-500/20 border border-amber-500/40 hover:border-amber-400 text-xs font-bold text-amber-300 transition shadow-[0_0_15px_rgba(245,158,11,0.15)] cursor-pointer"
                    >
                      <Share2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>Share App</span>
                    </button>

                    <button
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('open-install-prompt'));
                        onClose();
                      }}
                      className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-850 border border-amber-500/30 hover:border-amber-400 text-xs font-bold text-amber-200 transition shadow-[0_0_15px_rgba(245,158,11,0.15)] cursor-pointer"
                    >
                      <Smartphone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>📱 Install PWA</span>
                    </button>
                  </div>

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
                          Daily Dashboard
                        </h4>
                        <p className="text-[10px] text-zinc-400 mt-0.5">Speedometer & Dinacharya</p>
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
                          Leaderboard
                        </h4>
                        <p className="text-[10px] text-zinc-400 mt-0.5">Global podium & ranks</p>
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
                          Setup Wizard & Goal Selector
                        </span>
                        <span className="text-[10px] text-zinc-400">Custom target days, routines & country</span>
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
                            Official Telegram Community
                          </span>
                          <span className="text-[10px] text-zinc-400">Daily vichar, updates & sadhak sangha</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
                        Join ↗
                      </span>
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('open-onboarding-wizard'));
                        onClose();
                      }}
                      className="w-full p-2.5 rounded-2xl bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 flex items-center justify-between transition-all group shadow-sm cursor-pointer text-left"
                      title="Complete Setup Wizard to Join Telegram Community"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-amber-400">
                          <Lock className="w-3.5 h-3.5 text-amber-500/80" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-zinc-300 group-hover:text-amber-200 block">
                            Official Telegram Community
                          </span>
                          <span className="text-[10px] text-zinc-500">Private Sangha • Complete Setup to Unlock</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        Unlock 🔒
                      </span>
                    </button>
                  )}

                  {/* Divider label */}
                  <div className="flex items-center gap-2.5 py-1">
                    <div className="flex-1 h-px bg-zinc-800/80" />
                    <span className="text-[10px] font-black text-amber-400/90 tracking-widest uppercase flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-amber-400" />
                      Sadhana & Vitality Modules
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
                      <span>Diagnostic & Emergency Tools</span>
                      <span className="text-[9px] text-zinc-500 font-normal">Opens Interactive Modals</span>
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
                      Main Landing Navigation
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
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [streakDays, setStreakDays] = useState(7);
  const [authOpen, setAuthOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const isRegistered = useIsRegisteredUser();

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
      setToastMessage('Link Copied to Clipboard!');
      setTimeout(() => setToastMessage(null), 2500);
    } catch (e) {
      setToastMessage('Link Copied!');
      setTimeout(() => setToastMessage(null), 2500);
    }
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

            {/* ── Left: Logo (Mahadev Divine Photo) & Responsive Brand Title ── */}
            <a href="#" className="flex items-center gap-2 sm:gap-3.5 group flex-shrink min-w-0">
              <img
                src={baseUrl + "photo_mahadev.jpg"}
                alt="Mahadev"
                className="w-9 h-9 rounded-full object-cover border-2 border-[#FF8C00] shrink-0"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = MAHADEV_IMAGE_DATA;
                }}
              />

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

            {/* ── Center/Right: Desktop Nav Links (Daily Dashboard, Leaderboard, Setup) ── */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href={baseUrl + "dashboard/"}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-amber-500/30 hover:border-amber-400 text-xs font-bold text-amber-300 hover:text-white transition cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>Dashboard</span>
              </a>

              <a
                href={baseUrl + "leaderboard/"}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-amber-500/30 hover:border-amber-400 text-xs font-bold text-amber-300 hover:text-white transition cursor-pointer"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Leaderboard</span>
              </a>

              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-onboarding-wizard'))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-xs font-bold text-amber-300 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Setup Wizard</span>
              </button>

              <a
                href={baseUrl + "books/"}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-amber-500/30 hover:border-amber-400 text-xs font-bold text-amber-300 hover:text-white transition cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Library</span>
              </a>

              {/* ── Official Telegram Community Link (Restricted to Registered Users) ── */}
              {isRegistered ? (
                <a
                  href="https://t.me/+aeaMsRXfx0VhZDJl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-amber-600/15 hover:from-amber-500/25 hover:to-amber-500/35 border border-amber-500/50 hover:border-amber-400 text-amber-300 hover:text-white text-xs font-bold transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 group cursor-pointer"
                  title="Join Official Telegram Community"
                >
                  <TelegramIcon className="w-3.5 h-3.5 text-amber-400 group-hover:text-amber-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                  <span className="font-extrabold tracking-wide">Join Telegram</span>
                </a>
              ) : (
                <button
                  onClick={() => {
                    setToastMessage('Telegram Sangha is private for registered sadhaks. Complete your Setup Wizard to unlock!');
                    window.dispatchEvent(new CustomEvent('open-onboarding-wizard'));
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-850 border border-zinc-750 hover:border-amber-500/40 text-zinc-400 hover:text-amber-300 text-xs font-bold transition-all duration-300 shadow-sm cursor-pointer group"
                  title="Complete Setup Wizard to Join Telegram Community"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-500/70 group-hover:text-amber-400 transition-colors flex-shrink-0" />
                  <span>Join Telegram 🔒</span>
                </button>
              )}
            </div>

            {/* ── Right: Share Button, Language Dropdown & 3-Line Hamburger Menu Icon ── */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
              {/* Share Icon Button */}
              <button
                onClick={handleShare}
                className="relative group p-2 sm:p-2.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800/90 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all cursor-pointer active:scale-95 flex items-center justify-center flex-shrink-0"
                aria-label="Share Brahmacharya Mitra"
                title="Share App / Copy Link"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 group-hover:scale-110 transition-transform" />
              </button>

              <div className="scale-90 sm:scale-100 origin-right">
                <LanguageSelector />
              </div>

              {/* 3-line Hamburger Menu Icon */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="relative group p-2 sm:p-3 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800/90 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_30px_rgba(245,158,11,0.45)] transition-all cursor-pointer active:scale-95 flex items-center justify-center flex-shrink-0"
                aria-label="Open Sadhana Tools and Navigation Drawer"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 group-hover:scale-110 transition-transform" />
              </button>
            </div>

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
