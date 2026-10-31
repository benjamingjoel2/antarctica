"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/config/nav";
import { site } from "@/config/site";
import { CursorFollow } from "@/components/ui/CursorFollow";
import { Pill, PillTag } from "@/components/ui/Pill";
import { useUi } from "@/lib/ui";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLenis } from "./SmoothScroll";

/**
 * Image-led menu (reference): a light band drops from the top holding a row of
 * photo tiles that pans with the pointer; a box label follows the cursor; the
 * page below is dimmed. Tiles scroll natively on touch and follow keyboard focus.
 */
export function Menu() {
  const { menuOpen, setMenuOpen } = useUi();
  const [hovered, setHovered] = useState<number | null>(null);
  const band = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const lenis = useLenis();
  const x = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 120, damping: 24 });

  useEffect(() => setMenuOpen(false), [pathname, setMenuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    lenis?.stop();
    const prev = document.activeElement as HTMLElement | null;
    const t = setTimeout(() => row.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true }), 500);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      lenis?.start();
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [menuOpen, lenis, setMenuOpen]);

  const pan = (clientX: number) => {
    const el = row.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const max = el.scrollWidth - window.innerWidth;
    if (max > 0) x.set(-(clientX / window.innerWidth) * max);
  };
  const focusTile = (i: number) => {
    const el = row.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const max = el.scrollWidth - window.innerWidth;
    x.set(-(i / (mainNav.length - 1)) * Math.max(0, max));
  };

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div id="site-menu" role="dialog" aria-modal="true" aria-label="Site menu" className="fixed inset-0 z-[55]" initial={{ opacity: 1 }} exit={{ opacity: 1 }}>
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 cursor-default bg-ink/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            ref={band}
            onMouseMove={(e) => pan(e.clientX)}
            className="relative overflow-hidden bg-ice pb-[1.25rem] pt-[4rem] text-ink"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          >
            <motion.nav aria-label="Main" style={{ x: sx }} className="max-md:overflow-x-auto">
              <div ref={row} className="flex w-max snap-x snap-mandatory">
                {mainNav.map((item, i) => {
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <motion.div
                      key={item.href}
                      className="relative h-[16.6rem] w-[72vw] shrink-0 snap-start overflow-hidden sm:w-[42vw] md:w-[24vw]"
                      initial={{ clipPath: "inset(0 0 100% 0)" }}
                      animate={{ clipPath: "inset(0 0 0% 0)" }}
                      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.2 + i * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                        onFocus={() => (setHovered(i), focusTile(i))}
                        aria-current={active ? "page" : undefined}
                        className="group absolute inset-0 block outline-offset-[-3px]"
                      >
                        <Image src={item.image} alt={item.alt} fill sizes="(min-width:768px) 24vw, 72vw" className="object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-105" />
                        <span className="absolute bottom-[0.6rem] left-[0.6rem] md:hidden">
                          <PillTag variant={active ? "accent" : "light"}>{item.label}</PillTag>
                        </span>
                        <span className="sr-only md:not-sr-only md:absolute md:left-[0.6rem] md:top-[0.6rem] md:bg-ink md:px-[0.3rem] md:py-[0.15rem] md:font-mono md:text-[1rem] md:uppercase md:text-ice">
                          {String(i + 1).padStart(2, "0")} {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.nav>
            <div className="container-site mt-[1.25rem] flex flex-wrap items-center justify-between gap-[0.6rem]">
              <p className="t-mono opacity-60">{site.tagline}</p>
              <div className="flex flex-wrap items-center gap-[0.3rem]">
                <LanguageSwitcher tone="dark" />
                <CurrencySwitcher tone="dark" className="lg:hidden" />
                <Pill href="/plan-my-expedition" variant="accent">Plan my expedition</Pill>
              </div>
            </div>
            <CursorFollow area={band} show={hovered !== null} offset={{ x: 18, y: 18 }}>
              <PillTag variant="dark">{hovered !== null ? mainNav[hovered].label : ""}</PillTag>
            </CursorFollow>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
