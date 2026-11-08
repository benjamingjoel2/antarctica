"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { img } from "@/data/images";

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

/** Penguin mode: a full-bleed photograph of a gentoo penguin on snow with the packing list scattered over it. */
export function PenguinScene({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative isolate overflow-hidden bg-ink text-white ${compact ? "min-h-[100svh]" : "h-full"}`}>
      <Image src={img.penguinWalk} alt="A gentoo penguin walking across the snow" fill priority sizes="100vw" className="-z-10 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/35 via-transparent to-ink/45" />

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

      <div className="absolute inset-x-0 top-[6rem] z-20 px-[1.25rem] md:hidden">
        <Link href="/journal/what-to-pack-for-antarctica" className="t-mono inline-block bg-ink px-[0.3rem] py-[0.15rem] text-ice">
          What to pack for Antarctica
        </Link>
      </div>
    </div>
  );
}
