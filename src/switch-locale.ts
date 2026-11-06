import { intlSetLocale } from 'jinge';

import { applyDataset, loadDataset } from './data';
import { language, languagePath } from './i18n';
import { isLocale, type Locale } from './locale';

type Navigate = (to: string, options: { replace: boolean }) => void;

let request = 0;

/**
 * Loads everything the target locale needs before it touches the DOM: its dictionary and its
 * document dataset. Only then does `language.current` change, which re-creates the shell, so the
 * page never renders a half-translated or half-loaded state.
 */
export async function activateLocale(target: Locale): Promise<boolean> {
  if (target === language.current) return true;
  const ticket = ++request;
  const previous = language.current;
  language.loading = true;
  try {
    const [data] = await Promise.all([loadDataset(target), intlSetLocale(target)]);
    if (ticket !== request) return false;
    applyDataset(target, data);
    language.current = target;
    document.documentElement.lang = target;
    language.loading = false;
    try {
      localStorage.setItem('jinge-locale', target);
    } catch {
      /* URL switching works without storage. */
    }
    return true;
  } catch (error) {
    if (ticket === request) {
      language.loading = false;
      console.error(`[locale] failed to activate ${target}`, error);
      // Leave the page readable in the language it already shows.
      await intlSetLocale(previous).catch(() => {});
    }
    return false;
  }
}

let scrollRequest = 0;

/**
 * Re-applies the reading position while the new page finishes loading. Document bodies arrive
 * asynchronously after the shell, so a single `scrollTo` would be clamped by the still-empty page.
 * The shell is re-created a moment later as well, which is why the position is re-asserted until
 * it holds for a few frames.
 */
export function restoreScroll(top: number) {
  const ticket = ++scrollRequest;
  if (!top && !location.hash) return;
  let frames = 0;
  let stable = 0;
  const listeners: [string, EventListener][] = [];
  const clear = () => {
    for (const [type, listener] of listeners) window.removeEventListener(type, listener);
    listeners.length = 0;
  };
  // A reader who starts scrolling should win over the restoration.
  const stop = () => {
    if (ticket === scrollRequest) scrollRequest++;
    clear();
  };
  for (const type of ['wheel', 'touchstart', 'keydown']) {
    const listener: EventListener = () => stop();
    listeners.push([type, listener]);
    window.addEventListener(type, listener, { passive: true });
  }
  const tick = () => {
    if (ticket !== scrollRequest) {
      clear();
      return;
    }
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView();
        if (++stable > 8) {
          clear();
          return;
        }
      }
    } else {
      window.scrollTo({ top, behavior: 'instant' });
      stable = Math.abs(window.scrollY - top) <= 1 ? stable + 1 : 0;
      if (stable > 8) {
        clear();
        return;
      }
    }
    if (++frames < 90) requestAnimationFrame(tick);
    else clear();
  };
  tick();
}

/** Switch languages in place: activate first, then replace the URL without a navigation reload. */
export async function switchLocale(next: string, navigate: Navigate): Promise<boolean> {
  if (!isLocale(next) || next === language.current) return true;
  const to = languagePath(next);
  const top = window.scrollY;
  if (!(await activateLocale(next))) return false;
  navigate(to, { replace: true });
  restoreScroll(top);
  return true;
}
