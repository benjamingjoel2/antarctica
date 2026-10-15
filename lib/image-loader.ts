/**
 * Unsplash (imgix) resizes on its own CDN, so we hand it the width directly
 * instead of re-optimising through Vercel. Local files pass through.
 */
export default function loader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://images.unsplash.com")) {
    const sep = src.includes("?") ? "&" : "?";
    return `${src}${sep}w=${width}&q=${quality ?? 75}`;
  }
  return src;
}
