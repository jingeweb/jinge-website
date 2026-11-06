import { vm } from 'jinge';

import type { Locale } from './locale';

import { currentLocale } from './i18n';

export interface Page {
  locale: Locale;
  id: string;
  path: string;
  title: string;
  description: string;
  group: string;
  toc: { id: string; text: string }[];
  text: string;
  source: string;
}
export interface Demo {
  id: string;
  title: string;
  desc: string;
  category: string;
  source: string;
  order: number;
}
export interface SourceFile {
  name: string;
  code: string;
  html: string;
}
interface Dataset {
  pages: Page[];
  demos: Demo[];
}
const datasets = import.meta.glob<Dataset>('./generated/locales/*.json', {
  import: 'default',
});
/** Per-locale promises: switching back to a visited language reuses its dataset. */
const pending = new Map<Locale, Promise<Dataset>>();
export function loadDataset(target: Locale): Promise<Dataset> {
  let request = pending.get(target);
  if (!request) {
    request = datasets[`./generated/locales/${target}.json`]();
    pending.set(target, request);
    void request.catch(() => pending.delete(target));
  }
  return request;
}
/**
 * The dataset is loaded after the application mounts, so a slow network never blocks the shell.
 * Components read it through `store`, and `ready` flips once the data for their locale is in place.
 */
export const store = vm({
  ready: false,
  locale: '' as Locale | '',
  pages: [] as Page[],
  demos: [] as Demo[],
});
export function applyDataset(target: Locale, data: Dataset) {
  store.pages = data.pages;
  store.demos = data.demos;
  store.locale = target;
  store.ready = true;
}
/** Fetched on demand: only routes that read the dataset call this. */
export async function ensureLoaded() {
  const target = currentLocale();
  if (store.ready && store.locale === target) return;
  const data = await loadDataset(target);
  // A locale switch may have finished while this dataset was in flight.
  if (currentLocale() === target) applyDataset(target, data);
}
/** Document bodies are split per page; only the page being rendered loads its own HTML. */
const docs = import.meta.glob<{ html: string }>('./generated/docs/**/*.json', {
  import: 'default',
});
export const loadDocHtml = (target: Locale, id: string) =>
  docs[`./generated/docs/${target}/${id}.json`]();
export const findPage = (section: string, slug: string) =>
  store.pages.find((page) => page.id === `${section}/${slug}`);
export function setMeta(title: string, description: string) {
  document.documentElement.lang = currentLocale();
  document.title = `${title} · Jinge`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', description);
}
