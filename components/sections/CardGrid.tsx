"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { CursorFollow } from "@/components/ui/CursorFollow";
import { PillTag } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";

export type CardItem = {
  href: string;
  title: string;
  meta: ReactNode;
  image: { src: string; alt: string };
  video?: string;
  body?: ReactNode;
};

function HoverVideo({ src, active }: { src: string; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <video
      ref={(el) => {
        ref.current = el;
        if (!el) return;
        if (active && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) el.play().catch(() => {});
        else el.pause();
      }}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-500", active ? "opacity-100" : "opacity-0")}
    />
  );
}

/**
 * Two-column offset grid of tall image cards (reference projects grid):
 * label pills on the card, a pill pair that follows the cursor, video on hover.
 */
export function CardGrid({ items, cta = "View" }: { items: CardItem[]; cta?: string }) {
  const area = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const current = hover !== null ? items[hover] : null;

  return (
    <div ref={area} className="relative">
      <ul className="grid grid-cols-1 gap-x-[1.25rem] gap-y-[3.5rem] md:grid-cols-2">
        <AnimatePresence initial={false}>
          {items.map((it, i) => (
            <motion.li
              key={it.href}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={cn(i % 2 === 1 && "md:mt-[9rem]")}
            >
              <Link
                href={it.href}
                className="group block"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
              >
                <span className="relative block aspect-[4/5] overflow-hidden rounded-[1.2rem] bg-iceberg-soft">
                  <Image
                    src={it.image.src}
                    alt={it.image.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 92vw"
                    className="object-cover transition-transform duration-1000 ease-[var(--ease-expo)] group-hover:scale-[1.04]"
                  />
                  {it.video && <HoverVideo src={it.video} active={hover === i} />}
                  <span className="absolute left-[1rem] top-[1rem] flex flex-wrap gap-[0.3rem] transition-opacity duration-300 md:group-hover:opacity-0">
                    <PillTag>{it.title}</PillTag>
                    <PillTag>{it.meta}</PillTag>
                  </span>
                </span>
                {it.body && <span className="mt-[1.2rem] block">{it.body}</span>}
                <span className="mt-[1rem] inline-flex items-center gap-[0.5rem] text-[0.8rem] font-medium uppercase">
                  <span className="h-px w-[1.5rem] bg-current transition-all duration-500 group-hover:w-[3rem]" />
                  {cta}
                </span>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <CursorFollow area={area} show={hover !== null}>
        <span className="flex gap-[0.3rem]">
          <PillTag variant="dark">{current?.title ?? ""}</PillTag>
          <PillTag variant="dark">{current?.meta ?? ""}</PillTag>
        </span>
      </CursorFollow>
    </div>
  );
}
