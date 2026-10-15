import { cn } from "@/lib/cn";

/** Text logo placeholder: compass-south mark + small wordmark. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-[0.5rem] text-current", className)}>
      <svg viewBox="0 0 32 32" className="h-[1.6rem] w-[1.6rem]" aria-hidden>
        <circle cx="16" cy="16" r="14.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M16 5 L18.6 16 L16 27 L13.4 16 Z" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M16 27 L18.6 16 L13.4 16 Z" fill="#ff5b1f" />
      </svg>
      <span className="font-mono text-[1.05rem] uppercase leading-[0.85]">
        Seventh
        <br />
        Continent
      </span>
    </span>
  );
}
