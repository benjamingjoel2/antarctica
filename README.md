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
- **Hero:** `public/media/hero-background.webp` plus a transparent foreground cut-out (`hero-foreground.webp`) so the headline sits between the layers. Each has pre-resized variants (`-640/-828/-1080/-1440.webp`, served by `lib/image-loader.ts`) and a 1152×1280 centre crop (`-portrait.webp`) for portrait screens (`components/home/HeroLayer.tsx`). Replace all of them together when swapping the photo.

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

- [ ] Replace placeholder ships and operators (`data/ships.ts`, `placeholder: true`) once partner agreements exist.
- [ ] Verify every duration, price, rule, limit and requirement with partner operators and IAATO. Look for `verify` / `Placeholder` strings.
- [ ] Replace the Seventh Continent milestones in `data/timeline.ts`.
- [ ] Set up the `seventhcontinent@tourground.com` inbox. The business address is La Maquinita Palermo Soho coworking, Buenos Aires (`config/site.ts`). By the owner's decision there is no phone, WhatsApp, social links, testimonials or licence numbers on the site.
- [ ] Replace the Unsplash placeholder photos (`data/images.ts`) and the generated video loops in `public/media/` with licensed footage. Keep the `.vtt` caption files.
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
