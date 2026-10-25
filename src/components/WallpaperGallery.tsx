import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image as ImageIcon, Download, Eye, Sparkles, Check,
  X, Flame, Shield, ArrowDownToLine, Smartphone
} from 'lucide-react';

interface MotivationWallpaper {
  id: string;
  headline: string;
  subtext: string;
  theme: string;
  symbol: string;
  bgGradient: string;
  accentColor: string;
  quote: string;
  author: string;
}

const ULTRA_WALLPAPERS: MotivationWallpaper[] = [
  {
    id: 'w_train_insane',
    headline: 'TRAIN INSANE',
    subtext: 'OR REMAIN THE SAME',
    theme: 'Physical Transmutation',
    symbol: '⚡',
    bgGradient: 'from-amber-500 via-rose-950 to-black',
    accentColor: '#f59e0b',
    quote: 'Suffer the temporary burn of discipline, or suffer the eternal poison of relapse.',
    author: 'Vedic Warrior Creed',
  },
  {
    id: 'w_keep_moving',
    headline: 'KEEP MOVING',
    subtext: 'DO NOT LOOK BACK',
    theme: 'Mental Resilience',
    symbol: '🔱',
    bgGradient: 'from-purple-600 via-indigo-950 to-black',
    accentColor: '#a855f7',
    quote: 'When your lower senses scream for cheap pleasure, that is when you take one more step.',
    author: 'Swami Vivekananda',
  },
  {
    id: 'w_empire',
    headline: 'BUILD AN EMPIRE',
    subtext: 'CONTROL YOUR DESIRE',
    theme: 'Royal Sovereignty',
    symbol: '👑',
    bgGradient: 'from-yellow-500 via-amber-950 to-black',
    accentColor: '#eab308',
    quote: 'He who conquers a thousand men in battle is great, but he who conquers himself is the supreme victor.',
    author: 'Dhammapada & Gita',
  },
  {
    id: 'w_unstoppable',
    headline: 'BE UNSTOPPABLE',
    subtext: 'OJAS OVER IMPULSE',
    theme: 'Chakra Kundalini',
    symbol: '🔥',
    bgGradient: 'from-red-600 via-orange-950 to-black',
    accentColor: '#ef4444',
    quote: 'Every drop of vital energy preserved today becomes invincible intellect tomorrow.',
    author: 'Charaka Samhita',
  },
  {
    id: 'w_discipline',
    headline: 'DISCIPLINE',
    subtext: 'EQUALS TRUE FREEDOM',
    theme: 'Brahma Muhurta',
    symbol: '🌅',
    bgGradient: 'from-cyan-500 via-blue-950 to-black',
    accentColor: '#06b6d4',
    quote: 'True freedom is not doing whatever lust dictates. True freedom is commanding the mind at will.',
    author: 'Patanjali Yoga Sutra',
  },
  {
    id: 'w_relentless',
    headline: 'RELENTLESS',
    subtext: 'THE LION NEVER QUITS',
    theme: 'Akhand Celibacy',
    symbol: '🦁',
    bgGradient: 'from-emerald-500 via-zinc-950 to-black',
    accentColor: '#10b981',
    quote: 'Stand like an iron pillar in the storm of cheap stimulation. You are born for supreme greatness.',
    author: 'Sri Hanuman Stotram',
  },
];

