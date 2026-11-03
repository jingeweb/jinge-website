export const locales = ['zh-CN', 'zh-TW', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'zh-CN';

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

/** Self-contained so the static HTML can run this before loading the application. */
export function selectStartupLocale(stored: string | null, language: string): Locale {
  if (stored === 'zh-CN' || stored === 'zh-TW' || stored === 'en') return stored;
  const parts = language.toLowerCase().replaceAll('_', '-').split('-');
  if (parts[0] !== 'zh') return 'en';
  if (parts.includes('hant')) return 'zh-TW';
  if (parts.includes('hans')) return 'zh-CN';
  return parts.some((part) => part === 'tw' || part === 'hk' || part === 'mo') ? 'zh-TW' : 'zh-CN';
}

export function detectLocale(pathname: string): Locale {
  for (const locale of locales)
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) return locale;
  return defaultLocale;
}

export function stripLocale(path: string): string {
  return path.replace(/^\/(?:zh-CN|zh-TW|en)(?=\/|[?#]|$)/, '') || '/';
}

export function localePrefix(locale: Locale): string {
  return `/${locale}`;
}

export function localizePath(path: string, locale: Locale): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const plain = stripLocale(path);
  return `${localePrefix(locale)}${plain.startsWith('/') ? plain : '/' + plain}`;
}
