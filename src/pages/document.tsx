import { onMount, t, vm, watch } from 'jinge';
import { useParams } from 'jinge-router';

import { Html } from '../components/html';
import { PagePending } from '../components/pending';
import { ensureLoaded, findPage, loadDocHtml, setMeta, store, type Page } from '../data';
import { currentLocale, href } from '../i18n';

/** Raw HTML body: kept out of `t()` so the i18n extractor does not treat it as rich text. */
const missingHtml = '<p><a href="/guide/introduction/">返回指南 →</a></p>';

/** Built on demand: `t()` needs the dictionary, which is loaded before rendering. */
const missingPage = (): Page => ({
  locale: currentLocale(),
  id: '',
  path: '/404.html',
  title: t('页面未找到'),
  description: t('此文档不存在。请从目录选择一篇文档。'),
  group: '404',
  toc: [],
  text: '',
  source: '',
});

export function DocumentPage(props: { section: string }) {
  const params = useParams<{ slug: string }>();
  const initial = findPage(props.section, params.slug) ?? missingPage();
  const state = vm({
    page: initial,
    html: '',
    previous: undefined as Page | undefined,
    next: undefined as Page | undefined,
  });
  const sectionPages = store.pages.filter((page) => page.id.startsWith(props.section + '/'));
  const groups = [...new Set(sectionPages.map((page) => page.group))];
  const sections = groups.map((group) => ({
    name: group,
    pages: sectionPages.filter((page) => page.group === group),
  }));
  function update() {
    const page = findPage(props.section, params.slug);
    state.page = page ?? missingPage();
    state.html = page ? '' : missingHtml;
    if (page)
      void loadDocHtml(currentLocale(), page.id).then((data) => {
        if (state.page.id === page.id) state.html = data.html;
      });
    const index = sectionPages.findIndex((page) => page.id === state.page.id);
    state.previous = index > 0 ? sectionPages[index - 1] : undefined;
    state.next = index >= 0 ? sectionPages[index + 1] : undefined;
    setMeta(state.page.title, state.page.description);
  }
  update();
  watch(params, 'slug', update);
  onMount(() => {
    if (location.hash)
      requestAnimationFrame(() =>
        document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView(),
      );
  });
  return (
    <div className="docs-layout page-width mx-auto grid w-[min(1240px,_calc(100%_-_96px))] grid-cols-[200px_minmax(0,_1fr)_150px] gap-12 pt-10 pb-17.5 max-[1150px]:w-[calc(100%_-_64px)] max-[1150px]:grid-cols-[180px_minmax(0,_1fr)_135px] max-[1150px]:gap-7.5 max-[950px]:grid-cols-[175px_minmax(0,_1fr)] max-[950px]:gap-9 max-[700px]:block max-[700px]:w-[calc(100%_-_40px)] max-[700px]:pt-4.25 max-[700px]:pb-11.25 max-[370px]:w-[calc(100%_-_30px)]">
      <aside
        className="docs-sidebar sticky top-27.75 max-h-[calc(100dvh_-_135px)] [scrollbar-width:thin] self-start overflow-y-auto pr-3.5 max-[700px]:hidden"
        aria-label={t('文档导航')}
      >
        <a
          className="sidebar-title mb-5 flex justify-between border-b border-solid border-b-line pb-4.75 text-[13px] font-[650] [&_span]:text-muted"
          href={href(
            props.section === 'router'
              ? '/router/overview/'
              : props.section === 'api'
                ? '/api/runtime/'
                : '/guide/introduction/',
          )}
        >
          {props.section === 'router'
            ? 'Jinge Router'
            : props.section === 'api'
              ? t('API 参考')
              : t('开发指南')}
          <span>↗</span>
        </a>
        {sections.map((section) => (
          <div
            className="sidebar-group mb-6.25 [&_>_a]:block [&_>_a]:border-l [&_>_a]:border-solid [&_>_a]:border-l-line [&_>_a]:pt-1.5 [&_>_a]:pr-2.5 [&_>_a]:pb-1.5 [&_>_a]:pl-3.25 [&_>_a]:text-[12px] [&_>_a]:leading-[1.5] [&_>_a]:text-muted [&_>_a.active]:rounded-[0_4px_4px_0] [&_>_a.active]:border-l-2 [&_>_a.active]:border-solid [&_>_a.active]:border-l-[#91b253] [&_>_a.active]:bg-[color-mix(in_srgb,_var(--accent)_13%,_transparent)] [&_>_a.active]:pl-3 [&_>_a.active]:text-brand [&_>_a:hover]:text-ink [&_h2]:mb-2.75 [&_h2]:text-[10px] [&_h2]:font-[550] [&_h2]:tracking-[0.05em] [&_h2]:text-muted"
            key={section.name}
          >
            <h2>{section.name}</h2>
            {section.pages.map((page) => (
              <a
                key={page.id}
                href={href(page.path)}
                className={state.page.id === page.id ? 'active' : ''}
                aria-current={state.page.id === page.id ? 'page' : undefined}
              >
                {page.title}
              </a>
            ))}
          </div>
        ))}
        <a
          className="sidebar-github block border-t border-solid border-t-line pt-3.75 text-[10px] text-muted"
          href={href('https://github.com/jingeweb/jinge')}
          target="_blank"
          rel="noreferrer"
        >
          {t('在 GitHub 上查看 ↗')}
        </a>
      </aside>
      <main
        id="main-content"
        className="doc-main min-w-0 [&_>_.eyebrow]:mb-3.25 [&_>_.eyebrow]:text-[9px] [&_>_h1]:mb-3.5 [&_>_h1]:text-[33px] [&_>_h1]:tracking-[-0.6px] max-[700px]:[&_>_h1]:text-[29px]"
      >
        <details className="mobile-doc-nav hidden max-[700px]:mb-5.5 max-[700px]:block max-[700px]:border-b max-[700px]:border-solid max-[700px]:border-b-line max-[700px]:pb-3.5 max-[700px]:[&_a]:block max-[700px]:[&_a]:px-0 max-[700px]:[&_a]:py-1.25 max-[700px]:[&_a]:text-[12px] max-[700px]:[&_a]:text-muted max-[700px]:[&_a:first-of-type]:mt-3 max-[700px]:[&_summary]:cursor-pointer max-[700px]:[&_summary]:text-[12px] max-[700px]:[&_summary]:text-muted">
          <summary>{t('文档目录')}</summary>
          {sectionPages.map((page) => (
            <a key={page.id} href={href(page.path)}>
              {page.title}
            </a>
          ))}
        </details>
        <div className="doc-breadcrumb mb-7.75 flex gap-2.25 text-[10px] text-muted max-[700px]:mb-6.25 [&_span:nth-child(2)]:opacity-50">
          <a href={href('/')}>{t('文档')}</a>
          <span>/</span>
          <span>{state.page.group}</span>
        </div>
        <p className="eyebrow font-mono text-[10px] leading-[1.5] font-semibold tracking-[0.16em] text-muted">
          {props.section === 'api'
            ? 'API REFERENCE'
            : props.section === 'router'
              ? 'JINGE ROUTER'
              : 'THE JINGE GUIDE'}
        </p>
        <h1>{state.page.title}</h1>
        <p className="doc-description mb-9.25 border-b border-solid border-b-line pb-7.25 text-[14px] text-muted max-[700px]:mb-5.75 max-[700px]:pb-5.5 max-[700px]:text-[13px]">
          {state.page.description}
        </p>
        <div className="doc-mobile-headings hidden max-[950px]:mb-7.5 max-[950px]:block max-[950px]:[&_a]:mt-2 max-[950px]:[&_a]:block max-[950px]:[&_a]:text-[11px] max-[950px]:[&_a]:text-muted max-[950px]:[&_summary]:cursor-pointer max-[950px]:[&_summary]:text-[11px] max-[950px]:[&_summary]:text-muted">
          <details>
            <summary>{t('本页内容')}</summary>
            {state.page.toc.map((heading) => (
              <a key={heading.id} href={href(`#${heading.id}`)}>
                {heading.text}
              </a>
            ))}
          </details>
        </div>
        <Html html={state.html} className="prose" />
        <div className="doc-edit mt-10 flex justify-between border-t border-solid border-t-line pt-5 text-[10px] text-muted">
          <a
            href={href(`https://github.com/jingeweb/jinge-website/edit/main/${state.page.source}`)}
            target="_blank"
            rel="noreferrer"
          >
            {t('编辑此页 ↗')}
          </a>
          <span>{t('基于 Jinge 4.2')}</span>
        </div>
        <nav
          className="doc-pagination mt-6.75 grid grid-cols-[1fr_1fr] gap-3.75 max-[700px]:gap-2.5 [&_.next]:text-right [&_>_a]:flex [&_>_a]:flex-col [&_>_a]:gap-1.5 [&_>_a]:rounded-md [&_>_a]:border [&_>_a]:border-solid [&_>_a]:border-line [&_>_a]:bg-surface [&_>_a]:px-4.5 [&_>_a]:py-3.75 max-[700px]:[&_>_a]:p-3.25 [&_>_a:hover]:border-[#a5bb87] [&_small]:text-[10px] [&_small]:text-muted [&_strong]:text-[12px] [&_strong]:font-[550] max-[700px]:[&_strong]:text-[11px]"
          aria-label={t('相邻文档')}
        >
          {state.previous ? (
            <a href={href(state.previous.path)}>
              <small>{t('← 上一篇')}</small>
              <strong>{state.previous.title}</strong>
            </a>
          ) : (
            <span />
          )}
          {state.next ? (
            <a href={href(state.next.path)} className="next">
              <small>{t('下一篇 →')}</small>
              <strong>{state.next.title}</strong>
            </a>
          ) : (
            <span />
          )}
        </nav>
      </main>
      <aside
        className="docs-toc sticky top-28.75 self-start border-l border-solid border-l-line pt-0.5 pl-4.25 text-[10px] max-[950px]:hidden [&_>_a]:mb-2.25 [&_>_a]:block [&_>_a]:leading-[1.7] [&_>_a]:text-muted [&_>_a:hover]:text-brand [&_>_p]:mb-3 [&_>_p]:text-[10px] [&_>_p]:font-semibold [&_>_p]:text-ink"
        aria-label={t('本页内容')}
      >
        <p>{t('本页内容')}</p>
        {state.page.toc.map((heading) => (
          <a key={heading.id} href={href(`#${heading.id}`)}>
            {heading.text}
          </a>
        ))}
        <div className="toc-help mt-6.75 border-t border-solid border-t-line pt-4.25 [&_>_a]:text-brand [&_>_span]:mb-1.25 [&_>_span]:block [&_>_span]:text-[9px] [&_>_span]:text-muted">
          <span>{t('边看边试')}</span>
          <a href={href('/examples/')}>{t('打开交互示例 ↗')}</a>
        </div>
      </aside>
    </div>
  );
}

