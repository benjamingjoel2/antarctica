import type { Experience } from "./types";
import { img } from "./images";

const VERIFY = "Placeholder — verify availability, prices and requirements with partner operators before launch.";

export const experiences: Experience[] = [
  {
    slug: "zodiac-landings",
    name: "Zodiac Landings",
    titleLines: ["zodiac", "landings"],
    summary: "The heartbeat of every expedition: small inflatable boats that carry you from ship to shore and in among the ice.",
    body:
      "Zodiacs are how Antarctica is actually experienced. Twice a day, conditions permitting, the expedition team lowers the boats and ferries guests ashore to penguin colonies, historic huts and viewpoints — or simply cruises among icebergs where landing isn't possible.\n\nDrivers are experienced guides who read the ice, the swell and the wildlife constantly. Getting in and out uses a firm sailor's grip and takes a little practice; every operator runs a thorough briefing before the first landing.",
    image: { src: img.icebergsReflect, alt: "Icebergs viewed at water level from a zodiac" },
    routes: [
      "classic-antarctic-peninsula",
      "fly-the-drake",
      "falklands-south-georgia-antarctica",
      "antarctic-circle",
      "emperor-penguins",
      "ross-sea-east-antarctica",
      "luxury-expeditions",
    ],
    months: ["Nov", "Dec", "Jan", "Feb", "Mar"],
    goodToKnow: [
      "Landings depend on weather, swell and ice and can't be guaranteed.",
      "Waterproof outer layers are essential — spray is part of the ride.",
      "Visitor numbers ashore are limited at each site (verify).",
    ],
    verifyNote: VERIFY,
  },
  {
    slug: "sea-kayaking",
    name: "Sea Kayaking",
    titleLines: ["sea", "kayaking"],
    summary: "Paddle in near-silence among brash ice, with only the crackle of melting bergs and the breath of passing whales.",
    body:
      "From a kayak, Antarctica's scale becomes personal. Small groups paddle with dedicated guides, usually close to the ship, threading between floating ice and along glacier fronts while penguins porpoise past.\n\nMost operators run kayaking as a pre-booked programme with limited places, and require some prior paddling experience. Drysuits and specialist gear are typically provided.",
    image: { src: img.fjordReflect, alt: "A still bay among mountains, ideal for kayaking" },
    routes: ["classic-antarctic-peninsula", "antarctic-circle", "falklands-south-georgia-antarctica", "luxury-expeditions"],
    months: ["Nov", "Dec", "Jan", "Feb", "Mar"],
    addOnFromUSD: 1000,
    goodToKnow: [
      "Prior kayaking experience is usually required (verify).",
      "Places are limited — book at the same time as your voyage.",
      "Sessions are weather-dependent; refunds for missed outings vary (verify).",
    ],
    verifyNote: VERIFY,
  },
  {
    slug: "camping-on-the-ice",
    name: "Camping on the Ice",
    titleLines: ["camping", "on the ice"],
    summary: "Spend a night ashore in a bivvy bag, listening to glaciers groan under a sky that never quite darkens.",
    body:
      "Camping in Antarctica is beautifully simple: a sleeping bag, a bivvy sack, a shallow trench in the snow and the company of a few fellow travellers. No tents on most programmes — just the open sky, the distant calving of ice and perhaps a penguin's call.\n\nNothing is left behind, including human waste, and the night can be cancelled at short notice if the weather turns. Few who do it ever forget it.",
    image: { src: img.tent, alt: "A small camp set up in a snowy landscape" },
    routes: ["classic-antarctic-peninsula", "antarctic-circle", "luxury-expeditions"],
    months: ["Nov", "Dec", "Jan", "Feb"],
    addOnFromUSD: 500,
    goodToKnow: [
      "Usually a single night, weather permitting.",
      "No food or drink ashore, and no toilets beyond a portable system (verify).",
      "Minimum ages and fitness criteria apply (verify).",
    ],
    verifyNote: VERIFY,
  },
  {
    slug: "polar-plunge",
    name: "Polar Plunge",
    titleLines: ["polar", "plunge"],
    summary: "A few breathless seconds in water just above freezing — the Antarctic rite of passage nobody forgets.",
    body:
      "On many voyages, the expedition team sets aside time for brave guests to leap into the Southern Ocean, from the shore or from the ship's gangway or marina. It is over in moments, followed by towels, cheers and usually a warming drink.\n\nIt's entirely optional, carefully supervised and always subject to conditions. Anyone with heart conditions should seek medical advice first.",
    image: { src: img.wave, alt: "Cold, clear Southern Ocean water" },
    routes: ["classic-antarctic-peninsula", "antarctic-circle", "falklands-south-georgia-antarctica", "luxury-expeditions"],
    months: ["Dec", "Jan", "Feb", "Mar"],
    goodToKnow: [
      "Water temperatures are typically around 0 °C or just below (verify).",
      "A waiver and safety line are standard (verify).",
      "Seek medical advice if you have any cardiovascular condition.",
    ],
    verifyNote: VERIFY,
  },
  {
    slug: "photography-voyages",
    name: "Photography Voyages",
    titleLines: ["photography", "voyages"],
    summary: "Departures with professional photographers on board, offering workshops, field coaching and image reviews.",
    body:
      "Antarctica is extraordinarily photogenic and surprisingly difficult: bright snow fools meters, cold drains batteries and wildlife moves fast. Photography-focused departures carry professional guides who teach on deck, in zodiacs and in the lecture room.\n\nWorkshops typically run at no extra charge on these voyages, and suit everyone from phone photographers to those carrying long lenses.",
    image: { src: img.redParka, alt: "A photographer in a red parka overlooking the ice" },
    routes: ["classic-antarctic-peninsula", "falklands-south-georgia-antarctica", "antarctic-circle", "emperor-penguins"],
    months: ["Nov", "Dec", "Jan", "Feb", "Mar"],
    goodToKnow: [
      "Bring spare batteries and keep them warm in an inside pocket.",
      "Drones are generally not permitted (verify).",
      "A dry bag for zodiac rides is strongly recommended.",
    ],
    verifyNote: VERIFY,
  },
  {
    slug: "whale-watching",
    name: "Whale Watching",
    titleLines: ["whale", "watching"],
    summary: "Humpbacks, minkes and orcas gather to feed in the krill-rich summer waters.",
    body:
      "As the season advances, the Peninsula's bays fill with whales. Humpbacks bubble-net feed alongside zodiacs, minke whales surface among the brash ice and orca pods patrol the channels.\n\nLate season — February and March — is generally the best time, when whales have fattened on krill and linger close to shore. Expedition teams keep a respectful distance and let curious animals approach on their own terms.",
    image: { src: img.humpback, alt: "A humpback whale surfacing near the Antarctic coast" },
    routes: ["classic-antarctic-peninsula", "antarctic-circle", "falklands-south-georgia-antarctica", "luxury-expeditions", "ross-sea-east-antarctica"],
    months: ["Jan", "Feb", "Mar"],
    goodToKnow: [
      "February and March usually offer the most whale activity.",
      "Approach distances for whales are set by guidelines (verify).",
      "Binoculars make a real difference — bring your own.",
    ],
    verifyNote: VERIFY,
  },
  {
    slug: "penguin-colonies",
    name: "Penguin Colonies",
    titleLines: ["penguin", "colonies"],
    summary: "Gentoos, chinstraps, Adélies, kings and, for a lucky few, emperors — in noisy, busy, unforgettable colonies.",
    body:
      "Standing at the edge of a penguin colony is a full-sensory experience: the clamour of thousands of birds, the comic purpose of their 'penguin highways', and yes, the smell. Each species and season tells a different story, from courtship and nest-building to downy chicks and fledging.\n\nWildlife-watching guidelines ask visitors to keep their distance and give right of way. Penguins often approach on their own — the trick is to stay still and let them.",
    image: { src: img.penguinWalk, alt: "Penguins walking in single file across the snow" },
    routes: [
      "classic-antarctic-peninsula",
      "fly-the-drake",
      "falklands-south-georgia-antarctica",
      "antarctic-circle",
      "emperor-penguins",
      "ross-sea-east-antarctica",
      "luxury-expeditions",
    ],
    months: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
    goodToKnow: [
      "Keep at least 5 m (15 ft) from wildlife (verify).",
      "Never block a penguin highway — they have right of way.",
      "King penguins are seen in South Georgia, not on the Peninsula.",
    ],
    verifyNote: VERIFY,
  },
  {
    slug: "citizen-science",
    name: "Citizen Science",
    titleLines: ["citizen", "science"],
    summary: "Contribute real data to research on clouds, seabirds, whales and plankton while you travel.",
    body:
      "Many expedition ships now run citizen-science programmes that feed into international research projects: photographing whale flukes for identification, logging cloud observations for satellite calibration, sampling phytoplankton or counting seabirds.\n\nIt's a meaningful way to give something back to a place that gives so much, and the expedition team will explain how your observations are used.",
    image: { src: img.underwater, alt: "Clear water beneath the surface of the Southern Ocean" },
    routes: ["classic-antarctic-peninsula", "antarctic-circle", "falklands-south-georgia-antarctica", "ross-sea-east-antarctica"],
    months: ["Nov", "Dec", "Jan", "Feb", "Mar"],
    goodToKnow: [
      "Usually free and open to all guests.",
      "Programmes vary by ship and departure (verify).",
      "No scientific background needed.",
    ],
    verifyNote: VERIFY,
  },
  {
    slug: "mountaineering-snowshoeing",
    name: "Mountaineering & Snowshoeing",
    titleLines: ["mountaineering", "& snowshoeing"],
    summary: "Rope up with mountain guides for glacier walks and modest ascents with views across the ice.",
    body:
      "On selected voyages, qualified mountain guides lead small, roped groups onto glaciers and up modest peaks above the landing sites. Early in the season, deep snow makes snowshoeing the best way to travel inland.\n\nRoutes are chosen on the day for safety and conditions. You don't need to be an alpinist, but you do need good fitness and a head for open, exposed terrain.",
    image: { src: img.snowRidge, alt: "A wind-sculpted snow ridge under a blue sky" },
    routes: ["classic-antarctic-peninsula", "antarctic-circle", "falklands-south-georgia-antarctica"],
    months: ["Nov", "Dec", "Jan", "Feb"],
    addOnFromUSD: 800,
    goodToKnow: [
      "Good fitness is required; experience requirements vary (verify).",
      "Harnesses, crampons and ropes are usually provided (verify).",
      "Snowshoeing is often included at no extra cost (verify).",
    ],
    verifyNote: VERIFY,
  },
  {
    slug: "shackleton-history",
    name: "Shackleton & Polar History",
    titleLines: ["shackleton", "history"],
    summary: "Walk in the footsteps of the heroic age in South Georgia: Grytviken, Shackleton's grave and the trail to Stromness.",
    body:
      "South Georgia is where Shackleton's story both ends and turns. In 1916, after the loss of Endurance, he crossed the island's unmapped mountains on foot to reach the whaling station at Stromness and raise a rescue. He returned in 1922 and died aboard his ship at Grytviken, where he is buried.\n\nVoyages typically visit Grytviken's whaling station, museum and cemetery, where guests traditionally raise a toast to 'the Boss'. Conditions permitting, some walk the final stretch of his route towards Stromness.",
    image: { src: img.mistyPeaks, alt: "Misty mountains rising above a South Georgia bay" },
    routes: ["falklands-south-georgia-antarctica", "ross-sea-east-antarctica"],
    months: ["Nov", "Dec", "Jan", "Feb"],
    goodToKnow: [
      "The Stromness walk is weather-dependent and seasonally restricted (verify).",
      "South Georgia charges a visitor fee, usually included in fares (verify).",
      "Ross Sea voyages may visit the heroic-age huts of Scott and Shackleton (verify).",
    ],
    verifyNote: VERIFY,
  },
];
