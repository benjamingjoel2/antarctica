import Image from "next/image";
import Link from "next/link";

/** Reference "Discover · More · Projects" strip: mono row then three edge-to-edge images. */
export function MoreStrip({ words, items }: { words: [string, string, string]; items: { href: string; title: string; image: { src: string; alt: string } }[] }) {
  return (
    <section className="bg-ink text-ice">
      <div className="t-mono flex justify-between px-[1.25rem] pb-[1rem]">
        {words.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3">
        {items.slice(0, 3).map((it) => (
          <Link key={it.href} href={it.href} className="group relative block h-[21rem] overflow-hidden" aria-label={it.title}>
            <Image src={it.image.src} alt={it.image.alt} fill sizes="33vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
            <span className="t-mono absolute bottom-[1rem] left-[1rem] bg-ice px-[0.3rem] py-[0.15rem] text-ink opacity-0 transition-opacity group-hover:opacity-100">{it.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
