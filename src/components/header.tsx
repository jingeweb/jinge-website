import { onMount, ref, t, vm } from 'jinge';
import { useNavigate } from 'jinge-router';

import { currentLocale, href, language } from '../i18n';
import { stripLocale } from '../locale';
import { prefetchRoute } from '../routes';
import { ui, toggleTheme } from '../state';
import { switchLocale } from '../switch-locale';

function isSection(path: string, section: string) {
  return stripLocale(path).startsWith(section);
}

export function Logo() {
  return (
    <a
      className="logo inline-flex items-center gap-2.25 text-[27px] leading-[1] font-[750] tracking-[-1.3px] max-[760px]:text-[25px] [&_img]:h-7.25 [&_img]:w-7.25 max-[760px]:[&_img]:h-6.75 max-[760px]:[&_img]:w-6.75"
      href={href('/')}
      aria-label={t('Jinge 首页')}
    >
      <img src="/favicon.svg" width="30" height="30" alt="" />
      <span>
        jinge<span className="logo-dot text-[#779c3e]">.</span>
      </span>
    </a>
  );
}

export function Header() {
  const navigate = useNavigate();
  // Evaluated per mount: `t()` needs the dictionary, which is loaded before the first render.
  const links = vm([
    { href: '/guide/introduction/', section: '/guide', label: t('指南') },
    { href: '/api/runtime/', section: '/api', label: 'API' },
    { href: '/examples/', section: '/examples', label: t('示例') },
    { href: '/router/overview/', section: '/router', label: t('路由') },
    { href: '/ecosystem/', section: '/ecosystem', label: t('生态') },
  ]);
  const languageSelect = ref<HTMLSelectElement>();
  const syncLanguage = () => {
    if (languageSelect.value) languageSelect.value.value = currentLocale();
  };
  onMount(() => {
    // The shell is re-created on every language switch, but history may restore a stale value.
    window.addEventListener('pageshow', syncLanguage);
    requestAnimationFrame(syncLanguage);
    return () => window.removeEventListener('pageshow', syncLanguage);
  });
  return (
    <header className="site-header sticky top-0 z-30 border-b border-solid border-b-line bg-[color-mix(in_srgb,_var(--bg)_93%,_transparent)] [backdrop-filter:blur(20px)]">
      <div className="header-inner m-auto flex h-19 max-w-360 items-center gap-3 px-10.5 py-0 max-[1150px]:px-7.5 max-[760px]:h-15.75 max-[760px]:gap-2 max-[760px]:px-5 max-[370px]:px-3.75">
        <Logo />
        <span className="version ml-1 rounded border border-solid border-line px-1.5 py-0.25 font-mono text-[10px] text-muted max-[760px]:ml-0.75 max-[760px]:text-[9px] max-[450px]:hidden">
          v4.2
        </span>
        <nav
          className="desktop-nav ml-10.75 flex gap-6.75 self-stretch max-[1150px]:ml-6.25 max-[1150px]:gap-5 max-[950px]:ml-3.75 max-[950px]:gap-4.25 max-[760px]:hidden [&_a]:relative [&_a]:flex [&_a]:items-center [&_a]:text-[12px] [&_a]:font-[550] [&_a.active]:text-brand [&_a.active::after]:absolute [&_a.active::after]:right-0 [&_a.active::after]:bottom-[-1px] [&_a.active::after]:left-0 [&_a.active::after]:h-0.5 [&_a.active::after]:bg-[#8cad53] [&_a.active::after]:content-[''] [&_a:hover]:text-[#6c9343]"
          aria-label={t('主导航')}
        >
          {links.map((link) => (
            <a
              key={link.section}
              href={href(link.href)}
              className={isSection(ui.path, link.section) ? 'active' : ''}
              aria-current={isSection(ui.path, link.section) ? 'page' : undefined}
              on:mouseEnter={() => prefetchRoute(link.section)}
              on:focus={() => prefetchRoute(link.section)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions ml-auto flex items-center gap-4.25 max-[950px]:gap-3 max-[760px]:gap-2.75">
          <select
            ref={languageSelect}
            autoComplete="off"
            className="language-select w-22 min-w-0 rounded-md border border-line bg-surface px-2 py-1 text-[11px] text-muted max-[760px]:w-20 max-[450px]:text-[10px]"
            aria-label={t('语言')}
            aria-busy={language.loading}
            value={currentLocale()}
            on:change={(event) => {
              const select = event.target;
              void switchLocale(select.value, navigate).then((ok) => {
                if (!ok) select.value = currentLocale();
              });
            }}
          >
            <option value="zh-CN" lang="zh-CN">
              简体中文
            </option>
            <option value="zh-TW" lang="zh-TW">
              繁體中文
            </option>
            <option value="en" lang="en">
              English
            </option>
          </select>
          <button
            className="icon-button theme-toggle inline-grid h-8 min-w-6.5 place-content-center bg-transparent p-0.5 text-[20px] text-muted hover:text-ink"
            on:click={toggleTheme}
            aria-label={ui.dark ? t('切换浅色主题') : t('切换深色主题')}
          >
            {ui.dark ? '☀' : '☾'}
          </button>
          <span className="header-divider h-4.5 w-0.25 bg-line max-[760px]:hidden" />
          <a
            className="github-link flex text-muted hover:text-ink max-[760px]:hidden max-[760px]:[&_svg]:w-4.75"
            href={href('https://github.com/jingeweb/jinge')}
            target="_blank"
            rel="noreferrer"
            aria-label={t('GitHub 仓库')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.08c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.63 1.22 3.27.94.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.97 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.54.23 2.69.11 2.97.73.79 1.16 1.79 1.16 3.02 0 4.33-2.64 5.28-5.15 5.56.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" />
            </svg>
          </a>
          <button
            className="icon-button menu-toggle inline-grid h-8 min-w-6.5 place-content-center bg-transparent p-0.5 text-[20px] text-muted hover:text-ink max-[760px]:text-[19px] [&.menu-toggle]:hidden max-[760px]:[&.menu-toggle]:grid"
            aria-label={t('切换导航')}
            aria-expanded={ui.menu}
            on:click={() => {
              ui.menu = !ui.menu;
            }}
          >
            {ui.menu ? '×' : '☰'}
          </button>
        </div>
      </div>
      {ui.menu && (
        <nav
          className="mobile-nav hidden max-[760px]:flex max-[760px]:flex-col max-[760px]:border-t max-[760px]:border-solid max-[760px]:border-t-line max-[760px]:px-5.5 max-[760px]:pt-2.5 max-[760px]:pb-4.5 max-[760px]:[&_>_a]:flex max-[760px]:[&_>_a]:justify-between max-[760px]:[&_>_a]:border-b max-[760px]:[&_>_a]:border-solid max-[760px]:[&_>_a]:border-b-line max-[760px]:[&_>_a]:px-0 max-[760px]:[&_>_a]:py-2.5 max-[760px]:[&_>_a]:text-[13px] max-[760px]:[&_>_a_>_span]:text-muted"
          aria-label={t('移动端导航')}
        >
          {links.map((link) => (
            <a key={link.section} href={href(link.href)}>
              {link.label}
              <span>↗</span>
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer m-auto flex max-w-360 items-center gap-6 border-t border-solid border-t-line px-12 pt-8 pb-7 max-[1150px]:flex-wrap max-[760px]:grid max-[760px]:grid-cols-1 max-[760px]:gap-5.5 max-[760px]:px-5 max-[760px]:py-6.5 [&_.logo]:text-[23px] [&_.logo_img]:h-6.25 [&_.logo_img]:w-6.25 [&_>_div_>_p]:mx-0 [&_>_div_>_p]:mt-2.5 [&_>_div_>_p]:mb-0 [&_>_div_>_p]:font-mono [&_>_div_>_p]:text-[9px] [&_>_div_>_p]:leading-[normal] [&_>_div_>_p]:font-normal [&_>_div_>_p]:text-muted">
      <div>
        <Logo />
        <p>{t('一个小巧的前端界面框架')}</p>
      </div>
      <div className="footer-links ml-auto flex gap-6 text-[10px] text-muted max-[760px]:m-0 max-[760px]:flex-wrap max-[760px]:gap-4.75 max-[760px]:text-[10px] [&_a:hover]:text-ink">
        <a href={href('/guide/quick-start/')}>{t('开始使用')}</a>
        <a href={href('/examples/')}>{t('探索示例')}</a>
        <a
          href={href('https://github.com/jingeweb/jinge/blob/master/LICENSE')}
          target="_blank"
          rel="noreferrer"
        >
          AGPL-3.0 ↗
        </a>
      </div>
      <p className="footer-note mt-0 mr-0 mb-0 ml-5 text-[9px] text-muted max-[1150px]:ml-auto max-[950px]:mt-[-28px] max-[950px]:w-full max-[950px]:text-right max-[760px]:m-0 max-[760px]:text-left max-[760px]:text-[9px]">
        {t('当前网站由 AI 使用 Jinge 构建')}
      </p>
    </footer>
  );
}
