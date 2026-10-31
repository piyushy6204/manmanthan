# Mann Manthan: counselling psychology website

Next.js 15 (App Router), React, TypeScript, Tailwind CSS 3, Lucide React, Framer Motion.
Fonts (Playfair Display, Lato, per the client mood board) are self-hosted via Fontsource, so no Google Fonts request is made.

## Run

```bash
npm install
cp .env.example .env.local   # then fill in what you have
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run lint && npm run typecheck
```

## What to configure

| Item | Where |
|---|---|
| Phone, WhatsApp, email | `.env.local` (`NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_EMAIL`). Digits only with country code, e.g. `919876543210`. |
| Enquiry delivery | `ENQUIRY_WEBHOOK_URL` (server only). The form POSTs JSON to `/api/enquiry`, which forwards it to this URL. Until it is set, the form says the enquiry was **not** sent. It never shows a fake success. |
| Site URL (Open Graph) | `NEXT_PUBLIC_SITE_URL` |
| Harsha's photograph | Drop the file in `public/images/`, then set `counsellor.photo` in `lib/site-config.ts` |
| Hero image | `images.heroEmblem` in `lib/site-config.ts`. Currently the brand emblem inside an arch. Replace with a natural photograph when available. |
| Testimonials | `verifiedTestimonials` in `components/Testimonials.tsx`. Only add genuine feedback given with permission. |
| Address / socials | `contact.address` in `lib/site-config.ts`. Shown in the footer only when filled. |
| Privacy Policy / Terms | `app/privacy/page.tsx`, `app/terms/page.tsx`. General starting text: please have it reviewed before launch. |

While phone/WhatsApp are blank, the floating controls and drawer buttons scroll to the enquiry form instead of linking to a number.

## Structure

`app/page.tsx` composes the sections; `components/` holds one component per section; `lib/site-config.ts` is the single source for brand, nav, contact and image slots; `lib/areas.ts` holds the six areas of help; `lib/enquiry.ts` is the validation shared by the form and API.

## Refinement notes (Classic Serenity)

- **Palette tokens** live in `app/globals.css` and follow the client mood board: forest `#073D32`, gold `#C79543`, ivory `#F8F5EF`, mist `#DCE6DC`, sand `#EFE3CD`, ink `#303A35` (plus sage `#A9BBA8` for decorative strokes). Tailwind maps them in `tailwind.config.ts`. Do not add raw hex values to components.
- **Type system** is defined once in `globals.css`: `.display` (hero), `.h2`, `.h3`, `.lede`, `.eyebrow`, `.body-copy`, `.small-copy`.
- **Logo**: `public/images/logo-lockup.png` is the original emblem and wordmark arranged side by side (header and drawer). The footer uses the full original logo.
- **Imagery**: the six topic illustrations (`topic-*.jpg`), the hero watercolour, the process watercolour, the books photo and the armchair placeholder are client-supplied artwork. `intro-leaves.jpg` and `intro-diptych.jpg` are AI-generated stand-ins. All paths are in `lib/site-config.ts` and `lib/areas.ts`. Harsha's portrait goes in `counsellor.photo`.
