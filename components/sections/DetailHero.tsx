import Image from "next/image";
import type { ReactNode } from "react";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { SplitWords } from "@/components/ui/SplitWords";
import { WaveCards } from "@/components/ui/WaveCards";

/**
 * Detail page hero (reference project page): two-line title + description + CTAs,
 * a portrait media card, then a full-bleed image carrying wave cards.
 */
export function DetailHero({
  label,
  lines,
  description,
  actions,
  media,
  background,
  waves,
}: {
  label: string;
  lines: string[];
  description: ReactNode;
  actions?: ReactNode;
  media: { image: { src: string; alt: string }; video?: string };
  background: { src: string; alt: string };
  waves: ReactNode[];
}) {
  return (
    <section className="bg-glacier">
      <div className="container-site pt-[8.5rem] md:pt-[11rem]">
        <div className="grid-site gap-y-[2.5rem]">
          <div className="col-span-12 lg:col-span-8">
            <p className="t-label text-slate">{label}</p>
            <SplitWords as="h1" onMount delay={0.5} className="t-split mt-[1rem]" lines={lines.map((l, i) => ({ text: l, className: i === 1 ? "md:pl-[12%]" : undefined }))} />
            <div className="mt-[2rem] max-w-[34rem] text-[1.05rem] leading-[1.5] text-slate">{description}</div>
            {actions && <div className="mt-[1.8rem] flex flex-wrap gap-[0.5rem]">{actions}</div>}
          </div>
          <div className="col-span-10 col-start-2 sm:col-span-6 sm:col-start-4 lg:col-span-4 lg:col-start-9 lg:pt-[4rem]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.2rem] bg-iceberg-soft">
              {media.video ? (
                <BackgroundVideo src={media.video} poster={`${media.image.src}&w=900`} label={media.image.alt} />
              ) : (
                <Image src={media.image.src} alt={media.image.alt} fill priority sizes="(min-width:1024px) 30vw, 70vw" className="object-cover" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relative mt-[5rem] h-[70vh] min-h-[28rem] overflow-hidden">
        <Image src={background.src} alt={background.alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-navy/15" />
        <div className="container-site absolute inset-x-0 bottom-[2rem]">
          <WaveCards items={waves} tone="light" />
        </div>
      </div>
    </section>
  );
}
