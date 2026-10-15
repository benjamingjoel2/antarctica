"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Line = string | { text: string; className?: string };

/**
 * Giant split-word headline. Every word sits in its own overflow mask and
 * slides up in sequence. Lines can be offset individually (reference layout).
 */
export function SplitWords({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  onMount = false,
  children,
}: {
  lines: Line[];
  as?: "h1" | "h2" | "h3" | "div" | "p";
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Animate on mount (hero) instead of on scroll into view. */
  onMount?: boolean;
  children?: ReactNode;
}) {
  let i = 0;
  const label = lines.map((l) => (typeof l === "string" ? l : l.text)).join(" ");
  return (
    <Tag className={cn("relative", className)} aria-label={label}>
      {lines.map((line, li) => {
        const text = typeof line === "string" ? line : line.text;
        const cls = typeof line === "string" ? undefined : line.className;
        return (
          <span key={li} aria-hidden className={cn("flex flex-wrap gap-x-[0.22em]", lineClassName, cls)}>
            {text.split(" ").map((w, wi) => {
              const d = delay + i++ * 0.08;
              return (
                <span key={wi} className="inline-block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                  <motion.span
                    className="inline-block will-change-transform"
                    initial={{ y: "105%" }}
                    {...(onMount
                      ? { animate: { y: "0%" } }
                      : { whileInView: { y: "0%" }, viewport: { once: true, margin: "0px 0px -10% 0px" } })}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: d }}
                  >
                    {w}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
      {children}
    </Tag>
  );
}
