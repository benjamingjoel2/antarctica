import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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
      <article className="bg-ink text-ice">
        <header className="container-site pt-[6.5rem] text-center md:pt-[5rem]">
          <p className="t-mono opacity-60">
            <Link href="/journal" className="hover:underline">Journal</Link> · {formatDate(p.date)} · {p.readMinutes} min read
          </p>
          <SplitWords as="h1" onMount delay={0.5} className="t-giant mt-[1.2rem]" lines={p.titleLines.map((l) => ({ text: l, className: "justify-center" }))} />
          <span className="sr-only">{p.title}</span>
          <p className="t-small mx-auto mt-[1.6rem] max-w-[40rem] opacity-80">{p.excerpt}</p>
        </header>
        <div className="relative mt-[4rem] h-[85vh] min-h-[24rem] overflow-hidden">
          <Image src={p.cover.src} alt={p.cover.alt} fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="container-site grid-site py-[5rem]">
          <div className="prose-polar col-span-12 lg:col-span-7 lg:col-start-4">
            <Body />
          </div>
        </div>
        <nav className="container-site border-t border-ice/15 py-[3rem]" aria-label="Next article">
          <Link href={`/journal/${next.slug}`} className="group block">
            <span className="t-mono opacity-60">Next</span>
            <span className="t-h2 mt-[0.6rem] block group-hover:opacity-60">
              {next.title} →
            </span>
          </Link>
        </nav>
      </article>
      
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", headline: p.title, datePublished: p.date, image: p.cover.src, author: { "@type": "Organization", name: "Seventh Continent" } }} />
    </>
  );
}
