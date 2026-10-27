import { mkdir, copyFile, cp } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
await copyFile('index.html', 'dist/index.html');
await cp('assets', 'dist/assets', { recursive: true, filter: (source) => !/\.(jpg|png)$/.test(source) });
await copyFile('_headers', 'dist/_headers');
await copyFile('robots.txt', 'dist/robots.txt');
await copyFile('sitemap.xml', 'dist/sitemap.xml');
console.log('Static site built in dist/');
