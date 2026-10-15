import Link from "next/link";
import { notFound } from "next/navigation";
import { CreditsGrid } from "@/components/sections/CreditsGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { DetailHero } from "@/components/sections/DetailHero";
import { ParagraphBlock } from "@/components/sections/ParagraphBlock";
import { Pill } from "@/components/ui/Pill";
import { Price } from "@/components/ui/Price";
import { VerifyNote } from "@/components/ui/VerifyNote";
import { experiences } from "@/data/experiences";
import { getExperience, getRoute } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => experiences.map((x) => ({ slug: x.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const x = getExperience((await params).slug);
  if (!x) return {};
  return buildMetadata({ title: x.name, description: x.summary, path: `/experiences/${x.slug}`, image: x.image.src });
}

export default async function ExperiencePage({ params }: { params: Promise<{ slug: string }> }) {
  const x = getExperience((await params).slug);
  if (!x) notFound();
  const others = experiences.filter((o) => o.slug !== x.slug).slice(0, 4);
  return (
    <>
      <DetailHero
        label="Experience"
        lines={x.titleLines}
        description={<p>{x.summary}</p>}
        actions={<Pill href="/plan-my-expedition" variant="accent">Add to my plan</Pill>}
        media={{ image: x.image }}
        background={others[0]?.image ?? x.image}
        waves={[x.months.join(" · "), x.addOnFromUSD ? <Price key="p" usd={x.addOnFromUSD} prefix="Add-on from" /> : "Usually included", `${x.routes.length} routes`, "Weather permitting"]}
      />
      <ParagraphBlock
        lead={x.body.split("\n\n")[0]}
        side="Good to know"
        body={<>{x.body.split("\n\n").slice(1).map((p, i) => <p key={i}>{p}</p>)}{x.verifyNote && <VerifyNote>{x.verifyNote}</VerifyNote>}</>}
      />
      <CreditsGrid
        columns={[
          { title: "Good to know", items: x.goodToKnow },
          { title: "Best months", items: x.months },
          { title: "Routes", items: x.routes.map((r) => <Link key={r} href={`/routes/${r}`} className="underline underline-offset-4">{getRoute(r)?.name ?? r}</Link>) },
          { title: "More experiences", items: others.map((o) => <Link key={o.slug} href={`/experiences/${o.slug}`} className="underline underline-offset-4">{o.name}</Link>) },
        ]}
      />
      <CtaBand />
    </>
  );
}
