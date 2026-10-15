import { cn } from "@/lib/cn";

/**
 * Original Seventh Continent penguin mascot (hand-built SVG, no external art).
 * `pose="wave"` raises a flipper; animation is applied by the parent.
 */
export function PenguinSvg({ className, pose = "stand", title }: { className?: string; pose?: "stand" | "wave" | "slide"; title?: string }) {
  if (pose === "slide") {
    return (
      <svg viewBox="0 0 140 70" className={cn("overflow-visible", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
        {title && <title>{title}</title>}
        <ellipse cx="72" cy="62" rx="58" ry="5" fill="#8db8dc" opacity="0.5" />
        <path d="M18 44 C 22 22, 70 14, 112 30 C 126 35, 128 50, 112 54 C 80 62, 30 62, 18 44 Z" fill="#030b17" />
        <path d="M34 46 C 44 34, 86 30, 108 42 C 100 52, 52 56, 34 46 Z" fill="#e8f0f8" />
        <circle cx="114" cy="36" r="13" fill="#030b17" />
        <circle cx="118" cy="33" r="2.6" fill="#fff" />
        <circle cx="118.6" cy="33" r="1.3" fill="#030b17" />
        <path d="M126 37 L138 40 L126 42 Z" fill="#ff5b1f" />
        <path d="M16 40 L4 34 L8 46 Z" fill="#ff5b1f" />
        <path d="M70 28 C 74 18, 90 14, 96 18 C 88 22, 82 28, 78 34 Z" fill="#0b1726" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 130" className={cn("overflow-visible", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      {/* feet */}
      <path d="M30 120 q 8 -6 18 0 q -8 6 -18 0z" fill="#ff5b1f" />
      <path d="M52 120 q 8 -6 18 0 q -8 6 -18 0z" fill="#ff5b1f" />
      {/* body */}
      <path d="M50 8 C 76 8, 86 40, 86 72 C 86 104, 72 120, 50 120 C 28 120, 14 104, 14 72 C 14 40, 24 8, 50 8 Z" fill="#030b17" />
      {/* belly */}
      <path d="M50 38 C 68 38, 74 60, 74 82 C 74 104, 64 114, 50 114 C 36 114, 26 104, 26 82 C 26 60, 32 38, 50 38 Z" fill="#e8f0f8" />
      {/* face mask */}
      <path d="M50 18 C 64 18, 70 30, 68 42 C 62 36, 56 38, 50 44 C 44 38, 38 36, 32 42 C 30 30, 36 18, 50 18 Z" fill="#e8f0f8" opacity="0.12" />
      {/* eyes */}
      <circle cx="40" cy="34" r="5" fill="#fff" />
      <circle cx="60" cy="34" r="5" fill="#fff" />
      <circle cx="41" cy="35" r="2.4" fill="#030b17" />
      <circle cx="61" cy="35" r="2.4" fill="#030b17" />
      {/* beak */}
      <path d="M43 44 L50 54 L57 44 Z" fill="#ff5b1f" />
      {/* cheeks */}
      <circle cx="33" cy="46" r="3" fill="#ff5b1f" opacity="0.25" />
      <circle cx="67" cy="46" r="3" fill="#ff5b1f" opacity="0.25" />
      {/* flippers */}
      <path d="M15 62 C 4 72, 2 90, 8 98 C 14 88, 18 76, 20 66 Z" fill="#0b1726" />
      {pose === "wave" ? (
        <path d="M84 60 C 96 50, 100 32, 96 24 C 88 32, 82 46, 80 56 Z" fill="#0b1726" />
      ) : (
        <path d="M85 62 C 96 72, 98 90, 92 98 C 86 88, 82 76, 80 66 Z" fill="#0b1726" />
      )}
      {/* tiny parka scarf */}
      <path d="M30 52 C 42 58, 58 58, 70 52 L 70 58 C 58 64, 42 64, 30 58 Z" fill="#8db8dc" />
    </svg>
  );
}
