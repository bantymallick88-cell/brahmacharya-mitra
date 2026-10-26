import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  ExternalLink,
  Star,
  Sparkles,
  ShoppingBag,
  ShoppingCart,
  Quote,
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { RECOMMENDED_BOOKS, type RecommendedBook } from '../config/affiliate';
import { useTranslation } from '../i18n';

export default function BookRecommendations() {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      setScrollProgress(progress);
    }
  };

  return (
    <section id="books" className="py-20 relative w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Essential Scripture & Modern Science</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight text-balance">
            Foundational Books for{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent metallic-gold-text">
              Brahmacharya & Mind Mastery
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-zinc-300 text-balance">
            Handpicked transformative literature to rewire dopamine pathways, transmute sexual energy into Ojas, and build unshakeable self-mastery.
          </p>
        </motion.div>

        {/* ── Horizontal Scroll Top Control Row ── */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Swipe horizontally to explore all 6 books ({RECOMMENDED_BOOKS.length} Titles)</span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-850 border border-amber-500/30 hover:border-amber-400 text-amber-300 transition-all cursor-pointer active:scale-95 shadow-sm"
              aria-label="Scroll books left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-850 border border-amber-500/30 hover:border-amber-400 text-amber-300 transition-all cursor-pointer active:scale-95 shadow-sm"
              aria-label="Scroll books right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── 6 Books Horizontal Scroll Carousel ── */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex flex-row overflow-x-auto gap-4 scrollbar-none pb-3 px-1 scroll-smooth"
          style={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',
            gap: '16px',
            scrollSnapType: 'x mandatory',
            paddingBottom: '12px',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {RECOMMENDED_BOOKS.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              style={{
                flex: '0 0 285px',
                minWidth: '275px',
                maxWidth: '305px',
                scrollSnapAlign: 'start',
              }}
              className="p-5 sm:p-6 rounded-3xl backdrop-blur-3xl bg-zinc-950/80 border border-amber-500/25 hover:border-amber-400/70 hover:shadow-[0_0_40px_rgba(245,158,11,0.25)] transition-all duration-300 flex flex-col justify-between shadow-2xl group shrink-0"
            >
              <div>
                {/* Top Badge & Rating Row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${book.badgeColor} shadow-sm`}>
                    {book.badge}
                  </span>
                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 text-xs font-bold drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{book.rating}</span>
                  </div>
                </div>

                {/* Book Title & Author */}
                <h3 className="text-lg font-bold font-cinzel text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                  {book.title}
                </h3>
                <div className="text-xs text-amber-400/90 font-semibold mt-1.5 flex items-center gap-1.5 truncate">
                  <span>By {book.author}</span>
                </div>

                {/* ── Inspiring Motivational Quote Box ── */}
                <div className="my-4 p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-zinc-900/60 to-zinc-950/90 border border-amber-500/30 relative">
                  <Quote className="w-4 h-4 text-amber-400/60 absolute top-2.5 right-3" />
                  <p className="text-xs sm:text-[13px] font-serif italic text-amber-200 pr-5 leading-relaxed line-clamp-3">
                    “{book.quote}”
                  </p>
                </div>

                {/* ── Persuasive Description ── */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-4">
                  {book.description}
                </p>
              </div>

              {/* ── Clean Masked Affiliate Action Buttons ── */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  {/* View on Amazon */}
                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 hover:border-amber-400 text-amber-200 hover:text-white text-[11px] font-bold transition shadow-sm group/btn cursor-pointer"
                    title={`Buy ${book.title} on Amazon`}
                  >
                    <ShoppingCart className="w-3 h-3 text-amber-400 group-hover/btn:scale-110 transition-transform shrink-0" />
                    <span className="truncate">Amazon</span>
                    <ExternalLink className="w-2.5 h-2.5 text-zinc-400 ml-auto opacity-70 shrink-0" />
                  </a>

                  {/* View on Flipkart */}
                  <a
                    href={book.flipkartUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/40 hover:border-blue-400 text-blue-200 hover:text-white text-[11px] font-bold transition shadow-sm group/btn cursor-pointer"
                    title={`Buy ${book.title} on Flipkart`}
                  >
                    <ShoppingBag className="w-3 h-3 text-blue-400 group-hover/btn:scale-110 transition-transform shrink-0" />
                    <span className="truncate">Flipkart</span>
                    <ExternalLink className="w-2.5 h-2.5 text-zinc-400 ml-auto opacity-70 shrink-0" />
                  </a>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 truncate">
                  <ShieldCheck className="w-3 h-3 text-amber-500/70 shrink-0" />
                  <span className="truncate">Verified Edition • Fast Delivery</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Horizontal Scroll Progress Track ── */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-32 h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-150"
              style={{
                width: `${Math.max(18, scrollProgress * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* ── Affiliate Disclosure Notice ── */}
        <div className="mt-8 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/60 max-w-2xl mx-auto text-center">
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            * <strong className="text-zinc-300">Affiliate Disclosure:</strong> As an Amazon and Flipkart associate, we may earn a small referral commission from qualifying purchases at zero extra cost to you. All earnings are directed purely towards server hosting and maintaining Brahmacharya Mitra 100% free for all sadhaks.
          </p>
        </div>

      </div>
    </section>
  );
}
