import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles
} from 'lucide-react';
import { useTranslation } from '../i18n';
import LiquidAuroraCanvas from './LiquidAuroraCanvas';
import { MAHADEV_IMAGE_DATA } from '../assets/mahadevBase64';

const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      className="relative pt-24 pb-8 sm:pt-32 sm:pb-12 overflow-hidden transition-colors duration-500"
      style={{
        backgroundColor: 'var(--color-obsidian-base, #02040a)',
      }}
    >
      {/* ── Active Hero Background Image: 1000469239.jpg ── */}
      <div
        className="hero-bg-image absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-[1.02]"
        style={{ backgroundImage: `url('${baseUrl}1000469239.jpg')` }}
      />

      {/* ── Deep Obsidian Black Gradient Tint (#02040a) ── */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#02040a]/90 via-[#02040a]/75 to-[#02040a]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#02040a]/85 via-transparent to-[#02040a]/85" />
      <div className="hero-radial-tint absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_35%,rgba(109,40,217,0.22)_0%,rgba(245,158,11,0.12)_45%,rgba(2,4,10,0.95)_80%)]" />
      
      {/* ── Flowing Liquid Aurora Shader Canvas Background ── */}
      <LiquidAuroraCanvas />

      {/* ── Floating Cyber Amber & Cosmic Embers ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-24 left-[15%] w-2 h-2 rounded-full bg-amber-400/80 blur-[1px] animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-48 right-[18%] w-3 h-3 rounded-full bg-indigo-500/70 blur-[1px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 left-[25%] w-2.5 h-2.5 rounded-full bg-yellow-300/60 blur-[1px] animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 w-full">
        
        {/* Divine Mahadev Avatar Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border-beam-badge backdrop-blur-3xl bg-zinc-950/70 border border-white/10 hover:border-amber-400/80 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] text-amber-300 mb-4 transition-all duration-300"
        >
          <img
            src={baseUrl + "logo.png"}
            alt="Brahmacharya Mitra"
            className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full object-cover border border-amber-400/80 shadow-[0_0_8px_rgba(245,158,11,0.4)] shrink-0"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = baseUrl + "photo_mahadev.jpg";
            }}
          />
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-[10px] sm:text-xs font-semibold tracking-wider whitespace-normal text-center leading-snug">
            {t('hero.badge')}
          </span>
        </motion.div>

        {/* Clean, Visual Headline */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2 mb-4 relative w-full"
        >
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black font-cinzel tracking-tight text-white max-w-full px-2 mx-auto leading-tight text-balance">
            <span className="block text-zinc-100 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              {t('hero.title1')}
            </span>
            <span className="block bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent metallic-gold-text drop-shadow-[0_0_30px_rgba(245,158,11,0.5)]">
              {t('hero.title2')}
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base font-sanskrit font-medium text-amber-200/95 max-w-2xl px-3 mx-auto leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
            {t('hero.subtitle')}
          </p>
        </motion.div>

        {/* 4 Visual Feature Pills (Super Easy to Understand at a Glance) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-1"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-[11px] sm:text-xs font-bold shadow-sm">
            {t('hero.statFree')}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/15 border border-red-500/35 text-red-300 text-[11px] sm:text-xs font-bold shadow-sm">
            {t('hero.statSos')}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/15 border border-yellow-500/35 text-yellow-300 text-[11px] sm:text-xs font-bold shadow-sm">
            {t('hero.statJapa')}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-[11px] sm:text-xs font-bold shadow-sm">
            {t('hero.statBooks')}
          </span>
        </motion.div>

      </div>
    </section>
  );
}
