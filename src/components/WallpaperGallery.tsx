import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download, Eye, Lock, Flame, Check, X,
  Sparkles, ArrowDownToLine, Shield, Zap
} from 'lucide-react';
import { getStoredStreak } from '../streakStore';

export interface DayWallpaper {
  day: number;
  headline: string;
  subtext: string;
  imageUrl: string;
  accentColor: string;
  author: string;
  theme: string;
}

// Master catalogue of curated cinematic images & bold quotes for streak days
const CURATED_WALLPAPERS: Record<number, Omit<DayWallpaper, 'day'>> = {
  1: {
    headline: 'DREAMS REQUIRE SACRIFICES',
    subtext: 'STEP ONE INTO THE FIRE',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#f59e0b',
    author: 'Vedic Warrior Creed',
    theme: 'Dark Knight & Steel Resolve',
  },
  2: {
    headline: 'WE ARE WHAT WE FOCUS ON',
    subtext: 'DIRECT YOUR ATTENTION',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#a855f7',
    author: 'Marcus Aurelius & Gita',
    theme: 'Cosmic Mental Clarity',
  },
  3: {
    headline: 'INVEST IN YOURSELF',
    subtext: 'WISDOM OVER IMPULSE',
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#38bdf8',
    author: 'Ancient Vedic Sages',
    theme: 'Sacred Sanctuary of Knowledge',
  },
  4: {
    headline: 'TRAIN INSANE',
    subtext: 'OR REMAIN THE SAME',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#ef4444',
    author: 'Iron Sadhana',
    theme: 'Barbell & Relentless Effort',
  },
  5: {
    headline: 'KEEP MOVING',
    subtext: 'DO NOT LOOK BACK',
    imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#10b981',
    author: 'Swami Vivekananda',
    theme: 'Dawn Stairs Ascent',
  },
  6: {
    headline: 'BUILD AN EMPIRE',
    subtext: 'CONQUER YOUR SENSES',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#fbbf24',
    author: 'Ramayana & Chanakya Niti',
    theme: 'Obsidian City Sovereignty',
  },
  7: {
    headline: 'SOAR ABOVE THE STORM',
    subtext: 'ONE FULL WEEK OF PURITY',
    imageUrl: 'https://images.unsplash.com/photo-1519074069444-1ba4ea16e886?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#60a5fa',
    author: 'Sri Hanuman Stotram',
    theme: 'Supersonic Jet Above Clouds',
  },
  8: {
    headline: 'AWAKEN YOUR AURA',
    subtext: 'THE POWER OF URDHVA-RETAS',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#ec4899',
    author: 'Patanjali Yoga Sutras',
    theme: 'Super Saiyan Energy Fire',
  },
  9: {
    headline: 'CONQUER YOUR MIND',
    subtext: 'STILLNESS IS SUPREME STRENGTH',
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#8b5cf6',
    author: 'Bhagavad Gita 6.5',
    theme: 'Mountain Peak Meditation',
  },
  10: {
    headline: 'DISCIPLINE EQUALS FREEDOM',
    subtext: 'DOUBLE DIGITS OF VICTORY',
    imageUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#06b6d4',
    author: 'Vedic Code',
    theme: 'Ocean Lighthouse Storm',
  },
  11: {
    headline: 'THE LION NEVER RETREATS',
    subtext: 'UNSHAKEABLE SELF RESPECT',
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#f59e0b',
    author: 'Lion Mindset',
    theme: 'Golden Apex Predator',
  },
  12: {
    headline: 'SILENCE YOUR EXCUSES',
    subtext: 'THE FIGHT IS WON WITHIN',
    imageUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#f97316',
    author: 'Championship Protocol',
    theme: 'Spotlight Boxing Ring',
  },
  13: {
    headline: 'FORGE INNER STEEL',
    subtext: 'TEMPERED IN SOLITUDE',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#fb923c',
    author: 'Vedic Blacksmith Creed',
    theme: 'Glowing Anvil & Flame',
  },
  14: {
    headline: 'TWO WEEKS REBORN',
    subtext: 'NEUROCHEMICAL CLARITY',
    imageUrl: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#10b981',
    author: 'Neuroscience of Celibacy',
    theme: 'Radiant Sunrise Dawn',
  },
  15: {
    headline: 'RISE LIKE A TITAN',
    subtext: 'STANDING TALL IN THE STORM',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#e11d48',
    author: 'Titan Sadhana',
    theme: 'Electric Aura Surge',
  },
  21: {
    headline: 'HABIT REWIRED',
    subtext: 'OLD CHAINS ARE BROKEN',
    imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#6366f1',
    author: 'Samurai Code of Bushido',
    theme: 'Moonlit Katana Blade',
  },
  30: {
    headline: 'OJAS MASTER',
    subtext: 'ONE MONTH OF DIVINE SHAKTI',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#eab308',
    author: 'Charaka Samhita',
    theme: 'Sacred Temple Starlight',
  },
  60: {
    headline: 'UNSHAKEABLE WILL',
    subtext: 'HIGHER CHAKRA AWAKENING',
    imageUrl: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#8b5cf6',
    author: 'Kundalini Tantra',
    theme: 'Cosmic Horizon Lightning',
  },
  90: {
    headline: 'REWRITE YOUR DESTINY',
    subtext: 'COMPLETE CELLULAR REBIRTH',
    imageUrl: 'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#f59e0b',
    author: 'Supreme Siddha',
    theme: 'Royal Crown on Obsidian',
  },
  100: {
    headline: 'CENTURY OF MASTERY',
    subtext: '100 DAYS OF AKHAND TEJAS',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#fbbf24',
    author: 'Celestial Chariot',
    theme: 'Cosmic Earth Orbit & Starlight',
  },
  124: {
    headline: 'TRANSMUTED CONQUEROR',
    subtext: 'MASTERY OF THE HIGHER CENTURY',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#ec4899',
    author: 'Yogic Siddhi',
    theme: 'Misty Alpine Citadel',
  },
  125: {
    headline: 'VIBRATIONAL DOMINANCE',
    subtext: 'ENERGY AT SUPREME FREQUENCY',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#38bdf8',
    author: 'Super Saiyan Mindset',
    theme: 'Ultra Instinct Aura',
  },
  131: {
    headline: 'SUPREME SOVEREIGNTY',
    subtext: 'ABOVE ALL LOWER DISTRACTIONS',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#10b981',
    author: 'Himalayan Hermit',
    theme: 'Snow Summit Apex Peak',
  },
  141: {
    headline: 'AKHAND BRAHMACHARYA',
    subtext: 'THE GOLDEN IMMORTAL FORCE',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#f59e0b',
    author: 'Sri Krishna & Hanuman Ji',
    theme: 'Golden Cosmic Radiance',
  },
};

