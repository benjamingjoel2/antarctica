"use client";

import { useMotionValue, useScroll, type MotionValue } from "framer-motion";
import { useEffect, type RefObject } from "react";

/**
 * Scroll progress (0 → 1) of a section, measured directly from its bounding box.
 * We avoid framer's `useScroll({ target })` here: in Chromium it switches to the
 * native ViewTimeline, which reports non-monotonic progress for tall pinned
 * (sticky) sections — the hero's mask faded back out while scrolling down.
 *
 * - "contain": 0 when the section's top hits the viewport top, 1 when its bottom
 *   hits the viewport bottom (["start start", "end end"]).
 * - "through": 0 when it enters from below, 1 when it leaves at the top
 *   (["start end", "end start"]).
 */
export function useSectionProgress(ref: RefObject<HTMLElement | null>, mode: "contain" | "through" = "contain"): MotionValue<number> {
  const { scrollY } = useScroll();
  const progress = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = mode === "contain" ? -r.top / Math.max(1, r.height - vh) : (vh - r.top) / Math.max(1, vh + r.height);
      progress.set(Math.min(1, Math.max(0, raw)));
    };
    update();
    const unsub = scrollY.on("change", update);
    window.addEventListener("resize", update);
    return () => {
      unsub();
      window.removeEventListener("resize", update);
    };
  }, [ref, mode, scrollY, progress]);

  return progress;
}
