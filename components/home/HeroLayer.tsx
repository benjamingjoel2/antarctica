import { getImageProps } from "next/image";

/**
 * One layer of the home hero (1920x1280 source, object-cover, horizontally centred).
 * Portrait screens get a full-density centre crop (`<name>-portrait.webp`, 1152x1280):
 * the cover crop there is height-bound, so the visible pixels are identical to the
 * full image at about half the bytes. Landscape screens get the width srcset from
 * the image loader (640–1920).
 */
export function HeroLayer({ name, className, priority = false }: { name: "hero-background" | "hero-foreground"; className: string; priority?: boolean }) {
  const { props } = getImageProps({ src: `/media/${name}.webp`, alt: "", fill: true, sizes: "100vw", priority, className });
  return (
    <>
      {priority && (
        <>
          {/* React hoists these to <head>; one matches per screen shape. */}
          <link rel="preload" as="image" media="(max-aspect-ratio: 3/4)" href={`/media/${name}-portrait.webp`} fetchPriority="high" />
          <link rel="preload" as="image" media="(min-aspect-ratio: 3001/4000)" imageSrcSet={props.srcSet} imageSizes="100vw" fetchPriority="high" />
        </>
      )}
      <picture>
        <source media="(max-aspect-ratio: 3/4)" srcSet={`/media/${name}-portrait.webp`} type="image/webp" />
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img {...props} aria-hidden />
      </picture>
    </>
  );
}
