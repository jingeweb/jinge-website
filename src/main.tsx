import { Dynamic, type FC, bootstrap, onMount, onUnmount, t, watch } from 'jinge';
import { Router, RouterView, createRouter, useNavigate, useParams } from 'jinge-router';

import { Footer, Header } from './components/header';
import { PagePending } from './components/pending';
import { currentLocale, href, intlReady, language, languagePath } from './i18n';
import { detectLocale, isLocale, localizePath, stripLocale } from './locale';
import { Home } from './pages/home';
import { normalizePath, withTrailingSlash } from './path';
import {
  ApiRoute,
  Ecosystem,
  ExampleRoute,
  Examples,
  GuideRoute,
  NotFound,
  RouterRoute,
} from './routes';
import { copyText, ui } from './state';
import { activateLocale, restoreScroll } from './switch-locale';

// `style.css` is loaded by the static HTML shell with a render-blocking <link>. Importing it here
// as well made the dev server emit a second, JS-injected copy of the same sheet, which repainted
// the whole document after first paint.

// The locale is a route segment, not the router base: that keeps navigation between languages
// inside one router instance, so back/forward and in-place switching never reload the document.
const router = createRouter({
  baseHref: import.meta.env.BASE_URL,
  routes: [
    { path: '/', redirectTo: `/${language.current}/` },
    {
      path: '/:locale',
      component: LocaleLayout,
      children: [
        { component: Home },
        { path: '/guide/:slug', component: GuideRoute },
        { path: '/api/:slug', component: ApiRoute },
        { path: '/router/:slug', component: RouterRoute },
        { path: '/examples', component: Examples },
        { path: '/examples/:slug', component: ExampleRoute },
        { path: '/ecosystem', component: Ecosystem },
        { path: '/*', component: NotFound },
      ],
    },
    { path: '/*', component: MissingLocale },
  ],
});

/**
 * One wrapper per locale for the routed content only. Header and footer stay mounted while the
 * page body is re-created (their links follow `language.current` reactively), so the language
 * `<select>` survives the switch and its native picker closes normally on mobile.
 */
const views: Record<string, FC> = {
  'zh-CN': () => <RouterView />,
  'zh-TW': () => <RouterView />,
  en: () => <RouterView />,
};

/**
 * Keeps the URL and the rendered language in sync. Switching languages swaps `language.current`
 * (see switch-locale.ts); browser back/forward arrives here through the route param.
 */
function LocaleLayout() {
  const params = useParams<{ locale: string }>();
  const navigate = useNavigate();
  function sync() {
    const target = params.locale ?? '';
    if (!isLocale(target)) {
      navigate(languagePath(language.current), { replace: true });
      return;
    }
    if (target === language.current) return;
    const top = window.scrollY;
    void activateLocale(target).then((ok) => {
      if (!ok) {
        navigate(languagePath(language.current), { replace: true });
        return;
      }
      restoreScroll(top);
    });
  }
  sync();
  watch(params, 'locale', sync);
  return <Shell />;
}

/** A path without a locale segment (manual `pushState`, stale link) still needs the shell. */
function MissingLocale() {
  const navigate = useNavigate();
  navigate(localizePath(location.pathname, currentLocale()), { replace: true });
  return <PagePending />;
}

function Shell() {
  const navigate = useNavigate();
  function sync() {
    ui.path = location.pathname;
    ui.menu = false;
  }
  function onClick(event: MouseEvent) {
    if (!(event.target instanceof Element)) return;
    const copyButton = event.target.closest<HTMLButtonElement>('[data-copy-code]');
    if (copyButton) {
      const code = copyButton.closest('.code-block')?.querySelector('code')?.textContent;
      if (code) void copyText(code);
      return;
    }
    const anchor = event.target.closest<HTMLAnchorElement>('a[href]');
    if (
      !anchor ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      anchor.target ||
      anchor.hasAttribute('download')
    )
      return;
    const url = new URL(anchor.href);
    if (
      url.origin !== location.origin ||
      stripLocale(url.pathname).startsWith('/preview/') ||
      detectLocale(url.pathname) !== currentLocale()
    )
      return;
    if (normalizePath(url.pathname) === normalizePath(location.pathname) && url.hash) return;
    event.preventDefault();
    // `href()` already produced an absolute path with the locale prefix.
    navigate(withTrailingSlash(url.pathname) + url.search);
    sync();
    window.scrollTo({ top: 0, behavior: 'instant' });
    requestAnimationFrame(() => {
      const main = document.getElementById('main-content');
      main?.setAttribute('tabindex', '-1');
      main?.focus({ preventScroll: true });
      if (url.hash) {
        history.replaceState(history.state, '', location.pathname + location.search + url.hash);
        document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView();
      }
    });
  }
  function onKey(event: KeyboardEvent) {
    if (event.key === 'Escape') ui.menu = false;
  }
  onMount(() => {
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    window.addEventListener('popstate', sync);
    sync();
  });
  onUnmount(() => {
    document.removeEventListener('click', onClick);
    document.removeEventListener('keydown', onKey);
    window.removeEventListener('popstate', sync);
  });
  return (
    <div className="site-shell flex min-h-dvh flex-col">
      <a
        className="skip-link fixed top-2 left-4 z-100 [transform:translateY(-160%)] bg-accent px-4 py-2 text-[#20331c] focus:[transform:none]"
        href={href('#main-content')}
      >
        {t('跳到主要内容')}
      </a>
      <Header />
      <div className="flex-1">
        <Dynamic fc={views[language.current]} />
      </div>
      <Footer />
      <div
        className={
          ui.notice
            ? 'toast pointer-events-none visible fixed bottom-6.25 left-[50%] z-100 max-w-[calc(100vw_-_30px)] [transform:translate(-50%,_15px)] rounded-[7px] bg-ink px-5 py-2.5 text-center text-[12px] text-canvas opacity-0 shadow-site [transition:opacity_0.18s,_transform_0.18s] [&.visible]:[transform:translate(-50%,_0)] [&.visible]:opacity-100'
            : 'toast pointer-events-none fixed bottom-6.25 left-[50%] z-100 max-w-[calc(100vw_-_30px)] [transform:translate(-50%,_15px)] rounded-[7px] bg-ink px-5 py-2.5 text-center text-[12px] text-canvas opacity-0 shadow-site [transition:opacity_0.18s,_transform_0.18s] [&.visible]:[transform:translate(-50%,_0)] [&.visible]:opacity-100'
        }
        role="status"
        aria-live="polite"
      >
        {ui.notice === 'copied'
          ? t('已复制到剪贴板')
          : ui.notice === 'failed'
            ? t('无法访问剪贴板，请选中文本复制')
            : ''}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router router={router}>
      <RouterView />
    </Router>
  );
}
// Boot the whole application only after the dictionary is ready: every string in the first render
// is then already correct, so the page never flashes the fallback language.
void intlReady.then(() => bootstrap(App, document.getElementById('app')!));
