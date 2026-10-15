import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Price } from "@/components/ui/Price";
import { VerifyNote } from "@/components/ui/VerifyNote";
import { routes } from "@/data/routes";
import { durationLabel } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Antarctic routes compared",
  description: "Compare every way south: duration, Drake Passage crossing or flight, wildlife highlights and the best months for each Antarctic route.",
  path: "/routes",
});

const Yes = ({ on }: { on: boolean }) => (
  <span className={`inline-flex h-[1.6rem] items-center rounded-full px-[0.7rem] text-[0.7rem] font-medium uppercase ${on ? "bg-navy text-glacier" : "bg-snow text-slate ring-1 ring-rule"}`}>{on ? "Yes" : "No"}</span>
);

export default function RoutesPage() {
  return (
    <>
      <PageHero label={`Routes (${String(routes.length).padStart(2, "0")})`} lines={["choose", "your way", "south"]} intro="Seven ways to reach the White Continent. The biggest decision is usually the Drake Passage: sail it, fly it, or go the long way round via South Georgia." />
      <section className="bg-glacier pb-[8rem]">
        <div className="container-site">
          <div className="overflow-x-auto" data-lenis-prevent>
            <table className="w-full min-w-[56rem] border-collapse text-left">
              <caption className="sr-only">Comparison of Antarctic routes</caption>
              <thead>
                <tr className="border-b border-navy">
                  {["Route", "Duration", "Crosses the Drake", "Flies the Drake", "Wildlife highlights", "Best months", "From"].map((h) => (
                    <th key={h} scope="col" className="t-label py-[1rem] pr-[1rem] font-normal text-slate">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {routes.map((r) => (
                  <tr key={r.slug} className="group border-b border-rule align-top transition-colors hover:bg-snow">
                    <th scope="row" className="py-[1.3rem] pr-[1rem]">
                      <Link href={`/routes/${r.slug}`} className="flex items-center gap-[1rem]">
                        <span className="relative h-[3.6rem] w-[3.6rem] shrink-0 overflow-hidden rounded-[0.6rem]">
                          <Image src={r.image.src} alt="" fill sizes="4rem" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        </span>
                        <span className="font-display text-[1.7rem] font-extrabold lowercase leading-[0.9] tracking-[-0.03em] [font-stretch:75%] group-hover:text-iceberg-deep">{r.name}</span>
                      </Link>
                    </th>
                    <td className="py-[1.3rem] pr-[1rem] font-mono text-[0.85rem]">{durationLabel(r.durationDays)}</td>
                    <td className="py-[1.3rem] pr-[1rem]"><Yes on={r.crossesDrake} /></td>
                    <td className="py-[1.3rem] pr-[1rem]"><Yes on={r.fliesDrake} /></td>
                    <td className="py-[1.3rem] pr-[1rem] text-[0.92rem] text-slate">{r.wildlife.slice(0, 4).join(", ")}</td>
                    <td className="py-[1.3rem] pr-[1rem] font-mono text-[0.8rem]">{r.bestMonths.join(" · ")}</td>
                    <td className="py-[1.3rem] font-medium"><Price usd={r.fromPriceUSD} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <VerifyNote className="mt-[2rem]">Durations, months and prices are placeholders — verify with partner operators before launch.</VerifyNote>
        </div>
      </section>
      <CtaBand lines={["not sure", "which way?"]} text="Seasickness, time off work, budget, wildlife wish-list: tell us what matters and we'll recommend the route, honestly." />
    </>
  );
}
