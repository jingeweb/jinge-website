import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

import { locales } from '../src/locale.ts';

const site = path.join('site', 'dist');
const read = (file) => readFile(path.join(site, file), 'utf8');

const entries = JSON.parse(await readFile('src/generated/entries.json', 'utf8'));
assert.equal(entries[0], 'index.html', 'index.html must be the single page entry');

// The SPA entry: one document, no per-route HTML, no static content duplication.
const index = await read('index.html');
assert(index.includes('<div id="app"></div>'), 'index.html: missing app mount point');
assert(/<script[^>]+src="\/assets\//.test(index), 'index.html: entry was not bundled');
assert(!index.includes('/src/main.tsx'), 'index.html: source entry was not bundled');
assert(/<link rel="stylesheet"[^>]+href="\/assets\//.test(index), 'index.html: missing stylesheet');

// GitHub Pages fallback: hands the requested path back to the client.
const fallback = await read('404.html');
assert(
  fallback.includes('__git_pages_redirect='),
  '404.html: must forward the requested path to the SPA',
);
assert(!/src="\/assets\//.test(fallback), '404.html: must stay a tiny standalone document');

// Example previews stay real files because they are loaded in an iframe.
for (const locale of locales) {
  const preview = path.join(site, locale, 'preview', 'hello-world', 'index.html');
  assert((await stat(preview)).isFile(), `missing preview for ${locale}`);
}
const pages = JSON.parse(await readFile('src/generated/pages.all.json', 'utf8'));
// Every document must exist in every locale; the count itself is free to grow.
for (const locale of locales)
  assert(
    new Set(pages.filter((page) => page.locale === locale).map((page) => page.id)).size ===
      pages.length / locales.length,
    `${locale}: document set differs from the other locales`,
  );
for (const page of pages) {
  assert(page.html.length > 0, `${page.id}: empty document html`);
  assert(page.path.startsWith('/'), `${page.id}: path must be absolute`);
}

assert.equal((await read('CNAME')).trim(), 'jinge.embjs.com');
console.log(
  `Verified SPA entry, 404 fallback, ${locales.length} locales and ${pages.length} documents.`,
);