/** Document pages derive their tree from the locale dataset, so they wait for it on their own. */
export function GuideRoute() {
  void ensureLoaded();
  return store.ready ? <DocumentPage section="guide" /> : <PagePending />;
}
export function ApiRoute() {
  void ensureLoaded();
  return store.ready ? <DocumentPage section="api" /> : <PagePending />;
}
export function RouterRoute() {
  void ensureLoaded();
  return store.ready ? <DocumentPage section="router" /> : <PagePending />;
}

export function NotFound() {
  setMeta(t('页面未找到'), t('此路径不存在，请返回首页或从导航选择页面。'));
  return (
    <main
      id="main-content"
      className="not-found page-width mx-auto w-[min(1240px,_calc(100%_-_96px))] pt-22.5 pb-32.5 max-[1150px]:w-[calc(100%_-_64px)] max-[700px]:w-[calc(100%_-_40px)] max-[700px]:pt-13.75 max-[700px]:pb-20 max-[370px]:w-[calc(100%_-_30px)] max-[700px]:[&_.button]:gap-3 max-[700px]:[&_.button]:px-4 max-[700px]:[&_.button]:text-[12px] [&_>_div]:flex [&_>_div]:gap-3 [&_h1]:mt-6.25 [&_h1]:text-[45px] [&_h1]:leading-[1.5] [&_h1]:tracking-[-1px] max-[700px]:[&_h1]:text-[33px] [&_p]:mb-7 [&_p]:text-[13px] [&_p]:text-muted"
    >
      <span className="eyebrow font-mono text-[10px] leading-[1.5] font-semibold tracking-[0.16em] text-muted">
        404 / A SMALL DETOUR
      </span>
      <h1>
        {t('这个页面，')}
        <br />
        {t('暂时没有连接。')}
      </h1>
      <p>{t('可能是链接发生了变化，也可能是一个小小的拼写错误。')}</p>
      <div>
        <a
          className="button primary inline-flex min-h-11.75 items-center justify-center gap-8 rounded-[7px] px-5.5 py-2.75 text-[13px] font-semibold whitespace-nowrap [&.primary]:border [&.primary]:border-solid [&.primary]:border-[#c7e95f] [&.primary]:bg-accent [&.primary]:text-[#293d20] [&.primary:hover]:[transform:translateY(-2px)] [&.primary:hover]:bg-[#c4ed50] [&.secondary]:border [&.secondary]:border-solid [&.secondary]:border-line [&.secondary]:bg-surface [&.secondary]:text-ink [&.secondary:hover]:bg-subtle"
          href={href('/')}
        >
          {t('返回首页 ↗')}
        </a>
        <a
          className="button secondary inline-flex min-h-11.75 items-center justify-center gap-8 rounded-[7px] px-5.5 py-2.75 text-[13px] font-semibold whitespace-nowrap [&.primary]:border [&.primary]:border-solid [&.primary]:border-[#c7e95f] [&.primary]:bg-accent [&.primary]:text-[#293d20] [&.primary:hover]:[transform:translateY(-2px)] [&.primary:hover]:bg-[#c4ed50] [&.secondary]:border [&.secondary]:border-solid [&.secondary]:border-line [&.secondary]:bg-surface [&.secondary]:text-ink [&.secondary:hover]:bg-subtle"
          href={href('/examples/')}
        >
          {t('浏览示例 ↗')}
        </a>
      </div>
    </main>
  );
}
