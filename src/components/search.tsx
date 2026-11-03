import { onMount, onUnmount, ref, t, vm } from 'jinge';

import { store } from '../data';
import { href } from '../i18n';
import { ui } from '../state';

interface SearchResult {
  title: string;
  path: string;
  section: string;
  excerpt: string;
}
interface SearchRecord extends SearchResult {
  haystack: string;
}
/** Built once the locale dataset has arrived; the dialog only opens after that. */
let records: SearchRecord[] = [];
function buildRecords() {
  records = [
    ...store.pages.map((page) => ({
      title: page.title,
      path: page.path,
      section: page.group,
      excerpt: page.description,
      text: page.text,
    })),
    ...store.demos.map((demo) => ({
      title: demo.title,
      path: `/examples/${demo.id}/`,
      section: t('示例'),
      excerpt: demo.desc,
      text: demo.desc,
    })),
  ].map((item) => ({
    ...item,
    haystack: `${item.title} ${item.excerpt} ${item.text}`.toLowerCase(),
  }));
}

export function Search() {
  const dialog = ref<HTMLDialogElement>();
  const input = ref<HTMLInputElement>();
  const previousFocus = document.activeElement;
  buildRecords();
  const state = vm({ query: '', results: records.slice(0, 7) as SearchResult[], active: -1 });
  function update(value: string) {
    state.query = value;
    const terms = value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    state.results = terms.length
      ? records
          .filter((record) => terms.every((term) => record.haystack.includes(term)))
          .sort(
            (a, b) =>
              Number(b.title.toLowerCase().includes(value.toLowerCase())) -
              Number(a.title.toLowerCase().includes(value.toLowerCase())),
          )
          .slice(0, 12)
      : records.slice(0, 7);
    state.active = -1;
  }
  onMount(() => {
    dialog.value?.showModal();
    input.value?.focus();
  });
  onUnmount(() => {
    if (previousFocus instanceof HTMLElement) previousFocus.focus();
  });
  function onKey(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!state.results.length) return;
      state.active =
        (state.active + (event.key === 'ArrowDown' ? 1 : -1) + state.results.length) %
        state.results.length;
      dialog.value?.querySelectorAll<HTMLAnchorElement>('.search-result')[state.active]?.focus();
    }
  }
  return (
    <dialog
      ref={dialog}
      className="search-dialog fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-y-auto border-0 bg-transparent p-0 text-ink backdrop:bg-[#17251dcc] backdrop:[backdrop-filter:blur(4px)]"
      aria-label={t('搜索文档')}
      on:cancel={() => {
        ui.search = false;
      }}
      on:click={(event) => {
        if (event.target === dialog.value) ui.search = false;
      }}
      on:keyDown={onKey}
    >
      <div className="search-panel mx-auto mt-[14vh] mb-10 w-[min(620px,_calc(100%_-_40px))] overflow-hidden rounded-xl border border-solid border-line bg-surface [box-shadow:0_20px_60px_#0004] max-[700px]:mt-[9vh] max-[700px]:w-[calc(100%_-_22px)]">
        <div className="search-input-row flex items-center gap-3.75 border-b border-solid border-b-line px-5.5 py-4.25 max-[700px]:gap-2.5 max-[700px]:p-3.5 [&_>_span]:text-[25px] [&_>_span]:text-muted [&_input]:w-full [&_input]:border-0 [&_input]:bg-transparent [&_input]:text-[15px] [&_input]:text-ink [&_input]:outline-0 max-[700px]:[&_input]:text-[13px]">
          <span>⌕</span>
          <input
            ref={input}
            aria-label={t('输入关键词')}
            placeholder={t('搜索指南、API 和示例…')}
            value={state.query}
            on:input={(event) => update(event.target.value)}
          />
          <button
            className="search-close rounded border border-solid border-line bg-subtle px-1.25 py-1 font-mono text-[9px] leading-[normal] font-normal text-muted"
            on:click={() => {
              ui.search = false;
            }}
            aria-label={t('关闭搜索')}
          >
            ESC
          </button>
        </div>
        <p className="search-label mb-2.5 px-5.5 pt-4.25 pb-0 text-[10px] text-muted">
          {state.query ? t('搜索结果 · {count}', { count: state.results.length }) : t('从这里开始')}
        </p>
        <div className="search-results max-h-[49vh] overflow-y-auto px-3 pt-0 pb-3 max-[700px]:max-h-[57vh]">
          {state.results.map((result, index) => (
            <a
              key={result.path}
              className={
                state.active === index
                  ? 'search-result selected flex items-center gap-3.75 rounded-[7px] p-3 hover:bg-subtle focus:bg-subtle [&_>_span:last-child]:text-[15px] [&_>_span:last-child]:text-muted [&_>_span:nth-child(2)]:min-w-0 [&_>_span:nth-child(2)]:flex-1 [&_p]:mx-0 [&_p]:mt-1 [&_p]:mb-0 [&_p]:text-[10px] [&_p]:text-muted [&_small]:mb-0.5 [&_small]:block [&_small]:text-[9px] [&_small]:text-muted [&_strong]:block [&_strong]:text-[13px] [&_strong]:font-[550] [&.selected]:bg-subtle'
                  : 'search-result flex items-center gap-3.75 rounded-[7px] p-3 hover:bg-subtle focus:bg-subtle [&_>_span:last-child]:text-[15px] [&_>_span:last-child]:text-muted [&_>_span:nth-child(2)]:min-w-0 [&_>_span:nth-child(2)]:flex-1 [&_p]:mx-0 [&_p]:mt-1 [&_p]:mb-0 [&_p]:text-[10px] [&_p]:text-muted [&_small]:mb-0.5 [&_small]:block [&_small]:text-[9px] [&_small]:text-muted [&_strong]:block [&_strong]:text-[13px] [&_strong]:font-[550] [&.selected]:bg-subtle'
              }
              href={href(result.path)}
            >
              <span className="result-icon grid h-7.5 w-7.5 shrink-0 place-items-center rounded-[5px] border border-solid border-line text-muted">
                ↗
              </span>
              <span>
                <small>{result.section}</small>
                <strong>{result.title}</strong>
                <p>{result.excerpt}</p>
              </span>
              <span>↵</span>
            </a>
          ))}
          {state.results.length === 0 && (
            <div className="search-empty px-3.75 pt-6.25 pb-10 text-center [&_p]:mx-0 [&_p]:my-2 [&_p]:text-[12px] [&_p]:text-muted [&_strong]:text-[14px]">
              <strong>{t('没有找到相关内容')}</strong>
              <p>{t('试试“响应式”“router”或“插槽”。')}</p>
            </div>
          )}
        </div>
        <div className="search-hint flex justify-between border-t border-solid border-t-line px-5.5 py-2.75 text-[9px] text-muted max-[700px]:px-4 max-[700px]:text-[8px]">
          <span>{t('↑ ↓ 切换结果 · Enter 打开')}</span>
          <span>{t('本地全文搜索')}</span>
        </div>
      </div>
    </dialog>
  );
}
