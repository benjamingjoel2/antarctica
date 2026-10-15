"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { SplitWords } from "@/components/ui/SplitWords";
import { WaveCards } from "@/components/ui/WaveCards";
import { facts } from "@/data/facts";
import { img } from "@/data/images";

const quick = [
  { label: "Expeditions", href: "/expeditions" },
  { label: "Routes", href: "/routes" },
  { label: "Ships", href: "/ships" },
  { label: "Protect", href: "/protect" },
  { label: "Contact", href: "/contact" },
];

/**
 * Layered parallax hero. Back to front:
 * video sky → far peaks → clouds → split headline → sea + foreground icebergs.
 * The foreground rises faster than the words so the headline sinks "behind" the ice.
 * The about band then slides up over the pinned hero.
 */
export function HeroParallax() {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: wrap, offset: ["start start", "end end"] });

  const videoScale = useTransform(p, [0, 0.6], [1, 1.18]);
  const peaksY = useTransform(p, [0, 0.6], ["0%", "-6%"]);
  const cloudLX = useTransform(p, [0, 0.5], ["0%", "-45%"]);
  const cloudRX = useTransform(p, [0, 0.5], ["0%", "45%"]);
  const cloudO = useTransform(p, [0, 0.45], [1, 0]);
  const titleY = useTransform(p, [0, 0.6], ["0%", "28%"]);
  const bergY = useTransform(p, [0, 0.6], ["0%", "-22%"]);
  const bergScale = useTransform(p, [0, 0.6], [1, 1.12]);
  const seaY = useTransform(p, [0, 0.6], ["0%", "-30%"]);
  const dim = useTransform(p, [0.25, 0.6], [0, 0.55]);

  return (
    <div ref={wrap} className="relative">
      {/* Pinned scene */}
      <section aria-label="Introduction" className="sticky top-0 h-[100svh] overflow-hidden bg-navy">
        <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
          <BackgroundVideo
            src="/media/hero-icebergs.mp4"
            poster="/media/hero-icebergs-poster.jpg"
            captions="/media/hero-icebergs.vtt"
            label="Icebergs drifting in still water off the Antarctic Peninsula"
            showControl={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/65 via-navy/25 to-navy/10" />
        </motion.div>

        <motion.img
          src="/media/layer-peaks.svg"
          alt=""
          aria-hidden
          className="absolute inset-x-0 bottom-[22%] h-[38%] w-full object-cover opacity-35"
          style={{ y: peaksY }}
        />

        <motion.img
          src="/media/cloud-left.svg"
          alt=""
          aria-hidden
          className="absolute -left-[12%] top-[14%] w-[70%] max-w-none md:w-[48%]"
          style={{ x: cloudLX, opacity: cloudO }}
        />
        <motion.img
          src="/media/cloud-right.svg"
          alt=""
          aria-hidden
          className="absolute -right-[14%] top-[32%] w-[75%] max-w-none md:w-[50%]"
          style={{ x: cloudRX, opacity: cloudO }}
        />

        {/* Headline sits between the far and near layers */}
        <motion.div className="absolute inset-x-0 top-[16%] md:top-[9%]" style={{ y: titleY }}>
          <div className="container-site">
            <SplitWords
              as="h1"
              onMount
              delay={0.6}
              className="t-hero text-glacier [text-shadow:0_0.03em_0.25em_rgba(11,27,46,0.3)]"
              lines={[
                { text: "the", className: "md:pl-[8%]" },
                { text: "edge of the", className: "justify-center" },
                { text: "world", className: "justify-end md:pr-[6%]" },
              ]}
            />
            <span className="sr-only"> — the edge of the world is closer than you think.</span>
          </div>
        </motion.div>

        {/* Near layers */}
        <motion.div className="absolute inset-x-0 -bottom-[2%] h-[46%]" style={{ y: bergY, scale: bergScale, originY: 1 }}>
          <img src="/media/layer-iceberg.svg" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover object-bottom" />
        </motion.div>
        <motion.div className="absolute inset-x-0 -bottom-[30%] h-[36%]" style={{ y: seaY }}>
          <img src="/media/layer-sea.svg" alt="" aria-hidden className="h-full w-full" />
        </motion.div>

        <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-navy" style={{ opacity: dim }} />

        {/* Quick links + video thumb (reference hero nav row) */}
        <div className="absolute inset-x-0 bottom-[1.4rem] z-10">
          <div className="container-site flex items-end justify-between gap-[1rem] text-glacier">
            <nav aria-label="Quick links" className="flex flex-wrap gap-x-[1.5rem] gap-y-[0.4rem]">
              {quick.map((q) => (
                <Link key={q.href} href={q.href} className="text-[0.8rem] font-medium uppercase tracking-[0.02em] underline-offset-4 hover:underline">
                  {q.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/expeditions"
              className="group relative hidden aspect-[4/5] w-[6.5rem] overflow-hidden rounded-[0.8rem] md:block"
              aria-label="Watch: penguins on the ice — view expeditions"
            >
              <BackgroundVideo
                src="/media/expedition-loop.mp4"
                poster="/media/expedition-loop-poster.jpg"
                captions="/media/expedition-loop.vtt"
                label="Penguins on snow"
                showControl={false}
                className="transition-transform duration-700 group-hover:scale-110"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Spacer so the scene holds before the about band arrives */}
      <div aria-hidden className="h-[45vh]" />

      {/* About band rises over the pinned hero */}
      <section aria-labelledby="about-band" className="relative z-10 -mt-[1px] rounded-t-[1.6rem] bg-glacier pb-[8rem] pt-[6rem] md:rounded-t-[2.4rem] md:pt-[9rem]">
        <div className="container-site">
          <div className="mx-auto max-w-[62rem]">
            <h2 id="about-band" className="t-h2 md:text-[3.15rem]">
              <span className="relative mr-[0.4em] inline-block h-[0.95em] w-[1.8em] translate-y-[0.12em] overflow-hidden rounded-full align-baseline">
                <Image src={img.gentooRock} alt="Gentoo penguin" fill sizes="10rem" className="object-cover" />
              </span>
              We match every traveller with the right ship, route and season. Then one polar specialist looks after every
              detail, from your first message to the moment you step back onto dry land.
            </h2>
          </div>
        </div>
        <div className="container-site mt-[5rem]">
          <WaveCards items={facts.slice(0, 4).map((f) => f.text)} tone="dark" />
        </div>
      </section>
    </div>
  );
}
