# Seventh Continent

Marketing site for Seventh Continent, independent Antarctica expedition specialists.
Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis · react-hook-form + zod · MDX.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## Design system

The site follows the reference's design language, re-skinned for Seventh Continent:

- **Type:** Archivo (variable width, regular weight) for the giant uppercase display, Inter Tight for text, and VT323 for the small mono labels and buttons. The reference uses Neue Montreal and VCR OSD Mono, which we do not ship.
- **Colour roles:** deep polar navy `#030b17` (dark), glacier white `#e8f0f8` (light), iceberg blue `#8db8dc` (support), slate grey, and expedition orange `#ff5b1f` as the single accent (the "Plan my expedition" button, focus rings, verify markers).
- **Hero:** a layered parallax photo (`components/home/HeroParallax.tsx`): `public/media/hero-background.webp` (an iceberg in the Lemaire Channel) and `hero-foreground.webp`, the same photo with the sky cut away so the headline sits between the layers. Both have pre-resized variants (`-640/-828/-1080/-1440.webp` and `-portrait.webp`, served by `lib/image-loader.ts`). Replace them together when swapping the photo.
- **Photos:** `public/media/photos/<name>.jpg` (about 1600px) plus `<name>-800.jpg`; `lib/image-loader.ts` serves the small copy for widths up to 828px.

## Languages

English (default, current URLs), French (`/fr`), German (`/de`) and Spanish (`/es`). English pages live in `app/(en)`; `npm run build` first runs `scripts/i18n-build.mjs`, which writes translated copies of the routes to `app/{fr,de,es}` and of `components`, `lib`, `data`, `config` to `.i18n/<locale>` (all git-ignored) using the dictionaries in `i18n/{fr,de,es}.json` (English string -> translation; `file::string` keys for context-specific words, `a|b` keys for split headings) and the translated journal posts in `i18n/content/<locale>/`. Every locale is pre-rendered; no translation code ships to the browser. After changing copy, run `npm run i18n:extract && npm run i18n:missing` and add the new strings to all three dictionaries. Do not write a bare `"/"` string in shared code that must stay a path (the build prefixes it); see `SLASH` in `lib/seo.tsx`.

## Where things live

| Path | What |
| --- | --- |
| `config/` | Brand and contact details (`site.ts`), navigation (`nav.ts`), currencies and FX rates (`currency.ts`), season dates (`season.ts`) |
| `data/` | Typed content: routes, expeditions, ships, experiences, timeline, facts, FAQs, months, posts, legal pages (`legal.ts`), and the image registry. Pages are generated from these files, so they can be swapped for a CMS later. |
| `content/journal/*.mdx` | Journal post bodies. Post metadata is in `data/posts.ts`. |
| `components/layout` | Header, image-led menu, footer + newsletter, cookie consent, page transition, smooth scroll |
| `components/home` | Layered parallax hero, Drake ribbon, discover counters, full-screen video, "Sailing with" grid |
| `components/sections` | Reusable inner-page sections (card grid, detail hero, credits grid, timeline rows, horizontal ships…) |
| `components/planner` | 5-step expedition planner (`/plan-my-expedition`, also opened as an intercepted-route modal) |
| `components/penguin` | Penguin mode easter egg (header toggle or `/penguin-mode`) and the original SVG mascot |
| `app/api/plan` | Planner submissions: validated with zod and logged. **TODO:** email/CRM integration. |
| `app/api/newsletter` | Newsletter sign-ups: logged. **TODO:** connect an email platform. |

## Before launch (checklist)

- [ ] Ships in `data/ships.ts` are sample profiles and operators are described by type ("IAATO-member expedition operator"), not named. Swap in the real ships, operators and specifications once partner agreements exist.
- [ ] Verify every duration, price, rule, limit and requirement with partner operators and IAATO. The "verify" notes stay in `data/` (`verifyNote`, `verify: true`) but `components/ui/VerifyNote.tsx` renders nothing, so they never show on public pages.
- [ ] Add confirmed Seventh Continent milestones to `data/timeline.ts` (category `"us"`, plus the filter in `app/(en)/timeline/page.tsx`). The unconfirmed ones were removed.
- [ ] Set up the `seventhcontinent@tourground.com` inbox. The business address is La Maquinita Palermo Soho coworking, Buenos Aires (`config/site.ts`). By the owner's decision there is no phone, WhatsApp, social links, testimonials or licence numbers on the site.
- [ ] Photos and the two video loops are real Antarctic, South Georgia and Drake Passage material from Wikimedia Commons (CC BY, CC BY-SA, public domain), registered in `data/images.ts` and credited only on the footer-linked `/photo-credits` page (generated from `data/photo-credits.json` + `data/photo-credits.ts`; also `public/media/photos/CREDITS.md`, `public/media/ships/CREDITS.md`). Swap in the owner's own photography when it exists, keep every photo Antarctic, and never put a credit on or under a photo. The video in both loops comes from a YouTube upload whose CC BY 3.0 licence is still awaiting Commons licence review.
- [ ] Wire up `/api/plan` and `/api/newsletter`, and gate analytics on `useConsent()`.
- [ ] Swap the static FX rates in `config/currency.ts` for a live source.
- [ ] Have a lawyer review the privacy policy, booking terms and cookie policy (`data/legal.ts`, pages `/privacy`, `/terms`, `/cookies`; `/legals` and `/testimonials` redirect).

## Performance notes

- Background videos load nothing until near the viewport; on phones, coarse pointers and Save-Data they show the poster and only download when the visitor presses play (`components/ui/BackgroundVideo.tsx`).
- Lenis is loaded on demand and only for fine pointers (`components/layout/SmoothScroll.tsx`).
- `useReducedMotionSafe` (`lib/`) avoids hydration mismatches for reduced-motion visitors.
- `vercel.json` caches `/media` for a week with stale-while-revalidate (file names are not hashed).

## Accessibility notes

- With `prefers-reduced-motion`, smooth scroll, parallax, page transitions and autoplaying video are all off. The horizontal ships page stacks vertically.
- Background videos have caption tracks and a pause control. Menus and modals close with Esc. Forms use real inputs with labels and inline errors.
- The reference's "rotate your phone" overlay was deliberately left out: blocking an orientation fails WCAG 1.3.4.
