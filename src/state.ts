import { vm } from 'jinge';

export const ui = vm({
  path: location.pathname,
  dark: document.documentElement.dataset.theme === 'dark',
  menu: false,
  notice: '' as Notice,
});

export function toggleTheme() {
  ui.dark = !ui.dark;
  document.documentElement.dataset.theme = ui.dark ? 'dark' : 'light';
  try {
    localStorage.setItem('jinge-theme', ui.dark ? 'dark' : 'light');
  } catch {
    /* Theme still works without storage. */
  }
}

let noticeTimer: ReturnType<typeof setTimeout> | undefined;
export function notify(notice: Notice) {
  ui.notice = notice;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => {
    ui.notice = '';
  }, 2400);
}

/** The toast text is chosen in the template, where `t()` is compiled. */
export type Notice = 'copied' | 'failed' | '';

export async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    notify('copied');
    return true;
  } catch {
    notify('failed');
    return false;
  }
}
