import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check, Sparkles } from 'lucide-react';
import { useTranslation, SUPPORTED_LANGUAGES, type LanguageCode } from '../i18n';

export default function LanguageSelector() {
  const { currentLang, setLanguage, currentMeta } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const indianLanguages = SUPPORTED_LANGUAGES.filter(l => l.group === 'Indian');
  const globalLanguages = SUPPORTED_LANGUAGES.filter(l => l.group === 'Global');

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button with High-Contrast Bilingual Indicator ('GB' / 'HI') */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border-2 border-amber-500/40 hover:border-amber-400 text-xs font-bold text-zinc-100 hover:text-white transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.35)] cursor-pointer shrink-0 active:scale-95"
        aria-label="Select Language (English / Hindi)"
        aria-expanded={isOpen}
        title="Switch Language / भाषा बदलें"
      >
        <span className="text-sm leading-none" role="img" aria-label="Flag">
          {currentMeta.flag}
        </span>
        <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-300">
          {currentLang === 'hi' ? 'HI' : (currentLang === 'en' ? 'EN' : currentLang.toUpperCase())}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-amber-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Glassmorphic Dropdown Menu (Guaranteed High z-index & Mobile Alignment) */}
      {isOpen && (
        <div className="absolute right-0 sm:right-0 mt-2 w-72 max-w-[90vw] rounded-2xl border-2 border-amber-500/50 bg-[#0d0d14]/98 backdrop-blur-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.25)] z-[120] animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header */}
          <div className="flex items-center justify-between px-1 pb-2 border-b border-zinc-800/80 mb-2.5">
            <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" /> भाषा चुनें • Select Language
            </span>
            <span className="text-[10px] text-zinc-400 font-semibold">15 Languages</span>
          </div>

          {/* ── QUICK 1-TAP SWITCH: ENGLISH (GB/EN) & HINDI (IN/HI) ── */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => handleSelect('en')}
              className={`py-2 px-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.4)] font-black border border-amber-300'
                  : 'bg-zinc-900/90 text-zinc-200 border border-zinc-800 hover:border-amber-500/40 hover:bg-zinc-850'
              }`}
            >
              <span className="text-sm">🇬🇧</span>
              <span>English (EN)</span>
              {currentLang === 'en' && <Check className="w-3.5 h-3.5 text-zinc-950 stroke-[3]" />}
            </button>

            <button
              onClick={() => handleSelect('hi')}
              className={`py-2 px-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                currentLang === 'hi'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 shadow-[0_0_15px_rgba(245,158,11,0.4)] font-black border border-amber-300'
                  : 'bg-zinc-900/90 text-zinc-200 border border-zinc-800 hover:border-amber-500/40 hover:bg-zinc-850'
              }`}
            >
              <span className="text-sm">🇮🇳</span>
              <span>हिन्दी (HI)</span>
              {currentLang === 'hi' && <Check className="w-3.5 h-3.5 text-zinc-950 stroke-[3]" />}
            </button>
          </div>

          <div className="max-h-72 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
            {/* Indian Languages Section */}
            <div>
              <div className="px-2 py-1 text-[10px] font-black text-amber-400 uppercase tracking-widest flex items-center gap-1">
                <span>भारतीय भाषाएँ (Indian Languages)</span>
              </div>
              <div className="grid grid-cols-1 gap-1">
                {indianLanguages.map((lang) => {
                  const isSelected = currentLang === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleSelect(lang.code)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/25 text-amber-300 font-bold border border-amber-500/50 shadow-sm'
                          : 'text-zinc-300 hover:bg-zinc-850 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{lang.flag}</span>
                        <div className="text-left">
                          <span className="font-semibold">{lang.nativeName}</span>
                          <span className="text-[10px] text-zinc-400 ml-1.5">({lang.name})</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 stroke-[2.5]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Global Languages Section */}
            <div className="pt-2 border-t border-zinc-800/80">
              <div className="px-2 py-1 text-[10px] font-black text-sky-400 uppercase tracking-widest">
                Global Languages
              </div>
              <div className="grid grid-cols-1 gap-1">
                {globalLanguages.map((lang) => {
                  const isSelected = currentLang === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleSelect(lang.code)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/25 text-amber-300 font-bold border border-amber-500/50 shadow-sm'
                          : 'text-zinc-300 hover:bg-zinc-850 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{lang.flag}</span>
                        <div className="text-left">
                          <span className="font-semibold">{lang.nativeName}</span>
                          <span className="text-[10px] text-zinc-400 ml-1.5">({lang.name})</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 stroke-[2.5]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
