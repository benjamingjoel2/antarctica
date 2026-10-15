import Link from "next/link";
import { notFound } from "next/navigation";
import { CreditsGrid } from "@/components/sections/CreditsGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { DetailHero } from "@/components/sections/DetailHero";
import { ImagePairs } from "@/components/sections/ImagePairs";
import { Itinerary } from "@/components/sections/Itinerary";
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

  return (
    <>
      <DetailHero
        label={`${route?.name ?? "Expedition"} · ${e.durationDays} days`}
        lines={e.titleLines}
        description={<p>{e.summary}</p>}
        actions={
          <>
            <Pill href={`/plan-my-expedition?route=${e.routeSlug}`} variant="accent">Enquire about this voyage</Pill>
            <Pill href="#itinerary" variant="light" className="ring-1 ring-rule" data-no-transition>Day by day</Pill>
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
            <p className="text-navy">
              From <Price usd={e.fromPriceUSD} className="font-semibold" /> per person.
            </p>
          </>
        }
      />

      <ImagePairs images={e.gallery} />

      <section id="itinerary" className="scroll-mt-[6rem] bg-glacier py-[5rem]">
        <div className="container-site grid-site gap-y-[3rem]">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="t-split mb-[2rem] text-[clamp(3rem,8vw,6.5rem)]">day by day</h2>
            <Itinerary days={e.itinerary} />
            <VerifyNote className="mt-[1rem]">Itineraries are a guide: weather and ice decide the day. {e.verifyNote}</VerifyNote>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-[6rem]">
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
              ship ? <Link key="s" href={`/ships/${ship.slug}`} className="underline underline-offset-4">{ship.name}</Link> : shipSizeLabel[e.shipType],
              ship ? `${ship.passengers} guests · ${ship.operator}` : "",
              ...e.cabins.map((c) => `${cabinLabel[c.type]} — ${c.label}`),
            ].filter(Boolean),
          },
          { title: "Included", items: e.included },
          { title: "Not included", items: e.excluded },
          { title: "Good to know", items: e.goodToKnow },
        ]}
      />

      <section className="bg-glacier pb-[6rem]">
        <div className="container-site grid-site gap-y-[3rem]">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="t-split mb-[1.5rem] text-[clamp(3rem,8vw,6.5rem)]">pricing</h2>
            <PricingTable cabins={e.cabins} note={e.verifyNote} />
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <h2 className="t-h3 mb-[1.2rem] mt-[1rem]">Departures</h2>
            <ul className="border-t border-navy">
              {e.departures.map((d) => (
                <li key={d.start} className="flex items-center justify-between border-b border-rule py-[1rem]">
                  <span className="font-mono text-[0.9rem]">{formatDate(d.start)} → {formatDate(d.end)}</span>
                  <Link href={`/plan-my-expedition?route=${e.routeSlug}`} className="text-[0.75rem] font-medium uppercase underline underline-offset-4 hover:text-iceberg-deep">
                    Enquire
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand lines={["hold", "a cabin"]} href={`/plan-my-expedition?route=${e.routeSlug}`} label="Enquire about this voyage" text="Cabins on small expedition ships go early. Tell us your dates and we'll check live availability with the operator, at no cost to you." />

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
