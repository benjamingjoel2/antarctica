import Link from "next/link";
import { notFound } from "next/navigation";
import { CreditsGrid } from "@/components/sections/CreditsGrid";
import { DetailHero } from "@/components/sections/DetailHero";
import { ImagePairs } from "@/components/sections/ImagePairs";
import { Itinerary } from "@/components/sections/Itinerary";
import { MoreStrip } from "@/components/sections/MoreStrip";
import { ParagraphBlock } from "@/components/sections/ParagraphBlock";
import { PricingTable } from "@/components/sections/PricingTable";
import { RouteMap } from "@/components/sections/RouteMap";
import { Pill } from "@/components/ui/Pill";
import { Price } from "@/components/ui/Price";
import { VerifyNote } from "@/components/ui/VerifyNote";
import { expeditions } from "@/data/expeditions";
import { cabinLabel, formatDate, getExpedition, getRoute, getShip, shipSizeLabel } from "@/lib/data";
import { buildMetadata, JsonLd } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => expeditions.map((e) => ({ slug: e.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const e = getExpedition((await params).slug);
  if (!e) return {};
  return buildMetadata({ title: e.name, description: e.summary, path: `/expeditions/${e.slug}`, image: e.image.src });
}

export default async function ExpeditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const e = getExpedition((await params).slug);
  if (!e) notFound();
  const route = getRoute(e.routeSlug);
  const ship = getShip(e.shipSlug);
  const more = expeditions.filter((x) => x.slug !== e.slug).slice(0, 3);

  return (
    <>
      <DetailHero
        label={`${route?.name ?? "Expedition"} · ${e.durationDays} days`}
        lines={e.titleLines}
        description={<p>{e.summary}</p>}
        actions={
          <>
            <Pill href={`/plan-my-expedition?route=${e.routeSlug}`} variant="accent">Enquire</Pill>
            <Pill href="#itinerary" variant="dark" data-no-transition>Day by day</Pill>
          </>
        }
        media={{ image: e.gallery[0] ?? e.image, video: e.video }}
        background={e.image}
        waves={[`${e.durationDays} days`, ship ? ship.name : shipSizeLabel[e.shipType], e.seasonWindow, <Price key="p" usd={e.fromPriceUSD} prefix="From" />]}
      />

      <ParagraphBlock
        lead={e.overview.split("\n\n")[0]}
        side={<>Season<br />{e.seasonWindow}</>}
        body={
          <>
            {e.overview.split("\n\n").slice(1).map((p, i) => <p key={i}>{p}</p>)}
            <p>From <Price usd={e.fromPriceUSD} /> per person.</p>
          </>
        }
      />

      <ImagePairs images={e.gallery} />

      <section id="itinerary" className="scroll-mt-[5rem] bg-ink py-[6rem] text-ice">
        <div className="container-site grid-site gap-y-[3rem]">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="t-mono mb-[2rem] opacity-60">Day by day</h2>
            <Itinerary days={e.itinerary} />
            <VerifyNote className="mt-[1rem]">Itineraries are a guide: weather and ice decide the day. {e.verifyNote}</VerifyNote>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-[5rem]">
              <RouteMap routeSlug={e.routeSlug} title={route?.name ?? e.name} />
            </div>
          </div>
        </div>
      </section>

      <CreditsGrid
        columns={[
          {
            title: "Ship & cabins",
            items: [
              ship ? <Link key="s" href={`/ships/${ship.slug}`} className="underline underline-offset-2">{ship.name}</Link> : shipSizeLabel[e.shipType],
              ship ? `${ship.passengers} guests` : "",
              ...e.cabins.map((c) => `${cabinLabel[c.type]} — ${c.label}`),
            ].filter(Boolean),
          },
          { title: "Included", items: e.included },
          { title: "Not included", items: e.excluded },
          { title: "Good to know", items: e.goodToKnow },
        ]}
      />

      <section className="bg-ink pb-[8rem] text-ice">
        <div className="container-site grid-site gap-y-[3rem]">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="t-mono mb-[1.5rem] opacity-60">Pricing</h2>
            <PricingTable cabins={e.cabins} note={e.verifyNote} />
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <h2 className="t-mono mb-[1.5rem] opacity-60">Departures</h2>
            <ul className="border-t border-ice/30">
              {e.departures.map((d) => (
                <li key={d.start} className="flex items-center justify-between border-b border-ice/15 py-[0.9rem]">
                  <span className="t-mono">{formatDate(d.start)} → {formatDate(d.end)}</span>
                  <Pill href={`/plan-my-expedition?route=${e.routeSlug}`} size="sm">Enquire</Pill>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <MoreStrip words={["Discover", "More", "Expeditions"]} items={more.map((x) => ({ href: `/expeditions/${x.slug}`, title: x.titleLines.join(" "), image: x.image }))} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: e.name,
          description: e.summary,
          touristType: "Expedition cruise",
          offers: { "@type": "Offer", price: e.fromPriceUSD, priceCurrency: "USD", availability: "https://schema.org/InStock" },
        }}
      />
    </>
  );
}
