import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Reference-style box button: tiny square label in mono caps; a mask wipes
 * up from the bottom on hover and inverts the text.
 */
type Variant = "light" | "dark" | "accent" | "glass";

const styles: Record<Variant, { base: string; mask: string; hoverText: string }> = {
  light: { base: "bg-ice text-ink", mask: "bg-ink", hoverText: "group-hover:text-ice group-focus-visible:text-ice" },
  glass: { base: "bg-ice text-ink", mask: "bg-ink", hoverText: "group-hover:text-ice group-focus-visible:text-ice" },
  dark: { base: "bg-ink text-ice", mask: "bg-ice", hoverText: "group-hover:text-ink group-focus-visible:text-ink" },
  accent: { base: "bg-orange text-ink", mask: "bg-ink", hoverText: "group-hover:text-ice group-focus-visible:text-ice" },
};

type Common = { children: ReactNode; variant?: Variant; className?: string; size?: "sm" | "md" };

function Inner({ children, variant = "light" }: { children: ReactNode; variant?: Variant }) {
  const s = styles[variant];
  return (
    <>
      <span aria-hidden className={cn("absolute inset-0 translate-y-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0 group-focus-visible:translate-y-0", s.mask)} />
      <span className={cn("relative transition-colors duration-300", s.hoverText)}>{children}</span>
    </>
  );
}

const base = (variant: Variant, size: "sm" | "md") =>
  cn(
    "group relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap select-none isolate",
    "font-mono uppercase leading-none tracking-[0.01em]",
    size === "sm" ? "px-[0.25rem] py-[0.12rem] text-[1rem]" : "px-[0.3rem] py-[0.15rem] text-[1.12rem]",
    styles[variant].base,
  );

export function Pill({ href, children, variant = "light", size = "md", className, ...rest }: Common & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "children">) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
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

export function PillButton({ children, variant = "light", size = "md", className, ...rest }: Common & Omit<ComponentProps<"button">, "children">) {
  return (
    <button type="button" className={cn(base(variant, size), "cursor-pointer disabled:opacity-40", className)} {...rest}>
      <Inner variant={variant}>{children}</Inner>
    </button>
  );
}

export function PillTag({ children, variant = "light", className }: Common) {
  return (
    <span className={cn(base(variant, "sm"), "pointer-events-none", className)}>
      <span className="relative">{children}</span>
    </span>
  );
}
