import { useState, useEffect, useCallback, useMemo } from 'react';
import type { LanguageCode, LanguageMeta, TranslationDictionary, TranslationFunction } from './types';
import { SUPPORTED_LANGUAGES } from './types';

// Comprehensive centralized JSON translation dictionaries
import enJson from '../locales/en.json';
import hiJson from '../locales/hi.json';
import orJson from '../locales/or.json';
import mrJson from '../locales/mr.json';

// Traditional TypeScript locales
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
export type { LanguageCode, LanguageMeta, TranslationDictionary, TranslationFunction };

function deepMerge<T = any>(target: any, source: any): T {
  if (!source) return target || ({} as T);
  if (!target) return source;
  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      output[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output as T;
}

// Centralized dictionaries merged with deep type-safety & 100% fallback guarantees
export const translations: Record<LanguageCode, TranslationDictionary> = {
  en: deepMerge(deepMerge({}, en), enJson) as TranslationDictionary,
  hi: deepMerge(deepMerge(deepMerge({}, enJson), hi), hiJson) as TranslationDictionary,
  or: deepMerge(deepMerge(deepMerge({}, enJson), or), orJson) as TranslationDictionary,
  bn: deepMerge(deepMerge({}, enJson), bn) as any,
  mr: deepMerge(deepMerge(deepMerge({}, enJson), mr), mrJson) as TranslationDictionary,
  te: deepMerge(deepMerge({}, enJson), te) as any,
  ta: deepMerge(deepMerge({}, enJson), ta) as any,
  gu: deepMerge(deepMerge({}, enJson), gu) as any,
  kn: deepMerge(deepMerge({}, enJson), kn) as any,
  pa: deepMerge(deepMerge({}, enJson), pa) as any,
  ru: deepMerge(deepMerge({}, enJson), ru) as any,
  es: deepMerge(deepMerge({}, enJson), es) as any,
  fr: deepMerge(deepMerge({}, enJson), fr) as any,
  de: deepMerge(deepMerge({}, enJson), de) as any,
  ar: deepMerge(deepMerge({}, enJson), ar) as any,
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
  } catch (e) { }
  return DEFAULT_LANG;
}

export function setLanguage(lang: LanguageCode): void {
  if (!(lang in translations)) return;

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (e) { }

  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('language-changed', { detail: { lang } }));
  }
}

/**
 * Safely resolves a nested dot-delimited key in an object.
 */
function getNestedValue(obj: any, path: string): string | undefined {
  if (!obj || typeof obj !== 'object') return undefined;
  const parts = path.split('.');
  let current: any = obj;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : undefined;
}

/**
 * Replaces {param} placeholders with provided values.
 */
function interpolate(text: string, params?: Record<string, string | number>): string {
  if (!params) return text;
  return Object.entries(params).reduce((acc, [k, v]) => {
    return acc.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
  }, text);
}

/**
 * Standalone translation lookup helper with automatic English fallback.
 */
export function getTranslation(key: string, lang?: LanguageCode, params?: Record<string, string | number>): string {
  const activeLang = lang || getInitialLanguage();
  const currentDict = translations[activeLang] || translations.en;
  const fallbackDict = translations.en;

  let val = getNestedValue(currentDict, key);
  if (val === undefined) {
    val = getNestedValue(fallbackDict, key);
  }

  if (val === undefined) {
    if (typeof (currentDict as any)?.[key] === 'string') {
      val = (currentDict as any)[key];
    } else if (typeof (fallbackDict as any)?.[key] === 'string') {
      val = (fallbackDict as any)[key];
    }
  }

  if (val !== undefined) {
    return interpolate(val, params);
  }

  return key;
}

/**
 * Creates a TranslationFunction that can be invoked as `t('hero.title1')`
 * OR accessed as `t.hero.title1`, automatically falling back to English.
 */
export function createT(currentLang: LanguageCode): TranslationFunction {
  const currentDict = translations[currentLang] || translations.en;
  const fallbackDict = translations.en;

  const tFunc = (key: string, params?: Record<string, string | number>): string => {
    return getTranslation(key, currentLang, params);
  };

  return new Proxy(tFunc, {
    get(target, prop: string | symbol) {
      if (prop in target) {
        return (target as any)[prop];
      }
      if (typeof prop === 'string') {
        const primary = (currentDict as any)?.[prop];
        const fallback = (fallbackDict as any)?.[prop];
        if (primary !== undefined) {
          if (typeof primary === 'object' && primary !== null) {
            return new Proxy(primary, {
              get(subTarget, subProp: string | symbol) {
                if (typeof subProp === 'string') {
                  const subVal = subTarget[subProp];
                  if (subVal !== undefined) return subVal;
                  return fallback?.[subProp];
                }
                return (subTarget as any)[subProp];
              }
            });
          }
          return primary;
        }
        return fallback;
      }
      return undefined;
    }
  }) as TranslationFunction;
}

/**
 * Universal React Hook for reactive, flicker-free translation across Astro islands.
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
        setCurrentLangState((prev) => (prev !== newLang ? newLang : prev));
        if (typeof document !== 'undefined') {
          document.documentElement.lang = newLang;
          document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
        }
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        const newLang = e.newValue as LanguageCode;
        if (newLang in translations) {
          setCurrentLangState((prev) => (prev !== newLang ? newLang : prev));
        }
      }
    };

    window.addEventListener('language-changed', handleLangChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('language-changed', handleLangChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const changeLanguage = useCallback((lang: LanguageCode) => {
    setLanguage(lang);
  }, []);

  const t = useMemo(() => createT(currentLang), [currentLang]);
  const currentMeta = SUPPORTED_LANGUAGES.find(l => l.code === currentLang) || SUPPORTED_LANGUAGES[0];
  const isRtl = currentMeta.dir === 'rtl';

  return {
    t,
    currentLang,
    setLanguage: changeLanguage,
    currentMeta,
    isRtl,
    languages: SUPPORTED_LANGUAGES,
  };
}
