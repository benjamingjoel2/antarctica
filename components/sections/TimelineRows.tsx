"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type Row = { key: string; title: string; right: string; sub?: string; body?: ReactNode; image: { src: string; alt: string }; tag?: string };

/**
 * Reference timeline: a pinned full-bleed photo, darkened, behind tight mono
 * rows (title left, year right). Hovering or focusing a row swaps the photo;
 * clicking opens its note.
 */
export function TimelineRows({ rows, filters }: { rows: Row[]; filters?: { id: string; label: string }[] }) {
  const [filter, setFilter] = useState("all");
  const [hover, setHover] = useState(0);
  const [open, setOpen] = useState<string | null>(null);
  const shown = filter === "all" ? rows : rows.filter((r) => r.tag === filter);
  const bg = shown[Math.min(hover, shown.length - 1)]?.image ?? rows[0].image;

  return (
    <div className="relative">
      <div className="sticky top-0 -mb-[100svh] h-[100svh] overflow-hidden" aria-hidden>
        <AnimatePresence initial={false}>
          <motion.div key={bg.src} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
            <Image src={bg.src} alt="" fill sizes="100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="relative z-[1] px-[1.25rem] pb-[12rem] pt-[2rem]">
        {filters && (
          <div className="mb-[3rem] flex flex-wrap gap-[0.3rem]" role="group" aria-label="Filter">
            {[{ id: "all", label: "All" }, ...filters].map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => (setFilter(f.id), setHover(0))}
                className={cn("t-mono cursor-pointer px-[0.3rem] py-[0.15rem] transition-colors", filter === f.id ? "bg-ice text-ink" : "text-ice ring-1 ring-ice/40 hover:bg-ice/10")}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
        <ul>
          {shown.map((r, i) => {
            const isOpen = open === r.key;
            return (
              <li key={r.key}>
                <button
                  type="button"
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onClick={() => setOpen(isOpen ? null : r.key)}
                  aria-expanded={r.body ? isOpen : undefined}
                  className={cn("t-mono flex w-full cursor-pointer items-baseline justify-between gap-[1rem] py-[0.2rem] text-left transition-opacity", hover === i ? "opacity-100" : "opacity-75 hover:opacity-100")}
                >
                  <span>
                    {r.title}
                    {r.sub && <span className="ml-[0.8rem] opacity-50">{r.sub}</span>}
                  </span>
                  <span className="shrink-0">{r.right}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && r.body && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                      <p className="t-small max-w-[40rem] py-[0.8rem] opacity-80">{r.body}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
