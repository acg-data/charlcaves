import { mkdir, copyFile, cp, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { buildRooms } from './room-pages.mjs';
await mkdir('dist', { recursive: true });
let homepage = await readFile('index.html', 'utf8');
for (const file of ['site.css', 'experience.css', 'site.js']) {
  const version = createHash('sha256').update(await readFile(`assets/${file}`)).digest('hex').slice(0, 10);
  homepage = homepage.replaceAll(`/assets/${file}`, `/assets/${file}?v=${version}`);
}
await writeFile('dist/index.html', homepage);
await cp('assets', 'dist/assets', { recursive: true, filter: (source) => !/\.(jpg|png)$/.test(source) });
await copyFile('_headers', 'dist/_headers');
await copyFile('robots.txt', 'dist/robots.txt');
await buildRooms(homepage);
console.log('Homepage, six room pages and sitemap built in dist/');
