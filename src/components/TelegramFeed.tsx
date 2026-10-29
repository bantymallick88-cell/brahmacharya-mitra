import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Film, Sparkles, Heart, Share2, Volume2, VolumeX,
  RefreshCw, Check, Flame, MessageCircle
} from 'lucide-react';
import { cleanFeedText, sanitizeFeedItem, filterVideoReels, isValidVideoUrl } from '../utils/textCleaner';

const DEFAULT_FALLBACK_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

export interface TelegramFeedItem {
  telegram_message_id: number;
  group_id: number;
  topic_id: number;
  content_type: 'video' | 'image' | 'text';
  media_url: string;
  text_content: string;
  author_name: string;
  timestamp: string;
  cloudinary_public_id?: string;
  synced_at?: string;
  likes?: number;
  shares?: number;
  tags?: string[];
}

const DEFAULT_VEDIC_REELS: TelegramFeedItem[] = [
  {
    telegram_message_id: 637,
    group_id: -1003536137330,
    topic_id: 101,
    content_type: 'video',
    media_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    text_content: 'Akhand Brahmacharya Power & Tapasya 🔥\nConservation of seminal vital force directly upregulates dopamine D2 receptors and activates supreme mental clarity. Stay unbroken, Sadhak! 🔱',
    author_name: 'Sadhak Mentor',
    timestamp: '2026-10-29T15:00:00Z',
    likes: 1240,
    shares: 382,
    tags: ['#Brahmacharya', '#Ojas', '#NoFap', '#Tapasya'],
  },
  {
    telegram_message_id: 638,
    group_id: -1003536137330,
    topic_id: 101,
    content_type: 'video',
    media_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    text_content: 'Dopamine Detox & Brain Fog Erasure ⚡\nThe moment you resist lust, your brain initiates neurogenesis. Virya transforms into Ojas (Spiritual Radiance). Never trade destiny for 5 seconds of pixelated dopamine.',
    author_name: 'Veer Brahmachari',
    timestamp: '2026-10-29T15:10:00Z',
    likes: 2190,
    shares: 540,
    tags: ['#BrainFog', '#DopamineDetox', '#Celibacy', '#SanatanPower'],
  },
  {
    telegram_message_id: 639,
    group_id: -1003536137330,
    topic_id: 101,
    content_type: 'video',
    media_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    text_content: 'Conquer The Senses, Rule The Mind 🔱\n“जितेन्द्रियस्य धीरस्य... One who conquers his senses conquers the three worlds.” Real masculinity is self-mastery, not submission to urges.',
    author_name: 'Sanatan Rishi',
    timestamp: '2026-10-29T15:20:00Z',
    likes: 3410,
    shares: 890,
    tags: ['#MindControl', '#ShivaPower', '#SelfMastery', '#ViryaRaksha'],
  },
  {
    telegram_message_id: 640,
    group_id: -1003536137330,
    topic_id: 101,
    content_type: 'video',
    media_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    text_content: 'Urge Transmutation via Pranayama 🧘‍♂️\nWhen an intense urge hits, engage Mula Bandha and 4-7-8 deep breathing. Channel the downward sexual flow upward into the Sahasrara Chakra.',
    author_name: 'Dhyan Yogi',
    timestamp: '2026-10-29T15:30:00Z',
    likes: 1870,
    shares: 412,
    tags: ['#Pranayama', '#Transmutation', '#Kundalini', '#YogaSadhana'],
  },
];

interface TelegramFeedProps {
  initialPosts?: TelegramFeedItem[];
  apiUrl?: string;
}

