import type { Metadata } from "next";
import { site } from "@/config/site";
import { img } from "@/data/images";

/** Page language. The i18n build rewrites this per locale copy ("fr", "de", "es"). */
const locale = "en";
// Built without a "/" literal so the i18n build does not prefix it.
const SLASH = String.fromCharCode(47);

/** hreflang alternates for a path in any locale ("/fr/ships" -> en "/ships", fr "/fr/ships", ...). */
export function languageAlternates(path: string): Record<string, string> {
  const base = path.replace(/^\/(fr|de|es)(?=\/|$)/, "") || SLASH;
  const at = (l: string) => (base.length === 1 ? `/${l}` : `/${l}${base}`);
  return { en: base, fr: at("fr"), de: at("de"), es: at("es"), "x-default": base };
}

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
  const base = path.replace(/^\/(fr|de|es)(?=\/|$)/, "") || SLASH;
  const canonical = /^en$/.test(locale) ? base : base.length === 1 ? `/${locale}` : `/${locale}${base}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical, languages: languageAlternates(base) },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
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
