export type Slug = string;
export type Month = "Oct" | "Nov" | "Dec" | "Jan" | "Feb" | "Mar";
export type CabinType = "shared" | "standard" | "balcony" | "suite";
export type ShipSize = "small" | "mid" | "luxury";

export interface Img {
  src: string;
  alt: string;
}

export interface Route {
  slug: Slug;
  name: string;
  /** Short split-word friendly title, e.g. ["classic", "peninsula"] */
  titleLines: string[];
  tagline: string;
  embarkation: string;
  disembarkation: string;
  durationDays: [number, number];
  crossesDrake: boolean;
  fliesDrake: boolean;
  wildlife: string[];
  bestMonths: Month[];
  summary: string;
  body: string;
  image: Img;
  fromPriceUSD: number;
  verifyNote: string;
}

export interface ItineraryDay {
  day: string; // "Day 1" or "Days 3–7"
  title: string;
  body: string;
}

export interface Expedition {
  slug: Slug;
  name: string;
  titleLines: string[];
  routeSlug: Slug;
  shipSlug: Slug;
  durationDays: number;
  shipType: ShipSize;
  seasonWindow: string;
  months: Month[];
  highlights: string[];
  fromPriceUSD: number;
  summary: string;
  overview: string;
  image: Img;
  video?: string;
  gallery: Img[];
  itinerary: ItineraryDay[];
  cabins: { type: CabinType; label: string; priceUSD: number }[];
  included: string[];
  excluded: string[];
  goodToKnow: string[];
  departures: { start: string; end: string }[];
  verifyNote: string;
}

export interface Ship {
  slug: Slug;
  name: string;
  /** Placeholder operator name — no real operators until agreements exist. */
  operator: string;
  size: ShipSize;
  lengthM: number;
  passengers: number;
  iceClass: string;
  zodiacs: number;
  cabins: CabinType[];
  activities: string[];
  blurb: string;
  body: string;
  image: Img;
  gallery: Img[];
  placeholder: true;
}

export interface Experience {
  slug: Slug;
  name: string;
  titleLines: string[];
  summary: string;
  body: string;
  image: Img;
  routes: Slug[];
  months: Month[];
  addOnFromUSD?: number;
  goodToKnow: string[];
  verifyNote?: string;
}

export type TimelineCategory = "exploration" | "science" | "treaty" | "us";

export interface TimelineEntry {
  year: number;
  date?: string;
  title: string;
  body: string;
  category: TimelineCategory;
  image: Img;
  placeholder?: boolean;
}

export interface Fact {
  text: string;
  detail?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  trip: string;
  year: string;
  placeholder: true;
}

export interface Faq {
  q: string;
  a: string;
  category: "getting-there" | "on-board" | "health" | "planning" | "environment";
  verify: boolean;
}

export interface MonthGuide {
  month: string;
  short: Month;
  headline: string;
  daylight: string;
  temp: string;
  wildlife: string[];
  body: string;
  image: Img;
  verify: true;
}

export interface Post {
  slug: Slug;
  title: string;
  titleLines: string[];
  excerpt: string;
  date: string;
  readMinutes: number;
  cover: Img;
}
