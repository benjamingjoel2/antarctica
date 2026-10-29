export const site = {
  name: "Seventh Continent",
  shortName: "7th Continent",
  tagline: "The edge of the world is closer than you think.",
  promise: "The right Antarctic expedition for you, planned by one dedicated polar specialist.",
  description:
    "Independent Antarctica expedition specialists. We match you with the right IAATO-member ship, route and season, and one polar specialist plans every detail.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://seventhcontinent.tourground.com",
  locale: "en",
  contact: {
    email: "seventhcontinent@tourground.com",
    phone: "+00 000 000 000", // TODO: replace with real number
    address: "Registered office address — TODO",
    hours: "Mon–Fri, 9:00–18:00 (UTC) — TODO",
  },
  /** Add social profiles here when they exist; the footer lists them automatically. */
  socials: [] as { label: string; href: string }[],
} as const;

