# Charleston Caves

Landing page for Charleston Caves — custom private bars, golf rooms, home theaters and garages in Charleston, SC.

Live site: https://charlestoncaves.justin-b75.workers.dev

Static HTML, CSS and JavaScript, served by Cloudflare Workers Static Assets. The small Worker handles the inquiry form and saves submissions in a private D1 database. No business phone or email has been supplied, so neither is published and email notifications are not configured.

## Preview locally

```sh
npm ci
npx wrangler d1 migrations apply charlestoncaves-inquiries --local
npm run dev
```

Open the local address printed by Wrangler. `npm run build` copies only deployable files into `dist/`; source JPEGs and texture PNGs remain in the repository but are not shipped. Production uses optimized WebP images.

## Deploy

```sh
npx wrangler d1 migrations apply charlestoncaves-inquiries --remote
npm run deploy
```

Cloudflare account: `b750824d7f77ea68f5630ba69e740894`. Worker: `charlestoncaves`. Inquiries database: `charlestoncaves-inquiries`. Credentials come from Wrangler login; no secrets are stored in this repository.

## Read inquiries

In Cloudflare, open **Storage & databases → D1 → charlestoncaves-inquiries → Console**. Run:

```sql
SELECT created_at, name, email, phone, space, message
FROM inquiries ORDER BY created_at DESC;
```

Or, from an authenticated terminal:

```sh
npx wrangler d1 execute charlestoncaves-inquiries --remote --command "SELECT created_at, name, email, phone, space, message FROM inquiries ORDER BY created_at DESC LIMIT 100"
```

Submission success means the database write completed. The endpoint checks same-origin requests, field lengths, request size and required fields. A honeypot and per-IP rate limit reduce automated submissions. There is no public endpoint for listing inquiries.

## Content notes

- Current imagery is illustrative and comes from the supplied mockup crops. Replace it with full-resolution photography when available; update WebP files alongside the originals.
- Confirm the supplied process and materials descriptions before advertising the site.
- When a business email is chosen, add inquiry notifications. Until then, review D1 for submissions.
- The free Cloudflare address is the chosen launch URL. No custom domain was purchased or connected.
