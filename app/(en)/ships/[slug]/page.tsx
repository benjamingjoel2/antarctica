import { notFound } from "next/navigation";
import { CardGrid } from "@/components/sections/CardGrid";
import { CreditsGrid } from "@/components/sections/CreditsGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { DetailHero } from "@/components/sections/DetailHero";
import { ImagePairs } from "@/components/sections/ImagePairs";
import { ParagraphBlock } from "@/components/sections/ParagraphBlock";
import { Pill } from "@/components/ui/Pill";
import { Price } from "@/components/ui/Price";
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
  const photoCredits = [s.image, ...s.gallery].map((i) => i.credit).filter((c): c is string => Boolean(c));
  const words = s.name.split(" ");
  const first = words.slice(0, -1).join(" ") || words[0];
  const rest = words.length > 1 ? [words[words.length - 1]] : [];
  return (
    <>
      <DetailHero
        label={`${shipSizeLabel[s.size]} · ${s.operator}`}
        lines={rest.length ? [first, rest.join(" ")] : [first]}
        description={<p>{s.blurb}</p>}
        actions={<Pill href="/plan-my-expedition" variant="accent">Ask about this ship</Pill>}
        media={{ image: s.gallery[0] ?? s.image }}
        background={s.image}
        waves={[shipSizeLabel[s.size], s.guests, "IAATO member"]}
      />
      <ParagraphBlock lead={s.body.split("\n\n")[0]} side={<>Operator<br />{s.operator}</>} body={<>{s.body.split("\n\n").slice(1).map((p, i) => <p key={i}>{p}</p>)}</>} />
      <ImagePairs images={[s.image, ...s.gallery].slice(0, 4)} />
      <CreditsGrid
        columns={[
          { title: "At a glance", items: [shipSizeLabel[s.size], s.guests] },
          { title: "Typical cabins", items: s.cabins.map((c) => cabinLabel[c]) },
          { title: "Activities", items: s.activities },
          { title: "Operator", items: [s.operator] },
          ...(photoCredits.length ? [{ title: "Photo", items: photoCredits }] : []),
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
