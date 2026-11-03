import { execFile } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';

import { locales } from '../src/locale.ts';
import { parseCsv, writeCsv } from './csv.mjs';

// Standard jinge i18n pipeline: extract keys from source, then compile the committed CSV into
// per-locale dictionaries. `intl/translate.csv` is the source of truth for translations.
const root = path.resolve(import.meta.dirname, '..');
process.chdir(root);
const run = promisify(execFile);
const bin = (name) =>
  path.resolve('node_modules/.bin', `${name}${process.platform === 'win32' ? '.cmd' : ''}`);

await run(bin('intl-extract'), ['--lang', locales.join(','), 'src'], { cwd: root });

const rows = parseCsv(await readFile('intl/translate.csv', 'utf8'));
const header = rows[0];
const idIndex = header.indexOf('id');
const fileIndex = header.indexOf('file');
const origIndex = header.indexOf('orig');
const columns = locales.map((locale) => header.indexOf(locale));

const output = [header];
for (const row of rows.slice(1)) {
  // Generated demo sources are copied per locale; their strings are not part of this site.
  if (row[fileIndex]?.startsWith('src/generated/')) continue;
  if (row[idIndex]) output.push(row);
}

// New copy lands in the CSV with empty columns on purpose: fill every locale before building.
const missing = [];
for (const row of output.slice(1))
  locales.forEach((locale, index) => {
    if (!row[columns[index]]) missing.push(`${row[idIndex]} (${locale}): ${row[origIndex]}`);
  });
if (missing.length)
  throw new Error(
    `intl/translate.csv is missing ${missing.length} translation(s):\n  ${missing.join('\n  ')}`,
  );

await writeFile('intl/translate.csv', writeCsv(output), 'utf8');
await run(bin('intl-compile'), [], { cwd: root });
console.log(`Compiled ${output.length - 1} strings for ${locales.join(', ')}.`);
