/**
 * Stylised route map placeholder (not to scale). Replace with a real
 * cartographic map (e.g. Mapbox static) before launch.
 */
const P = {
  ushuaia: [210, 120],
  puntaArenas: [150, 95],
  falklands: [400, 120],
  southGeorgia: [700, 210],
  kingGeorge: [300, 360],
  lemaire: [250, 450],
  circle: [215, 560],
  weddell: [440, 470],
} as const;

const paths: Record<string, { d: string; dashed?: boolean; stops: (keyof typeof P)[] }[]> = {
  "classic-antarctic-peninsula": [{ d: "M210 120 C 240 230, 300 300, 300 360 S 260 430, 250 450", stops: ["ushuaia", "kingGeorge", "lemaire"] }],
  "luxury-expeditions": [{ d: "M210 120 C 240 230, 300 300, 300 360 S 260 430, 250 450", stops: ["ushuaia", "kingGeorge", "lemaire"] }],
  "fly-the-drake": [
    { d: "M150 95 Q 300 200 300 360", dashed: true, stops: ["puntaArenas", "kingGeorge"] },
    { d: "M300 360 S 260 430, 250 450", stops: ["lemaire"] },
  ],
  "falklands-south-georgia-antarctica": [
    { d: "M210 120 C 290 110, 340 115, 400 120 C 520 130, 640 170, 700 210 C 620 300, 420 330, 300 360 S 260 430, 250 450", stops: ["ushuaia", "falklands", "southGeorgia", "kingGeorge", "lemaire"] },
  ],
  "antarctic-circle": [{ d: "M210 120 C 240 230, 300 300, 300 360 S 260 430, 250 450 S 220 530, 215 560", stops: ["ushuaia", "kingGeorge", "lemaire", "circle"] }],
  "emperor-penguins": [{ d: "M210 120 C 260 230, 330 300, 330 370 S 400 440, 440 470", stops: ["ushuaia", "kingGeorge", "weddell"] }],
};

const labels: Record<keyof typeof P, string> = {
  ushuaia: "Ushuaia",
  puntaArenas: "Punta Arenas",
  falklands: "Falklands",
  southGeorgia: "South Georgia",
  kingGeorge: "South Shetlands",
  lemaire: "Lemaire Channel",
  circle: "66°33′ S",
  weddell: "Weddell Sea",
};

export function RouteMap({ routeSlug, title }: { routeSlug: string; title: string }) {
  const segs = paths[routeSlug];
  return (
    <figure className="overflow-hidden rounded-[1.2rem] bg-navy text-glacier">
      <svg viewBox="0 0 800 620" className="h-auto w-full" role="img" aria-label={`Route map placeholder: ${title}`}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#9ccfe4" strokeOpacity=".08" />
          </pattern>
        </defs>
        <rect width="800" height="620" fill="url(#grid)" />
        {/* South America tip */}
        <path d="M60 0 L260 0 C 250 40, 240 80, 230 110 C 215 130, 175 130, 150 110 C 120 80, 90 40, 60 0 Z" fill="#13283f" stroke="#3e89ae" strokeOpacity=".6" />
        {/* Antarctic Peninsula + continent */}
        <path d="M330 330 C 300 360, 270 420, 240 470 C 210 520, 190 560, 170 620 L 800 620 L 800 560 C 700 540, 600 520, 520 500 C 460 480, 400 430, 370 380 C 360 360, 350 340, 330 330 Z" fill="#dcedf5" fillOpacity=".92" />
        <ellipse cx="400" cy="120" rx="22" ry="10" fill="#13283f" stroke="#3e89ae" strokeOpacity=".6" />
        <ellipse cx="700" cy="210" rx="30" ry="8" fill="#13283f" stroke="#3e89ae" strokeOpacity=".6" />
        {/* Antarctic Circle */}
        <path d="M0 560 Q 400 590 800 560" fill="none" stroke="#ff5b1f" strokeOpacity=".5" strokeDasharray="4 6" />
        <text x="16" y="550" fill="#ff5b1f" fontSize="13" fontFamily="monospace">ANTARCTIC CIRCLE 66°33′ S</text>
        <text x="230" y="250" fill="#9ccfe4" fontSize="14" fontFamily="monospace" opacity=".7">DRAKE PASSAGE</text>
        {segs ? (
          segs.map((s, i) => (
            <path key={i} d={s.d} fill="none" stroke="#ff5b1f" strokeWidth="3" strokeLinecap="round" strokeDasharray={s.dashed ? "2 10" : undefined} />
          ))
        ) : (
          <text x="400" y="300" textAnchor="middle" fill="#9ccfe4" fontSize="18" fontFamily="monospace">
            ROSS SEA ROUTE — DEDICATED MAP TO COME
          </text>
        )}
        {(segs ?? []).flatMap((s) => s.stops).filter((v, i, a) => a.indexOf(v) === i).map((k) => (
          <g key={k}>
            <circle cx={P[k][0]} cy={P[k][1]} r="6" fill="#ff5b1f" stroke="#0b1b2e" strokeWidth="2" />
            <text x={P[k][0] + 12} y={P[k][1] + 4} fill={k === "lemaire" || k === "circle" || k === "weddell" ? "#0b1b2e" : "#f4f7f9"} fontSize="14" fontFamily="system-ui" fontWeight="600">
              {labels[k]}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="flex justify-between px-[1.2rem] py-[0.9rem] font-mono text-[0.7rem] uppercase text-glacier/70">
        <span>Indicative route · not to scale</span>
        <span>{segs?.some((s) => s.dashed) ? "Dashed = flight" : "Placeholder map"}</span>
      </figcaption>
    </figure>
  );
}
