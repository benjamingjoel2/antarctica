import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

/** Two offset rows of paired images (reference project images). */
export function ImagePairs({ images }: { images: { src: string; alt: string }[] }) {
  const rows = [images.slice(0, 2), images.slice(2, 4)].filter((r) => r.length);
  return (
    <section className="bg-glacier pb-[6rem]">
      <div className="container-site flex flex-col gap-[1.25rem]">
        {rows.map((row, ri) => (
          <div key={ri} className={ri === 0 ? "grid-site" : "grid-site"}>
            <div className={`col-span-12 grid grid-cols-2 gap-[1.25rem] lg:col-span-9 ${ri === 0 ? "lg:col-start-4" : ""}`}>
              {row.map((im, i) => (
                <Reveal key={im.src + i} delay={i * 0.1} className={i === 1 ? "mt-[3rem]" : ""}>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[1.1rem]">
                    <Image src={im.src} alt={im.alt} fill sizes="(min-width:1024px) 36vw, 46vw" className="object-cover" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
