import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Film, Image as ImageIcon, FileText, Sparkles, Heart, Share2,
  Volume2, VolumeX, Play, Pause, Download, ExternalLink,
  Search, RefreshCw, Check, Maximize2, X, MessageCircle,
  Flame, Shield, ChevronDown, ChevronUp, Quote, Copy
} from 'lucide-react';

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

interface TelegramFeedProps {
  initialPosts?: TelegramFeedItem[];
  apiUrl?: string;
}

export default function TelegramFeed({
  initialPosts = [],
  apiUrl = 'http://localhost:5050/api/feed',
}: TelegramFeedProps) {
  const [posts, setPosts] = useState<TelegramFeedItem[]>(initialPosts);
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'image' | 'text'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'live' | 'cache' | 'syncing'>('syncing');
  const [lightboxImage, setLightboxImage] = useState<TelegramFeedItem | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch latest synced posts from MongoDB API or local public/data/telegram_feed.json
  const fetchFeed = async () => {
    setIsLoading(true);
    setSyncStatus('syncing');

    // 1. Try local MongoDB / REST service
    try {
      const res = await fetch(apiUrl, { mode: 'cors' });
      if (res.ok) {
        const json = await res.json();
        const data = Array.isArray(json) ? json : json.data;
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
          setSyncStatus('live');
          setIsLoading(false);
          showToast('Synced live feed from Telegram database! ✨');
          return;
        }
      }
    } catch {}

    // 2. Try static public/data/telegram_feed.json
    try {
      const base = (typeof window !== 'undefined' && window.location.pathname.startsWith('/brahmacharya-mitra'))
        ? '/brahmacharya-mitra'
        : '';
      const staticRes = await fetch(`${base}/data/telegram_feed.json?t=${Date.now()}`);
      if (staticRes.ok) {
        const staticData = await staticRes.json();
        if (Array.isArray(staticData) && staticData.length > 0) {
          setPosts(staticData);
          setSyncStatus('cache');
          setIsLoading(false);
          showToast('Loaded latest telegram_feed.json archive! ✨');
          return;
        }
      }
    } catch {}

    if (initialPosts.length > 0) {
      setPosts(initialPosts);
      setSyncStatus('cache');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleLike = (id: number) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = async (item: TelegramFeedItem) => {
    const shareText = `${item.text_content ? item.text_content.slice(0, 100) + '...' : 'Brahmacharya Mitra Prerna'}\n\nJoin our brotherhood: https://t.me/brahmacharyahelp`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Brahmacharya Mitra Post',
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {}
    }
    navigator.clipboard.writeText(shareText);
    showToast('Link & quote copied to clipboard! ✨');
  };

  // Filter posts
  const filteredPosts = posts.filter(item => {
    const matchesTab = activeTab === 'all' || item.content_type === activeTab;
    const matchesSearch = !searchQuery.trim() ||
      (item.text_content && item.text_content.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.author_name && item.author_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesTab && matchesSearch;
  });

  const videoCount = posts.filter(p => p.content_type === 'video').length;
  const imageCount = posts.filter(p => p.content_type === 'image').length;
  const textCount = posts.filter(p => p.content_type === 'text').length;
  const videoPosts = posts.filter(p => p.content_type === 'video');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 text-zinc-100 select-none">
      
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

      {/* Hero Header */}
      <div className="relative mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" />
          <span>Telegram Feed • @brahmacharyahelp</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black font-cinzel tracking-tight text-white mb-3">
          Sadhak <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">Prerna Media</span> Hub
        </h2>

        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
          Synchronized motivation reels, high-resolution Vedic posters, and sacred notes streamed directly from Telegram group <span className="text-amber-300 font-mono text-xs">@brahmacharyahelp</span>.
        </p>

        {/* Sync Status Badge & Refresh Button */}
        <div className="mt-4 flex items-center justify-center gap-3 text-xs">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400">
            <span className={`w-2 h-2 rounded-full ${syncStatus === 'live' ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
            <span>{syncStatus === 'live' ? 'Connected to Live Telegram Sync' : 'Serving telegram_feed.json'}</span>
          </div>
          <button
            onClick={fetchFeed}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            title="Refresh Feed"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar with the 4 Exact Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-zinc-950/70 p-3 sm:p-4 rounded-2xl border border-zinc-800/80 backdrop-blur-xl">
        {/* Segmented Filter Tabs: "All", "Reels/Videos", "Images", "Notes" */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {[
            { id: 'all', label: 'All', icon: Sparkles, count: posts.length },
            { id: 'video', label: 'Reels/Videos', icon: Film, count: videoCount },
            { id: 'image', label: 'Images', icon: ImageIcon, count: imageCount },
            { id: 'text', label: 'Notes', icon: FileText, count: textCount },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.35)] scale-102'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-zinc-950' : 'text-amber-400'}`} />
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isActive ? 'bg-zinc-950/25 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search #tags, keywords..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9.5 pr-8 py-2 bg-zinc-900/90 border border-zinc-800 focus:border-amber-500 rounded-xl text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Content Layout based on Tabs */}
      {filteredPosts.length === 0 ? (
        <div className="py-20 text-center bg-zinc-950/40 rounded-3xl border border-dashed border-zinc-800">
          <Sparkles className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-zinc-300 mb-1">No matching synced posts found</h3>
          <p className="text-zinc-500 text-xs sm:text-sm max-w-md mx-auto">
            {searchQuery ? `No results for "${searchQuery}". Try clearing search.` : 'Incoming messages from Telegram Group will appear here once synced.'}
          </p>
        </div>
      ) : activeTab === 'video' ? (
        /* 2. REELS / VIDEOS TAB: Full-Screen Vertical Swipe Reels Player */
        <VerticalSwipeReelsPlayer
          videoPosts={videoPosts}
          likedPosts={likedPosts}
          onToggleLike={handleToggleLike}
          onShare={handleShare}
        />
      ) : activeTab === 'image' ? (
        /* 3. IMAGES TAB: High-Resolution Motivational Poster Cards */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <ImagePosterCard
              key={post.telegram_message_id}
              post={post}
              onOpenLightbox={() => setLightboxImage(post)}
              isLiked={!!likedPosts[post.telegram_message_id]}
              onToggleLike={() => handleToggleLike(post.telegram_message_id)}
              onShare={() => handleShare(post)}
            />
          ))}
        </div>
      ) : activeTab === 'text' ? (
        /* 4. NOTES TAB: Glassmorphic Quote Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map(post => (
            <TextQuoteCard
              key={post.telegram_message_id}
              post={post}
              isLiked={!!likedPosts[post.telegram_message_id]}
              onToggleLike={() => handleToggleLike(post.telegram_message_id)}
              onShare={() => handleShare(post)}
              showToast={showToast}
            />
          ))}
        </div>
      ) : (
        /* 5. ALL TAB: Unified Dynamic Feed */
        <div className="space-y-10">
          {/* Top Reels Highlight Carousel if videos exist */}
          {videoPosts.length > 0 && (
            <div className="p-6 rounded-3xl bg-zinc-950/70 border border-amber-500/25 relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-sm text-white uppercase tracking-wider">
                    Featured Motivation Reels
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('video')}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Open Full-Screen Player</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <div className="flex justify-center">
                <VerticalSwipeReelsPlayer
                  videoPosts={videoPosts}
                  likedPosts={likedPosts}
                  onToggleLike={handleToggleLike}
                  onShare={handleShare}
                />
              </div>
            </div>
          )}

          {/* Mixed Images and Quotes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {filteredPosts
              .filter(p => p.content_type !== 'video')
              .map(post => {
                if (post.content_type === 'image') {
                  return (
                    <div key={post.telegram_message_id} className="md:col-span-1">
                      <ImagePosterCard
                        post={post}
                        onOpenLightbox={() => setLightboxImage(post)}
                        isLiked={!!likedPosts[post.telegram_message_id]}
                        onToggleLike={() => handleToggleLike(post.telegram_message_id)}
                        onShare={() => handleShare(post)}
                      />
                    </div>
                  );
                }
                return (
                  <div key={post.telegram_message_id} className="md:col-span-1">
                    <TextQuoteCard
                      post={post}
                      isLiked={!!likedPosts[post.telegram_message_id]}
                      onToggleLike={() => handleToggleLike(post.telegram_message_id)}
                      onShare={() => handleShare(post)}
                      showToast={showToast}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* High-Resolution Poster Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full bg-zinc-950 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 hover:bg-black text-white transition-colors cursor-pointer border border-white/20"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* High-Res Image View */}
              <div className="flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px]">
                <img
                  src={lightboxImage.media_url}
                  alt={lightboxImage.text_content || 'Motivational Poster'}
                  className="max-h-[85vh] w-auto object-contain"
                />
              </div>

              {/* Sidebar Details */}
              <div className="w-full md:w-80 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-zinc-800 bg-zinc-950">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                      Topic #{lightboxImage.topic_id}
                    </span>
                    <span className="text-zinc-500 text-xs">
                      {new Date(lightboxImage.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-zinc-200 text-sm whitespace-pre-line leading-relaxed mb-4">
                    {lightboxImage.text_content}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {lightboxImage.tags?.map((tag, i) => (
                      <span key={i} className="text-xs text-amber-400/90 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                  <a
                    href={lightboxImage.media_url}
                    target="_blank"
                    rel="noreferrer"
                    download
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-bold text-xs transition-colors hover:from-amber-300 hover:to-amber-400 shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download HD</span>
                  </a>
                  <button
                    onClick={() => handleShare(lightboxImage)}
                    className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// ---------------------------------------------------------
// Sub-Component: Full-Screen Vertical Swipe Reels Player
// (snap-y snap-mandatory, overflow-y-scroll, no-scrollbar)
// ---------------------------------------------------------
function VerticalSwipeReelsPlayer({
  videoPosts,
  likedPosts,
  onToggleLike,
  onShare,
}: {
  videoPosts: TelegramFeedItem[];
  likedPosts: Record<number, boolean>;
  onToggleLike: (id: number) => void;
  onShare: (item: TelegramFeedItem) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeReelIndex, setActiveReelIndex] = useState(0);

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
            video.play().catch(() => {});
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
  }, [videoPosts]);

  return (
    <div className="relative w-full max-w-[380px] sm:max-w-[400px] h-[680px] sm:h-[720px] rounded-[2.2rem] bg-zinc-950 border-2 border-amber-500/40 shadow-[0_0_60px_rgba(0,0,0,0.95),0_0_35px_rgba(245,158,11,0.2)] overflow-hidden flex flex-col mx-auto">
      
      {/* Top Status Overlay */}
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

        <div className="px-2.5 py-1 rounded-full bg-black/60 border border-white/20 text-[10px] text-zinc-300 font-mono">
          {activeReelIndex + 1} / {videoPosts.length}
        </div>
      </div>

      {/* Swipable Reel Viewport (snap-y snap-mandatory, overflow-y-scroll, no-scrollbar) */}
      <div
        ref={containerRef}
        className="w-full h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar bg-black relative"
      >
        {videoPosts.map((post, index) => {
          const isLiked = !!likedPosts[post.telegram_message_id];
          return (
            <div
              key={post.telegram_message_id}
              data-index={index}
              className="reel-slide snap-start relative w-full h-full flex items-center justify-center bg-black shrink-0 overflow-hidden"
            >
              {/* Native HTML5 Video Player: Full Height, Object Cover, Auto-Looping */}
              <video
                src={post.media_url}
                className="w-full h-full object-cover select-none"
                controls={true}
                loop
                playsInline
                preload="metadata"
              />

              {/* Right Side Vertical Action Rail */}
              <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4.5 pointer-events-auto">
                {/* Like Button */}
                <button
                  onClick={() => onToggleLike(post.telegram_message_id)}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-full backdrop-blur-md border border-white/15 flex items-center justify-center transition-all duration-300 shadow-lg active:scale-90 ${
                    isLiked ? 'bg-red-500/20 text-red-500 border-red-500/50' : 'bg-black/60 text-white hover:border-red-500/60'
                  }`}>
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-200 mt-1">
                    {(post.likes || 1200) + (isLiked ? 1 : 0)}
                  </span>
                </button>

                {/* Share Button */}
                <button
                  onClick={() => onShare(post)}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/15 group-hover:border-amber-400/60 flex items-center justify-center transition-all duration-300 shadow-lg active:scale-90">
                    <Share2 className="w-5 h-5 text-white group-hover:text-amber-300" />
                  </div>
                  <span className="text-[10px] font-bold text-zinc-200 mt-1">
                    {post.shares || 340}
                  </span>
                </button>

                {/* Telegram Message ID Badge */}
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shadow-lg" title="Telegram Message ID">
                  <span className="text-[10px] font-mono font-black text-amber-300">#{post.telegram_message_id}</span>
                </div>
              </div>

              {/* Glassmorphism Bottom Overlay with Handle and Caption */}
              <div className="absolute bottom-4 left-3 right-16 z-20 pointer-events-none">
                <div className="pointer-events-auto bg-black/60 backdrop-blur-xl p-3.5 rounded-2xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)] space-y-1.5 transition-all">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-amber-300 tracking-wide">
                      @brahmacharyahelp
                    </span>
                    <span className="px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[9px] font-bold border border-amber-500/30">
                      Topic #{post.topic_id}
                    </span>
                  </div>

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
  );
}

// ---------------------------------------------------------
// Sub-Component: Motivational Poster Card (Image)
// ---------------------------------------------------------
function ImagePosterCard({
  post,
  onOpenLightbox,
  isLiked,
  onToggleLike,
  onShare,
}: {
  post: TelegramFeedItem;
  onOpenLightbox: () => void;
  isLiked: boolean;
  onToggleLike: () => void;
  onShare: () => void;
}) {
  return (
    <div className="relative rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-500/50 hover:shadow-[0_0_35px_rgba(245,158,11,0.2)] transition-all duration-300 overflow-hidden shadow-xl group flex flex-col justify-between">
      {/* Poster Image Container */}
      <div
        onClick={onOpenLightbox}
        className="relative aspect-[4/5] sm:aspect-square overflow-hidden bg-black cursor-pointer"
      >
        <img
          src={post.media_url}
          alt={post.text_content || 'Poster'}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-amber-500/50 text-amber-300 font-semibold text-xs shadow-lg">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>View Fullscreen Poster</span>
          </span>
        </div>

        {/* Topic Badge with Amber Highlight */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-amber-500/40 text-amber-400 text-[10px] font-bold">
            Topic #{post.topic_id}
          </span>
        </div>
      </div>

      {/* Caption & Actions */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <p className="text-zinc-300 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-3">
          {post.text_content}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-zinc-900 text-xs text-zinc-500">
          <span className="font-medium text-amber-300/90">{post.author_name}</span>
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleLike}
              className={`flex items-center gap-1 cursor-pointer transition-colors ${
                isLiked ? 'text-red-400 font-bold' : 'hover:text-zinc-300'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{(post.likes || 24) + (isLiked ? 1 : 0)}</span>
            </button>
            <button
              onClick={onShare}
              className="hover:text-amber-400 transition-colors cursor-pointer"
              title="Share Poster"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// Sub-Component: Glassmorphism Quote & Note Card (Text)
// ---------------------------------------------------------
function TextQuoteCard({
  post,
  isLiked,
  onToggleLike,
  onShare,
  showToast,
}: {
  post: TelegramFeedItem;
  isLiked: boolean;
  onToggleLike: () => void;
  onShare: () => void;
  showToast: (m: string) => void;
}) {
  const copyQuote = () => {
    navigator.clipboard.writeText(post.text_content);
    showToast('Sacred quote copied to clipboard!');
  };

  return (
    <div className="relative rounded-2xl p-6 bg-gradient-to-br from-zinc-900/90 via-zinc-950/85 to-zinc-900/90 border border-amber-500/25 hover:border-amber-400/60 backdrop-blur-xl shadow-xl transition-all duration-300 flex flex-col justify-between group">
      {/* Decorative Golden Quotation Watermark */}
      <Quote className="absolute top-4 right-4 w-12 h-12 text-amber-500/10 group-hover:text-amber-500/20 transition-colors pointer-events-none" />

      <div>
        {/* Header Tags */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[11px] font-bold">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Sadhana Wisdom &bull; Topic #{post.topic_id}</span>
          </div>
          <span className="text-zinc-500 text-[11px]">
            {new Date(post.timestamp).toLocaleDateString()}
          </span>
        </div>

        {/* Quote Content with Gold Border */}
        <div className="text-zinc-100 text-sm sm:text-base font-serif italic whitespace-pre-line leading-relaxed mb-6 border-l-2 border-amber-400/80 pl-3.5">
          {post.text_content}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag, i) => (
              <span key={i} className="text-xs text-amber-400/90 font-medium">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Author & Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-[10px]">
            ॐ
          </div>
          <span className="text-zinc-300 font-medium">{post.author_name}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyQuote}
            className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-amber-300 transition-colors cursor-pointer text-xs flex items-center gap-1"
            title="Copy Quote"
          >
            <Copy className="w-3 h-3 text-amber-400" />
            <span>Copy</span>
          </button>
          <button
            onClick={onToggleLike}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isLiked
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          <button
            onClick={onShare}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-amber-400 transition-colors cursor-pointer"
            title="Share"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
