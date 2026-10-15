"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { PillButton } from "@/components/ui/Pill";
import { useLenis } from "@/components/layout/SmoothScroll";
import { useUi } from "@/lib/ui";
import { PenguinScene } from "./PenguinScene";

/** Site-wide easter egg overlay, toggled from the header pill. */
export function PenguinMode() {
  const { penguin, setPenguin } = useUi();
  const lenis = useLenis();

  useEffect(() => {
    if (!penguin) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPenguin(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [penguin, lenis, setPenguin]);

  return (
    <AnimatePresence>
      {penguin && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Penguin mode"
          className="fixed inset-0 z-[58]"
          initial={{ clipPath: "circle(0% at 90% 4%)" }}
          animate={{ clipPath: "circle(150% at 90% 4%)" }}
          exit={{ clipPath: "circle(0% at 90% 4%)" }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          <PenguinScene />
          <div className="absolute bottom-[1.2rem] left-1/2 z-30 -translate-x-1/2">
            <PillButton variant="dark" onClick={() => setPenguin(false)} autoFocus>
              Back to serious mode
            </PillButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
