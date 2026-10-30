"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * framer-motion's useReducedMotion() returns the real preference on the
 * client's first render but null on the server, so components that branch on
 * it hydrate with a mismatch for reduced-motion visitors (React error #418).
 * This returns false until after hydration, then the real preference.
 */
export function useReducedMotionSafe(): boolean {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? Boolean(reduce) : false;
}
