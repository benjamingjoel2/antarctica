import { notFound } from "next/navigation";
import { CardGrid } from "@/components/sections/CardGrid";
import { CreditsGrid } from "@/components/sections/CreditsGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { DetailHero } from "@/components/sections/DetailHero";
import { ImagePairs } from "@/components/sections/ImagePairs";
import { ParagraphBlock } from "@/components/sections/ParagraphBlock";
import { Pill } from "@/components/ui/Pill";
import { Price } from "@/components/ui/Price";
import { VerifyNote } from "@/components/ui/VerifyNote";
import { ships } from "@/data/ships";
import { cabinLabel, expeditionsForShip, getRoute, getShip, shipSizeLabel } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => ships.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const s = getShip((await params).slug);
  if (!s) return {};
  return buildMetadata({ title: s.name, description: s.blurb, path: `/ships/${s.slug}`, image: s.image.src });
}

export default async function ShipPage({ params }: { params: Promise<{ slug: string }> }) {
  const s = getShip((await params).slug);
  if (!s) notFound();
  const voyages = expeditionsForShip(s.slug);
  const [first, ...rest] = s.name.replace(/^MV\s+/, "").split(" ");
  return (
    <>
      <DetailHero
        label={`${shipSizeLabel[s.size]} · ${s.operator}`}
        lines={rest.length ? [first, rest.join(" ")] : [first]}
        description={<p>{s.blurb}</p>}
        actions={<Pill href="/plan-my-expedition" variant="accent">Ask about this ship</Pill>}
        media={{ image: s.gallery[0] ?? s.image }}
        background={s.image}
        waves={[`${s.passengers} guests`, `${s.lengthM} m`, s.iceClass, `${s.zodiacs} zodiacs`]}
      />
      <ParagraphBlock lead={s.body.split("\n\n")[0]} side={<>Operator<br />{s.operator}</>} body={<>{s.body.split("\n\n").slice(1).map((p, i) => <p key={i}>{p}</p>)}<VerifyNote>Placeholder ship and operator. Specifications to verify before launch.</VerifyNote></>} />
      <ImagePairs images={[s.image, ...s.gallery].slice(0, 4)} />
      <CreditsGrid
        columns={[
          { title: "Specifications", items: [`Length ${s.lengthM} m`, `${s.passengers} guests`, s.iceClass, `${s.zodiacs} zodiacs`] },
          { title: "Cabins", items: s.cabins.map((c) => cabinLabel[c]) },
          { title: "Activities", items: s.activities },
          { title: "Operator", items: [s.operator, "IAATO member (placeholder — verify)"] },
        ]}
      />
      <section id="voyages" className="scroll-mt-[5rem] bg-ink pb-[8rem] pt-[2rem] text-ice">
        <div>
          <h2 className="t-mono mb-[3rem] px-[1.25rem] opacity-60">voyages on board</h2>
          {voyages.length ? (
            <CardGrid
              cta="View expedition"
              items={voyages.map((e) => ({
                href: `/expeditions/${e.slug}`,
                title: getRoute(e.routeSlug)?.name ?? e.name,
                meta: <Price usd={e.fromPriceUSD} prefix="From" />,
                image: e.image,
                video: e.video,
                body: <span className="t-h3 block">{e.name}</span>,
              }))}
            />
          ) : (
            <p className="t-small px-[1.25rem] opacity-70">New departures for this ship are coming soon. Ask your specialist.</p>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
