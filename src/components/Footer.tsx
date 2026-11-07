import React, { useState } from 'react';
import { 
  Flame, 
  Sparkles, 
  ShieldAlert, 
  ArrowUp, 
  ShieldCheck,
  Mail, 
  ExternalLink, 
  Lock, 
  BookOpen,
  Scale,
  Copy,
  Check,
  HeartHandshake,
  Compass,
  Trophy,
  Info
} from 'lucide-react';
import TelegramIcon from './TelegramIcon';
import { useTranslation } from '../i18n';
import { useIsRegisteredUser } from '../utils/useRegisteredUser';
import { MAHADEV_IMAGE_DATA } from '../assets/mahadevBase64';

export default function Footer() {
  const { t } = useTranslation();
  const isRegistered = useIsRegisteredUser();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactEmail = 'bantyxyz13@gmail.com';

  const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) 
    ? (import.meta.env.BASE_URL.replace(/\/$/, '') + '/') 
    : '/';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerPanic = () => {
    window.dispatchEvent(new CustomEvent('open-panic-modal'));
  };

  const openPrivacyModal = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-privacy-modal'));
  };

  const openDmcaModal = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('open-dmca-modal'));
  };

  const copyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(contactEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  return (
    <footer className="border-t border-amber-500/25 bg-[#0c0908] relative overflow-hidden pt-16 pb-28 sm:pb-32">
      
      {/* ── Sacred Shloka Grand Sanctuary Banner ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-8 sm:p-12 rounded-3xl backdrop-blur-3xl bg-zinc-950/80 border border-amber-500/30 hover:border-amber-400/80 text-center relative overflow-hidden shadow-[0_15px_50px_rgba(0,0,0,0.85),0_0_40px_rgba(245,158,11,0.2)] mb-16 transition-all duration-500 group">
          
          {/* Ambient Deep Cosmic Purple & Radiant Gold Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-[radial-gradient(circle,rgba(109,40,217,0.24)_0%,rgba(99,102,241,0.18)_40%,rgba(245,158,11,0.15)_70%,transparent_100%)] blur-3xl pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 relative z-10 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.footer.vedicRef}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-sanskrit text-amber-200 tracking-wide max-w-4xl mx-auto leading-relaxed drop-shadow-[0_2px_20px_rgba(245,158,11,0.4)] relative z-10">
            {t.footer.shlokaQuote}
          </h3>

          <p className="mt-3.5 text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto font-medium relative z-10 leading-relaxed">
            {t.footer.shlokaMeaning}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 relative z-10">
            <button
              onClick={triggerPanic}
              className="px-5 py-2.5 rounded-2xl bg-red-950/60 hover:bg-red-900/80 border border-red-500/70 hover:border-amber-400 text-red-200 text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.45)] hover:scale-105 active:scale-95"
            >
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>{t.footer.panicShieldBtn} 🚨</span>
            </button>
            <a
              href="#streak"
              className="btn-shimmer btn-metallic-glow px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-zinc-950 text-xs font-black transition flex items-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] hover:scale-105 active:scale-95"
            >
              <Flame className="w-4 h-4 fill-zinc-950" />
              <span>{t.footer.trackStreakBtn}</span>
            </a>
          </div>
        </div>

        {/* ── Official Community & Support 3D Glassmorphic Card ── */}
        <div className="p-6 sm:p-8 rounded-3xl backdrop-blur-3xl bg-zinc-950/85 border border-amber-500/35 hover:border-amber-400/70 relative overflow-hidden shadow-[0_10px_45px_rgba(0,0,0,0.8),0_0_35px_rgba(245,158,11,0.2)] mb-14 transition-all duration-500 group">
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-indigo-600/15 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2.5 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('footer.supportSanctuaryBadge')}</span>
              </div>
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-black font-cinzel text-amber-300 tracking-wide drop-shadow-[0_2px_15px_rgba(245,158,11,0.35)]">
                {t('footer.communityDmcaTitle')}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                {t('footer.communityDmcaDesc')}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 w-full lg:w-auto shrink-0">
              {/* Telegram Group Button */}
              {isRegistered ? (
                <a
                  href="https://t.me/+aeaMsRXfx0VhZDJl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shimmer btn-metallic-glow px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-zinc-950 text-xs sm:text-sm font-black transition-all duration-300 flex items-center gap-2.5 shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.55)] hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <TelegramIcon className="w-4 h-4 text-zinc-950" />
                  <span>{t('footer.joinTelegram')}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-900" />
                </a>
              ) : (
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-onboarding-wizard'))}
                  className="px-5 py-3 rounded-2xl bg-zinc-900/90 hover:bg-zinc-850 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-white text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2.5 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                  title={t('footer.unlockTelegram')}
                >
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>{t('footer.unlockTelegram')}</span>
                </button>
              )}

              {/* Support Email Direct Compose & Copy Button */}
              <div className="flex items-center gap-1.5 bg-zinc-900/90 p-1 rounded-2xl border border-amber-500/35 shadow-sm">
                <a
                  href={`mailto:${contactEmail}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl hover:bg-zinc-800 text-amber-300 hover:text-white text-xs sm:text-sm font-bold transition flex items-center gap-2 cursor-pointer"
                  title="Email bantyxyz13@gmail.com"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>{contactEmail}</span>
                </a>
                <button
                  onClick={copyEmail}
                  className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition cursor-pointer"
                  title="Copy Support Email"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer Navigation Columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-zinc-800/80">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3.5">
              <div className="relative shrink-0 flex items-center justify-center">
                <img
                  src={baseUrl + "logo.png"}
                  alt="Brahmacharya Mitra Logo"
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)] shrink-0"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = baseUrl + "photo_mahadev.jpg";
                  }}
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-cinzel font-black text-xl sm:text-2xl tracking-wider text-[#FFFFFF] drop-shadow-[0_2px_14px_rgba(255,255,255,0.5)] uppercase">
                  BRAHMACHARYA MITRA
                </span>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[11px] font-sanskrit text-white/90 font-bold tracking-wider">
                    ब्रह्मचर्य मित्र
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                  <span className="text-[10px] font-sans uppercase tracking-widest text-zinc-300 font-semibold">
                    {t('footer.divineSanctum')}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-zinc-400 leading-relaxed">
              {t.footer.brandDesc}
            </p>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.footer.coreToolsTitle}</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li><a href="#streak" className="hover:text-amber-300 transition flex items-center gap-1"><span>🔥</span> <span>{t('footer.streakCounter')}</span></a></li>
              <li><a href={`${baseUrl}dashboard/`} className="hover:text-amber-300 transition flex items-center gap-1"><span>🧭</span> <span>{t('footer.dailyDashboard')}</span></a></li>
              <li><a href={`${baseUrl}leaderboard/`} className="hover:text-amber-300 transition flex items-center gap-1"><span>🏆</span> <span>{t('footer.globalLeaderboard')}</span></a></li>
              <li><a href="#calculator" className="hover:text-amber-300 transition flex items-center gap-1"><span>🧮</span> <span>{t.nav.calculator}</span></a></li>
              <li><a href="#brain-fog" className="hover:text-amber-300 transition flex items-center gap-1"><span>🧠</span> <span>{t.nav.brainFog}</span></a></li>
              <li><button onClick={triggerPanic} className="text-red-400 hover:text-red-300 transition text-left cursor-pointer flex items-center gap-1"><span>🚨</span> <span>{t('nav.panicMode')} ({t('footer.urgeBreaker')})</span></button></li>
            </ul>
          </div>

          {/* Curriculum & Wisdom */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.footer.curriculumTitle}</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <a href={`${baseUrl}books/`} className="hover:text-amber-300 transition flex items-center gap-1.5 font-medium text-amber-300/90">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('footer.sanctuaryLibrary')}</span>
                </a>
              </li>
              <li><a href="#courses" className="hover:text-amber-300 transition">{t.courses.titleHighlight} ({t('badges.reset30d')})</a></li>
              <li><a href="#courses" className="hover:text-amber-300 transition">{t.courses.titleHighlight} ({t('badges.transform60d')})</a></li>
              <li><a href="#courses" className="hover:text-amber-300 transition">{t.courses.titleHighlight} ({t('badges.akhand100d')})</a></li>
              <li><a href="#deities" className="hover:text-amber-300 transition">{t.nav.deities}</a></li>
            </ul>
          </div>

          {/* Mission, Legal & DMCA */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('legal.sanctuaryTitle')}</span>
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-3">
              {t('legal.sanctuaryDesc')}
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={openDmcaModal}
                className="text-xs text-amber-300 hover:text-amber-200 transition flex items-center gap-1.5 font-semibold cursor-pointer w-fit"
              >
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('legal.dmcaNotice')}</span>
              </button>
              <button
                onClick={openPrivacyModal}
                className="text-xs text-zinc-300 hover:text-amber-300 transition flex items-center gap-1.5 font-medium cursor-pointer w-fit"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t('legal.privacySovereignty')}</span>
              </button>
              <a
                href={`${baseUrl}privacy`}
                className="text-xs text-zinc-400 hover:text-amber-300 transition flex items-center gap-1.5 font-medium w-fit"
              >
                <Info className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('legal.fullTerms')}</span>
              </a>
              <a
                href={`mailto:${contactEmail}`}
                className="text-xs text-zinc-400 hover:text-amber-300 transition flex items-center gap-1.5 font-medium w-fit pt-1"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('legal.contactSupport', { email: contactEmail })}</span>
              </a>
            </div>
          </div>

        </div>

        {/* ── Premium Bottom Legal & Glassmorphism Bar ── */}
        <div className="mt-12 p-4 sm:p-6 rounded-3xl bg-zinc-950/80 border border-white/10 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.08)] flex flex-col lg:flex-row items-center justify-between gap-5 text-xs text-zinc-300">
          
          {/* Copyright & Divine Sanctum Attribution */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <div className="flex items-center gap-1.5 font-cinzel font-bold text-white tracking-wider">
              <span>© {new Date().getFullYear()}</span>
              <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">{t('appName')}</span>
            </div>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-[11px] text-zinc-400">{t('legal.allRightsReserved')}</span>
          </div>

          {/* Glassmorphic Legal & Contact Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {/* DMCA / Fair Use */}
            <button
              onClick={openDmcaModal}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-amber-400/60 text-amber-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-semibold shadow-sm active:scale-95"
              title="View DMCA Copyright & Fair Use Notice"
            >
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('legal.dmcaShort')}</span>
            </button>

            {/* Privacy Policy */}
            <button
              onClick={openPrivacyModal}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-emerald-400/60 text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium shadow-sm active:scale-95"
              title="Privacy Policy & Local Data Sovereignty"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('legal.privacyPolicy')}</span>
            </button>

            {/* Terms */}
            <a
              href={`${baseUrl}privacy`}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-blue-400/60 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-medium shadow-sm active:scale-95"
              title="Terms of Use & Legal Framework"
            >
              <Info className="w-3.5 h-3.5 text-blue-400" />
              <span>{t('legal.terms')}</span>
            </a>

            {/* Contact Support */}
            <a
              href={`mailto:${contactEmail}`}
              className="px-3.5 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-amber-500/30 hover:border-amber-400 text-amber-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold shadow-sm active:scale-95"
              title={`Email support: ${contactEmail}`}
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{t('legal.contactSupport', { email: contactEmail })}</span>
            </a>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-amber-400 text-zinc-300 hover:text-white transition-all cursor-pointer shadow-sm active:scale-95 ml-1"
              title={t.footer.backToTop}
            >
              <ArrowUp className="w-4 h-4 text-amber-400" />
            </button>
          </div>

        </div>

        <div className="mt-4 text-center text-[10px] text-zinc-500 max-w-3xl mx-auto leading-relaxed">
          {t.footer.medicalDisclaimer}
        </div>

      </div>
    </footer>
  );
}
