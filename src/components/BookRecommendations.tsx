import React from 'react';
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
  CheckCircle2
} from 'lucide-react';
import { RECOMMENDED_BOOKS, type RecommendedBook } from '../config/affiliate';
import { useTranslation } from '../i18n';

export default function BookRecommendations() {
  const { t } = useTranslation();

  return (
    <section id="books" className="py-20 relative w-full max-w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
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

        {/* ── 6 Books Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {RECOMMENDED_BOOKS.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-3xl backdrop-blur-3xl bg-zinc-950/80 border border-amber-500/25 hover:border-amber-400/70 hover:shadow-[0_0_40px_rgba(245,158,11,0.25)] transition-all duration-300 flex flex-col justify-between shadow-2xl group"
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
                <h3 className="text-xl font-bold font-cinzel text-white group-hover:text-amber-300 transition-colors leading-snug">
                  {book.title}
                </h3>
                <div className="text-xs text-amber-400/90 font-semibold mt-1.5 flex items-center gap-1.5">
                  <span>By {book.author}</span>
                </div>

                {/* ── Inspiring Motivational Quote Box ── */}
                <div className="my-4 p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-zinc-900/60 to-zinc-950/90 border border-amber-500/30 relative">
                  <Quote className="w-4 h-4 text-amber-400/60 absolute top-2.5 right-3" />
                  <p className="text-xs sm:text-[13px] font-serif italic text-amber-200 pr-5 leading-relaxed">
                    “{book.quote}”
                  </p>
                </div>

                {/* ── Persuasive Description ── */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {book.description}
                </p>
              </div>

              {/* ── Clean Masked Affiliate Action Buttons ── */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80 space-y-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  {/* View on Amazon */}
                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 hover:border-amber-400 text-amber-200 hover:text-white text-xs font-bold transition shadow-sm group/btn cursor-pointer"
                    title={`Buy ${book.title} on Amazon`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-amber-400 group-hover/btn:scale-110 transition-transform" />
                    <span>View on Amazon</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400 ml-auto opacity-70" />
                  </a>

                  {/* View on Flipkart */}
                  <a
                    href={book.flipkartUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/40 hover:border-blue-400 text-blue-200 hover:text-white text-xs font-bold transition shadow-sm group/btn cursor-pointer"
                    title={`Buy ${book.title} on Flipkart`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-blue-400 group-hover/btn:scale-110 transition-transform" />
                    <span>View on Flipkart</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400 ml-auto opacity-70" />
                  </a>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500">
                  <ShieldCheck className="w-3 h-3 text-amber-500/70" />
                  <span>Verified Original Edition • Fast Delivery</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Affiliate Disclosure Notice ── */}
        <div className="mt-10 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-850 border-zinc-800/60 max-w-2xl mx-auto text-center">
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            * <strong className="text-zinc-300">Affiliate Disclosure:</strong> As an Amazon and Flipkart associate, we may earn a small referral commission from qualifying purchases at zero extra cost to you. All earnings are directed purely towards server hosting and maintaining Brahmacharya Mitra 100% free for all sadhaks.
          </p>
        </div>

      </div>
    </section>
  );
}
