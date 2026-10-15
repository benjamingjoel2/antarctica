export const site = {
  name: "Seventh Continent",
  shortName: "7th Continent",
  tagline: "The edge of the world is closer than you think.",
  promise: "The right Antarctic expedition for you, planned by one dedicated polar specialist.",
  description:
    "Independent Antarctica expedition specialists. We match you with the right IAATO-member ship, route and season, and one polar specialist plans every detail.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://seventh-continent.vercel.app",
  locale: "en",
  contact: {
    email: "hello@seventhcontinent.travel", // TODO: replace with real inbox
    phone: "+00 000 000 000", // TODO: replace with real number
    whatsapp: "[NUMBER]", // TODO: international format, digits only, e.g. 447700900000
    address: "Registered office address — TODO",
    hours: "Mon–Fri, 9:00–18:00 (UTC) — TODO",
  },
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
} as const;

export const whatsappHref = (text = "Hello Seventh Continent, I'd like to talk about Antarctica.") =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
