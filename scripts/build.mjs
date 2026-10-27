import { mkdir, copyFile, readFile, writeFile, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, join } from 'node:path';
import { buildRooms } from './room-pages.mjs';
const root=resolve('.');
const output=resolve('dist');
if(output!==join(root,'dist') || !output.startsWith(root)) throw new Error('Unsafe output path');
await rm(output,{recursive:true,force:true});
await mkdir(join(output,'assets/img'),{recursive:true});
let homepage=await readFile('index.html','utf8');
for(const file of ['site.css','site.js']) {
  const version=createHash('sha256').update(await readFile('assets/'+file)).digest('hex').slice(0,10);
  homepage=homepage.replaceAll('/assets/'+file,'/assets/'+file+'?v='+version);
}
await writeFile('dist/index.html',homepage);
for(const file of ['site.css','site.js','favicon.svg','img/bar-reference.webp','img/wood-tools.webp']) await copyFile('assets/'+file,'dist/assets/'+file);
await copyFile('_headers','dist/_headers');
await copyFile('robots.txt','dist/robots.txt');
await buildRooms(homepage);
console.log('Built homepage, six room guides and sitemap. Only current assets are deployed.');
