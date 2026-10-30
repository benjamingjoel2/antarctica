"use client";

import { motion, useTransform } from "framer-motion";
import { useSectionProgress } from "@/lib/useSectionProgress";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { SplitWords } from "@/components/ui/SplitWords";
import { WaveCards } from "@/components/ui/WaveCards";
import { HeroLayer } from "./HeroLayer";
import { facts } from "@/data/facts";
import { img } from "@/data/images";

const quick = [
  { label: "Expeditions", href: "/expeditions" },
  { label: "Timeline", href: "/timeline" },
  { label: "Protect", href: "/protect" },
  { label: "Ships", href: "/ships" },
  { label: "Contact", href: "/contact" },
];

/**
 * Reference hero: a 300vh wrapper with a pinned, layered scene —
 * background photo → clouds → giant headline → transparent foreground cut-out.
 * The foreground scales up over the words, clouds part, and the about text
 * rises over a darkening image before stepped "wave" bars close into the next section.
 */
export function HeroParallax() {
  const wrap = useRef<HTMLDivElement>(null);
  const p = useSectionProgress(wrap);

  const bgScale = useTransform(p, [0, 1], [1, 1.25]);
  const fgScale = useTransform(p, [0, 1], [1, 1.55]);
  const fgY = useTransform(p, [0, 1], ["0%", "-6%"]);
  const titleY = useTransform(p, [0, 0.5], ["0%", "35%"]);
  const titleO = useTransform(p, [0.28, 0.42], [1, 0]);
  const cloudLX = useTransform(p, [0, 0.6], ["0%", "-55%"]);
  const cloudRX = useTransform(p, [0, 0.6], ["0%", "55%"]);
  const navO = useTransform(p, [0, 0.15], [1, 0]);
  // Fully black before the about text arrives (reference about mask)
  const mask = useTransform(p, [0.26, 0.4], [0, 1]);
  const aboutO = useTransform(p, [0.4, 0.52], [0, 1]);
  const aboutY = useTransform(p, [0.38, 0.75], ["30%", "-20%"]);

  return (
    <div ref={wrap} className="relative h-[300vh]">
      <section aria-label="Introduction" className="sticky top-0 h-[100svh] overflow-hidden bg-ink">
        {/* Sky fill: a blurred copy extends the sky above the lowered photo */}
        <div aria-hidden className="absolute inset-0 scale-125 blur-2xl">
          <HeroLayer name="hero-background" className="object-cover object-top" />
        </div>
        <motion.div className="absolute inset-x-0 bottom-0 top-[16%] origin-bottom [mask-image:linear-gradient(to_bottom,transparent,black_22%)]" style={{ scale: bgScale }}>
          <HeroLayer name="hero-background" priority className="object-cover object-bottom" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/10 to-transparent" />

        <motion.img src="/media/cloud-left.svg" alt="" aria-hidden className="absolute -left-[18%] top-[18%] w-[80%] max-w-none opacity-90" style={{ x: cloudLX }} />
        <motion.img src="/media/cloud-right.svg" alt="" aria-hidden className="absolute -right-[20%] top-[34%] w-[85%] max-w-none opacity-80" style={{ x: cloudRX }} />

        {/* Headline sits between background and foreground */}
        <motion.div className="absolute inset-x-0 top-0 pt-[3.6rem] md:pt-[1.35rem]" style={{ y: titleY, opacity: titleO }}>
          <SplitWords as="h1" onMount delay={0.5} className="t-giant text-center text-white" lines={[{ text: "the edge", className: "justify-center" }, { text: "of the world", className: "justify-center" }]} />
          <span className="sr-only"> — the edge of the world is closer than you think.</span>
        </motion.div>

        <motion.div className="absolute inset-x-0 bottom-0 top-[16%] origin-bottom" style={{ scale: fgScale, y: fgY }}>
          <HeroLayer name="hero-foreground" priority className="object-cover object-bottom" />
        </motion.div>

        {/* Mono quick links + small video embed (reference hero nav row) */}
        <motion.div className="absolute inset-x-0 top-[42%] md:top-[46%]" style={{ opacity: navO }}>
          <div className="flex items-start justify-between px-[1.25rem] text-white md:px-[5.2rem]">
            <nav aria-label="Quick links" className="flex w-full flex-wrap justify-between gap-[0.6rem]">
              {quick.map((q) => (
                <Link key={q.href} href={q.href} className="t-mono bg-ink px-[0.3rem] py-[0.15rem] text-ice transition-colors hover:bg-ice hover:text-ink">{q.label}</Link>
              ))}
            </nav>
          </div>
          <Link href="/expeditions" aria-label="Watch: penguins on snow — view expeditions" className="absolute right-[1.25rem] top-[3rem] hidden h-[7.6rem] w-[6.2rem] overflow-hidden rounded-[0.3rem] md:right-[5.2rem] md:block">
            <BackgroundVideo src="/media/expedition-loop.mp4" poster="/media/expedition-loop-poster.jpg" captions="/media/expedition-loop.vtt" label="Penguins on snow" showControl={false} />
          </Link>
        </motion.div>

        {/* Everything above sits beneath this cover; only the about text rides on top */}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-10 bg-ink" style={{ opacity: mask }} />

        {/* About: rises over the darkening scene */}
        <motion.div className="absolute inset-x-0 top-1/2 z-20 -translate-y-1/2" style={{ opacity: aboutO, y: aboutY }}>
          <div className="container-site grid-site">
            <div className="relative col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3">
              <span className="absolute -top-[4.9rem] left-0 h-[4.6rem] w-[4.2rem] overflow-hidden rounded-[0.3rem] md:h-[7.6rem] md:w-[7rem] md:-top-[8.4rem]">
                <Image src={img.gentooRock} alt="Gentoo penguin" fill sizes="7rem" className="object-cover" />
              </span>
              <h2 className="t-h2 text-white">
                <span className="inline-block w-[4.6rem] md:w-[7.6rem]" />
                Independent Antarctica specialists. We match every traveller with the right ship, route and season, then one polar
                specialist plans every detail.
              </h2>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stepped dark bars carrying Antarctica facts close the scene */}
      <div className="absolute inset-x-0 bottom-0 z-30">
        <WaveCards items={facts.slice(0, 4).map((f) => f.text)} tone="dark" />
      </div>
    </div>
  );
}
