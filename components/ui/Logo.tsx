import { cn } from "@/lib/cn";

/** Text logo placeholder with a compass-south mark. */
export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("inline-flex items-center gap-[0.55rem]", tone === "light" ? "text-glacier" : "text-navy", className)}>
      <svg viewBox="0 0 32 32" className="h-[1.6rem] w-[1.6rem]" aria-hidden>
        <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 4 L19.5 16 L16 28 L12.5 16 Z" fill="currentColor" opacity="0.18" />
        <path d="M16 28 L19.5 16 L12.5 16 Z" fill="#ff5b1f" />
        <text x="16" y="13.4" textAnchor="middle" fontSize="7.5" fontWeight="800" fill="currentColor" fontFamily="system-ui">
          7
        </text>
      </svg>
      <span className="font-display text-[1.05rem] font-extrabold uppercase leading-[0.85] tracking-[-0.02em] [font-stretch:80%]">
        Seventh
        <br />
        Continent
      </span>
    </span>
  );
}
