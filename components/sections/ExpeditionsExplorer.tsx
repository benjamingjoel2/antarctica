"use client";

import { useMemo, useState } from "react";
import { Price } from "@/components/ui/Price";
import type { Expedition, Month, Route, ShipSize } from "@/data/types";
import { shipSizeLabel } from "@/lib/data";
import { cn } from "@/lib/cn";
import { CardGrid, type CardItem } from "./CardGrid";

const monthOrder: Month[] = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
const durations = [
  { id: "short", label: "Up to 10 days", test: (d: number) => d <= 10 },
  { id: "mid", label: "11–16 days", test: (d: number) => d > 10 && d <= 16 },
  { id: "long", label: "17+ days", test: (d: number) => d > 16 },
];

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <label className={cn("t-mono relative inline-flex items-center transition-colors", value ? "bg-ice text-ink" : "text-ice ring-1 ring-ice/40 hover:bg-ice/10")}>
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="cursor-pointer bg-transparent py-[0.15rem] pl-[0.3rem] pr-[1.2rem] uppercase outline-none">
        <option value="" className="bg-ice text-ink">{label}: all</option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-ice text-ink">{o.label}</option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-[0.3rem]">▾</span>
    </label>
  );
}

export function ExpeditionsExplorer({ expeditions, routes }: { expeditions: Expedition[]; routes: Route[] }) {
  const [route, setRoute] = useState("");
  const [month, setMonth] = useState("");
  const [size, setSize] = useState("");
  const [dur, setDur] = useState("");

  const filtered = useMemo(
    () =>
      expeditions.filter(
        (e) =>
          (!route || e.routeSlug === route) &&
          (!month || e.months.includes(month as Month)) &&
          (!size || e.shipType === size) &&
          (!dur || durations.find((d) => d.id === dur)!.test(e.durationDays)),
      ),
    [expeditions, route, month, size, dur],
  );

  const items: CardItem[] = filtered.map((e) => {
    const r = routes.find((x) => x.slug === e.routeSlug);
    return {
      href: `/expeditions/${e.slug}`,
      title: e.titleLines.join(" "),
      meta: <Price usd={e.fromPriceUSD} prefix="From" />,
      image: e.image,
      video: e.video,
      body: (
        <>
          <span className="t-h3 block">{e.name}</span>
          <span className="t-mono mt-[0.6rem] block leading-[1.15] opacity-70">
            {r?.name} · {e.durationDays} days · {shipSizeLabel[e.shipType]} · {e.seasonWindow}
          </span>
          <span className="t-small mt-[0.6rem] block opacity-80">
            {e.highlights.slice(0, 4).map((h) => (
              <span key={h} className="block">— {h}</span>
            ))}
          </span>
          <span className="t-mono mt-[0.7rem] block">
            <Price usd={e.fromPriceUSD} prefix="From" suffix="per person" />
          </span>
        </>
      ),
    };
  });

  const active = route || month || size || dur;

  return (
    <div>
      <div className="mb-[3rem] flex flex-wrap items-center gap-[0.3rem] px-[1.25rem]" role="group" aria-label="Filter expeditions">
        <Select label="Route" value={route} onChange={setRoute} options={routes.map((r) => ({ value: r.slug, label: r.name }))} />
        <Select label="Month" value={month} onChange={setMonth} options={monthOrder.map((m) => ({ value: m, label: m }))} />
        <Select label="Ship" value={size} onChange={setSize} options={(Object.keys(shipSizeLabel) as ShipSize[]).map((s) => ({ value: s, label: shipSizeLabel[s] }))} />
        <Select label="Length" value={dur} onChange={setDur} options={durations.map((d) => ({ value: d.id, label: d.label }))} />
        {active && (
          <button type="button" onClick={() => (setRoute(""), setMonth(""), setSize(""), setDur(""))} className="t-mono cursor-pointer px-[0.5rem] underline underline-offset-4">
            Clear
          </button>
        )}
        <span className="t-mono ml-auto opacity-60" aria-live="polite">
          {String(filtered.length).padStart(2, "0")} expeditions
        </span>
      </div>
      {items.length ? (
        <CardGrid items={items} cta="View expedition" />
      ) : (
        <p className="t-small py-[4rem] text-center opacity-70">No departures match those filters yet. Try widening the month or ask your specialist.</p>
      )}
    </div>
  );
}
