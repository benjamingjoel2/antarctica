import Image from "next/image";
import { Pill } from "@/components/ui/Pill";

/**
 * Offset-card hero: left-aligned headline, one line and one button on the polar-navy
 * field, beside a portrait photo card offset over an iceberg-blue block.
 * Server-rendered: no scroll JS.
 */
export function HeroCard() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-ink text-ice">
      <div className="container-site grid-site items-center gap-y-[3.5rem] pb-[5rem] pt-[7.5rem] lg:min-h-[100svh] lg:pb-[6rem] lg:pt-[8rem]">
        <div className="col-span-12 lg:col-span-6">
          <p className="t-mono opacity-60">Independent Antarctica specialists</p>
          <h1 id="hero-title" className="mt-[1.2rem] max-w-[15ch] font-display text-[clamp(2.4rem,5vw,4.5rem)] font-normal leading-[1.02] tracking-[-0.02em]">
            The edge of the world is closer than you think.
          </h1>
          <p className="t-small mt-[1.6rem] max-w-[34rem] opacity-80">
            Independent Antarctica specialists. We match every traveller with the right ship, route and season, then one polar specialist
            plans every detail.
          </p>
          <div className="mt-[2rem] flex flex-wrap items-center gap-x-[1.6rem] gap-y-[1rem]">
            <Pill href="/plan-my-expedition" variant="accent">Plan my expedition</Pill>
            <Pill href="/expeditions">Expeditions</Pill>
          </div>
        </div>

        <div className="relative col-span-12 lg:col-span-5 lg:col-start-8">
          <div aria-hidden className="absolute -bottom-[8%] left-[30%] right-0 top-[14%] bg-berg" />
          <div className="relative aspect-[4/5] w-[74%] max-w-[27rem] overflow-hidden rounded-[0.3rem] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.7)]">
            <Image
              src="/media/hero-background.webp"
              alt="Snow slopes and peaks under a winter sky"
              fill
              priority
              sizes="(min-width:1024px) 27rem, 74vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
