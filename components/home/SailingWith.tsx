import Image from "next/image";
import Link from "next/link";
import type { Ship } from "@/data/types";

/** Reference "Supported by": square photo cells; hover lifts the photo to reveal the wordmark. */
function Cell({ ship }: { ship: Ship }) {
  return (
    <Link href={`/ships/${ship.slug}`} className="group relative grid aspect-square place-items-center overflow-hidden rounded-[0.3rem] bg-ice ring-1 ring-ink/10">
      <span className="relative z-[1] text-center text-ink">
        <span className="t-mono block opacity-60">MV</span>
        <span className="block font-display text-[2.4rem] uppercase leading-[0.85] tracking-[-0.03em] [font-stretch:82%]">{ship.name.replace(/^MV\s+/, "")}</span>
        <span className="t-mono mt-[0.5rem] block text-[0.9rem] opacity-60">{ship.operator}</span>
      </span>
      <Image
        src={ship.image.src}
        alt={ship.image.alt}
        fill
        sizes="(min-width:768px) 30vw, 50vw"
        className="z-[2] object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:opacity-0 group-focus-visible:opacity-0"
      />
    </Link>
  );
}

export function SailingWith({ ships }: { ships: Ship[] }) {
  const [a, b, ...rest] = ships;
  return (
    <section aria-labelledby="sailing-with" className="bg-ice pb-[1.3rem] pt-[12rem] text-ink">
      <div className="container-site">
        <div className="grid grid-cols-2 gap-[1.3rem] md:grid-cols-3">
          <Cell ship={a} />
          <div className="order-first col-span-2 grid place-items-center py-[3rem] md:order-none md:col-span-1 md:py-0">
            <div className="text-center">
              <h2 id="sailing-with" className="t-h3">Sailing with</h2>
              <p className="t-mono mt-[0.8rem] opacity-60">IAATO-member operators · placeholders</p>
            </div>
          </div>
          <Cell ship={b} />
          {rest.slice(0, 3).map((s) => (
            <Cell key={s.slug} ship={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
