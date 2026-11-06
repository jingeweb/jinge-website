import { onMount, ref, t, vm } from 'jinge';
import { useNavigate } from 'jinge-router';

import { language } from '../i18n';
import { switchLocale } from '../switch-locale';
import { Icon } from './icon';

const options = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'zh-TW', label: '繁體中文' },
  { value: 'en', label: 'English' },
];

function labelFor(target: string) {
  return options.find((option) => option.value === target)?.label ?? '';
}

/**
 * Language picker drawn by the page instead of a native `<select>`: the native popup is browser
 * UI that the app cannot position or close, and it misbehaves around in-place language switches.
 */
export function LanguageMenu() {
  const navigate = useNavigate();
  const root = ref<HTMLDivElement>();
  const trigger = ref<HTMLButtonElement>();
  const state = vm({ open: false });

  function items() {
    return [...(root.value?.querySelectorAll<HTMLButtonElement>('[role="option"]') ?? [])];
  }
  function focusSelected() {
    const current = items().find((item) => item.getAttribute('aria-selected') === 'true');
    (current ?? items()[0])?.focus();
  }
  function close(refocus = true) {
    state.open = false;
    if (refocus) trigger.value?.focus();
  }
  function toggle() {
    state.open = !state.open;
    if (state.open) requestAnimationFrame(focusSelected);
  }
  function choose(value: string) {
    close();
    if (value === language.current) return;
    void switchLocale(value, navigate);
  }
  function onKey(event: KeyboardEvent) {
    if (event.key === 'Escape' && state.open) {
      event.preventDefault();
      close();
      return;
    }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    if (!state.open) {
      state.open = true;
      requestAnimationFrame(focusSelected);
      return;
    }
    const list = items();
    const index = list.indexOf(document.activeElement as HTMLButtonElement);
    const step = event.key === 'ArrowDown' ? 1 : -1;
    list[(index + step + list.length) % list.length]?.focus();
  }
  function isInside(target: EventTarget | null) {
    return target instanceof Node && !!root.value?.contains(target);
  }
  function onPointerDown(event: PointerEvent) {
    if (state.open && !isInside(event.target)) state.open = false;
  }
  function onFocusIn(event: FocusEvent) {
    if (state.open && !isInside(event.target)) state.open = false;
  }
  onMount(() => {
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('focusin', onFocusIn);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('focusin', onFocusIn);
    };
  });
  return (
    <div ref={root} className="language-menu relative text-[11px]" on:keyDown={onKey}>
      <button
        ref={trigger}
        type="button"
        className="language-trigger flex h-8 min-w-22 cursor-pointer items-center justify-between gap-2 rounded-md border border-solid border-line bg-surface px-2 text-[11px] text-muted hover:text-ink max-[760px]:min-w-20 max-[450px]:text-[10px]"
        aria-haspopup="listbox"
        aria-expanded={state.open}
        aria-label={t('语言')}
        aria-busy={language.loading}
        on:click={toggle}
      >
        <span lang={language.current}>{labelFor(language.current)}</span>
        <Icon
          name={state.open ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          className="text-[16px]"
        />
      </button>
      {state.open && (
        <ul
          className="absolute top-full right-0 z-40 [margin-block-start:6px] mt-1.5 mr-0 mb-0 ml-0 w-33 list-none rounded-md border border-solid border-line bg-surface p-1 shadow-site"
          role="listbox"
          aria-label={t('语言')}
        >
          {options.map((option) => (
            <li key={option.value} role="none">
              <button
                type="button"
                role="option"
                aria-selected={option.value === language.current}
                lang={option.value}
                className={
                  option.value === language.current
                    ? 'flex w-full cursor-pointer items-center rounded-[5px] border-0 bg-subtle px-2 py-1.5 text-left text-[11px] text-ink'
                    : 'flex w-full cursor-pointer items-center rounded-[5px] border-0 bg-transparent px-2 py-1.5 text-left text-[11px] text-muted hover:bg-subtle hover:text-ink'
                }
                on:click={() => choose(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
