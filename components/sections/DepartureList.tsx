"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { CursorFollow } from "@/components/ui/CursorFollow";

export type ListRow = { href: string; a: string; b: string; c: string; image: { src: string; alt: string } };

/** Reference "Featuring / With / Friends": tight mono rows; a portrait image trails the cursor. */
export function DepartureList({ heads, rows }: { heads: [string, string, string]; rows: ListRow[] }) {
  const area = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div ref={area}>
      <div className="grid-site t-mono mb-[3.5rem]">
        <span className="col-span-6 md:col-span-4">{heads[0]}</span>
        <span className="hidden md:col-span-4 md:block">{heads[1]}</span>
        <span className="col-span-6 text-right md:col-span-4">{heads[2]}</span>
      </div>
      <ul>
        {rows.map((r, i) => (
          <li key={r.href + i}>
            <Link href={r.href} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} className="grid-site t-mono py-[0.18rem] transition-opacity hover:opacity-100 md:opacity-80">
              <span className="col-span-6 md:col-span-4">{r.a}</span>
              <span className="hidden md:col-span-4 md:block">{r.b}</span>
              <span className="col-span-6 text-right md:col-span-4">{r.c}</span>
            </Link>
          </li>
        ))}
      </ul>
      <CursorFollow area={area} show={hover !== null} offset={{ x: 30, y: -120 }}>
        <div className="relative h-[16.4rem] w-[13.5rem] overflow-hidden rounded-[0.3rem]">
          {hover !== null && <Image src={rows[hover].image.src} alt="" fill sizes="14rem" className="object-cover" />}
        </div>
      </CursorFollow>
    </div>
  );
}
