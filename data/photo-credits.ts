import { mainNav } from "@/config/nav";
import { expeditions } from "./expeditions";
import { experiences } from "./experiences";
import { img } from "./images";
import { months } from "./months";
import { posts } from "./posts";
import sources from "./photo-credits.json";
import { routes } from "./routes";
import { shipPhotos } from "./ship-photos";
import { ships } from "./ships";
import { timeline } from "./timeline";
import type { Img } from "./types";

/**
 * Photo credits, listed on /photo-credits (linked from the footer) and never on or
 * under a photo. Photographer, licence and source URL for each file live in
 * `photo-credits.json` (keyed by file path); this file adds what the photo shows,
 * what we changed, and works out where on the site each photo is used.
 */

export interface PhotoSource {
  file: string;
  title: string;
  author: string;
  licence: string;
  licenceUrl: string;
  source: string;
}

export interface PhotoUse {
  label: string;
  href?: string;
}

export interface PhotoCredit extends PhotoSource {
  shows: string;
  changes: string;
  uses: PhotoUse[];
}

const RESIZED = "Resized";
const CROPPED = "Cropped and resized";

/** What each file shows and what was changed, in the order the credits page lists them. */
const files: { file: string; shows: string; changes: string }[] = [
  { file: "/media/hero-background.webp", shows: "An iceberg below snowy peaks in the Lemaire Channel", changes: "Resized; the sky is cut away in a second layer for the home page hero" },
  { file: "/media/bottom-of-the-world.mp4", shows: "A calm polar channel walled by snow peaks", changes: "Short excerpt, resized and re-encoded" },
  { file: "/media/expedition-loop.mp4", shows: "An iceberg in The Gullet, Antarctica", changes: "Short excerpt, cropped to portrait and re-encoded" },
  { file: img.icebergsReflect, shows: "Icebergs mirrored in still water in the Lemaire Channel", changes: CROPPED },
  { file: img.snowRidge, shows: "Snow-capped ice cliffs and icebergs in the Lemaire Channel", changes: RESIZED },
  { file: img.snowflake, shows: "Close-up of layered glacial ice on an Antarctic iceberg", changes: CROPPED },
  { file: img.snowPeaks, shows: "Snow-covered mountains on the Antarctic Peninsula", changes: RESIZED },
  { file: img.peaksAboveCloud, shows: "Low cloud over the glaciers at Neko Harbour", changes: CROPPED },
  { file: img.glacier, shows: "The glacier front in Andvord Bay on the Antarctic Peninsula", changes: RESIZED },
  { file: img.redParka, shows: "A kayaker in a red jacket among the ice near Neko Harbour", changes: RESIZED },
  { file: img.sky, shows: "Blue sky over Paradise Bay on the Antarctic Peninsula", changes: CROPPED },
  { file: img.snowHut, shows: "The historic hut at Port Lockroy beneath snowy peaks", changes: RESIZED },
  { file: img.gentooRock, shows: "A gentoo penguin at Brown Bluff on the Antarctic Sound", changes: CROPPED },
  { file: img.leopardSeal, shows: "A leopard seal resting on ice in the Antarctic Sound", changes: RESIZED },
  { file: img.penguinWalk, shows: "An Adélie penguin on snow at Hope Bay, Antarctica", changes: RESIZED },
  { file: img.penguinsSnow, shows: "Adélie penguins on snow in the South Shetland Islands", changes: RESIZED },
  { file: img.humpback, shows: "A humpback whale raising its tail off the Antarctic Peninsula", changes: CROPPED },
  { file: img.emperor, shows: "An emperor penguin leaping from the water in the Weddell Sea", changes: RESIZED },
  { file: img.oceanDusk, shows: "Sunset over the Southern Ocean", changes: RESIZED },
  { file: img.boatNight, shows: "Tabular icebergs at sunset, seen from the ship", changes: RESIZED },
  { file: img.wave, shows: "Spray breaking over the bow in the Drake Passage", changes: RESIZED },
  { file: img.fjordReflect, shows: "Mount Herschel above Cape Hallett in the Ross Sea", changes: CROPPED },
  { file: img.cloudSea, shows: "Cloud wrapped around Beaufort Island in the Ross Sea", changes: CROPPED },
  { file: img.discoveryHut, shows: "Scott's Discovery Hut on Ross Island", changes: CROPPED },
  { file: img.nightPeaks, shows: "Nacreous clouds glowing above McMurdo Station at twilight", changes: CROPPED },
  { file: img.underwater, shows: "Beneath the sea ice in McMurdo Sound, Antarctica", changes: RESIZED },
  { file: img.tent, shows: "Tents at Union Glacier camp in the Antarctic interior", changes: RESIZED },
  { file: img.kingPenguins, shows: "A king penguin colony on Salisbury Plain, South Georgia", changes: CROPPED },
  { file: img.kingPenguinLight, shows: "A king penguin among brown chicks in a South Georgia colony", changes: RESIZED },
  { file: img.mistyPeaks, shows: "Cloud over the mountains above Salisbury Plain, South Georgia", changes: CROPPED },
  ...Object.values(shipPhotos).map((p) => ({ file: p.src, shows: p.alt, changes: RESIZED })),
];

