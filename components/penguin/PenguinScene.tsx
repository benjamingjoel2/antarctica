"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, type MotionValue } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PenguinSvg } from "./PenguinSvg";

const gear = [
  "Waterproof parka",
  "Muck boots",
  "Binoculars",
  "Polarised sunglasses",
  "Merino base layer",
  "Waterproof trousers",
  "Warm hat",
  "Liner gloves",
  "Dry bag",
  "Seasickness remedy",
  "Spare batteries",
  "SPF 50",
];

// Scatter positions (% of scene)
const spots = [
  [6, 14], [70, 10], [84, 38], [12, 58], [40, 8], [58, 70],
  [26, 80], [78, 76], [4, 34], [90, 58], [46, 86], [64, 28],
];

function Follower({ x, y, delay, size }: { x: MotionValue<number>; y: MotionValue<number>; delay: number; size: string }) {
  const sx = useSpring(x, { stiffness: 120 - delay * 30, damping: 18 + delay * 2 });
  const sy = useSpring(y, { stiffness: 120 - delay * 30, damping: 18 + delay * 2 });
  return (
    <motion.div className="pointer-events-none absolute left-0 top-0 z-20" style={{ x: sx, y: sy }}>
      <PenguinSvg className={`${size} -translate-x-1/2 -translate-y-full origin-bottom animate-[waddle_0.7s_ease-in-out_infinite]`} />
    </motion.div>
  );
}

export function PenguinScene({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();
  const area = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const [sliding, setSliding] = useState(0);

  useEffect(() => {
    const el = area.current;
    if (!el || reduce) return;
    const r0 = el.getBoundingClientRect();
    x.set(r0.width / 2);
    y.set(r0.height * 0.75);
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, [reduce, x, y]);


  return (
    <div ref={area} className={`relative isolate overflow-hidden bg-ice text-ink ${compact ? "min-h-[100svh]" : "h-full"}`}>
      {/* reference shaka grid: the word repeated 3 × 3 in mono */}
      <div aria-hidden className="absolute inset-0 grid grid-rows-3 px-[1.25rem] py-[4.5rem] select-none">
        {[0, 1, 2].map((row) => (
          <div key={row} className="t-mono flex items-start justify-between">
            <span>Waddle</span>
            <span>Waddle</span>
            <span>Waddle</span>
          </div>
        ))}
      </div>

      {/* gear cards */}
      {gear.map((g, i) => (
        <motion.div
          key={g}
          className="absolute z-10 hidden md:block"
          style={{ left: `${spots[i][0]}%`, top: `${spots[i][1]}%` }}
          initial={{ opacity: 0, scale: 0.6, rotate: (i % 2 ? 1 : -1) * 8 }}
          animate={{ opacity: 1, scale: 1, rotate: (i % 2 ? 1 : -1) * 4 }}
          transition={{ delay: 0.15 + i * 0.04, type: "spring", stiffness: 200, damping: 16 }}
          whileHover={{ scale: 1.08, rotate: 0 }}
        >
          <Link
            href="/journal/what-to-pack-for-antarctica"
            className="t-mono block bg-ink px-[0.3rem] py-[0.15rem] text-ice hover:bg-orange hover:text-ink"
          >
            <span className="mr-[0.4rem] opacity-60">{String(i + 1).padStart(2, "0")}</span>
            {g}
          </Link>
        </motion.div>
      ))}

      {/* hero penguin */}
      <div className="absolute inset-x-0 bottom-[8%] z-20 flex flex-col items-center">
        <button
          type="button"
          onClick={() => setSliding((s) => s + 1)}
          className="group cursor-pointer"
          aria-label="Make the penguin belly-slide"
        >
          {sliding % 2 === 1 && !reduce ? (
            <motion.div key={sliding} initial={{ x: "-60vw" }} animate={{ x: "60vw" }} transition={{ duration: 2.2, ease: "easeInOut" }} onAnimationComplete={() => setSliding((s) => s + 1)}>
              <PenguinSvg pose="slide" className="w-[14rem]" />
            </motion.div>
          ) : (
            <PenguinSvg pose="wave" title="Seventh Continent penguin" className={`w-[9rem] origin-bottom md:w-[12rem] ${reduce ? "" : "animate-[waddle_0.9s_ease-in-out_infinite]"}`} />
          )}
        </button>
        <p className="t-mono mt-[0.8rem] bg-ink px-[0.3rem] py-[0.15rem] text-ice">Click me · I belly-slide</p>
      </div>

      {/* cursor queue */}
      {!reduce && (
        <>
          <Follower x={x} y={y} delay={0} size="w-[3.4rem]" />
          <Follower x={x} y={y} delay={1} size="w-[2.8rem]" />
          <Follower x={x} y={y} delay={2} size="w-[2.2rem]" />
        </>
      )}
    </div>
  );
}
