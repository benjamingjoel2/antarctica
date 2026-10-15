import type { Metadata } from "next";
import { site } from "@/config/site";
import { img } from "@/data/images";

export function buildMetadata({
  title,
  description = site.description,
  path = "/",
  image = img.icebergsReflect,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | Antarctica expeditions, planned by one polar specialist`;
  const ogImage = `${image}&w=1200&h=630`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage] },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
