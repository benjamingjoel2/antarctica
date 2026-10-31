import { CtaBand } from "@/components/sections/CtaBand";
import { DepartureList } from "@/components/sections/DepartureList";
import { ExpeditionsExplorer } from "@/components/sections/ExpeditionsExplorer";
import { PageHero } from "@/components/sections/PageHero";
import { VerifyNote } from "@/components/ui/VerifyNote";
import { expeditions } from "@/data/expeditions";
import { routes } from "@/data/routes";
import { formatDate, getShip } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Antarctica expeditions",
  description: "Hand-picked Antarctic voyages on IAATO-member ships: classic Peninsula, fly the Drake, South Georgia, the Antarctic Circle, emperor penguins and the Ross Sea.",
  path: "/expeditions",
});

export default function ExpeditionsPage() {
  const departures = expeditions.flatMap((e) => e.departures.map((d) => ({ e, d }))).sort((a, b) => a.d.start.localeCompare(b.d.start));
  return (
    <>
      <PageHero
        label={`Expeditions (${String(expeditions.length).padStart(2, "0")})`}
        lines={["choose", "your voyage"]}
        intro="Every voyage below runs with an IAATO-member operator we trust. Filter by route, month, ship or length, then let a specialist tell you which one we'd book in your place."
      />
      <section className="bg-ink pb-[9rem] text-ice">
        <ExpeditionsExplorer expeditions={expeditions} routes={routes} />
        <div className="container-site mt-[4rem]">
          <VerifyNote>Prices from, per person, in a shared or standard cabin. Placeholder — verify with partner operators before launch.</VerifyNote>
        </div>
      </section>
      <section className="bg-ink pb-[10rem] text-ice">
        <div className="container-site">
          <DepartureList
            heads={["Departing", "Aboard", "Date"]}
            rows={departures.map(({ e, d }) => ({ href: `/expeditions/${e.slug}`, a: e.titleLines.join(" "), b: getShip(e.shipSlug)?.name ?? "", c: formatDate(d.start), image: e.image }))}
          />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
