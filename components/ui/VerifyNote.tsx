import { cn } from "@/lib/cn";

export function VerifyNote({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <p className={cn("verify-note flex items-start gap-[0.5em]", className)}>
      <span aria-hidden className="mt-[0.2em] inline-block h-[0.45em] w-[0.45em] shrink-0 bg-orange" />
      <span>{children ?? "Placeholder — verify with partner operators and IAATO before launch."}</span>
    </p>
  );
}
