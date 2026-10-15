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
      <section className="bg-glacier pb-[8rem]">
        <div className="container-site">
          <CardGrid
            cta="Read"
            items={sorted.map((p) => ({
              href: `/journal/${p.slug}`,
              title: `${p.readMinutes} min read`,
              meta: formatDate(p.date),
              image: p.cover,
              body: (
                <>
                  <span className="block font-display text-[2.2rem] font-extrabold lowercase leading-[0.92] tracking-[-0.03em] [font-stretch:75%]">{p.title}</span>
                  <span className="mt-[0.6rem] block max-w-[30rem] text-[0.98rem] text-slate">{p.excerpt}</span>
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
