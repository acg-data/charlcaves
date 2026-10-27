import { mkdir, writeFile } from 'node:fs/promises';
import { rooms } from '../content/rooms.mjs';
const origin='https://charlestoncaves.justin-b75.workers.dev';
const escape=value=>value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const contact=room=>'/?space='+encodeURIComponent(room.name)+'#contact';
export async function buildRooms(homepage) {
  const head=homepage.match(/<head>[\s\S]*?<\/head>/)[0];
  const header=homepage.match(/<header class="site-header">[\s\S]*?<\/header>/)[0].replaceAll('href="#','href="/#');
  const footer=homepage.match(/<footer[\s\S]*?<\/footer>/)[0];
  for(const [index,room] of rooms.entries()) {
    const roomHead=head
      .replace(/<title>.*?<\/title>/,'<title>'+escape(room.title)+' — Charleston Caves</title>')
      .replace(/<meta name="description"[^>]+>/,'<meta name="description" content="'+escape(room.description)+'">')
      .replace(/<meta property="og:title"[^>]+>/,'<meta property="og:title" content="'+escape(room.title)+' — Charleston Caves">')
      .replace(/<meta property="og:description"[^>]+>/,'<meta property="og:description" content="'+escape(room.description)+'">')
      .replace(/<link rel="canonical"[^>]+>/,'<link rel="canonical" href="'+origin+'/spaces/'+room.slug+'/">');
    const related=[rooms[(index+1)%rooms.length],rooms[(index+2)%rooms.length]];
    const html='<!doctype html>\n<html lang="en">'+roomHead+'\n<body id="top" class="room-page">'+
      '<!-- Room planning guide. Same visual system as the homepage; no synthetic project photography or invented project claims. -->'+
      '<a class="skip-link" href="#main">Skip to content</a>'+header+
      '<main id="main" class="room-main wrap">'+
      '<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/#spaces">Rooms</a><span aria-hidden="true">/</span><span aria-current="page">'+escape(room.title)+'</span></nav>'+
      '<section class="room-intro" aria-labelledby="room-title"><h1 id="room-title">'+escape(room.title)+'</h1><div><p>'+escape(room.intro)+'</p><a class="button" href="'+contact(room)+'">Discuss your room <span aria-hidden="true">↗</span></a></div></section>'+
      '<section class="room-details section" aria-labelledby="details-title"><h2 id="details-title">What to plan for.</h2><ul class="feature-list">'+room.features.map(([title,body])=>'<li><h3>'+escape(title)+'</h3><p>'+escape(body)+'</p></li>').join('')+'</ul></section>'+
      '<section class="room-planning section" aria-labelledby="planning-title"><div><h2 id="planning-title">Bring these details.</h2><p>'+escape(room.note)+'</p></div><ul>'+room.planning.map(q=>'<li>'+escape(q)+'</li>').join('')+'</ul></section>'+
      '<section class="room-cta section"><div><h2>Have a room in mind?</h2><p>Tell us about the space and what you want to do with it.</p></div><a class="button" href="'+contact(room)+'">Start an inquiry <span aria-hidden="true">↗</span></a></section>'+
      '<section class="related-rooms section" aria-labelledby="related-title"><h2 id="related-title">Other room guides</h2><div class="related-links">'+related.map(r=>'<a href="/spaces/'+r.slug+'/">'+escape(r.title)+' <span aria-hidden="true">↗</span></a>').join('')+'</div></section>'+
      '</main>'+footer+'</body></html>';
    await mkdir('dist/spaces/'+room.slug,{recursive:true});
    await writeFile('dist/spaces/'+room.slug+'/index.html',html);
  }
  const urls=['/',...rooms.map(room=>'/spaces/'+room.slug+'/')];
  await writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(path=>'<url><loc>'+origin+path+'</loc></url>').join('')+'</urlset>\n');
}
