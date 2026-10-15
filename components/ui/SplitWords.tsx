"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Line = string | { text: string; className?: string };

const word: Variants = {
  hidden: { y: "105%" },
  show: (d: number) => ({ y: "0%", transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: d } }),
};

/**
 * Giant split-word headline. Every word sits in its own overflow mask and
 * slides up in sequence. The in-view trigger lives on the (unclipped) heading,
 * so it fires reliably. Lines can be offset individually (reference layout).
 */
export function SplitWords({
  lines,
  as = "h2",
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
  const Tag = motion[as];
  return (
    <Tag
      className={cn("relative", className)}
      aria-label={label}
      initial="hidden"
      {...(onMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } })}
    >
      {lines.map((line, li) => {
        const text = typeof line === "string" ? line : line.text;
        const cls = typeof line === "string" ? undefined : line.className;
        return (
          <span key={li} aria-hidden className={cn("flex flex-wrap gap-x-[0.22em]", lineClassName, cls)}>
            {text.split(" ").map((w, wi) => (
              <span key={wi} className="inline-block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                <motion.span className="inline-block will-change-transform" variants={word} custom={delay + i++ * 0.08}>
                  {w}
                </motion.span>
              </span>
            ))}
          </span>
        );
      })}
      {children}
    </Tag>
  );
}
