import Image from "next/image";
import type { ReactNode } from "react";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { SplitWords } from "@/components/ui/SplitWords";
import { WaveCards } from "@/components/ui/WaveCards";

/**
 * Reference project hero: light panel, giant centred title in dark caps,
 * a short centred description and actions, a centred media card, then a
 * full-bleed photo that closes with dark wave bars.
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
      <div className="container-site pt-[6.5rem] text-center md:pt-[5rem]">
        <p className="t-mono opacity-60">{label}</p>
        <SplitWords as="h1" onMount delay={0.5} className="t-giant mt-[1.2rem]" lines={lines.map((l) => ({ text: l, className: "justify-center" }))} />
        <div className="t-small mx-auto mt-[1.4rem] max-w-[46rem]">{description}</div>
        {actions && <div className="mt-[1.4rem] flex flex-wrap justify-center gap-[0.3rem]">{actions}</div>}
        <div className="relative z-[2] mx-auto mt-[2rem] aspect-[4/3] w-[80%] max-w-[29rem] overflow-hidden rounded-[0.3rem] md:w-[33%]">
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
