"use client";

import { motion, useTransform } from "framer-motion";
import { useSectionProgress } from "@/lib/useSectionProgress";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Reference "wave" grid: four solid bars (2 × 2) that slide sideways at
 * different speeds as you scroll, carrying short mono captions. Used as the
 * stepped edge between a photo and the next section.
 */
export function WaveCards({ items, tone = "dark", className }: { items: ReactNode[]; tone?: "dark" | "light"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollYProgress = useSectionProgress(ref, "through");
  const x1 = useTransform(scrollYProgress, [0, 0.6], ["-38%", "0%"]);
  const x2 = useTransform(scrollYProgress, [0, 0.6], ["38%", "0%"]);
  const x3 = useTransform(scrollYProgress, [0, 0.7], ["-22%", "0%"]);
  const x4 = useTransform(scrollYProgress, [0, 0.7], ["22%", "0%"]);
  const four: ReactNode[] = [...items, "", "", "", ""].slice(0, 4);
  const bar = tone === "dark" ? "bg-ink text-ice" : "bg-ice text-ink";
  return (
    <div ref={ref} className={cn("relative z-10 w-full overflow-hidden", className)}>
      <div className="flex">
        <motion.div style={{ x: x1 }} className={cn("flex h-[4.1rem] w-1/2 items-center justify-end pr-[1.25rem] t-mono", bar)}>{four[0]}</motion.div>
        <motion.div style={{ x: x2 }} className={cn("flex h-[4.1rem] w-1/2 items-center justify-start pl-[1.25rem] t-mono", bar)}>{four[1]}</motion.div>
      </div>
      <div className="flex">
        <motion.div style={{ x: x3 }} className={cn("flex h-[4.1rem] w-1/2 items-center justify-end pr-[1.25rem] t-mono", bar)}>{four[2]}</motion.div>
        <motion.div style={{ x: x4 }} className={cn("flex h-[4.1rem] w-1/2 items-center justify-start pl-[1.25rem] t-mono", bar)}>{four[3]}</motion.div>
      </div>
    </div>
  );
}
