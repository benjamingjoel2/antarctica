"use client";

import { useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Counter } from "@/components/ui/Counter";
import { PillTag } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";

type Item = { label: string; count: number; href: string; image: string; alt: string };

function Card({ item, index, onActive }: { item: Item; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);
  return (
    <Link ref={ref} href={item.href} className="group relative block aspect-[4/5] overflow-hidden rounded-[1.2rem]">
      <Image src={item.image} alt={item.alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover transition-transform duration-1000 ease-[var(--ease-expo)] group-hover:scale-105" />
      <span className="absolute inset-0 bg-navy/0 transition-colors duration-500 group-hover:bg-navy/20" />
      <span className="absolute bottom-[1rem] left-[1rem]">
        <PillTag>View {item.label.toLowerCase()}</PillTag>
      </span>
    </Link>
  );
}

/** Sticky giant words with counters; the word for the card in view lights up. */
export function DiscoverCounters({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  return (
    <section aria-labelledby="discover" className="bg-glacier pb-[8rem]">
      <div className="container-site grid-site gap-y-[3rem]">
        <div className="col-span-12 lg:col-span-6">
          <div className="sticky top-[18vh]">
            <h2 id="discover" className="sr-only">Discover</h2>
            <ul>
              {items.map((it, i) => (
                <li key={it.label}>
                  <Link
                    href={it.href}
                    className={cn(
                      "t-display flex items-start text-[clamp(3.6rem,10.5vw,9.5rem)] transition-colors duration-500",
                      active === i ? "text-navy" : "text-rule hover:text-slate",
                    )}
                  >
                    {it.label}
                    <Counter value={it.count} className="ml-[0.2em] mt-[0.5em] font-mono text-[0.16em] font-normal tracking-normal" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="t-label mt-[1.5rem] text-slate">Discover ↓</p>
          </div>
        </div>
        <div className="col-span-12 flex flex-col gap-[1.2rem] lg:col-span-5 lg:col-start-8 lg:pt-[20vh]">
          {items.map((it, i) => (
            <Card key={it.label} item={it} index={i} onActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  );
}
