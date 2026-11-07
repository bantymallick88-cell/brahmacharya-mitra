import React from 'react';
import { useTranslation } from '../i18n';

export default function SacredLibraryShowcase() {
  const { t } = useTranslation();

  const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL)
    ? (import.meta.env.BASE_URL.replace(/\/$/, '') + '/')
    : '/';

  return (
    <section id="books" className="py-12 px-4 max-w-5xl mx-auto w-full">
      <div 
        className="relative overflow-hidden rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-[0_0_45px_rgba(245,158,11,0.15)] transition-all duration-500 group"
        style={{
          background: 'rgba(20, 14, 11, 0.9)',
          border: '1.5px solid rgba(245, 158, 11, 0.35)',
        }}
      >
        {/* Ambient Cosmic Gold Aura */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/25 transition-all" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider shadow-sm">
              <span className="text-amber-400">📖</span>
              <span>{t('libraryShowcase.badge')}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-cinzel text-white tracking-wide">
              {t('libraryShowcase.title')}
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
              {t('libraryShowcase.desc')}
            </p>

            {/* Highlights Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-[11px] font-semibold text-zinc-400">
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-300/90">
                {t('libraryShowcase.tagPdf')}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                {t('libraryShowcase.tagScriptures')}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                {t('libraryShowcase.tagNeuro')}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                {t('libraryShowcase.tagAyurveda')}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={`${baseUrl}books/`}
              className="btn-shimmer btn-metallic-glow w-full sm:w-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:via-orange-400 hover:to-amber-500 text-black font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-orange-500/20 hover:scale-105 active:scale-95 cursor-pointer text-center"
            >
              <span>{t('libraryShowcase.browseBtn')}</span>
              <span className="text-base">→</span>
            </a>

            <span className="text-[10px] text-zinc-400 text-center font-medium">
              {t('libraryShowcase.freeNotice')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

