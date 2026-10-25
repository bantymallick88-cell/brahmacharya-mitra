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
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const indianLanguages = SUPPORTED_LANGUAGES.filter(l => l.group === 'Indian');
  const globalLanguages = SUPPORTED_LANGUAGES.filter(l => l.group === 'Global');

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button with Glassmorphic styling and glowing hover */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/80 hover:bg-zinc-800/90 border border-amber-500/30 hover:border-amber-400 text-xs font-semibold text-zinc-200 hover:text-white transition-all shadow-[0_0_15px_rgba(245,158,11,0.1)] hover:shadow-[0_0_20px_rgba(245,158,11,0.25)] cursor-pointer"
        aria-label="Select Language"
        title="Change Language"
      >
        <span className="text-sm leading-none">{currentMeta.flag}</span>
        <span className="hidden sm:inline font-medium text-amber-300/90">{currentMeta.nativeName}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
      </button>

      {/* Glassmorphic Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-2xl glass-panel border border-amber-500/40 bg-[#0c0c12]/95 backdrop-blur-2xl p-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.8)] z-50 animate-in fade-in zoom-in-95 duration-150">
          
          <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-zinc-800/80 mb-2">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" /> Select Language
            </span>
            <span className="text-[10px] text-zinc-400">15 Languages</span>
          </div>

          <div className="max-h-80 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
            
            {/* Indian Languages Section */}
            <div>
              <div className="px-2.5 py-1 text-[10px] font-bold text-amber-500/80 uppercase tracking-widest">
                భಾರతీయ ଭାଷା (Indian Languages)
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
                          ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                          : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{lang.flag}</span>
                        <div className="text-left">
                          <span className="font-semibold">{lang.nativeName}</span>
                          <span className="text-[10px] text-zinc-400 ml-1.5">({lang.name})</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Global Languages Section */}
            <div className="pt-2 border-t border-zinc-800/80">
              <div className="px-2.5 py-1 text-[10px] font-bold text-sky-400/80 uppercase tracking-widest">
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
                          ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shadow-sm'
                          : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{lang.flag}</span>
                        <div className="text-left">
                          <span className="font-semibold">{lang.nativeName}</span>
                          <span className="text-[10px] text-zinc-400 ml-1.5">({lang.name})</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
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
