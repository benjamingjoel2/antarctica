import type { Post } from "./types";
import { img } from "./images";

export const posts: Post[] = [
  {
    slug: "how-to-choose-an-antarctica-expedition",
    title: "How to Choose an Antarctica Expedition",
    titleLines: ["how to choose", "an expedition"],
    excerpt: "Route, ship size, season and budget — the four decisions that shape your voyage, and how to weigh them honestly.",
    date: "2026-03-12",
    readMinutes: 6,
    cover: { src: img.icebergsReflect, alt: "Icebergs mirrored in a calm Antarctic bay" },
  },
  {
    slug: "crossing-the-drake-vs-flying",
    title: "Crossing the Drake vs Flying",
    titleLines: ["crossing", "or flying", "the drake"],
    excerpt: "Two days of open ocean or two hours in the air? An honest look at what you gain and give up either way.",
    date: "2026-05-04",
    readMinutes: 5,
    cover: { src: img.wave, alt: "A rolling wave on the Drake Passage" },
  },
  {
    slug: "what-to-pack-for-antarctica",
    title: "What to Pack for Antarctica",
    titleLines: ["what to pack", "for antarctica"],
    excerpt: "Layers, not bulk. A practical packing list built around what operators provide and what you really need.",
    date: "2026-07-21",
    readMinutes: 6,
    cover: { src: img.redParka, alt: "A traveller in a red parka on the ice" },
  },
  {
    slug: "when-to-go-for-penguins-and-whales",
    title: "When to Go for Penguins and Whales",
    titleLines: ["when to go", "for penguins", "& whales"],
    excerpt: "Courtship, chicks or whale season? How the short Antarctic summer unfolds, month by month.",
    date: "2026-09-08",
    readMinutes: 5,
    cover: { src: img.humpback, alt: "A humpback whale surfacing near the ice" },
  },
];
