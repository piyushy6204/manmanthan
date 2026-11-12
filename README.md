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
- **Imagery**: the six topic illustrations (cropped from the supplied sheet) (`topic-*.jpg`), the hero watercolour, the process watercolour, the books photo and the armchair placeholder are client-supplied artwork. `intro-leaves.jpg` is an AI-generated stand-in; `intro-diptych.jpg` is client-supplied. All paths are in `lib/site-config.ts` and `lib/areas.ts`. Harsha’s portrait is `harsha.jpg` (set in `counsellor.photo`), shown uncropped.


## Enquiry emails (EmailJS + Vercel)

The contact form posts to `app/api/enquiry/route.ts`, which sends each enquiry to the practice inbox through EmailJS. The keys live in environment variables, never in the code.

1. Log in at emailjs.com with the Manmanthan Google account and verify the email address.
2. **Email Services > Add New Service > Gmail > Connect** (sign in with Google). Copy the **Service ID**.
3. **Email Templates > Create New Template.** Paste `docs/emailjs-email-template.html` into the code editor and set:
   Subject `New enquiry from {{name}} (Mann Manthan)`, To Email = the inbox that should receive enquiries, Reply To `{{reply_to}}`, From Name `Mann Manthan Website`. Copy the **Template ID**.
4. **Account > General / API keys:** copy the **Public Key** (and the **Private Key**, recommended).
5. In **Account > Security**, switch on the option that allows the EmailJS API from non-browser (server) applications, and add the site domain `manmanthan.co.in` if there is an allowed-domains setting.
6. In **Vercel > Project > Settings > Environment Variables** add `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`, `EMAILJS_PRIVATE_KEY`, and `NEXT_PUBLIC_SITE_URL=https://www.manmanthan.co.in`. Redeploy.

Until the three required values are set, the form tells the visitor that the enquiry was **not** sent. It never shows a false success.
