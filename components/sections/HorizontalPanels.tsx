"use client";

import { motion, useMotionValueEvent, useTransform } from "framer-motion";
import { useSectionProgress } from "@/lib/useSectionProgress";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import type { Ship } from "@/data/types";
import { shipSizeLabel } from "@/lib/data";
import { cn } from "@/lib/cn";
import { useLenis } from "@/components/layout/SmoothScroll";
import { useReducedMotionSafe } from "@/lib/useReducedMotionSafe";

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

/** Reference partner card: 100vw × 100vh, photo 40vw on the left, logo box + paragraph + mono links on the right. */
function Panel({ ship, index, total }: { ship: Ship; index: number; total: number }) {
  return (
    <article className="relative flex w-full shrink-0 flex-col bg-ice text-ink md:h-full md:min-h-screen md:w-screen md:flex-row" aria-labelledby={`ship-${ship.slug}`}>
      <div className="relative h-[55vh] w-full md:h-auto md:w-[40vw]">
        <Image src={ship.image.src} alt={ship.image.alt} fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover" />
        <span className="t-mono absolute bottom-[1.25rem] left-[1.25rem] bg-ink px-[0.3rem] py-[0.15rem] text-ice">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 items-center px-[1.25rem] py-[3rem] md:px-[1.25rem] md:pl-[2rem]">
        <div className="max-w-[36rem]">
          <div className="grid h-[13.6rem] w-[13.6rem] place-items-center rounded-[0.3rem] border border-ink/20 text-center">
            <span>
              <span className="t-mono block opacity-60">MV</span>
              <span id={`ship-${ship.slug}`} className="block font-display text-[2.6rem] uppercase leading-[0.85] tracking-[-0.03em] [font-stretch:82%]">{ship.name.replace(/^MV\s+/, "")}</span>
            </span>
          </div>
          <p className="t-h3 mt-[0.6rem]">{ship.blurb} {shipSizeLabel[ship.size]}, {ship.passengers} guests, {ship.lengthM} m, {ship.zodiacs} zodiacs.</p>
          <p className="t-mono mt-[0.8rem] opacity-60">{ship.operator}</p>
          <div className="mt-[2.2rem] flex flex-col items-start gap-[0.2rem]">
            <UnderlineLink href={`/ships/${ship.slug}`}>View ship</UnderlineLink>
            <UnderlineLink href={`/ships/${ship.slug}#voyages`}>Expeditions on this ship</UnderlineLink>
            <span className="t-mono opacity-40">Deck plan (soon)</span>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Horizontal-scroll showcase (reference partners page). Vertical scroll drives
 * panels sideways; a top bar of names marks the current one. Stacks vertically
 * on mobile and for reduced-motion users.
 */
export function HorizontalPanels({ ships }: { ships: Ship[] }) {
  const desktop = useDesktop();
  const reduce = useReducedMotionSafe();
  const horizontal = desktop && !reduce;
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const scrollYProgress = useSectionProgress(ref);
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

  return (
    // The section (and its ref) is always rendered so scroll tracking binds on hydration.
    <section ref={ref} aria-label="Partner ships" style={horizontal ? { height: `${ships.length * 100}vh` } : undefined} className="relative bg-ice">
      <div className={horizontal ? "sticky top-0 h-screen overflow-hidden" : ""}>
        <motion.div className={horizontal ? "flex h-full" : "flex flex-col"} style={horizontal ? { x } : undefined}>
          {ships.map((s, i) => (
            <Panel key={s.slug} ship={s} index={i} total={ships.length} />
          ))}
        </motion.div>
        {horizontal && (
          <nav aria-label="Ships" className="absolute bottom-[1.25rem] left-[40vw] z-10 flex gap-[0.3rem] pl-[2rem]">
            {ships.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => goTo(i)}
                aria-current={active === i ? "true" : undefined}
                className={cn("t-mono relative cursor-pointer px-[0.3rem] py-[0.15rem] text-[1rem] transition-colors", active === i ? "text-ice" : "text-ink hover:opacity-60")}
              >
                {active === i && <motion.span layoutId="ship-highlight" className="absolute inset-0 bg-ink" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
                <span className="relative">{s.name.replace(/^MV\s+/, "")}</span>
              </button>
            ))}
          </nav>
        )}
      </div>
    </section>
  );
}
