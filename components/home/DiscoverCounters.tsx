"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Counter } from "@/components/ui/Counter";

type Item = { label: string; count: number; href: string; image: string; alt: string };

function Card({ item, index, onActive }: { item: Item; index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { margin: "-50% 0px -50% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);
  return (
    <Link ref={ref} href={item.href} className="group relative block h-[63vh] w-full overflow-hidden" aria-label={`${item.label} (${item.count})`}>
      <Image src={item.image} alt={item.alt} fill sizes="(min-width:768px) 28rem, 80vw" className="object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-105" />
      <span className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/25" />
    </Link>
  );
}

/**
 * Reference "Projects (09) / Partners (05) / Timeline (33)": a centred column
 * of tall cards; a sticky row shows the label of the card in view on the left
 * (sliding in its mask) and "Discover" on the right.
 */
export function DiscoverCounters({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const it = items[active];
  return (
    <section aria-labelledby="discover" className="relative bg-ink text-ice">
      <h2 id="discover" className="sr-only">Discover</h2>
      <div className="container-site">
        <div className="pointer-events-none sticky top-1/2 z-[2] flex -translate-y-1/2 items-center justify-between">
          <div className="relative h-[2.2rem] overflow-hidden pr-[1rem]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.p
                key={it.label}
                className="t-h3 whitespace-nowrap"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-110%" }}
                transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
              >
                {it.label}
                <Counter value={it.count} className="relative -top-[0.7rem] left-[0.3rem] font-mono text-[0.95rem]" />
              </motion.p>
            </AnimatePresence>
          </div>
          <p className="t-mono">Discover</p>
        </div>
        <div className="relative z-[1] mx-auto -mt-[2.2rem] w-[78vw] overflow-hidden rounded-[0.3rem] pb-[12rem] pt-[30vh] md:w-[28.3rem]">
          <div className="overflow-hidden rounded-[0.3rem]">
            {items.map((x, i) => (
              <Card key={x.label} item={x} index={i} onActive={setActive} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
