"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { CursorFollow } from "@/components/ui/CursorFollow";

export type ListRow = { href: string; a: string; b: string; c: string; image: { src: string; alt: string } };

/** Three-column list with an image that follows the cursor (reference "Featuring / With / Friends"). */
export function DepartureList({ heads, rows }: { heads: [string, string, string]; rows: ListRow[] }) {
  const area = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div ref={area}>
      <div className="grid grid-cols-12 border-b border-navy pb-[0.8rem]">
        <span className="t-h4 col-span-7 md:col-span-5">{heads[0]}</span>
        <span className="t-h4 hidden md:col-span-4 md:block">{heads[1]}</span>
        <span className="t-h4 col-span-5 text-right md:col-span-3">{heads[2]}</span>
      </div>
      <ul>
        {rows.map((r, i) => (
          <li key={r.href + i} className="border-b border-rule">
            <Link
              href={r.href}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="grid grid-cols-12 items-baseline py-[1.1rem] transition-[padding,color] duration-500 hover:pl-[1rem] hover:text-iceberg-deep"
            >
              <span className="col-span-7 text-[1.05rem] font-medium uppercase md:col-span-5 md:text-[1.25rem]">{r.a}</span>
              <span className="hidden text-[1rem] uppercase text-slate md:col-span-4 md:block">{r.b}</span>
              <span className="col-span-5 text-right font-mono text-[0.85rem] md:col-span-3">{r.c}</span>
            </Link>
          </li>
        ))}
      </ul>
      <CursorFollow area={area} show={hover !== null} offset={{ x: 24, y: -90 }}>
        <div className="relative h-[11rem] w-[9rem] overflow-hidden rounded-[0.8rem]">
          {hover !== null && <Image src={rows[hover].image.src} alt="" fill sizes="10rem" className="object-cover" />}
        </div>
      </CursorFollow>
    </div>
  );
}
