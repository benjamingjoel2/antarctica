"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Four offset cards that drift at different speeds (reference "wave" grid).
 * Sits absolutely at the bottom of a hero/video section.
 */
export function WaveCards({ items, tone = "dark", className }: { items: ReactNode[]; tone?: "dark" | "light"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const speeds = [-40, 30, -70, 10];
  const ys = [
    useTransform(scrollYProgress, [0, 1], [0, speeds[0]]),
    useTransform(scrollYProgress, [0, 1], [0, speeds[1]]),
    useTransform(scrollYProgress, [0, 1], [0, speeds[2]]),
    useTransform(scrollYProgress, [0, 1], [0, speeds[3]]),
  ];
  const four: ReactNode[] = [...items, "", "", "", ""].slice(0, 4);
  const offsets = ["md:col-start-1 md:mt-0", "md:col-start-2 md:mt-[6rem]", "md:col-start-3 md:mt-[2rem]", "md:col-start-4 md:mt-[8rem]"];

  return (
    <div ref={ref} className={cn("pointer-events-none relative z-10", className)}>
      <div className="grid grid-cols-2 gap-[0.6rem] md:grid-cols-4 md:gap-[1rem]">
        {four.map((t, i) => (
          <motion.div
            key={i}
            style={{ y: ys[i] }}
            className={cn(
              "flex min-h-[6rem] items-end rounded-[0.9rem] p-[1rem] md:min-h-[8.5rem]",
              offsets[i],
              i % 2 === 1 && "mt-[2.5rem]",
              t ? "" : "opacity-0 md:opacity-100",
              tone === "dark" ? "bg-navy text-glacier" : "bg-snow text-navy shadow-[0_20px_50px_-30px_rgba(11,27,46,0.5)]",
              !t && (tone === "dark" ? "bg-navy/90" : "bg-iceberg-soft"),
            )}
          >
            {t && <p className="text-[0.95rem] font-medium uppercase leading-[1.1] tracking-[-0.01em]">{t}</p>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
