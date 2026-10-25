import React from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  ShieldAlert, 
  Brain, 
  Sparkles, 
  ArrowRight, 
  Calculator
} from 'lucide-react';
import { useTranslation } from '../i18n';
import LiquidAuroraCanvas from './LiquidAuroraCanvas';

export default function Hero() {
  const { t } = useTranslation();

  const triggerPanic = () => {
    window.dispatchEvent(new CustomEvent('open-panic-modal'));
  };

  return (
    <section
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 md:pt-40 md:pb-28 overflow-hidden"
      style={{
        background: '#02040a',
      }}
    >
      {/* ── Active Hero Background Image: 1000469239.jpg ── */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-[1.02]"
        style={{ backgroundImage: "url('/1000469239.jpg')" }}
      />

      {/* ── Deep Obsidian Black Gradient Tint (#02040a) ── */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#02040a]/90 via-[#02040a]/75 to-[#02040a]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#02040a]/85 via-transparent to-[#02040a]/85" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_35%,rgba(109,40,217,0.22)_0%,rgba(245,158,11,0.12)_45%,rgba(2,4,10,0.95)_80%)]" />
      
      {/* ── 21st.dev Style Active Flowing Liquid Aurora Shader Canvas Background ── */}
      <LiquidAuroraCanvas />

      {/* ── Floating Cyber Amber & Cosmic Embers visual elements ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-24 left-[15%] w-2 h-2 rounded-full bg-amber-400/80 blur-[1px] animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-48 right-[18%] w-3 h-3 rounded-full bg-indigo-500/70 blur-[1px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-[25%] w-2.5 h-2.5 rounded-full bg-yellow-300/60 blur-[1px] animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/3 right-[10%] w-2 h-2 rounded-full bg-amber-500/60 blur-[1px] animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
        
        {/* Divine Badge with Rotating Border Beam */}
        <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-beam-badge backdrop-blur-3xl bg-zinc-950/70 border border-white/10 hover:border-amber-400/80 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] text-amber-300 text-xs sm:text-sm font-semibold tracking-wider mb-6 transition-all duration-300 max-w-full"
        >
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span className="truncate">{t.hero.badge}</span>
        </motion.div>

        {/* Bilingual Main Headline with 21st.dev Glowing Lens Flare */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 mb-6 relative w-full"
        >
          <div className="text-base sm:text-2xl lg:text-3xl font-sanskrit text-amber-300/90 font-medium tracking-wide drop-shadow-[0_0_15px_rgba(245,158,11,0.35)] px-2">
            ब्रह्मचर्य मित्र • Brahmacharya Mitra
          </div>

          {/* Clean wrapping on mobile: max-w-full px-2 sm:px-4 break-words text-balance */}
          <h1 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-cinzel tracking-tight text-white max-w-full px-2 sm:px-4 mx-auto leading-[1.18] sm:leading-[1.15] relative text-balance break-words">
            <span className="block text-zinc-100 drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
              {t.hero.title1}
            </span>
            
            {/* High-Intensity Glow Lens Flare & Glowing Prism Headline (21st.dev Style) */}
            <span className="relative inline-block my-1.5 px-2 sm:px-6 max-w-full break-words">
              <span className="lens-flare-beam" />
              <span className="lens-flare-orb" />
              <span className="relative z-10 block bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-500 bg-clip-text text-transparent metallic-gold-text drop-shadow-[0_0_35px_rgba(245,158,11,0.6)]">
                {t.hero.title2}
              </span>
            </span>

            <span className="block mt-1 text-zinc-100 drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
              {t.hero.title3}
            </span>
          </h1>
        </motion.div>

        {/* Hindi / Regional Subheadline with mobile wrap */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm xs:text-base sm:text-xl md:text-2xl font-sanskrit font-medium text-amber-200/95 max-w-full px-3 sm:px-4 mx-auto leading-relaxed drop-shadow-[0_2px_15px_rgba(245,158,11,0.3)] text-balance break-words"
        >
          {t.hero.subheadlineHindi}
        </motion.p>

        {/* Core Value Proposition with mobile wrap */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-zinc-300 max-w-3xl px-3 sm:px-4 mx-auto leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)] text-balance break-words"
        >
          {t.hero.description}
        </motion.p>

        {/* Interactive Liquid Glass Cards & CTAs with 21st.dev Glowing Border Beams and Framer Motion Micro-Interactions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 sm:mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 max-w-full px-3 sm:px-4 mx-auto w-full"
        >
          {/* Streak Counter CTA with Rotating Border Beam */}
          <motion.a
            href="#streak"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-full sm:w-auto border-beam-badge btn-shimmer flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-2xl backdrop-blur-3xl bg-zinc-950/70 border border-amber-500/30 hover:border-amber-400 text-amber-200 hover:text-white font-black text-sm sm:text-base tracking-wide shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] transition-all cursor-pointer text-center text-balance break-words"
          >
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400 flex-shrink-0" />
            <span>{t.hero.startStreakBtn}</span>
            <ArrowRight className="w-4 h-4 ml-0.5 text-amber-400 flex-shrink-0" />
          </motion.a>

          {/* Emergency Panic Mode Button */}
          <motion.button
            onClick={triggerPanic}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl backdrop-blur-3xl bg-red-950/45 hover:bg-red-950/70 border border-red-500/60 hover:border-red-400 text-red-200 hover:text-white font-bold text-sm sm:text-base tracking-wide shadow-[0_0_25px_rgba(239,68,68,0.3)] hover:shadow-[0_0_40px_rgba(239,68,68,0.55)] transition-all cursor-pointer text-center text-balance break-words"
          >
            <ShieldAlert className="w-5 h-5 text-red-400 animate-pulse flex-shrink-0" />
            <span>{t.hero.panicBtn}</span>
          </motion.button>

          {/* Brain Fog Test CTA */}
          <motion.a
            href="#brain-fog"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl backdrop-blur-3xl bg-zinc-950/60 hover:bg-zinc-900/80 border border-zinc-700/60 hover:border-amber-400/80 hover:shadow-[0_0_30px_rgba(245,158,11,0.35)] text-zinc-200 hover:text-white font-semibold text-sm sm:text-base transition-all cursor-pointer text-center text-balance break-words"
          >
            <Brain className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <span>{t.hero.brainFogBtn}</span>
          </motion.a>

          {/* Calculator CTA */}
          <motion.a
            href="#calculator"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl backdrop-blur-3xl bg-zinc-950/60 hover:bg-zinc-900/80 border border-zinc-700/60 hover:border-amber-400/80 hover:shadow-[0_0_30px_rgba(245,158,11,0.35)] text-zinc-300 hover:text-amber-300 text-xs sm:text-sm font-medium transition-all cursor-pointer text-center text-balance break-words"
          >
            <Calculator className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>{t.hero.calculatorBtn}</span>
          </motion.a>
        </motion.div>

        {/* Live Credibility Statistics Grid - Framer Motion Micro-Interactions on all Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-8 border-t border-amber-500/20"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="p-4 rounded-2xl backdrop-blur-3xl bg-zinc-950/65 border border-white/10 hover:border-amber-400/80 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-all duration-300 glass-card-lift cursor-default"
          >
            <div className="text-2xl sm:text-3xl font-extrabold font-cinzel text-amber-400">
              {t.hero.stat1Number}
            </div>
            <div className="text-xs text-zinc-400 font-medium mt-1">
              {t.hero.stat1Label}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="p-4 rounded-2xl backdrop-blur-3xl bg-zinc-950/65 border border-white/10 hover:border-amber-400/80 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-all duration-300 glass-card-lift cursor-default"
          >
            <div className="text-2xl sm:text-3xl font-extrabold font-cinzel text-amber-300">
              {t.hero.stat2Number}
            </div>
            <div className="text-xs text-zinc-400 font-medium mt-1">
              {t.hero.stat2Label}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="p-4 rounded-2xl backdrop-blur-3xl bg-zinc-950/65 border border-white/10 hover:border-amber-400/80 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-all duration-300 glass-card-lift cursor-default"
          >
            <div className="text-2xl sm:text-3xl font-extrabold font-cinzel text-yellow-300">
              {t.hero.stat3Number}
            </div>
            <div className="text-xs text-zinc-400 font-medium mt-1">
              {t.hero.stat3Label}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="p-4 rounded-2xl backdrop-blur-3xl bg-zinc-950/65 border border-white/10 hover:border-amber-400/80 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-all duration-300 glass-card-lift cursor-default"
          >
            <div className="text-2xl sm:text-3xl font-extrabold font-cinzel text-emerald-400">
              {t.hero.stat4Number}
            </div>
            <div className="text-xs text-zinc-400 font-medium mt-1">
              {t.hero.stat4Label}
            </div>
          </motion.div>
        </motion.div>

      </div>

    </section>
  );
}
