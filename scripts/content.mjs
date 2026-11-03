import { marked } from 'marked';
import { mkdir, readdir, readFile, rm, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import { createHighlighter } from 'shiki';

import { defaultLocale, locales, localizePath } from '../src/locale.ts';
import { localizeSource } from './source-i18n.mjs';

const root = path.resolve(import.meta.dirname, '..');
process.chdir(root);
// `site/` is the Vite root and only holds generated HTML entries. Clear them so a renamed or
// removed page cannot leave a stale entry behind in the published output. `site/dist` is the
// build output and is left alone.
await mkdir('site', { recursive: true });
for (const item of await readdir('site', { withFileTypes: true }))
  if (item.name !== 'dist')
    await rm(path.join('site', item.name), { recursive: true, force: true });
const highlighter = await createHighlighter({
  themes: ['github-light', 'github-dark'],
  langs: ['tsx', 'typescript', 'javascript', 'json', 'html', 'css', 'shell', 'markdown'],
});
const escape = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
const highlight = (code, lang = 'tsx') =>
  highlighter.codeToHtml(code, {
    lang: highlighter.getLoadedLanguages().includes(lang) ? lang : 'text',
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  });
/** Build-time copy that never reaches `t()`, so it cannot live in the i18n CSV. */
const buildText = {
  copyCode: { 'zh-CN': '复制代码', en: 'Copy code', 'zh-TW': '複製程式碼' },
  anchor: { 'zh-CN': '链接到{0}', en: 'Link to {0}', 'zh-TW': '連結到{0}' },
};
const entries = [];
await mkdir('src/generated/examples', { recursive: true });
await mkdir('src/generated/locales', { recursive: true });

async function walk(dir) {
  const result = [];
  for (const item of await readdir(dir, { withFileTypes: true })) {
    if (dir === 'src' && item.name === 'generated') continue;
    const file = path.join(dir, item.name);
    if (item.isDirectory()) result.push(...(await walk(file)));
    else result.push(file);
  }
  return result.sort((a, b) => a.localeCompare(b));
}
for (const name of await readdir('src/generated/examples')) {
  if (name.endsWith('.json')) await unlink(`src/generated/examples/${name}`);
}
async function write(file, content) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content);
}
/** Rewrites the absolute links inside a document so they stay within their own locale. */
function localizedLinks(html, locale) {
  return html.replace(
    /href="(\/[^"]*)"/g,
    (_, target) => `href="${escape(localizePath(target, locale))}"`,
  );
}
const order = [
  'introduction',
  'quick-start',
  'from-vue-react',
  'philosophy',
  'reactivity',
  'templates',
  'forms',
  'styling',
  'components',
  'slots',
  'lifecycle',
  'context',
  'watch',
  'advanced',
  'i18n',
  'deployment',
  'faq',
  'runtime',
  'compiler',
  'overview',
  'nested',
  'state',
];
const pages = [];
for (const file of await walk('content')) {
  if (!file.endsWith('.md')) continue;
  const parts = file.slice('content/'.length).replace(/\.md$/, '').split('/');
  const locale = locales.includes(parts[0]) ? parts.shift() : defaultLocale;
  const id = parts.join('/');
  const source = await readFile(file, 'utf8');
  const [, frontmatter, body] = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/) ?? [];
  if (!frontmatter) throw new Error(`Missing metadata: ${file}`);
  const meta = Object.fromEntries(
    frontmatter.split('\n').map((line) => {
      const at = line.indexOf(':');
      return [line.slice(0, at), line.slice(at + 1).trim()];
    }),
  );
  const toc = [];
  const ids = new Map();
  const renderer = new marked.Renderer();
  renderer.heading = function (token) {
    const text = token.text.replace(/`/g, '');
    const base = text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, '-')
      .replace(/^-|-$/g, '');
    const count = ids.get(base) ?? 0;
    ids.set(base, count + 1);
    const headingId = count ? `${base}-${count}` : base;
    if (token.depth === 2) toc.push({ id: headingId, text });
    return `<h${token.depth} id="${headingId}" aria-label="${escape(text)}">${this.parser.parseInline(token.tokens)}<a class="heading-anchor" href="#${headingId}" aria-label="${escape(buildText.anchor[locale].replace('{0}', text))}">#</a></h${token.depth}>`;
  };
  renderer.link = function (token) {
    const label = this.parser.parseInline(token.tokens);
    const title = token.title ? ` title="${escape(token.title)}"` : '';
    // External targets (commit links, docs sites) open in a new tab, matching the header links.
    const external = /^https?:/i.test(token.href);
    const attrs = external ? ' target="_blank" rel="noreferrer"' : '';
    return `<a href="${escape(token.href)}"${title}${attrs}>${label}</a>`;
  };
  renderer.code = ({ text, lang }) =>
    `<div class="code-block"><div class="code-label"><span>${escape(lang ?? 'text')}</span><button type="button" data-copy-code>${buildText.copyCode[locale]}</button></div>${highlight(text, lang)}</div>`;
  const html = localizedLinks(await marked.parse(body, { renderer }), locale);
  pages.push({
    id,
    locale,
    path: localizePath(`/${id}/`, locale),
    ...meta,
    html,
    toc,
    text: body.replace(/```[\s\S]*?```/g, '').replace(/[#*`|]/g, ''),
    source: file,
  });
}
pages.sort(
  (a, b) =>
    locales.indexOf(a.locale) - locales.indexOf(b.locale) ||
    a.id.split('/')[0].localeCompare(b.id.split('/')[0]) ||
    order.indexOf(a.id.split('/')[1]) - order.indexOf(b.id.split('/')[1]),
);
const anchorMap = {};
for (const id of new Set(pages.map((page) => page.id))) {
  const translations = pages.filter((page) => page.id === id);
  if (
    translations.length !== locales.length ||
    new Set(translations.map((page) => page.toc.length)).size !== 1
  )
    throw new Error(`Incomplete document translation: ${id}`);
  anchorMap[id] = Object.fromEntries(
    translations.map((page) => [page.locale, page.toc.map((heading) => heading.id)]),
  );
}
await write('src/generated/anchors.json', JSON.stringify(anchorMap));
await write(
  'src/generated/pages.json',
  JSON.stringify(pages.filter((page) => page.locale === defaultLocale)),
);
await write('src/generated/pages.all.json', JSON.stringify(pages));

const demos = JSON.parse(await readFile('demos/manifest.json', 'utf8'));
demos.push({
  id: 'router-navigation',
  title: { 'zh-CN': '路由导航', en: 'Router navigation', 'zh-TW': '路由導航' },
  desc: {
    'zh-CN': '嵌套布局、响应式参数、query 与历史记录。',
    en: 'Nested layouts, reactive params, query and history.',
    'zh-TW': '巢狀版面、響應式參數、query 與歷史紀錄。',
  },
  category: { 'zh-CN': '应用', en: 'App', 'zh-TW': '應用' },
  source: 'https://github.com/jingeweb/jinge-router',
  order: 100,
});
const homeCode = `import { bootstrap, vm } from 'jinge';\n\nfunction Counter() {\n  const state = vm({ count: 0 });\n\n  return (\n    <button on:click={() => state.count++}>\n      Count: {state.count}\n    </button>\n  );\n}\n\nbootstrap(Counter, document.body);`;
await write(
  'src/generated/home-code.json',
  JSON.stringify({ html: highlight(homeCode), code: homeCode }),
);
for (const locale of locales) {
  const localizedDemos = demos.map((demo) => ({
    ...demo,
    title: demo.title[locale],
    desc: demo.desc[locale],
    category: demo.category[locale],
  }));
  const localizedPages = pages.filter((page) => page.locale === locale);
  for (const page of localizedPages)
    await write(
      `src/generated/docs/${locale}/${page.id}.json`,
      JSON.stringify({ html: page.html }),
    );
  await write(
    `src/generated/locales/${locale}.json`,
    JSON.stringify({
      pages: localizedPages.map((page) => {
        const meta = { ...page };
        delete meta.html;
        return meta;
      }),
      demos: localizedDemos,
    }),
  );
  if (locale === defaultLocale)
    await write('src/generated/demos.json', JSON.stringify(localizedDemos));
  for (const demo of localizedDemos) {
    const files = [];
    const base = `demos/${demo.id}`;
    const generated = `src/generated/demo-sources/${locale}/${demo.id}`;
    for (const file of await walk(base)) {
      const ext = path.extname(file).slice(1);
      if (!['ts', 'tsx', 'css'].includes(ext)) continue;
      let code = await readFile(file, 'utf8');
      if (ext !== 'css' && demo.id !== 'i18n') code = localizeSource(code, file, locale);
      if (demo.id === 'i18n' && file.endsWith('/src/index.ts')) {
        code = code
          .replace(
            "import zh from '../intl/zh';",
            "import zh from '../intl/zh';\nimport zhTW from '../intl/zh-TW';",
          )
          .replace("defaultLocale: 'zh'", `defaultLocale: '${locale === 'zh-CN' ? 'zh' : locale}'`)
          .replace('dicts: { zh }', "dicts: { zh, 'zh-TW': zhTW }");
      }
      if (demo.id === 'i18n' && file.endsWith('/src/app.tsx')) {
        code = code.replace(
          "state.locale === 'zh' ? '简体中文' : 'English'",
          "state.locale === 'zh' ? '简体中文' : state.locale === 'zh-TW' ? '繁體中文' : 'English'",
        );
        code = code.replace(
          "{'中文'}\n        </button>",
          "{'中文'}\n        </button>\n        <button on:click={() => void switchLocale('zh-TW')}>{'繁體中文'}</button>",
        );
      }
      const name = file.slice(base.length + 1);
      await write(`${generated}/${name}`, code);
      files.push({ name, code, html: highlight(code, ext === 'ts' ? 'typescript' : ext) });
    }
    if (demo.id === 'i18n') {
      const code = await readFile('demos/i18n/intl/zh-TW.tsx', 'utf8');
      await write(`${generated}/intl/zh-TW.tsx`, code);
      files.push({ name: 'intl/zh-TW.tsx', code, html: highlight(code) });
    }
    files.sort(
      (a, b) =>
        Number(!/app\.tsx$/i.test(a.name)) - Number(!/app\.tsx$/i.test(b.name)) ||
        a.name.localeCompare(b.name),
    );
    await write(`src/generated/examples/${locale}/${demo.id}.json`, JSON.stringify(files));
    const main =
      files.find((file) => /^src\/(?:index|main)\.ts$/.test(file.name))?.name ?? 'src/app.tsx';
    const url = localizePath(`/preview/${demo.id}/`, locale);
    const file = `${url.slice(1)}index.html`;
    await write(
      `site/${file}`,
      `<!doctype html><html lang="${locale}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(demo.title)} · Jinge</title><link rel="icon" href="/favicon.svg"><meta name="robots" content="noindex"><style>body{font:14px/1.7 system-ui,sans-serif;padding:20px;color:#26372e;background:#fff}button,input,select,textarea{font:inherit}button{cursor:pointer}button:focus-visible,a:focus-visible,input:focus-visible{outline:2px solid #39794f;outline-offset:3px}</style></head><body><div id="app"></div><script type="module" src="/${generated}/${main}"></script></body></html>`,
    );
    entries.push(file);
  }
}
// Single-page entry: every route is resolved on the client, so GitHub Pages only needs this file.
await write(
  'site/index.html',
  `<!doctype html><html lang="${defaultLocale}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Jinge</title><meta name="theme-color" content="#f6f7f2"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><script>try{const t=localStorage.getItem('jinge-theme');document.documentElement.dataset.theme=t||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light')}catch{}</script><link rel="stylesheet" href="/src/style.css"></head><body><div id="app"></div><script type="module" src="/src/main.tsx"></script></body></html>`,
);
// GitHub Pages answers missing paths with this file; the client restores the real URL from the query.
await write(
  'site/404.html',
  `<!doctype html><html><head><meta charset="utf-8"><title>Jinge</title><script>location.replace('/?__git_pages_redirect='+encodeURIComponent(location.pathname+location.search+location.hash))</script></head><body></body></html>`,
);
entries.unshift('index.html', '404.html');
await write('src/generated/entries.json', JSON.stringify(entries));
highlighter.dispose();
console.log(
  `Generated ${pages.length} translated documents and ${demos.length * locales.length} example previews.`,
);
