import ts from '@typescript/typescript6';
import { readFile } from 'node:fs/promises';

import { parseCsv } from './csv.mjs';

/** Display text inside `demos/**`: translated here, so it is not part of the runtime i18n CSV. */
const [demoHeader, ...demoRows] = parseCsv(
  await readFile(new URL('../intl/demos.csv', import.meta.url), 'utf8'),
);
const sourceColumn = demoHeader.indexOf('source');
const twColumn = demoHeader.indexOf('zh-TW');
const enColumn = demoHeader.indexOf('en');
const traditional = {};
const english = {};
for (const row of demoRows) {
  const source = row[sourceColumn];
  if (!source) continue;
  traditional[source] = row[twColumn];
  english[source] = row[enColumn];
}

export function translate(value, locale) {
  if (locale === 'zh-CN' || !/\p{Script=Han}/u.test(value)) return value;
  const table = locale === 'zh-TW' ? traditional : english;
  if (!Object.hasOwn(table, value))
    throw new Error(`Missing ${locale} translation: ${JSON.stringify(value)}`);
  return table[value];
}

export function localizeSource(source, file, locale) {
  if (locale === 'zh-CN') return source;
  const tree = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );
  const edits = [];
  function visit(node) {
    if (ts.isJsxText(node)) {
      const raw = node.getText(tree);
      const key = raw.replace(/\s+/g, ' ').trim();
      if (/\p{Script=Han}/u.test(key)) {
        let value = translate(key, locale);
        if (!raw.includes('\n'))
          value = (raw.startsWith(' ') ? ' ' : '') + value + (raw.endsWith(' ') ? ' ' : '');
        edits.push({
          start: node.getStart(tree),
          end: node.getEnd(),
          value: `{${JSON.stringify(value)}}`,
        });
      }
    } else if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      if (/\p{Script=Han}/u.test(node.text)) {
        const value = JSON.stringify(translate(node.text, locale));
        edits.push({
          start: node.getStart(tree),
          end: node.getEnd(),
          value: ts.isJsxAttribute(node.parent) ? `{${value}}` : value,
        });
      }
    } else if (ts.isTemplateExpression(node)) {
      const key =
        node.head.text +
        node.templateSpans.map((span, index) => `{${index}}` + span.literal.text).join('');
      if (/\p{Script=Han}/u.test(key)) {
        const value = translate(key, locale)
          .replaceAll('`', '\\`')
          .replace(
            /\{(\d+)\}/g,
            (_, index) => '${' + node.templateSpans[Number(index)].expression.getText(tree) + '}',
          );
        edits.push({ start: node.getStart(tree), end: node.getEnd(), value: '`' + value + '`' });
        return;
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  return edits
    .sort((a, b) => b.start - a.start)
    .reduce((text, edit) => text.slice(0, edit.start) + edit.value + text.slice(edit.end), source);
}
