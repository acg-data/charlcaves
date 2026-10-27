# Charleston Caves

Website for Charleston Caves — custom private bars, golf rooms, home theaters and garages in Charleston, SC.

Live site: https://charlestoncaves.justin-b75.workers.dev

Static HTML, CSS and JavaScript, served by Cloudflare Workers Static Assets. The small Worker handles the inquiry form and saves submissions in a private D1 database. No business phone or email has been supplied, so neither is published and email notifications are not configured.

## Preview locally

```sh
npm ci
npx wrangler d1 migrations apply charlestoncaves-inquiries --local
npm run dev
```

Open the local address printed by Wrangler. `npm run build` creates the homepage, six room pages and sitemap in `dist/`. Source JPEGs and PNGs remain in the repository but are not shipped. Production uses optimized WebP images, with versioned CSS and JavaScript URLs.

Room copy lives in `content/rooms.mjs`; `scripts/room-pages.mjs` generates the room pages. The homepage includes property-planning guidance, the Friday Room concept study, an illustrative floor plan, three selectable finish directions and practical FAQs. A chosen finish follows the visitor into the inquiry form and is saved with the inquiry. No founder section is included.

The original dark visual identity is preserved at the user's request. Nine new room/material concepts replace the soft mockup crops, with 480, 960 and 1536-pixel WebP variants selected through `srcset`. The hero retains the five-person gathering; it appears only once. Room and finish images retain full 3:2 compositions, and the mobile hero image flows above its copy. Image dimensions reserve space before loading.

The inquiry starts with property stage (own a home, house hunting, planning a new build, or exploring). An optional public listing/floor-plan URL is stored with the inquiry. The server validates its scheme and length but never fetches it. Optional finish selection sits behind a disclosure. Migration `0003_property_context.sql` adds both property fields without removing existing data or breaking older cached forms.

Run `npm test` for inquiry validation and persistence failure tests. A local browser submission verifies the complete form and D1 integration.

## Deploy

```sh
npx wrangler d1 migrations apply charlestoncaves-inquiries --remote
npm run deploy
```

Cloudflare account: `b750824d7f77ea68f5630ba69e740894`. Worker: `charlestoncaves`. Inquiries database: `charlestoncaves-inquiries`. Credentials come from Wrangler login; no secrets are stored in this repository.

## Read inquiries

In Cloudflare, open **Storage & databases → D1 → charlestoncaves-inquiries → Console**. Run:

```sql
SELECT created_at, name, email, phone, property_stage, property_url, space, finish, message
FROM inquiries ORDER BY created_at DESC;
```

Or, from an authenticated terminal:

```sh
npx wrangler d1 execute charlestoncaves-inquiries --remote --command "SELECT created_at, name, email, phone, property_stage, property_url, space, finish, message FROM inquiries ORDER BY created_at DESC LIMIT 100"
```

Submission success means the database write completed. The endpoint checks same-origin requests, field lengths, request size and required fields. A honeypot and per-IP rate limit reduce automated submissions. There is no public endpoint for listing inquiries.

## Content notes

- Current imagery is AI-generated concept artwork. Asset provenance, actual dimensions and the saved prompt set are recorded in `assets/IMAGE-SOURCES.md` and `assets/IMAGE-PROMPTS.json`. Replace concepts with real project photography when available; update all responsive variants alongside the originals.
- Confirm the supplied process and materials descriptions before advertising the site.
- When a business email is chosen, add inquiry notifications. Until then, review D1 for submissions.
- The free Cloudflare address is the chosen launch URL. No custom domain was purchased or connected.
