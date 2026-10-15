import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { TimelineRows } from "@/components/sections/TimelineRows";
import { VerifyNote } from "@/components/ui/VerifyNote";
import { timeline } from "@/data/timeline";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Timeline of Antarctic exploration",
  description: "From Cook's first crossing of the Antarctic Circle to the discovery of Endurance: exploration, science and the treaty that protects a continent.",
  path: "/timeline",
});

export default function TimelinePage() {
  return (
    <>
      <PageHero label={`Timeline (${timeline.length})`} lines={["two", "centuries", "of ice"]} intro="Every voyage south follows a wake laid down by sealers, scientists and stubborn explorers. Hover or tap a year to look closer." />
      <section className="bg-glacier pb-[6rem]">
        <TimelineRows
          filters={[
            { id: "exploration", label: "Exploration" },
            { id: "science", label: "Science" },
            { id: "treaty", label: "Treaty" },
            { id: "us", label: "Seventh Continent" },
          ]}
          rows={timeline.map((t, i) => ({
            key: `${t.year}-${i}`,
            title: t.title,
            right: String(t.year),
            sub: t.placeholder ? "Our story · placeholder" : t.date,
            body: t.body,
            image: t.image,
            tag: t.category,
          }))}
        />
        <div className="container-site">
          <VerifyNote className="mt-[2rem]">Seventh Continent milestones are placeholders to confirm before launch.</VerifyNote>
        </div>
      </section>
      <CtaBand lines={["add your", "own chapter"]} />
    </>
  );
}
