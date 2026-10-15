import { notFound } from "next/navigation";
import { CardGrid } from "@/components/sections/CardGrid";
import { CreditsGrid } from "@/components/sections/CreditsGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { DetailHero } from "@/components/sections/DetailHero";
import { ParagraphBlock } from "@/components/sections/ParagraphBlock";
import { RouteMap } from "@/components/sections/RouteMap";
import { Pill } from "@/components/ui/Pill";
import { Price } from "@/components/ui/Price";
import { VerifyNote } from "@/components/ui/VerifyNote";
import { routes } from "@/data/routes";
import { durationLabel, expeditionsForRoute, getRoute, getShip } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => routes.map((r) => ({ slug: r.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const r = getRoute((await params).slug);
  if (!r) return {};
  return buildMetadata({ title: r.name, description: r.summary, path: `/routes/${r.slug}`, image: r.image.src });
}

export default async function RoutePage({ params }: { params: Promise<{ slug: string }> }) {
  const r = getRoute((await params).slug);
  if (!r) notFound();
  const voyages = expeditionsForRoute(r.slug);
  const drake = r.fliesDrake ? "Fly over the Drake" : r.crossesDrake ? "Sail the Drake" : "No Drake crossing";
  return (
    <>
      <DetailHero
        label={`Route · from ${r.embarkation}`}
        lines={r.titleLines}
        description={<p>{r.tagline} {r.summary}</p>}
        actions={<Pill href={`/plan-my-expedition?route=${r.slug}`} variant="accent">Plan this route</Pill>}
        media={{ image: r.image }}
        background={voyages[0]?.image ?? r.image}
        waves={[durationLabel(r.durationDays), drake, r.bestMonths.join(" · "), <Price key="p" usd={r.fromPriceUSD} prefix="From" />]}
      />
      <ParagraphBlock lead={r.body.split("\n\n")[0]} side={<>From {r.embarkation}<br />to {r.disembarkation}</>} body={r.body.split("\n\n").slice(1).map((p, i) => <p key={i}>{p}</p>)} />
      <section className="bg-glacier pb-[4rem]">
        <div className="container-site grid-site">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3">
            <RouteMap routeSlug={r.slug} title={r.name} />
            <VerifyNote className="mt-[1rem]">{r.verifyNote}</VerifyNote>
          </div>
        </div>
      </section>
      <CreditsGrid
        columns={[
          { title: "Duration", items: [durationLabel(r.durationDays), `Embark: ${r.embarkation}`, `Disembark: ${r.disembarkation}`] },
          { title: "The Drake", items: [r.crossesDrake ? "Crossed by sea (around two days each way)" : "Not crossed by sea", r.fliesDrake ? "Flight to King George Island" : "No flight segment"] },
          { title: "Wildlife", items: r.wildlife },
          { title: "Best months", items: r.bestMonths },
        ]}
      />
      {voyages.length > 0 && (
        <section className="bg-glacier pb-[8rem] pt-[2rem]">
          <div className="container-site">
            <h2 className="t-split mb-[3rem] text-[clamp(3rem,8vw,6.5rem)]">voyages</h2>
            <CardGrid
              cta="View expedition"
              items={voyages.map((e) => ({
                href: `/expeditions/${e.slug}`,
                title: getShip(e.shipSlug)?.name ?? e.name,
                meta: <Price usd={e.fromPriceUSD} prefix="From" />,
                image: e.image,
                video: e.video,
                body: <span className="block font-display text-[2rem] font-extrabold lowercase leading-[0.92] tracking-[-0.03em] [font-stretch:75%]">{e.name}</span>,
              }))}
            />
          </div>
        </section>
      )}
      <CtaBand href={`/plan-my-expedition?route=${r.slug}`} />
    </>
  );
}
