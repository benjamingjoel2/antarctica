import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "light" | "dark" | "accent" | "glass";

const styles: Record<Variant, { base: string; mask: string; hoverText: string }> = {
  light: { base: "bg-snow text-navy", mask: "bg-navy", hoverText: "group-hover:text-glacier" },
  dark: { base: "bg-navy text-glacier", mask: "bg-iceberg", hoverText: "group-hover:text-navy" },
  accent: { base: "bg-orange text-navy", mask: "bg-navy", hoverText: "group-hover:text-glacier" },
  glass: { base: "bg-white/15 text-white backdrop-blur-md", mask: "bg-snow", hoverText: "group-hover:text-navy" },
};

type Common = { children: ReactNode; variant?: Variant; className?: string; size?: "sm" | "md" };

function Inner({ children, variant = "light" }: { children: ReactNode; variant?: Variant }) {
  const s = styles[variant];
  return (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-y-[101%] rounded-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0 group-focus-visible:translate-y-0",
          s.mask,
        )}
      />
      <span className={cn("relative transition-colors duration-500", s.hoverText)}>{children}</span>
    </>
  );
}

const base = (variant: Variant, size: "sm" | "md") =>
  cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium uppercase whitespace-nowrap select-none",
    "tracking-[0.02em] isolate",
    size === "sm" ? "h-[2.1rem] px-[1rem] text-[0.72rem]" : "h-[2.6rem] px-[1.35rem] text-[0.8rem]",
    styles[variant].base,
  );

export function Pill({
  href,
  children,
  variant = "light",
  size = "md",
  className,
  ...rest
}: Common & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "children">) {
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  if (external) {
    return (
      <a href={href} className={cn(base(variant, size), className)} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        <Inner variant={variant}>{children}</Inner>
      </a>
    );
  }
  return (
    <Link href={href} className={cn(base(variant, size), className)} {...rest}>
      <Inner variant={variant}>{children}</Inner>
    </Link>
  );
}

export function PillButton({
  children,
  variant = "light",
  size = "md",
  className,
  ...rest
}: Common & Omit<ComponentProps<"button">, "children">) {
  return (
    <button type="button" className={cn(base(variant, size), "cursor-pointer disabled:opacity-40", className)} {...rest}>
      <Inner variant={variant}>{children}</Inner>
    </button>
  );
}

/** Static pill (labels inside cards, cursor followers). */
export function PillTag({ children, variant = "light", className }: Common) {
  return (
    <span className={cn(base(variant, "sm"), "pointer-events-none", className)}>
      <span className="relative">{children}</span>
    </span>
  );
}
