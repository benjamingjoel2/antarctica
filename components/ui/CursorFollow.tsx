"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState, type ReactNode, type RefObject } from "react";

/**
 * Element that trails the pointer while it is inside `area` (desktop pointers only).
 * Used for the menu label, card labels and the footer penguin.
 */
export function CursorFollow({
  area,
  children,
  offset = { x: 16, y: 16 },
  stiffness = 350,
}: {
  area: RefObject<HTMLElement | null>;
  children: ReactNode;
  offset?: { x: number; y: number };
  stiffness?: number;
}) {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness, damping: 30, mass: 0.6 });
  const [active, setActive] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = area.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX + offset.x);
      y.set(e.clientY + offset.y);
    };
    const enter = (e: PointerEvent) => {
      x.jump(e.clientX + offset.x);
      y.jump(e.clientY + offset.y);
      sx.jump(e.clientX + offset.x);
      sy.jump(e.clientY + offset.y);
      setActive(true);
    };
    const leave = () => setActive(false);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, [area, offset.x, offset.y, x, y, sx, sy]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden md:block"
      style={{ x: sx, y: sy }}
      animate={{ scale: active ? 1 : 0, opacity: active ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
