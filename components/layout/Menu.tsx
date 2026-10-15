"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/config/nav";
import { site, whatsappHref } from "@/config/site";
import { CursorFollow } from "@/components/ui/CursorFollow";
import { Pill, PillTag } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";
import { useUi } from "@/lib/ui";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { useLenis } from "./SmoothScroll";

/**
 * Image-led full-screen menu: one tall photo tile per destination.
 * Hovered tile widens; a pill follows the cursor with the tile's label.
 */
export function Menu() {
  const { menuOpen, setMenuOpen } = useUi();
  const [hovered, setHovered] = useState<number | null>(null);
  const area = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const lenis = useLenis();

  // Close on navigation
  useEffect(() => setMenuOpen(false), [pathname, setMenuOpen]);

  // Scroll lock, Esc to close, focus management
  useEffect(() => {
    if (!menuOpen) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const prev = document.activeElement as HTMLElement | null;
    const t = setTimeout(() => panel.current?.querySelector<HTMLElement>("a")?.focus(), 400);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [menuOpen, lenis, setMenuOpen]);

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          id="site-menu"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-lenis-prevent
          className="fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-glacier"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="container-site flex flex-1 flex-col pt-[6rem] pb-[1.5rem]">
            <nav ref={area} aria-label="Main" className="flex flex-1 flex-col gap-[0.5rem] lg:flex-row lg:gap-[0.6rem]">
              {mainNav.map((item, i) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <motion.div
                    key={item.href}
                    className={cn(
                      "relative min-h-[5.5rem] overflow-hidden rounded-[1rem] transition-[flex-grow] duration-700 ease-[var(--ease-expo)] lg:min-h-0",
                      hovered === i ? "lg:flex-[2.4]" : "lg:flex-1",
                    )}
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    animate={{ clipPath: "inset(0% 0 0 0)" }}
                    transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.25 + i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(i)}
                      className="group absolute inset-0 block outline-offset-[-4px]"
                      aria-current={active ? "page" : undefined}
                    >
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, 100vw"
                        className={cn(
                          "object-cover transition duration-700 ease-[var(--ease-expo)] group-hover:scale-105",
                          hovered !== null && hovered !== i && "lg:grayscale-[60%] lg:brightness-[0.8]",
                        )}
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
                      <span className="absolute bottom-[0.8rem] left-[0.8rem] flex items-center gap-[0.5rem]">
                        <PillTag variant={active ? "accent" : "light"}>{item.label}</PillTag>
                      </span>
                      <span className="absolute right-[0.9rem] top-[0.8rem] font-mono text-[0.7rem] text-white/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <CursorFollow area={area} show={hovered !== null}>
              <PillTag variant="dark">{hovered !== null ? mainNav[hovered].label : "Explore"}</PillTag>
            </CursorFollow>
            <motion.div
              className="mt-[1.2rem] flex flex-wrap items-center justify-between gap-[0.8rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className="t-label text-slate">{site.tagline}</p>
              <div className="flex flex-wrap items-center gap-[0.5rem]">
                <CurrencySwitcher className="lg:hidden" />
                <Pill href={whatsappHref()} variant="light">WhatsApp</Pill>
                <Pill href="/plan-my-expedition" variant="accent">Plan my expedition</Pill>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
