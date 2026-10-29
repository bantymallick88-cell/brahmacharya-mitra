import React, { useRef, useEffect } from 'react';

interface Reel {
  id: string | number;
  src: string;
  title: string;
  creator: string;
}

const DEFAULT_REELS: Reel[] = [
  {
    id: 1,
    src: 'https://example.com/reel1.mp4',
    title: 'Akhand Brahmacharya Power & Tapasya 🔥',
    creator: '@brahmacharyahelp',
  },
  {
    id: 2,
    src: 'https://example.com/reel2.mp4',
    title: 'Daily Discipline Motivation 🙏',
    creator: '@brahmacharyahelp',
  },
  // To add more reels, add objects here:
  // {
  //   id: 3,
  //   src: 'https://example.com/reel3.mp4',
  //   title: 'Transmutation of Ojas & Tejas ⚡',
  //   creator: '@brahmacharyahelp',
  // },
];

export default function PrernaReels() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const videos = container.querySelectorAll<HTMLVideoElement>('video');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (!entry.isIntersecting) {
            video.pause();
          }
        });
      },
      { root: container, threshold: 0.6 }
    );

    videos.forEach((v) => observer.observe(v));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="reels" className="flex flex-col items-center justify-center py-12 sm:py-20 bg-[#02040a] text-white select-none relative overflow-hidden">
      {/* Ambient Cosmic Purple & Amber Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(245,158,11,0.12)_0%,rgba(109,40,217,0.14)_45%,transparent_70%)] blur-3xl pointer-events-none -z-10" />

      {/* Title Header */}
      <div className="text-center mb-6 px-4">
        <span className="bg-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full border border-amber-500/30 uppercase tracking-wider inline-block shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          ✨ VEDIC SHORTS & DAILY INSPIRATION
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 tracking-wide text-amber-100 font-cinzel">
          BRAHMACHARYA PRERNA REELS
        </h2>
        <p className="text-xs text-zinc-400 mt-2 max-w-md mx-auto">
          Swipe vertically to explore daily reels, celibacy reminders & masculine vitality clips.
        </p>
      </div>

      {/* Outer Glow Frame Wrapper */}
      <div className="relative group px-4">
        <div className="absolute -inset-1.5 bg-gradient-to-b from-amber-500/25 via-indigo-500/15 to-amber-500/25 rounded-[2.5rem] blur-lg opacity-70 group-hover:opacity-100 transition duration-500 pointer-events-none" />

        {/* Swipable Reel Player Container */}
        <div
          ref={containerRef}
          className="w-[320px] xs:w-[360px] h-[640px] bg-zinc-950 rounded-3xl overflow-y-scroll snap-y snap-mandatory border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.15)] relative no-scrollbar"
        >
          {DEFAULT_REELS.map((reel, index) => (
            <div
              key={reel.id}
              className="snap-start w-full h-full relative flex items-center justify-center bg-black shrink-0"
            >
              <video
                className="w-full h-full object-cover rounded-3xl"
                controls
                loop
                playsInline
                preload="metadata"
                poster="photo_mahadev.jpg"
              >
                <source src={reel.src} type="video/mp4" />
              </video>

              {/* Bottom Info Overlay */}
              <div className="absolute bottom-6 left-4 right-4 flex justify-between items-end z-10 pointer-events-none">
                <div className="pointer-events-auto bg-black/60 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 w-full shadow-lg">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-amber-400">{reel.creator}</p>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">
                      Reel {index + 1}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-200 mt-1 font-medium">{reel.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Helper Navigation & Telegram Link */}
      <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 text-center">
        <span className="text-xs text-zinc-400 flex items-center gap-1.5 font-medium">
          <span>↕</span> <span>Swipe up/down inside player to change reel</span>
        </span>

        <span className="text-zinc-600 hidden sm:inline">•</span>

        <a
          href="https://t.me/brahmacharyahelp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-amber-400 hover:text-amber-300 transition flex items-center gap-1 hover:underline underline-offset-4"
        >
          <span>Join Telegram @brahmacharyahelp</span>
          <span>↗</span>
        </a>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
