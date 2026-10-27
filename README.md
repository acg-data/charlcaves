# Charleston Caves

Custom room website for Charleston Caves.

Live: https://charlestoncaves.justin-b75.workers.dev

Static HTML/CSS/JavaScript on Cloudflare Workers Static Assets. The Worker saves inquiries in private D1 storage. No business email or phone has been supplied; email notifications are not configured.

## Local preview

```sh
npm ci
npx wrangler d1 migrations apply charlestoncaves-inquiries --local
npm run dev
```

The build recreates only the project's dist directory. It generates the homepage, six room guides and sitemap, fingerprints CSS/JavaScript and copies an explicit list of current assets. Archived mockup crops and generated artwork are not deployed.

Room guide content is in content/rooms.mjs. The template is scripts/room-pages.mjs.

## Deploy

```sh
npx wrangler d1 migrations apply charlestoncaves-inquiries --remote
npm run deploy
```

Worker: charlestoncaves. D1: charlestoncaves-inquiries. Account: b750824d7f77ea68f5630ba69e740894. Credentials use Wrangler login; no secrets are stored in source.

## Read inquiries

Use Cloudflare → Storage & databases → D1 → charlestoncaves-inquiries → Console:

```sql
SELECT created_at, name, email, phone, space, finish, message
FROM inquiries ORDER BY created_at DESC;
```

Or run:

```sh
npx wrangler d1 execute charlestoncaves-inquiries --remote --command "SELECT created_at, name, email, phone, space, finish, message FROM inquiries ORDER BY created_at DESC LIMIT 100"
```

Success is shown only after the database write completes. The endpoint validates fields, origin, content type and bounded body size, with a honeypot and per-IP rate limit.

Finish storage keys remain compatible with existing inquiries: The Club = warm wood & leather; The Library = dark wood & brass; The Screening Room = dark, low-glare finishes. The preference is optional.

## Content and photography

The current photos are licensed Unsplash references, clearly credited on the page. They are not presented as Charleston Caves projects. Sources and archival generation notes are in assets/IMAGE-SOURCES.md.

The user rejected the prior generated scenes, made-up Friday Room story and ornamental luxury styling. Those are removed from the deployment. The six room guides, optional finish selection, FAQs and inquiry flow remain.

No founder section, invented reviews, prices or fixed schedules are published. Real project photographs and a notification email remain future inputs. The free workers.dev address is the selected launch URL.
