import type { Img } from "./types";

/**
 * Real photographs of expedition ships in Antarctica, from Wikimedia Commons.
 * CC BY / CC BY-SA: the credit must stay with the photo. Sources and licences
 * are listed in public/media/ships/CREDITS.md.
 */
export const shipPhotos = {
  anchoredPeninsula: {
    src: "/media/ships/ship-lemaire-channel.jpg",
    alt: "An expedition ship at anchor among floating ice in the Lemaire Channel, Antarctica",
    credit: "Gary Bembridge, CC BY 2.0, Wikimedia Commons",
  },
  zodiacsAndShip: {
    src: "/media/ships/ship-zodiacs-king-george-island.jpg",
    alt: "Zodiacs alongside an expedition ship for a landing at King George Island, Antarctica",
    credit: "W. Bulach, CC BY-SA 4.0, Wikimedia Commons",
  },
  shipInIce: {
    src: "/media/ships/ship-fast-ice.jpg",
    alt: "An ice-strengthened expedition ship moored in fast ice off the Antarctic coast",
    credit: "Jason Auch, CC BY 2.0, Wikimedia Commons",
  },
  longVoyage: {
    src: "/media/ships/ship-deception-island.jpg",
    alt: "An expedition ship in the flooded caldera of Deception Island, Antarctica",
    credit: "W. Bulach, CC BY-SA 4.0, Wikimedia Commons",
  },
  luxuryShip: {
    src: "/media/ships/ship-paradise-bay-zodiac.jpg",
    alt: "A zodiac heading out from an expedition ship in Paradise Bay, Antarctica",
    credit: "PhilWolpe, CC BY 2.0, Wikimedia Commons",
  },
  helicopterShip: {
    src: "/media/ships/ship-pleneau-bay-bow.jpg",
    alt: "Guests on the bow of an expedition ship in Pléneau Bay, Antarctica",
    credit: "Liam Quinn, CC BY-SA 2.0, Wikimedia Commons",
  },
} satisfies Record<string, Img>;
