"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BackgroundVideo } from "@/components/ui/BackgroundVideo";
import { SplitWords } from "@/components/ui/SplitWords";
import { WaveCards } from "@/components/ui/WaveCards";

/** Full-screen video with coordinates (reference "No place like home"). */
export function FullscreenVideo({ facts }: { facts: string[] }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} aria-labelledby="bottom-title" className="relative">
      <div className="relative h-[100svh] overflow-hidden bg-navy">
        <motion.div className="absolute inset-0" style={{ scale, y }}>
          <BackgroundVideo
            src="/media/bottom-of-the-world.mp4"
            poster="/media/bottom-of-the-world-poster.jpg"
            captions="/media/bottom-of-the-world.vtt"
            label="A calm polar channel walled by snow peaks"
            controlClassName="top-[1.2rem] bottom-auto right-[1.2rem] mt-[4.5rem]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-navy/35" />
        <div className="absolute inset-x-0 top-[16%] md:top-[14%]">
          <div className="container-site text-glacier">
            <SplitWords
              as="h2"
              className="t-split"
              lines={[
                { text: "the" },
                { text: "bottom of", className: "md:pl-[18%]" },
                { text: "the world", className: "justify-end" },
              ]}
            />
            <span id="bottom-title" className="sr-only">The bottom of the world</span>
            <div className="mt-[2rem] flex flex-col gap-[0.3rem] md:ml-[18%]">
              <p className="t-label">Arriving on the Antarctic Peninsula</p>
              <p className="font-mono text-[0.95rem]">64° 49′ S, 63° 30′ W</p>
              <p className="mt-[0.6rem] max-w-[24rem] text-[0.95rem] leading-[1.4] text-glacier/80">
                The engines hush, the light turns blue, and the first iceberg slides past the window. You made it.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-site relative -mt-[5rem] md:-mt-[7rem]">
        <WaveCards items={facts} tone="light" />
      </div>
    </section>
  );
}
