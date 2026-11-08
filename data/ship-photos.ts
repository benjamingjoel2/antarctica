import type { Img } from "./types";

/**
 * Real photographs of expedition ships in Antarctica, from Wikimedia Commons.
 * Credits are listed on the /photo-credits page (data/photo-credits.json) and in
 * public/media/ships/CREDITS.md, never on or under the photos.
 */
export const shipPhotos = {
  anchoredPeninsula: {
    src: "/media/ships/ship-lemaire-channel.jpg",
    alt: "An expedition ship at anchor among floating ice in the Lemaire Channel, Antarctica",
  },
  zodiacsAndShip: {
    src: "/media/ships/ship-zodiacs-king-george-island.jpg",
    alt: "Zodiacs alongside an expedition ship for a landing at King George Island, Antarctica",
  },
  shipInIce: {
    src: "/media/ships/ship-fast-ice.jpg",
    alt: "An ice-strengthened expedition ship moored in fast ice off the Antarctic coast",
  },
  longVoyage: {
    src: "/media/ships/ship-deception-island.jpg",
    alt: "An expedition ship in the flooded caldera of Deception Island, Antarctica",
  },
  luxuryShip: {
    src: "/media/ships/ship-paradise-bay-zodiac.jpg",
    alt: "A zodiac heading out from an expedition ship in Paradise Bay, Antarctica",
  },
  helicopterShip: {
    src: "/media/ships/ship-pleneau-bay-bow.jpg",
    alt: "Guests on the bow of an expedition ship in Pléneau Bay, Antarctica",
  },
} satisfies Record<string, Img>;
