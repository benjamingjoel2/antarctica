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
    <figure className="overflow-hidden rounded-[0.3rem] bg-ink-2 text-ice ring-1 ring-ice/10">
      <svg viewBox="0 0 800 620" className="h-auto w-full" role="img" aria-label={`Route map placeholder: ${title}`}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="#8db8dc" strokeOpacity=".08" />
          </pattern>
        </defs>
        <rect width="800" height="620" fill="url(#grid)" />
        {/* South America tip */}
        <path d="M60 0 L260 0 C 250 40, 240 80, 230 110 C 215 130, 175 130, 150 110 C 120 80, 90 40, 60 0 Z" fill="#0b1726" stroke="#8db8dc" strokeOpacity=".6" />
        {/* Antarctic Peninsula + continent */}
        <path d="M330 330 C 300 360, 270 420, 240 470 C 210 520, 190 560, 170 620 L 800 620 L 800 560 C 700 540, 600 520, 520 500 C 460 480, 400 430, 370 380 C 360 360, 350 340, 330 330 Z" fill="#e8f0f8" fillOpacity=".92" />
        <ellipse cx="400" cy="120" rx="22" ry="10" fill="#0b1726" stroke="#8db8dc" strokeOpacity=".6" />
        <ellipse cx="700" cy="210" rx="30" ry="8" fill="#0b1726" stroke="#8db8dc" strokeOpacity=".6" />
        {/* Antarctic Circle */}
        <path d="M0 560 Q 400 590 800 560" fill="none" stroke="#ff5b1f" strokeOpacity=".5" strokeDasharray="4 6" />
        <text x="16" y="550" fill="#ff5b1f" fontSize="13" fontFamily="var(--font-vt), monospace">ANTARCTIC CIRCLE 66°33′ S</text>
        <text x="230" y="250" fill="#8db8dc" fontSize="14" fontFamily="var(--font-vt), monospace" opacity=".7">DRAKE PASSAGE</text>
        {segs ? (
          segs.map((s, i) => (
            <path key={i} d={s.d} fill="none" stroke="#ff5b1f" strokeWidth="3" strokeLinecap="round" strokeDasharray={s.dashed ? "2 10" : undefined} />
          ))
        ) : (
          <text x="400" y="300" textAnchor="middle" fill="#8db8dc" fontSize="18" fontFamily="var(--font-vt), monospace">
            ROSS SEA ROUTE — DEDICATED MAP TO COME
          </text>
        )}
        {(segs ?? []).flatMap((s) => s.stops).filter((v, i, a) => a.indexOf(v) === i).map((k) => (
          <g key={k}>
            <circle cx={P[k][0]} cy={P[k][1]} r="6" fill="#ff5b1f" stroke="#030b17" strokeWidth="2" />
            <text x={P[k][0] + 12} y={P[k][1] + 4} fill={k === "lemaire" || k === "circle" || k === "weddell" ? "#030b17" : "#e8f0f8"} fontSize="14" fontFamily="system-ui" fontWeight="600">
              {labels[k]}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="t-mono flex justify-between px-[1rem] py-[0.8rem] opacity-70">
        <span>Indicative route · not to scale</span>
        <span>{segs?.some((s) => s.dashed) ? "Dashed = flight" : "Placeholder map"}</span>
      </figcaption>
    </figure>
  );
}
