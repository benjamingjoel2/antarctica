"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useLenis } from "@/components/layout/SmoothScroll";
import { Planner } from "./Planner";

/** Planner opened over the current page (intercepted route). */
export function PlannerModal({ initialRoute }: { initialRoute?: string }) {
  const router = useRouter();
  const lenis = useLenis();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && router.back();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lenis, router]);

  return (
    <div className="fixed inset-0 z-[96]">
      <motion.button
        type="button"
        aria-label="Close planner"
        onClick={() => router.back()}
        className="absolute inset-0 cursor-default bg-navy/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <motion.div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Plan my expedition"
        data-lenis-prevent
        className="absolute inset-x-0 bottom-0 top-[4vh] overflow-y-auto rounded-t-[1.6rem] bg-glacier outline-none md:inset-x-[3vw] md:rounded-t-[2rem]"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between bg-glacier/90 px-[1.5rem] py-[1rem] backdrop-blur md:px-[2.5rem]">
          <p className="t-label text-slate">Expedition planner</p>
          <button type="button" onClick={() => router.back()} className="cursor-pointer rounded-full bg-navy px-[1.1rem] py-[0.55rem] text-[0.75rem] uppercase text-glacier hover:bg-orange hover:text-navy">
            Close
          </button>
        </div>
        <div className="px-[1.5rem] pb-[4rem] pt-[1rem] md:px-[2.5rem]">
          <Planner initialRoute={initialRoute} variant="modal" onClose={() => router.back()} />
        </div>
      </motion.div>
    </div>
  );
}
