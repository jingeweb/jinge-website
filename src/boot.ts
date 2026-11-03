import { locales, selectStartupLocale, type Locale } from './locale';

// Imported first so the URL is final before `./i18n` (which reads it at module scope) is evaluated.

// GitHub Pages serves /404.html for paths without a file, and that page hands the real path back
// here. Restore it before anything reads `location`.
const params = new URLSearchParams(location.search);
const restored = params.get('__git_pages_redirect');
if (restored) {
  const url = new URL(restored, location.origin);
  history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);
}

// The first path segment always names a locale. Unknown segments are dropped rather than 404'd.
const segment = location.pathname.split('/')[1] ?? '';
if (!(locales as readonly string[]).includes(segment)) {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem('jinge-locale');
  } catch {
    /* Storage is optional; the URL keeps working without it. */
  }
  const preferred: Locale = selectStartupLocale(stored, navigator.language);
  const rest = location.pathname.slice(segment.length + 1) || '/';
  history.replaceState(
    history.state,
    '',
    `/${preferred}${rest.startsWith('/') ? rest : `/${rest}`}${location.search}${location.hash}`,
  );
}

// Directory URLs keep their trailing slash; real files must not gain one.
if (!location.pathname.endsWith('/') && !/\.[^/]+$/.test(location.pathname))
  history.replaceState(
    history.state,
    '',
    `${location.pathname}/${location.search}${location.hash}`,
  );

document.documentElement.lang = location.pathname.split('/')[1] || 'zh-CN';
