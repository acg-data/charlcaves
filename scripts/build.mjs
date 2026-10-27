import { mkdir, copyFile, cp, readFile, writeFile, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, join } from 'node:path';
import { buildRooms } from './room-pages.mjs';
import { responsiveImages } from '../content/images.mjs';
const root = resolve('.');
const output = resolve('dist');
if (output !== join(root, 'dist') || !output.startsWith(root)) throw new Error('Unsafe output path');
await rm(output, { recursive: true, force: true });
await mkdir('dist', { recursive: true });
let homepage = await readFile('index.html', 'utf8');
for (const file of ['site.css', 'experience.css', 'site.js']) {
  const version = createHash('sha256').update(await readFile(`assets/${file}`)).digest('hex').slice(0, 10);
  homepage = homepage.replaceAll(`/assets/${file}`, `/assets/${file}?v=${version}`);
}
await writeFile('dist/index.html', responsiveImages(homepage));
await cp('assets', 'dist/assets', { recursive: true, filter: (source) => !/\.(jpg|png|md|json)$/.test(source) });
await copyFile('_headers', 'dist/_headers');
await copyFile('robots.txt', 'dist/robots.txt');
await buildRooms(homepage);
console.log('Homepage, six room pages and sitemap built in dist/');
