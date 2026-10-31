import { img } from "@/data/images";

export type NavItem = { label: string; href: string; image: string; alt: string };

/** Image-led menu: one tile per item. */
export const mainNav: NavItem[] = [
  { label: "Expeditions", href: "/expeditions", image: img.icebergsReflect, alt: "Icebergs reflected in still polar water" },
  { label: "Routes", href: "/routes", image: img.oceanDusk, alt: "Open ocean at dusk" },
  { label: "Ships", href: "/ships", image: img.shipDark, alt: "Expedition-style ship at sea" },
  { label: "Experiences", href: "/experiences", image: img.redParka, alt: "Traveller in a red parka on snow" },
  { label: "Timeline", href: "/timeline", image: img.nightPeaks, alt: "Snow peaks under a starry sky" },
  { label: "Protect", href: "/protect", image: img.gentooRock, alt: "Gentoo penguin standing on rock" },
  { label: "Journal", href: "/journal", image: img.mistyPeaks, alt: "Mountains rising through mist" },
  { label: "Contact", href: "/contact", image: img.kingPenguins, alt: "Two king penguins" },
];

export const footerNav: { label: string; href: string }[][] = [
  [
    { label: "Home", href: "/" },
    { label: "Expeditions", href: "/expeditions" },
    { label: "Routes", href: "/routes" },
    { label: "Ships", href: "/ships" },
    { label: "Experiences", href: "/experiences" },
  ],
  [
    { label: "Timeline", href: "/timeline" },
    { label: "Protect", href: "/protect" },
    { label: "When to go", href: "/when-to-go" },
    { label: "Journal", href: "/journal" },
    { label: "FAQ", href: "/faq" },
  ],
  [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy policy", href: "/privacy" },
    { label: "Booking terms", href: "/terms" },
    { label: "Cookie policy", href: "/cookies" },
  ],
];