// Fallback generator for high streak days or days in between
function getWallpaperDataForDay(day: number): DayWallpaper {
  if (CURATED_WALLPAPERS[day]) {
    return { day, ...CURATED_WALLPAPERS[day] };
  }

  const fallbackImages = [
    'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1519074069444-1ba4ea16e886?auto=format&fit=crop&w=1080&q=80',
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1080&q=80',
  ];

  const fallbackQuotes = [
    { headline: 'RELENTLESS EXCELLENCE', subtext: 'TRANSMUTED WARRIOR', color: '#f59e0b' },
    { headline: 'INVINCIBLE FOCUS', subtext: 'MASTERY OF RETENTION', color: '#a855f7' },
    { headline: 'UNBREAKABLE SPIRIT', subtext: 'NO COMPROMISE', color: '#10b981' },
    { headline: 'DIVINE MAGNETISM', subtext: 'OJAS ILLUMINATION', color: '#fbbf24' },
    { headline: 'WARRIOR INTELLECT', subtext: 'SUPREME DETACHMENT', color: '#38bdf8' },
    { headline: 'STEEL DISCIPLINE', subtext: 'CONQUERING THE SENSES', color: '#ec4899' },
  ];

  const quote = fallbackQuotes[day % fallbackQuotes.length];
  const image = fallbackImages[day % fallbackImages.length];

  return {
    day,
    headline: quote.headline,
    subtext: `${quote.subtext} • DAY ${day}`,
    imageUrl: image,
    accentColor: quote.color,
    author: 'Akhand Brahmacharya',
    theme: `Day ${day} Transmutation`,
  };
}

