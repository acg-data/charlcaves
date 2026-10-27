import { mkdir, writeFile } from 'node:fs/promises';
import { rooms } from '../content/rooms.mjs';
import { conceptImages, responsiveImages } from '../content/images.mjs';

const origin = 'https://charlestoncaves.justin-b75.workers.dev';
const escape = value => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const contact = room => `/?space=${encodeURIComponent(room.name)}#contact`;
const imageSizes = Object.fromEntries([...conceptImages].map(name => [name, [1536, 1024]]));
const dimensions = name => `width="${imageSizes[name][0]}" height="${imageSizes[name][1]}"`;

export async function buildRooms(homepage) {
  const head = homepage.match(/<head>[\s\S]*?<\/head>/)[0];
  const header = homepage.match(/<header class="site-header">[\s\S]*?<\/header>/)[0].replaceAll('href="#', 'href="/#');
  const footer = homepage.match(/<footer[\s\S]*?<\/footer>/)[0].replaceAll('href="#', 'href="/#');
  for (const [index, room] of rooms.entries()) {
    const roomHead = head
      .replace(/<title>.*?<\/title>/, `<title>${escape(room.name)} — Charleston Caves</title>`)
      .replace(/<meta name="description"[^>]+>/, `<meta name="description" content="${escape(room.description)}">`)
      .replace(/<meta property="og:title"[^>]+>/, `<meta property="og:title" content="${escape(room.name)} — Charleston Caves">`)
      .replace(/<meta property="og:description"[^>]+>/, `<meta property="og:description" content="${escape(room.description)}">`)
      .replace(/<meta property="og:image"[^>]+>/, `<meta property="og:image" content="${origin}/assets/img/${room.image}.webp">`)
      .replace(/<link rel="canonical"[^>]+>/, `<link rel="canonical" href="${origin}/spaces/${room.slug}/">`);
    const related = [rooms[(index + 1) % rooms.length], rooms[(index + 2) % rooms.length]];
    const html = `<!doctype html>
<html lang="en">${roomHead}
<body class="room-page" data-room="${room.slug}">
<!-- THESIS: Explore the room through its use, material and planning considerations.
OWN-WORLD: Established Charleston Caves typography, dark timber palette, bronze and parchment.
PATH: Room atmosphere, possibilities, planning questions, inquiry, related rooms.
INTERACTION: Room selection carries into the homepage inquiry; finishes remain visitor-selectable.
TRUTH: Illustrative concepts, no completed-project or fixed specification claims. -->
<a class="skip-link" href="#main">Skip to content</a>${header}
<main id="main" class="room-main wrap">
<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/#spaces">Spaces</a><span aria-hidden="true">/</span><span aria-current="page">${escape(room.name)}</span></nav>
<section class="room-intro" aria-labelledby="room-title"><div><h1 id="room-title">${room.headline}</h1><p>${escape(room.intro)}</p><a class="button" href="${contact(room)}">Plan a room like this <span aria-hidden="true">↗</span></a></div><figure><img src="/assets/img/${room.image}.webp" alt="${escape(room.imageAlt)}" ${dimensions(room.image)} ${room.slug === 'bars-lounges' ? 'data-image-layout="wide"' : ''} fetchpriority="high"><figcaption>${escape(room.name)} · AI-generated design concept</figcaption></figure></section>
<section class="room-details section-space" aria-labelledby="details-title"><figure><img src="/assets/img/${room.detailImage}.webp" alt="${escape(room.detailAlt)}" ${dimensions(room.detailImage)} loading="lazy"></figure><div><h2 id="details-title">Consider the<br><em>possibilities.</em></h2><ul class="feature-list">${room.features.map(([title,body]) => `<li><h3>${escape(title)}</h3><p>${escape(body)}</p></li>`).join('')}</ul><a class="text-link" href="/?palette=${encodeURIComponent(room.finish)}#materials">Explore a finish direction <span aria-hidden="true">↗</span></a></div></section>
<section class="room-planning section-space" aria-labelledby="planning-title"><div><h2 id="planning-title">Bring the idea.<br>We’ll start there.</h2><p>${escape(room.note)}</p></div><ul>${room.planning.map(q => `<li>${escape(q)}</li>`).join('')}</ul></section>
<section class="room-cta section-space"><div><h2>Make it <em>your own.</em></h2><p>Have a room in mind, or a house you’re considering? Tell us what you’d like to create.</p></div><a class="button" href="${contact(room)}">Start the conversation <span aria-hidden="true">↗</span></a></section>
<section class="related-rooms section-space" aria-labelledby="related-title"><div class="section-heading"><h2 id="related-title">Another way to <em>spend the evening.</em></h2></div><div class="related-grid">${related.map(r => `<a class="space" href="/spaces/${r.slug}/"><div class="space-image"><img src="/assets/img/${r.image}.webp" alt="${escape(r.imageAlt)}" ${dimensions(r.image)} loading="lazy"></div><div class="space-caption"><h3>${escape(r.name)}</h3><span aria-hidden="true">↗</span></div></a>`).join('')}</div></section>
</main>${footer}</body></html>`;
    await mkdir(`dist/spaces/${room.slug}`, { recursive: true });
    await writeFile(`dist/spaces/${room.slug}/index.html`, responsiveImages(html));
  }
  const urls = ['/', ...rooms.map(room => `/spaces/${room.slug}/`)];
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(path=>`<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>\n`);
}
