import { CardGrid } from "@/components/sections/CardGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { PageHero } from "@/components/sections/PageHero";
import { posts } from "@/data/posts";
import { formatDate } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Journal", description: "Practical, honest guides to planning an Antarctica expedition.", path: "/journal" });

export default function JournalPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero label={`Journal (${String(posts.length).padStart(2, "0")})`} lines={["field", "notes"]} intro="Straight answers to the questions we hear most: which ship, which month, what to pack, and whether to brave the Drake." />
      <section className="bg-ink pb-[8rem] text-ice">
        <div>
          <CardGrid
            cta="Read"
            items={sorted.map((p) => ({
              href: `/journal/${p.slug}`,
              title: `${p.readMinutes} min read`,
              meta: formatDate(p.date),
              image: p.cover,
              body: (
                <>
                  <span className="t-h3 block">{p.title}</span>
                  <span className="t-small mt-[0.5rem] block max-w-[30rem] opacity-75">{p.excerpt}</span>
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
