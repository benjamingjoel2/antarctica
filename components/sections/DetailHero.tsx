import Image from "next/image";
import type { ReactNode } from "react";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { SplitWords } from "@/components/ui/SplitWords";
import { WaveCards } from "@/components/ui/WaveCards";

/**
 * Project hero: light panel, left-aligned title in dark caps, a short
 * description and actions, a media card, then a full-bleed photo that
 * closes with dark wave bars.
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
    <section className="bg-ice text-ink">
      <div className="container-site pt-[7.5rem] md:pt-[7rem]">
        <p className="t-mono opacity-60">{label}</p>
        <SplitWords as="h1" onMount delay={0.5} className="t-giant mt-[1.2rem]" lines={lines} />
        <div className="t-small mt-[1.4rem] max-w-[46rem]">{description}</div>
        {actions && <div className="mt-[1.6rem] flex flex-wrap items-center gap-x-[1.6rem] gap-y-[1rem]">{actions}</div>}
        <div className="relative z-[2] ml-auto mt-[2rem] aspect-[4/3] w-[80%] max-w-[29rem] overflow-hidden rounded-[0.3rem] md:w-[33%]">
          {media.video ? (
            <BackgroundVideo src={media.video} poster={`${media.image.src}&w=900`} label={media.image.alt} />
          ) : (
            <Image src={media.image.src} alt={media.image.alt} fill priority sizes="(min-width:768px) 33vw, 80vw" className="object-cover" />
          )}
        </div>
      </div>
      <div className="relative -mt-[8rem] h-[85vh] min-h-[30rem] overflow-hidden">
        <Image src={background.src} alt={background.alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-x-0 bottom-0">
          <WaveCards items={waves} tone="dark" />
        </div>
      </div>
    </section>
  );
}
