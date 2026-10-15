"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type Row = {
  key: string;
  title: string;
  right: string;
  sub?: string;
  body?: ReactNode;
  image: { src: string; alt: string };
  tag?: string;
};

function Mask({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <span className={cn("block overflow-hidden", className)}>
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "0px 0px -5% 0px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Full-width stacked rows (reference timeline): title left, year right,
 * text rises out of a mask, the row's photo floods in on hover / focus.
 */
export function TimelineRows({ rows, filters }: { rows: Row[]; filters?: { id: string; label: string }[] }) {
  const [filter, setFilter] = useState<string>("all");
  const [open, setOpen] = useState<string | null>(null);
  const shown = filter === "all" ? rows : rows.filter((r) => r.tag === filter);

  return (
    <div>
      {filters && (
        <div className="container-site mb-[2rem] flex flex-wrap gap-[0.4rem]" role="group" aria-label="Filter">
          {[{ id: "all", label: "All" }, ...filters].map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "h-[2.3rem] cursor-pointer rounded-full px-[1.1rem] text-[0.75rem] font-medium uppercase ring-1 ring-rule transition",
                filter === f.id ? "bg-navy text-glacier ring-navy" : "bg-snow hover:ring-navy",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
      <ul className="border-t border-rule">
        {shown.map((r) => {
          const isOpen = open === r.key;
          return (
            <li key={r.key} className="group relative overflow-hidden border-b border-rule">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-within:opacity-100" aria-hidden>
                <Image src={r.image.src} alt="" fill sizes="100vw" className="scale-110 object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-100" />
                <div className="absolute inset-0 bg-navy/55" />
              </div>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : r.key)}
                aria-expanded={r.body ? isOpen : undefined}
                className="relative block w-full cursor-pointer text-left transition-colors duration-500 group-hover:text-glacier"
              >
                <div className="container-site grid-site items-end gap-y-[0.6rem] py-[1.6rem] md:py-[2.1rem]">
                  <div className="col-span-3 md:hidden">
                    <div className="relative aspect-square overflow-hidden rounded-[0.6rem]">
                      <Image src={r.image.src} alt={r.image.alt} fill sizes="25vw" className="object-cover" />
                    </div>
                  </div>
                  <div className="col-span-9 md:col-span-8">
                    {r.sub && <Mask className="t-label mb-[0.4rem] opacity-70">{r.sub}</Mask>}
                    <Mask>
                      <span className="block font-display text-[clamp(1.9rem,4.6vw,4.2rem)] font-extrabold lowercase leading-[0.92] tracking-[-0.035em] [font-stretch:75%]">
                        {r.title}
                      </span>
                    </Mask>
                  </div>
                  <div className="col-span-12 md:col-span-3 md:col-start-10 md:text-right">
                    <Mask delay={0.08}>
                      <span className="font-mono text-[1rem] md:text-[1.25rem]">{r.right}</span>
                    </Mask>
                  </div>
                </div>
              </button>
              {r.body && (
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden group-hover:text-glacier"
                >
                  <div className="container-site grid-site pb-[2rem]">
                    <div className="col-span-12 max-w-[40rem] text-[1rem] leading-[1.55] md:col-span-7 md:col-start-1">{r.body}</div>
                  </div>
                </motion.div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
