// Fixes the URL before `locale` below is computed. Kept as a dependency instead of relying on
// import order in the entry, because the bundler may reorder side-effect-only modules.
import './boot';
import { intlInit, type Dict } from 'jinge';

import anchors from './generated/anchors.json';
import { detectLocale, isLocale, localizePath, stripLocale, type Locale } from './locale';

/** Locale is URL-owned: the first path segment decides which dictionary is active. */
export const locale = detectLocale(location.pathname);

const dicts = import.meta.glob<{ default: Dict }>('../intl/*.tsx');

/** Only the active locale's dictionary is fetched; the app mounts once it is in place. */
export const intlReady = intlInit({
  defaultLocale: locale,
  dictLoader: (target) => dicts[`../intl/${target}.tsx`]().then((mod) => mod.default),
});

export function href(path: string): string {
  return localizePath(path, locale);
}

export function switchLocale(next: string) {
  if (!isLocale(next) || next === locale) return;
  let hash = location.hash;
  const id = stripLocale(location.pathname).replace(/^\/|\/$/g, '');
  const table = anchors as Record<string, Record<Locale, string[]>>;
  const headings = table[id];
  if (hash && headings) {
    const index = headings[locale].indexOf(decodeURIComponent(hash.slice(1)));
    if (index >= 0 && headings[next][index]) hash = '#' + encodeURIComponent(headings[next][index]);
  }
  try {
    localStorage.setItem('jinge-locale', next);
  } catch {
    /* URL switching works without storage. */
  }
  location.assign(localizePath(location.pathname, next) + location.search + hash);
}