/** Photos used by page components rather than by the data files. Keep in step with those pages. */
const pageUses: { label: string; href?: string; files: string[] }[] = [
  {
    label: "Home",
    href: "/",
    files: [
      "/media/hero-background.webp",
      "/media/bottom-of-the-world.mp4",
      "/media/expedition-loop.mp4",
      img.gentooRock,
      img.icebergsReflect,
      img.shipDark,
      img.nightPeaks,
      // Drake ribbon (components/home/DrakeRibbon.tsx)
      img.oceanDusk,
      img.wave,
      img.penguinsSnow,
      img.snowRidge,
      img.humpback,
      img.tent,
      img.kingPenguinLight,
      // "Sailing with" (first five ships)
      ...ships.slice(0, 5).map((s) => s.image.src),
    ],
  },
  { label: "About", href: "/about", files: [img.redParka, img.icebergsReflect, img.shipDark, img.nightPeaks] },
  { label: "Protect", href: "/protect", files: [img.penguinsSnow, img.gentooRock, img.snowflake, img.glacier, img.kingPenguins] },
  { label: "Penguin mode", href: "/penguin-mode", files: [img.penguinWalk] },
  { label: "Page not found", files: [img.gentooRock] },
  { label: "Menu", files: mainNav.map((n) => n.image) },
  { label: "Footer", files: [img.gentooRock] },
];

function collectUses(): Map<string, PhotoUse[]> {
  const map = new Map<string, PhotoUse[]>();
  const add = (file: string, use: PhotoUse) => {
    const list = map.get(file) ?? [];
    if (!list.some((u) => u.label === use.label)) list.push(use);
    map.set(file, list);
  };
  const addAll = (images: Img[], use: PhotoUse) => images.forEach((i) => add(i.src, use));

  for (const p of pageUses) p.files.forEach((f) => add(f, { label: p.label, href: p.href }));
  for (const e of expeditions) {
    addAll([e.image, ...e.gallery], { label: e.name, href: `/expeditions/${e.slug}` });
    if (e.video) add(e.video, { label: e.name, href: `/expeditions/${e.slug}` });
  }
  for (const r of routes) addAll([r.image], { label: r.name, href: `/routes/${r.slug}` });
  for (const s of ships) addAll([s.image, ...s.gallery], { label: s.name, href: `/ships/${s.slug}` });
  for (const x of experiences) addAll([x.image], { label: x.name, href: `/experiences/${x.slug}` });
  for (const p of posts) addAll([p.cover], { label: p.title, href: `/journal/${p.slug}` });
  addAll(timeline.map((t) => t.image), { label: "Timeline", href: "/timeline" });
  addAll(months.map((m) => m.image), { label: "When to go", href: "/when-to-go" });
  return map;
}

const bySource = new Map((sources as PhotoSource[]).map((s) => [s.file, s]));

/** Every photo and video the site shows, with its credit and where it appears. */
export function getPhotoCredits(): PhotoCredit[] {
  const uses = collectUses();
  return files.map((f) => {
    const src = bySource.get(f.file);
    if (!src) throw new Error(`No credit for ${f.file} in data/photo-credits.json`);
    return { ...src, ...f, uses: uses.get(f.file) ?? [] };
  });
}
