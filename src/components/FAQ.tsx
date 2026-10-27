import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ_QUESTIONS = [
  {
    q: "What is Brahmacharya Mitra and how does it help with NoFap and Celibacy?",
    a: "Brahmacharya Mitra (ब्रह्मचर्य मित्र) is a dedicated spiritual and scientific platform designed to help sadhaks conquer porn addiction, master celibacy (Brahmacharya), and sustain long-term semen retention. It provides an interactive sobriety streak counter, emergency Urge Breaker (Panic Mode) with 4-7-8 breathwork, daily habit transformation tracking, relapse cost diagnostics, and authentic scriptural wisdom from Sanatan Dharma combined with modern dopamine neuroscience."
  },
  {
    q: "How does practicing celibacy and quitting porn cure Brain Fog and Dopamine Burnout?",
    a: "Constant ejaculation and hyper-stimulating digital pornography over-saturate dopamine D2 receptors in the prefrontal cortex, leading to cognitive lethargy, lack of motivation, and chronic brain fog. By practicing celibacy and abstaining from pixelated dopamine triggers, your brain initiates neuroplastic healing: dopamine receptors upregulate, neuroinflammation drops, and seminal vital fluids are transmuted into Ojas (vital mental brilliance and aura) within 30 to 90 days."
  },
  {
    q: "What is the difference between Semen Retention, NoFap, and Brahmacharya?",
    a: "While NoFap focuses primarily on quitting internet pornography and compulsive masturbation (PMO reboot), Semen Retention is the physical practice of conserving seminal fluid to enhance physical vitality, testosterone sensitivity, and energy. Brahmacharya is the holistic Vedic discipline: it encompasses mental purity, thought control, speech restraint, sensory discipline, and the conscious upward transmutation of sexual energy (Virya) into spiritual potency (Ojas and Tejas)."
  },
  {
    q: "How do I install the Brahmacharya Mitra app on my phone Home Screen?",
    a: "Brahmacharya Mitra is an installable Progressive Web App (PWA). On Android (Chrome or Edge), tap the 'Add to Home Screen' or 'Install App' banner at the bottom or inside the navigation menu (☰) to trigger the native 1-tap install prompt. On iPhone/iPad (Safari), tap the 'Share' button (square with arrow pointing up), scroll down, and select 'Add to Home Screen' (➕). Once installed, it launches fullscreen with offline support."
  },
  {
    q: "How do I restart my celibacy streak after a relapse?",
    a: "A relapse is an isolated setback, not the erasure of your neurological healing. First, guard against the 'chaser effect' (repeated binges) and take an immediate cold shower. In Brahmacharya Mitra, open the streak counter, use the reset option to log your new Day 1 honestly, and reflect on the trigger in your Journal notes. The physical resilience and neuroplastic upgrades earned during your previous clean days remain within you—forgive yourself and rise with renewed dedication."
  },
  {
    q: "What are the best recommended books to quit porn addiction and master mind control?",
    a: "Our top recommended foundational literature comprises: 1) 'Brahmacharya: Kab, Kyon Aur Kaise?' by Shri Hit Premanand Ji Maharaj; 2) 'The Practice of Brahmacharya' by Swami Sivananda; 3) 'Your Brain on Porn' by Gary Wilson; 4) 'Divya Prerana Prakash' by Sant Shri Asharamji Bapu; 5) 'The Coiled Serpent' by C.J. Van Vliet; and 6) 'Brahmacharya Sandesh' by Swami Dayanand Saraswati. You can explore reviews and study links directly in our Book Recommendations section."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_QUESTIONS.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div className="w-full">
      {/* ── JSON-LD FAQPage Schema for Google Rich Snippets ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Section Header ── */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>Sanatan Dharma & Modern Neuroscience</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-cinzel text-white tracking-tight">
          Frequently Asked Questions (FAQ)
        </h2>
        <p className="mt-2.5 text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto">
          Essential answers for overcoming porn addiction, mastering celibacy, curing brain fog, and transmuting vital energy.
        </p>
      </div>

      {/* ── 6 Collapsible Accordions in English ── */}
      <div className="space-y-3">
        {FAQ_QUESTIONS.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className={`rounded-2xl transition-all duration-300 overflow-hidden backdrop-blur-2xl border ${
                isOpen
                  ? 'bg-zinc-950/90 border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.15)]'
                  : 'bg-zinc-950/60 border-zinc-800/80 hover:border-amber-500/35 hover:bg-zinc-950/80'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 border ${
                    isOpen
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                  }`}>
                    {idx + 1}
                  </span>
                  <h3 className={`text-sm sm:text-base font-bold transition-colors ${
                    isOpen ? 'text-amber-200' : 'text-zinc-100'
                  }`}>
                    {item.q}
                  </h3>
                </div>

                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-amber-300' : 'text-zinc-500'
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
