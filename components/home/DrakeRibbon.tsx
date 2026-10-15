"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { SplitWords } from "@/components/ui/SplitWords";
import { Reveal } from "@/components/ui/Reveal";
import { img } from "@/data/images";

const ribbon = [
  { src: img.oceanDusk, alt: "Open Southern Ocean at dusk" },
  { src: img.wave, alt: "A rolling swell in the Drake Passage" },
  { src: img.icebergsReflect, alt: "Icebergs reflected in calm water" },
  { src: img.penguinsSnow, alt: "Chinstrap penguins on snow" },
  { src: img.glacier, alt: "A glacier spilling to the sea" },
  { src: img.fjordReflect, alt: "A still channel walled by peaks" },
  { src: img.humpback, alt: "A humpback whale breaching" },
  { src: img.snowHut, alt: "A small hut in deep snow" },
  { src: img.kingPenguinLight, alt: "A king penguin backlit by low sun" },
];

/** "crossing / the / drake" with a horizontal image ribbon driven by vertical scroll. */
export function DrakeRibbon() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-62%"]);

  return (
    <section aria-labelledby="drake-title" className="overflow-hidden bg-glacier py-[6rem] md:py-[9rem]">
      <div ref={ref} className="container-site">
        <div className="relative">
          <SplitWords
            as="h2"
            className="t-split relative z-10 text-navy"
            lines={[
              { text: "crossing", className: "md:pl-[4%]" },
              { text: "the", className: "justify-center md:pl-[20%]" },
            ]}
          />
          <span id="drake-title" className="sr-only">Crossing the Drake</span>
          <div className="relative my-[1.2rem] md:my-[2rem]">
            <motion.ul className="flex w-max gap-[0.8rem] md:gap-[1rem]" style={{ x }}>
              {ribbon.map((r, i) => (
                <li
                  key={r.src}
                  className={`relative overflow-hidden rounded-[0.9rem] ${i % 3 === 1 ? "h-[11rem] w-[9rem] md:h-[17rem] md:w-[13rem]" : "h-[9rem] w-[13rem] md:h-[14rem] md:w-[20rem]"} ${i % 2 ? "mt-[2rem]" : ""}`}
                >
                  <Image src={r.src} alt={r.alt} fill sizes="(min-width: 768px) 20rem, 13rem" className="object-cover" />
                </li>
              ))}
            </motion.ul>
          </div>
          <SplitWords as="div" className="t-split text-navy" lines={[{ text: "drake", className: "justify-end md:pr-[3%]" }]} />
        </div>

        <div className="mt-[6rem] grid-site gap-y-[2.5rem]">
          <Reveal className="col-span-12 lg:col-span-9">
            <p className="t-h2 indent-space">
              Two days of open ocean stand between South America and the White Continent. Some sail it, some fly over it.
              We&apos;ll help you choose.
            </p>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-5 lg:col-start-8" delay={0.1}>
            <p className="t-small text-slate">
              We don&apos;t own a ship, and that&apos;s the point. Seventh Continent is an independent specialist: we sell voyages
              run by IAATO-member expedition operators, so our only loyalty is to the right fit for you. Ship size, landing
              time, cabin, route, season — we compare them honestly and say which voyage we&apos;d choose in your place.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
