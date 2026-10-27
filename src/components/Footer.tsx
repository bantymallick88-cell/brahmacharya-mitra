import React from 'react';
import { 
  Flame, 
  Heart, 
  Sparkles, 
  ShieldAlert, 
  ArrowUp,
  ShieldCheck
} from 'lucide-react';
import { useTranslation } from '../i18n';

export default function Footer() {
  const { t } = useTranslation();

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

  return (
    <footer className="border-t border-amber-500/20 bg-[#02040a] relative overflow-hidden pt-16 pb-12">
      
      {/* Sacred Shloka Grand Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="p-8 sm:p-12 rounded-3xl backdrop-blur-3xl bg-zinc-950/70 border border-amber-500/25 hover:border-amber-400/70 text-center relative overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.25)] mb-16 transition-all duration-500">
          
          {/* Ambient Deep Cosmic Purple & Indigo Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-[radial-gradient(circle,rgba(109,40,217,0.22)_0%,rgba(99,102,241,0.18)_40%,rgba(245,158,11,0.14)_70%,transparent_100%)] blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3 relative z-10 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {t.footer.vedicRef}
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-sanskrit text-amber-200 tracking-wide max-w-4xl mx-auto leading-relaxed drop-shadow-[0_2px_15px_rgba(245,158,11,0.3)] relative z-10">
            {t.footer.shlokaQuote}
          </h3>

          <p className="mt-3 text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto font-medium relative z-10">
            {t.footer.shlokaMeaning}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 relative z-10">
            <button
              onClick={triggerPanic}
              className="px-5 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/60 hover:border-amber-400 text-red-300 text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-[0_0_18px_rgba(239,68,68,0.25)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-105"
            >
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span>{t.footer.panicShieldBtn}</span>
            </button>
            <a
              href="#streak"
              className="btn-shimmer btn-metallic-glow px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-zinc-950 text-xs font-black transition flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:scale-105"
            >
              <Flame className="w-4 h-4 fill-black" />
              <span>{t.footer.trackStreakBtn}</span>
            </a>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-zinc-800/80">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl divine-emblem flex items-center justify-center font-cinzel font-black text-amber-300 text-lg shadow-[0_0_20px_rgba(109,40,217,0.35)]">
                ॐ
              </div>
              <div>
                <span className="font-cinzel font-black text-lg gold-to-indigo-text">Brahmacharya</span>{' '}
                <span className="font-bold text-white">Mitra</span>
                <div className="text-[10px] font-sanskrit text-amber-400/90 -mt-1 flex items-center gap-1">
                  <span>ब्रह्मचर्य मित्र</span>
                  <span className="text-indigo-400/70">•</span>
                  <span className="text-amber-300/80">दिव्य पथ</span>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-zinc-400 leading-relaxed">
              {t.footer.brandDesc}
            </p>
          </div>

          {/* Quick Tools */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {t.footer.coreToolsTitle}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#streak" className="hover:text-amber-300 transition">{t.nav.streakDay.replace(' {days}', '')}</a></li>
              <li><a href="#calculator" className="hover:text-amber-300 transition">{t.nav.calculator}</a></li>
              <li><a href="#brain-fog" className="hover:text-amber-300 transition">{t.nav.brainFog}</a></li>
              <li><a href="#ai-mentor" className="hover:text-amber-300 transition">{t.nav.aiMentor}</a></li>
              <li><button onClick={triggerPanic} className="text-red-400 hover:text-red-300 transition text-left cursor-pointer">{t.nav.panicMode} 🚨</button></li>
            </ul>
          </div>

          {/* Curriculum & Wisdom */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {t.footer.curriculumTitle}
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#courses" className="hover:text-amber-300 transition">{t.courses.titleHighlight} (30D)</a></li>
              <li><a href="#courses" className="hover:text-amber-300 transition">{t.courses.titleHighlight} (60D)</a></li>
              <li><a href="#courses" className="hover:text-amber-300 transition">{t.courses.titleHighlight} (100D)</a></li>
              <li><a href="#deities" className="hover:text-amber-300 transition">{t.nav.deities}</a></li>
              <li><a href="#books" className="hover:text-amber-300 transition">{t.nav.books}</a></li>
            </ul>
          </div>

          {/* Mission & Seva */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {t.footer.missionTitle}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-3">
              {t.footer.missionDesc}
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href="#donate"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-500/30 hover:border-amber-400 transition shadow-sm w-fit"
              >
                <Heart className="w-3.5 h-3.5 fill-amber-400" />
                <span>{t.footer.contributeSevaBtn}</span>
              </a>

              <button
                onClick={openPrivacyModal}
                className="text-xs text-amber-300/90 hover:text-amber-200 transition flex items-center gap-1.5 font-semibold cursor-pointer w-fit pt-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>100% Private & Client-Side</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="text-center sm:text-left flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
            <span>{t.footer.copyright.replace('{year}', String(new Date().getFullYear()))}</span>
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <button
              onClick={openPrivacyModal}
              className="text-zinc-400 hover:text-amber-300 underline underline-offset-4 decoration-zinc-700 hover:decoration-amber-400 transition cursor-pointer font-medium"
            >
              Privacy Policy
            </button>
            <span className="text-zinc-600">•</span>
            <a
              href={`${baseUrl}privacy`}
              className="text-zinc-400 hover:text-amber-300 underline underline-offset-4 decoration-zinc-700 hover:decoration-amber-400 transition font-medium"
            >
              Terms & Legal
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-amber-500/50 text-zinc-400 hover:text-white transition cursor-pointer flex items-center gap-1.5 shadow-sm"
              title={t.footer.backToTop}
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
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
