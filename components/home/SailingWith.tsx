import Image from "next/image";
import Link from "next/link";
import type { Ship } from "@/data/types";
import { cn } from "@/lib/cn";

function Cell({ ship, className }: { ship: Ship; className?: string }) {
  return (
    <Link
      href={`/ships/${ship.slug}`}
      className={cn("group relative grid aspect-square place-items-center overflow-hidden rounded-[1rem] bg-snow md:aspect-[5/4]", className)}
    >
      <Image
        src={ship.image.src}
        alt={ship.image.alt}
        fill
        sizes="(min-width: 768px) 25vw, 50vw"
        className="scale-110 object-cover opacity-0 transition duration-700 ease-[var(--ease-expo)] group-hover:scale-100 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      <span className="absolute inset-0 bg-navy/0 transition-colors duration-700 group-hover:bg-navy/35" />
      <span className="relative text-center transition-colors duration-500 group-hover:text-glacier">
        <span className="block font-mono text-[0.62rem] uppercase tracking-[0.2em]">MV</span>
        <span className="block font-display text-[1.6rem] font-extrabold uppercase leading-[0.85] tracking-[-0.02em] [font-stretch:70%] md:text-[2rem]">
          {ship.name.replace(/^MV\s+/, "")}
        </span>
        <span className="mt-[0.4rem] block text-[0.62rem] uppercase tracking-[0.12em] opacity-70">{ship.operator}</span>
      </span>
    </Link>
  );
}

/** Partner logo grid with photo reveal on hover (reference "Supported by"). */
export function SailingWith({ ships }: { ships: Ship[] }) {
  const [a, b, ...rest] = ships;
  return (
    <section aria-labelledby="sailing-with" className="bg-glacier py-[8rem] md:pt-[14rem]">
      <div className="container-site">
        <div className="grid grid-cols-2 gap-[0.6rem] md:grid-cols-4">
          <Cell ship={a} />
          <div className="col-span-2 order-first grid place-items-center py-[2rem] text-center md:order-none md:py-0">
            <div>
              <h2 id="sailing-with" className="t-split text-[clamp(3.4rem,8vw,7rem)]">sailing with</h2>
              <p className="t-label mt-[1rem] text-slate">Independent advisors · IAATO-member operators · placeholder partners</p>
            </div>
          </div>
          <Cell ship={b} />
          {rest.map((s) => (
            <Cell key={s.slug} ship={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
