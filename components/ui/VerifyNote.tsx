import { cn } from "@/lib/cn";

export function VerifyNote({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <p className={cn("verify-note flex items-start gap-[0.5em]", className)}>
      <span aria-hidden className="mt-[0.35em] inline-block h-[0.5em] w-[0.5em] shrink-0 rounded-full bg-orange" />
      <span>{children ?? "Placeholder — verify with partner operators and IAATO before launch."}</span>
    </p>
  );
}
