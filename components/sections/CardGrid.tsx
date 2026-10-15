"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { CursorFollow } from "@/components/ui/CursorFollow";
import { PillTag } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";

export type CardItem = { href: string; title: string; meta: ReactNode; image: { src: string; alt: string }; video?: string; body?: ReactNode };

function HoverVideo({ src, active }: { src: string; active: boolean }) {
  return (
    <video
      ref={(el) => {
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
      className={cn("absolute inset-0 z-[2] h-full w-full object-cover transition-opacity duration-500", active ? "opacity-100" : "opacity-0")}
    />
  );
}

/**
 * Reference projects grid: three columns, edge to edge, no gutters, 6.25rem
 * between rows. Hover plays the card's video and shows title/meta boxes; the
 * same pair of boxes follows the cursor.
 */
export function CardGrid({ items, cta = "View" }: { items: CardItem[]; cta?: string }) {
  const area = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const cur = hover !== null ? items[hover] : null;
  return (
    <div ref={area}>
      <ul className="grid grid-cols-1 gap-y-[4rem] sm:grid-cols-2 md:gap-y-[6.25rem] lg:grid-cols-3">
        {items.map((it, i) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="group block"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              aria-label={`${cta}: ${it.title}`}
            >
              <span className="relative block h-[21rem] overflow-hidden">
                <Image src={it.image.src} alt={it.image.alt} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] group-hover:scale-105" />
                {it.video && <HoverVideo src={it.video} active={hover === i} />}
                <span className={cn("absolute inset-0 z-[3] flex items-center justify-center gap-[0.63rem] transition-opacity duration-300", hover === i ? "opacity-100 md:opacity-0" : "opacity-0")}>
                  <PillTag>{it.title}</PillTag>
                  <PillTag>{it.meta}</PillTag>
                </span>
              </span>
              {it.body && <span className="block px-[1.25rem] pt-[1rem]">{it.body}</span>}
              <span className="t-mono mt-[0.9rem] block px-[1.25rem] opacity-70 transition-opacity group-hover:opacity-100">{cta} →</span>
            </Link>
          </li>
        ))}
      </ul>
      <CursorFollow area={area} show={hover !== null}>
        <span className="flex gap-[0.4rem]">
          <PillTag>{cur?.title ?? ""}</PillTag>
          <PillTag>{cur?.meta ?? ""}</PillTag>
        </span>
      </CursorFollow>
    </div>
  );
}