export default function WallpaperGallery() {
  const [streakDays, setStreakDays] = useState(8);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'milestones'>('all');
  const [previewItem, setPreviewItem] = useState<DayWallpaper | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Sync with global streak store
  useEffect(() => {
    const current = getStoredStreak();
    setStreakDays(current.days);

    const handleStreakChange = (e: any) => {
      if (e.detail?.days !== undefined) {
        setStreakDays(e.detail.days);
      }
    };

    window.addEventListener('streak-updated', handleStreakChange);
    return () => window.removeEventListener('streak-updated', handleStreakChange);
  }, []);

  // Build the list of cards:
  // Show EVERY day unlocked from Day 1 to streakDays (in order)
  // PLUS the next upcoming locked days (up to 4-6 upcoming locked days)
  const unlockedDays = Array.from({ length: Math.max(1, streakDays) }, (_, i) => i + 1);

  // Upcoming locked days to preview future motivation
  const upcomingLockedDays = [
    streakDays + 1,
    streakDays + 2,
    streakDays + 3,
    streakDays + 4,
    streakDays <= 14 ? 14 : streakDays <= 21 ? 21 : streakDays <= 30 ? 30 : streakDays <= 60 ? 60 : 90,
  ].filter((d, idx, arr) => d > streakDays && arr.indexOf(d) === idx).slice(0, 4);

  const allDisplayDays = [...unlockedDays, ...upcomingLockedDays];

  // Apply active tab filter
  const displayedDays = filter === 'unlocked'
    ? unlockedDays
    : filter === 'milestones'
    ? [1, 3, 7, 10, 14, 21, 30, 60, 90].filter(d => d <= streakDays || upcomingLockedDays.includes(d))
    : allDisplayDays;

  // Render high-resolution 1080x1920 Ultra HD wallpaper on canvas and trigger direct download
  const handleDownload = (item: DayWallpaper) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = item.imageUrl;

    img.onload = () => {
      // 1. Draw base photo
      ctx.drawImage(img, 0, 0, 1080, 1920);

      // 2. Dark vignette & contrast gradient overlay
      const grad = ctx.createLinearGradient(0, 0, 0, 1920);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
      grad.addColorStop(0.85, 'rgba(0, 0, 0, 0.85)');
      grad.addColorStop(1, 'rgba(2, 4, 10, 0.98)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1080, 1920);

      // 3. Stamped Top Day Badge
      ctx.fillStyle = item.accentColor;
      ctx.beginPath();
      ctx.roundRect(540 - 140, 280, 280, 60, [30]);
      ctx.fill();

      ctx.fillStyle = '#02040a';
      ctx.font = 'bold 30px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`DAY ${item.day}`, 540, 322);

      // 4. Center-Bottom Main Bold Motivational Headline
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 68px "Cinzel", Impact, sans-serif';
      const words = item.headline.split(' ');
      let line = '';
      let y = 1350;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > 920 && n > 0) {
          ctx.fillText(line, 540, y);
          line = words[n] + ' ';
          y += 85;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 540, y);

      // 5. Subtitle
      ctx.fillStyle = item.accentColor;
      ctx.font = 'bold 32px sans-serif';
      ctx.fillText(item.subtext, 540, y + 65);

      // 6. Bottom Branding
      ctx.fillStyle = '#a1a1aa';
      ctx.font = '24px sans-serif';
      ctx.fillText('BRAHMACHARYA MITRA • ULTRA-HD MOTIVATION', 540, 1830);

      // Trigger instant download
      const link = document.createElement('a');
      link.download = `Brahmacharya-Day${item.day}-${item.headline.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    };

    // If image fails or cross-origin blocks, download crisp typography canvas
    img.onerror = () => {
      ctx.fillStyle = '#02040a';
      ctx.fillRect(0, 0, 1080, 1920);

      ctx.fillStyle = item.accentColor;
      ctx.font = 'bold 34px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`DAY ${item.day}`, 540, 400);

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 72px "Cinzel", sans-serif';
      ctx.fillText(item.headline, 540, 900);

      ctx.fillStyle = item.accentColor;
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText(item.subtext, 540, 980);

      const link = document.createElement('a');
      link.download = `Brahmacharya-Day${item.day}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
  };

  return (
    <section id="wallpapers" className="py-16 sm:py-20 relative w-full max-w-full overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>MDF Motivation Progression Gallery</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight text-balance break-words">
            Daily Streak{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent metallic-gold-text">
              Wallpaper Unlocks
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-zinc-300 text-balance break-words">
            Every day of Brahmacharya unlocks a dedicated cinematic wallpaper with high-impact motivational quotes. Currently unlocked up to <strong className="text-amber-400">Day {streakDays}</strong>.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-5 text-xs font-bold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-full transition cursor-pointer ${
                filter === 'all'
                  ? 'bg-amber-400 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              All Progression ({allDisplayDays.length})
            </button>
            <button
              onClick={() => setFilter('unlocked')}
              className={`px-3.5 py-1.5 rounded-full transition cursor-pointer flex items-center gap-1.5 ${
                filter === 'unlocked'
                  ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
              <span>Unlocked ({unlockedDays.length})</span>
            </button>
            <button
              onClick={() => setFilter('milestones')}
              className={`px-3.5 py-1.5 rounded-full transition cursor-pointer ${
                filter === 'milestones'
                  ? 'bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              Milestones
            </button>
          </div>
        </motion.div>

        {/* ── 2-Column Portrait Grid (Matching Reference Screenshot) ── */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 w-full">
          {displayedDays.map((dayNum) => {
            const item = getWallpaperDataForDay(dayNum);
            const isUnlocked = dayNum <= streakDays;

            return (
              <motion.div
                key={dayNum}
                whileHover={isUnlocked ? { scale: 1.02, y: -3 } : {}}
                whileTap={isUnlocked ? { scale: 0.98 } : {}}
                onClick={() => {
                  if (isUnlocked) {
                    setPreviewItem(item);
                  }
                }}
                className={`relative rounded-3xl overflow-hidden border transition-all duration-300 aspect-[9/14] sm:aspect-[9/13] flex flex-col justify-between p-3.5 sm:p-5 select-none shadow-xl ${
                  isUnlocked
                    ? 'border-zinc-800/80 hover:border-amber-400/80 shadow-[0_0_20px_rgba(0,0,0,0.8)] cursor-pointer group'
                    : 'border-zinc-850 border-zinc-800/40 opacity-70 cursor-not-allowed'
                }`}
              >
                {/* Background Image */}
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${
                    isUnlocked
                      ? 'group-hover:scale-105'
                      : 'filter blur-[3px] brightness-40 grayscale-[30%]'
                  }`}
                  style={{ backgroundImage: `url('${item.imageUrl}')` }}
                />

                {/* Dark Vignette Overlay for Crisp Typography Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/35 pointer-events-none" />

                {/* ── TOP BADGE: Stamped Day [X] (Matching Reference Screenshot) ── */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <span
                    className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-black tracking-wider uppercase shadow-md flex items-center gap-1 ${
                      isUnlocked
                        ? 'bg-black/60 backdrop-blur-md border border-white/20 text-amber-300'
                        : 'bg-zinc-950/80 border border-zinc-700/60 text-zinc-400'
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>Day {dayNum}</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3 text-zinc-400" />
                        <span>Day {dayNum}</span>
                      </>
                    )}
                  </span>

                  {isUnlocked ? (
                    <span className="p-1.5 rounded-full bg-black/50 backdrop-blur-md text-zinc-300 group-hover:text-amber-400 transition shadow-sm">
                      <Eye className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="p-1 rounded-full bg-black/70 text-zinc-500">
                      <Lock className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                {/* ── CENTER LOCK OVERLAY FOR LOCKED DAYS ── */}
                {!isUnlocked && (
                  <div className="relative z-20 flex flex-col items-center justify-center text-center p-3 my-auto">
                    <div className="w-10 h-10 rounded-2xl bg-zinc-900/90 border border-zinc-700 flex items-center justify-center text-amber-400 mb-2 shadow-lg">
                      <Lock className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-black text-white tracking-wide uppercase">
                      Unlocks on Day {dayNum}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-amber-400/90 font-semibold mt-0.5">
                      {dayNum - streakDays} {dayNum - streakDays === 1 ? 'day' : 'days'} to go
                    </span>
                  </div>
                )}

                {/* ── BOTTOM: Bold Uppercase Motivational Quote (Matching Reference Screenshot) ── */}
                <div className="relative z-10 text-left">
                  <h3 className={`text-sm xs:text-base sm:text-xl font-black font-cinzel leading-tight tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] text-balance break-words ${
                    isUnlocked ? 'text-white' : 'text-zinc-400'
                  }`}>
                    {item.headline}
                  </h3>

                  <p className="text-[9px] xs:text-[10px] sm:text-xs font-bold text-amber-300 tracking-wider mt-1 truncate uppercase">
                    {item.subtext}
                  </p>

                  {isUnlocked && (
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/10 text-[9px] sm:text-xs text-zinc-300">
                      <span className="text-zinc-400 font-medium truncate">{item.theme}</span>
                      <span className="text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        <span>Save</span>
                        <span>→</span>
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* ── Fullscreen HD Preview & Download Modal ── */}
      <AnimatePresence>
        {previewItem && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-3xl border-2 border-amber-500/60 p-5 sm:p-6 shadow-[0_0_80px_rgba(0,0,0,0.95),0_0_40px_rgba(245,158,11,0.25)] relative overflow-hidden flex flex-col items-center text-center space-y-4"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(2,4,10,0.98) 0%, rgba(2,4,10,0.7) 50%, rgba(2,4,10,0.5) 100%), url('${previewItem.imageUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setPreviewItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-zinc-300 hover:text-white transition shadow-md z-20 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Day Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-zinc-950 font-black text-xs shadow-lg uppercase tracking-wider z-10">
                <Flame className="w-3.5 h-3.5 fill-black" />
                <span>DAY {previewItem.day} ACHIEVED</span>
              </div>

              {/* Headline */}
              <div className="z-10 pt-2">
                <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-white tracking-tight drop-shadow-lg text-balance break-words">
                  {previewItem.headline}
                </h3>
                <p className="text-xs sm:text-sm font-bold text-amber-300 tracking-widest mt-1 uppercase">
                  {previewItem.subtext}
                </p>
              </div>

              {/* Details Quote Card */}
              <div className="p-3.5 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-md max-w-xs text-left z-10">
                <p className="text-xs text-zinc-200 italic leading-relaxed">
                  “The price of greatness is responsibility over your own energy. Keep your streak intact.”
                </p>
                <span className="text-[10px] font-bold text-amber-400 block mt-2">
                  — {previewItem.author}
                </span>
              </div>

              {/* Download & Close Buttons */}
              <div className="w-full flex items-center gap-2 pt-2 z-10">
                <button
                  onClick={() => setPreviewItem(null)}
                  className="flex-1 py-3 rounded-2xl bg-zinc-900/90 text-xs font-bold text-zinc-300 hover:text-white transition cursor-pointer"
                >
                  Close
                </button>

                <button
                  onClick={() => handleDownload(previewItem)}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:scale-105 transition cursor-pointer"
                >
                  {downloadSuccess ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
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