export default function WallpaperGallery() {
  const [streakDays, setStreakDays] = useState(7);
  const [previewItem, setPreviewItem] = useState<MotivationWallpaper | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bm_streak_days');
      if (saved) setStreakDays(parseInt(saved, 10));
    } catch {}

    const handleStreak = (e: any) => {
      if (e.detail?.days !== undefined) setStreakDays(e.detail.days);
    };
    window.addEventListener('streak-updated', handleStreak);
    return () => window.removeEventListener('streak-updated', handleStreak);
  }, []);

  const handleDownloadUltraHD = (item: MotivationWallpaper) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dark Background Base
    ctx.fillStyle = '#02040a';
    ctx.fillRect(0, 0, 1080, 1920);

    // Glowing Radial Aura
    const rad = ctx.createRadialGradient(540, 750, 80, 540, 750, 720);
    rad.addColorStop(0, item.accentColor + '70');
    rad.addColorStop(0.5, item.accentColor + '20');
    rad.addColorStop(1, '#02040a');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, 1080, 1920);

    // Tech Grid pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 2;
    for (let x = 0; x <= 1080; x += 90) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1920);
      ctx.stroke();
    }
    for (let y = 0; y <= 1920; y += 90) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1080, y);
      ctx.stroke();
    }

    // Dynamic Active Streak Day Badge (Overlayed in 4K)
    ctx.fillStyle = item.accentColor;
    ctx.beginPath();
    ctx.roundRect(540 - 150, 420, 300, 70, [35]);
    ctx.fill();

    ctx.fillStyle = '#02040a';
    ctx.font = 'bold 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`🔥 DAY ${streakDays} CLEAN`, 540, 467);

    // Symbol Icon
    ctx.font = '150px serif';
    ctx.fillText(item.symbol, 540, 680);

    // Bold Headline
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 78px "Cinzel", Impact, sans-serif';
    ctx.fillText(item.headline, 540, 820);

    // Subtext
    ctx.fillStyle = item.accentColor;
    ctx.font = 'bold 36px sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText(item.subtext, 540, 890);

    // Quote Box
    ctx.fillStyle = '#f4f4f6';
    ctx.font = 'italic 38px Georgia, serif';
    const words = item.quote.split(' ');
    let line = '';
    let y = 1120;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 880 && n > 0) {
        ctx.fillText(line, 540, y);
        line = words[n] + ' ';
        y += 55;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 540, y);

    // Author
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '30px sans-serif';
    ctx.fillText(`— ${item.author}`, 540, y + 80);

    // Bottom Branding Watermark
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 28px "Cinzel", serif';
    ctx.fillText('BRAHMACHARYA MITRA • ULTRA HD', 540, 1820);

    // Download Trigger
    const link = document.createElement('a');
    link.download = `Brahmacharya-Day${streakDays}-${item.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <section id="wallpapers" className="py-16 sm:py-20 relative w-full max-w-full overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <ImageIcon className="w-4 h-4 text-amber-400" />
            <span>MDF Ultra-HD Motivation Wallpapers</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight text-balance break-words">
            Dynamic Streak{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent metallic-gold-text">
              Wallpaper Gallery
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-zinc-300 text-balance break-words">
            Custom-rendered motivational posters dynamically stamped with your live streak (Day {streakDays}). Tap any poster to preview or download in 4K resolution for lock screen armor.
          </p>
        </motion.div>

        {/* ── 2-Column Portrait Grid (Matching 2nd Screenshot) ── */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 w-full">
          {ULTRA_WALLPAPERS.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setPreviewItem(item)}
              className={`relative rounded-3xl overflow-hidden border border-zinc-800/80 hover:border-amber-400/70 transition-all duration-300 shadow-xl group cursor-pointer bg-gradient-to-b ${item.bgGradient} aspect-[3/4] flex flex-col justify-between p-3.5 sm:p-5`}
            >
              {/* Top Dynamic User Streak Overlay Badge (Matching 2nd Screenshot) */}
              <div className="flex items-center justify-between w-full z-10">
                <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-black text-amber-300 shadow-md flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>Day {streakDays}</span>
                </span>

                <span className="p-1.5 rounded-full bg-black/50 backdrop-blur-md text-zinc-300 group-hover:text-amber-400 transition">
                  <Eye className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Center Symbol with breathing glow */}
              <div className="my-auto text-center z-10 py-2">
                <span className="text-3xl sm:text-5xl drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] block mb-1">
                  {item.symbol}
                </span>
              </div>

              {/* Bottom Bold Headline & Motivational Text */}
              <div className="z-10 text-left">
                <h3 className="text-sm xs:text-base sm:text-xl font-black font-cinzel text-white leading-tight drop-shadow-md">
                  {item.headline}
                </h3>
                <p className="text-[9px] xs:text-[10px] sm:text-xs font-bold text-amber-300 tracking-wider mt-0.5 truncate">
                  {item.subtext}
                </p>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                  <span className="text-[8px] sm:text-[10px] text-zinc-300 truncate">{item.theme}</span>
                  <span className="text-[9px] sm:text-xs text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform">
                    Tap to save →
                  </span>
                </div>
              </div>

              {/* Subtle glass reflection overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-0" />
            </motion.div>
          ))}
        </div>

      </div>

      {/* ── Ultra HD Full-Screen Wallpaper Preview Modal ── */}
      <AnimatePresence>
        {previewItem && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-sm rounded-3xl border-2 border-amber-500/60 p-6 sm:p-7 shadow-[0_0_80px_rgba(0,0,0,0.95),0_0_40px_rgba(245,158,11,0.25)] relative bg-gradient-to-b ${previewItem.bgGradient} flex flex-col items-center text-center space-y-4`}
            >
              {/* Close Button */}
              <button
                onClick={() => setPreviewItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-zinc-300 hover:text-white transition"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Dynamic User Active Streak Stamped Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-amber-400/50 text-amber-300 text-xs font-black shadow-lg">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>DYNAMIC WATERMARK: DAY {streakDays}</span>
              </div>

              {/* Symbol */}
              <span className="text-5xl my-1 drop-shadow-xl">{previewItem.symbol}</span>

              {/* Title */}
              <div>
                <h3 className="text-2xl font-black font-cinzel text-white tracking-wide">
                  {previewItem.headline}
                </h3>
                <p className="text-xs font-bold text-amber-300 tracking-widest mt-0.5">
                  {previewItem.subtext}
                </p>
              </div>

              {/* Quote Card */}
              <div className="p-4 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-md max-w-xs text-left">
                <p className="text-xs text-zinc-200 italic leading-relaxed">
                  “{previewItem.quote}”
                </p>
                <span className="text-[11px] font-bold text-amber-400 block mt-2">
                  — {previewItem.author}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex items-center gap-2.5 pt-2">
                <button
                  onClick={() => setPreviewItem(null)}
                  className="flex-1 py-3 rounded-2xl bg-zinc-900/90 text-xs font-bold text-zinc-300 hover:text-white transition"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownloadUltraHD(previewItem)}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:scale-105 transition cursor-pointer"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Saved in HD!</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownToLine className="w-4 h-4" />
                      <span>Download HD</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