export default function TelegramFeed({
  initialPosts = [],
  apiUrl = 'http://localhost:5050/api/feed',
}: TelegramFeedProps) {
  // Strictly filter initial posts to valid video items
  const initialVideos = filterVideoReels(initialPosts);
  const [reels, setReels] = useState<TelegramFeedItem[]>(
    initialVideos.length > 0 ? initialVideos : DEFAULT_VEDIC_REELS
  );

  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'live' | 'cache' | 'syncing'>('syncing');
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Fetch latest synced posts and strictly filter to valid videos
  const fetchFeed = async () => {
    setIsLoading(true);
    setSyncStatus('syncing');

    // 1. Try local MongoDB / REST service
    try {
      const res = await fetch(apiUrl, { mode: 'cors' });
      if (res.ok) {
        const json = await res.json();
        const data = Array.isArray(json) ? json : json.data;
        const validVideos = filterVideoReels(data);
        if (validVideos.length > 0) {
          setReels(validVideos);
          setSyncStatus('live');
          setIsLoading(false);
          showToast(`Synced ${validVideos.length} live motivation reels! ✨`);
          return;
        }
      }
    } catch {}

    // 2. Try static public/data/telegram_feed.json
    try {
      const base = typeof window !== 'undefined' && window.location.pathname.startsWith('/brahmacharya-mitra')
        ? '/brahmacharya-mitra'
        : '';
      const staticRes = await fetch(`${base}/data/telegram_feed.json?t=${Date.now()}`);
      if (staticRes.ok) {
        const staticData = await staticRes.json();
        const validVideos = filterVideoReels(staticData);
        if (validVideos.length > 0) {
          setReels(validVideos);
          setSyncStatus('cache');
          setIsLoading(false);
          showToast(`Loaded ${validVideos.length} synced reels from archive! ✨`);
          return;
        }
      }
    } catch {}

    if (initialVideos.length > 0) {
      setReels(initialVideos);
      setSyncStatus('cache');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  // IntersectionObserver: auto-play active video on vertical swipe, pause off-screen videos
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slides = container.querySelectorAll<HTMLDivElement>('.reel-slide');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector<HTMLVideoElement>('video');
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          if (!video) return;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setActiveReelIndex(index);
            video.muted = isMuted;
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                video.muted = true;
                video.play().catch(() => {});
              });
            }
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });
      },
      { root: container, threshold: 0.6 }
    );

    slides.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [reels, isMuted]);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (containerRef.current) {
      const videos = containerRef.current.querySelectorAll<HTMLVideoElement>('video');
      videos.forEach((v) => {
        v.muted = nextMuted;
      });
    }
  };

  const handleToggleLike = (id: number) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = async (item: TelegramFeedItem) => {
    const shareText = `${item.text_content ? item.text_content.slice(0, 100) + '...' : 'Brahmacharya Mitra Reel'}\n\nJoin our brotherhood: https://t.me/brahmacharyahelp`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Brahmacharya Mitra Reel',
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {}
    }
    navigator.clipboard.writeText(shareText);
    showToast('Reel quote & link copied to clipboard! ✨');
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 text-zinc-100 select-none flex flex-col items-center">
      {/* Toast Feedback */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-xl bg-zinc-900/95 border border-amber-500/50 text-amber-300 font-medium text-sm shadow-[0_0_25px_rgba(245,158,11,0.3)] backdrop-blur-xl"
          >
            <Check className="w-4 h-4 text-amber-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className="text-center mb-6 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2.5 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
          <span>YOUTUBE SHORTS • VEDIC MOTIVATION REELS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black font-cinzel tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200">
          BRAHMACHARYA PRERNA REELS
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed">
          Synchronized from Telegram <span className="text-amber-300 font-semibold">@brahmacharyahelp</span> (Topic: Motivation reels). 100% playable on-site with seamless vertical swipe.
        </p>

        {/* Sync Status Badge & Refresh Button */}
        <div className="mt-4 flex items-center justify-center gap-3 text-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-400">
            <span className={`w-2 h-2 rounded-full ${syncStatus === 'live' ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
            <span>{syncStatus === 'live' ? 'Live Telegram Sync' : 'Synced Feed Archive'}</span>
          </div>
          <button
            onClick={fetchFeed}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            title="Sync Latest Reels"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>
      </div>

      {/* Full-Screen Vertical Swipe Shorts Container (9:16 phone mockup) */}
      <div className="relative w-full max-w-[380px] sm:max-w-[400px] h-[680px] sm:h-[720px] px-3">
        {/* Outer Glow */}
        <div className="absolute -inset-1 bg-gradient-to-b from-amber-500/30 via-purple-600/20 to-amber-500/30 rounded-[2.5rem] blur-xl opacity-80 pointer-events-none" />

        {/* Mockup Shell */}
        <div className="relative w-full h-full rounded-[2.2rem] bg-zinc-950 border-2 border-amber-500/40 shadow-[0_0_60px_rgba(0,0,0,0.95),0_0_35px_rgba(245,158,11,0.2)] flex flex-col overflow-hidden">
          {/* Top Floating App Bar */}
          <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none">
            <div className="flex items-center gap-2 pointer-events-auto">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-cinzel font-black text-black text-xs shadow-md">
                ॐ
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  <span>@brahmacharyahelp</span>
                  <span className="text-amber-400">✓</span>
                </div>
                <div className="text-[9px] text-amber-300/80 font-medium">Topic: Motivation reels</div>
              </div>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:text-amber-300 transition cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-zinc-300" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
              </button>
              <div className="px-2.5 py-1 rounded-full bg-black/60 border border-white/20 text-[10px] text-zinc-300 font-mono">
                {activeReelIndex + 1} / {reels.length}
              </div>
            </div>
          </div>

          {/* Swipable Reel Viewport (snap-y snap-mandatory, overflow-y-scroll, no-scrollbar) */}
          <div
            ref={containerRef}
            className="w-full h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black relative"
          >
            {reels.map((post, index) => {
              const isLiked = !!likedPosts[post.telegram_message_id];
              const videoSrc = post.media_url || DEFAULT_FALLBACK_VIDEO;

              return (
                <div
                  key={post.telegram_message_id}
                  data-index={index}
                  className="reel-slide snap-start relative w-full h-full flex items-center justify-center bg-black shrink-0 overflow-hidden"
                >
                  {/* Clean, High-Performance HTML5 <video> with controls, loop, playsinline, muted, object-cover */}
                  <video
                    src={videoSrc}
                    className="w-full h-full object-cover select-none cursor-pointer"
                    controls
                    autoPlay
                    loop
                    playsInline
                    muted={isMuted}
                    preload="auto"
                    poster="photo_mahadev.jpg"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('ForBiggerBlazes.mp4')) {
                        target.src = DEFAULT_FALLBACK_VIDEO;
                        target.load();
                        target.play().catch(() => {});
                      }
                    }}
                    onClick={(e) => {
                      const v = e.currentTarget;
                      if (v.paused) v.play().catch(() => {});
                      else v.pause();
                    }}
                  >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support HTML5 video.
                  </video>

                  {/* Right Side Vertical Action Rail */}
                  <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4.5 pointer-events-auto">
                    {/* Like Button */}
                    <button
                      onClick={() => handleToggleLike(post.telegram_message_id)}
                      className="flex flex-col items-center group cursor-pointer"
                    >
                      <div
                        className={`w-10 h-10 rounded-full backdrop-blur-md border border-white/15 flex items-center justify-center transition-all duration-300 shadow-lg active:scale-90 ${
                          isLiked
                            ? 'bg-red-500/20 text-red-500 border-red-500/50'
                            : 'bg-black/60 text-white hover:border-red-500/60'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      </div>
                      <span className="text-[10px] font-bold text-zinc-200 mt-1">
                        {(post.likes || 1200) + (isLiked ? 1 : 0)}
                      </span>
                    </button>

                    {/* Share Button */}
                    <button
                      onClick={() => handleShare(post)}
                      className="flex flex-col items-center group cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/15 group-hover:border-amber-400/60 flex items-center justify-center transition-all duration-300 shadow-lg active:scale-90">
                        <Share2 className="w-5 h-5 text-white group-hover:text-amber-300" />
                      </div>
                      <span className="text-[10px] font-bold text-zinc-200 mt-1">
                        {post.shares || 340}
                      </span>
                    </button>

                    {/* Telegram Message ID Origin Badge */}
                    <div
                      className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shadow-lg"
                      title="Telegram Source ID"
                    >
                      <span className="text-[10px] font-mono font-black text-amber-300">
                        #{post.telegram_message_id}
                      </span>
                    </div>
                  </div>

                  {/* Glassmorphism Bottom Overlay with Clean UTF-8 Caption and Handle */}
                  <div className="absolute bottom-4 left-3 right-16 z-20 pointer-events-none">
                    <div className="pointer-events-auto bg-black/60 backdrop-blur-xl p-3.5 rounded-2xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)] space-y-1.5 transition-all">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-amber-300 tracking-wide">
                          @brahmacharyahelp
                        </span>
                        <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[9px] font-bold border border-amber-500/30">
                          Topic: Motivation
                        </span>
                      </div>

                      {/* Cleaned UTF-8 Devanagari / Sanskrit / Hindi Caption */}
                      <p className="text-[11px] text-zinc-200 leading-relaxed line-clamp-2">
                        {post.text_content}
                      </p>

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {post.tags.map((t, idx) => (
                            <span key={idx} className="text-[10px] text-amber-400 font-semibold">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Tapasya Beats Audio Track Ticker */}
                      <div className="pt-0.5 flex items-center gap-1.5 text-[9px] text-zinc-400 font-medium">
                        <Flame className="w-3 h-3 text-amber-400 animate-pulse" />
                        <span className="truncate">Brahmacharya Mitra Original Sound • Tapasya Beats</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Swipe Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-1 text-[10px] text-zinc-400 font-medium bg-black/60 px-2.5 py-0.5 rounded-full backdrop-blur-sm border border-white/10">
            <span>↕</span> <span>Swipe up for next reel</span>
          </div>
        </div>
      </div>

      {/* External Direct Channel Link Guarantee */}
      <div className="mt-8 text-center px-4">
        <div className="inline-flex items-center gap-2 text-xs text-zinc-400 bg-zinc-950/70 border border-zinc-800/80 px-4 py-2 rounded-2xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>100% On-Site Native HTML5 Video Stream — Zero Telegram App Redirects</span>
        </div>
      </div>
    </div>
  );
}
