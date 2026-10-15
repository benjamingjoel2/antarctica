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

## Where things live

| Path | What |
| --- | --- |
| `config/` | Brand, contact details and WhatsApp number (`site.ts`), navigation (`nav.ts`), currencies and FX rates (`currency.ts`), season dates (`season.ts`) |
| `data/` | Typed content: routes, expeditions, ships, experiences, timeline, facts, testimonials, FAQs, months, posts, and the image registry. Pages are generated from these files, so they can be swapped for a CMS later. |
| `content/journal/*.mdx` | Journal post bodies. Post metadata is in `data/posts.ts`. |
| `components/layout` | Header, image-led menu, footer + newsletter, cookie consent, page transition, smooth scroll, WhatsApp button |
| `components/home` | Layered parallax hero, Drake ribbon, discover counters, full-screen video, "Sailing with" grid |
| `components/sections` | Reusable inner-page sections (card grid, detail hero, credits grid, timeline rows, horizontal ships…) |
| `components/planner` | 5-step expedition planner (`/plan-my-expedition`, also opened as an intercepted-route modal) |
| `components/penguin` | Penguin mode easter egg (header toggle or `/penguin-mode`) and the original SVG mascot |
| `app/api/plan` | Planner submissions: validated with zod and logged. **TODO:** email/CRM integration. |
| `app/api/newsletter` | Newsletter sign-ups: logged. **TODO:** connect an email platform. |

## Before launch (checklist)

- [ ] Replace placeholder ships and operators (`data/ships.ts`, `placeholder: true`) once partner agreements exist.
- [ ] Verify every duration, price, rule, limit and requirement with partner operators and IAATO. Look for `verify` / `Placeholder` strings.
- [ ] Replace the placeholder testimonials and the Seventh Continent milestones in `data/timeline.ts`.
- [ ] Set real contact details and the WhatsApp number (`config/site.ts`), plus `NEXT_PUBLIC_SITE_URL`.
- [ ] Replace the Unsplash placeholder photos (`data/images.ts`) and the generated video loops in `public/media/` with licensed footage. Keep the `.vtt` caption files.
- [ ] Wire up `/api/plan` and `/api/newsletter`, and gate analytics on `useConsent()`.
- [ ] Swap the static FX rates in `config/currency.ts` for a live source.
- [ ] Have the legal notice and privacy policy (`app/legals`) reviewed.

## Accessibility notes

- With `prefers-reduced-motion`, smooth scroll, parallax, page transitions and autoplaying video are all off. The horizontal ships page stacks vertically.
- Background videos have caption tracks and a pause control. Menus and modals close with Esc. Forms use real inputs with labels and inline errors.
- The reference's "rotate your phone" overlay was deliberately left out: blocking an orientation fails WCAG 1.3.4.
