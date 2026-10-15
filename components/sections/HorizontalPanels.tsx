"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import type { Ship } from "@/data/types";
import { shipSizeLabel } from "@/lib/data";
import { cn } from "@/lib/cn";
import { useLenis } from "@/components/layout/SmoothScroll";

function useDesktop() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setOk(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return ok;
}

function Panel({ ship, index, total }: { ship: Ship; index: number; total: number }) {
  return (
    <article className="relative flex h-full w-full shrink-0 flex-col md:min-h-screen md:w-screen md:flex-row" aria-labelledby={`ship-${ship.slug}`}>
      <div className="relative h-[55vh] w-full md:h-auto md:w-[48%]">
        <Image src={ship.image.src} alt={ship.image.alt} fill sizes="(min-width:768px) 48vw, 100vw" className="object-cover" />
        <span className="absolute bottom-[1rem] left-[1rem] font-mono text-[0.75rem] text-white/85">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 items-center bg-glacier px-[1.25rem] py-[3rem] md:px-[4vw] md:pt-[7rem]">
        <div className="max-w-[34rem]">
          <p className="t-label text-slate">
            {shipSizeLabel[ship.size]} · {ship.passengers} guests · {ship.operator}
          </p>
          <h2 id={`ship-${ship.slug}`} className="mt-[1rem] font-display text-[clamp(3rem,7vw,6.5rem)] font-extrabold uppercase leading-[0.82] tracking-[-0.035em] [font-stretch:68%]">
            {ship.name.replace(/^MV\s+/, "")}
          </h2>
          <p className="mt-[1.5rem] text-[1.05rem] leading-[1.55] text-slate">{ship.blurb}</p>
          <dl className="mt-[1.8rem] grid grid-cols-3 gap-[1rem] border-t border-rule pt-[1.2rem]">
            {[
              ["Length", `${ship.lengthM} m`],
              ["Guests", String(ship.passengers)],
              ["Zodiacs", String(ship.zodiacs)],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="t-label text-slate">{k}</dt>
                <dd className="mt-[0.3rem] font-display text-[1.8rem] font-extrabold [font-stretch:75%]">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-[2rem] flex flex-wrap gap-x-[1.6rem] gap-y-[0.6rem]">
            <UnderlineLink href={`/ships/${ship.slug}`}>View ship</UnderlineLink>
            <UnderlineLink href={`/ships/${ship.slug}#voyages`}>Expeditions on this ship</UnderlineLink>
            <span className="text-[0.82rem] uppercase text-slate">Deck plan (soon)</span>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Horizontal-scroll showcase (reference partners page): vertical scrolling
 * drives the panels sideways; a logo bar on top marks the current panel.
 * Stacks vertically on mobile and for reduced-motion users.
 */
export function HorizontalPanels({ ships }: { ships: Ship[] }) {
  const desktop = useDesktop();
  const reduce = useReducedMotion();
  const horizontal = desktop && !reduce;
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(ships.length - 1) * 100}vw`]);
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(ships.length - 1, Math.round(v * (ships.length - 1)))));

  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.offsetTop + (i / Math.max(1, ships.length - 1)) * (el.offsetHeight - window.innerHeight);
    if (lenis) lenis.scrollTo(top);
    else window.scrollTo({ top, behavior: "smooth" });
  };

  const bar = (
    <nav aria-label="Ships" className="pointer-events-auto mx-auto flex w-max max-w-[calc(100vw-2rem)] gap-[0.3rem] overflow-x-auto rounded-full bg-snow/90 p-[0.3rem] backdrop-blur">
      {ships.map((s, i) => (
        <button
          key={s.slug}
          type="button"
          onClick={() => goTo(i)}
          aria-current={active === i ? "true" : undefined}
          className={cn(
            "relative h-[2.2rem] cursor-pointer whitespace-nowrap rounded-full px-[0.9rem] text-[0.7rem] font-medium uppercase transition-colors",
            active === i ? "text-glacier" : "text-navy hover:text-iceberg-deep",
          )}
        >
          {active === i && <motion.span layoutId="ship-highlight" className="absolute inset-0 rounded-full bg-navy" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
          <span className="relative">{s.name.replace(/^MV\s+/, "")}</span>
        </button>
      ))}
    </nav>
  );

  return (
    // The section (and its ref) is always rendered so scroll tracking binds on hydration.
    <section ref={ref} aria-label="Partner ships" style={horizontal ? { height: `${ships.length * 100}vh` } : undefined} className="relative">
      <div className={horizontal ? "sticky top-0 h-screen overflow-hidden" : ""}>
        <motion.div className={horizontal ? "flex h-full" : "flex flex-col"} style={horizontal ? { x } : undefined}>
          {ships.map((s, i) => (
            <Panel key={s.slug} ship={s} index={i} total={ships.length} />
          ))}
        </motion.div>
        {horizontal && <div className="pointer-events-none absolute inset-x-0 bottom-[1.5rem] z-10">{bar}</div>}
      </div>
    </section>
  );
}
