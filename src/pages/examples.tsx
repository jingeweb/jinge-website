import { onUnmount, t, vm, watch } from 'jinge';
import { useParams } from 'jinge-router';

import { Html } from '../components/html';
import { PagePending } from '../components/pending';
import { ensureLoaded, setMeta, store, type Demo, type SourceFile } from '../data';
import { currentLocale, href } from '../i18n';
import { copyText } from '../state';

const sourceModules = import.meta.glob<SourceFile[]>('../generated/examples/**/*.json', {
  import: 'default',
});

function ExamplesPage() {
  setMeta(t('交互示例'), t('从第一个组件到完整应用，用真实交互和源码认识 Jinge。'));
  const state = vm({ category: t('全部'), query: '', items: [...store.demos] });
  const categories = [t('全部'), t('基础'), t('进阶'), t('应用')];
  function filter() {
    const terms = state.query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const all = t('全部');
    state.items = store.demos.filter((demo) => {
      const haystack = `${demo.title} ${demo.desc} ${demo.id}`.toLowerCase();
      return (
        (state.category === all || demo.category === state.category) &&
        terms.every((term) => haystack.includes(term))
      );
    });
  }
  return (
    <main
      id="main-content"
      className="examples-page page-width mx-auto w-[min(1240px,_calc(100%_-_96px))] pb-16.25 max-[1150px]:w-[calc(100%_-_64px)] max-[700px]:w-[calc(100%_-_40px)] max-[700px]:pb-10 max-[370px]:w-[calc(100%_-_30px)]"
    >
      <header className="page-intro pt-16.25 pb-9.5 max-[700px]:pt-9.5 max-[700px]:pb-6.25 [&_.eyebrow]:mb-4.75 max-[700px]:[&_.eyebrow]:text-[8px] [&_>_p:not(.eyebrow)]:text-[14px] [&_>_p:not(.eyebrow)]:leading-[1.9] [&_>_p:not(.eyebrow)]:text-muted max-[700px]:[&_>_p:not(.eyebrow)]:text-[12px] [&_h1]:mb-5 [&_h1]:text-[43px] [&_h1]:tracking-[-1.2px] max-[700px]:[&_h1]:text-[31px] max-[700px]:[&_h1]:tracking-[-0.7px]">
        <p className="eyebrow font-mono text-[10px] leading-[1.5] font-semibold tracking-[0.16em] text-muted">
          THE JINGE EXAMPLES
        </p>
        <h1>
          {t('从一个例子开始')}
          <span className="end-dot text-[#91ac55]">.</span>
        </h1>
        <p>
          {t('真实运行的界面，完整可读的源码。')}
          <br />
          {t('挑一个感兴趣的主题，动手试试。')}
        </p>
        <span className="intro-count mt-6 block text-[10px] text-muted max-[700px]:text-[9px]">
          {store.demos.length} {t('个示例 · 由 Jinge 驱动')}
        </span>
      </header>
      <div className="examples-toolbar flex items-center justify-between gap-5 border-t border-solid border-t-line py-5 max-[700px]:flex-col max-[700px]:items-stretch max-[700px]:gap-3.5 max-[700px]:py-4.25">
        <div
          className="filter-tabs flex items-center gap-1.25 max-[700px]:gap-1 [&_>_button]:rounded-[5px] [&_>_button]:bg-transparent [&_>_button]:px-4 [&_>_button]:py-1.5 [&_>_button]:text-[12px] [&_>_button]:text-muted max-[700px]:[&_>_button]:px-4 max-[700px]:[&_>_button]:py-1.5 max-[700px]:[&_>_button]:text-[11px] [&_>_button.active]:bg-ink [&_>_button.active]:text-canvas [&_>_button:hover:not(.active)]:bg-subtle [&_>_button:hover:not(.active)]:text-ink"
          aria-label={t('示例分类')}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={state.category === category ? 'active' : ''}
              aria-pressed={state.category === category}
              on:click={() => {
                state.category = category;
                filter();
              }}
            >
              {category}
            </button>
          ))}
        </div>
        <label className="examples-search flex min-w-52.5 items-center gap-2.25 rounded-md border border-solid border-line bg-surface px-2.75 py-1.25 focus-within:[outline:2px_solid_var(--accent-text)] focus-within:[outline-offset:2px] max-[700px]:w-full [&_input]:w-40 [&_input]:border-0 [&_input]:bg-transparent [&_input]:text-[11px] [&_input]:text-ink [&_input]:outline-none max-[700px]:[&_input]:min-h-6.25 max-[700px]:[&_input]:w-full [&_span]:text-[19px] [&_span]:leading-[1] [&_span]:text-muted">
          <span>⌕</span>
          <input
            aria-label={t('筛选示例')}
            placeholder={t('查找示例…')}
            value={state.query}
            on:input={(event) => {
              state.query = event.target.value;
              filter();
            }}
          />
        </label>
      </div>
      <div className="examples-grid grid grid-cols-3 gap-5.75 max-[950px]:gap-4.25 max-[700px]:grid-cols-[1fr_1fr] max-[700px]:gap-3 max-[370px]:grid-cols-1">
        {state.items.map((demo) => (
          <a
            href={href(`/examples/${demo.id}/`)}
            className="demo-card overflow-hidden rounded-[9px] border border-solid border-line bg-surface hover:[transform:translateY(-4px)] hover:shadow-site"
            key={demo.id}
          >
            <div
              className={`demo-card-visual flex h-33 flex-col items-center justify-center gap-3 bg-[#edf3e7] [background-image:radial-gradient(#8c9c701a_1px,_transparent_1px)] [background-size:13px_13px] text-[#72855c] max-[700px]:h-26.25 [&_>_code]:text-[9px] [&_>_code]:tracking-[0.02em] max-[700px]:[&_>_code]:px-2.5 max-[700px]:[&_>_code]:text-center max-[700px]:[&_>_code]:text-[8px] max-[700px]:[&_>_code]:wrap-anywhere [&_>_span]:font-mono [&_>_span]:text-[30px] [&_>_span]:leading-[normal] [&_>_span]:font-normal [&_>_span]:tracking-[-3px] max-[700px]:[&_>_span]:text-[25px] [&.visual-advanced]:bg-[#edf0f5] [&.visual-advanced]:text-[#7585a2] [&.visual-app]:bg-[#f4efe5] [&.visual-app]:text-[#99866a] ${demo.category === t('基础') ? 'visual-basics' : demo.category === t('进阶') ? 'visual-advanced' : 'visual-app'}`}
            >
              <span>
                {demo.category === t('基础') ? '</>' : demo.category === t('进阶') ? '{ }' : '↗'}
              </span>
              <code>{demo.id}</code>
            </div>
            <div className="demo-card-content px-5.5 pt-4.75 pb-6 max-[950px]:px-4.25 max-[700px]:px-3.25 max-[700px]:pt-3.25 max-[700px]:pb-4.25 [&_>_div]:mb-3 [&_>_div]:flex [&_>_div]:items-center [&_>_div]:justify-between [&_>_div]:text-muted max-[700px]:[&_>_div]:mb-2 [&_h2]:mb-2.25 [&_h2]:text-[17px] [&_h2]:tracking-[-0.3px] max-[950px]:[&_h2]:text-[15px] max-[700px]:[&_h2]:text-[14px] [&_p]:mb-0 [&_p]:text-[11px] [&_p]:leading-[1.9] [&_p]:text-muted max-[700px]:[&_p]:text-[10px] max-[700px]:[&_p]:leading-[1.8]">
              <div>
                <span className="category-tag rounded border border-solid border-line px-1.5 py-0.25 text-[9px] text-muted">
                  {demo.category}
                </span>
                <span>↗</span>
              </div>
              <h2>{demo.title}</h2>
              <p>{demo.desc}</p>
            </div>
          </a>
        ))}
      </div>
      {state.items.length === 0 && (
        <div className="empty-state px-5 py-15 text-center [&_h2]:text-[21px] [&_p]:text-[13px] [&_p]:text-muted">
          <h2>{t('还没有找到匹配的示例。')}</h2>
          <p>{t('换一个关键词，或选择其他分类。')}</p>
          <button
            className="button secondary inline-flex min-h-11.75 items-center justify-center gap-8 rounded-[7px] px-5.5 py-2.75 text-[13px] font-semibold whitespace-nowrap [&.primary]:border [&.primary]:border-solid [&.primary]:border-[#c7e95f] [&.primary]:bg-accent [&.primary]:text-[#293d20] [&.primary:hover]:[transform:translateY(-2px)] [&.primary:hover]:bg-[#c4ed50] [&.secondary]:border [&.secondary]:border-solid [&.secondary]:border-line [&.secondary]:bg-surface [&.secondary]:text-ink [&.secondary:hover]:bg-subtle"
            on:click={() => {
              state.query = '';
              state.category = t('全部');
              filter();
            }}
          >
            {t('清除筛选')}
          </button>
        </div>
      )}
      <div className="examples-bottom-note mt-8.75 flex gap-5 border-t border-solid border-t-line pt-6 text-[11px] text-muted max-[700px]:flex-col max-[700px]:gap-1 max-[700px]:text-[10px] [&_a]:text-brand">
        <span>{t('想从零开始？')}</span>
        <a href={href('/guide/quick-start/')}>{t('跟着快速开始搭建你的第一个应用 →')}</a>
      </div>
    </main>
  );
}

