import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SplitWords } from "@/components/ui/SplitWords";

/** Inner-page opener: label, giant split title, short intro. */
export function PageHero({ label, lines, intro, children }: { label: string; lines: string[]; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="bg-glacier pt-[8.5rem] pb-[4rem] md:pt-[11rem] md:pb-[6rem]">
      <div className="container-site">
        <p className="t-label text-slate">{label}</p>
        <SplitWords
          as="h1"
          onMount
          delay={0.5}
          className="t-split mt-[1rem]"
          lines={lines.map((l, i) => ({ text: l, className: i === 1 ? "md:pl-[16%]" : i === 2 ? "md:pl-[32%]" : undefined }))}
        />
        {(intro || children) && (
          <div className="mt-[3rem] grid-site">
            <Reveal className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-6 lg:col-start-7" delay={0.8}>
              {intro && <div className="t-large text-navy">{intro}</div>}
              {children}
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
