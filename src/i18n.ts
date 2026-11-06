// Fixes the URL before the locale below is computed. Kept as a dependency instead of relying on
// import order in the entry, because the bundler may reorder side-effect-only modules.
import './boot';
import { intlInit, type Dict, vm } from 'jinge';

import anchors from './generated/anchors.json';
import { detectLocale, localizePath, stripLocale, type Locale } from './locale';

/**
 * Locale is URL-owned (the first path segment) and reactive: switching languages updates
 * `language.current` in place, and the layout re-creates the shell for the new locale.
 */
export const language = vm({
  current: detectLocale(location.pathname),
  loading: false,
});

export const currentLocale = (): Locale => language.current;

const dicts = import.meta.glob<{ default: Dict }>('../intl/*.tsx');

/** Only the active locale's dictionary is fetched; the app mounts once it is in place. */
export const intlReady = intlInit({
  defaultLocale: language.current,
  dictLoader: (target) => dicts[`../intl/${target}.tsx`]().then((mod) => mod.default),
});

/** The same path in the active locale: internal links always stay inside it. */
export function href(path: string): string {
  return localizePath(path, language.current);
}

/** Keeps the reader on the same heading when the document exists in the target locale. */
function localizedHash(target: Locale): string {
  let hash = location.hash;
  const id = stripLocale(location.pathname).replace(/^\/|\/$/g, '');
  const table = anchors as Record<string, Record<Locale, string[]>>;
  const headings = table[id];
  if (hash && headings) {
    const index = headings[language.current].indexOf(decodeURIComponent(hash.slice(1)));
    if (index >= 0 && headings[target][index])
      hash = '#' + encodeURIComponent(headings[target][index]);
  }
  return hash;
}

/** The current address rewritten for `target`; handed to the router's replace navigation. */
export function languagePath(target: Locale): string {
  return (
    localizePath(stripLocale(location.pathname), target) + location.search + localizedHash(target)
  );
}
