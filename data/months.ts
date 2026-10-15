import type { MonthGuide } from "./types";
import { img } from "./images";

export const months: MonthGuide[] = [
  {
    month: "November",
    short: "Nov",
    headline: "Pristine snow and the season's first footprints",
    daylight: "Around 18–20 hours (verify)",
    temp: "−5 °C to 2 °C on the Peninsula (verify)",
    wildlife: ["Penguin courtship and nest-building", "Elephant seals hauled out in South Georgia", "Seabirds returning to breed"],
    body:
      "Early season is Antarctica at its most untouched. Deep, clean snow blankets the landscape, sea ice still lingers in the bays and penguins are busy courting and building nests from stones. Fewer ships are about, and prices can be a little lower.\n\nExpect colder temperatures and the occasional landing blocked by ice — part of the drama.",
    image: { src: img.snowRidge, alt: "Fresh, untouched snow on an Antarctic ridge" },
    verify: true,
  },
  {
    month: "December",
    short: "Dec",
    headline: "The longest days and the first chicks",
    daylight: "Up to 20+ hours (verify)",
    temp: "−2 °C to 4 °C on the Peninsula (verify)",
    wildlife: ["Penguin chicks begin to hatch", "Fur seals breeding in South Georgia", "Whales arriving to feed"],
    body:
      "Around the solstice, the sun barely sets and the light seems to last forever. Penguin eggs begin to hatch and colonies grow noisier by the day. It's peak season, especially over the holidays, so book well ahead.\n\nTemperatures are among the warmest of the year and landing conditions are often at their most reliable.",
    image: { src: img.gentooRock, alt: "A gentoo penguin on a rocky nesting site" },
    verify: true,
  },
  {
    month: "January",
    short: "Jan",
    headline: "High summer: warmth, chicks and activity everywhere",
    daylight: "Around 18–20 hours (verify)",
    temp: "−1 °C to 5 °C on the Peninsula (verify)",
    wildlife: ["Downy penguin chicks", "Humpback and minke whales", "Leopard seals patrolling colonies"],
    body:
      "January is the heart of summer. Chicks are growing fast, adults shuttle food from the sea, and whale numbers rise steadily. Sea ice is at its least, opening routes further south and into the Ross Sea.\n\nIt's the most popular month, so the best cabins go early.",
    image: { src: img.penguinWalk, alt: "Penguins walking across snow in summer light" },
    verify: true,
  },
  {
    month: "February",
    short: "Feb",
    headline: "Whale season builds as chicks prepare to fledge",
    daylight: "Around 15–18 hours (verify)",
    temp: "−2 °C to 4 °C on the Peninsula (verify)",
    wildlife: ["Whale activity near its peak", "Penguin chicks fledging", "Fur seals across the Peninsula"],
    body:
      "By February the Peninsula's bays are alive with feeding humpbacks, and penguin chicks are moulting into their waterproof feathers. Retreating ice gives the best odds of crossing the Antarctic Circle.\n\nSunsets return, bringing long golden evenings that photographers love.",
    image: { src: img.humpback, alt: "A humpback whale surfacing in a calm bay" },
    verify: true,
  },
  {
    month: "March",
    short: "Mar",
    headline: "Peak whales, dramatic light and the season's close",
    daylight: "Around 12–15 hours (verify)",
    temp: "−4 °C to 2 °C on the Peninsula (verify)",
    wildlife: ["Peak whale watching", "Fledged penguins heading to sea", "Fur seals and leopard seals"],
    body:
      "The last voyages of the season see whales at their most abundant and the light at its most theatrical, with real sunsets and sunrises once more. Colonies thin out as young penguins take to the sea.\n\nWeather becomes more changeable, and late-season deals sometimes appear.",
    image: { src: img.nightPeaks, alt: "Peaks under a deepening late-season sky" },
    verify: true,
  },
];
