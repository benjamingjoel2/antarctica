import type { Ship } from "./types";
import { img } from "./images";
import { shipPhotos } from "./ship-photos";

/**
 * Ship classes, not named vessels. We match each traveller with a specific ship
 * from an IAATO-member operator once their dates and priorities are clear, so the
 * site describes the types of ship we work with rather than inventing names or specs.
 * Slugs are kept from earlier versions so existing links still work.
 */
export const ships: Ship[] = [
  {
    slug: "meridian-south",
    name: "Small expedition ship",
    shortName: "Small ship",
    operator: "IAATO-member expedition operator",
    size: "small",
    guests: "Fewer than 200 guests",
    cabins: ["shared", "standard", "suite"],
    activities: ["Zodiac landings", "Zodiac cruising", "Sea kayaking (some departures)", "Camping (some departures)"],
    blurb: "A small, landing-focused ship: the classic way to see the Antarctic Peninsula.",
    body:
      "Small expedition ships are built around time ashore. IAATO allows no more than 100 visitors on shore at a site at one time, so the fewer guests on board, the fewer landing rotations and the longer each group can spend ashore.\n\nCabins on this kind of ship tend to be comfortable rather than lavish, and the lecture room is the heart of life on board. We'll help you choose a specific ship and departure once we know your dates.",
    image: shipPhotos.anchoredPeninsula,
    gallery: [
      { src: img.icebergsReflect, alt: "Icebergs reflected in calm water" },
      { src: img.gentooRock, alt: "A gentoo penguin standing on a rocky shore" },
    ],
  },
  {
    slug: "petrel-light",
    name: "Small fly-cruise ship",
    shortName: "Fly-cruise",
    operator: "IAATO-member expedition operator",
    size: "small",
    guests: "Fewer than 200 guests",
    cabins: ["standard", "balcony", "suite"],
    activities: ["Zodiac landings", "Zodiac cruising", "Sea kayaking (some departures)"],
    blurb: "A small ship that meets you in the South Shetland Islands after a flight over the Drake Passage.",
    body:
      "On a fly-cruise you fly from Punta Arenas to King George Island and board a small expedition ship there, skipping the two-day sea crossing each way. Flights depend on the weather at both ends, so plans need some flexibility.\n\nOnce on board, days follow the same rhythm as any small-ship voyage: landings and zodiac cruises, with lectures from the expedition team in between.",
    image: shipPhotos.zodiacsAndShip,
    gallery: [
      { src: img.humpback, alt: "A humpback whale surfacing" },
      { src: img.gentooRock, alt: "A gentoo penguin standing on a rocky shore" },
    ],
  },
  {
    slug: "tern-arc",
    name: "Ice-strengthened expedition ship",
    shortName: "Ice-strengthened",
    operator: "IAATO-member expedition operator",
    size: "mid",
    guests: "Usually 200–500 guests",
    cabins: ["shared", "standard", "balcony", "suite"],
    activities: ["Zodiac landings", "Zodiac cruising", "Sea kayaking (some departures)", "Polar plunge (some departures)", "Lectures"],
    blurb: "A larger ship with the range for longer Peninsula voyages and the Antarctic Circle.",
    body:
      "Mid-size expedition ships carry more guests, so landings run in rotations to stay within IAATO's limit of 100 people ashore at a time. In return they usually offer more public space and the range for longer itineraries, such as voyages towards the Antarctic Circle.\n\nHow far south any ship gets depends on the ice and weather on the day. We'll explain what a specific ship and departure can realistically aim for before you book.",
    image: shipPhotos.shipInIce,
    gallery: [
      { src: img.glacier, alt: "A glacier face rising above the water" },
      { src: img.penguinWalk, alt: "Penguins walking in a line across the snow" },
    ],
  },
  {
    slug: "halcyon-ice",
    name: "Long-voyage expedition ship",
    shortName: "Long-voyage",
    operator: "IAATO-member expedition operator",
    size: "mid",
    guests: "Usually 200–500 guests",
    cabins: ["standard", "balcony", "suite"],
    activities: ["Zodiac landings", "Zodiac cruising", "Sea kayaking (some departures)", "Lectures"],
    blurb: "A ship suited to long voyages with many sea days: South Georgia, the Falklands and the Ross Sea.",
    body:
      "Longer voyages to South Georgia, the Falklands or the Ross Sea include several days at sea. Ships used on these routes tend to have more public space for lectures and wildlife watching, and stabilisers to ease the crossings.\n\nWe'll match you with a specific ship and departure based on the route, the season and how you like to travel.",
    image: shipPhotos.longVoyage,
    gallery: [
      { src: img.kingPenguinLight, alt: "A king penguin lit by low golden light" },
      { src: img.kingPenguins, alt: "A large king penguin colony" },
    ],
  },
  {
    slug: "southern-lantern",
    name: "All-suite expedition ship",
    shortName: "All-suite",
    operator: "IAATO-member expedition operator",
    size: "luxury",
    guests: "Usually fewer than 300 guests",
    cabins: ["balcony", "suite"],
    activities: ["Zodiac landings", "Zodiac cruising", "Sea kayaking (some departures)", "Lectures"],
    blurb: "Suites, a high staff-to-guest ratio and the same landings as any expedition ship.",
    body:
      "On an all-suite expedition ship every cabin is a suite, usually with a balcony or large window, and dining and service are part of the experience. Landings follow exactly the same IAATO rules as on any other ship.\n\nComfort varies a great deal between ships in this class. We'll tell you honestly how they compare for your dates.",
    image: shipPhotos.luxuryShip,
    gallery: [
      { src: img.icebergsReflect, alt: "Sculpted icebergs drifting in still water" },
      { src: img.humpback, alt: "A humpback whale in calm water" },
    ],
  },
  {
    slug: "katabatic",
    name: "Helicopter-equipped expedition ship",
    shortName: "Helicopter ship",
    operator: "IAATO-member expedition operator",
    size: "luxury",
    guests: "Usually fewer than 300 guests",
    cabins: ["balcony", "suite"],
    activities: ["Zodiac landings", "Zodiac cruising", "Helicopter flights (selected voyages)", "Lectures"],
    blurb: "A high-end polar ship that carries helicopters for specialist voyages such as emperor penguin attempts.",
    body:
      "A small number of expedition ships carry helicopters, which makes specialist voyages possible, such as attempts to reach emperor penguin colonies across the sea ice. Flights always depend on ice, weather and the expedition leader's judgement.\n\nThese departures are few and book early. We'll share candid context on past conditions before you commit.",
    image: shipPhotos.helicopterShip,
    gallery: [
      { src: img.penguinsSnow, alt: "A group of penguins standing in the snow" },
      { src: img.snowRidge, alt: "Wind-carved snow on the sea ice" },
    ],
  },
];
