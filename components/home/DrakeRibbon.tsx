"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SplitWords } from "@/components/ui/SplitWords";
import { img } from "@/data/images";

const ribbon = [
  { src: img.oceanDusk, alt: "The Southern Ocean at dusk" },
  { src: img.wave, alt: "A rolling swell in the Drake Passage" },
  { src: img.shipDark, alt: "An expedition-style ship at sea" },
  { src: img.penguinsSnow, alt: "Chinstrap penguins on snow" },
  { src: img.icebergsReflect, alt: "Icebergs reflected in still water" },
  { src: img.fjordReflect, alt: "A still channel walled by peaks" },
  { src: img.humpback, alt: "A humpback whale breaching" },
  { src: img.tent, alt: "A tent pitched for a night on the ice" },
  { src: img.kingPenguinLight, alt: "A king penguin backlit by low sun" },
];

/**
 * Reference "Raised / by the / waves": a pinned giant headline with a single
 * portrait frame in the middle that flips through nine images as you scroll,
 * followed by the big indented paragraph and a smaller offset one.
 */
export function DrakeRibbon() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setIdx(Math.min(ribbon.length - 1, Math.max(0, Math.floor(v * ribbon.length)))));
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1.04]);

  return (
    <section aria-labelledby="drake-title" className="bg-ink text-ice">
      <div ref={ref} className="relative h-[260vh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div className="container-site relative">
            <h2 id="drake-title" className="sr-only">Crossing the Drake Passage</h2>
            <div aria-hidden className="relative">
              <SplitWords as="div" className="t-giant relative z-[1]" lines={[{ text: "crossing", className: "pl-[6%]" }]} />
              <div className="relative z-[1] flex justify-between">
                <SplitWords as="div" className="t-giant" lines={["the"]} delay={0.08} />
                <SplitWords as="div" className="t-giant" lines={["drake"]} delay={0.16} />
              </div>
              <SplitWords as="div" className="t-giant relative z-[4] text-right" lines={[{ text: "passage", className: "justify-end pr-[2%]" }]} delay={0.24} />

              {/* Image flip-stack centred through the words */}
              <motion.div style={{ scale }} className="absolute left-1/2 top-1/2 z-[3] h-[22rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[0.3rem] md:h-[42rem] md:w-[28.3rem]">
                {ribbon.map((r, i) => (
                  <Image key={r.src} src={r.src} alt={r.alt} fill sizes="(min-width:768px) 28rem, 15rem" className={`object-cover transition-opacity duration-300 ${i === idx ? "opacity-100" : "opacity-0"}`} />
                ))}
                <span className="t-mono absolute bottom-[0.6rem] left-[0.6rem] bg-ink px-[0.3rem] py-[0.15rem] text-ice">
                  {String(idx + 1).padStart(2, "0")} / {String(ribbon.length).padStart(2, "0")}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-site pb-[10rem] pt-[4rem]">
        <div className="grid-site gap-y-[3rem]">
          <Reveal className="col-span-12 lg:col-span-9">
            <p className="t-h2 indent-space">
              Two days of open ocean stand between South America and the White Continent. Some sail it, some fly over it. All of
              them arrive changed. We&apos;ll help you choose your way across.
            </p>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-9 md:col-start-4" delay={0.1}>
            <p className="t-small max-w-[44rem] opacity-80">
              We don&apos;t own a ship, and that&apos;s the point. Seventh Continent is an independent specialist. We sell
              voyages run by IAATO-member expedition operators, so our only loyalty is to the right fit for you: ship size,
              landing time, cabin, route and season, compared honestly, with one polar specialist who tells you which voyage
              they&apos;d choose in your place.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
