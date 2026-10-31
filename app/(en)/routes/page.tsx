import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Price } from "@/components/ui/Price";
import { VerifyNote } from "@/components/ui/VerifyNote";
import { routes } from "@/data/routes";
import { durationLabel, showMonths } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Antarctic routes compared",
  description: "Compare every way south: duration, Drake Passage crossing or flight, wildlife highlights and the best months for each Antarctic route.",
  path: "/routes",
});

const YesNo = ({ on }: { on: boolean }) => <span className={on ? "bg-ice px-[0.25rem] text-ink" : "opacity-50"}>{on ? "Yes" : "No"}</span>;

export default function RoutesPage() {
  return (
    <>
      <PageHero label={`Routes (${String(routes.length).padStart(2, "0")})`} lines={["choose", "your way south"]} intro="Seven ways to reach the White Continent. The biggest decision is usually the Drake Passage: sail it, fly it, or go the long way round via South Georgia." />
      <section className="bg-ink pb-[9rem] text-ice">
        <div className="container-site">
          <div className="overflow-x-auto" data-lenis-prevent>
            <table className="w-full min-w-[58rem] border-collapse text-left">
              <caption className="sr-only">Comparison of Antarctic routes</caption>
              <thead>
                <tr>
                  {["Route", "Duration", "Crosses the Drake", "Flies the Drake", "Wildlife", "Best months", "From"].map((h) => (
                    <th key={h} scope="col" className="t-mono pb-[2rem] pr-[1rem] font-normal opacity-60">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {routes.map((r) => (
                  <tr key={r.slug} className="group border-t border-ice/15 align-top">
                    <th scope="row" className="py-[1.2rem] pr-[1rem] font-normal">
                      <Link href={`/routes/${r.slug}`} className="flex items-center gap-[1rem]">
                        <span className="relative h-[4rem] w-[3.4rem] shrink-0 overflow-hidden rounded-[0.3rem]">
                          <Image src={r.image.src} alt="" fill sizes="4rem" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        </span>
                        <span className="t-h3 group-hover:opacity-60">{r.name}</span>
                      </Link>
                    </th>
                    <td className="t-mono py-[1.2rem] pr-[1rem]">{durationLabel(r.durationDays)}</td>
                    <td className="t-mono py-[1.2rem] pr-[1rem]"><YesNo on={r.crossesDrake} /></td>
                    <td className="t-mono py-[1.2rem] pr-[1rem]"><YesNo on={r.fliesDrake} /></td>
                    <td className="t-small py-[1.2rem] pr-[1rem] opacity-80">{r.wildlife.slice(0, 4).join(", ")}</td>
                    <td className="t-mono py-[1.2rem] pr-[1rem]">{showMonths(r.bestMonths).join(" ")}</td>
                    <td className="t-mono py-[1.2rem]"><Price usd={r.fromPriceUSD} prefix="From" /></td>
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