function ExampleDetail() {
  const params = useParams<{ slug: string }>();
  const state = vm({
    demo: store.demos[0] as Demo,
    files: [] as SourceFile[],
    selected: '',
    sourceHtml: '',
    sourceCode: '',
    view: 'split',
    loading: true,
    error: '',
    frame: '',
    found: true,
  });
  let generation = 0;
  function select(name: string) {
    const file = state.files.find((item) => item.name === name);
    state.selected = name;
    state.sourceHtml = file?.html ?? '';
    state.sourceCode = file?.code ?? '';
  }
  async function load() {
    const ticket = ++generation;
    const demo = store.demos.find((item) => item.id === params.slug);
    state.found = !!demo;
    if (!demo) {
      setMeta(t('示例未找到'), t('请选择其他示例。'));
      return;
    }
    state.demo = demo;
    state.loading = true;
    state.error = '';
    state.files = [];
    state.sourceHtml = '';
    state.frame = href(`/preview/${demo.id}/`);
    setMeta(demo.title, demo.desc);
    try {
      const loader = sourceModules[`../generated/examples/${currentLocale()}/${demo.id}.json`];
      if (!loader) throw new Error(t('示例源码尚未生成'));
      const files = await loader();
      if (ticket !== generation) return;
      state.files = files;
      select(files[0]?.name ?? '');
    } catch {
      if (ticket === generation) state.error = t('源码加载失败，请刷新页面重试。');
    } finally {
      if (ticket === generation) state.loading = false;
    }
  }
  void load();
  watch(params, 'slug', () => void load());
  onUnmount(() => {
    generation++;
  });
  return (
    <main
      id="main-content"
      className="example-detail page-width mx-auto w-[min(1240px,_calc(100%_-_96px))] pt-7.5 pb-16.25 max-[1150px]:w-[calc(100%_-_64px)] max-[700px]:w-[calc(100%_-_40px)] max-[700px]:pt-5 max-[700px]:pb-10 max-[370px]:w-[calc(100%_-_30px)]"
    >
      <a className="back-link text-[11px] text-muted" href={href('/examples/')}>
        {t('← 全部示例')}
      </a>
      {state.found ? (
        <>
          <header className="example-detail-header mx-0 mt-8.75 mb-7.5 flex items-center justify-between gap-6.25 max-[700px]:mt-6.75 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-4.25 [&_.button]:min-h-9.5 [&_.button]:px-3.5 [&_.button]:py-2 [&_.button]:text-[11px] [&_.eyebrow]:mb-2.5 [&_.eyebrow]:text-[9px] [&_h1]:mb-2.5 [&_h1]:text-[30px] [&_h1]:tracking-[-0.5px] max-[700px]:[&_h1]:text-[26px] [&_p:not(.eyebrow)]:mb-0 [&_p:not(.eyebrow)]:text-[12px] [&_p:not(.eyebrow)]:text-muted">
            <div>
              <p className="eyebrow font-mono text-[10px] leading-[1.5] font-semibold tracking-[0.16em] text-muted">
                {state.demo.category} / LIVE EXAMPLE
              </p>
              <h1>{state.demo.title}</h1>
              <p>{state.demo.desc}</p>
            </div>
            <a
              className="button secondary inline-flex min-h-11.75 items-center justify-center gap-8 rounded-[7px] px-5.5 py-2.75 text-[13px] font-semibold whitespace-nowrap [&.primary]:border [&.primary]:border-solid [&.primary]:border-[#c7e95f] [&.primary]:bg-accent [&.primary]:text-[#293d20] [&.primary:hover]:[transform:translateY(-2px)] [&.primary:hover]:bg-[#c4ed50] [&.secondary]:border [&.secondary]:border-solid [&.secondary]:border-line [&.secondary]:bg-surface [&.secondary]:text-ink [&.secondary:hover]:bg-subtle"
              href={href(state.demo.source)}
              target="_blank"
              rel="noreferrer"
            >
              {t('GitHub 源码 ↗')}
            </a>
          </header>
          <div className="example-workbench overflow-hidden rounded-[9px] border border-solid border-line bg-surface">
            <div className="workbench-toolbar flex items-center justify-between border-b border-solid border-b-line bg-subtle px-3.5 py-2.5 max-[700px]:flex-wrap max-[700px]:gap-1 max-[700px]:p-2 [&_.filter-tabs_>_button]:px-3 [&_.filter-tabs_>_button]:py-1.25 [&_.filter-tabs_>_button]:text-[10px] max-[700px]:[&_.filter-tabs_>_button]:px-2.25 max-[700px]:[&_.filter-tabs_>_button]:py-1.25 max-[700px]:[&_.filter-tabs_>_button]:text-[10px]">
              <div
                className="filter-tabs flex items-center gap-1.25 max-[700px]:gap-1 [&_>_button]:rounded-[5px] [&_>_button]:bg-transparent [&_>_button]:px-4 [&_>_button]:py-1.5 [&_>_button]:text-[12px] [&_>_button]:text-muted max-[700px]:[&_>_button]:px-4 max-[700px]:[&_>_button]:py-1.5 max-[700px]:[&_>_button]:text-[11px] [&_>_button.active]:bg-ink [&_>_button.active]:text-canvas [&_>_button:hover:not(.active)]:bg-subtle [&_>_button:hover:not(.active)]:text-ink"
                aria-label={t('查看方式')}
              >
                <button
                  className={state.view === 'split' ? 'active' : ''}
                  aria-pressed={state.view === 'split'}
                  on:click={() => {
                    state.view = 'split';
                  }}
                >
                  {t('并排查看')}
                </button>
                <button
                  className={state.view === 'preview' ? 'active' : ''}
                  aria-pressed={state.view === 'preview'}
                  on:click={() => {
                    state.view = 'preview';
                  }}
                >
                  {t('预览')}
                </button>
                <button
                  className={state.view === 'source' ? 'active' : ''}
                  aria-pressed={state.view === 'source'}
                  on:click={() => {
                    state.view = 'source';
                  }}
                >
                  {t('源码')}
                </button>
              </div>
              <button
                className="reset-demo bg-transparent p-1.25 text-[10px] text-muted hover:text-ink max-[700px]:text-[9px]"
                on:click={() => {
                  state.frame = href(`/preview/${state.demo.id}/?reset=${Date.now()}`);
                }}
              >
                {t('↺ 重新加载')}
              </button>
            </div>
            <div
              className={`workbench-content grid min-h-142.5 grid-cols-[1fr_1fr] [&.view-preview]:grid-cols-1 [&.view-preview_.source-pane]:hidden [&.view-source]:grid-cols-1 [&.view-source_.preview-pane]:hidden [&.view-source_.source-pane]:border-l-0 max-[950px]:[&.view-split]:grid-cols-1 max-[950px]:[&.view-split_.demo-frame]:h-110 max-[950px]:[&.view-split_.example-source]:h-105 max-[950px]:[&.view-split_.source-pane]:border-t max-[950px]:[&.view-split_.source-pane]:border-l-0 max-[950px]:[&.view-split_.source-pane]:border-solid max-[950px]:[&.view-split_.source-pane]:border-t-line view-${state.view}`}
            >
              <section className="preview-pane min-w-0" aria-label={t('运行预览')}>
                <div className="pane-heading flex h-10.75 items-center gap-2 border-b border-solid border-b-line px-4 py-2 text-[10px] text-muted max-[700px]:px-3 [&_>_a]:ml-auto [&_>_a]:text-[15px] [&_button]:bg-transparent [&_button]:text-[10px] [&_button]:text-muted [&_select]:mr-auto [&_select]:max-w-[85%] [&_select]:border-0 [&_select]:bg-transparent [&_select]:font-mono [&_select]:text-[10px] [&_select]:leading-[normal] [&_select]:font-normal [&_select]:text-muted max-[700px]:[&_select]:text-[9px]">
                  <span className="status-dot inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#81a547]" />
                  <span>{t('运行预览')}</span>
                  <a
                    href={href(state.frame)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={t('在新窗口打开预览')}
                  >
                    ↗
                  </a>
                </div>
                <iframe
                  className="demo-frame block h-135 w-full border-0 bg-[#fff]"
                  src={state.frame}
                  title={t('{title} 交互预览', { title: state.demo.title })}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
                />
              </section>
              <section
                className="source-pane min-w-0 border-l border-solid border-l-line bg-code"
                aria-label={t('示例源码')}
              >
                <div className="pane-heading flex h-10.75 items-center gap-2 border-b border-solid border-b-line px-4 py-2 text-[10px] text-muted max-[700px]:px-3 [&_>_a]:ml-auto [&_>_a]:text-[15px] [&_button]:bg-transparent [&_button]:text-[10px] [&_button]:text-muted [&_select]:mr-auto [&_select]:max-w-[85%] [&_select]:border-0 [&_select]:bg-transparent [&_select]:font-mono [&_select]:text-[10px] [&_select]:leading-[normal] [&_select]:font-normal [&_select]:text-muted max-[700px]:[&_select]:text-[9px]">
                  <select
                    aria-label={t('选择源文件')}
                    value={state.selected}
                    on:change={(event) => select(event.target.value)}
                  >
                    {state.files.map((file) => (
                      <option key={file.name} value={file.name}>
                        {file.name}
                      </option>
                    ))}
                  </select>
                  <button
                    on:click={() => void copyText(state.sourceCode)}
                    disabled={state.loading || !state.sourceCode}
                  >
                    {t('复制')}
                  </button>
                </div>
                {state.loading && (
                  <p className="source-message p-5 text-[12px] text-muted">{t('加载源码…')}</p>
                )}
                {state.error && (
                  <p className="source-message p-5 text-[12px] text-muted" role="alert">
                    {state.error}
                  </p>
                )}
                <Html
                  html={state.sourceHtml}
                  className="example-source h-135 overflow-auto [&_pre]:m-0 [&_pre]:p-5 [&_pre]:text-[11px] [&_pre]:leading-[1.8] [&_pre]:[tab-size:2] max-[700px]:[&_pre]:p-3.75 max-[700px]:[&_pre]:text-[10px]"
                />
              </section>
            </div>
          </div>
          <div className="example-notes mt-5 flex justify-between gap-6.25 text-[10px] text-muted max-[700px]:flex-col max-[700px]:gap-2.5 max-[700px]:text-[10px] [&_a]:whitespace-nowrap [&_a]:text-brand [&_p]:m-0">
            <p>{t('预览使用真实 Jinge 组件，在独立页面中运行。源码与构建使用同一份文件。')}</p>
            <a
              href={href(
                state.demo.id === 'router-navigation'
                  ? '/router/overview/'
                  : '/guide/introduction/',
              )}
            >
              {t('阅读相关指南 →')}
            </a>
          </div>
        </>
      ) : (
        <div className="empty-state px-5 py-15 text-center [&_h2]:text-[21px] [&_p]:text-[13px] [&_p]:text-muted">
          <h1>{t('没有找到这个示例')}</h1>
          <a href={href('/examples/')}>{t('返回示例列表 →')}</a>
        </div>
      )}
    </main>
  );
}

export function Examples() {
  void ensureLoaded();
  return store.ready ? <ExamplesPage /> : <PagePending />;
}
export function ExampleRoute() {
  void ensureLoaded();
  return store.ready ? <ExampleDetail /> : <PagePending />;
}
