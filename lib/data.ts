import { expeditions } from "@/data/expeditions";
import { experiences } from "@/data/experiences";
import { posts } from "@/data/posts";
import { routes } from "@/data/routes";
import { ships } from "@/data/ships";
import type { CabinType, ShipSize } from "@/data/types";

export const getRoute = (slug: string) => routes.find((r) => r.slug === slug);
export const getShip = (slug: string) => ships.find((s) => s.slug === slug);
export const getExpedition = (slug: string) => expeditions.find((e) => e.slug === slug);
export const getExperience = (slug: string) => experiences.find((e) => e.slug === slug);
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const expeditionsForRoute = (slug: string) => expeditions.filter((e) => e.routeSlug === slug);
export const expeditionsForShip = (slug: string) => expeditions.filter((e) => e.shipSlug === slug);

export const shipSizeLabel: Record<ShipSize, string> = {
  small: "Small & intimate",
  mid: "Mid-size",
  luxury: "Luxury",
};

export const cabinLabel: Record<CabinType, string> = {
  shared: "Shared",
  standard: "Standard",
  balcony: "Balcony",
  suite: "Suite",
};

export const durationLabel = ([a, b]: [number, number]) => (a === b ? `${a} days` : `${a}–${b} days`);

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
