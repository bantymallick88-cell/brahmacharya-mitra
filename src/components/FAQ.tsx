import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Brain,
  Smartphone,
  RefreshCw,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
  icon: any;
}

export const FAQ_DATA: FAQItem[] = [
  {
    question: "What is Brahmacharya Mitra and how does it help with NoFap and Celibacy?",
    answer: "Brahmacharya Mitra (ब्रह्मचर्य मित्र) is a holistic spiritual-scientific platform engineered to help sadhaks break free from porn addiction, master celibacy, and sustain long-term semen retention. It features a reactive real-time streak timer, emergency Urge Breaker (Panic Mode) with 4-7-8 breathwork, daily habit transformation tracking, relapse cost diagnostics, and timeless Vedic scriptures backed by modern dopamine neuroscience.",
    category: "Platform & Mission",
    icon: ShieldCheck,
  },
  {
    question: "How does practicing celibacy and quitting porn cure Brain Fog and Dopamine Burnout?",
    answer: "High-frequency ejaculation coupled with pixelated pornography floods the brain's reward center, desensitizing dopamine D2 receptors and sparking neuroinflammation in the prefrontal cortex—the core cause of brain fog, lethargy, and anhedonia. Abstaining from digital stimulation and conserving seminal vital fluid initiates neuroplastic reversal: dopamine receptors upregulate, cognitive clarity returns, and vital fluids are transmuted into Ojas (mental brilliance and radiant aura) within 30 to 90 days.",
    category: "Neuroscience & Health",
    icon: Brain,
  },
  {
    question: "What is the difference between Semen Retention, NoFap, and Brahmacharya?",
    answer: "While 'NoFap' focuses primarily on abstaining from internet pornography and compulsive masturbation (PMO reboot), 'Semen Retention' is the physical practice of conserving seminal fluid to boost vitality, androgen sensitivity, and stamina. 'Brahmacharya' is the supreme Sanatan discipline: it transcends mere physical retention to encompass mind control, sensory mastery, pure speech, and the conscious upward transmutation of sexual energy (Virya) into spiritual potency (Ojas and Tejas).",
    category: "Vedic Philosophy",
    icon: Sparkles,
  },
  {
    question: "How do I install the Brahmacharya Mitra app on my phone Home Screen?",
    answer: "Brahmacharya Mitra is a full-featured Progressive Web App (PWA). On Android (Chrome or Edge), tap the 'Add to Home Screen' or 'Install App' banner at the bottom or from the top-right menu (☰) to trigger the native 1-tap install prompt. On iPhone/iPad (Safari), tap the 'Share' icon (square with upward arrow), scroll down, and select 'Add to Home Screen' (➕). Once installed, it launches fullscreen with offline support.",
    category: "App Installation",
    icon: Smartphone,
  },
  {
    question: "How do I restart my celibacy streak after a relapse?",
    answer: "A relapse is an isolated setback, not the erasure of your neurological healing. First, guard against the 'chaser effect' (repeated binges) and take an immediate cold shower. In Brahmacharya Mitra, open the Streak Counter, reset your counter honestly, and log the trigger in your Journal notes. Remember: the physical resilience and neuroplastic upgrades earned during your previous clean days remain within you—forgive yourself and rise with renewed dedication.",
    category: "Relapse Recovery",
    icon: RefreshCw,
  },
  {
    question: "What are the best recommended books to quit porn addiction and master mind control?",
    answer: "Our curated foundational literature comprises: 1) 'Brahmacharya: Kab, Kyon Aur Kaise?' by Shri Hit Premanand Ji Maharaj; 2) 'The Practice of Brahmacharya' by Swami Sivananda; 3) 'Your Brain on Porn' by Gary Wilson; 4) 'Divya Prerana Prakash' by Sant Shri Asharamji Bapu; 5) 'The Coiled Serpent' by C.J. Van Vliet; and 6) 'Brahmacharya Sandesh' by Swami Dayanand Saraswati. You can review all 6 with direct affiliate study links in our Books section.",
    category: "Scriptures & Books",
    icon: BookOpen,
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Structured Data Schema for Google FAQPage Rich Snippet
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-20 relative w-full max-w-full overflow-hidden">
      {/* Dynamic JSON-LD FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Frequently Asked Questions • Sanatan & Science</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight text-balance">
            Answers for Your{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent metallic-gold-text">
              Brahmacharya & Celibacy Journey
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-zinc-300 text-balance">
            Real spiritual-scientific answers to the most common questions on semen retention, NoFap rebooting, brain fog recovery, and streak mastery.
          </p>
        </motion.div>

        {/* ── Interactive FAQ Accordion ── */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            const Icon = item.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`rounded-2xl transition-all duration-300 overflow-hidden backdrop-blur-2xl border ${
                  isOpen
                    ? 'bg-zinc-950/90 border-amber-500/60 shadow-[0_0_35px_rgba(245,158,11,0.18)]'
                    : 'bg-zinc-950/60 border-zinc-800/80 hover:border-amber-500/35 hover:bg-zinc-950/80'
                }`}
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors"
                  aria-expanded={isOpen}
                  id={`faq-btn-${idx}`}
                  aria-controls={`faq-panel-${idx}`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                        isOpen
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-widest font-bold text-amber-400/80 mb-0.5">
                        {item.category}
                      </div>
                      <h3
                        className={`text-sm sm:text-base font-bold transition-colors ${
                          isOpen ? 'text-amber-200' : 'text-zinc-100'
                        }`}
                      >
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'rotate-180 bg-amber-500/20 text-amber-300'
                        : 'text-zinc-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${idx}`}
                      role="region"
                      aria-labelledby={`faq-btn-${idx}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-850 border-zinc-800/50">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── Quick Action Call to Action Footer ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-zinc-900/80 to-indigo-950/40 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xl"
        >
          <div>
            <h4 className="text-base font-bold text-white font-cinzel">
              Have More Questions or Feeling an Urge?
            </h4>
            <p className="text-xs text-zinc-300 mt-1">
              Trigger our emergency Urge Breaker or diagnostic Brain Fog test instantly.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-panic-modal'))}
              className="px-4 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/70 border border-red-500/60 text-red-200 text-xs font-bold transition shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span>🚨 Panic Mode</span>
            </button>
            <a
              href="#streak"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 text-xs font-black transition shadow-md cursor-pointer flex items-center gap-1"
            >
              <span>Track Streak</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
