import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

/** Reference project image collage: four frames scattered across the grid at different sizes. */
export function ImagePairs({ images }: { images: { src: string; alt: string }[] }) {
  const slots = [
    "col-span-6 col-start-2 md:col-span-3 md:col-start-2 aspect-[4/3]",
    "col-span-5 col-start-8 mt-[4rem] md:col-span-3 md:col-start-9 md:mt-0 aspect-[4/3]",
    "col-span-7 col-start-1 md:col-span-3 md:col-start-1 md:-mt-[2rem] aspect-[3/4]",
    "col-span-5 col-start-8 mt-[6rem] md:col-span-3 md:col-start-6 md:mt-[6rem] aspect-[3/4]",
  ];
  return (
    <section className="bg-ink pb-[8rem]">
      <div className="container-site grid-site gap-y-[2rem]">
        {images.slice(0, 4).map((im, i) => (
          <Reveal key={im.src + i} className={`relative overflow-hidden rounded-[0.3rem] ${slots[i]}`} delay={i * 0.08}>
            <Image src={im.src} alt={im.alt} fill sizes="(min-width:768px) 25vw, 50vw" className="object-cover" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
