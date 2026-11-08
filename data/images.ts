/**
 * Photo registry. Every photo is a real photograph from Antarctica, South Georgia
 * or the Drake Passage, taken from Wikimedia Commons under a free licence and
 * stored in `public/media/photos/` (about 1600px, plus an 800px copy for small
 * screens). Photographer, licence and source for each file are in
 * `data/photo-credits.json`, listed on the /photo-credits page and in
 * `public/media/photos/CREDITS.md`. Credits never sit on or under a photo.
 *
 * To swap a photo: replace both JPEGs, update the credits JSON and CREDITS.md,
 * and check every alt text that uses the key (search for `img.<key>`).
 */
const p = (name: string) => `/media/photos/${name}.jpg`;

export const img = {
  /** Snow-capped ice cliffs and icebergs, Lemaire Channel. */
  snowRidge: p("lemaire-ice-cliffs"),
  /** Sunset over the Southern Ocean off the Antarctic Peninsula. */
  oceanDusk: p("southern-ocean-sunset"),
  /** Snow-covered mountains on the north-west coast of the Antarctic Peninsula. */
  snowPeaks: p("peninsula-mountains"),
  /** Close-up of glacial ice on an iceberg, Lemaire Channel. */
  snowflake: p("iceberg-ice-closeup"),
  /** Low cloud over the glaciers at Neko Harbour. */
  peaksAboveCloud: p("neko-harbour-cloud"),
  /** Gentoo penguin at Brown Bluff, Antarctic Sound. */
  gentooRock: p("gentoo-brown-bluff"),
  /** Glacier front in Andvord Bay (Neko Harbour). */
  glacier: p("andvord-bay-glacier"),
  /** Kayaker in a red jacket near Neko Harbour. */
  redParka: p("kayaker-neko-harbour"),
  /** Icebergs mirrored in still water, Lemaire Channel. */
  icebergsReflect: p("lemaire-icebergs"),
  /** Cloud over Beaufort Island, Ross Sea. */
  cloudSea: p("beaufort-island"),
  /** The historic hut at Port Lockroy. */
  snowHut: p("port-lockroy"),
  /** King penguin among chicks, South Georgia. */
  kingPenguinLight: p("king-penguin-south-georgia"),
  /** Nacreous clouds over McMurdo Station. */
  nightPeaks: p("nacreous-clouds-mcmurdo"),
  /** Under the sea ice at New Harbor, McMurdo Sound. */
  underwater: p("underwater-mcmurdo-sound"),
  /** View over Paradise Bay from Almirante Brown Station (portrait). */
  sky: p("paradise-bay"),
  /** Adélie penguins on snow, South Shetland Islands (16:9). */
  penguinsSnow: p("adelie-penguins-south-shetlands"),
  /** King penguin colony, Salisbury Plain, South Georgia (portrait). */
  kingPenguins: p("king-penguins-salisbury-plain"),
  /** Spray over the bow in the Drake Passage. */
  wave: p("drake-passage-bow"),
  /** Humpback whale fluke off the Antarctic Peninsula. */
  humpback: p("humpback-fluke"),
  /** Mount Herschel from Cape Hallett, Ross Sea. */
  fjordReflect: p("mount-herschel-cape-hallett"),
  /** Adélie penguin on snow at Hope Bay. */
  penguinWalk: p("adelie-hope-bay"),
  /** Snowy mountain above Salisbury Plain, South Georgia. */
  mistyPeaks: p("salisbury-plain-mountain"),
  /** Tabular icebergs at sunset, seen from the ship. */
  boatNight: p("tabular-icebergs-sunset"),
  /** Real expedition ship in Antarctica (credited in public/media/ships/CREDITS.md). */
  shipDark: "/media/ships/ship-lemaire-channel.jpg",
  /** Tents at Union Glacier camp. */
  tent: p("union-glacier-camp"),
  /** Scott's Discovery Hut, Hut Point, Ross Island. */
  discoveryHut: p("discovery-hut"),
  /** Emperor penguin leaping from the water, Gould Bay, Weddell Sea. */
  emperor: p("emperor-penguin-gould-bay"),
  /** Leopard seal on ice, Antarctic Sound. */
  leopardSeal: p("leopard-seal-antarctic-sound"),
} as const;

export type ImageKey = keyof typeof img;
