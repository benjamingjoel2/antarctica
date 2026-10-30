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
    /** Business address: La Maquinita Palermo Soho coworking, Buenos Aires (lamaquinita.co/sedes). No phone by owner's decision. */
    address: "Avenida Coronel Niceto Vega 4736, Palermo, Buenos Aires, Argentina",
  },
} as const;

