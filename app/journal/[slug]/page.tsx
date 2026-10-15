import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sections/CtaBand";
import { SplitWords } from "@/components/ui/SplitWords";
import { posts } from "@/data/posts";
import { formatDate, getPost } from "@/lib/data";
import { buildMetadata, JsonLd } from "@/lib/seo";

export const dynamicParams = false;
export const generateStaticParams = () => posts.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) return {};
  return buildMetadata({ title: p.title, description: p.excerpt, path: `/journal/${p.slug}`, image: p.cover.src });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const { default: Body } = await import(`@/content/journal/${slug}.mdx`);
  const next = posts[(posts.findIndex((x) => x.slug === slug) + 1) % posts.length];

  return (
    <>
      <article className="bg-glacier">
        <header className="container-site pt-[8.5rem] md:pt-[11rem]">
          <p className="t-label text-slate">
            <Link href="/journal" className="hover:underline">Journal</Link> · {formatDate(p.date)} · {p.readMinutes} min read
          </p>
          <SplitWords as="h1" onMount delay={0.5} className="t-split mt-[1rem] text-[clamp(3.2rem,10vw,8.5rem)]" lines={p.titleLines.map((l, i) => ({ text: l, className: i % 2 ? "md:pl-[12%]" : undefined }))} />
          <span className="sr-only">{p.title}</span>
          <p className="mt-[2rem] max-w-[40rem] t-large text-slate">{p.excerpt}</p>
        </header>
        <div className="relative mx-[0.6rem] mt-[4rem] h-[70vh] min-h-[24rem] overflow-hidden rounded-[1.2rem]">
          <Image src={p.cover.src} alt={p.cover.alt} fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="container-site grid-site py-[5rem]">
          <div className="prose-polar col-span-12 lg:col-span-7 lg:col-start-4">
            <Body />
          </div>
        </div>
        <nav className="container-site border-t border-rule py-[3rem]" aria-label="Next article">
          <Link href={`/journal/${next.slug}`} className="group block">
            <span className="t-label text-slate">Next</span>
            <span className="mt-[0.6rem] block font-display text-[clamp(2rem,5vw,4rem)] font-extrabold lowercase leading-[0.92] tracking-[-0.03em] [font-stretch:75%] group-hover:text-iceberg-deep">
              {next.title} →
            </span>
          </Link>
        </nav>
      </article>
      <CtaBand />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: p.title, datePublished: p.date, image: p.cover.src, author: { "@type": "Organization", name: "Seventh Continent" } }} />
    </>
  );
}
