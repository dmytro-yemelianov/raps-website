import { ui, defaultLang, type Lang } from './ui';

/**
 * Extract language from URL path.
 * Returns 'uk' if URL starts with /uk/, otherwise 'en'.
 * Can also accept an optional Astro.currentLocale override
 * for rewrite-based fallback pages.
 */
export function getLangFromUrl(url: URL, currentLocale?: string): Lang {
  // If Astro provides currentLocale (works with i18n routing), use it
  if (currentLocale && currentLocale in ui) return currentLocale as Lang;
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

/**
 * Returns a translation function t(key) for the given language.
 * Falls back to English if key is missing in the target language.
 */
export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    return (ui[lang] as Record<string, string>)[key] || ui[defaultLang][key] || key;
  };
}

/**
 * Generate a locale-aware URL.
 * For 'en' (default), returns the path as-is.
 * For 'uk', prepends /uk/ to the path.
 */
export function getLocalizedUrl(lang: Lang, path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (lang === defaultLang) return cleanPath;
  return `/${lang}${cleanPath}`;
}

/**
 * Strip locale prefix from a content entry id.
 * e.g., 'en/installation' -> 'installation'
 */
export function stripLocalePrefix(id: string): string {
  return id.replace(/^(en|uk)\//, '');
}

/**
 * Get locale prefix from a content entry id.
 * e.g., 'en/installation' -> 'en'
 */
export function getLocaleFromId(id: string): Lang {
  if (id.startsWith('uk/')) return 'uk';
  return 'en';
}
