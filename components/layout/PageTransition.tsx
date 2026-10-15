"use client";

import { motion, useAnimationControls } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Twelve-bar "ice shelf" wipe: two rows of six bars close over the page on
 * internal navigation, then open on the next page. Reduced motion: disabled.
 */
const COLS = 6;
const COVER = 0.55;
const STAGGER = 0.045;
const tones = ["bg-navy", "bg-navy-2", "bg-iceberg-deep", "bg-navy", "bg-navy-2", "bg-navy"];

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const top = useAnimationControls();
  const bottom = useAnimationControls();
  const busy = useRef(false);
  const first = useRef(true);
  const [off, setOff] = useState(false);

  const run = (to: number) => {
    const t = { duration: COVER, ease: [0.65, 0, 0.35, 1] as const, delay: 0 };
    return Promise.all([
      top.start((i: number) => ({ scaleY: to, transition: { ...t, delay: i * STAGGER } })),
      bottom.start((i: number) => ({ scaleY: to, transition: { ...t, delay: (COLS - 1 - i) * STAGGER } })),
    ]);
  };

  // Reveal on first load and after every route change.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setOff(true);
      busy.current = false;
      return;
    }
    const delay = first.current ? 150 : 60;
    first.current = false;
    const id = setTimeout(() => run(0).then(() => (busy.current = false)), delay);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Intercept internal link clicks.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const a = (e.target as HTMLElement).closest("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download") || a.dataset.noTransition !== undefined) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // same page / hash links
      if (url.pathname.startsWith("/plan-my-expedition") || url.pathname.startsWith("/api")) return;
      e.preventDefault();
      if (busy.current) return;
      busy.current = true;
      run(1).then(() => {
        router.push(url.pathname + url.search + url.hash);
        // Safety net: never leave the screen covered if navigation stalls.
        setTimeout(() => {
          if (busy.current) run(0).then(() => (busy.current = false));
        }, 5000);
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const bars = (controls: typeof top, origin: "top" | "bottom") =>
    Array.from({ length: COLS }, (_, i) => (
      <motion.div
        key={i}
        custom={i}
        animate={controls}
        initial={{ scaleY: 1 }}
        style={{ originY: origin === "top" ? 0 : 1 }}
        className={`h-full flex-1 ${tones[i]} -mx-px`}
      />
    ));

  if (off) return null;

  return (
    <div id="page-transition" aria-hidden className="pointer-events-none fixed inset-0 z-[100] flex flex-col">
      <div className="flex h-1/2">{bars(top, "top")}</div>
      <div className="flex h-1/2">{bars(bottom, "bottom")}</div>
      <noscript>
        <style>{"#page-transition{display:none}"}</style>
      </noscript>
    </div>
  );
}
