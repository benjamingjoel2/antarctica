import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { expeditions } from "@/data/expeditions";
import { experiences } from "@/data/experiences";
import { posts } from "@/data/posts";
import { routes } from "@/data/routes";
import { ships } from "@/data/ships";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/expeditions", "/routes", "/ships", "/experiences", "/timeline", "/protect", "/when-to-go", "/about", "/faq", "/contact", "/journal", "/plan-my-expedition", "/privacy", "/terms", "/cookies"];
  const dynamicPaths = [
    ...expeditions.map((e) => `/expeditions/${e.slug}`),
    ...routes.map((r) => `/routes/${r.slug}`),
    ...ships.map((s) => `/ships/${s.slug}`),
    ...experiences.map((x) => `/experiences/${x.slug}`),
    ...posts.map((p) => `/journal/${p.slug}`),
  ];
  return [...staticPaths, ...dynamicPaths].map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly", priority: p === "" ? 1 : 0.7 }));
}
