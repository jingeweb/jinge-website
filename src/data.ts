import { vm } from 'jinge';

import type { Locale } from './locale';

import { locale } from './i18n';

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
const datasets = import.meta.glob<{ pages: Page[]; demos: Demo[] }>('./generated/locales/*.json', {
  import: 'default',
});
/**
 * The dataset is loaded after the application mounts, so a slow network never blocks the shell.
 * Components read it through `store`, and `ready` flips once the data is in place.
 */
export const store = vm({
  ready: false,
  pages: [] as Page[],
  demos: [] as Demo[],
});
/** Fetched on demand: only routes that read the dataset call this. */
let loading: Promise<void> | undefined;
export const ensureLoaded = () =>
  (loading ??= datasets[`./generated/locales/${locale}.json`]().then((data) => {
    store.pages = data.pages;
    store.demos = data.demos;
    store.ready = true;
  }));
/** Document bodies are split per page; only the page being rendered loads its own HTML. */
const docs = import.meta.glob<{ html: string }>('./generated/docs/**/*.json', {
  import: 'default',
});
export const loadDocHtml = (target: string, id: string) =>
  docs[`./generated/docs/${target}/${id}.json`]();
export const findPage = (section: string, slug: string) =>
  store.pages.find((page) => page.id === `${section}/${slug}`);
export function setMeta(title: string, description: string) {
  document.documentElement.lang = locale;
  document.title = `${title} · Jinge`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', description);
}
