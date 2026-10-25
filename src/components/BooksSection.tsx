import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ExternalLink, 
  Star, 
  CheckCircle, 
  ShoppingBag
} from 'lucide-react';
import { useTranslation } from '../i18n';

interface BookItem {
  id: string;
  title: string;
  author: string;
  level: 'Foundational' | 'Neuroscience' | 'Transmutation' | 'Sacred Scripture';
  rating: string;
  badgeColor: string;
  summary: string;
  coreTakeaways: string[];
  amazonLink: string;
}

const BOOKS: BookItem[] = [
  {
    id: 'sivananda',
    title: 'The Practice of Brahmacharya',
    author: 'Swami Sivananda (Divine Life Society)',
    level: 'Foundational',
    rating: '4.9/5',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    summary: 'The ultimate, unrivaled classic on celibacy, Veerya preservation, and spiritual development. Explains in granular detail the physical, mental, and astral mechanics of vital energy.',
    coreTakeaways: [
      'Veerya is the supreme essence formed after 40 days of food transformation.',
      'How mental indulgence (Chitta-sanga) causes involuntary loss of vitality.',
      'Detailed Yogic methods, diet, and Japa to achieve absolute Urdhva-Retas.'
    ],
    amazonLink: 'https://www.amazon.in/dp/8170520673'
  },
  {
    id: 'ybop',
    title: 'Your Brain on Porn (Internet Pornography & the Emerging Science of Addiction)',
    author: 'Gary Wilson',
    level: 'Neuroscience',
    rating: '4.8/5',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
    summary: 'The neuroscience masterwork exposing how internet pornography hijacks human neuroplasticity, downregulates D2 dopamine receptors, and triggers porn-induced erectile dysfunction (PIED).',
    coreTakeaways: [
      'Supernormal stimulus: Why novelty searching burns out dopamine pathways.',
      'DeltaFosB accumulation in the nucleus accumbens triggers brain fog and flatline.',
      'The biological timeline of dopamine baseline recovery through abstinence.'
    ],
    amazonLink: 'https://www.amazon.in/dp/099316160X'
  },
  {
    id: 'think_grow_rich',
    title: 'Think and Grow Rich (Chapter 11: The Mystery of Sex Transmutation)',
    author: 'Napoleon Hill',
    level: 'Transmutation',
    rating: '4.8/5',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    summary: 'The famous chapter that studied 500 of the world’s most powerful tycoons, inventors, and statesmen. Proves that peak human achievement occurs only when sexual desire is transmuted into intense creative action.',
    coreTakeaways: [
      'Sex desire is the most powerful creative energy known to human biology.',
      'Men who spill their seed indiscriminately rarely achieve greatness before age 40.',
      'How to channel sexual urge into deep work, business innovation, and charismatic leadership.'
    ],
    amazonLink: 'https://www.amazon.in/dp/8192910911'
  },
  {
    id: 'patanjali',
    title: 'Patanjali Yoga Sutras (Sadhana Pada)',
    author: 'Maharshi Patanjali',
    level: 'Sacred Scripture',
    rating: '5.0/5',
    badgeColor: 'bg-amber-400/20 text-amber-200 border-amber-400/40',
    summary: 'The timeless foundation of Raja Yoga. In Sutra 2.38: "ब्रह्मचर्यप्रतिष्ठायां वीर्यलाभः" (Upon establishing firmly in Brahmacharya, invincible strength, vitality, and courage are attained).',
    coreTakeaways: [
      'Brahmacharya is the essential 4th Yama required for spiritual illumination.',
      'Veerya-labhah: Supernatural physical strength, unwavering memory, and fearlessness.',
      'Sense restraint leads to Chitta Vritti Nirodha (Cessation of mental turmoil).'
    ],
    amazonLink: 'https://www.amazon.in/dp/8171100341'
  },
  {
    id: 'vivekananda',
    title: 'Raja Yoga & Meditation',
    author: 'Swami Vivekananda',
    level: 'Sacred Scripture',
    rating: '4.9/5',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    summary: 'Swami Vivekananda’s fiery teachings on conquering animal instincts, mastering Prana, and directing the psychic currents up the Sushumna Nadi into the brain.',
    coreTakeaways: [
      'The sexual energy stored through Brahmacharya becomes Ojas in the brain.',
      'No man can be a genius without pure conservation of his vital fluids.',
      'Strength is life, weakness is death. Build muscles of iron and nerves of steel.'
    ],
    amazonLink: 'https://www.amazon.in/dp/8185301166'
  }
];

export default function BooksSection() {
  const { t } = useTranslation();

  return (
    <section id="books" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <BookOpen className="w-4 h-4 text-amber-400" />
            {t.books.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight">
            {t.books.title}{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent metallic-gold-text">
              {t.books.titleHighlight}
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-300">
            {t.books.subtitle}
          </p>
        </motion.div>

        {/* Books Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOOKS.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-3xl backdrop-blur-3xl bg-zinc-950/70 border border-amber-500/25 hover:border-amber-400/70 hover:shadow-[0_0_35px_rgba(245,158,11,0.3)] transition-all duration-500 flex flex-col justify-between shadow-xl group glass-card-lift"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${book.badgeColor} shadow-sm`}>
                    {book.level}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{book.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold font-cinzel text-white group-hover:text-amber-300 transition-colors">
                  {book.title}
                </h3>
                <div className="text-xs text-zinc-400 font-medium mt-1">
                  By {book.author}
                </div>

                <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {book.summary}
                </p>

                {/* Core Takeaways */}
                <div className="mt-4 pt-3 border-t border-zinc-800/80 space-y-1.5">
                  <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                    {t.books.keyLessons}
                  </div>
                  {book.coreTakeaways.map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buy on Amazon Button */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80">
                <a
                  href={book.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 hover:border-amber-400/70 hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] text-xs font-bold text-zinc-200 hover:text-white transition group-hover:bg-amber-500/10 shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.books.getOnAmazon}</span>
                  <ExternalLink className="w-3 h-3 text-zinc-500 ml-auto" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Affiliate Disclosure Notice */}
        <div className="mt-8 text-center text-[11px] text-zinc-500">
          {t.books.affiliateNotice}
        </div>

      </div>
    </section>
  );
}
