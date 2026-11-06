import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SplitWords } from "@/components/ui/SplitWords";

/** Inner-page opener: display caps and a short intro, left-aligned. */
export function PageHero({ label, lines, intro, children, tone = "dark" }: { label: string; lines: string[]; intro?: ReactNode; children?: ReactNode; tone?: "dark" | "light" }) {
  return (
    <section className={tone === "dark" ? "bg-ink text-ice" : "bg-ice text-ink"}>
      <div className="container-site pb-[5rem] pt-[7.5rem] md:pt-[7rem]">
        <p className="t-mono opacity-60">{label}</p>
        <SplitWords as="h1" onMount delay={0.5} className="t-giant mt-[1.2rem]" lines={lines} />
        {(intro || children) && (
          <Reveal className="mt-[1.8rem] max-w-[46rem]" delay={0.7}>
            {intro && <div className="t-small max-w-[40rem] opacity-80">{intro}</div>}
            {children}
          </Reveal>
        )}
      </div>
    </section>
  );
}
