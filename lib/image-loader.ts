/**
 * Local images only (the site no longer loads remote stock photos).
 * - The home hero layers have pre-resized variants (`public/media/<name>-<w>.webp`,
 *   original is 1920px).
 * - Photos in `public/media/photos/` are about 1600px on the long side and each has
 *   an 800px copy (`<name>-800.jpg`) for small cards and phones.
 * Every other local file passes through unchanged.
 */
const HERO_VARIANTS = [640, 828, 1080, 1440];
const HERO = /^\/media\/(hero-background|hero-foreground)\.webp$/;
const PHOTO = /^\/media\/photos\/([\w-]+)\.jpg$/;

export default function loader({ src, width }: { src: string; width: number; quality?: number }) {
  const hero = src.match(HERO);
  if (hero) {
    const w = HERO_VARIANTS.find((v) => v >= width);
    return w ? `/media/${hero[1]}-${w}.webp` : src;
  }
  const photo = src.match(PHOTO);
  if (photo && width <= 828) return `/media/photos/${photo[1]}-800.jpg`;
  return src;
}
