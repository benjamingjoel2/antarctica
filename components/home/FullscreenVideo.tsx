"use client";

import { motion, useTransform } from "framer-motion";
import { useSectionProgress } from "@/lib/useSectionProgress";
import { useRef } from "react";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { SplitWords } from "@/components/ui/SplitWords";
import { WaveCards } from "@/components/ui/WaveCards";

/**
 * Reference "No place like home": 200vh wrapper, pinned full-bleed video,
 * split words left/right, mono place + coordinates, light wave bars at the foot.
 */
export function FullscreenVideo({ facts }: { facts: string[] }) {
  const ref = useRef<HTMLElement>(null);
  const scrollYProgress = useSectionProgress(ref);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section ref={ref} aria-labelledby="bottom-title" className="relative h-[200vh] bg-ink">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale }}>
          <BackgroundVideo
            src="/media/bottom-of-the-world.mp4"
            poster="/media/bottom-of-the-world-poster.jpg"
            captions="/media/bottom-of-the-world.vtt"
            label="A calm polar channel walled by snow peaks"
            controlClassName="!rounded-none bottom-[9.5rem] right-[1.25rem]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-ink/20" />
        <div className="relative px-[1.25rem] pt-[4.5rem] text-white">
          <h2 id="bottom-title" className="sr-only">The bottom of the world</h2>
          <div aria-hidden>
            <SplitWords as="div" className="t-giant" lines={["the"]} />
            <div className="flex justify-between">
              <SplitWords as="div" className="t-giant" lines={["bottom"]} delay={0.08} />
              <SplitWords as="div" className="t-giant" lines={["of the"]} delay={0.16} />
            </div>
            <SplitWords as="div" className="t-giant text-right" lines={[{ text: "world", className: "justify-end" }]} delay={0.24} />
          </div>
          <div className="mt-[1.6rem] flex flex-col justify-between gap-[0.5rem] md:flex-row">
            <p className="t-mono">Arriving on the Antarctic Peninsula</p>
            <p className="t-mono">64° 49′ S, 63° 30′ W</p>
          </div>
          <p className="mt-[1.5rem] max-w-[24rem] t-small opacity-90">The engines hush, the light turns blue, and the first iceberg slides past the window. You made it.</p>
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <WaveCards items={facts} tone="light" />
        </div>
      </div>
    </section>
  );
}
