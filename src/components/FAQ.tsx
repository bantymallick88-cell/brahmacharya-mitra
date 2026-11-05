import React, { useState, useMemo } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqItems = useMemo(() => [
    {
      q: t('faq.q1'),
      a: t('faq.a1')
    },
    {
      q: t('faq.q2'),
      a: t('faq.a2')
    },
    {
      q: t('faq.q3'),
      a: t('faq.a3')
    },
    {
      q: t('faq.q4'),
      a: t('faq.a4')
    },
    {
      q: t('faq.q5'),
      a: t('faq.a5')
    },
    {
      q: t('faq.q6'),
      a: t('faq.a6')
    }
  ], [t]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
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
          <span>{t('faq.badge')}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-cinzel text-white tracking-tight">
          {t('faq.title')}
        </h2>
        <p className="mt-2.5 text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto">
          {t('faq.subtitle')}
        </p>
      </div>

      {/* ── 6 Collapsible Accordions in Active Selected Language ── */}
      <div className="space-y-3">
        {faqItems.map((item, idx) => {
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
