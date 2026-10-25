import { useState, useEffect, useCallback } from 'react';
import type { LanguageCode, LanguageMeta, TranslationDictionary } from './types';
import { SUPPORTED_LANGUAGES } from './types';

import { en } from './locales/en';
import { hi } from './locales/hi';
import { or } from './locales/or';
import { bn } from './locales/bn';
import { mr } from './locales/mr';
import { te } from './locales/te';
import { ta } from './locales/ta';
import { gu } from './locales/gu';
import { kn } from './locales/kn';
import { pa } from './locales/pa';
import { ru } from './locales/ru';
import { es } from './locales/es';
import { fr } from './locales/fr';
import { de } from './locales/de';
import { ar } from './locales/ar';

export { SUPPORTED_LANGUAGES };
export type { LanguageCode, LanguageMeta, TranslationDictionary };

export const translations: Record<LanguageCode, TranslationDictionary> = {
  en,
  hi,
  or,
  bn,
  mr,
  te,
  ta,
  gu,
  kn,
  pa,
  ru,
  es,
  fr,
  de,
  ar,
};

const STORAGE_KEY = 'bm_lang';
const DEFAULT_LANG: LanguageCode = 'en';

export function getInitialLanguage(): LanguageCode {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (saved && saved in translations) {
      return saved;
    }
  } catch (e) {}
  return DEFAULT_LANG;
}

export function setLanguage(lang: LanguageCode): void {
  if (!(lang in translations)) return;

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) {}

  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('language-changed', { detail: { lang } }));
  }
}

/**
 * Universal React Hook for reactive translation across Astro islands.
 * Automatically synchronizes language state across components with zero reloads.
 */
export function useTranslation() {
  const [currentLang, setCurrentLangState] = useState<LanguageCode>(getInitialLanguage);

  useEffect(() => {
    // Initial sync
    const initial = getInitialLanguage();
    if (initial !== currentLang) {
      setCurrentLangState(initial);
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = initial;
      document.documentElement.dir = initial === 'ar' ? 'rtl' : 'ltr';
    }

    const handleLangChange = (e: any) => {
      const newLang = e.detail?.lang as LanguageCode;
      if (newLang && newLang in translations) {
        setCurrentLangState(newLang);
        if (typeof document !== 'undefined') {
          document.documentElement.lang = newLang;
          document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
        }
      }
    };

    window.addEventListener('language-changed', handleLangChange);
    return () => window.removeEventListener('language-changed', handleLangChange);
  }, []);

  const changeLanguage = useCallback((lang: LanguageCode) => {
    setLanguage(lang);
  }, []);

  const currentDict = translations[currentLang] || translations.en;
  const currentMeta = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];
  const isRtl = currentMeta.dir === 'rtl';

  return {
    t: currentDict,
    currentLang,
    setLanguage: changeLanguage,
    currentMeta,
    isRtl,
    languages: SUPPORTED_LANGUAGES,
  };
}
