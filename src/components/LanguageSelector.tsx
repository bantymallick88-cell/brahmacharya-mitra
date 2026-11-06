import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useTranslation, SUPPORTED_LANGUAGES, type LanguageCode } from '../i18n';

export default function LanguageSelector() {
  const { currentLang, setLanguage, currentMeta } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside or pressing Escape
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
    <div className="relative z-[99999] inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button with Minimal Padding to Prevent Logo Squeeze */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[99999] flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 rounded-lg sm:rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-amber-500/40 hover:border-amber-400 text-[10px] sm:text-xs font-bold text-zinc-100 hover:text-white transition-all shadow-[0_0_12px_rgba(245,158,11,0.2)] cursor-pointer shrink-0 active:scale-95"
        aria-label="Select Language"
        aria-expanded={isOpen}
        title="Switch Language / भाषा बदलें"
      >
        <span className="text-xs sm:text-sm leading-none" role="img" aria-label="Flag">
          {currentMeta.flag}
        </span>
        <span className="text-[10px] sm:text-xs font-black uppercase tracking-tight text-amber-300">
          {currentLang.toUpperCase()}
        </span>
        <ChevronDown
          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Layer-1 Front Dropdown Menu with Maximum z-index Overlay */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-[99999] min-w-[140px] w-72 max-w-[90vw] bg-amber-950/98 backdrop-blur-2xl border border-amber-500/40 rounded-xl shadow-2xl p-3 animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header */}
          <div className="flex items-center justify-between px-1 pb-2 border-b border-amber-500/20 mb-2.5">
            <span className="text-[11px] font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" /> भाषा चुनें • Select Language
            </span>
            <span className="text-[10px] text-amber-300/70 font-semibold">15 Languages</span>
          </div>

          {/* ── QUICK 1-TAP SWITCH: EN, HI, OR ── */}
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            <button
              onClick={() => handleSelect('en')}
              className={`py-1.5 px-1.5 rounded-xl text-[11px] font-black flex items-center justify-center gap-1 transition-all cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-black border border-amber-300 shadow-md'
                  : 'bg-zinc-900/90 text-zinc-200 border border-zinc-800 hover:border-amber-500/40 hover:bg-zinc-850'
              }`}
            >
              <span>🇬🇧</span>
              <span>EN</span>
              {currentLang === 'en' && <Check className="w-3 h-3 text-zinc-950 stroke-[3]" />}
            </button>

            <button
              onClick={() => handleSelect('hi')}
              className={`py-1.5 px-1.5 rounded-xl text-[11px] font-black flex items-center justify-center gap-1 transition-all cursor-pointer ${
                currentLang === 'hi'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-black border border-amber-300 shadow-md'
                  : 'bg-zinc-900/90 text-zinc-200 border border-zinc-800 hover:border-amber-500/40 hover:bg-zinc-850'
              }`}
            >
              <span>🇮🇳</span>
              <span>HI</span>
              {currentLang === 'hi' && <Check className="w-3 h-3 text-zinc-950 stroke-[3]" />}
            </button>

            <button
              onClick={() => handleSelect('or')}
              className={`py-1.5 px-1.5 rounded-xl text-[11px] font-black flex items-center justify-center gap-1 transition-all cursor-pointer ${
                currentLang === 'or'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-black border border-amber-300 shadow-md'
                  : 'bg-zinc-900/90 text-zinc-200 border border-zinc-800 hover:border-amber-500/40 hover:bg-zinc-850'
              }`}
            >
              <span>🇮🇳</span>
              <span>OR</span>
              {currentLang === 'or' && <Check className="w-3 h-3 text-zinc-950 stroke-[3]" />}
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
            <div className="pt-2 border-t border-amber-500/20">
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
