"use client";

import { motion, useAnimationControls } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * Reference "wave" transition: twelve glacier-white bars (two columns × six
 * rows) sweep across on internal navigation, then sweep away on the new page.
 * Reduced motion: disabled.
 */
const ROWS = 6;
const COVER = 0.6;
const STAGGER = 0.05;

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const top = useAnimationControls();
  const bottom = useAnimationControls();
  const busy = useRef(false);
  const first = useRef(true);
  const [off, setOff] = useState(false);

  const run = (to: number) => {
    const t = { duration: COVER, ease: [0.65, 0, 0.35, 1] as const };
    return Promise.all([
      top.start((i: number) => ({ scaleX: to, transition: { ...t, delay: i * 2 * STAGGER } })),
      bottom.start((i: number) => ({ scaleX: to, transition: { ...t, delay: (i * 2 + 1) * STAGGER } })),
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

  const bars = (controls: typeof top) =>
    Array.from({ length: ROWS }, (_, i) => (
      <motion.div key={i} custom={i} animate={controls} initial={{ scaleX: 1 }} style={{ originX: 0 }} className="-my-px h-[calc(100%/6+1px)] w-full bg-ice" />
    ));

  if (off) return null;

  return (
    <div id="page-transition" aria-hidden className="pointer-events-none fixed inset-0 z-[100] flex">
      <div className="flex h-full w-1/2 flex-col">{bars(top)}</div>
      <div className="-ml-px flex h-full w-1/2 flex-col">{bars(bottom)}</div>
      <noscript>
        <style>{"#page-transition{display:none}"}</style>
      </noscript>
    </div>
  );
}
