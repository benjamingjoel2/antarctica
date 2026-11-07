/**
 * Unsplash (imgix) resizes on its own CDN, so we hand it the width directly
 * instead of re-optimising through Vercel. The home hero layers have
 * pre-resized local variants (`public/media/<name>-<w>.webp`, original is
 * 1920px); every other local file passes through unchanged.
 */
const HERO_VARIANTS = [640, 828, 1080, 1440];
const HERO = /^\/media\/(hero-background|hero-foreground)\.webp$/;

export default function loader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://images.unsplash.com")) {
    const sep = src.includes("?") ? "&" : "?";
    return `${src}${sep}w=${width}&q=${quality ?? 75}`;
  }
  const hero = src.match(HERO);
  if (hero) {
    const w = HERO_VARIANTS.find((v) => v >= width);
    return w ? `/media/${hero[1]}-${w}.webp` : src;
  }
  return src;
}
