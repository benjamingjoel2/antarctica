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
    <label className={cn("relative inline-flex h-[2.6rem] items-center rounded-full pl-[1.1rem] pr-[2.2rem] text-[0.78rem] font-medium uppercase ring-1 transition", value ? "bg-navy text-glacier ring-navy" : "bg-snow ring-rule hover:ring-navy")}>
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="cursor-pointer bg-transparent uppercase outline-none">
        <option value="" className="text-navy">{label}: all</option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="text-navy">{o.label}</option>
        ))}
      </select>
      <svg aria-hidden viewBox="0 0 10 6" className="pointer-events-none absolute right-[0.9rem] h-[0.4rem] w-[0.6rem]"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
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
          <span className="block font-display text-[2rem] font-extrabold lowercase leading-[0.92] tracking-[-0.03em] [font-stretch:75%]">{e.name}</span>
          <span className="mt-[0.7rem] flex flex-wrap gap-x-[1rem] gap-y-[0.2rem] font-mono text-[0.72rem] uppercase text-slate">
            <span>{r?.name}</span>
            <span>{e.durationDays} days</span>
            <span>{shipSizeLabel[e.shipType]}</span>
            <span>{e.seasonWindow}</span>
          </span>
          <span className="mt-[0.9rem] block space-y-[0.25rem] text-[0.95rem] text-slate">
            {e.highlights.slice(0, 4).map((h) => (
              <span key={h} className="block before:mr-[0.5rem] before:text-iceberg-deep before:content-['—']">{h}</span>
            ))}
          </span>
          <span className="mt-[1rem] block text-[1.05rem] font-medium">
            <Price usd={e.fromPriceUSD} prefix="From" suffix="per person" />
          </span>
        </>
      ),
    };
  });

  const active = route || month || size || dur;

  return (
    <div>
      <div className="mb-[3rem] flex flex-wrap items-center gap-[0.5rem]" role="group" aria-label="Filter expeditions">
        <Select label="Route" value={route} onChange={setRoute} options={routes.map((r) => ({ value: r.slug, label: r.name }))} />
        <Select label="Month" value={month} onChange={setMonth} options={monthOrder.map((m) => ({ value: m, label: m }))} />
        <Select label="Ship" value={size} onChange={setSize} options={(Object.keys(shipSizeLabel) as ShipSize[]).map((s) => ({ value: s, label: shipSizeLabel[s] }))} />
        <Select label="Length" value={dur} onChange={setDur} options={durations.map((d) => ({ value: d.id, label: d.label }))} />
        {active && (
          <button type="button" onClick={() => (setRoute(""), setMonth(""), setSize(""), setDur(""))} className="cursor-pointer px-[0.8rem] text-[0.75rem] uppercase underline underline-offset-4">
            Clear
          </button>
        )}
        <span className="ml-auto font-mono text-[0.75rem] text-slate" aria-live="polite">
          {String(filtered.length).padStart(2, "0")} expeditions
        </span>
      </div>
      {items.length ? (
        <CardGrid items={items} cta="View expedition" />
      ) : (
        <p className="py-[4rem] text-center text-slate">No departures match those filters yet. Try widening the month or ask your specialist.</p>
      )}
    </div>
  );
}
