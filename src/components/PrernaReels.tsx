import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Film, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react';

interface TelegramReelProps {
  post: string;
}

function TelegramReelItem({ post }: TelegramReelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.innerHTML = '';
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-post', post);
    script.setAttribute('data-width', '100%');
    el.appendChild(script);
  }, [post]);

  return (
    <div 
      className="snap-start shrink-0 w-full h-[660px] flex items-center justify-center relative rounded-2xl overflow-hidden bg-black border border-zinc-800/80 shadow-inner"
    >
      <div 
        ref={containerRef} 
        className="w-full h-full flex items-center justify-center overflow-y-auto no-scrollbar p-2"
      />
    </div>
  );
}

// ── To add new reels, simply append post IDs here: 'brahmacharyahelp/<post_number>' ──
const DEFAULT_REELS = [
  'brahmacharyahelp/637',
  // 'brahmacharyahelp/638',
];

export default function PrernaReels() {
  const [reels, setReels] = useState<string[]>(DEFAULT_REELS);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: 660, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: -660, behavior: 'smooth' });
    }
  };

  return (
    <section id="reels" className="py-16 sm:py-24 relative overflow-hidden">
      
      {/* Ambient Cosmic Purple & Amber Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(245,158,11,0.12)_0%,rgba(109,40,217,0.14)_45%,transparent_70%)] blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span>Vedic Shorts & Daily Inspiration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-wide">
            Brahmacharya{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">
              Prerna Reels
            </span>
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Short, potent bursts of Brahmacharya wisdom, motivational reminders, and celibacy teachings to fuel your daily Tapasya.
          </p>
        </div>

        {/* Vertical Swipable Reel Container (Phone Mockup Frame) */}
        <div className="relative group">
          
          {/* Subtle Outer Glowing Frame */}
          <div className="absolute -inset-1.5 bg-gradient-to-b from-amber-500/30 via-indigo-500/20 to-amber-500/30 rounded-[2.5rem] blur-lg opacity-70 group-hover:opacity-100 transition duration-500 pointer-events-none" />

          <div className="relative w-[340px] xs:w-[380px] h-[680px] rounded-[2rem] bg-zinc-950 border-2 border-amber-500/40 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.2)] p-2.5 flex flex-col overflow-hidden">
            
            {/* Top Phone Notch / Status Accent */}
            <div className="w-full flex items-center justify-between px-3 py-1.5 border-b border-zinc-800/80 mb-2 shrink-0">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Prerna Feed</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono tracking-wider">
                @brahmacharyahelp
              </span>
            </div>

            {/* Scrollable Reel Viewport */}
            <div 
              ref={scrollContainerRef}
              className="w-full flex-1 overflow-y-scroll snap-y snap-mandatory rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl no-scrollbar space-y-4 p-1"
            >
              {reels.map((post) => (
                <TelegramReelItem key={post} post={post} />
              ))}
            </div>

            {/* Bottom Swipe Cue / Quick Controls */}
            <div className="pt-2 flex items-center justify-between px-2 text-[11px] text-zinc-400 shrink-0">
              <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                <span>↕</span> Swipe to navigate
              </span>

              <div className="flex items-center gap-1">
                <button 
                  onClick={scrollPrev} 
                  className="p-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
                  aria-label="Previous Reel"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button 
                  onClick={scrollNext} 
                  className="p-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
                  aria-label="Next Reel"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Telegram Direct Channel Link */}
        <div className="mt-8 text-center">
          <a
            href="https://t.me/brahmacharyahelp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-amber-500/30 hover:border-amber-400 text-xs font-bold text-amber-300 hover:text-amber-200 transition shadow-sm group cursor-pointer"
          >
            <span>Explore More on Telegram Channel</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
