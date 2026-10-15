import { CardGrid } from "@/components/sections/CardGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { Price } from "@/components/ui/Price";
import { experiences } from "@/data/experiences";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Antarctic experiences",
  description: "Zodiac landings, sea kayaking, camping on the ice, the polar plunge, whales, penguins, citizen science and Shackleton's South Georgia.",
  path: "/experiences",
});

export default function ExperiencesPage() {
  return (
    <>
      <PageHero label={`Experiences (${String(experiences.length).padStart(2, "0")})`} lines={["what you", "will", "remember"]} intro="Paddle among brash ice, sleep under a sky that never quite gets dark, or simply sit very still while a colony goes about its business. Here's what a day in Antarctica can hold." />
      <section className="bg-ink pb-[8rem] text-ice">
        <div>
          <CardGrid
            cta="Discover"
            items={experiences.map((x) => ({
              href: `/experiences/${x.slug}`,
              title: x.name,
              meta: x.addOnFromUSD ? <Price usd={x.addOnFromUSD} prefix="Add-on from" /> : "Included",
              image: x.image,
              body: (
                <>
                  <span className="t-h3 block">{x.name}</span>
                  <span className="t-small mt-[0.5rem] block max-w-[30rem] opacity-75">{x.summary}</span>
                </>
              ),
            }))}
          />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
